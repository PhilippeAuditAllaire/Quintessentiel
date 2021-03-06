const Product = require("../class/Product.js");
const Category = require("../class/Category.js");
const ProductInfos = require("../class/ProductInfos.js");
const MgrProduct = require("../managers/MgrProduct.js");
const MgrLanguage = require("../managers/MgrLanguage.js");

class CtrlProduct {
    constructor() {
        this._mgrProduct = new MgrProduct();
        this._mgrLanguage = new MgrLanguage();
    }

    updateProduct(productInfos) {
        let context = this;

        return Promise.all([this._mgrProduct.deleteProductCategories(productInfos.id),
                this._mgrProduct.deleteProductAttributes(productInfos.id)
            ])
            .then(function(res) { //The product has been completely removed from the DB
                return context._mgrProduct.deleteProduct(productInfos.id).then(function(res) {
                    return context.addProduct(productInfos).then(function(res) {
                        return res;
                    })
                })

            })
            .catch(function(err) {
                return false;
            })
    }

    //Loads all the products
    loadAllProductsAdmin() {
        let currentMgr = this._mgrProduct;

        let lanugages;
        let productList = [];

        return currentMgr.loadAvailableLanguages().then(function(resLang) { //Load the languages

            let languages = resLang;


            //Load all the products (only load the non translatable infos)
            return currentMgr.loadAllProductsNonTranslatableInfos().then(function(resNonTranslatable) {
                return resNonTranslatable;
            }).then(function(allNonTranslatableInfos) {

                //Reproduced a foreach in async
                async function asyncForEach(array, callback) {
                    for (let index = 0; index < array.length; index++) {
                        await callback(array[index], index, array);
                    }
                }

                const loadAllProductsInfos = async() => {
                    await asyncForEach(allNonTranslatableInfos, async(product) => {
                        let prod = new Product();
                        productList.push(prod); //Its a refference so no need to push it at the end

                        prod.id = product.id;
                        prod.image = product.image;
                        prod.qty = product.quantity;
                        prod.featured = product.featured;
                        prod.isVisible = product.isVisible;
                        prod.dropWeightGram = product.dropWeightGram;
                        prod.retailPrice = product.retailPrice;
                        prod.costPrice = product.costPrice;
                        prod.amazonAfiliate = product.amazonAffiliateLink;
                        prod.format = product.format;

                        currentMgr.loadCategoryByProductId(prod.id).then(function(categories) {
                            categories.forEach(function(category) {
                                let cat = new Category({ id: category.idCategory, name: category.value })

                                prod.category.push(cat)
                            })
                        });


                        await asyncForEach(languages, async(language) => { //For each language
                            await currentMgr.loadTranslatableInfos(prod.id, language.id).then(function(resTranslatable) { //Load this product infos
                                if (resTranslatable.length > 0) //If there are infos for that product in this language
                                {
                                    let productInfos = new ProductInfos(prod.id, language.id, resTranslatable[0].value, resTranslatable[1].value, resTranslatable[2].value);
                                    prod.traductions.push(productInfos);
                                }
                            });
                        });
                    });
                }

                return loadAllProductsInfos();


            })

        }).then(function(res) {
            return productList;
        })
    }

    //adds a product in the DB
    //@productInfos are the infos
    //the user entered
    addProduct(productInfos) {
        //Put the non translatableInfos in this product object
        let nonTranslatableInfos = new Product();
        nonTranslatableInfos.image = productInfos.imgName;
        nonTranslatableInfos.qty = productInfos.quantity;
        nonTranslatableInfos.featured = (productInfos.featured == "true" ? true : false);
        nonTranslatableInfos.isVisible = (productInfos.visible == "true" ? true : false);
        nonTranslatableInfos.amazonAfiliate = (productInfos.amazonAffiliate == "" ? "NULL" : productInfos.amazonAffiliate);
        nonTranslatableInfos.dropWeightGram = productInfos.weight;
        nonTranslatableInfos.retailPrice = productInfos.retailPrice;
        nonTranslatableInfos.costPrice = productInfos.costPrice;
        nonTranslatableInfos.category = productInfos.category;
        nonTranslatableInfos.format = productInfos.format;

        let currentMgrProduct = this._mgrProduct;
        let insertedId;
        return this._mgrProduct.addNonTranslatableInfos(nonTranslatableInfos).then(function(res) {
            insertedId = res.insertId;

            //Link the categories to the product
            productInfos.category.forEach(function(categoryId) {
                currentMgrProduct.linkCategoryToProduct(insertedId, categoryId).then(function(res) {});
            });

            //Now that the product is added, lets add all the text in every languages
            productInfos.translatedFields.forEach(function(fields) {
                let translatableInfos = new Product();

                translatableInfos.id = insertedId;
                translatableInfos.name = fields.productName;
                translatableInfos.description = fields.description;
                translatableInfos.advice = fields.advice;

                currentMgrProduct.addProductTextFields(fields.langId, translatableInfos).then(function(res) {});
            })

        }).then(function(res) {
            return insertedId; //Everything worked perfectly
        }).catch(function(res) {
            return false; //Error while adding the product
        })
    }


    //Generates the tabs of the add product modal
    //based on the number of languages
    //@modalName so the IDs can be customised depending of 
    //the modal (else the tabs only work for one modal since same id)
    generateModalProductTabs(modalName) {
        return this._mgrProduct.loadAvailableLanguages().then(function(res) {
            let generatedHTML;
            let ul = "<ul class='nav nav-tabs'>";
            let tabContent = "<div class='tab-content'>";

            let i = 0;

            res.forEach(function(lang) {


                let isTabActive = "";

                if (i == 0) {
                    isTabActive = "active show";
                }

                ul += "<li class='nav-item'><a data-toggle='tab' href='#" + (modalName + lang.name) + "' class='nav-link " + isTabActive + "'>" + lang.name + "</a></li>";

                tabContent += `<div id=` + (modalName + lang.name) + ` class='tab-pane fade in ` + isTabActive + `' data-langId=` + lang.id + `>
                                <div class='wrapper-inputLabel-productModal modal-single-wrapper'>
                                        <div class='wrapper-modal-label'>
                                            <label>Nom du produit</label>
                                        </div>
                                        <div class='wrapper-modal-input'>
                                            <input type='text' name='' class='form-control productName'/>
                                        </div>
                                    </div>
                                    <div class='wrapper-inputLabel-productModal modal-single-wrapper textarea-wrapper'>
                                        <div class='wrapper-modal-label'>
                                            <label>Description du produit</label>
                                        </div>
                                        <div class='wrapper-modal-input'>
                                            <textarea class='description form-control'></textarea>
                                        </div>
                                    </div>
                                    <div class='wrapper-inputLabel-productModal modal-single-wrapper textarea-wrapper'>
                                        <div class='wrapper-modal-label'>
                                            <label>Conseils d'utilisation du produit</label>
                                        </div>
                                        <div class='wrapper-modal-input'>
                                            <textarea class='advice form-control'></textarea>
                                        </div>
                                 </div>
                                </div>`;
                i++;
            });

            ul += "</ul>";
            tabContent += "</div>";


            generatedHTML = ul + tabContent;

            return generatedHTML;
        });

    }

    /*Generates the HTML to populate the dropdown for
    each categories 
    ProductCategoryID is optional*/
    loadAllSearchCategories(productCategoryId, code_lang) {
        return this._mgrProduct.loadAllCategories(code_lang).then(function(res) {
            let html = "";

            if (res != undefined) {

                res.forEach(function(row) {
                    console.log(row.id);
                    console.log(productCategoryId);
                    html += "<option value=" + row.id + 1 + ">" + row.value + "</option>";
                });
            }


            return html;
        });
    }

    //Generates the HTML for each categories
    //based on the loadAllCategories function
    loadAllCategoriesHTML(productCategoryId) {

        return this.loadAllCategories(productCategoryId).then(function(categoryList) {
            let html = "";

            if (categoryList != undefined) {
                categoryList.forEach(function(category) {
                    html += "<a href='#' class='list-group-item list-group-item-action' data-id=" + category.id + ">" + category.name + "</a>";
                });
            }

            return html;
        });

    }


    //Loads every categories that exist
    //@productCategoryId is optional, given the category id
    //it can identify if the given category is related to the product and make it selected
    loadAllCategories(productCategoryId) {
        return this._mgrProduct.loadAllCategories().then(function(res) {
            let categories = [];

            res.forEach(function(category) {
                categories.push(new Category({ id: category.id, name: category.value }))
            });

            return categories;
        });
    }


    getCommentsIndex(code_lang) {
        let products = this._mgrProduct.loadCommentSlider();
    }


    loadProductInfosById(productId) {
        return this._mgrProduct.loadProductInfosById(productId).then(function(res) {
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


    loadTagsRelatedToProduct(productId) {
        return this._mgrProduct.loadTagsRelatedToProduct(productId).then(function(res) {
            let html = "";
            let idRelatedToProduct = [];

            if (res != undefined && res.length > 0) {
                res.forEach(function(row) {
                    html += "<a href='#' class='list-group-item list-group-item-action' data-id=" + row.idTag + ">" + row.value + "</a>";
                    idRelatedToProduct.push(row.idTag);
                });
            }

            return [html, idRelatedToProduct];

        });
    }

    //Loads all the tags that are related and not related to the product (makes the difference between them)
    loadTagsForBoxes(productId) {
        let idRelatedToProduct = [];
        let currentContext = this;
        return this.loadTagsRelatedToProduct(productId).then(function(res) {

            let htmlRelatedTags = res[0];
            let idRelatedToProduct = res[1];

            return currentContext.loadAllTags(idRelatedToProduct).then(function(result) {
                return [htmlRelatedTags, result];
            });
        });
    }

    getCommentsIndex(code_lang) {
        let products = this._mgrProduct.loadCommentSlider();

        return products.then(function(val) {
            let catalogue_product = [];

            val.forEach(function(product) {

                let ele = '<div class="slider-temoignage-item">';
                ele += '<div class="temoignage-person">';
                ele += product.title;
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
                let ele = '<div onclick="sliderFeaturedClick(' + product.id + ')" class="slider-featured-item">';
                ele += '<img src="./images/' + product.image + '" alt="' + product.image + '" class="slider-featured-image">';
                ele += '</div>';
                catalogue_product.push(ele);
                console.log(ele);
            });

            return catalogue_product;
        });
    }

    getProductInfo(id, code_lang) {
        let products = this._mgrProduct.loadProductbyId(id, code_lang);
        let descr;
        this._mgrLanguage.loadText(66, code_lang).then(function(res) {
            descr = res;
        });
        let cart;
        this._mgrLanguage.loadText(65, code_lang).then(function(res) {
            cart = res;
        });
        let site;
        this._mgrLanguage.loadText(64, code_lang).then(function(res) {
            site = res;
        });
        let rituel;
        this._mgrLanguage.loadText(67, code_lang).then(function(res) {
            rituel = res;
        });
        return products.then(function(val) {
            let catalogue_product = [];
            console.log(val);
            let ele = '<div class="produit-div-image">';
            ele += '<img class="produit-image" src="./images/' + val[0].image + '" alt="' + val[0].value + '">';
            ele += '</div>';
            ele += '<div class="produit-details">';
            ele += '<div class="produit-details-nom">';
            ele += '<h2>' + val[0].value + '</h2>';
            ele += '</div>';

            ele += '<div class="produit-details-prix">';
            ele += '<h2> $ ' + val[0].retailPrice + ' CAD</h2>';
            ele += '</div>';

            if (val[0].amazonAffiliateLink == 'NULL') {
                ele += '<div class="produit-details-cart"><button class="manager-button produit-cart-button">' + cart + '</button></div>';
            } else {
                ele += '<div class="produit-details-cart"><button class="manager-button produit-cart-button"><a href="https://' + val[0].amazonAffiliateLink + '" target="_blank">' + site + '</a></button></div>';
            }


            let desc = '<div class="details"><div class="tab">';
            desc += '<button class="tablinks" onclick="openTab(event, \'info-1\')">' + descr + '</button>';
            desc += '<button class="tablinks" onclick="openTab(event, \'info-2\')">' + rituel + '</button>';
            desc += '</div>';

            desc += '<div id="info-1" class="tabcontent">';
            desc += '<p>' + val[1].value + '</p>';
            desc += '</div>';

            desc += '<div id="info-2" class="tabcontent">';
            desc += '<p>' + val[2].value + '</p>';
            desc += '</div>';

            desc += '<div id="info-3" class="tabcontent">';
            desc += '<p>' + 'ingrédients' + '</p>';
            desc += '</div></div>';

            ele += '<div class="produit-details-description">' + desc + '</div></div>';

            catalogue_product.push(ele);



            return catalogue_product[0];
        });
    }

    getProductCatalogue(code_lang) {
        let products = this._mgrProduct.loadProduct(code_lang);

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
                if (product.amazonAffiliateLink == 'NULL') {
                    ele += '<a href="#" class="product-cart" onclick="event.stopPropagation();event.preventDefault();catalogAddProductToCart(' + product.product_id + ')"><img class="catalogue-produit-image-panier" src="./images/icons/cart_black.png" alt="Panier"></a>';
                }
                ele += '</div>';

                catalogue_product.push(ele);
            });

            return catalogue_product;
        });
    }

    loadProductSearch(code_lang, search) {
        let products = this._mgrProduct.loadProductSearch(code_lang, search);
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

    /*Loads all categories that match the categories in the search, 
    verifies the ones that match every categories,
    sends the ids that match to loadCatalogById
    */
    loadProductSearchCategory(code_lang, search) {
        let products = this._mgrProduct.loadProductSearchCategory(code_lang, search);

        return products.then(function(val) {
            //console.log(products);
            //console.log("search lenght: "+search.length);
            let newProducts = [];
            let filteredProducts = [];
            let nbrCat = 1;

            val.forEach(function(product) {
                let ele = product.product_id;
                newProducts.push(ele);
            });

            //console.log(newProducts);

            for (let i = 0; i < newProducts.length; i++) {
                if (!((i + 1) == newProducts.length)) {
                    if (newProducts[i] == newProducts[i + 1]) {
                        nbrCat++;
                    } else {

                        if (nbrCat == search.length) {
                            let ele = newProducts[i];
                            filteredProducts.push(ele);
                        }
                        nbrCat = 1;
                    }
                } else {
                    if (nbrCat == search.length) {
                        let ele = newProducts[i];
                        filteredProducts.push(ele);
                    }
                    nbrCat = 1;
                }

            }
            let newCtrl = new CtrlProduct;
            let catalog_product = newCtrl.loadCatalogById(filteredProducts);
            return catalog_product;
        });
    }

    /*Gets all the ids and generates the necessary HTML to show those product in the catalog
    returns an array of HTML elements
    */
    loadCatalogById(ids) {
        let products = this._mgrProduct.loadCatalogProductID(1, ids);
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

    getProductsSelectPromo() {
        let products = this._mgrProduct.getAllProducts();

        return products.then(function(val) {
            let catalogue_product = [];

            val.forEach(function(product) {

                let ele = '<option id="' + product.product_id + '">' + product.value + '</option>';

                catalogue_product.push(ele);
            });

            return catalogue_product;
        });
    }

}

module.exports = CtrlProduct;