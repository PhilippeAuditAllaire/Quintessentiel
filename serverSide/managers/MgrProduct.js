const QueryEngine = require("../scripts/QueryEngine.js");

class MgrProduct {
    constructor() {
        this._queryEngine = new QueryEngine();
    }



    loadAllTags()
    {

        let query = "SELECT id,value FROM Tag INNER JOIN ta_tagAttribute_language ON  Tag.id = ta_tagAttribute_language.idTag WHERE idLanguage = 1";

        return this._queryEngine.executeQuery(query).then(function(res){
            console.log(res);
            return res;
        });
    }


    loadAllCategories()
    {

        let query = "SELECT id,value FROM Category INNER JOIN ta_categoryAttribute_language ON Category.id = ta_categoryAttribute_language.idCategory WHERE idLanguage = 1 AND idCategoryAttribute = 1";

        return this._queryEngine.executeQuery(query).then(function(res){
            return res;
        });
    }

    loadProductbyId(id_product, code_lang) {

        let query = "SELECT Product.id as product_id, productattribute.*, ta_productattribute_language.*, Product.image as image, Product.retailPrice FROM Product INNER JOIN ta_productattribute_language ON Product.id = ta_productattribute_language.idProduct INNER JOIN productattribute ON ta_productattribute_language.productAttributeId = productattribute.id WHERE product.id = " + id_product;



        return this._queryEngine.executeQuery(query);
    }

    loadProduct(code_lang) {
        let query = "SELECT Product.id as product_id, productattribute.*, ta_productattribute_language.*, Product.image as image, Product.retailPrice FROM Product INNER JOIN ta_productattribute_language ON Product.id = ta_productattribute_language.idProduct INNER JOIN productattribute ON ta_productattribute_language.productAttributeId = productattribute.id WHERE productattribute.type = 'title'";

        return this._queryEngine.executeQuery(query);
    }

    addProduct(product) {
        let query = "INSERT INTO Product VALUES (DEFAULT,?,?,?,?,?,?,?,NULL)";
        let param = [product.retailPrice,product.costPrice,product.qty,product.image,product.featured,product.isVisible,product.dropWeightGram];
        let currentQueryEngine = this._queryEngine;
        return this._queryEngine.executeQuery(query,param).then(function(res){
            let insertedId = res.insertId;
            let queryInsertAttributes = "INSERT INTO ta_productattribute_language VALUES ?";
            let paramAttributes = [[1,1,insertedId,product.name],[2,1,insertedId,product.description],[3,1,insertedId,product.advice]];

            currentQueryEngine.executeQuery(queryInsertAttributes,[paramAttributes]).then(function(res){
                
                let queryLinkTags = "INSERT INTO ta_tag_product VALUES ?";
                let paramLinkTags = [];

                for(let i = 0;i < product.tags.length;i++)
                {
                    paramLinkTags.push(["DEFAULT",product.tags[i],insertedId])
                }

                currentQueryEngine.executeQuery(queryLinkTags,[paramLinkTags]).then(function(res){
                    console.log("Linked the tags");
                    console.log(res);
                });
            });
        });
    }

    updateProduct(id_product, code_lang) {

    }

}

module.exports = MgrProduct;