const QueryEngine = require("../scripts/QueryEngine.js");

class MgrLanguage {

    constructor() {
        this._queryEngine = new QueryEngine();
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

    loadAvailableLanguages() {
        let query = "SELECT * FROM Language";
        return this._queryEngine.executeQuery(query);
    }

}

module.exports = MgrLanguage;