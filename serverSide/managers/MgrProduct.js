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

    updateProduct(product)
    {

       let queryUpdateBasicInfos = "UPDATE Product SET retailPrice = ?,costPrice = ?,quantity = ?,image = ?,featured = ?,isVisible = ?,dropWeightGram = ? WHERE id = ?";
       let basicParam = [product.retailPrice,product.costPrice,product.qty,product.image,product.featured,product.isVisible,product.dropWeightGram,product.id];
       let currentQueryEngine = this._queryEngine;
       let context = this;

       return this._queryEngine.executeQuery(queryUpdateBasicInfos,basicParam).then(function(res){
        console.log(res);
            return Promise.all([context.updateProductTitle(product.name,product.id),context.updateProductDescription(product.description,product.id),context.updateAdvice(product.advice,product.id),context.removeAllRelatedTags(product.id),context.removeRelatedCategory(product.id)]).then(function(){
                return Promise.all([context.insertCategoryAttribute(product.id,product.category),context.insertTagAttribute(product.id,product.tags)])
            })  

       })

    }

    removeAllRelatedTags(productId)
    {
        let queryRemoveTags = "DELETE FROM ta_tag_product WHERE idProduct = ?";
        let paramRemoveTags = [productId];

        return this._queryEngine.executeQuery(queryRemoveTags,paramRemoveTags);
    }

    removeRelatedCategory(productId)
    {
        let queryRemoveRelatedCategory = "DELETE FROM ta_category_product WHERE idProduct = ?";
        let paramRemoveCategory = [productId];

        return this._queryEngine.executeQuery(queryRemoveRelatedCategory,paramRemoveCategory);
    }

    updateProductTitle(productTitle,productId)
    {
         let queryUpdateTitle = "UPDATE ta_productattribute_language SET value = ? WHERE idProduct = ? AND productAttributeId = 1";
         let paramUpdateTitle = [productTitle,productId];

         return this._queryEngine.executeQuery(queryUpdateTitle,paramUpdateTitle);
    }

    updateProductDescription(productDescription,productId)
    {
         let queryUpdateDescription = "UPDATE ta_productattribute_language SET value = ? WHERE idProduct = ? AND productAttributeId = 2";
         let paramUpdateDescription = [productDescription,productId];

         return this._queryEngine.executeQuery(queryUpdateDescription,paramUpdateDescription);
    }

    updateAdvice(productAdvice,productId)
    {
         let queryUpdateAdvice= "UPDATE ta_productattribute_language SET value = ? WHERE idProduct = ? AND productAttributeId = 3";
         let paramUpdateAdvice = [productAdvice,productId];

         return this._queryEngine.executeQuery(queryUpdateAdvice,paramUpdateAdvice);
    } 

    loadProductInfosById(productId)
    {
       let queryProduct = "SELECT * FROM Product WHERE Product.id = ?";
       let paramProduct = [productId];
       let currentQueryEngine = this._queryEngine;
       let context = this;

       return this._queryEngine.executeQuery(queryProduct,paramProduct).then(function(productInfos){
            let queryAttributes = "SELECT * FROM ta_productattribute_language WHERE idProduct = ?";
            let paramAttributes = [productId];

            return context.loadCategoryIdRelatedToProduct(productId).then(function(result){

                 return currentQueryEngine.executeQuery(queryAttributes,paramAttributes).then(function(attributesInfos){
                    let prodInfos = productInfos;
                    let attInfos = attributesInfos;
                    let categoryId = result;

                    return [productInfos,attInfos,categoryId];
                });               
            })


       });
    }

    loadCategoryIdRelatedToProduct(productId)
    {
        let query = "SELECT ta_category_product.idCategory FROM ta_category_product INNER JOIN ta_categoryAttribute_language ON ta_category_product.idCategory = ta_categoryAttribute_language.idCategory WHERE idProduct = ?";
        let param = [productId];

        return this._queryEngine.executeQuery(query,param).then(function(res){
            return res;
        });
    }


    loadTagsRelatedToProduct(productId)
    {
        let query = "SELECT ta_tag_product.idTag,value FROM ta_tag_product INNER JOIN ta_tagAttribute_language ON ta_tagAttribute_language.idTag = ta_tag_product.idTag  WHERE ta_tag_product.idProduct = ?";
        let param = [productId]

        return this._queryEngine.executeQuery(query,param).then(function(res){
            return res;
        });
    }


    loadAllTags(exceptTags)
    {

        let query = "SELECT Tag.id,value FROM Tag INNER JOIN ta_tagAttribute_language ON Tag.id = ta_tagAttribute_language.idTag";

        let param = [];

        if(exceptTags != undefined && exceptTags.length > 0){
            query +=  " WHERE Tag.id NOT IN (";

            for(let i = 0;i < exceptTags.length;i++)
            {
                if(i < exceptTags.length-1)
                {
                   query += "?,"; 
                }
                else{
                    query += "?";
                }

                param.push(exceptTags[i]);
                
            }

            query += ")";
        }

        return this._queryEngine.executeQuery(query,param).then(function(res){
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

        let query = "SELECT Product.id as product_id, productattribute.*, ta_productattribute_language.*, Product.image as image, Product.retailPrice FROM Product INNER JOIN ta_productattribute_language ON Product.id = ta_productattribute_language.idProduct INNER JOIN productattribute ON ta_productattribute_language.productAttributeId = productattribute.id WHERE product.id = ?";
        let param = [id_product];


        return this._queryEngine.executeQuery(query,param);
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

    insertTagAttribute(productId,tagList){

        if(tagList != undefined)
        {
            let queryLinkTags = "INSERT INTO ta_tag_product VALUES ?";
            let paramLinkTags = [];

            for(let i = 0;i < tagList.length;i++)
            {
                paramLinkTags.push(["DEFAULT",tagList[i],productId])
            } 

            return this._queryEngine.executeQuery(queryLinkTags,[paramLinkTags]);           
        }

    }

    insertCategoryAttribute(productId, categoryId)
    {
        let queryCategory = "INSERT INTO ta_category_product VALUES (DEFAULT,?,?)";
        let paramCategory = [categoryId,productId];

        return this._queryEngine.executeQuery(queryCategory,paramCategory);
    }

    addProduct(product) {
        let query = "INSERT INTO Product VALUES (DEFAULT,?,?,?,?,1,1,2.53,NULL)";
        console.log(product.dropWeightGram);
        let param = [product.retailPrice,product.costPrice,product.qty,product.image,product.featured,product.isVisible,product.dropWeightGram];
        let currentQueryEngine = this._queryEngine;

        return this._queryEngine.executeQuery(query,param).then(function(res){
            console.log(res);
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
                    let queryCategory = "INSERT INTO ta_category_product VALUES (DEFAULT,?,?)";
                    let paramCategory = [product.category,insertedId];

                    currentQueryEngine.executeQuery(queryCategory,paramCategory).then(function(res){
                        console.log("Added category")
                        console.log(res)
                    })
                });
            });
        });
    }


}

module.exports = MgrProduct;