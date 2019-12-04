class CartItem{

	constructor(args) {
		
		if(args != undefined)
		{	
			if(args["id"]){
				this._id = args["id"];
			}

			if(args["qty"]){
				this._qty = args["qty"];
			}
		}
	}


	set id(itemId){
		this._id = itemId;
	}

	get id(){
		return this._id;
	}

	set qty(itemQty){
		this._qty = itemQty;
	}

	get qty(){
		return this._qty;
	}
}

module.exports = CartItem;