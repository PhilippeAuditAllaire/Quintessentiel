const QueryEngine = require("../scripts/QueryEngine.js");

class MgrCategory {
    constructor() {
        this._queryEngine = new QueryEngine();
    }

    //Loads all the categories with
    //their basic infos (id,isVisible)
    //@Returns a promise
    loadAllCategoriesBasicInfos()
    {
        let query = "SELECT * FROM Category";

        return this._queryEngine.executeQuery(query);
    }

    //loads the categories attributes
    //related to the @idCategory
    //@idLang is the id of the lang 
    //in which to load the categories
    //@Returns a promise
    loadCategoryAttributes(idCategory,idLang)
    {
        let query = "SELECT * FROM ta_categoryattribute_language WHERE idCategory = ? AND idLanguage = ?";
        let param = [idCategory,idLang];

        return this._queryEngine.executeQuery(query,param);
    }


    //Loads all the languages that are in the DB
    //@Returns a promise
    loadAvailableLanguages()
    {
        let query = "SELECT * FROM Language";
        return this._queryEngine.executeQuery(query);
    }
}

module.exports = MgrCategory;

//SELECT * FROM Category RIGHT JOIN ta_categoryattribute_language ON category.id = ta_categoryattribute_language.idCategory