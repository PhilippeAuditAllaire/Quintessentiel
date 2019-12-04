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

    /* Sets the reseller attribute to the selected users 
    */
    setResellerAttribute(ids){
        for(let i=0;i<ids.resellerId.length;i++){
            let query="UPDATE users SET isReseller = 1 WHERE id ="+ids.resellerId[i]+";";
            this._queryEngine.executeQuery(query);
        };
    }

    /* Removes the reseller attribute to the selected users 
    */
   removeResellerAttribute(ids){
    for(let i=0;i<ids.resellerId.length;i++){
        let query="UPDATE users SET isReseller = 0 WHERE id ="+ids.resellerId[i]+";";
        this._queryEngine.executeQuery(query);
    };
}

    /* Gets the productid, the name, the cost, the retail price, the visibility from the ta_reseller_products and filters
    it by the id of the user, the language and the type of attribute(in this case, title)
    Returns the result set.
    */
    getRebateList(id){
        console.log("t dans le manager="+id);
        let query = "SELECT productId, ta_productattribute_language.value, product.costPrice, product.retailPrice, product.isVisible, rebate FROM `ta_reseller_products` inner JOIN product ON ta_reseller_products.productId = product.id INNER JOIN ta_productattribute_language ON ta_reseller_products.productId=ta_productattribute_language.idProduct WHERE ta_productattribute_language.idLanguage=1 AND ta_productattribute_language.productAttributeId=1 AND ta_reseller_products.idUser="+id+" ORDER BY productId ASC";

        return this._queryEngine.executeQuery(query).then(function(res){
            return res;
        });
    }

    /* Gets the amount of entries that match the id of the reseller and the product id
    Returns an Int
    */
    getRebateCount(resellerId,productId){
        let query = "SELECT COUNT(*) AS count FROM `ta_reseller_products` WHERE idUser="+resellerId+" AND productId="+productId;
        return this._queryEngine.executeQuery(query).then(function(res){
            return res[0].count;
        });
    }

    /* Updates the rebate field in the database where the entry matches the resller id and the product id
    Returns true after the update
    */
    updateTaReseller(resellerId,productId,rebate){
        let query = "UPDATE ta_reseller_products SET rebate="+rebate+" WHERE idUser="+resellerId+" AND productId="+productId;
        return this._queryEngine.executeQuery(query).then(function(res){
            console.log(query);
        });;
    }

    /* Insert a new entry in the database with the reseller id, the product id and the rebate
    Returns True after the insert 
    */
    insertTaReseller(resellerId,productId,rebate){
        let query = "INSERT INTO ta_reseller_products (idUser,productId,rebate) VALUES ("+resellerId+","+productId+","+rebate+")";
        return this._queryEngine.executeQuery(query).then(function(res){
            console.log(query);
        });
    }

}

module.exports = MgrReseller;