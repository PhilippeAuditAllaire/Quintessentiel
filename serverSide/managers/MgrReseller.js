const QueryEngine = require("../scripts/QueryEngine.js");

class MgrReseller{

    constructor(){
        this._queryEngine = new QueryEngine();
    }

    /* Gets the ID, first name, last name, email, and the reseller status from all users that are
    resellers. 
    Returns the result set.
    */
    getAllReseller(){
        let query = "SELECT id, firstName, lastName, email, isReseller FROM `users` WHERE `isReseller`= 1";
        return this._queryEngine.executeQuery(query).then(function(res){
            return res;
        });
    }

    /* Gets the ID, first name, last name, email, and the reseller status from all users that are
    not resellers. 
    Returns the result set.
    */
    getAllUser(){
        let query = "SELECT id, firstName, lastName, email, isReseller FROM `users` WHERE `isReseller`= 0";
        return this._queryEngine.executeQuery(query).then(function(res){
            return res;
        });
    }

    /* Sets the reseller tag to the selected users and set the productlist for them as well 
    */
    setInitialList(ids, products){
        for(let i=0;i<ids.resellerId.length;i++){
            let query="UPDATE users SET isReseller = 1 WHERE id ="+ids.resellerId[i]+";";
            this._queryEngine.executeQuery(query);
            for(let j=0;j<products.length;j++){
                let appendQuery="INSERT INTO ta_reseller_products (idUser,productId,rebate) VALUES ("+ids.resellerId[i]+","+products[j]+",0);";
                this._queryEngine.executeQuery(appendQuery);
            };
        };
    }

    /* Gets the productid, the name, the cost, the retail price, the visibility from the ta_reseller_products and filters
    it by the id of the user, the language and the type of attribute(in this case, title)
    Returns the result set.
    */
    getRebateList(id){
        console.log("t dans le manager="+id.resellerId);
        let query = "SELECT productId, ta_productattribute_language.value, product.costPrice, product.retailPrice, product.isVisible, rebate FROM `ta_reseller_products` inner JOIN product ON ta_reseller_products.productId = product.id INNER JOIN ta_productattribute_language ON ta_reseller_products.productId=ta_productattribute_language.idProduct WHERE ta_productattribute_language.idLanguage=1 AND ta_productattribute_language.productAttributeId=1 AND ta_reseller_products.idUser="+id.resellerId+" ORDER BY productId ASC";

        return this._queryEngine.executeQuery(query).then(function(res){
            return res;
        });
    }
}

module.exports = MgrReseller;