const User = require("../class/User.js");
const Product = require("../class/Product.js")
const MgrReseller = require("../managers/MgrReseller.js");
const MgrProduct = require("../managers/MgrProduct.js");

class CtrlReseller{

    constructor(){
        this._mgrReseller = new MgrReseller();
        this._mgrProduct= new MgrProduct();
    }

    getReseller(){
        let resellerList =[];

        return this._mgrReseller.getAllReseller().then(function(res){
            res.forEach(function(row){
                let user = new User();
                user.id=row.id;
                user.email=row.email;
                user.firstName = row.firstName;
                user.lastName =row.lastName;

                resellerList.push(user);
            })
            return resellerList;
        });
    }

    getUsers(){
        let userList=[];
        return this._mgrReseller.getAllUser().then(function(res){
            res.forEach(function(row){
                let user = new User();
                user.id=row.id;
                user.email=row.email;
                user.firstName = row.firstName;
                user.lastName =row.lastName;

                userList.push(user);
            })
            return userList;
        });

    }

    addReseller(ids){
        let prodList=[];

        return this.getProdId().then(function(res){
            prodList=res;
            
            let newMan = new MgrReseller;

            newMan.setInitialList(ids,prodList);
            return true;
        });
    }

    getProdId(){
        return this.getProductList().then(function(productList){
            let prodId=[];
            productList.forEach(function(product){
                console.log("voila le id:"+product.id)
                prodId.push(product.id);
            });
            return prodId;
        });
        
    }

    getProductList(){
        let productList=[];
        return this._mgrProduct.getAllProducts().then(function(res){
            res.forEach(function(row){
                let prod= new Product();
                prod.id= row.product_id;
                prod.name= row.value;
                prod.costPrice = row.costPrice;
                prod.retailPrice = row.retailPrice;
                productList.push(prod);

            });
            console.log(productList);
            return productList;
        });
    }

    getRebateList(id){
        let listRebate=[];

        return this._mgrReseller.getRebateList(id).then(function(res){
            console.log(res);
        })
    }

}

module.exports = CtrlReseller;