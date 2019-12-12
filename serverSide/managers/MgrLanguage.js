const QueryEngine = require("../scripts/QueryEngine.js");
const Category = require("../class/Category.js");
const CategoryInfos = require("../class/CategoryInfos.js");
const Text = require("../class/Text.js");
const TextInfos = require("../class/TextInfos.js");

class MgrLanguage {

    constructor() {
        this._queryEngine = new QueryEngine();
    }

    //Async foreach
    async asyncForEach(array, callback) {
        for (let index = 0; index < array.length; index++) {
            await callback(array[index], index, array);
        }
    }

    getTextByPage(page, code_lang) {
        let query = "SELECT landingtext_attribute.type,ta_landingtextattribute_language.value FROM ta_landingtextattribute_language JOIN landingtext_attribute ON landingtext_attribute.id = ta_landingtextattribute_language.landingTextAttribute JOIN language ON ta_landingtextattribute_language.languageId = language.id WHERE language.id = ? AND landingtext_attribute.page IN (?,'navbar')";
        let parameters = [code_lang, page];
        let context = this;
        return this._queryEngine.executeQuery(query, parameters).then(function(res) {

            return context.toJSon(res);
        });
    }

    toJSon(resultat) {
        let json = '{';
        resultat.forEach(function(line) {
            json += '"' + line.type + '":' + '"' + line.value + '",';
        });
        let res = json.substring(0, json.length - 1);
        res += '}';
        console.log("JSON : " + res);
        return res;
    }

    getLanguagesNavBar() {
        let query = "SELECT * FROM language";
        let html = '';
        return this._queryEngine.executeQuery(query).then(function(res) {
            res.forEach(function(lang) {
                html += '<a class="dropdown-item" href="#" id="' + lang.id + '" onclick="changeLang(' + lang.id + ')">' + lang.name + '</a>';
            });
            return html;
        });
    }

    loadAllTextBasicInfos() {
        let query = "SELECT * FROM landingtext_attribute";

        return this._queryEngine.executeQuery(query);
    }

    loadTextAttributes(id, code_lang) {
        let query = "SELECT * FROM ta_landingtextattribute_language WHERE landingTextAttribute = ? AND languageId = ?";
        let param = [id, code_lang];

        return this._queryEngine.executeQuery(query, param);
    }

    loadAllText() {
        let context = this;
        let categoriesArray = [];

        return this.loadAllTextBasicInfos().then(function(categories) { //Load the basic categories infos

            return context.loadAvailableLanguages().then(function(resLang) { //Load the languages

                const loadAllTextInfos = async() => {

                    await context.asyncForEach(categories, async(cat) => { //For each categories
                        console.log(cat);
                        let category = new Text({ id: cat.id, page: cat.page });
                        categoriesArray.push(category);

                        await context.asyncForEach(resLang, async(lang) => { //For each languages, find all their traductions

                            await context.loadTextAttributes(category.id, lang.id).then(function(categoryAttributes) { //Load its infos
                                categoryAttributes = categoryAttributes[0]
                                console.log(category);
                                if (categoryAttributes != undefined) {
                                    let traduction = new TextInfos(category.id, categoryAttributes.languageId, categoryAttributes.value, category.page)
                                    console.log(traduction);
                                    category.traductions.push(traduction);
                                }

                            })

                        });

                    });

                }

                return loadAllTextInfos();
            });

        }).then(function() {
            return categoriesArray;
        });
    }

    loadAvailableLanguages() {
        let query = "SELECT * FROM language";
        return this._queryEngine.executeQuery(query);
    }

    loadText(id, code_lang) {
        let query = "SELECT landingtext_attribute.*,ta_landingtextattribute_language.* FROM ta_landingtextattribute_language JOIN landingtext_attribute ON landingtext_attribute.id = ta_landingtextattribute_language.landingTextAttribute JOIN language ON ta_landingtextattribute_language.languageId = language.id WHERE language.id = ? AND ta_landingtextattribute_language.landingTextAttribute = ?";
        let param = [code_lang, id];
        let t;
        return this._queryEngine.executeQuery(query, param).then(function(res) {
            res.forEach(function(text) {
                console.log(text);
                t = text.value;
            })
            return t;
        });
    }

    updateText(infos) {
        let category = new Category({ id: infos.id });


        //Put the infos in the category object
        infos.allTranslatedNames.forEach(function(translations) {
            let categoryInfos = new CategoryInfos(category.id, translations.langId, translations.name);
            category.traductions.push(categoryInfos);
        });


        return this.updateTranslation(category.id, category.traductions);
    }

    updateTranslation(id, translations) {
        let context = this;

        const addTranslations = async() => {

            await context.asyncForEach(translations, async(transl) => {
                console.log(transl);
                await context.update(transl.idLang, id, transl.name).then(function(res) {
                    console.log(res);
                });

            })
        }

        return addTranslations();
    }

    update(code_lang, id, text) {
        let query = "UPDATE ta_landingtextattribute_language SET value = ? WHERE landingTextAttribute = ? AND languageId = ?";
        let param = [text, id, code_lang];

        return this._queryEngine.executeQuery(query, param);
    }

    //Generates the tabs of the add product modal
    //based on the number of languages
    //@modalName so the IDs can be customised depending of 
    //the modal (else the tabs only work for one modal since same id)
    generateModalCategoryTabs(modalName) {
        return this.loadAvailableLanguages().then(function(res) {
            let generatedHTML;
            let ul = "<ul class='nav nav-tabs'>";
            let tabContent = "<div class='tab-content'>";

            let i = 0;

            res.forEach(function(lang) {


                let isTabActive = "";

                if (i == 0) {
                    isTabActive = "active show";
                }

                ul += "<li class='nav-item'><a data-toggle='tab' href='#" + (modalName + lang.name) + "' class='nav-link " + isTabActive + "'>" + lang.name + "</a></li>";

                tabContent += `<div id=` + (modalName + lang.name) + ` class='tab-pane fade in ` + isTabActive + `' data-langId=` + lang.id + `>
                                    <div class="wrapper-inputLabel-productModal modal-single-wrapper">
                                        <div class="wrapper-modal-label">
                                            <label>Nom du texte</label>
                                        </div>
                                        <div class="wrapper-modal-input">
                                            <input type="text" name="categoryName" class="addCategoryInputName categoryName form-control" />
                                        </div>
                                    </div>
                                </div>`;
                i++;
            });

            ul += "</ul>";
            tabContent += "</div>";


            generatedHTML = ul + tabContent;

            return generatedHTML;
        });

    }

}

module.exports = MgrLanguage;