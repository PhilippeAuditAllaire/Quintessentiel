const CartItem = require("./CartItem.js");

class Cart{

	constructor(args) {
		console.log("here")
		this._itemArray = [];	//Array of CartItem objects
	}

	set itemArray(item){
		this._itemArray = item;
	}

	get itemArray(){
		return this._itemArray;
	}

	//Checks if the element already exists,
	//if so, increment its quantity, else,
	//add it to the array
	addItemToCart(idItemToAdd){

		let isNewItem = true;

		this._itemArray.forEach(function(item){	//For each item already in the cart

			//If the id of the item to add is the same as the opne in the cart
			if(item.id == idItemToAdd) 
			{
				item.qty += 1; //increment its quantity
				isNewItem = false;
			}

		});

		if(isNewItem){ //If its not in the array, add it
			this._itemArray.push(new CartItem({id: idItemToAdd,qty: 1}));
		}
	}
}

module.exports = Cart;