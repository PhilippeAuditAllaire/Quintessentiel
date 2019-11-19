const Category = require("../class/Category.js");
const CategoryInfos = require("../class/CategoryInfos.js");
const MgrCategory = require("../managers/MgrCategory.js");

class CtrlCategory {

    constructor() {
        this._mgrCategory = new MgrCategory();
    }

    //Adds a category to the
    //database
    addCategory(infos)
    {
        let category = new Category({isVisible: infos.isVisible});

        let context = this;

        return this._mgrCategory.addCategory(category).then(function(res){

                   console.log("Added the  id")
                     console.log(res);
            let allTranslations = infos.allTranslatedNames;
            let insertedId = res.insertId;

            allTranslations.forEach(function(translation){
                let langId = translation.langId;
                let name = translation.name;

                context._mgrCategory.addTranslation(langId,insertedId,name).then(function(res){
                     console.log("Added the attributes id")
                     console.log(res);
                });
            })
        }).then(function(){
            return true;
        });
    }

    //Loads all the categories with
    //all their traductions
    loadAllCategoriesAdmin()
    {
        let context = this;
        let categoriesArray = [];

        return this._mgrCategory.loadAllCategoriesBasicInfos().then(function(categories){ //Load the basic categories infos

            return context._mgrCategory.loadAvailableLanguages().then(function(resLang){ //Load the languages

                async function asyncForEach(array, callback) { //Async foreach
                  for (let index = 0; index < array.length; index++) {
                    await callback(array[index], index, array);
                  }
                }
                

                const loadAllCategoriesInfos = async () => {

                    await asyncForEach(categories, async (cat) => {    //For each categories

                        let category = new Category({id:cat.id,isVisible:cat.isVisible});
                        categoriesArray.push(category);
               
                        await asyncForEach(resLang, async (lang) => {    //For each languages, find all their traductions

                            await context._mgrCategory.loadCategoryAttributes(category.id,lang.id).then(function(categoryAttributes){ //Load its infos
                                categoryAttributes = categoryAttributes[0]

                                if(categoryAttributes != undefined)
                                {
                                    let traduction = new CategoryInfos(category.id,categoryAttributes.idLang,categoryAttributes.value)
                                    category.traductions.push(traduction);  

                                }

                            })

                        });


                    });

                }

                return loadAllCategoriesInfos();
            });



        }).then(function(){
            return categoriesArray;
        });
    }


    //Generates the tabs of the add product modal
    //based on the number of languages
    //@modalName so the IDs can be customised depending of 
    //the modal (else the tabs only work for one modal since same id)
    generateModalCategoryTabs(modalName)
    {
        return this._mgrCategory.loadAvailableLanguages().then(function(res){
            let generatedHTML;
            let ul = "<ul class='nav nav-tabs'>";
            let tabContent = "<div class='tab-content'>";

            let i = 0;

            res.forEach(function(lang){
                

                let isTabActive = "";

                if(i == 0){
                    isTabActive = "active show";
                }

                ul += "<li class='nav-item'><a data-toggle='tab' href='#"+(modalName+lang.name)+"' class='nav-link "+isTabActive+"'>"+lang.name+"</a></li>";

                tabContent += `<div id=`+(modalName+lang.name)+` class='tab-pane fade in `+isTabActive+`' data-langId=`+lang.id+`>
                                    <div class="wrapper-inputLabel-productModal modal-single-wrapper">
                                        <div class="wrapper-modal-label">
                                            <label>Nom de la catégorie</label>
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

            return  generatedHTML;
        });

    }
}

module.exports = CtrlCategory;