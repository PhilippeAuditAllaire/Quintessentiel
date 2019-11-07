const Product = require("../class/Product.js");
const MgrProduct = require("../managers/MgrProduct.js");

class CtrlProduct {
    constructor() {
        this._mgrProduct = new MgrProduct();
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
}

module.exports = CtrlProduct;