class Tags {

	constructor(args) {
		
		if(args != undefined)
		{	
			if(args["id"]){
				this._id = args["id"];
			}

			if(args["title"]){
				this._title = args["title"];
			}

			if(args["description"]){
				this._description = args["description"];
			}

		}
	}

	//Getters
	get id(){
		return this._id;
	}

	get title(){
		return this._title;
	}

	get description(){
		return this._description;
	}

	//Setters
	set id($id){
		this._id = $id;
	}

	set title($tagTitle){
		this._title = $tagTitle;
	}

	set description($tagDescription){
		this._description= $tagDescription;
	}
}


module.exports = User;