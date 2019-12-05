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

        let newMan = new MgrReseller;

        newMan.setResellerAttribute(ids);
        return true;
    }

    removeReseller(ids){
            
        let newMan = new MgrReseller;

        newMan.removeResellerAttribute(ids);
        return true;
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

    getRebate(idReseller){
        let rebateList = [];
        let id = idReseller.resellerId
        console.log("t icite caliss: "+id);
        return this._mgrReseller.getRebateList(id).then(function(res){
            res.forEach(function(row){
                let prod= new Product();
                prod.id= row.productId;
                prod.rebate = row.rebate;
                rebateList.push(prod);

            });
            return rebateList;
        });
    }

    updateResellerRebate(listRebate,resellerId){
        let rebateListUpdate=[];
        rebateListUpdate = this.fillListUpdateRebate(listRebate);
        rebateListUpdate.forEach(function(product){
            let newMan = new MgrReseller;
            return newMan.getRebateCount(resellerId, product.id).then(function(res){
                    if(res==1){
                        newMan.updateTaReseller(resellerId,product.id,product.rebate)
                    }else{
                        newMan.insertTaReseller(resellerId,product.id,product.rebate)
                    }
                }   
            )}  
        );      
    }

    fillListUpdateRebate(listRebate){
        let rebateList = [];
        let newlist= eval(listRebate);

        for(let i=0; i<newlist.length;i++){
            let rebate = newlist[i];
            let prod = new Product();
            prod.id = rebate.id;
            prod.rebate = rebate.value;
            rebateList.push(prod);
            
        }
        return rebateList;
    }

}

module.exports = CtrlReseller;