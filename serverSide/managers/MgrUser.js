//const bcrypt = require('bcrypt');
const QueryEngine = require("../scripts/QueryEngine.js");
const uuidv4 = require('uuid/v4');
const nodemailer = require('nodemailer');

class MgrUser{

	constructor(){
		this._queryEngine = new QueryEngine();
	}


	//Calls the dbManager to add
	//the given user in the database
	//after verifying if the email already exists
	//@userObj is the userObject containing
	//all of it's infos
	//@Returns a promise
	addUser(userObj)
	{
		let hash = 'motdepassetemporaireacausedebcrypt';

		let selectUniqueEmailQuery = "SELECT id FROM users WHERE email = ?";
		let paramUniqueEmail = [userObj.email];
		let currentQueryEngine = this._queryEngine;

		return this._queryEngine.executeQuery(selectUniqueEmailQuery,paramUniqueEmail).then(function(result){
			if(result.length == 0) //The given email isnt already in the DB
			{
				let query = "INSERT INTO users (idCivility,firstName,lastName,email,birthDate,password,newsletter,isAdmin,street,noApp,postalCode,noCivic,idCountry,idProvince) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
				let param = [userObj.idCivility,userObj.firstName,userObj.lastName,userObj.email,userObj.birthDate,hash,userObj.newsletter,userObj.isAdmin,userObj.street,userObj.noApp,userObj.postalCode,userObj.noCivic,userObj.idCountry,userObj.idProvince];

				return currentQueryEngine.executeQuery(query,param);
			}
			else{ //This email is already in the DB
				return 1;
			}
		});
	}


	//Checks if the given credentials
	//are valid and if so, connect the
	//user
	//@userObj is the userObject containing
	//@checkForAdmin is a bool that checks if the user wants to connect as an admin
	//its credentials
	//@Returns a promise
	connectUser(userObj,checkForAdmin)
	{
		let query = "SELECT id,password FROM users WHERE email = ? AND isAdmin = ?";

		let isAdmin = 0;

		if(checkForAdmin){
			isAdmin = 1;
		}

		let param = [userObj.email,isAdmin];


		return this._queryEngine.executeQuery(query,param).then(function(results){

			if(results.length > 0) //If there's at least one row for this email
			{	
				/*
				if(bcrypt.compareSync(userObj.password, results[0].password)) { //Password match
					return [true,results[0].id];
				} else { //Password don't match
					return [false];
				}
				*/
				return [true,results[0].id];

			}
			else{
				return [false]; //Email doesnt exist
			}



		});
	}

	/* 
		Checks if the user exists and if so,
		returns its ID
	*/
	checkIfUserExists(email){
		let query = "SELECT id FROM users WHERE email = ?";
		let param = [email];


		return this._queryEngine.executeQuery(query,param).then(function(result){
			return result[0];
		});
	}


	/*
		Recovers the user password
		by creating a unique link
		and sending the user this link */
	recoverPassword(email){
		
		let idUser;
		let currentQueryEngine = this._queryEngine;
		let uniqueKey;

		return this.checkIfUserExists(email).then(function(userId){ //Checks if user exists and if so, return a new promise
			if(userId != undefined){
				idUser = userId.id;

				//Remove the last attempts to recover the password
				let outdatePrecedentRecoverQuery = "UPDATE users_resetcode SET codeDate = '1900-01-01' WHERE idUser = ?"
				let paramOutDate = [idUser];

				return currentQueryEngine.executeQuery(outdatePrecedentRecoverQuery,paramOutDate);
			}
			else{ //The email doesnt exist
				console.log("The user doesnt exist");
				throw false;
			}
		})
		.then(function(res){ //Inserts the new reset key linked to the user
			uniqueKey = uuidv4();

			let newResetCodeQuery = "INSERT INTO users_resetcode (idUser,ResetCode) VALUES(?,?)";
			let paramCode = [idUser,uniqueKey];

			return currentQueryEngine.executeQuery(newResetCodeQuery,paramCode);
		})
		.then(function(res){ //Sending the email with this generated key
			let link = "http://localhost:8000/recoverPassword?secretId="+uniqueKey;

			let transporter = nodemailer.createTransport({
			  service: 'gmail',
			  auth: {
			    user: 'projetwebquintessentiel@gmail.com',
			    pass: 'Pr0jetWeb'
			  }
			});

			var mailOptions = {
			  from: 'projetwebquintessentiel@gmail.com',
			  to: email,
			  subject: 'Quintessentiel | Récupération de mot de passe',
			  text: 'Une procédure de récupération de mot de passe a été entreprise pour votre compte sur notre site web. Si vous êtes au courant de cette procédure veuillez cliquer sur le lien suivant afin de réinitialiser votre mot de passe: '+link
			};

			transporter.sendMail(mailOptions, function(error, info){
			  if (error) {
			    throw false;
			  }
			});

			return true;
		})
		.catch(function(err){
			return false;
		});



	}



	/*
		Recovering the user's password by
		changing it if it has a valid key 
		@Returns a promise chain
	*/
	recoveringPassword(newPassword,secretCode){
		let userId;
		let codeDate;

		let getUserIdBySecretCodeQuery = "SELECT idUser,codeDate FROM users_resetcode WHERE ResetCode = ?";
		let getUserIdBySecretCodeParam = [secretCode];

		let currentQueryEngine = this._queryEngine;

		return currentQueryEngine.executeQuery(getUserIdBySecretCodeQuery,getUserIdBySecretCodeParam)
		.then(function(res){
			if(res != undefined && res.length > 0){ 
				userId = res[0].idUser;
				codeDate = res[0].codeDate;

				let linkDate = new Date(codeDate)
				let currentDate = Date.now();

				let timeBetween = ((Math.floor(currentDate - linkDate) / 1000) / 60);

				if(timeBetween < 30){ //Less than 30 minutes
					let queryChangePassword = "UPDATE users SET password = ? WHERE id = ?"
					let hash = "untestdehash"//bcrypt.hashSync(newPassword, 10);
					let paramChangePassword = [hash,userId];

					return currentQueryEngine.executeQuery(queryChangePassword,paramChangePassword);
				}
				else{ //More than 30 minutes, the link is invalid
					throw '1';
				}
				
			}
			else{ //This code doesnt exist
				throw '2';
			}
		})
		.then(function(res){ //The user's password has been changed
			return '0';
		})
		.catch(function(err){ //The user cannot change his password
			return err;
		});

	}


	/* Retrieves the user email that
		belongs to this code
		@code is the code from which we'll retreive the user's email
		@Returns a promise
	*/
	retreiveEmailByRecoverCode(code){

		let query = "SELECT email FROM users INNER JOIN users_resetcode ON users.id = users_resetcode.idUser WHERE users_resetcode.resetCode = ?";
		let param = [code];

		return this._queryEngine.executeQuery(query,param);
	}


		/*
	  Loads all the civilities
	  @Returns a promise
	*/
	loadAllCivilities(idLang){

		let query = "SELECT * FROM ta_civilityattribute_language WHERE idLanguage = ?"
		let param = [idLang];
 

		return this._queryEngine.executeQuery(query,param);
	}


	/*
	 Loads all the conditions
	 @Returns a promise
	 */
	loadAllConditions(idLang)
	{
		let query = "SELECT idConditions,value FROM ta_conditionsattribute_language WHERE idLanguage = ?";
		let param = [idLang];


		return this._queryEngine.executeQuery(query,param);
	}


	/* Adds conditions to a specific user 
		@Returns a promise
	*/
	addConditionsToUser(userId, conditions)
	{
		let currentQueryEngine = this._queryEngine;

		return new Promise((resolve, reject) => { //Waits till all the conditions have been inserted
			let query = "INSERT INTO ta_users_conditions VALUES (DEFAULT,?,?)";
			let param;

			for(let i = 0;i < conditions.length;i++) //Inserts all the conditions linked to the user
			{
				param = [userId,conditions[i]];
				currentQueryEngine.executeQuery(query,param);
			}

			resolve(1);
		});

	}


	/*
		Loads all the countries
		@idLang is the lang in which to load the countries names
	*/
	loadAllCountries(idLang)
	{
		let query = "SELECT country.id,ta_countryattribute_language.value As countryName FROM country INNER JOIN ta_countryattribute_language ON country.id = ta_countryattribute_language.idCountry WHERE ta_countryattribute_language.idLanguage = ?";
		let param = [idLang];

		return this._queryEngine.executeQuery(query,param);
	}


	/* 
		Loads all the provinces that are related to
		the given countryId

		@idCountry is the country from which to load
		the provinces from

		@idLang is the languageId in which to load
		the countries infos
	*/
	loadProvincesRelatedToCountry(idCountry,idLang)
	{
		let query = "SELECT province.id,ta_provinceattribute_language.value AS provinceName FROM province INNER JOIN ta_provinceattribute_language ON province.id = ta_provinceattribute_language.idProvince WHERE province.idCountry = ? AND ta_provinceattribute_language.idLanguage = ?";
		let param = [idCountry,idLang];

		return this._queryEngine.executeQuery(query,param);
	}


	/* Loads the address infos from the user 
		@userId is the id of the user to load the infos from
	*/
	loadUserBasicAddress(userId)
	{
		let query = "SELECT street,noApp,postalCode,noCivic,idCountry,idProvince FROM Users WHERE id = ?"
		let param = [userId];

		return this._queryEngine.executeQuery(query,param);
	}

	/* Loads a province's infos
	   @provinceId is the id of the province
	   which to load the infos from
	   @idLang is the language in which to load the infos
	*/
	getProvinceById(provinceId,idLang)
	{
		let query = "SELECT value As provinceName FROM ta_provinceattribute_language WHERE ta_provinceattribute_language.idProvince = ? AND idLanguage = ?";
		let param = [provinceId,idLang];

		return this._queryEngine.executeQuery(query,param);
	}

	/*
		Loads all the countries infos
		@countryId is the Id of the country
		which to load the infos from
		@idLang is the languagge in which to load the infos
	*/
	getCountryById(countryId,idLang)
	{
		console.log("chargement avec le country id: "+ countryId);
		console.log("et la langue: "+idLang);
		let query = "SELECT value As countryName FROM ta_countryattribute_language WHERE ta_countryattribute_language.idCountry = ? AND idLanguage = ?";
		let param = [countryId,idLang];

		return this._queryEngine.executeQuery(query,param);
	}


	/* Gets the user's email based on the
	   given userId
	   @userId is the id of the user to load
	*/
	getUserEmail(userId)
	{
		let query = "SELECT email FROM users WHERE id = ?";
		let param = [userId];

		return this._queryEngine.executeQuery(query,param);
	}

	/*
		Gets the user's full name based
		on the given userId
		@userId is the id of the user to
		load
	*/
	getUserName(userId)
	{
		let query = "SELECT firstName,lastName FROM users WHERE id = ?";
		let param = [userId];

		return this._queryEngine.executeQuery(query,param);
	}

}


module.exports = MgrUser;