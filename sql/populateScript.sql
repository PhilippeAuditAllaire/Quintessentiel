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

INSERT INTO Product VALUES (DEFAULT,10,10,2,'default.jpg',1,1,12,NULL);

INSERT INTO TA_productAttribute_langue (1,1,1,"Produit A");
INSERT INTO TA_productAttribute_langue (2,1,1,"Voici la description du produit");
INSERT INTO TA_productAttribute_langue (3,1,1,"Quelques conseilles concernants l'utilisation");


#Tags
INSERT INTO tag VALUES (DEFAULT);
INSERT INTO tag VALUES (DEFAULT);
INSERT INTO tag VALUES (DEFAULT);

INSERT INTO TagAttribute VALUES (DEFAULT,"title");
INSERT INTO TagAttribute VALUES (DEFAULT,"description");

INSERT INTO ta_tagAttribute_language VALUES (1,1,1,"peau sèche");
INSERT INTO ta_tagAttribute_language VALUES (1,1,2,"peau grasse");
INSERT INTO ta_tagAttribute_language VALUES (1,1,3,"peau test");
#Categories
INSERT INTO categoryAttribute VALUES (DEFAULT,"title");

INSERT INTO Category VALUES (DEFAULT,1);
INSERT INTO Category VALUES (DEFAULT,1);
INSERT INTO Category VALUES (DEFAULT,1);

INSERT INTO ta_categoryAttribute_Language VALUES (1,1,1,"Catégorie A");
INSERT INTO ta_categoryAttribute_Language VALUES (1,1,2,"Catégorie B");
INSERT INTO ta_categoryAttribute_Language VALUES (1,1,3,"Catégorie C");