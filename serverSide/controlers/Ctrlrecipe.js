const Recipe = require("../class/Recipe.js");
const MgrRecipe = require("../managers/MgrRecipe.js");

class CtrlRecipe {
    constructor() {
        this._mgrRecipe = new MgrRecipe();
    }

    addRecipe(name, desc, instru, is_custom, product, ingre) {
        return this._mgrRecipe.addRecipe(name, desc, instru, is_custom, product, ingre);
    }

}

module.exports = CtrlRecipe;