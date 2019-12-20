const express = require("express");
const path = require("path")
const session = require("express-session")({
    secret: "my-secret",
    resave: true,
    saveUninitialized: true
});
const ejs = require("ejs");
const multer = require("multer");
const stripe = require('stripe')('sk_test_IHvUqWlOZpF6fpSXlX9k119n00Cf1LJM5v');
const uuidv4 = require('uuid/v4');


const sharedsession = require("express-socket.io-session");

//FOR THE FILE UPLOAD
let storage = multer.diskStorage({

    destination: function(req, file, callback) {
        callback(null, './public/images'); // set the destination
    },
    filename: function(req, file, callback) {
        callback(null, Date.now() + '.jpg'); // set the file name and extension
    }
});
let upload = multer({ storage: storage });


function setLang(req) {
    if (req.session.id_lang == 1) {} else if (req.session.id_lang == 2) {} else if (req.session.id_lang != undefined) {
        req.session.id_lang = 1;
    } else {
        req.session.id_lang = 1;
    }
}


//Class imports
const QueryEngine = require("./serverSide/scripts/QueryEngine.js");
const CtrlUser = require("./serverSide/controlers/CtrlUser.js");
const CtrlProduct = require("./serverSide/controlers/CtrlProduct.js");
const CtrlRecipe = require("./serverSide/controlers/Ctrlrecipe.js");
const CtrlCategory = require("./serverSide/controlers/CtrlCategory.js");
const CtrlReseller = require("./serverSide/controlers/CtrlReseller.js");
const CtrlCart = require("./serverSide/controlers/CtrlCart.js");
const Cart = require("./serverSide/class/Cart.js");
const MgrLanguage = require("./serverSide/managers/MgrLanguage.js");
const CtrlPromo = require("./serverSide/controlers/CtrlPromotion.js");
const CtrlChat = require("./serverSide/controlers/CtrlChat.js");

let mgr = new MgrLanguage();

let website = express();
let app = express();

//Create the server for socket.io
var server = require('http').createServer(website);
var io = require('socket.io')(server);


website.set('view engine', 'ejs');
app.set('view engine', 'ejs');
//For the Posts
var bodyParser = require('body-parser');
website.use(session);
website.use(bodyParser.json()); // support json encoded bodies
website.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
website.set("views", path.join(__dirname, './'));

app.use(session);
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.set("views", path.join(__dirname, './'));

website.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));


//Website routes
website.get("/", function(req, res) {
    res.redirect("/index")
});


website.get("/serum", function(req, res) {
    setLang(req);
    mgr.getTextByPage("serum", req.session.id_lang).then(function(resultat) {
        res.render("serum.ejs", JSON.parse(resultat));
    });
});


website.get("/index", function(req, res) {
    /* TODO:req.session.code_lang selon le header */
    setLang(req);
    mgr.getTextByPage("index", req.session.id_lang).then(function(resultat) {
        res.render("index.ejs", JSON.parse(resultat));
    });

});

website.get("/userConnection", function(req, res) {
    setLang(req);

    mgr.getTextByPage("userConnection", req.session.id_lang).then(function(resultat) {

        res.render("userConnection.ejs", JSON.parse(resultat));
    });
});


website.get("/userRegister", function(req, res) {
    setLang(req);

    mgr.getTextByPage("userRegister", req.session.id_lang).then(function(resultat) {
        res.render("userRegister.ejs", JSON.parse(resultat));
    });
});

website.get("/recoverPassword", function(req, res) {
    setLang(req);

    mgr.getTextByPage("recoverPassword", req.session.id_lang).then(function(resultat) {
        res.render("recoverPassword.ejs", JSON.parse(resultat));
    });
});


website.get("/contactus", function(req, res) {
    setLang(req);

    mgr.getTextByPage("contactus", req.session.id_lang).then(function(resultat) {
        res.render("contactus.ejs", JSON.parse(resultat));
    });
});

website.get("/catalogue", function(req, res) {
    setLang(req);

    mgr.getTextByPage("catalogue", req.session.id_lang).then(function(resultat) {
        res.render("catalogue.ejs", JSON.parse(resultat));
    });

});

website.get("/productInfo", function(req, res) {
    setLang(req);

    mgr.getTextByPage("productInfo", req.session.id_lang).then(function(resultat) {
        res.render("productInfo.ejs", JSON.parse(resultat));
    });
});

website.get("/faq", function(req, res) {
    setLang(req);
    mgr.getTextByPage("faq", req.session.id_lang).then(function(resultat) {
        res.render("faq.ejs", JSON.parse(resultat));
    });
});

website.get("/paymentPage", function(req, res) {
    if (req.session.userId != undefined) {
        setLang(req);
        mgr.getTextByPage("paymentPage", req.session.id_lang).then(function(resultat) {
            res.render("paymentPage.ejs", JSON.parse(resultat));
        });
    } else {
        res.redirect("/catalogue");
    }

});





//Ajax requests



website.post("/ajaxRequest/stripePayment", function(req, res) {

    const token = req.body.stripeToken; // Using Express
    let ctrlCart = new CtrlCart();
    let subTotal = 0;
    let taxes;
    let total = 0;

    let userId = (req.session.userId != undefined ? req.session.userId : 0);
    //Get all the user's infos before doing the payment
    //Calculate the sub total from the items that are in the user's cart
    ctrlCart.calculateCartSubTotal(JSON.parse(req.session.userCart), userId).then(function(calcSubTotal) {
        subTotal = calcSubTotal;
        taxes = ctrlCart.calculateTaxes(subTotal);
        total = parseFloat(subTotal) + (parseFloat(taxes.tps) + parseFloat(taxes.tvq));

        let userCustomAddress = req.body.userManualAddressInfos
            //generate the metadata so that we can keep track of what the user bought and at what price
        let metadataPaymentInfos = ctrlCart.generateCartMetadata(JSON.parse(req.session.userCart), req.session.userId, userCustomAddress).then(function(metadata) {

            (async() => {
                const charge = await stripe.charges.create({
                    amount: parseInt(total * 100),
                    currency: 'cad',
                    description: 'Paiement d\'un panier',
                    source: token,
                    metadata: JSON.parse(metadata),
                }).then(function() {
                    req.session.userCart = undefined; //reset the user's cart

                    res.send(true);
                    res.end();

                }).catch(function() {
                    res.send(false);
                    res.end();

                });
            })();
        });


    });


});

website.post("/ajaxRequest/getCartTaxes", function(req, res) {
    const token = req.body.stripeToken; // Using Express
    let ctrlCart = new CtrlCart();
    let taxes;

    let userId = (req.session.userId != undefined ? req.session.userId : 0);

    //Calculate the sub total from the items that are in the user's cart
    ctrlCart.calculateCartSubTotal(JSON.parse(req.session.userCart), userId).then(function(calcSubTotal) {
        let subTotal = calcSubTotal;
        taxes = JSON.stringify(ctrlCart.calculateTaxes(subTotal));

        res.send(taxes);
    });


});


website.post("/ajaxRequest/checkIfUserIsConnected", function(req, res) {

    let isUserConnected = (req.session.userId != undefined);
    res.send(isUserConnected);
});

website.post("/ajaxRequest/lang", function(req, res) {
    let mgrlang = new MgrLanguage();

    mgrlang.getLanguagesNavBar().then(function(result) {
        res.send(result);
    });
});

website.post("/ajaxRequest/defLang", function(req, res) {
    res.send(req.session.id_lang);
});

website.post("/ajaxRequest/changeLang", function(req, res) {
    req.session.id_lang = req.body.id_lang;
    res.send(req.session.id_lang);
});


website.post("/ajaxRequest/getCivilities", function(req, res) {

    let ctrlUserObj = new CtrlUser();

    ctrlUserObj.loadAllCivilities(req.session.id_lang).then(function(result) {
        res.send(result);
    });

});

website.post("/ajaxRequest/getAllCountries", function(req, res) {

    let ctrlUser = new CtrlUser();

    ctrlUser.loadAllCountriesAndProvinces(1).then(function(allCountries) {
        res.send(allCountries);
    });

});

website.post("/ajaxRequest/getUserAdress", function(req, res) {

    let ctrlUser = new CtrlUser();
    //req.session.userId
    ctrlUser.loadCompleteUserAddress(1, 1).then(function(userAddress) {
        res.send(userAddress);
    });

});

website.post("/ajaxRequest/userRegister", function(req, res) {
    let ctrlUserObj = new CtrlUser();

    ctrlUserObj.addUser(req.body).then(function(addedCode) {
        res.send(addedCode.toString());
    });
});

website.post("/ajaxRequest/userConnection", function(req, res) {
    let ctrlUserObj = new CtrlUser();

    ctrlUserObj.connectUser(req.body).then(function(result) {
        if (result[0]) { //The connection worked
            req.session.userId = result[1];
            req.session.isAdmin = 0;
        }

        res.send(result[0]);
    });

});

website.post("/ajaxRequest/userRecoverPassword", function(req, res) {
    let ctrlUserObj = new CtrlUser();
    ctrlUserObj.recoverPassword(req.body).then(function(state) {
        res.send(state);
    });
});

website.post("/ajaxRequest/resendRecover", function(req, res) {
    let ctrlUserObj = new CtrlUser();
    ctrlUserObj.resendCode(req.body).then(function(state) { //Sends back a code to the email related to this code
        res.send(state);
    });

});

website.post("/ajaxRequest/catalogue", function(req, res) {
    let ctrlProduct = new CtrlProduct();

    ctrlProduct.getProductCatalogue(req.session.id_lang).then(function(result) {
        res.send(result);
    });

});

website.post("/ajaxRequest/catalogueSearch", function(req, res) {
    let ctrlProduct = new CtrlProduct();

    ctrlProduct.loadProductSearch(1, req.body.search).then(function(result) {
        res.send(result);
    });

});

website.post("/ajaxRequest/categoryCatalogueSearch", function(req, res) {
    let ctrlProduct = new CtrlProduct();

    let ctrlres = new CtrlReseller();
    ctrlProduct.loadProductSearchCategory(1, req.body.search).then(function(result) {
        res.send(result);
    });

});

website.post("/ajaxRequest/produitInfo", function(req, res) {
    let ctrlProduct = new CtrlProduct();

    ctrlProduct.getProductInfo(req.body.id, req.session.id_lang).then(function(result) {
        res.send(result);
    });

});

website.post("/ajaxRequest/sliderFeature", function(req, res) {
    let ctrlProduct = new CtrlProduct();

    ctrlProduct.getProductFeatured().then(function(result) {
        res.send(result);
    });
});

website.post("/ajaxRequest/sliderTemoignages", function(req, res) {
    let ctrlProduct = new CtrlProduct();

    ctrlProduct.getCommentsIndex(1).then(function(result) {
        res.send(result);
    });
});

website.post("/ajaxRequest/userRecovering", function(req, res) {
    let ctrlUserObj = new CtrlUser();
    ctrlUserObj.recoveringPassword(req.body).then(function(resultCode) {
        res.send(resultCode);
    });

});

website.post("/ajaxRequest/getConditions", function(req, res) {
    let ctrlUserObj = new CtrlUser();

    ctrlUserObj.loadAllConditions(req.session.id_lang).then(function(conditionsList) {
            res.send(conditionsList);
        })
        .catch(function(error) {
            res.send("Impossible de charger les conditions.");
        });

});

website.post("/ajaxRequest/getCategories", function(req, res) {
    let ctrlCategories = new CtrlProduct();

    ctrlCategories.loadAllSearchCategories(1, req.session.id_lang).then(function(categoryList) {
            res.send(categoryList);
        })
        .catch(function(error) {
            res.send("Impossible de charger les categories.");
        });
});

website.post("/ajaxRequest/addProductToCart", function(req, res) {
    let itemId = req.body.productId;
    let itemQty = req.body.qty;

    let isNewItem; //It's a new item (wasnt in the cart before)

    if (req.session.userCart != undefined) { //If the cart already exists
        let userCart = JSON.parse(req.session.userCart);
        let newCart = new Cart();
        newCart.itemArray = userCart._itemArray;
        isNewItem = newCart.addItemToCart(itemId, itemQty);
        req.session.userCart = JSON.stringify(newCart);
    } else { //The cart doesnt exist so create it and add the item to it
        let newCart = new Cart();
        isNewItem = newCart.addItemToCart(itemId, itemQty);
        req.session.userCart = JSON.stringify(newCart);
    }

    res.send(isNewItem);
});


//removeProductFromCart
website.post("/ajaxRequest/removeProductFromCart", function(req, res) {
    let itemId = req.body.productId;
    let userCart = JSON.parse(req.session.userCart);
    let newCart = new Cart();
    newCart.itemArray = userCart._itemArray;
    newCart.removeItemFromCart(itemId);
    req.session.userCart = JSON.stringify(newCart);

    res.end();

});

website.post("/ajaxRequest/loadCartItem", function(req, res) {
    if (req.session.userCart != undefined && req.session.userCart.length > 0) //If the user has something in his cart
    {
        let userId = (req.session.userId != undefined ? req.session.userId : 0);

        let ctrlCart = new CtrlCart();

        ctrlCart.loadProductsFromCart(JSON.parse(req.session.userCart), userId).then(function(productsArray) {
            res.send(productsArray);
        });
    } else {
        res.end();
    }
});


app.post("/ajaxRequest/adminConnection", function(req, res) {
    let ctrlUserObj = new CtrlUser();

    ctrlUserObj.connectUser(req.body, true).then(function(result) {
        if (result[0]) { //The admin connection worked
            req.session.userId = result[1];
            req.session.isAdmin = 1;

            res.send(true);
        } else {
            res.send(result[0]);
        }


    });

});

app.post("/ajaxRequest/getProductsCrees", function(req, res) {
    let ctrl = new CtrlRecipe();

    ctrl.addRecipe(req.body.name, req.body.desc, req.body.instru, req.body.is_custom, req.body.product, req.body.ingre).then(function(result) {
        res.send(result);
    });

});

app.post("/ajaxRequest/addRecipeHandler", function(req, res) {
    let ctrl = new CtrlRecipe();

    ctrl.addRecipe(req.body.name, req.body.desc, req.body.instru, req.body.is_custom, req.body.product, req.body.ingre).then(function(result) {
        res.send(result);
    });

});

app.post("/ajaxRequest/addRecipeHandlerIngre", function(req, res) {
    let ctrl = new CtrlRecipe();

    ctrl.getProducts().then(function(result) {
        res.send(result);
    });

});

app.post("/ajaxRequest/updateRecipeHandler", function(req, res) {
    let ctrl = new CtrlRecipe();

    ctrl.updateRecipe(req.body.id, req.body.name, req.body.desc, req.body.instru, req.body.is_custom, req.body.product, req.body.ingre).then(function(result) {
        res.send(result);
    });

});

app.post("/ajaxRequest/updateRecipeHandlerIngre", function(req, res) {
    let ctrl = new CtrlRecipe();

    ctrl.getIngredients(req.body.id).then(function(result) {
        res.send(result);
    });

});

app.post("/ajaxRequest/updateRecipeHandlerDesc", function(req, res) {
    let ctrl = new CtrlRecipe();

    ctrl.getDescription(req.body.id).then(function(result) {
        res.send(result);
    });

});

app.post("/ajaxRequest/manageRecipe", function(req, res) {
    let ctrl = new CtrlRecipe();

    ctrl.getAllRecipe().then(function(result) {
        res.send(result);
    });

});

app.post("/ajaxRequest/updateRecipeHandlerInstru", function(req, res) {
    let ctrl = new CtrlRecipe();

    ctrl.getInstruction(req.body.id).then(function(result) {
        res.send(result);
    });

});

app.post("/ajaxRequest/updateRecipeHandlerName", function(req, res) {
    let ctrl = new CtrlRecipe();

    ctrl.getName(req.body.id).then(function(result) {
        res.send(result);
    });

});

app.post("/ajaxRequest/updateRecipeHandlerCustom", function(req, res) {
    let ctrl = new CtrlRecipe();

    ctrl.getCustom(req.body.id).then(function(result) {
        res.send(result);
    });

});

app.post("/ajaxRequest/deleteRecipeHandler", function(req, res) {
    let ctrl = new CtrlRecipe();

    ctrl.deleteRecipe(req.body.id).then(function(result) {
        res.send(result);
    });

});


app.post("/ajaxRequest/loadAllProducts", function(req, res) {
    let ctrlProduct = new CtrlProduct();

    ctrlProduct.loadAllProductsAdmin().then(function(result) {
        res.send(result)
    })
});

app.post("/ajaxRequest/loadSelectPromo", function(req, res) {
    let ctrl = new CtrlProduct();
    ctrl.getProductsSelectPromo().then(function(result) {
        res.send(result)
    })
});

app.post("/ajaxRequest/managePromo", function(req, res) {
    let ctrl = new CtrlPromo();
    ctrl.loadAllPromotions().then(function(result) {
        res.send(result)
    })
});

app.post("/ajaxRequest/addPromo", function(req, res) {
    let ctrlPromo = new CtrlPromo();
    ctrlPromo.addPromo(req.body.id, req.body.rabais).then(function(result) {
        res.send(result)
    })
});

app.post("/ajaxRequest/modifyPromo", function(req, res) {
    let ctrlPromo = new CtrlPromo();
    ctrlPromo.updatePromo(req.body.id, req.body.rabais).then(function(result) {
        res.send(result)
    })
});

app.post("/ajaxRequest/loadAllText", function(req, res) {
    let mgrlang = new MgrLanguage();
    mgrlang.loadAllText().then(function(resultat) {
        res.send(resultat);
    })
});

//Application routes
app.get("/", function(req, res) {
    //res.redirect("/manageProduct"); //res.redirect("/adminConnection");
    res.redirect("/adminChat")
});

app.get("/adminChat", function(req, res) {
    res.render("adminChat.ejs");
});

app.get("/adminConnection", function(req, res) {
    res.render("adminConnection.ejs");
});

app.get("/manageReseller", function(req, res) {
    res.render("manageReseller.ejs");
});

app.get("/manageProduct", function(req, res) {
    if (req.session.userId != undefined && req.session.isAdmin == 1) {
        let ctrlProduct = new CtrlProduct();

        Promise.all([ctrlProduct.generateModalProductTabs("add"), ctrlProduct.loadAllCategoriesHTML(), ctrlProduct.generateModalProductTabs("update"), ctrlProduct.loadAllCategories()]).then(function(results) {
            res.render("manageProduct.ejs", { addProductTabs: results[0], availableCategories: results[1], updateProductTabs: results[2], allAvailableCategories: JSON.stringify(results[3]) });
        });

    } else {
        res.redirect("/adminConnection?pleaseConnect=true");
    }
});

app.get("/manageRecipe", function(req, res) {
    if (req.session.userId != undefined && req.session.isAdmin == 1) {
        res.render("manageRecipe.ejs");
    } else {
        res.redirect("/adminConnection?pleaseConnect=true");
    }
});

app.get("/managePromotion", function(req, res) {
    if (req.session.userId != undefined && req.session.isAdmin == 1) {
        res.render("managePromotion.ejs");
    } else {
        res.redirect("/adminConnection?pleaseConnect=true");
    }
});

app.get("/manageText", function(req, res) {
    if (req.session.userId != undefined && req.session.isAdmin == 1) {
        let mgrlang = new MgrLanguage();

        Promise.all([mgrlang.generateModalCategoryTabs("update")]).then(function(result) {
            res.render("manageText.ejs", { modalUpdate: result[0] });
        });
    } else {
        res.redirect("/adminConnection?pleaseConnect=true");
    }
});


app.get("/manageCategory", function(req, res) {
    if (req.session.userId != undefined && req.session.isAdmin == 1) {
        let ctrlCategory = new CtrlCategory();

        Promise.all([ctrlCategory.generateModalCategoryTabs("add"), ctrlCategory.generateModalCategoryTabs("update")]).then(function(result) {
            res.render("manageCategory.ejs", { modalAdd: result[0], modalUpdate: result[1] });
        })

    } else {
        res.redirect("/adminConnection?pleaseConnect=true");
    }
});


app.post('/addProduct', upload.single('image'), function(req, res, next) {
    if (req.session.userId != undefined && req.session.isAdmin == 1) {
        let imgName = req.file.filename;
        let data = req.body;
        data.imgName = imgName;
        data.translatedFields = JSON.parse(data.translatedFields);

        let ctrlProduct = new CtrlProduct();

        ctrlProduct.addProduct(data).then(function(result) {
            res.send(result.toString())
        });
    } else {
        res.redirect("/adminConnection?pleaseConnect=true");
    }
});

app.post('/updateProduct', upload.single('image'), function(req, res, next) {
    if (req.session.userId != undefined && req.session.isAdmin == 1) {

        let data = req.body;
        data.translatedFields = JSON.parse(data.translatedFields);

        if (req.file != undefined) { //If the user uploaded a new image, replace it
            let imgName = req.file.filename;
            data.imgName = imgName;
        }

        let ctrlProduct = new CtrlProduct();

        ctrlProduct.updateProduct(data).then(function(result) {
            res.send(result.toString())
        });

    } else {
        res.redirect("/adminConnection?pleaseConnect=true");
    }
});

app.post('/addCategory', function(req, res) {
    if (req.session.userId != undefined && req.session.isAdmin == 1) {
        let ctrlCategory = new CtrlCategory();

        ctrlCategory.addCategory(req.body).then(function(result) {
            res.send(result)
        });
    } else {
        res.redirect("/adminConnection?pleaseConnect=true");
    }
});

app.post('/updateCategory', function(req, res) {
    if (req.session.userId != undefined && req.session.isAdmin == 1) {
        let mgrlang = new MgrLanguage();

        mgrlang.updateText(req.body).then(function(result) {
            res.send(result)
        });
    } else {
        res.redirect("/adminConnection?pleaseConnect=true");
    }
});

app.post('/updateText', function(req, res) {
    if (req.session.userId != undefined && req.session.isAdmin == 1) {
        let mgrlang = new MgrLanguage();

        mgrlang.updateText(req.body).then(function(result) {
            res.send(result)
        });
    } else {
        res.redirect("/adminConnection?pleaseConnect=true");
    }
});

app.post("/ajaxRequest/loadAllCategoriesAdmin", function(req, res) {
    let ctrlCategory = new CtrlCategory();

    ctrlCategory.loadAllCategoriesAdmin().then(function(result) {
        res.send(result);
    })
});


app.post("/ajaxRequest/loadAllResellers", function(req, res) {
    let ctrlReseller = new CtrlReseller();

    ctrlReseller.getReseller().then(function(result) {
        res.send(result);
    })
});

app.post("/ajaxRequest/loadAllNonResellers", function(req, res) {
    let ctrlReseller = new CtrlReseller();

    ctrlReseller.getUsers().then(function(result) {
        res.send(result);
    })
});

app.post("/ajaxRequest/addReseller", function(req, res) {
    let ctrlReseller = new CtrlReseller();


    ctrlReseller.addReseller(req.body);
    res.send("true");
});

app.post("/ajaxRequest/removeReseller", function(req, res) {
    let ctrlReseller = new CtrlReseller();

    ctrlReseller.removeReseller(req.body);
    res.send("true");
});

app.post("/ajaxRequest/getResellerProduct", function(req, res) {
    let ctrlReseller = new CtrlReseller();

    ctrlReseller.getProductList().then(function(result) {
        res.send(result);
    })
});

app.post("/ajaxRequest/getRebateReseller", function(req, res) {
    let ctrlReseller = new CtrlReseller();


    ctrlReseller.getRebate(req.body).then(function(result) {
        res.send(result);
    })
});


app.post("/ajaxRequest/updateRebateReseller", function(req, res) {
    let ctrlReseller = new CtrlReseller();
    let data = req.body;
    let resellerId = data.resellerId;
    let listRebateUpdated = data.listRebate;

    ctrlReseller.updateResellerRebate(listRebateUpdated, resellerId);
    res.send("true");
});



app.post("/ajaxRequest/getTags", function(req, res) {
    let ctrlProduct = new CtrlProduct();

    ctrlProduct.loadAllTags().then(function(result) {});
});


app.listen(5000);



/*
    Socket.io chat starts from here
*/

const nspAdmin = io.of('/admin');
const nspClient = io.of('/client');


let allRooms = [];

//Shares the session used with express-session
//to the sockets
io.of("/client").use(sharedsession(session, {
    autoSave: true
}));


//When the client socket's connected
nspClient.on('connection', function(socket) {

    let chatRoomId = socket.handshake.session.chatRoomId;

    //If the user is already in a chat room
    if (chatRoomId != undefined) {
        let ctrlChat = new CtrlChat();

        //Emit the new socketID to the admins
        io.of("admin").emit("updateSocketId", {
            roomId: chatRoomId,
            socketId: socket.id
        });

        //Updates the socketId in the DB
        ctrlChat.updateSocketId(chatRoomId, socket.id);

        //Load all the informations and messages from the room the user is in
        //and emits it to him (so the chat can keep up through the pages)
        ctrlChat.getAllRoomInformations(chatRoomId).then(function(infos) {
            socket.emit("discussionAlreadyStarted", infos);
        })

        //Tells the server he came back (under a new socket)
        for (let i = 0; i < allRooms.length; i++) {
            if (allRooms[i].roomId == chatRoomId) {
                clearTimeout(allRooms[i].disconnectTimeout);
            }
        }
    }


    //When receiving a start discussion event
    socket.on("startDiscussion", (data) => {

        //Take the user's socket id
        let socketId = socket.id;


        //Insert the discussion into the DB
        let ctrlChat = new CtrlChat();
        ctrlChat.createNewDiscussion({ username: data.username, question: data.question, socketId: socketId }).then(function(res) {
            //Give the chatroom id to the socket so that it can retrieve it
            //when sending messages
            socket.handshake.session.chatRoomId = res.insertId;
            socket.handshake.session.save();


            //Emit the event to the admins
            io.of("admin").emit("startDiscussion", {
                username: data.username,
                roomId: res.insertId,
                question: data.question,
                socketId: socketId
            });

            //Push the created room to the server's room list
            allRooms.push({ roomId: res.insertId, disconnectTimeout: null })
        });

    });


    //When receiving a sendMessage event
    socket.on("sendMessage", (message) => {
        let roomId = socket.handshake.session.chatRoomId;

        //Emit the even to the admins
        io.of("admin").emit("incomingMessage", {
            chatRoomId: roomId,
            message: message.message,
            isAdmin: false
        });

        //Emits the event to himself
        socket.emit("incomingMessage", {
            message: message.message,
            isAdmin: false
        })

        //Insert the message into the database
        let ctrlChat = new CtrlChat();
        ctrlChat.insertNewMessage({
            roomId: roomId,
            message: message.message,
        }, false)

    });

    //When the conversation has ended
    socket.on("conversationEnded", () => {

        //Delete the chatRoomId Session
        socket.handshake.session.chatRoomId = undefined;
        socket.handshake.session.save();

    });

    //When the user disconnects
    socket.on("disconnect", () => {
        let roomId = socket.handshake.session.chatRoomId;

        //Find the object that coresponds to this room
        //in the server's list
        for (let i = 0; i < allRooms.length; i++) {
            if (allRooms[i].roomId == roomId) {
                let timeoutDisconnect = setTimeout(() => {
                    //Tell the admins the user is disconnected
                    io.of("admin").emit("userDisconnected", { roomId: roomId });

                    //Remove his chat room id
                    socket.handshake.session.chatRoomId = undefined;
                    socket.handshake.session.save();

                    //Update de database status
                    let ctrlChat = new CtrlChat();
                    ctrlChat.updateRoomStatus(roomId, 0);

                }, 5000);

                allRooms[i].disconnectTimeout = timeoutDisconnect;
            }
        }
    })

    //When the user wants to save a copy of
    //the chat
    socket.on("sendEmailCopy",(email)=>{
        let roomId = socket.handshake.session.chatRoomId;
        let ctrlChat = new CtrlChat();

        ctrlChat.sendDiscussionByEmail(roomId, email.email);
    });

});

//When the admin socket's connected
nspAdmin.on('connection', function(socket) {

    let ctrlChat = new CtrlChat();
    //Loads all the room that are still active along with all of their
    //informations
    ctrlChat.getAllActiveRoomsAndInfos().then(function(infos) {
        socket.emit("discussionAlreadyStarted", infos);
    })


    socket.on("sendMessage", (messageInfos) => {

        //Send the message to the client
        nspClient.to(messageInfos.toSocketId).emit("incomingMessage", {
            message: messageInfos.message,
            isAdmin: true
        });

        //Emits the mesage to the admins
        io.of("admin").emit("incomingMessage", {
            chatRoomId: messageInfos.roomId,
            message: messageInfos.message,
            isAdmin: true
        });


        //Insert the message into the database
        let ctrlChat = new CtrlChat();
        ctrlChat.insertNewMessage({
            roomId: messageInfos.roomId,
            userId: 1, //CHANGE THIS ID TO THE REQ.SESSION.USERID WHEN FINISHED
            message: messageInfos.message,
        }, true)
    });

    //Deletes the converstaion and can send it by email 
    socket.on("closeConversation", (param) => {

        let ctrlChat = new CtrlChat();

        //If the admin wants it by email
        if (param.sendEmail) {
            ctrlChat.sendDiscussionByEmail(param.roomId, param.email).then(function() {
                
                //Closes the conversation
                ctrlChat.closeConversation(param.roomId);
            })
        } else { //If there is no email to send

            //Closes the conversation
            ctrlChat.closeConversation(param.roomId);
        }

        //Tells the user the conversation has ended
        nspClient.to(param.toSocketId).emit("conversationEnded");

        //Emits the mesage to the admins
        io.of("admin").emit("deleteConversation", {
            roomId: param.roomId,
        });

    });

});



server.listen(8000);