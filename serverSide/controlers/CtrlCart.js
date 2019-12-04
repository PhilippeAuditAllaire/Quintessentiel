const Cart = require("../class/Cart.js");
const CartItem = require("../class/CartItem.js");
const MgrProduct = require("../managers/MgrProduct.js");
const Product = require("../class/Product.js");

class CtrlCart {

    constructor() {
    	this._mgrProduct = new MgrProduct();
    }

    //Loads the informations of
    //all the products of the cart
    //@cartItems is the array containing
    //all the items with their quantity
    loadProductsFromCart(cartItems){

    	let getEachItemInfos = [];	//This array contains all the promises to execute
    	let context = this;

    	cartItems._itemArray.forEach(function(item){ //For each item in the cart, add it to a "queue"
    		getEachItemInfos.push(context._mgrProduct.loadProductsTranslatableInfosById(item._id));
    		getEachItemInfos.push(context._mgrProduct.loadProductName(item._id,1));
    		//Get rabais here
    	});

    	//This promise executes ALL the get product infos asked (loadProductName,loadProductsTranslatableInfosByid)
    	//Each product basically is composed of productsInfos[X] and productInfos[X+1]
    	return Promise.all(getEachItemInfos).then(function(productsInfos){

    		let allProducts = []; //Contains all the Product object created from the productInfos

    		for(let i = 0;i < productsInfos.length;i+=2)
    		{	
   
    			let productNonTranslatableInfos = productsInfos[i][0];
    			let productTranslatableInfos = productsInfos[i+1][0];

    			let product = new Product();
    			product.id = productNonTranslatableInfos.id;
    			product.retailPrice = productNonTranslatableInfos.retailPrice;
				product.qty = productNonTranslatableInfos.quantity;
				product.image = productNonTranslatableInfos.image;
				product.name = productTranslatableInfos.value;

				let productIndexInCart = i / 2;
				let productQtyInCart = cartItems._itemArray[productIndexInCart]._qty;

				allProducts.push({product:product,qtyInCart:productQtyInCart});
    		}

    		return allProducts;
    	});
    }

    //Calculates the sub total based
    //on the items that are in the cart
    //@cartItems to calculate the subTotal
    //from
    //Returns a promise that returns the subTotal
    calculateCartSubTotal(cart)
    {   
        //Load the products from the cart from the DB
        return this.loadProductsFromCart(cart).then((allProducts) => {
            let subTotal = 0;
          
            //For each product that has been loaded
            allProducts.forEach(function(product){
                
                subTotal += parseFloat(((product.qtyInCart * (parseFloat(product.product._retailPrice))*100) / 100).toFixed(2));
            });
            console.log("SUB TOTAL")
            console.log(subTotal)

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

}

module.exports = CtrlCart;