const QueryEngine = require("../scripts/QueryEngine.js");

class MgrCategory {
    constructor() {
        this._queryEngine = new QueryEngine();
    }

    //Deletes all the attributes related
    //to a given category
    deleteCategoryAttributes(categoryId)
    {
        let query = "DELETE FROM ta_categoryattribute_language WHERE idCategory = ?";
        let param = [categoryId];

        return this._queryEngine.executeQuery(query,param);
    }

    //Updates the category basic infos (id,isVisible)
    updateCategory(categoryId,isVisible)
    {
        let query = "UPDATE Category SET isVisible = ? WHERE id= ?";
        let param = [isVisible,categoryId];

        return this._queryEngine.executeQuery(query,param);
    }

    //Adds the translation to a given category
    addTranslation(langId,categoryId,categoryName)
    {
        let query = "INSERT INTO ta_categoryattribute_language VALUES (1,?,?,?)";
        let param = [langId,categoryId,categoryName];

        return this._queryEngine.executeQuery(query,param);
    }

    //Adds the given category to
    //the database
    addCategory(category){
        let query = "INSERT INTO category VALUES (DEFAULT,?)";
        let param = [category.isVisible];

        return this._queryEngine.executeQuery(query,param);
    }

    //Loads all the categories with
    //their basic infos (id,isVisible)
    //@Returns a promise
    loadAllCategoriesBasicInfos()
    {
        let query = "SELECT * FROM category";

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
        let query = "SELECT * FROM language";
        return this._queryEngine.executeQuery(query);
    }

}

module.exports = MgrCategory;

//SELECT * FROM Category RIGHT JOIN ta_categoryattribute_language ON category.id = ta_categoryattribute_language.idCategory