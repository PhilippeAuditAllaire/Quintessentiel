class Category {

	constructor(args) {
		
		if(args != undefined)
		{	
			if(args["id"]){
				this._id = args["id"];
			}

			if(args["name"]){
				this._name = args["name"];
			}

		}
	}

	//Getters
	get id(){
		return this._id;
	}

	get name(){
		return this._name;
	}


	//Setters
	set id($id){
		this._id = $id;
	}

	set titnamele($categoryName){
		this._name = $categoryName;
	}
}


module.exports = User;