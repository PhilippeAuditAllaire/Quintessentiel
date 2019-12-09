const Cart = require("../class/Cart.js");
const CartItem = require("../class/CartItem.js");
const MgrProduct = require("../managers/MgrProduct.js");
const CtrlUser = require("../controlers/CtrlUser.js");
const Product = require("../class/Product.js");

class CtrlCart {

    constructor() {
    	this._mgrProduct = new MgrProduct();
    }

    //Loads the informations of
    //all the products of the cart
    //@cartItems is the array containing
    //all the items with their quantity
    loadProductsFromCart(cartItems,userId){

    	let getEachItemInfos = [];	//This array contains all the promises to execute
    	let context = this;

    	cartItems._itemArray.forEach(function(item){ //For each item in the cart, add it to a "queue"
    		getEachItemInfos.push(context._mgrProduct.loadProductsTranslatableInfosById(item._id));
    		getEachItemInfos.push(context._mgrProduct.loadProductName(item._id,1));
        getEachItemInfos.push(context.getProductPromo(item._id));
        getEachItemInfos.push(context.getProductResellerPromo(item._id,userId));
    		//Get rabais here
    	});

    	//This promise executes ALL the get product infos asked (loadProductName,loadProductsTranslatableInfosByid)
    	//Each product basically is composed of productsInfos[X] and productInfos[X+1]
    	return Promise.all(getEachItemInfos).then(function(productsInfos){

    		let allProducts = []; //Contains all the Product object created from the productInfos

    		for(let i = 0;i < productsInfos.length;i+=4)
    		{	
    
    			let productNonTranslatableInfos = productsInfos[i][0];
    			let productTranslatableInfos = productsInfos[i+1][0];
          let productPromo = parseInt(productsInfos[i+2]);
          let retaillerPromo = parseInt(productsInfos[i+3]);


    			let product = new Product();
    			product.id = productNonTranslatableInfos.id;
    			product.retailPrice = productNonTranslatableInfos.retailPrice;
				  product.qty = productNonTranslatableInfos.quantity;
				  product.image = productNonTranslatableInfos.image;
				  product.name = productTranslatableInfos.value;


          //Sets the promo for the product (if any)
          //and always the biggest one
          if(retaillerPromo > productPromo){
            product.rebate = retaillerPromo;
          }
          else{
            product.rebate = productPromo;
          }

          product.priceAfterRebate = (product.retailPrice - (product.retailPrice * (product.rebate / 100))).toFixed(2);

				let productIndexInCart = i / 4;
				let productQtyInCart = cartItems._itemArray[productIndexInCart]._qty;

				allProducts.push({product:product,qtyInCart:productQtyInCart});
    		}

    		return allProducts;
    	});
    }


    //Gets the current promotion for
    //the given product (if any)
    //@productId is the id of the product
    //to check the promos for
    getProductPromo(productId)
    {
    
      //Gets the current promo for this item
      return this._mgrProduct.getProductPromo(productId).then(function(res){

        let promoPercent = 0;

        //if there is a promo for this item
        if(res.length > 0){
          promoPercent = res[0].rabais;
        }

        return promoPercent;
      });
    }

    //Gets the current reseller promotion
    //for the given product (if any)
    //@productId is the id of the product
    //to check the promos for
    getProductResellerPromo(productId,resellerId)
    {
      return this._mgrProduct.getResellerPromoProduct(productId,resellerId).then(function(res){

        let promoPercent = 0;

        if(res.length > 0){
          promoPercent = res[0].rebate;
        }

        return promoPercent;
      });
    }

    //Calculates the sub total based
    //on the items that are in the cart
    //@cartItems to calculate the subTotal
    //from
    //@userId is the id of the connected user 
    //(can be 0 if not connected)
    //Returns a promise that returns the subTotal
    calculateCartSubTotal(cart,userId)
    {   
        //Load the products from the cart from the DB
        return this.loadProductsFromCart(cart,userId).then((allProducts) => {
            let subTotal = 0;
          
            //For each product that has been loaded
            allProducts.forEach(function(product){
                subTotal += parseFloat(((product.qtyInCart * (parseFloat(product.product._priceAfterRebate))*100) / 100));
            });


            return subTotal;
        });
    }

    //Calculates the taxes 
    //@amount is the amount to
    //calculate the taxes from
    //@Returns an object containing
    //both taxes amount
    calculateTaxes(amount)
    {
        let taxes = {
            tps:0,
            tvq:0
        };


        taxes.tps = ((amount * 5) / 100).toFixed(2);
        taxes.tvq = ((amount * 9.975) / 100).toFixed(2);

        return taxes;
    }

    //Formats the cart's data as metadata
    //that we can then pass to Stripe
    generateCartMetadata(cart,userId,userGivenAddress)
    {

        let ctrlUser = new CtrlUser();
        let context = this;
        let promisesToExecute = [ctrlUser.loadUserEmail(userId),ctrlUser.loadUserName(userId)];

        //if the user entered a custom address, get the province/country name
        if(userGivenAddress != undefined)
        {
          promisesToExecute.push(ctrlUser.loadCountryById(userGivenAddress.countryId,1));
          promisesToExecute.push(ctrlUser.loadProvinceById(userGivenAddress.provinceId,1))
        }
        else{ //Else, load its address from the database
          promisesToExecute.push(ctrlUser.loadCompleteUserAddress(userId,1));
        }


        //First of, we need to get the user's infos as wekk as the cart Infos
        return Promise.all(promisesToExecute).then(function(userInfos){
           let userEmail = userInfos[0];
           let userName = userInfos[1];
           let userAddress;

           //if its a custom user address
           if(userGivenAddress != undefined){
              userGivenAddress.countryName = userInfos[2].countryName;
              userGivenAddress.provinceName = userInfos[3].provinceName;

              userAddress = userGivenAddress;
           }
           else{ //If its not a custom address
              userAddress = userInfos[2];
           }

            

           let formatedUserName = userName.lastName + " " + userName.firstName



           //Load the products from the cart from the DB
           return context.loadProductsFromCart(cart).then((allProducts) => {
               let i = 1;

               let metadata = "{";

               metadata += "\"Nom du client \": \"" + formatedUserName + "\",";
               metadata += "\"Email du client \": \"" + userEmail + "\",";
               metadata += "\"Pays livraison \": \"" + userAddress.countryName + "\",";
               metadata += "\"Province livraison \": \"" + userAddress.provinceName + "\",";
               metadata += "\"Code postal livraison \": \"" + userAddress.postalCode + "\",";
               metadata += "\"No civic livraison \": \"" + userAddress.noCivic + "\",";
               metadata += "\"Rue livraison \": \"" + userAddress.street + "\",";
               metadata += "\"No app \": \"" + userAddress.noApp + "\",";


               //For each product that has been loaded
               allProducts.forEach(function(product){
                   metadata += "\""+i+".Nom du produit\": \"" + product.product._name + "\",";
                   metadata += "\""+i+".Quantité commandée\": \"" + product.qtyInCart + "\",";
                   metadata += "\""+i+".Prix indv. avant rabais\": \"" + product.product._retailPrice + "\",";
                   metadata += "\""+i+".Prix indv. du produit (après rabais)\": \"" + product.product._priceAfterRebate + "\",";
                   i++;
               });

               metadata = metadata.slice(0,metadata.length - 1); //Remove the last comma
               metadata += "}";
               return metadata;
           });
        });

    }

}

module.exports = CtrlCart;