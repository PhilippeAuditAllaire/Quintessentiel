const QueryEngine = require("../scripts/QueryEngine.js");

class MgrProduct {
    constructor() {
        this._queryEngine = new QueryEngine();
    }

    //Loads a product name
    //based on its id and on the language id
    //@Returns a promise
    loadProductName(productId,languageId)
    {
        let query = "SELECT value FROM ta_productattribute_language WHERE idProduct = ? AND idLanguage = ? AND productAttributeId = 1";
        let param = [productId,languageId];

        return this._queryEngine.executeQuery(query,param);
    }

    //Loads all the non translatable infos
    //of a product by its id
    //@Returns a promise
    loadProductsTranslatableInfosById(productId)
    {
        let query = "SELECT * FROM Product WHERE id = ?";
        let param = [productId];

        return this._queryEngine.executeQuery(query,param);
    }

    //Loads the categories that are associated
    //with the given product id
    //@productId is the id of the 
    //product to look for its categories
    loadCategoryByProductId(productId) {
        let query = "SELECT ta_category_product.idCategory,ta_categoryAttribute_language.value FROM ta_category_product INNER JOIN ta_categoryAttribute_language ON ta_category_product.idCategory = ta_categoryAttribute_language.idCategory WHERE idProduct = ? AND ta_categoryAttribute_language.idLanguage = 1";
        let param = [productId];

        return this._queryEngine.executeQuery(query, param).then(function(res) {
            return res;
        });
    }

    //Loads all the givne product translatable infos
    loadTranslatableInfos(productId, langId) {
        let query = "SELECT * FROM ta_productattribute_language WHERE idProduct = ? AND idLanguage = ? ORDER BY productAttributeId";
        let param = [productId, langId];

        return this._queryEngine.executeQuery(query, param);
    }

    //Loads all the products infos
    loadAllProductsNonTranslatableInfos() {
        let query = "SELECT * FROM Product";
        return this._queryEngine.executeQuery(query);
    }

    //Links the given category id
    //to the given product id
    //@productId is the product to link to 
    //@categoryId
    //@Returns a promise
    linkCategoryToProduct(productId, categoryId) {
        let query = `INSERT INTO ta_category_product 
                    (id,idCategory,idProduct) 
                    VALUES
                    (DEFAULT,?,?)`;
        let param = [categoryId, productId];

        return this._queryEngine.executeQuery(query, param);
    }


    //Adds the product infos that cannot be
    //translated such as the price
    //@productInfos is a product object containing
    //all the non translatable infos to add to the DB
    //@Returns a promise
    addNonTranslatableInfos(productInfos) {
        let query = `INSERT INTO Product 
                    (id,retailPrice,costPrice,quantity,image,featured,isVisible,dropWeightGram,amazonAffiliateLink,format) 
                    VALUES
                    (DEFAULT,?,?,?,?,?,?,?,?,?)`;
        let param = [productInfos.retailPrice, productInfos.costPrice, productInfos.qty, productInfos.image,
            productInfos.featured, productInfos.isVisible, productInfos.dropWeightGram, productInfos.amazonAfiliate, productInfos.format
        ];

        return this._queryEngine.executeQuery(query, param);
    }

    //Adds the text fields related to a product and to 
    //a given languages
    //@langId is the id of the languge of the translatableInfos
    //@translatableInfos is the list of text fields to be inserted
    //@Returns a promise
    addProductTextFields(langId, translatableInfos) {
        let query = `INSERT INTO ta_productattribute_language 
                    (productAttributeId,idLanguage,idProduct,value) 
                    VALUES
                    (?,?,?,?)`;
        let paramName = [1, langId, translatableInfos.id, translatableInfos.name];
        let paramDesc = [2, langId, translatableInfos.id, translatableInfos.description];
        let paramAdvice = [3, langId, translatableInfos.id, translatableInfos.advice];

        return Promise.all([this._queryEngine.executeQuery(query, paramName),
            this._queryEngine.executeQuery(query, paramDesc),
            this._queryEngine.executeQuery(query, paramAdvice)
        ]);
    }


    //Loads all the languages that are in the DB
    //@Returns a promise
    loadAvailableLanguages() {
        let query = "SELECT * FROM Language";
        return this._queryEngine.executeQuery(query);
    }


    //Deletes the given product
    //@productId is the id of the
    //product to delete
    deleteProduct(productId) {
        let query = "DELETE FROM Product WHERE id = ?";
        let param = [productId];

        return this._queryEngine.executeQuery(query, param);
    }

    //Deletes all the product attributes
    //that are related to the given product id
    //@productId is the id of the product to 
    //delete its attributes
    deleteProductAttributes(productId) {
        let query = "DELETE FROM ta_productattribute_language WHERE idProduct = ?";
        let param = [productId];

        return this._queryEngine.executeQuery(query, param);
    }

    //Deletes all the categories associated
    //with a given product id
    //@productId is the id of the product
    //to delete the related categories
    deleteProductCategories(productId) {
        let query = "DELETE FROM ta_category_product WHERE idProduct = ?";
        let param = [productId];

        return this._queryEngine.executeQuery(query, param);
    }

    loadCommentSlider(code_lang) {
        let query = "SELECT * FROM comment JOIN users ON users.id = comment.idUser JOIN commentstatus ON commentstatus.id = comment.idStatus WHERE commentstatus.name = 'Approved'";

        return this._queryEngine.executeQuery(query);
    }

    loadProductFeatured() {
        let query = "SELECT * FROM Product where featured = '1'";

        return this._queryEngine.executeQuery(query);
    }
    updateProduct(product) {

        let queryUpdateBasicInfos = "UPDATE Product SET retailPrice = ?,costPrice = ?,quantity = ?,image = ?,featured = ?,isVisible = ?,dropWeightGram = ? WHERE id = ?";
        let basicParam = [product.retailPrice, product.costPrice, product.qty, product.image, product.featured, product.isVisible, product.dropWeightGram, product.id];
        let currentQueryEngine = this._queryEngine;
        let context = this;

       return this._queryEngine.executeQuery(queryUpdateBasicInfos,basicParam).then(function(res){

            return Promise.all([context.updateProductTitle(product.name,product.id),context.updateProductDescription(product.description,product.id),context.updateAdvice(product.advice,product.id),context.removeAllRelatedTags(product.id),context.removeRelatedCategory(product.id)]).then(function(res){
    
                return Promise.all([context.insertCategoryAttribute(product.id,product.category),context.insertTagAttribute(product.id,product.tags)])
            })  

        })

    }

    removeRelatedCategory(productId) {
        let queryRemoveRelatedCategory = "DELETE FROM ta_category_product WHERE idProduct = ?";
        let paramRemoveCategory = [productId];

        return this._queryEngine.executeQuery(queryRemoveRelatedCategory, paramRemoveCategory);
    }

    updateProductTitle(productTitle, productId) {
        let queryUpdateTitle = "UPDATE ta_productattribute_language SET value = ? WHERE idProduct = ? AND productAttributeId = 1";
        let paramUpdateTitle = [productTitle, productId];

        return this._queryEngine.executeQuery(queryUpdateTitle, paramUpdateTitle);
    }

    updateProductDescription(productDescription, productId) {
        let queryUpdateDescription = "UPDATE ta_productattribute_language SET value = ? WHERE idProduct = ? AND productAttributeId = 2";
        let paramUpdateDescription = [productDescription, productId];

        return this._queryEngine.executeQuery(queryUpdateDescription, paramUpdateDescription);
    }

    updateAdvice(productAdvice, productId) {
        let queryUpdateAdvice = "UPDATE ta_productattribute_language SET value = ? WHERE idProduct = ? AND productAttributeId = 3";
        let paramUpdateAdvice = [productAdvice, productId];

        return this._queryEngine.executeQuery(queryUpdateAdvice, paramUpdateAdvice);
    }

    loadProductInfosById(productId) {
        let queryProduct = "SELECT * FROM Product WHERE Product.id = ?";
        let paramProduct = [productId];
        let currentQueryEngine = this._queryEngine;
        let context = this;

        return this._queryEngine.executeQuery(queryProduct, paramProduct).then(function(productInfos) {
            let queryAttributes = "SELECT * FROM ta_productattribute_language WHERE idProduct = ?";
            let paramAttributes = [productId];

            return context.loadCategoryIdRelatedToProduct(productId).then(function(result) {

                return currentQueryEngine.executeQuery(queryAttributes, paramAttributes).then(function(attributesInfos) {
                    let prodInfos = productInfos;
                    let attInfos = attributesInfos;
                    let categoryId = result;

                    return [productInfos, attInfos, categoryId];
                });
            })


        });
    }


    loadTagsRelatedToProduct(productId) {
        let query = "SELECT ta_tag_product.idTag,value FROM ta_tag_product INNER JOIN ta_tagAttribute_language ON ta_tagAttribute_language.idTag = ta_tag_product.idTag  WHERE ta_tag_product.idProduct = ?";
        let param = [productId]

        return this._queryEngine.executeQuery(query, param).then(function(res) {
            return res;
        });
    }


    loadAllTags(exceptTags) {

        let query = "SELECT Tag.id,value FROM Tag INNER JOIN ta_tagAttribute_language ON Tag.id = ta_tagAttribute_language.idTag";

        let param = [];

        if (exceptTags != undefined && exceptTags.length > 0) {
            query += " WHERE Tag.id NOT IN (";

            for (let i = 0; i < exceptTags.length; i++) {
                if (i < exceptTags.length - 1) {
                    query += "?,";
                } else {
                    query += "?";
                }

                param.push(exceptTags[i]);

            }

            query += ")";
        }

        return this._queryEngine.executeQuery(query, param).then(function(res) {
            return res;
        });
    }


    loadAllCategories() {

        let query = "SELECT id,value FROM Category INNER JOIN ta_categoryAttribute_language ON Category.id = ta_categoryAttribute_language.idCategory WHERE idLanguage = 1 AND idCategoryAttribute = 1";

        return this._queryEngine.executeQuery(query).then(function(res) {
            return res;
        });
    }

    loadProductbyId(id_product, code_lang) {
        let query = "SELECT Product.id as product_id, productattribute.*, ta_productattribute_language.*, Product.image as image, Product.retailPrice FROM Product INNER JOIN ta_productattribute_language ON Product.id = ta_productattribute_language.idProduct INNER JOIN productattribute ON ta_productattribute_language.productAttributeId = productattribute.id WHERE product.id = ? AND ta_productattribute_language.idLanguage = ? ORDER BY productattribute.id";
        let param = [id_product, code_lang];

        return this._queryEngine.executeQuery(query, param);
    }

    loadProduct(code_lang) {
        let query = "SELECT Product.id as product_id, productattribute.*, ta_productattribute_language.*, Product.image as image, Product.retailPrice FROM Product INNER JOIN ta_productattribute_language ON Product.id = ta_productattribute_language.idProduct INNER JOIN productattribute ON ta_productattribute_language.productAttributeId = productattribute.id WHERE productattribute.type = 'title'";

        return this._queryEngine.executeQuery(query);
    }

    loadProductSearch(code_lang, search) {
        let query = "SELECT Product.id as product_id, productattribute.*, ta_productattribute_language.*, Product.image as image, Product.retailPrice FROM Product INNER JOIN ta_productattribute_language ON Product.id = ta_productattribute_language.idProduct INNER JOIN productattribute ON ta_productattribute_language.productAttributeId = productattribute.id WHERE productattribute.type = 'title' AND ta_productattribute_language.value LIKE '%" + search + "%'"
        return this._queryEngine.executeQuery(query);
    }

    /*Select the products that match all of the categories passed
    in the search array 
    */
    loadProductSearchCategory(code_lang, search) {
        let query = "SELECT DISTINCT Product.id as product_id,ta_category_product.idCategory FROM product INNER JOIN ta_productattribute_language ON Product.id = ta_productattribute_language.idProduct INNER JOIN productattribute ON ta_productattribute_language.productAttributeId = productattribute.id INNER JOIN ta_category_product ON product.id = ta_category_product.idProduct INNER JOIN category ON ta_category_product.idCategory = category.id INNER JOIN ta_categoryattribute_language ON category.id = ta_categoryattribute_language.idCategory WHERE ta_categoryattribute_language.value IN (";
        for (let i = 0; i < search.length; i++) {
            if (i != (search.length - 1)) {
                var conditions = "'" + search[i] + "',";
            } else {
                var conditions = "'" + search[i] + "'";
            }
            query = query.concat(conditions);
        }
        let endQuery = ") Order BY Product.id";
        query = query.concat(endQuery);

        console.log(query);
        return this._queryEngine.executeQuery(query);
    }

    /*Select the information necessary to populate the catalog
    by the ids of the product
    */
    loadCatalogProductID(code_lang, ids) {
        let query = "SELECT Product.id as product_id, productattribute.*, ta_productattribute_language.*, Product.image as image, Product.retailPrice FROM Product INNER JOIN ta_productattribute_language ON Product.id = ta_productattribute_language.idProduct INNER JOIN productattribute ON ta_productattribute_language.productAttributeId = productattribute.id WHERE product.id IN (";
        for (let i = 0; i < ids.length; i++) {
            if (i != (ids.length - 1)) {
                var conditions = "'" + ids[i] + "',";
            } else {
                var conditions = "'" + ids[i] + "'";
            }
            query = query.concat(conditions);
        }
        let endQuery = ") AND productattribute.type = 'title'";
        query = query.concat(endQuery);

        console.log(query);
        return this._queryEngine.executeQuery(query);
    }

    insertTagAttribute(productId, tagList) {

        if (tagList != undefined) {
            let queryLinkTags = "INSERT INTO ta_tag_product VALUES ?";
            let paramLinkTags = [];

            for (let i = 0; i < tagList.length; i++) {
                paramLinkTags.push(["DEFAULT", tagList[i], productId])
            }

            return this._queryEngine.executeQuery(queryLinkTags, [paramLinkTags]);
        }

    }

    insertCategoryAttribute(productId, categoryId) {
        let queryCategory = "INSERT INTO ta_category_product VALUES (DEFAULT,?,?)";
        let paramCategory = [categoryId, productId];

        return this._queryEngine.executeQuery(queryCategory, paramCategory);
    }

    addProduct(product) {
        let query = "INSERT INTO Product VALUES (DEFAULT,?,?,?,?,1,1,12,NULL)";
        let param = [product.retailPrice, product.costPrice, product.qty, product.image, product.featured, product.isVisible, product.dropWeightGram];
        let currentQueryEngine = this._queryEngine;

        return this._queryEngine.executeQuery(query, param).then(function(res) {
            let insertedId = res.insertId;
            let queryInsertAttributes = "INSERT INTO ta_productattribute_language VALUES ?";
            let paramAttributes = [
                [1, 1, insertedId, product.name],
                [2, 1, insertedId, product.description],
                [3, 1, insertedId, product.advice]
            ];

            currentQueryEngine.executeQuery(queryInsertAttributes, [paramAttributes]).then(function(res) {

                let queryLinkTags = "INSERT INTO ta_tag_product VALUES ?";
                let paramLinkTags = [];

                for (let i = 0; i < product.tags.length; i++) {
                    paramLinkTags.push(["DEFAULT", product.tags[i], insertedId])
                }

                currentQueryEngine.executeQuery(queryLinkTags, [paramLinkTags]).then(function(res) {
                    let queryCategory = "INSERT INTO ta_category_product VALUES (DEFAULT,?,?)";
                    let paramCategory = [product.category, insertedId];

                    currentQueryEngine.executeQuery(queryCategory, paramCategory).then(function(res) {
                        console.log("Added category")
                        console.log(res)
                    })
                });
            });
        });
    }

    getAllProducts() {
        let query = "SELECT Product.id as product_id, ta_productattribute_language.value, Product.retailPrice, product.costPrice, product.isVisible FROM Product INNER JOIN ta_productattribute_language ON Product.id = ta_productattribute_language.idProduct INNER JOIN productattribute ON ta_productattribute_language.productAttributeId = productattribute.id where productattribute.type='title'";
        return this._queryEngine.executeQuery(query);
    }
}

module.exports = MgrProduct;