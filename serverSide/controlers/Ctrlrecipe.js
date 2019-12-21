const Recipe = require("../class/Recipe.js");
const MgrRecipe = require("../managers/MgrRecipe.js");

class CtrlRecipe {
    constructor() {
        this._mgrRecipe = new MgrRecipe();
    }

    addRecipe(name, desc, instru, is_custom, product, ingre) {
        return this._mgrRecipe.addRecipe(name, desc, instru, is_custom, product, ingre);
    }

    updateRecipe(id, name, desc, instru, is_custom, product, ingre) {
        return this._mgrRecipe.updateRecipe(id, name, desc, instru, is_custom, product, ingre);
    }

    deleteRecipe(id) {
        return this._mgrRecipe.deleteRecipe(id);
    }


    getAllRecipe() {
        let recipes = this._mgrRecipe.getAll();
        return recipes.then(function(val) {
            let html = [];

            val.forEach(function(ingre) {
                let ele = '<tr onclick="openRecipe(this,' + ingre.id + ')">';
                ele += '<th class="productName">' + ingre.productName + '</th>';
                ele += '<th class="desc">' + ingre.description + '</th>';
                ele += '<th class="instru">' + ingre.instruction + '</th>';
                if (ingre.isCustom == '0') {
                    ele += '<th class="custom">Non</th>';
                } else {
                    ele += '<th class="custom">Oui</th>';
                }
                ele += '</tr>';
                html.push(ele);
            });
            return html;
        });
    }

    getInstruction(id) {
        let recipe = this._mgrRecipe.getRecipeInfo(id);
        let desc;
        return recipe.then(function(val) {
            let html = [];

            val.forEach(function(ingre) {
                desc = ingre.instruction;
            });
            return desc;
        });
    }

    getDescription(id) {
        let recipe = this._mgrRecipe.getRecipeInfo(id);
        let desc;
        return recipe.then(function(val) {
            let html = [];

            val.forEach(function(ingre) {
                desc = ingre.description;
            });
            return desc;
        });
    }

    getName(id) {
        let recipe = this._mgrRecipe.getRecipeInfo(id);
        let desc;
        return recipe.then(function(val) {
            let html = [];

            val.forEach(function(ingre) {
                desc = ingre.productName;
            });
            return desc;
        });
    }

    getCustom(id) {
        let recipe = this._mgrRecipe.getRecipeInfo(id);
        let desc;
        return recipe.then(function(val) {
            let html = [];

            val.forEach(function(ingre) {
                desc = ingre.isCustom;
            });
            return desc;
        });
    }

    getIngredients(id) {
        let ingredients = this._mgrRecipe.getIngredients(id);

        return ingredients.then(function(val) {
            let html = [];

            val.forEach(function(ingre) {
                let ele = '<a href="#" class="list-group-item list-group-item-action active ingredient" onclick="active(this)" id="' + ingre.id + '">';
                ele += ingre.value;
                ele += '<input type="number" id="qty-' + ingre.id + '" class="qty-pro" min="0.00" step="1" value="0.00" />';
                ele += '<label for="">' + 'mg' + '</label>';
                ele += '</a>'
                html.push(ele);
            });
            return html;
        });
    }

    getProducts() {
        let products = this._mgrRecipe.getProducts();

        return products.then(function(val) {
            let html = [];

            val.forEach(function(pro) {
                let ele = '<a href="#" class="list-group-item list-group-item-action" onclick="active(this)" id="pro-' + pro.id + '">';
                ele += pro.value;
                html.push(ele);
            });
            return html;
        });
    }

    getMeasureUnits() {
        let units = this._mgrRecipe.getMeasureUnits();

        return units.then(function(val) {
            let html = [];
            html.push('<select class="units">')
            val.forEach(function(u) {
                let ele = '<option id="unit-' + u.id + '">' + u.name + '</option>';
                html.push(ele);
            });
            html.push('</select>')
            return html;
        })
    }

}

module.exports = CtrlRecipe;