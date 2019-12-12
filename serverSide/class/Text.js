class Text {

    constructor(args) {

        if (args != undefined) {
            if (args["id"]) {
                this._id = args["id"];
            }

            if (args["name"]) {
                this._name = args["name"];
            }

            if (args["page"]) {
                this._page = args["page"];
            }

            if (args["isVisible"]) {
                this._isVisible = args["isVisible"];
            }
        }

        this._traductions = [];
    }

    //Getters
    get id() {
        return this._id;
    }

    get page() {
        return this._page;
    }

    get name() {
        return this._name;
    }

    get traductions() {
        return this._traductions;
    }

    get isVisible() {
        return this._isVisible;
    }


    //Setters
    set id(id) {
        this._id = id;
    }


    set page(page) {
        this._page = page;
    }

    set name(categoryName) {
        this._name = categoryName;
    }

    set traductions(categoryTraduction) {
        this._traductions = categoryTraduction;
    }

    set isVisible(categoryIsVisible) {
        this._isVisible = categoryIsVisible;
    }
}


module.exports = Text;