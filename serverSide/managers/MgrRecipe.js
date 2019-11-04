const QueryEngine = require("../scripts/QueryEngine.js");

class MgrRecipe {
    constructor() {
        this._queryEngine = new QueryEngine();
    }

    addRecipe(name, desc, instru, is_custom, product, ingre) {
        let query = "INSERT INTO `recipe` (`description`, `instruction`, `isCustom`, `productName`) VALUES (?, ?, ?, ?)";
        let param = [desc, instru, is_custom, product];
        this._queryEngine.executeQuery(query, param);
        let lastid = "SELECT LAST_INSERT_ID()";
        let ids = this._queryEngine.executeQuery(lastid);
        let lastInsert = "";
        ids.then(function(val) {
            val.forEach(function(id) {
                lastInsert = id.LAST_INSERT_ID;
            });
        });

        ingre.forEach(function(ing) {
            let query2 = "INSERT INTO ta_ingredients_recipe (idIngredient, idRecipe) VALUES (?,?)";
            let param2 = [ing, lastInsert];
            this._queryEngine.executeQuery(query2, param2);
        });
        return true;
    }

    updateRecipe(id, name, desc, instru, is_custom, product, ingre) {

    }

}

module.exports = MgrRecipe;