const MgrPromotion = require("../managers/MgrPromotion.js");

class CtrlPromotion {

    constructor() {
        this._mgrPromotion = new MgrPromotion();
    }
    addPromo(id, rabais) {
        console.log("add promo");
        return this._mgrPromotion.addPromo(id, rabais);
    }

    updatePromo(id, rabais) {
        console.log("update promo");
        return this._mgrPromotion.updatePromo(id, rabais);
    }

    loadAllPromotions() {
        let promo = this._mgrPromotion.loadAllPromos();

        return promo.then(function(val) {
            let catalogue_product = [];

            val.forEach(function(p) {

                let ele = '<tr ondblclick="openPromo(this)">';
                ele += '<th class="produit" id="' + p.id_product + '">' + p.value + '</th>';
                ele += '<th class="rabais" id="' + p.id_product + '">' + p.rabais + '</th>';
                ele += '</tr>';
                catalogue_product.push(ele);
            });

            return catalogue_product;
        });
    }

}

module.exports = CtrlPromotion;