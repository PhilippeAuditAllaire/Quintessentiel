const Product = require("../class/Product.js");
const MgrProduct = require("../managers/MgrProduct.js");

class CtrlProduct {
    constructor() {
        this._mgrProduct = new MgrProduct();
    }


    loadAllTags()
    {
        return this._mgrProduct.loadAllTags().then(function(res){
            let html = "";

            res.forEach(function(row){
                html += "<a href='#' class='list-group-item list-group-item-action' data-id="+row.id+">"+row.value+"</a>";
            });

            return html;
        });
    }


    loadAllCategories(selectedCategory)
    {
        return this._mgrProduct.loadAllCategories().then(function(res){
            let html = "";

            res.forEach(function(row){
                html += "<option value="+row.id+">"+row.value+"</option>";
            });

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
                let ele = '<div class="catalogue-produit" onclick="openInfo(' + product.id + ');">';
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
}

module.exports = CtrlProduct;