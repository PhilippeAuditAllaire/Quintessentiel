const QueryEngine = require("../scripts/QueryEngine.js");

class MgrProduct {
    constructor() {
        this._queryEngine = new QueryEngine();
    }

    loadCommentSlider(code_lang) {
        let query = "SELECT * FROM comment JOIN users ON users.id = comment.idUser JOIN commentstatus ON commentstatus.id = comment.idStatus WHERE commentstatus.name = 'Approved'";

        return this._queryEngine.executeQuery(query);
    }

    loadProductFeatured() {
        let query = "SELECT * FROM Product where featured = '1'";

        return this._queryEngine.executeQuery(query);
    }

    loadProductbyId(id_product, code_lang) {

        let query = "SELECT Product.id as product_id, productattribute.*, ta_productattribute_language.*, Product.image as image, Product.retailPrice FROM Product INNER JOIN ta_productattribute_language ON Product.id = ta_productattribute_language.idProduct INNER JOIN productattribute ON ta_productattribute_language.productAttributeId = productattribute.id WHERE product.id = " + id_product;

        return this._queryEngine.executeQuery(query);
    }

    loadProduct(code_lang) {
        let query = "SELECT Product.id as product_id, productattribute.*, ta_productattribute_language.*, Product.image as image, Product.retailPrice FROM Product INNER JOIN ta_productattribute_language ON Product.id = ta_productattribute_language.idProduct INNER JOIN productattribute ON ta_productattribute_language.productAttributeId = productattribute.id WHERE productattribute.type = 'title'";

        return this._queryEngine.executeQuery(query);
    }

    loadProductSearch(code_lang, search) {
        let query = "SELECT Product.id as product_id, productattribute.*, ta_productattribute_language.*, Product.image as image, Product.retailPrice FROM Product INNER JOIN ta_productattribute_language ON Product.id = ta_productattribute_language.idProduct INNER JOIN productattribute ON ta_productattribute_language.productAttributeId = productattribute.id WHERE productattribute.type = 'title' AND ta_productattribute_language.value LIKE '%" + search + "%'"
        console.log(query);
        return this._queryEngine.executeQuery(query);
    }

    addProduct(code_lang) {

    }

    updateProduct(id_product, code_lang) {

    }

}

module.exports = MgrProduct;