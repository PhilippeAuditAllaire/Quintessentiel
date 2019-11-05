const QueryEngine = require("../scripts/QueryEngine.js");

class MgrRecipe {
    constructor() {
        this._queryEngine = new QueryEngine();
    }

    addRecipe(name, desc, instru, is_custom, product, ingre) {

        let query = "INSERT INTO recipe (description, instruction, isCustom, productName) VALUES (?, ?, b?, ?)";
        let param = [desc, instru, is_custom, product];
        let currentQueryEngine = this._queryEngine;
        return this._queryEngine.executeQuery(query, param).then(function(res) {
            let lastid = res.insertId;
            console.log(ingre);

            ingre.forEach(function(ing) {
                console.log(lastid);
                let query2 = "INSERT INTO ta_ingredients_recipe (idIngredient, idRecipe) VALUES (?,?)";
                let param2 = [ing, lastid];
                currentQueryEngine.executeQuery(query2, param2).then(function(res) {
                    console.log("et2");
                    console.log(res);
                });
            });

        }).then(function() {
            return true;
        }).catch(function() {
            return false;
        });
    }

    updateRecipe(id, name, desc, instru, is_custom, product, ingre) {

    }

}

module.exports = MgrRecipe;