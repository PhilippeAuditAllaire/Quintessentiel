class Product {

    /**
     * constructor of an instance of the Class Product
     * @param {int} id id of the product
     * @param {string} name name of the product
     * @param {string} image path to the image
     * @param {string} description description of the product
     * @param {string} advice advice on how to use the product
     * @param {Array<Ingredient>} ingredients array of the ingredients used
     * @param {int} qty quantity of items stocked of the product
     * @param {boolean} featured produit vedette - best products
     * @param {boolean} isVisible product visible in the catalogue
     * @param {string} dropWeightGram product measured in
     * @param {double} retailPrice 
     * @param {double} costPrice 
     * @param {string} amazonAfiliate link amazonAfiliate for the product
     */
    constructor(id, name, image, description, advice, ingredients, qty, featured, isVisible, dropWeightGram, retailPrice, costPrice, amazonAfiliate = "") {
        this._id = id;
        this._name = name;
        this._image = image;
        this._description = description;
        this._advice = advice;
        this._ingredients = ingredients;
        this._qty = qty;
        this._featured = featured;
        this._isVisible = isVisible;
        this._dropWeightGram = dropWeightGram;
        this._retailPrice = retailPrice;
        this._costPrice = costPrice;
        this._amazonAfiliate = amazonAfiliate;
        this._traductions = [];
        this._category = [];
    }



    // Getters - setters //

    get id() { return this._id; }
    set id(paramId) { this._id = paramId; }

    get name() { return this._name; }
    set name(paramName) { this._name = paramName; }

    get image() { return this._image };
    set image(paramImage) { this._image = paramImage; }

    get description() { return this._description; }
    set description(paramDescription) { this._description = paramDescription; }

    get advice() { return this._advice; }
    set advice(paramAdvice) { this._advice = paramAdvice; }

    get ingredients() { return this._ingredients; }
    set ingredients(paramIngredients) { this._ingredients = paramIngredients; }

    get qty() { return this._qty; }
    set qty(paramQty) { this._qty = paramQty; }

    get featured() { return this._featured; }
    set featured(paramFeatured) { this._featured = paramFeatured; }

    get isVisible() { return this._isVisible; }
    set isVisible(paramIsVisible) { this._isVisible = paramIsVisible; }

    get dropWeightGram() { return this._dropWeightGram; }
    set dropWeightGram(dropWeightGram) { this._dropWeightGram = dropWeightGram; }

    get retailPrice() { return this._retailPrice; }
    set retailPrice(paramRetailPrice) { this._retailPrice = paramRetailPrice; }

    get costPrice() { return this._costPrice; }
    set costPrice(paramCostPrice) { this._costPrice = paramCostPrice; }

    get amazonAfiliate() { return this._amazonAfiliate; }
    set amazonAfiliate(paramAmazonAfiliate) { this._amazonAfiliate = paramAmazonAfiliate; }

    get category() { return this._category; }
    set category(paramCategory) { this._category = paramCategory; }

    get traductions() { return this._traductions; }
    set traductions(paramTraductions) { this._traductions = paramTraductions; }

    get format() { return this._format; }
    set format(paramFormat) { this._format = paramFormat; }

}

module.exports = Product;