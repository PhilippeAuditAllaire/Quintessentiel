
CREATE DATABASE Quintessentiel;
USE Quintessentiel;

-- Langage
CREATE TABLE language(
	id SMALLINT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(3) NOT NULL
);

-- Tables en relations avec les Users
CREATE TABLE civility(
	id SMALLINT AUTO_INCREMENT PRIMARY KEY
);

CREATE TABLE civilityattribute(
	id SMALLINT AUTO_INCREMENT PRIMARY KEY,
	type TEXT NOT NULL
);

CREATE TABLE ta_civilityattribute_language(
	civilityAttributeId SMALLINT NOT NULL,
	FOREIGN KEY (civilityAttributeId) REFERENCES civilityattribute(id),
	idLanguage SMALLINT NOT NULL,
	FOREIGN KEY (idLanguage) REFERENCES language(id),
	idCivility SMALLINT NOT NULL,
	FOREIGN KEY (idCivility) REFERENCES civility(id),
	value TEXT,
	PRIMARY KEY(civilityAttributeId,idLanguage,idCivility)
);

CREATE TABLE conditions(
	id SMALLINT AUTO_INCREMENT PRIMARY KEY
);

CREATE TABLE conditionsattribute(
	id SMALLINT AUTO_INCREMENT PRIMARY KEY,
	type TEXT NOT NULL
);

CREATE TABLE ta_conditionsattribute_language(
	conditionAttributeId SMALLINT NOT NULL,
	FOREIGN KEY (conditionAttributeId) REFERENCES conditionsattribute(id),
	idLanguage SMALLINT NOT NULL,
	FOREIGN KEY (idLanguage) REFERENCES language(id),
	idConditions SMALLINT NOT NULL,
	FOREIGN KEY (idConditions) REFERENCES conditions(id),
	value TEXT,
	PRIMARY KEY(conditionAttributeId,idLanguage,idConditions)
);

CREATE TABLE users(
	id INT AUTO_INCREMENT PRIMARY KEY,
	idCivility SMALLINT NOT NULL,
	FOREIGN KEY (idCivility) REFERENCES civility(id),
	firstName VARCHAR(20) NOT NULL,
	lastName VARCHAR(20) NOT NULL,
	email VARCHAR(40) NOT NULL,
	birthDate DATE NOT NULL,
	password VARCHAR(255) NOT NULL,
	newsletter BIT NOT NULL,
	isAdmin BIT NOT NULL DEFAULT 0,
	street VARCHAR(100) NOT NULL,
	noApp VARCHAR(20) DEFAULT "N/A",
	postalCode VARCHAR(20) NOT NULL,
	noCivic VARCHAR(20) NOT NULL,
	idCountry SMALLINT NOT NULL,
	idProvince SMALLINT NOT NULL,
	isReseller BIT DEFAULT 0
);

CREATE TABLE users_resetcode(
	idUser INT NOT NULL,
	FOREIGN KEY (idUser) REFERENCES users(id),
	resetCode VARCHAR(255) NOT NULL,
	codeDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY(idUser,resetCode)
);

CREATE TABLE ta_users_conditions(
	id INT AUTO_INCREMENT PRIMARY KEY,
	idUsers INT NOT NULL,
	FOREIGN KEY (idUsers) REFERENCES users(id),
	conditionsId SMALLINT NOT NULL,
	FOREIGN KEY (conditionsId) REFERENCES conditions(id)
);

-- Product
CREATE TABLE product(
	id INT AUTO_INCREMENT PRIMARY KEY,
	retailPrice FLOAT NOT NULL,
	costPrice FLOAT NOT NULL,
	quantity SMALLINT NOT NULL,
	image VARCHAR(100) NOT NULL,
	featured BIT NOT NULL,
	isVisible BIT NOT NULL,
	dropWeightGram FLOAT NOT NULL,
	amazonAffiliateLink VARCHAR(500),
	format VARCHAR(10)
);

CREATE TABLE productattribute(
	id SMALLINT AUTO_INCREMENT PRIMARY KEY,
	type VARCHAR(30) NOT NULL
);

CREATE TABLE ta_productattribute_language(
	productAttributeId SMALLINT NOT NULL,
	FOREIGN KEY (productAttributeId) REFERENCES productattribute(id),
	idLanguage SMALLINT NOT NULL,
	FOREIGN KEY (idLanguage) REFERENCES language(id),
	idProduct INT NOT NULL,
	FOREIGN KEY (idProduct) REFERENCES product(id),
	value TEXT,
	PRIMARY KEY(productAttributeId,idLanguage,idProduct)
);


-- Blogs

CREATE TABLE blogattribute(
	id SMALLINT AUTO_INCREMENT PRIMARY KEY,
	type VARCHAR(20)
);

CREATE TABLE blogarticle(
	id SMALLINT AUTO_INCREMENT PRIMARY KEY,
	imageStart VARCHAR(100),
	imageMiddle VARCHAR(100),
	imageEnd VARCHAR(100),
	postedDate DATE
);

CREATE TABLE blogcomment(
	id SMALLINT AUTO_INCREMENT PRIMARY KEY,
	idBlogArticle SMALLINT NOT NULL,
	FOREIGN KEY (idBlogArticle) REFERENCES blogarticle(id),
	content VARCHAR(255),
	postedDate DATE
);

CREATE TABLE commentstatus(
	id SMALLINT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(50) NOT NULL
);


CREATE TABLE blogcomment_commentstatus(
	id SMALLINT AUTO_INCREMENT PRIMARY KEY,
	idBlogComment SMALLINT,
	FOREIGN KEY (idBlogComment) REFERENCES blogcomment(id),
	idCommentStatus SMALLINT,
	FOREIGN KEY (idCommentStatus) REFERENCES commentstatus(id)
);


CREATE TABLE ta_blogattribute_language(
	idBlogAttribute SMALLINT NOT NULL,
	FOREIGN KEY (idBlogAttribute) REFERENCES blogattribute(id),
	idLanguage SMALLINT NOT NULL,
	FOREIGN KEY (idLanguage) REFERENCES language(id),
	value TEXT,
	PRIMARY KEY(idBlogAttribute,idLanguage)
);


-- Tables en liens avec Order
CREATE TABLE orderstatus(
	id SMALLINT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(25),
	description VARCHAR(50)
);

CREATE TABLE orders(
	id INT AUTO_INCREMENT PRIMARY KEY,
	idStatus SMALLINT,
	FOREIGN KEY (idStatus) REFERENCES orderstatus(id),
	taxes FLOAT,
	orderDate DATE
);

CREATE TABLE ta_order_product(
	idProduct INT NOT NULL,
	FOREIGN KEY (idProduct) REFERENCES product(id),
	idOrders INT NOT NULL,
	FOREIGN KEY (idOrders) REFERENCES orders(id),
	quantity SMALLINT NOT NULL,
	PRIMARY KEY(idProduct,idOrders)
);


CREATE TABLE shipping(
	id INT AUTO_INCREMENT PRIMARY KEY,
	idOrders INT NOT NULL,
	FOREIGN KEY (idOrders) REFERENCES orders(id),
	deliveryAddress VARCHAR(50),
	parcelFee FLOAT,
	shippingDate Date NOT NULL
);



-- Tables en lien avec les recettes
CREATE TABLE recipe(
	id SMALLINT AUTO_INCREMENT PRIMARY KEY,
	description TEXT,
	instruction TEXT,
	isCustom BIT NOT NULL,
	productName VARCHAR(40) NOT NULL
);

CREATE TABLE measureunit(
	id SMALLINT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(20)
);

CREATE TABLE ingredient(
	id SMALLINT AUTO_INCREMENT PRIMARY KEY,
	idProduct INT NOT NULL,
	FOREIGN KEY (idProduct) REFERENCES product(id),
	IdMeasure SMALLINT NOT NULL,
	FOREIGN KEY (IdMeasure) REFERENCES measureunit(id),
	quantity SMALLINT
);

CREATE TABLE ta_ingredients_recipe(
	id SMALLINT AUTO_INCREMENT PRIMARY KEY,
	idIngredient SMALLINT,
	FOREIGN KEY (idIngredient) REFERENCES ingredient(id),
	idRecipe SMALLINT,
	FOREIGN KEY (idRecipe) REFERENCES recipe(id)
);


-- Tables en lien avec les catégories

CREATE TABLE category(
	id SMALLINT AUTO_INCREMENT PRIMARY KEY,
	isVisible BIT NOT NULL
);

CREATE TABLE ta_category_product(
	id SMALLINT AUTO_INCREMENT PRIMARY KEY,
	idCategory SMALLINT NOT NULL,
	FOREIGN KEY (idCategory) REFERENCES category(id),
	idProduct INT NOT NULL,
	FOREIGN KEY (idProduct) REFERENCES product(id)	
);

CREATE TABLE categoryattribute(
	id SMALLINT AUTO_INCREMENT PRIMARY KEY,
	type VARCHAR(30)
);

CREATE TABLE ta_categoryattribute_language(
	idCategoryAttribute SMALLINT NOT NULL,
	FOREIGN KEY (idCategoryAttribute) REFERENCES categoryattribute(id),
	idLanguage SMALLINT NOT NULL,
	FOREIGN KEY (idLanguage) REFERENCES language(id),
	idCategory SMALLINT NOT NULL,
	FOREIGN KEY (idCategory) REFERENCES category(id),
	value VARCHAR(255),
	PRIMARY KEY(idCategoryAttribute,idLanguage,idCategory)
);


-- Tables comment


CREATE TABLE comment(
	id SMALLINT AUTO_INCREMENT PRIMARY KEY,
	idProduct INT NOT NULL,
	FOREIGN KEY (idProduct) REFERENCES product(id),
	idUser INT NOT NULL,
	FOREIGN KEY (idUser) REFERENCES users(id),
	idStatus SMALLINT NOT NULL,
	FOREIGN KEY (idStatus) REFERENCES commentstatus(id),
	title VARCHAR(50) NOT NULL,
	commentTxt VARCHAR(1000) NOT NULL,
	postedDate DATE NOT NULL,
	rating SMALLINT
);



-- Landing text tables

CREATE TABLE landingtext(
	id SMALLINT AUTO_INCREMENT PRIMARY KEY,
	title VARCHAR(30) NOT NULL,
	content VARCHAR(500) NOT NULL
);

CREATE TABLE landingtext_attribute(
	id SMALLINT AUTO_INCREMENT PRIMARY KEY,
	type VARCHAR(255) NOT NULL,
	page VARCHAR(32) NOT NULL
);

CREATE TABLE ta_landingtextattribute_language(
 	landingTextAttribute SMALLINT NOT NULL,
 	languageId SMALLINT NOT NULL,
 	value TEXT NOT NULL
);



-- Faq tables
CREATE TABLE faqcategory(
	id SMALLINT AUTO_INCREMENT PRIMARY KEY
);

CREATE TABLE faqcategoryattribute(
	id SMALLINT AUTO_INCREMENT PRIMARY KEY,
	type TEXT NOT NULL
);

CREATE TABLE ta_faqcategoryattribute_language(
	faqCategoryAttributeId SMALLINT NOT NULL,
	FOREIGN KEY (faqCategoryAttributeId) REFERENCES faqcategoryattribute(id),
	idLanguage SMALLINT NOT NULL,
	FOREIGN KEY (idLanguage) REFERENCES language(id),
	idFaqCategory SMALLINT NOT NULL,
	FOREIGN KEY (idFaqCategory) REFERENCES faqcategory(id),
	value TEXT,
	PRIMARY KEY(faqCategoryAttributeId,idLanguage,idFaqCategory)
);

CREATE TABLE faqquestion(
	id SMALLINT AUTO_INCREMENT PRIMARY KEY,
	isVisible BIT NOT NULL
);

CREATE TABLE faqquestionattribute(
	id SMALLINT AUTO_INCREMENT PRIMARY KEY,
	type VARCHAR(30) NOT NULL
);

CREATE TABLE ta_faqquestionattribute_language(
	idQuestionAttribute SMALLINT NOT NULL,
	idLanguage SMALLINT NOT NULL,
	value TEXT,
	PRIMARY KEY(idQuestionAttribute,idLanguage)
);



CREATE TABLE country(
	id SMALLINT AUTO_INCREMENT PRIMARY KEY
);

CREATE TABLE countryattribute(
	id SMALLINT AUTO_INCREMENT PRIMARY KEY,
	type TEXT NOT NULL
);

CREATE TABLE ta_countryattribute_language(
	countryAttributeId SMALLINT NOT NULL,
	FOREIGN KEY (countryAttributeId) REFERENCES countryattribute(id),
	idLanguage SMALLINT NOT NULL,
	FOREIGN KEY (idLanguage) REFERENCES language(id),
	idCountry SMALLINT NOT NULL,
	FOREIGN KEY (idCountry) REFERENCES country(id),
	value TEXT,
	PRIMARY KEY(countryAttributeId,idLanguage,idCountry)
);

CREATE TABLE province(
	id SMALLINT AUTO_INCREMENT PRIMARY KEY,
	idCountry SMALLINT NOT NULL,
	FOREIGN KEY (idCountry) REFERENCES country(id)
);

CREATE TABLE provinceattribute(
	id SMALLINT AUTO_INCREMENT PRIMARY KEY,
	type TEXT NOT NULL
);

CREATE TABLE ta_provinceattribute_language(
	provinceAttributeId SMALLINT NOT NULL,
	FOREIGN KEY (provinceAttributeId) REFERENCES provinceattribute(id),
	idLanguage SMALLINT NOT NULL,
	FOREIGN KEY (idLanguage) REFERENCES language(id),
	idProvince SMALLINT NOT NULL,
	FOREIGN KEY (idProvince) REFERENCES province(id),
	value TEXT,
	PRIMARY KEY(provinceAttributeId,idLanguage,idProvince)
);

CREATE TABLE promo(
	id_product SMALLINT NOT NULL,
	rabais SMALLINT NOT NULL,
	PRIMARY KEY(id_product)
);

CREATE TABLE ta_reseller_products (
  id int(11) NOT NULL AUTO_INCREMENT,
  idUser int(11) NOT NULL,
  productId int(11) NOT NULL,
  rebate double DEFAULT NULL,
  PRIMARY KEY (id),
  KEY idUser (idUser),
  KEY productId (productId)
) 