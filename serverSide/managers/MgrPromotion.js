const QueryEngine = require("../scripts/QueryEngine.js");

class MgrPromotion {
    constructor() {
        this._queryEngine = new QueryEngine();
    }

    addPromo(id, rabais) {
        let query = "INSERT INTO promo (id_product, rabais) VALUES (?, ?)";
        let param = [id, rabais];
        return this._queryEngine.executeQuery(query, param);
    }

    updatePromo(id, rabais) {
        let query = "UPDATE promo SET rabais = ? WHERE promo.id_product = ?";
        let param = [rabais, id];
        return this._queryEngine.executeQuery(query, param);
    }

    loadAllPromos() {
        let query = "SELECT * FROM promo JOIN ta_productattribute_language ON ta_productattribute_language.idProduct = promo.id_product JOIN productattribute ON productattribute.id = ta_productattribute_language.productAttributeId WHERE productattribute.type = 'title' AND ta_productattribute_language.idLanguage = 1";
        return this._queryEngine.executeQuery(query);
    }

}

module.exports = MgrPromotion;