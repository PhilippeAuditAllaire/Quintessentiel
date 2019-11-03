const express = require("express");
const path = require("path")
const session = require('express-session');
const ejs = require("ejs");


//Class imports
const QueryEngine = require("./serverSide/scripts/QueryEngine.js");
const CtrlUser = require("./serverSide/controlers/CtrlUser.js");
const CtrlProduct = require("./serverSide/controlers/CtrlProduct.js");

let website = express();
let app = express();

website.set('view engine', 'ejs');
app.set('view engine', 'ejs');
//For the Posts
var bodyParser = require('body-parser');
website.use(session({secret: 'your secret', saveUninitialized: true, resave: false}));
website.use(bodyParser.json()); // support json encoded bodies
website.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
website.set("views",path.join(__dirname, './'));

app.use(session({secret: 'your secret', saveUninitialized: true, resave: false}));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.set("views",path.join(__dirname, './'));

website.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

//Website routes
website.get("/",function(req,res){
	res.redirect("/index")
});


website.get("/index",function(req,res){
	res.render("index.ejs");
});

website.get("/userConnection",function(req,res){
	res.render("userConnection.ejs");
});


website.get("/userRegister",function(req,res){
	res.render("userRegister.ejs")
});

website.get("/recoverPassword",function(req,res){
	res.render("recoverPassword.ejs");
});


website.get("/contactus",function(req,res){
	res.render("contactus.ejs")
});

website.get("/catalogue", function(req, res) {
    res.render("catalogue.ejs");

});

website.get("/productInfo", function(req, res) {
    res.render("productInfo.ejs");
});



//Ajax requests
website.post("/ajaxRequest/getCivilities",function(req,res){

	let ctrlUserObj = new CtrlUser();

	ctrlUserObj.loadAllCivilities().then(function(result){
		res.send(result);
	});

});

website.post("/ajaxRequest/userRegister",function(req,res){
		let ctrlUserObj = new CtrlUser();

		ctrlUserObj.addUser(req.body).then(function(addedCode){
			res.send(addedCode.toString());
		});
});

website.post("/ajaxRequest/userConnection",function(req,res){
		let ctrlUserObj = new CtrlUser();

		ctrlUserObj.connectUser(req.body).then(function(result){
			if(result[0]){ //The connection worked
				req.session.userId = result[1];
				req.session.isAdmin = 0;
			}

			res.send(result[0]);
		});
		
});

website.post("/ajaxRequest/userRecoverPassword",function(req,res){
		let ctrlUserObj = new CtrlUser();
		ctrlUserObj.recoverPassword(req.body).then(function(state){
			res.send(state);
		});
});

website.post("/ajaxRequest/resendRecover",function(req,res){
		let ctrlUserObj = new CtrlUser();
		ctrlUserObj.resendCode(req.body).then(function(state){ //Sends back a code to the email related to this code
			res.send(state);
		});
		
});

website.post("/ajaxRequest/catalogue", function(req, res) {
    let ctrlProduct = new CtrlProduct();

    ctrlProduct.getProductCatalogue().then(function(result) {
        res.send(result);
    });

});

website.post("/ajaxRequest/produitInfo", function(req, res) {
    let ctrlProduct = new CtrlProduct();
    
    ctrlProduct.getProductInfo(req.body.id, 1).then(function(result) {
        res.send(result);
    });

});


website.post("/ajaxRequest/userRecovering",function(req,res){
		let ctrlUserObj = new CtrlUser();
		ctrlUserObj.recoveringPassword(req.body).then(function(resultCode){
			res.send(resultCode);
		});
		
});

website.post("/ajaxRequest/getConditions",function(req,res){
		let ctrlUserObj = new CtrlUser();

		ctrlUserObj.loadAllConditions().then(function(conditionsList){
			res.send(conditionsList);
		})
		.catch(function(error){
			res.send("Impossible de charger les conditions.");
		});

});



app.post("/ajaxRequest/adminConnection",function(req,res){
		let ctrlUserObj = new CtrlUser();

		ctrlUserObj.connectUser(req.body,true).then(function(result){
			if(result[0]){ //The admin connection worked
				req.session.userId = result[1];
				req.session.isAdmin = 1;

				res.redirect("manageProduct")
			}
			
			res.send(result[0]);
		});
		
});

//Application routes
app.get("/",function(req,res){
	res.redirect("adminConnection");
});

app.get("/adminConnection",function(req,res){
	res.render("adminConnection.ejs");
});

app.get("/manageProduct",function(req,res){
	console.log(req.session.userId);

	if(req.session.userId != undefined && req.session.isAdmin == 1)
	{
		res.render("manageProduct.ejs");	
	}
	else{
		res.redirect("adminConnection?pleaseConnect=true");
	}
});




website.listen(8000);
app.listen(5000);
