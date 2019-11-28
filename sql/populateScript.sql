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