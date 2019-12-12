USE Quintessentiel;


#Language table
INSERT INTO Language VALUES (DEFAULT,'fr');
INSERT INTO Language VALUES (DEFAULT,'en');


#Civility
INSERT INTO Civility VALUES (DEFAULT); #Id1
INSERT INTO Civility VALUES (DEFAULT); #Id2
INSERT INTO Civility VALUES (DEFAULT); #Id3


INSERT INTO CivilityAttribute VALUES (DEFAULT,"civilityName");

INSERT INTO TA_CivilityAttribute_Language VALUES (1,1,1,"Homme");
INSERT INTO TA_CivilityAttribute_Language VALUES (1,2,1,"Male");

INSERT INTO TA_CivilityAttribute_Language VALUES (1,1,2,"Femme");
INSERT INTO TA_CivilityAttribute_Language VALUES (1,2,2,"Female");




#Products
INSERT INTO ProductAttribute VALUES(DEFAULT,"title");
INSERT INTO ProductAttribute VALUES(DEFAULT,"description");
INSERT INTO ProductAttribute VALUES(DEFAULT,"advice");


#Categories
INSERT INTO CategoryAttribute VALUES (DEFAULT,"title");

INSERT INTO Category VALUES (DEFAULT,1);
INSERT INTO Category VALUES (DEFAULT,1);
INSERT INTO Category VALUES (DEFAULT,1);

INSERT INTO TA_CategoryAttribute_Language VALUES (1,1,1,"Catégorie A");
INSERT INTO TA_CategoryAttribute_Language VALUES (1,1,2,"Catégorie B");
INSERT INTO TA_CategoryAttribute_Language VALUES (1,1,3,"Catégorie C");

#Country
INSERT INTO CountryAttribute VALUES(DEFAULT,"name");

INSERT INTO Country VALUES (DEFAULT);   #Canada
INSERT INTO Country VALUES (DEFAULT);   #United States



INSERT INTO TA_CountryAttribute_Language VALUES (1,1,1,"Canada");
INSERT INTO TA_CountryAttribute_Language VALUES (1,2,1,"Canada");

INSERT INTO TA_CountryAttribute_Language VALUES (1,1,2,"États-unis");
INSERT INTO TA_CountryAttribute_Language VALUES (1,2,2,"United States");


#Provinces
INSERT INTO ProvinceAttribute VALUES(DEFAULT,"name");

    #Canada provinces
INSERT INTO Province VALUES (DEFAULT,1);
INSERT INTO Province VALUES (DEFAULT,1);
INSERT INTO Province VALUES (DEFAULT,1);
INSERT INTO Province VALUES (DEFAULT,1);
INSERT INTO Province VALUES (DEFAULT,1);
INSERT INTO Province VALUES (DEFAULT,1);
INSERT INTO Province VALUES (DEFAULT,1);
INSERT INTO Province VALUES (DEFAULT,1);
INSERT INTO Province VALUES (DEFAULT,1);
INSERT INTO Province VALUES (DEFAULT,1);
    
    #United states provinces
INSERT INTO Province VALUES (DEFAULT,2);
INSERT INTO Province VALUES (DEFAULT,2);

#attributeId,languageId,provinceId

    #Canada provinces
INSERT INTO TA_ProvinceAttribute_Language VALUES (1,1,1,"Ontario");
INSERT INTO TA_ProvinceAttribute_Language VALUES (1,2,1,"Ontario");

INSERT INTO TA_ProvinceAttribute_Language VALUES (1,1,2,"Québec");
INSERT INTO TA_ProvinceAttribute_Language VALUES (1,2,2,"Quebec");

INSERT INTO TA_ProvinceAttribute_Language VALUES (1,1,3,"Nouvelle Écosse");
INSERT INTO TA_ProvinceAttribute_Language VALUES (1,2,3,"Nova Scotia");

INSERT INTO TA_ProvinceAttribute_Language VALUES (1,1,4,"Nouveau Brunswick");
INSERT INTO TA_ProvinceAttribute_Language VALUES (1,2,4,"New Brunswick");

INSERT INTO TA_ProvinceAttribute_Language VALUES (1,1,5,"Manitoba");
INSERT INTO TA_ProvinceAttribute_Language VALUES (1,2,5,"Manitoba");

INSERT INTO TA_ProvinceAttribute_Language VALUES (1,1,6,"Colombie Britanique");
INSERT INTO TA_ProvinceAttribute_Language VALUES (1,2,6,"British Columbia");

INSERT INTO TA_ProvinceAttribute_Language VALUES (1,1,7,"Île du prince Édouard");
INSERT INTO TA_ProvinceAttribute_Language VALUES (1,2,7,"Prince Edward Island");

INSERT INTO TA_ProvinceAttribute_Language VALUES (1,1,8,"Saskatchewan");
INSERT INTO TA_ProvinceAttribute_Language VALUES (1,2,8,"Saskatchewan");

INSERT INTO TA_ProvinceAttribute_Language VALUES (1,1,9,"Alberta");
INSERT INTO TA_ProvinceAttribute_Language VALUES (1,2,9,"Alberta");

INSERT INTO TA_ProvinceAttribute_Language VALUES (1,1,10,"Terre neuve et Labrador");
INSERT INTO TA_ProvinceAttribute_Language VALUES (1,2,10,"Newfoundland and Labrador");
    
    #United States Provinces
INSERT INTO TA_ProvinceAttribute_Language VALUES (1,1,11,"Californie");
INSERT INTO TA_ProvinceAttribute_Language VALUES (1,2,11,"California");

INSERT INTO TA_ProvinceAttribute_Language VALUES (1,1,12,"Floride");
INSERT INTO TA_ProvinceAttribute_Language VALUES (1,2,12,"Florida");


#User
#INSERT INTO Users VALUES (DEFAULT,1,"Admin","Admin","admin@admin.com","2019-01-01","$2b$10$jagLRkMveQSjVye8cY77M.9CS7rl4Y8uD2Q9sn9qVKbDXNZ5ma5oa",1,1,"admin",0,"J1R0B1",404,1,1);



#bd


INSERT INTO landingtext_attribute (id, type, page) 
VALUES 
    (1, 'home', 'navbar'),
    (2, 'products', 'navbar'),
    (3, 'face', 'navbar'),
    (4, 'facenettoyants', 'navbar'),
    (5, 'facemasque', 'navbar'),
    (6, 'facecontour', 'navbar'),
    (7, 'faceoleoserum', 'navbar'),
    (8, 'facelotions', 'navbar'),
    (9, 'facehydrolats', 'navbar'),
    (10, 'facetrios', 'navbar'),
    (11, 'facehuilevegetale', 'navbar'),
    (12, 'facehuileessentielle', 'navbar'),
    (13, 'facesoinssolaires', 'navbar'),
    (14, 'facesoinsantiage', 'navbar'),
    (15, 'facemaquillage', 'navbar'),
    (16, 'facebaume', 'navbar'),
    (17, 'facehuilemoringa', 'navbar'),
    (18, 'corps', 'navbar'),
    (19, 'corpsbeurredouceur', 'navbar'),
    (20, 'corpsbaume', 'navbar'),
    (21, 'corpshuiledouceur', 'navbar'),
    (22, 'corpshuilevergeture', 'navbar'),
    (23, 'corpssavon', 'navbar'),
    (24, 'corpscoffrets', 'navbar'),
    (25, 'corpssoinsmains', 'navbar'),
    (26, 'corpssoinshommes', 'navbar'),
    (27, 'corpsbeurrekarite', 'navbar'),
    (28, 'corpsgel', 'navbar'),
    (29, 'peau', 'navbar'),
    (30, 'peaujeune', 'navbar'),
    (31, 'peausensible', 'navbar'),
    (32, 'peauseche', 'navbar'),
    (33, 'peaumixte', 'navbar'),
    (34, 'peaugrasse', 'navbar'),
    (35, 'peaureactive', 'navbar'),
    (38, 'peauacneique', 'navbar'),
    (39, 'peaudeshydratee', 'navbar'),
    (40, 'peaucellulite', 'navbar'),
    (41, 'peautaches', 'navbar'),
    (42, 'consult', 'navbar'),
    (43, 'consultaromatherapie', 'navbar'),
    (44, 'consultdermoco', 'navbar'),
    (45, 'consultserum', 'navbar'),
    (46, 'consultskype', 'navbar'),
    (47, 'form', 'navbar'),
    (48, 'formaromatherapie', 'navbar'),
    (49, 'formhiver', 'navbar'),
    (50, 'formhuiles', 'navbar'),
    (51, 'formcosmetique', 'navbar'),
    (52, 'propos', 'navbar'),
    (53, 'proposfaq', 'navbar'),
    (54, 'proposcontact', 'navbar'),
    (62, 'banner', 'navbar'),
    (63, 'banner2', 'navbar');


INSERT INTO ta_landingtextattribute_language (landingTextAttribute, languageId, value) 
VALUES 
    ('1', '1', 'Accueil'), 
    ('1', '2', 'Home'),
    
    ('2', '1', 'Produits'), 
    ('2', '2', 'Products'),

    ('3', '1', 'Visage'), 
    ('3', '2', 'Face'),

    ('4', '1', 'Nettoyants'), 
    ('4', '2', 'Nettoyants ANGLAIS'),

    ('5', '1', 'Masques et exfoliants'), 
    ('5', '2', 'Masques et exfoliants ANGLAIS'),

    ('6', '1', 'Contour des yeux'), 
    ('6', '2', 'Contour des yeux ANGLAIS'),

    ('7', '1', 'Oléosérums'), 
    ('7', '2', 'Oléosérums ANGLAIS'),

    ('8', '1', 'Lotions toniques'), 
    ('8', '2', 'Lotions toniques ANGLAIS'),

    ('9', '1', 'Masques et exfoliants'), 
    ('9', '2', 'Masques et exfoliants ANGLAIS'),

    ('10', '1', 'Trios et coffrets'), 
    ('10', '2', 'Trios et coffrets ANGLAIS'),

    ('11', '1', 'Huiles végétales'), 
    ('11', '2', 'Huiles végétales ANGLAIS'),

    ('12', '1', 'Huiles essentielles'), 
    ('12', '2', 'Huiles essentielles ANGLAIS'),

    ('13', '1', 'Soins solaires'), 
    ('13', '2', 'Soins solaires ANGLAIS'),

    ('14', '1', 'Soins Antiage'), 
    ('14', '2', 'Soins Antiage ANGLAIS'),

    ('15', '1', 'Maquillage minéral'), 
    ('15', '2', 'Maquillage minéral ANGLAIS'),
    
    ('16', '1', 'Baume à lèvres'), 
    ('16', '2', 'Baume à lèvres ANGLAIS'),
    
    ('17', '1', 'Huile de Moringa'), 
    ('17', '2', 'Huile de Moringa ANGLAIS'),
    
    ('18', '1', 'Corps'), 
    ('18', '2', 'Corps ANGLAIS'),
    
    ('19', '1', 'Beurre fouetté douceur'), 
    ('19', '2', 'Beurre fouetté douceur ANGLAIS'),
    
    ('20', '1', 'Baume exfoliant'), 
    ('20', '2', 'Baume exfoliant ANGLAIS'),
    
    ('21', '1', 'Huile hydratante douceur'), 
    ('21', '2', 'Huile hydratante douceur ANGLAIS'),
    
    ('22', '1', 'Huile réparatrice vergetures'), 
    ('22', '2', 'Huile réparatrice vergetures ANGLAIS'),
    
    ('23', '1', 'Savon noir'), 
    ('23', '2', 'Savon noir ANGLAIS'),

    ('24', '1', 'Coffret Hammam'), 
    ('24', '2', 'Coffret Hammam ANGLAIS'),
    
    ('25', '1', 'Soins des mains'), 
    ('25', '2', 'Soins des mains ANGLAIS'),
    
    ('26', '1', 'Beurre de karité'), 
    ('26', '2', 'Beurre de karité ANGLAIS'),
    
    ('27', '1', "Gel d'aloès"), 
    ('27', '2', "Gel d'aloès ANGLAIS"),
    
    ('28', '1', 'Peau'), 
    ('28', '2', 'Products'),

    ('29', '1', 'Peau jeune'), 
    ('29', '2', 'Peau jeune ANGLAIS'),

    ('30', '1', 'Nettoyants'), 
    ('30', '2', 'Nettoyants ANGLAIS'),

    ('31', '1', 'Peau sensible/intolérante'), 
    ('31', '2', 'Peau sensible/intolérante ANGLAIS'),

    ('32', '1', 'Peau sèche'), 
    ('32', '2', 'Peau sèche ANGLAIS'),

    ('33', '1', 'Peau mixte'), 
    ('33', '2', 'Peau mixte ANGLAIS'),

    ('34', '1', 'Peau grasse'), 
    ('34', '2', 'Peau grasse ANGLAIS'),

    ('35', '1', 'Peau réactive/rougeurs'), 
    ('35', '2', 'Peau réactive/rougeurs ANGLAIS'),

    ('38', '1', 'Peau à tendeance acnéique'), 
    ('38', '2', 'Peau à tendeance acnéique ANGLAIS'),

    ('39', '1', 'Peau déshydratée'), 
    ('39', '2', 'Peau déshydratée ANGLAIS'),

    ('40', '1', 'Cellulite/vergetures'), 
    ('40', '2', 'Cellulite/vergetures ANGLAIS'),

    ('41', '1', 'Tâches brunes'), 
    ('41', '2', 'Tâches brunes ANGLAIS'),

    ('42', '1', 'Consultations'), 
    ('42', '2', 'Consultations ANGLAIS'),

    ('43', '1', 'Consultation en aromathérapie'), 
    ('43', '2', 'Consultation en aromathérapie ANGLAIS'),

    ('44', '1', 'Consultation en dermocosmétique naturelle'), 
    ('44', '2', 'Consultation en dermocosmétique naturelle ANGLAIS'),
    
    ('45', '1', 'Sérum personnalisé'), 
    ('45', '2', 'Sérum personnalisé ANGLAIS'),
    
    ('46', '1', 'Coaching par Skype'), 
    ('46', '2', 'Coaching par Skype ANGLAIS'),
    
    ('47', '1', 'Formations'), 
    ('47', '2', 'Formations ANGLAIS'),
    
    ('48', '1', 'Aromathérapie : Le top 10 des huiles essentielles'), 
    ('48', '2', 'Aromathérapie : Le top 10 des huiles essentielles ANGLAIS'),
    
    ('49', '1', "Halte aux maux de l'hiver"), 
    ('49', '2', "Halte aux maux de l'hiver ANGLAIS"),
    
    ('50', '1', 'Huiles essentielles et émotions'), 
    ('50', '2', 'Huiles essentielles et émotions ANGLAIS'),
    
    ('51', '1', "Qu'y a-t-il dans mes cosmétiques"), 
    ('51', '2', "Qu'y a-t-il dans mes cosmétiques ANGLAIS"),
    
    ('52', '1', 'À propos'), 
    ('52', '2', 'À propos ANGLAIS'),

    ('53', '1', 'FAQ'), 
    ('53', '2', 'FAQ ANGLAIS'),
    
    ('54', '1', 'Contactez-nous'), 
    ('54', '2', 'Contactez-nous ANGLAIS'),


    ('62', '1', 'Cliquez ici pour votre'), 
    ('62', '2', 'Click here for your'),

    ('63', '1', 'sérum personnalisé'), 
    ('63', '2', 'personnalised serum');
    #FIN NAVBAR 


    INSERT INTO landingtext_attribute (id, type, page) 
    VALUES 
    (55, 'titleIndex', 'index'),
    (56, 'featured', 'index'),
    (57, 'ebook', 'index'),
    (58, 'presentationTitle', 'index'),
    (59, 'presentation', 'index'),
    (60, 'temoignage', 'index');

    INSERT INTO ta_landingtextattribute_language (landingTextAttribute, languageId, value) 
    VALUES 
    ('55', '1', 'Accueil'), 
    ('55', '2', 'Home'),

    ('56', '1', 'Produits vedettes'), 
    ('56', '2', 'Featured Products'),

    ('57', '1', 'Téléchargez notre ebook !'), 
    ('57', '2', 'Download our ebook !'),

    ('58', '1', 'Présentation !'), 
    ('58', '2', 'Presentation !'),

    ('59', '1', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit repellat voluptatem architecto sint animi consequatur ullam, vitae omnis placeat nam quibusdam error quisquam quaerat! Officia molestias quaerat explicabo possimus vero? Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, reiciendis. Odio ut minus sint aperiam, impedit, eos similique esse harum velit voluptatem, magnam animi deleniti architecto quo ipsa corporis itaque. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum quam rem sunt, aspernatur reiciendis laboriosam reprehenderit debitis. Magni voluptas error tempora accusamus temporibus optio! Non officiis illum dolore ipsam quasi. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis quasi, animi fuga excepturi ab sunt esse repudiandae corrupti eaque suscipit laborum cupiditate ducimus aperiam maxime repellendus unde adipisci eos molestiae.'), 
    ('59', '2', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit repellat voluptatem architecto sint animi consequatur ullam, vitae omnis placeat nam quibusdam error quisquam quaerat! Officia molestias quaerat explicabo possimus vero? Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, reiciendis. Odio ut minus sint aperiam, impedit, eos similique esse harum velit voluptatem, magnam animi deleniti architecto quo ipsa corporis itaque. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum quam rem sunt, aspernatur reiciendis laboriosam reprehenderit debitis. Magni voluptas error tempora accusamus temporibus optio! Non officiis illum dolore ipsam quasi. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis quasi, animi fuga excepturi ab sunt esse repudiandae corrupti eaque suscipit laborum cupiditate ducimus aperiam maxime repellendus unde adipisci eos molestiae.'),

    ('60', '1', 'Temoignages'), 
    ('60', '2', 'Témoignages');


 #FIN INDEX

 #Catalogue

    INSERT INTO landingtext_attribute (id, type, page) 
    VALUES 
    (61, 'titleCatalogue', 'catalogue');

    INSERT INTO ta_landingtextattribute_language (landingTextAttribute, languageId, value) 
    VALUES 
    ('61', '1', 'Produits'), 
    ('61', '2', 'Products');

 #Fin catalogue

 #ProduitInfo

INSERT INTO landingtext_attribute (id, type, page) 
    VALUES 
    (64, 'buttonSite', 'productInfo'),
    (65, 'buttonCart', 'productInfo'),
    (66, 'description', 'productInfo'),
    (67, 'rituel', 'productInfo');

    INSERT INTO ta_landingtextattribute_language (landingTextAttribute, languageId, value) 
    VALUES 
    ('64', '1', 'Aller sur le site'), 
    ('64', '2', 'Go to the website'),

    ('65', '1', 'Ajouter au panier'), 
    ('65', '2', 'Add to cart'),

    ('66', '1', 'Description'), 
    ('66', '2', 'Description'),

    ('67', '1', 'Rituel'), 
    ('67', '2', 'Ritual');

    # Fin ProduitInfo


    #Page de userRegister
    INSERT INTO 
    landingtext_attribute 
    VALUES 
    (68,'pageH1','userRegister'),
    (69,'labelFirstName','userRegister'),
    (70,'labelLastName','userRegister'),
    (71,'labelEmail','userRegister'),
    (72,'labelBirthDate','userRegister'),
    (73,'labelCivility','userRegister'),
    (74,'subTitleAddress','userRegister'),
    (75,'labelStreet','userRegister'),
    (76,'labelAppartment','userRegister'),
    (77,'labelPostalCode','userRegister'),
    (78,'labelCivicNo','userRegister'),
    (79,'labelCountry','userRegister'),
    (80,'labelProvince','userRegister'),
    (81,'labelTrouble','userRegister'),
    (82,'labelPassword','userRegister'),
    (83,'labelConfirmPassword','userRegister'),
    (84,'labelSubscribeNewsletter','userRegister'),
    (85,'labelISubscribe','userRegister'),
    (86,'labelComplete','userRegister'),
    (87,'pageTitle','userRegister'),
    (89,'errSameEmail','userRegister'),
    (90,'errValidFirstName','userRegister'),
    (91,'errValidLastName','userRegister'),
    (92,'errValidEmail','userRegister'),
    (93,'errValidPassword','userRegister'),
    (94,'errConfirmPassword','userRegister'),
    (95,'errWhileAddUser','userRegister');

    INSERT INTO 
    ta_landingtextattribute_language 
    VALUES
    (68,'1','Inscription'),
    (68,'2','Register'),
    (69,'1','Prénom'),
    (69,'2','First name'),
    (70,'1','Nom'),
    (70,'2','Last name'),
    (71,'1','Courriel'),
    (71,'2','Email'),
    (72,'1','Date de naissance'),
    (72,'2','Birthdate'),
    (73,'1','Civilité'),
    (73,'2','Civility'),
    (74,'1','Adresse'),
    (74,'2','Address'),
    (75,'1','Rue'),
    (75,'2','Street'),
    (76,'1','No app.'),
    (76,'2','App nb.'),
    (77,'1','Code postal'),
    (77,'2','Postal code'),
    (78,'1','No civique'),
    (78,'2','Civic nb.'),
    (79,'1','Pays'),
    (79,'2','Country'),
    (80,'1','Province'),
    (80,'2','Province'),
    (81,'1','troubles'),
    (81,'2','Troubles'),
    (82,'1','Mot de passe'),
    (82,'2','Password'),
    (83,'1','Confirmer le mot de passe'),
    (83,'2','Confirm password'),
    (84,'1','Abonnez-vous à l\'infolettre'),
    (84,'2','Subscribe to the newsletter'),
    (85,'1','je souhaite m\'abonner'),
    (85,'2','I subscribe'),
    (86,'1','Créer'),
    (86,'2','Create'),
    (87,'1','Quintessentiel | Nouveau compte'),
    (87,'2','Quintessentiel | New account'),
    (89,'1','L\'addresse courriel entrée est déjà utilisée.'),
    (89,'2','The given email address is already used on the website.'),
    (90,'1','Veuillez entrer un prénom valide'),
    (90,'2','Please enter a valid first name'),
    (91,'1','Veuillez entrer un nom valide'),
    (91,'2','Please enter a valid last name'),
    (92,'1','L\'adresse courriel entrée est invalide.'),
    (92,'2','The given email address is invalid.'),
    (93,'1','Mot de passe invalide. Le mot de passe doit contenir un minimum de 6 lettres, ainsi qu\'une majuscule et un chiffre'),
    (93,'2','Invalid password. The password must contain at least 6 letters, a capital letter and a number'),
    (94,'1','Les mots de passes ne correspondent pas.'),
    (94,'2','The passwords don\'t match.'),
    (95,'1','Erreur lors de l\'ajout de l\'utilisateur.veuillez réessayer plus tard.'),
    (95,'2','Error while adding the user. Please try again later.');



    #userConnection
    INSERT INTO 
    landingtext_attribute 
    VALUES 
    (96,'pageTitle','userConnection'),
    (97,'pageH1','userConnection'),
    (98,'labelEmail','userConnection'),
    (99,'labelPassword','userConnection'),
    (100,'btnConnection','userConnection'),
    (101,'labelForgotPassword','userConnection'),
    (102,'labelCreateAccount','userConnection'),
    (103,'titleForgotPassword','userConnection'),
    (104,'labelForgotEmail','userConnection'),
    (105,'btnSendEmail','userConnection'),
    (106,'btnCancel','userConnection'),
    (107,'emailSent','userConnection'),
    (108,'errEmailNotSent','userConnection'),
    (109,'errInvalidEmail','userConnection'),
    (110,'successCreatedAccount','userConnection'),
    (113,'errWrongInfo','userConnection'),
    (114,'passwordModified','userConnection');



    INSERT INTO 
    ta_landingtextattribute_language 
    VALUES
    (96,'1','Quintessentiel | Connexion'),
    (96,'2','Quintessentiel | Connection'),
    (97,'1','Connexion'),
    (97,'2','Connection'),
    (98,'1','Courriel'),
    (98,'2','Email'),
    (99,'1','Mot de passe'),
    (99,'2','Password'),
    (100,'1','Connexion'),
    (100,'2','Connection'),
    (101,'1','Mot de passe oublié?'),
    (101,'2','Forgot password?'),
    (102,'1','Se créer un compte'),
    (102,'2','Create an account'),
    (103,'1','Mot de passe oublié'),
    (103,'2','Forgot password'),
    (104,'1','Entrez l\'adresse courriel de votre compte'),
    (104,'2','Type your account\'s email address'),
    (105,'1','Envoyer le courriel de récupération'),
    (105,'2','Send the recovery email'),
    (106,'1','Annuler'),
    (106,'2','Cancel'),
    (107,'1','Courriel de récupération envoyé!'),
    (107,'2','Recovery email sent!'),
    (108,'1','Le courriel n\'a pas été envoyé!'),
    (108,'2','The email couldn\'t be sent!'),
    (109,'1','Le courriel entré est invalide.'),
    (109,'2','The given email is invalid.'),
    (110,'1','Votre compte a été créé avec succès!'),
    (110,'2','Your account has been successfully created!'),
    (113,'1','Le courriel/mot de passe ne correspondent pas.'),
    (113,'2','The email/password don\'t match.'),
    (114,'1','Votre mot de passe a été modifié avec succès!'),
    (114,'2','Your password has been successfully modified!');


    #Cart
    INSERT INTO 
    landingtext_attribute 
    VALUES 
    (115,'cartTitle','navbar'), 
    (116,'cartSubTotal','navbar'), 
    (117,'cartToPayment','navbar'), 
    (118,'lblCartQty','navbar'),
    (119,'lblCartQtyTooMuch','navbar'), 
    (120,'lblCartEmpty','navbar'), 
    (121,'lblCartCantSmallerOne','navbar'), 
    (122,'lblCartCantBiggerStock','navbar'), 
    (123,'lblCartItemAdded','navbar'), 
    (124,'lblCartItemAlready','navbar'), 
    (125,'lblCartMustBeConnected','navbar');
    

    INSERT INTO 
    ta_landingtextattribute_language 
    VALUES
    (115,'1','Panier'), 
    (115,'2','Cart'), 
    (116,'1','Sous-total'), 
    (116,'2','Sub-total'),
    (117,'1','Paiement'), 
    (117,'2','Payment'),
    (118,'1','Quantité'),
    (118,'2','Quantity'),
    (119,'1','Quantité trop élevé!'), 
    (119,'2','Too much of this item!'), 
    (120,'1','Votre panier est vide.'),
    (120,'2','Your cart is empty'), 
    (121,'1','La quantité ne peut pas être plus petite que 1.'), 
    (121,'2','The quantity can\'t be smaller than one.'), 
    (122,'1','La quantité dépasse la quantité en stock.'), 
    (122,'2','The quantity is greater than the in-stock quantity.'), 
    (123,'1','Item ajouté à votre panier!'), 
    (123,'2','The item has been added to your cart!'),
    (124,'1','L\'item se trouve déjà dans votre panier'), 
    (124,'2','This item is already in your cart!'), 
    (125,'1','Vous devez être connecté pour passer la commande!'),
    (125,'2','You must be connected in order to pay.');

    #troubles
    INSERT INTO Conditions VALUES (DEFAULT);
    INSERT INTO Conditions VALUES (DEFAULT);
    INSERT INTO Conditions VALUES (DEFAULT);
    INSERT INTO Conditions VALUES (DEFAULT);

    INSERT INTO conditionsattribute VALUES (DEFAULT,"name");


    INSERT INTO ta_conditionsattribute_language VALUES (1,1,1,"Peau grasse");
    INSERT INTO ta_conditionsattribute_language VALUES (1,2,1,"Oily skin");

    INSERT INTO ta_conditionsattribute_language VALUES (1,1,2,"Peau sec");
    INSERT INTO ta_conditionsattribute_language VALUES (1,2,2,"Dry skin");

    INSERT INTO ta_conditionsattribute_language VALUES (1,1,3,"Peau irritée");
    INSERT INTO ta_conditionsattribute_language VALUES (1,2,3,"Irritated Skin");


    #Payment page
    INSERT INTO 
    landingtext_attribute 
    VALUES 
    (156,'pageTitle','paymentPage'),
    (126,'subTitleResume','paymentPage'), 
    (127,'subTitleUseThese','paymentPage'), 
    (128,'subTitleNewAddress','paymentPage'), 
    (129,'tabPayment','paymentPage'), 
    (130,'tabInformations','paymentPage'), 
    (131,'tabResume','paymentPage'),
    (132,'tableColCart','paymentPage'),
    (133,'tableColPrice','paymentPage'),
    (134,'tableColQuantity','paymentPage'),
    (135,'tableColTotal','paymentPage'),
    (136,'paymentSubTotal','paymentPage'),  
    (137,'paymentTotal','paymentPage'),
    (138,'paymentBtnEnterInfo','paymentPage'),
    (139,'infoCountry','paymentPage'),
    (140,'infoProvince','paymentPage'),
    (141,'infoStreet','paymentPage'),
    (142,'infoCivic','paymentPage'),
    (143,'infoPostalCode','paymentPage'),
    (144,'infoApp','paymentPage'),
    (145,'infoBtnToPayment','paymentPage'),
    (146,'paymentBtnPay','paymentPage'),
    (147,'tps','paymentPage'),
    (148,'tvq','paymentPage'),
    (149,'lblErrFormStreet','paymentPage'),
    (150,'lblErrFormCivic','paymentPage'),
    (151,'lblErrFormPostalCode','paymentPage'),
    (152,'lblAfterRebate','paymentPage'),
    (153,'lblDeleteItem','paymentPage'),
    (154,'creditOrDebit','paymentPage'),
    (155,'paymentSuccessfull','paymentPage');

    INSERT INTO 
    ta_landingtextattribute_language 
    VALUES
    (126,'1','Résumé de la commande'), 
    (126,'2','Order summary'),
    (127,'1','Utiliser les informations suivantes'),  
    (127,'2','Use the following informations'),  
    (128,'1','Utiliser une nouvelle adresse'),  
    (128,'2','Use a new address'),  
    (129,'1','Paiement'),  
    (129,'2','Payment'),  
    (130,'1','Informations'),  
    (130,'2','Informations'),  
    (131,'1','Résumé de la commande'),
    (131,'2','Order summary'),
    (132,'1','Mon panier'),
    (132,'2','My cart'),
    (133,'1','Prix'),
    (133,'2','Price'),
    (134,'1','Qté'),
    (134,'2','Qty'),
    (135,'1','Total'),
    (135,'2','Total'),
    (136,'1','Sous-total'),
    (136,'2','Sub-total'),
    (137,'1','Total'),
    (137,'2','Total'),
    (138,'1','Entrer mes informations'),
    (138,'2','Enter my informations'),
    (139,'1','Pays'),
    (139,'2','Country'),
    (140,'1','Province'),
    (140,'2','Province'),
    (141,'1','Rue'),
    (141,'2','Street'),
    (142,'1','No Civique'),
    (142,'2','Civic nb.'),
    (143,'1','Code postal'),
    (143,'2','Postal Code'),
    (144,'1','No app.'),
    (144,'2','App nb.'),
    (145,'1','Passer au paiement'),
    (145,'2','Checkout'),
    (146,'1','Soumettre le paiement'),
    (146,'2','Pay'),
    (147,'1','Tps'),
    (147,'2','Tps'),
    (148,'1','Tvq'),
    (148,'2','Tvq'),
    (149,'1','Veuillez renseigner ce champ'),
    (149,'2','Please fill this field'),
    (150,'1','Veuillez renseigner ce champ'),
    (150,'2','Please fill this field'),
    (151,'1','Veuillez renseigner ce champ'),
    (151,'2','Please fill this field'),
    (152,'1','Après rabais de '),
    (152,'2','After rebate of '),
    (153,'1','Supprimer'),
    (153,'2','Remove'),
    (154,'1','Crédit ou débit'),
    (154,'2','Credit or Debit'),
    (155,'1','Paiement effectué avec succès'),
    (155,'2','Payment successfully executed'),
    (156,'1','Quintessentiel | Paiement'),
    (156,'2','Quintessentiel | Payment');
