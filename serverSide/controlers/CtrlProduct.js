const Product = require("../class/Product.js");
const MgrProduct = require("../managers/MgrProduct.js");

class CtrlProduct {
    constructor() {
        this._mgrProduct = new MgrProduct();
    }


    getCommentsIndex(code_lang) {
        let products = this._mgrProduct.loadCommentSlider();
    }
  
    updateProduct(productInfos)
    {
        let context = this;
        return this.loadProductInfosById(productInfos.id).then(function(productBefore){

            let product = new Product();
            product.id = productInfos.id;
            product.name = productInfos.name;

            if(productInfos.imgName == undefined){
                product.image = productBefore.image;  
            }
            else{
                product.image = productInfos.imgName;
            }
            
            product.description = productInfos.description
            product.advice = productInfos.advice;
            product.qty = productInfos.qty;
            product.featured = 'b1';
            product.isVisible = productInfos.isVisible;
            product.dropWeightGram = productInfos.weight;
            product.retailPrice = productInfos.retailPrice;
            product.costPrice = productInfos.costPrice;
            product.category = productInfos.category;
            product.tags = productInfos.tags;

            return context._mgrProduct.updateProduct(product).then(function(res){
                console.log(res);
            });

        })

    }

    loadProductInfosById(productId)
    {
        return this._mgrProduct.loadProductInfosById(productId).then(function(res){
            console.log(res);
            let product = new Product();
            product.id = res[0][0].id;
            product.retailPrice = res[0][0].retailPrice;
            product.costPrice = res[0][0].costPrice;
            product.qty = res[0][0].quantity;
            product.image = res[0][0].image;
            product.featured = res[0][0].featured;
            product.isVisible = res[0][0].isVisible;
            product.category = res[2][0].idCategory;
            product.dropWeightGram = res[0][0].dropWeightGram;
            product.name = res[1][0].value;
            product.description = res[1][1].value;
            product.advice = res[1][2].value;

            return product;
        });
    }


    loadTagsRelatedToProduct(productId)
    {
        return this._mgrProduct.loadTagsRelatedToProduct(productId).then(function(res){
            let html = "";
            let idRelatedToProduct = [];

            if(res != undefined && res.length > 0)
            {
                res.forEach(function(row){
                    html += "<a href='#' class='list-group-item list-group-item-action' data-id="+row.idTag+">"+row.value+"</a>";
                    idRelatedToProduct.push(row.idTag);
                });
            }

            return [html,idRelatedToProduct];

        });
    }

    //Loads all the tags that are related and not related to the product (makes the difference between them)
    loadTagsForBoxes(productId)
    {
        let idRelatedToProduct = [];
        let currentContext = this;
        return this.loadTagsRelatedToProduct(productId).then(function(res){

            let htmlRelatedTags = res[0];
            let idRelatedToProduct = res[1];

            return currentContext.loadAllTags(idRelatedToProduct).then(function(result){
                return [htmlRelatedTags,result];
            });
        });
    }

    //Loads all the tags except the one precised in the except tags (can be undefined)
    loadAllTags(exceptTags)
    {
        return this._mgrProduct.loadAllTags(exceptTags).then(function(res){
            let html = "";

            if(res != undefined && res.length > 0)
            {
                res.forEach(function(row){
                    html += "<a href='#' class='list-group-item list-group-item-action' data-id="+row.id+">"+row.value+"</a>";
                });                
            }


            return html;
        });
    }

    //@productCategoryId is optional
    loadAllCategories(productCategoryId)
    {
        return this._mgrProduct.loadAllCategories().then(function(res){
            let html = "";

            if(res != undefined)
            {

                 res.forEach(function(row){
                                  console.log(row.id);
                console.log(productCategoryId);
                    html += "<option value="+row.id+1+">"+row.value+"</option>";
                });               
            }


            return html;
        });
    }

    //adds a product in the DB
    //@productInfos are the infos
    //the user entered
    addProduct(productInfos)
    {
        let product = new Product();
        product.name = productInfos.name;
        product.image = productInfos.imgName;
        product.description = productInfos.description
        product.advice = productInfos.advice;
        product.qty = productInfos.qty;
        product.featured = productInfos.isFeatured;
        product.isVisible = productInfos.isVisible;
        product.dropWeightGram = productInfos.weight;
        product.retailPrice = productInfos.retailPrice;
        product.costPrice = productInfos.costPrice;
        product.category = productInfos.category;
        product.tags = productInfos.tags;

        return this._mgrProduct.addProduct(product).then(function(res){
            return true;
        })
        .catch(function(res){
            return false;
        });
    }


getCommentsIndex(code_lang) {
        let products = this._mgrProduct.loadCommentSlider();

        return products.then(function(val) {
            let catalogue_product = [];

            val.forEach(function(product) {

                let ele = '<div class="slider-temoignage-item">';
                ele += '<div class="temoignage-person">';
                ele += product.firstName + ' ' + product.lastName;
                ele += '</div>';
                ele += '<div class="temoignage-texte">';
                ele += product.commentTxt;
                ele += '</div></div>';
                catalogue_product.push(ele);
            });

            return catalogue_product;
        });
    }

    getProductFeatured() {
        let products = this._mgrProduct.loadProductFeatured();

        return products.then(function(val) {
            let catalogue_product = [];

            val.forEach(function(product) {

                let ele = '<div class="slider-featured-item">';
                ele += '<div class="slider-main-item-a" onclick="sliderFeaturedClick(' + product.id + ')">';
                ele += '<img class="slider-featured-image" src="./images/' + product.image + '" alt="' + product.image + '">';
                ele += "</div></div>";
                catalogue_product.push(ele);
            });

            return catalogue_product;
        });
    }

    getProductInfo(id, code_lang) {
        let products = this._mgrProduct.loadProductbyId(id, code_lang);

        return products.then(function(val) {
            let catalogue_product = [];

            let ele = '<div class="produit-div-image">';
            ele += '<img class="produit-image" src="./images/' + val[0].image + '" alt="' + val[0].value + '">';
            ele += '</div>';
            ele += '<div class="produit-details">';
            ele += '<div class="produit-details-nom">';
            ele += '<h2>' + val[0].value + '</h2>';
            ele += '</div>';
            ele += '<div class="catalogue-produit-review">';
            ele += '<div class="catalogue-produit-etoile">';
            ele += '<img class="catalogue-produit-etoiles" src="./images/icons/star_full.png" alt="Star">';
            ele += '<img class="catalogue-produit-etoiles" src="./images/icons/star_full.png" alt="Star">';
            ele += '<img class="catalogue-produit-etoiles" src="./images/icons/star_full.png" alt="Star">';
            ele += '<img class="catalogue-produit-etoiles" src="./images/icons/star_full.png" alt="Star">';
            ele += '<img class="catalogue-produit-etoiles" src="./images/icons/star_full.png" alt="Star">';
            ele += '</div>';
            ele += '<div class="catalogue-produit-comm">';
            ele += 'Aucun commentaire';
            ele += '</div>';
            ele += '</div>';
            ele += '<div class="produit-details-prix">';
            ele += '<h2> $ ' + val[0].retailPrice + ' CAD</h2>';
            ele += '</div>';
            ele += '<div class="produit-details-cart"><button class="manager-button produit-cart-button">Ajouter au panier</button></div>';

            ele += '<div class="produit-details-description">' + val[1].value + '</div></div>';

            catalogue_product.push(ele);



            return catalogue_product[0];
        });
    }

    getProductCatalogue() {
        let products = this._mgrProduct.loadProduct();

        return products.then(function(val) {
            let catalogue_product = [];

            val.forEach(function(product) {
                //product.image = "default.jpg";
                let ele = '<div class="catalogue-produit" onclick="openInfo(' + product.product_id + ');">';
                ele += '<div class="catalogue-produit-div-image">';
                ele += '<img class="catalogue-produit-image" src="./images/' + product.image + '" alt="' + product.value + '">';
                ele += '</div>';
                ele += '<div class="catalogue-produit-nom">';
                ele += product.value;
                ele += '</div>';
                ele += '<div class="catalogue-produit-review">';
                ele += '<div class="catalogue-produit-etoile">';
                ele += '<img class="catalogue-produit-etoiles" src="./images/icons/star_full.png" alt="Star">';
                ele += '<img class="catalogue-produit-etoiles" src="./images/icons/star_full.png" alt="Star">';
                ele += '<img class="catalogue-produit-etoiles" src="./images/icons/star_full.png" alt="Star">';
                ele += '<img class="catalogue-produit-etoiles" src="./images/icons/star_full.png" alt="Star">';
                ele += '<img class="catalogue-produit-etoiles" src="./images/icons/star_full.png" alt="Star">';
                ele += '<div class = "catalogue-produit-comm">';
                ele += 'Aucun commentaire';
                ele += '</div>';
                ele += '<div class="catalogue-produit-prix">';
                ele += '$' + product.retailPrice + ' CAD';
                ele += '</div>';
                ele += '</div>';
                ele += '</div>';
                ele += '<div class="catalogue-produit-panier">';
                ele += '<img class="catalogue-produit-image-panier" src="./images/icons/cart_black.png" alt="Panier">';
                ele += '</div>';

                catalogue_product.push(ele);
            });

            return catalogue_product;
        });
    }

    loadProductSearch(code_lang, search) {
        let products = this._mgrProduct.loadProductSearch(code_lang, search);
        console.log(products);
        return products.then(function(val) {
            let catalogue_product = [];

            val.forEach(function(product) {
                //product.image = "default.jpg";
                let ele = '<div class="catalogue-produit" onclick="openInfo(' + product.product_id + ');">';
                ele += '<div class="catalogue-produit-div-image">';
                ele += '<img class="catalogue-produit-image" src="./images/' + product.image + '" alt="' + product.value + '">';
                ele += '</div>';
                ele += '<div class="catalogue-produit-nom">';
                ele += product.value;
                ele += '</div>';
                ele += '<div class="catalogue-produit-review">';
                ele += '<div class="catalogue-produit-etoile">';
                ele += '<img class="catalogue-produit-etoiles" src="./images/icons/star_full.png" alt="Star">';
                ele += '<img class="catalogue-produit-etoiles" src="./images/icons/star_full.png" alt="Star">';
                ele += '<img class="catalogue-produit-etoiles" src="./images/icons/star_full.png" alt="Star">';
                ele += '<img class="catalogue-produit-etoiles" src="./images/icons/star_full.png" alt="Star">';
                ele += '<img class="catalogue-produit-etoiles" src="./images/icons/star_full.png" alt="Star">';
                ele += '<div class = "catalogue-produit-comm">';
                ele += 'Aucun commentaire';
                ele += '</div>';
                ele += '<div class="catalogue-produit-prix">';
                ele += '$' + product.retailPrice + ' CAD';
                ele += '</div>';
                ele += '</div>';
                ele += '</div>';
                ele += '<div class="catalogue-produit-panier">';
                ele += '<img class="catalogue-produit-image-panier" src="./images/icons/cart_black.png" alt="Panier">';
                ele += '</div>';
                ele += '</div>';
                catalogue_product.push(ele);
            });

            return catalogue_product;
        });
    }

    loadProductSearchCategory(code_lang, search) {
        let products = this._mgrProduct.loadProductSearchCategory(code_lang, search);
        console.log(products);
        return products.then(function(val) {
            let catalogue_product = [];

            val.forEach(function(product) {
                //product.image = "default.jpg";
                let ele = '<div class="catalogue-produit" onclick="openInfo(' + product.product_id + ');">';
                ele += '<div class="catalogue-produit-div-image">';
                ele += '<img class="catalogue-produit-image" src="./images/' + product.image + '" alt="' + product.value + '">';
                ele += '</div>';
                ele += '<div class="catalogue-produit-nom">';
                ele += product.value;
                ele += '</div>';
                ele += '<div class="catalogue-produit-review">';
                ele += '<div class="catalogue-produit-etoile">';
                ele += '<img class="catalogue-produit-etoiles" src="./images/icons/star_full.png" alt="Star">';
                ele += '<img class="catalogue-produit-etoiles" src="./images/icons/star_full.png" alt="Star">';
                ele += '<img class="catalogue-produit-etoiles" src="./images/icons/star_full.png" alt="Star">';
                ele += '<img class="catalogue-produit-etoiles" src="./images/icons/star_full.png" alt="Star">';
                ele += '<img class="catalogue-produit-etoiles" src="./images/icons/star_full.png" alt="Star">';
                ele += '<div class = "catalogue-produit-comm">';
                ele += 'Aucun commentaire';
                ele += '</div>';
                ele += '<div class="catalogue-produit-prix">';
                ele += '$' + product.retailPrice + ' CAD';
                ele += '</div>';
                ele += '</div>';
                ele += '</div>';
                ele += '<div class="catalogue-produit-panier">';
                ele += '<img class="catalogue-produit-image-panier" src="./images/icons/cart_black.png" alt="Panier">';
                ele += '</div>';
                ele += '</div>';
                catalogue_product.push(ele);
            });

            return catalogue_product;
        });
    }
}

module.exports = CtrlProduct;