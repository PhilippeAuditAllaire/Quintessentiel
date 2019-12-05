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

	/*
		Loads all the countries and provinces
		that are available
	*/
	loadAllCountriesAndProvinces(idLang)
	{
		let countriesList = [];
		let context = this;

		return this._mgrUser.loadAllCountries(idLang).then(function(countries){

			let provincesPromises = []; 

			countries.forEach(function(country){
				provincesPromises.push(context._mgrUser.loadProvincesRelatedToCountry(country.id,idLang));
			});

			//Execute all the get provinces
			
			return Promise.all(provincesPromises).then((allProvinces)=>{

				let allCountriesAndProvinces = [];

				for(let i = 0;i < countries.length;i++) //For all the countries
				{
					let provincesForThisCountry = allProvinces[i];

					allCountriesAndProvinces.push({	//Add this object to the main array
						countryId: countries[i].id,
						countryName: countries[i].countryName,
						provinces: JSON.stringify(provincesForThisCountry)
					});

				}

				return allCountriesAndProvinces;

			});
			

		});

	}


	/*
		Loads the complete user address
	*/
	loadCompleteUserAddress(idUser,idLang)
	{
		let context = this;

		return this._mgrUser.loadUserBasicAddress(idUser).then((address)=>{ //Load the basic address

			let userAddress = address[0];

			//Load the province and the country
			return Promise.all([context._mgrUser.getProvinceById(userAddress.idProvince,idLang),context._mgrUser.getCountryById(userAddress.idCountry,idLang)]).then(function(infos){
				userAddress.provinceName = infos[0][0].provinceName;
				userAddress.countryName = infos[1][0].countryName;

				return userAddress;
			});
		})
	}


	/*
		Gets the user's email
		@idUser is the user's id to 
		load the email from
	*/
	loadUserEmail(idUser)
	{
		return this._mgrUser.getUserEmail(idUser).then(function(loadedEmail){
			let email = loadedEmail[0].email

			return email;
		});

	}

	/*
		Loads the full (first and last) name
		of the user
		@userId is the id f the user to load the
		infos from
	*/
	loadUserName(idUser)
	{
		return this._mgrUser.getUserName(idUser).then(function(loadedName){
			let name = {
				firstName: loadedName[0].firstName,
				lastName: loadedName[0].lastName
			}

			return name;
		});
	}


	/* 
		Loads the country name by its id
		@idCountry is the id of the country to load
		@lang is the language in which to load the 
		country's name
	*/
	loadCountryById(countryId,langId=1)
	{
		return this._mgrUser.getCountryById(countryId,langId).then(function(loadedCountry){
			return loadedCountry[0];
		});
	}

	/* 
		Loads the province name by its id
		@idProvince is the id of the country to load
		@lang is the language in which to load the 
		country's name
	*/
	loadProvinceById(provinceId,langId=1)
	{
		return this._mgrUser.getProvinceById(provinceId,langId).then(function(loadedProvince){
			return loadedProvince[0];
		});
	}


}


module.exports = CtrlUser;