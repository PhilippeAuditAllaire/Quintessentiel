class User {

	constructor(args) {
		
		if(args != undefined)
		{
			if(args["id"]){
				this._id = args["id"];
			}

			if(args["idCivility"]){
				this._idCivility = args["idCivility"];
			}

			if(args["firstName"]){
				this._firstName = args["firstName"];
			}

			if(args["lastName"]){
				this._lastName = args["lastName"];
			}

			if(args["email"]){
				this._email = args["email"];
			}

			if(args["birthDate"]){
				this._birthDate = args["birthDate"];
			}

			if(args["password"]){
				this._password = args["password"];
			}

			if(args["newsletter"]){
				this._newsletter = args["newsletter"];
			}

			if(args["isAdmin"]){
				this._isAdmin = args["isAdmin"];
			}

			if(args["isReseller"]){
				this._isReseller = args["isReseller"];
			}

			if(args["address"]){
				this._address = args["address"];
			}

			if(args["conditions"]){
				this._conditions = args["conditions"];
			}
		}
	}

	//Getters
	get id(){
		return this._id;
	}

	get idCivility(){
		return this._idCivility;
	}

	get firstName(){
		return this._firstName;
	}

	get lastName(){
		return this._lastName;
	}

	get email(){
		return this._email;
	}

	get birthDate(){
		return this._birthDate;
	}

	get password(){
		return this._password;
	}

	get newsletter(){
		return this._newsletter;
	}

	get isAdmin(){
		return this._isAdmin;
	}

	get isReseller(){
		return this._isReseller;
	}

	get address(){
		return this._address;
	}

	get conditions(){
		return this._conditions;
	}



	//Setters
	set id($id){
		this._id = $id;
	}

	set idCivility($idCivility){
		this._idCivility = $idCivility;
	}

	set firstName($firstName){
		this._firstName= $firstName;
	}

	set lastName($lastName){
		this._lastName= $lastName;
	}

	set email($email){
		this._email = $email;
	}

	set birthDate($birthDate){
		this._birthDate= $birthDate;
	}

	set password($password){
		this._password = $password;
	}

	set newsletter($newsletter){
		this._newsletter= $newsletter;
	}

	set isAdmin($isAdmin){
		this._isAdmin= $isAdmin;
	}

	set isReseller($isReseller){
		this._isReseller= $isReseller;
	}

	set address($address){
		this._address= $address;
	}

	set conditions($conditions){
		this._conditions = $conditions;
	}


	validateFields()
	{
		let firstNamePattern = /^(?=.{1,50}$)[a-zÀ-ÿ]+(?:['_.\s][a-zÀ-ÿ]+)*$/i;
		let lastNamePattern = /^(?=.{1,50}$)[a-zÀ-ÿ]+(?:['_.\s][a-zÀ-ÿ]+)*$/i;
		let emailPattern =  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
		let passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;


		let isValid = true;

		if(this._firstName.match(firstNamePattern) == null || this._lastName.match(lastNamePattern) == null || this._email.match(emailPattern) == null || this._password.match(passwordPattern) == null){
			isValid = false;
		}

		return isValid;

	}


	validatePassword()
	{
		let passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

		return this._password.match(passwordPattern) != null;
	}

}


module.exports = User;