/* This class is used for the translations of products object */

class TextInfos {

    /**
     * constructor of an instance of the Class Product
     * @param {int} id id of the product
     * @param {int} id id of the language
     * @param {string} name name of the product
     */
    constructor(id, idLang, name, page) {
        this._id = id;
        this._idLang = idLang;
        this._name = name;
        this._page = page;
    }

    get id() { return this._id; }
    set id(paramId) { this._id = paramId; }

    get page() { return this._page; }
    set page(parampage) { this._page = parampage; }

    get name() { return this._name; }
    set name(paramName) { this._name = paramName; }

    get idLang() { return this._idLang; }
    set idLang(paramLang) { this._idLang = paramLang; }
}

module.exports = TextInfos;