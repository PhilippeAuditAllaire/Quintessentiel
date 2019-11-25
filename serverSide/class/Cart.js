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
	//if so, cahnge its quantity to the given one,
	//else, create the new element with the given quantity
	addItemToCart(idItemToAdd,qty)
	{

		let isNewItem = true;

		this._itemArray.forEach(function(item){	//For each item already in the cart

			//If the id of the item to add is the same as the opne in the cart
			if(item._id == idItemToAdd) 
			{
				item._qty = qty; //Change its quantity
				isNewItem = false;
			}

		});

		if(isNewItem){ //If its not in the array, add it
			this._itemArray.push(new CartItem({id: idItemToAdd,qty: qty}));
		}
	}

	//Removes a given item from the cart
	//@itemId is the id of the item to remove
	//from the cart
	removeItemFromCart(itemId)
	{
		let index = 0;
		let context = this;

		this._itemArray.forEach(function(item){	//For each item already in the cart

			//If the id of the item to add is the same as the one in the cart
			if(item._id == itemId) 
			{
				console.log("found it and removing it!");
				context._itemArray.splice(index,1);
			}

			index++;
		});	
	}
}

module.exports = Cart;