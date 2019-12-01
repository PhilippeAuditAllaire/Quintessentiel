USE quintessentiel;


#Language table
INSERT INTO Language VALUES (DEFAULT,'fr');
INSERT INTO Language VALUES (DEFAULT,'en');


#Civility
INSERT INTO Civility VALUES (DEFAULT); #Id1
INSERT INTO Civility VALUES (DEFAULT); #Id2
INSERT INTO Civility VALUES (DEFAULT); #Id3


INSERT INTO CivilityAttribute VALUES (DEFAULT,"civilityName");

INSERT INTO ta_civilityAttribute_language VALUES (1,1,1,"Homme");
INSERT INTO ta_civilityAttribute_language VALUES (1,2,1,"Male");

INSERT INTO ta_civilityAttribute_language VALUES (1,1,2,"Femme");
INSERT INTO ta_civilityAttribute_language VALUES (1,2,2,"Female");




#Products
INSERT INTO ProductAttribute VALUES(DEFAULT,"title");
INSERT INTO ProductAttribute VALUES(DEFAULT,"description");
INSERT INTO ProductAttribute VALUES(DEFAULT,"advice");


#Categories
INSERT INTO categoryAttribute VALUES (DEFAULT,"title");

INSERT INTO Category VALUES (DEFAULT,1);
INSERT INTO Category VALUES (DEFAULT,1);
INSERT INTO Category VALUES (DEFAULT,1);

INSERT INTO ta_categoryAttribute_Language VALUES (1,1,1,"Catégorie A");
INSERT INTO ta_categoryAttribute_Language VALUES (1,1,2,"Catégorie B");
INSERT INTO ta_categoryAttribute_Language VALUES (1,1,3,"Catégorie C");

#Country
INSERT INTO CountryAttribute VALUES(DEFAULT,"name");

INSERT INTO Country VALUES (DEFAULT);	#Canada
INSERT INTO Country VALUES (DEFAULT);	#United States



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
INSERT INTO Users VALUES (DEFAULT,1,"Admin","Admin","admin@admin.com","2019-01-01","$2b$10$jagLRkMveQSjVye8cY77M.9CS7rl4Y8uD2Q9sn9qVKbDXNZ5ma5oa",1,1,"admin",0,"J1R0B1",404,1,1);



#bd

/* NAVBAR */
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
    (54, 'proposcontact', 'navbar');


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
    ('54', '2', 'Contactez-nous ANGLAIS');

    /* FIN NAVBAR */

    /* INDEX */
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
    /*  FIN INDEX */