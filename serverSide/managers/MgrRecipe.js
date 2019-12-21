const QueryEngine = require("../scripts/QueryEngine.js");

class MgrRecipe {
    constructor() {
        this._queryEngine = new QueryEngine();
    }

    addRecipe(name, desc, instru, is_custom, product, ingre) {

        let query = "INSERT INTO recipe (id,description, instruction, isCustom, productName) VALUES (?, ?, ?, b?, ?)";
        let param = [name, desc, instru, is_custom, product];
        let currentQueryEngine = this._queryEngine;
        return this._queryEngine.executeQuery(query, param).then(function(res) {
            let lastid = res.insertId;
            console.log(ingre);
            console.log(res);

            /*
            ingre.forEach(function(ing) {
                console.log(lastid);
                let query2 = "INSERT INTO ta_ingredients_recipe (idIngredient, idRecipe) VALUES (?,?)";
                let param2 = [ing, lastid];
                currentQueryEngine.executeQuery(query2, param2).then(function(res) {
                    console.log("et2");
                    console.log(res);
                });
            });
            */
        }).then(function() {
            return true;
        }).catch(function() {
            return false;
        });
    }

    updateRecipe(id, name, desc, instru, is_custom, product, ingre) {
        console.log(id);
        let query = "UPDATE recipe SET description = ?, instruction = ?,  isCustom =b?,  productName = ? WHERE id = ?";
        let param = [desc, instru, is_custom, name, id];
        let currentQueryEngine = this._queryEngine;
        return this._queryEngine.executeQuery(query, param).then(function(res) {
            console.log(res);
            console.log("he");
            let queryDel = "DELETE FROM ta_ingredients_recipe WHERE idRecipe = ?";
            let paramDel = [id];
            currentQueryEngine.executeQuery(queryDel, paramDel).then(function(res) {
                console.log("delete ingre");
                /*
                ingre.forEach(function(ing) {

                    let query2 = "INSERT INTO ta_ingredients_recipe (idIngredient, idRecipe) VALUES (?,?)";
                    let param2 = [ing, id];
                    currentQueryEngine.executeQuery(query2, param2).then(function(res) {
                        console.log("et2");
                        console.log(res);
                    });
                });
                */
            }).then(function() {
                console.log(res);

            }).catch(function() {
                console.log(res);

            });


        }).then(function() {
            return true;
        }).catch(function() {
            return false;
        });
    }

    deleteRecipe(id) {
        this.deleteIngre(id);
        let query = "DELETE FROM recipe WHERE id = ?";
        let param = [id];
        return this._queryEngine.executeQuery(query, param).then(function(res) {
            console.log("delete recipe");
            console.log(res);
        }).then(function() {
            return true;
        }).catch(function() {
            return false;
        });
    }

    deleteIngre(id) {
        console.log("he");
        let queryDel = "DELETE FROM ta_ingredients_recipe WHERE idRecipe = ?";
        let paramDel = [id];
        return this._queryEngine.executeQuery(queryDel, paramDel).then(function(res) {
            console.log(res);
            console.log("delete ingre");
        }).then(function() {
            return true;
        }).catch(function() {
            return false;
        });
    }

    getAll() {
        let query = "SELECT * FROM recipe";
        return this._queryEngine.executeQuery(query);
    }

    getRecipeInfo(id) {
        let query = "SELECT * FROM recipe WHERE id = ?";
        let param = [id];
        return this._queryEngine.executeQuery(query, param);
    }

    getIngredients(id) {
        let query = "SELECT Product.id , ta_productattribute_language.value FROM Product INNER JOIN ta_productattribute_language ON Product.id = ta_productattribute_language.idProduct INNER JOIN productattribute ON ta_productattribute_language.productAttributeId = productattribute.id WHERE productattribute.type = 'title' AND product.id = ?";
        let param = [id];
        return this._queryEngine.executeQuery(query, param);
    }

    getProducts() {
        let query = "SELECT Product.id , ta_productattribute_language.value FROM Product INNER JOIN ta_productattribute_language ON Product.id = ta_productattribute_language.idProduct INNER JOIN productattribute ON ta_productattribute_language.productAttributeId = productattribute.id WHERE productattribute.type = 'title' AND ta_productattribute_language.idLanguage = '1'";
        return this._queryEngine.executeQuery(query);
    }

    getMeasureUnits() {
        let query = "SELECT * FROM measureunit";
        return this._queryEngine.executeQuery(query);
    }

}
module.exports = MgrRecipe;