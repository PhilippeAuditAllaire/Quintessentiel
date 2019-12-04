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
        console.log("BEFORE");
        console.log(cart)
        console.log("ALL PRODUCTS FROM CART")
        return this.loadProductsFromCart(cart).then((allProducts) => {
            console.log(allProducts);
        });
    }

}

module.exports = CtrlCart;