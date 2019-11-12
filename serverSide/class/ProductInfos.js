/* This class is used for the translations of products object */

class ProductInfos {

    /**
     * constructor of an instance of the Class Product
     * @param {int} id id of the product
     * @param {string} name name of the product
     * @param {string} description description of the product
     * @param {string} advice advice on how to use the product
     */
    constructor(id, name, description, advice) {
        this._id = id;
        this._name = name;
        this._description = description;
        this._advice = advice;
    }


    get name() { return this._name; }
    set name(paramName) { this._name = paramName; }

    get image() { return this._image };
    set image(paramImage) { this._image = paramImage; }

    get description() { return this._description; }
    set description(paramDescription) { this._description = paramDescription; }

    get advice() { return this._advice; }
    set advice(paramAdvice) { this._advice = paramAdvice; }
}

module.exports = ProductInfos;