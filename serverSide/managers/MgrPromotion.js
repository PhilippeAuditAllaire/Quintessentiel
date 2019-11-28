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

}

module.exports = MgrPromotion;