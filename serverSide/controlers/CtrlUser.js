const User = require("../class/User.js");
const MgrUser = require("../managers/MgrUser.js");

class CtrlUser{

	constructor() {
		this._mgrUser = new MgrUser();
	}

	/*
		Calls the manager to add
		a user object created from 
		the given form infos
		@userInfos is the form object containing
		all of the user's infos
	*/
	addUser(userInfos){
		let userObj = new User();

		//Filling the user object with data from the form
		userObj.firstName = userInfos.firstName;
		userObj.lastName = userInfos.lastName;
		userObj.email = userInfos.email;
		userObj.birthDate = userInfos.birthDate;
		userObj.idCivility = userInfos.idCivility;
		userObj.password = userInfos.password;

		userObj.newsletter = (userInfos.newsletter == 'true' ? 1 : 0);
		userObj.isAdmin = 0;
		userObj.conditions = userInfos.conditionsCheckbox;
		userObj.street = userInfos.street;
		userObj.noApp = userInfos.noApp;
		userObj.postalCode = userInfos.postalCode;
		userObj.noCivic = userInfos.noCivic;
		userObj.idCountry = userInfos.idCountry;
		userObj.idProvince = userInfos.idProvince;
		
		let isValidated = userObj.validateFields();

		let currentMgrUser = this._mgrUser;

		if(isValidated) //The infos are valid
		{
			return currentMgrUser.addUser(userObj).then(function(res){

				if(res != 1) //If the email wasnt already taken
				{
					if(res == undefined || res.affectedRows <= 0){ //Error while adding the user
						throw 2;
					}
					else{ //The user has been successfully added to the database

						if(Array.isArray(userObj.conditions) && userObj.conditions.length > 0) //The user has conditions to be linked to
						{
							return currentMgrUser.addConditionsToUser(res.insertId,userObj.conditions);	
						}
					}
			
				}
				else{ //The email was already taken
					throw 3;
				}				

			})
			.then(function(result){ //Linked the conditions the user checked to its account
				return 1;
			})
			.catch(function(err){
				return err;
			});	
		}
		else{ //The infos arent valid
			return new Promise((resolve, reject) => {
				resolve(2);
			});
		}
		


	}

	//@checkForAdmin specifiecs wether the user wants to connect as an admn or not
	connectUser(userCredentials,checkForAdmin=false){
		let userObj = new User()

		//Filling the user object with the data from the form
		userObj.email = userCredentials.email;
		userObj.password = userCredentials.password;

		return this._mgrUser.connectUser(userObj,checkForAdmin).then(function(response){
			return response;
		});
	}



	/*
		Recovers the user password
		by creating a unique link
		and sending the user this link */
	recoverPassword(userInfo){
		let email = userInfo.email;

		return this._mgrUser.recoverPassword(email);
	}

	/*
		Recovering the user's password by
		changing it if it has a valid key 
	*/
	recoveringPassword(userInfo){
		let userObj = new User()
		userObj.password = userInfo.newPassword;

		if(userObj.validatePassword()){
			return this._mgrUser.recoveringPassword(userInfo.newPassword,userInfo.secretCode);
		}

	}

	/*
		gets the email related to the old code
		and sends an email back to it.

		@Returns a promise
	*/
	resendCode(expiredCode){

		let currentControler = this;

		return this._mgrUser.retreiveEmailByRecoverCode(expiredCode.secretCode).then(function(results){
			if(results != undefined && results.length > 0){ //Found the related email

				return currentControler.recoverPassword({email: results[0].email});
			}
			else{ //The code isnt valid (couldnt find the email linked to it)
				throw false;
			}
		})
		.catch(function(err){ //Couldnt send the email for various reasons
			return err;
		});

	}


	/*
	  Loads all the civilities
	*/
	loadAllCivilities(){

		

		return this._mgrUser.loadAllCivilities().then(function(val){
				let optionArray = [];

				val.forEach(function(civility) {
					let li = "<option value='"+civility.idCivility+"'>"+civility.value+"</option>";
				 	optionArray.push(li)
				});

				return optionArray;
		});

	}

	/*
		Loads all the conditions that
		a person could have 
	*/
	loadAllConditions()
	{
		return this._mgrUser.loadAllConditions().then(function(res){

			let htmlElements = "";

			res.forEach(function(condition){
				htmlElements += "<div class='wrapper-row wrapper-row-trouble'><div class='div-checkbox'><input type='checkbox' class='trouble-checkbox' data-id="+condition.idConditions+" id='chckCondition"+condition.idConditions+"'></div><div class='div-label'><label for='chckCondition"+condition.idConditions+"'>"+condition.value+"</label></div></div>";
			});

			return htmlElements;
		});
	}

}


module.exports = CtrlUser;