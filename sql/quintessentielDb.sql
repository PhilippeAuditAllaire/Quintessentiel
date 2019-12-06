
CREATE DATABASE Quintessentiel;
USE Quintessentiel;

-- Langage
CREATE TABLE Language(
	id SMALLINT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(3) NOT NULL
);

-- Tables en relations avec les Users
CREATE TABLE Civility(
	id SMALLINT AUTO_INCREMENT PRIMARY KEY
);

CREATE TABLE CivilityAttribute(
	id SMALLINT AUTO_INCREMENT PRIMARY KEY,
	type TEXT NOT NULL
);

CREATE TABLE TA_CivilityAttribute_Language(
	civilityAttributeId SMALLINT NOT NULL,
	FOREIGN KEY (civilityAttributeId) REFERENCES CivilityAttribute(id),
	idLanguage SMALLINT NOT NULL,
	FOREIGN KEY (idLanguage) REFERENCES Language(id),
	idCivility SMALLINT NOT NULL,
	FOREIGN KEY (idCivility) REFERENCES Civility(id),
	value TEXT,
	PRIMARY KEY(civilityAttributeId,idLanguage,idCivility)
);

CREATE TABLE Conditions(
	id SMALLINT AUTO_INCREMENT PRIMARY KEY
);

CREATE TABLE ConditionsAttribute(
	id SMALLINT AUTO_INCREMENT PRIMARY KEY,
	type TEXT NOT NULL
);

CREATE TABLE TA_ConditionsAttribute_Language(
	conditionAttributeId SMALLINT NOT NULL,
	FOREIGN KEY (conditionAttributeId) REFERENCES ConditionsAttribute(id),
	idLanguage SMALLINT NOT NULL,
	FOREIGN KEY (idLanguage) REFERENCES Language(id),
	idConditions SMALLINT NOT NULL,
	FOREIGN KEY (idConditions) REFERENCES Conditions(id),
	value TEXT,
	PRIMARY KEY(conditionAttributeId,idLanguage,idConditions)
);

CREATE TABLE Users(
	id INT AUTO_INCREMENT PRIMARY KEY,
	idCivility SMALLINT NOT NULL,
	FOREIGN KEY (idCivility) REFERENCES Civility(id),
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
	idProvince SMALLINT NOT NULL
);

CREATE TABLE Users_ResetCode(
	idUser INT NOT NULL,
	FOREIGN KEY (idUser) REFERENCES Users(id),
	resetCode VARCHAR(255) NOT NULL,
	codeDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY(idUser,resetCode)
);

CREATE TABLE TA_Users_Conditions(
	id INT AUTO_INCREMENT PRIMARY KEY,
	idUsers INT NOT NULL,
	FOREIGN KEY (idUsers) REFERENCES Users(id),
	conditionsId SMALLINT NOT NULL,
	FOREIGN KEY (conditionsId) REFERENCES Conditions(id)
);

-- Product
CREATE TABLE Product(
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

CREATE TABLE ProductAttribute(
	id SMALLINT AUTO_INCREMENT PRIMARY KEY,
	type VARCHAR(30) NOT NULL
);

CREATE TABLE TA_ProductAttribute_Language(
	productAttributeId SMALLINT NOT NULL,
	FOREIGN KEY (productAttributeId) REFERENCES ProductAttribute(id),
	idLanguage SMALLINT NOT NULL,
	FOREIGN KEY (idLanguage) REFERENCES Language(id),
	idProduct INT NOT NULL,
	FOREIGN KEY (idProduct) REFERENCES Product(id),
	value TEXT,
	PRIMARY KEY(productAttributeId,idLanguage,idProduct)
);


-- Blogs

CREATE TABLE BlogAttribute(
	id SMALLINT AUTO_INCREMENT PRIMARY KEY,
	type VARCHAR(20)
);

CREATE TABLE BlogArticle(
	id SMALLINT AUTO_INCREMENT PRIMARY KEY,
	imageStart VARCHAR(100),
	imageMiddle VARCHAR(100),
	imageEnd VARCHAR(100),
	postedDate DATE
);

CREATE TABLE BlogComment(
	id SMALLINT AUTO_INCREMENT PRIMARY KEY,
	idBlogArticle SMALLINT NOT NULL,
	FOREIGN KEY (idBlogArticle) REFERENCES BlogArticle(id),
	content VARCHAR(255),
	postedDate DATE
);

CREATE TABLE CommentStatus(
	id SMALLINT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(50) NOT NULL
);


CREATE TABLE BlogComment_CommentStatus(
	id SMALLINT AUTO_INCREMENT PRIMARY KEY,
	idBlogComment SMALLINT,
	FOREIGN KEY (idBlogComment) REFERENCES BlogComment(id),
	idCommentStatus SMALLINT,
	FOREIGN KEY (idCommentStatus) REFERENCES CommentStatus(id)
);


CREATE TABLE Ta_blogAttribute_Language(
	idBlogAttribute SMALLINT NOT NULL,
	FOREIGN KEY (idBlogAttribute) REFERENCES BlogAttribute(id),
	idLanguage SMALLINT NOT NULL,
	FOREIGN KEY (idLanguage) REFERENCES Language(id),
	value TEXT,
	PRIMARY KEY(idBlogAttribute,idLanguage)
);


-- Tables en liens avec Order
CREATE TABLE OrderStatus(
	id SMALLINT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(25),
	description VARCHAR(50)
);

CREATE TABLE Orders(
	id INT AUTO_INCREMENT PRIMARY KEY,
	idStatus SMALLINT,
	FOREIGN KEY (idStatus) REFERENCES OrderStatus(id),
	taxes FLOAT,
	orderDate DATE
);

CREATE TABLE TA_Order_Product(
	idProduct INT NOT NULL,
	FOREIGN KEY (idProduct) REFERENCES Product(id),
	idOrders INT NOT NULL,
	FOREIGN KEY (idOrders) REFERENCES Orders(id),
	quantity SMALLINT NOT NULL,
	PRIMARY KEY(idProduct,idOrders)
);


CREATE TABLE Shipping(
	id INT AUTO_INCREMENT PRIMARY KEY,
	idOrders INT NOT NULL,
	FOREIGN KEY (idOrders) REFERENCES Orders(id),
	deliveryAddress VARCHAR(50),
	parcelFee FLOAT,
	shippingDate Date NOT NULL
);



-- Tables en lien avec les recettes
CREATE TABLE Recipe(
	id SMALLINT AUTO_INCREMENT PRIMARY KEY,
	description TEXT,
	instruction TEXT,
	isCustom BIT NOT NULL,
	productName VARCHAR(40) NOT NULL
);

CREATE TABLE MeasureUnit(
	id SMALLINT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(20)
);

CREATE TABLE Ingredient(
	id SMALLINT AUTO_INCREMENT PRIMARY KEY,
	idProduct INT NOT NULL,
	FOREIGN KEY (idProduct) REFERENCES Product(id),
	IdMeasure SMALLINT NOT NULL,
	FOREIGN KEY (IdMeasure) REFERENCES MeasureUnit(id),
	quantity SMALLINT
);

CREATE TABLE TA_Ingredients_Recipe(
	id SMALLINT AUTO_INCREMENT PRIMARY KEY,
	idIngredient SMALLINT,
	FOREIGN KEY (idIngredient) REFERENCES Ingredient(id),
	idRecipe SMALLINT,
	FOREIGN KEY (idRecipe) REFERENCES Recipe(id)
);


-- Tables en lien avec les catégories

CREATE TABLE Category(
	id SMALLINT AUTO_INCREMENT PRIMARY KEY,
	isVisible BIT NOT NULL
);

CREATE TABLE TA_Category_Product(
	id SMALLINT AUTO_INCREMENT PRIMARY KEY,
	idCategory SMALLINT NOT NULL,
	FOREIGN KEY (idCategory) REFERENCES Category(id),
	idProduct INT NOT NULL,
	FOREIGN KEY (idProduct) REFERENCES Product(id)	
);

CREATE TABLE CategoryAttribute(
	id SMALLINT AUTO_INCREMENT PRIMARY KEY,
	type VARCHAR(30)
);

CREATE TABLE TA_CategoryAttribute_Language(
	idCategoryAttribute SMALLINT NOT NULL,
	FOREIGN KEY (idCategoryAttribute) REFERENCES CategoryAttribute(id),
	idLanguage SMALLINT NOT NULL,
	FOREIGN KEY (idLanguage) REFERENCES Language(id),
	idCategory SMALLINT NOT NULL,
	FOREIGN KEY (idCategory) REFERENCES Category(id),
	value VARCHAR(255),
	PRIMARY KEY(idCategoryAttribute,idLanguage,idCategory)
);


-- Tables comment


CREATE TABLE Comment(
	id SMALLINT AUTO_INCREMENT PRIMARY KEY,
	idProduct INT NOT NULL,
	FOREIGN KEY (idProduct) REFERENCES Product(id),
	idUser INT NOT NULL,
	FOREIGN KEY (idUser) REFERENCES Users(id),
	idStatus SMALLINT NOT NULL,
	FOREIGN KEY (idStatus) REFERENCES CommentStatus(id),
	title VARCHAR(50) NOT NULL,
	commentTxt VARCHAR(1000) NOT NULL,
	postedDate DATE NOT NULL,
	rating SMALLINT
);



-- Landing text tables

CREATE TABLE LandingText(
	id SMALLINT AUTO_INCREMENT PRIMARY KEY,
	title VARCHAR(30) NOT NULL,
	content VARCHAR(500) NOT NULL
);

CREATE TABLE LandingText_Attribute(
	id SMALLINT AUTO_INCREMENT PRIMARY KEY,
	type VARCHAR(255) NOT NULL,
	page VARCHAR(32) NOT NULL
);

CREATE TABLE TA_LandingTextAttribute_Language(
 	landingTextAttribute SMALLINT NOT NULL,
 	languageId SMALLINT NOT NULL,
 	value TEXT NOT NULL
);



-- Faq tables
CREATE TABLE FAQCategory(
	id SMALLINT AUTO_INCREMENT PRIMARY KEY
);

CREATE TABLE FAQCategoryAttribute(
	id SMALLINT AUTO_INCREMENT PRIMARY KEY,
	type TEXT NOT NULL
);

CREATE TABLE TA_FAQCategoryAttribute_Language(
	faqCategoryAttributeId SMALLINT NOT NULL,
	FOREIGN KEY (faqCategoryAttributeId) REFERENCES FAQCategoryAttribute(id),
	idLanguage SMALLINT NOT NULL,
	FOREIGN KEY (idLanguage) REFERENCES Language(id),
	idFaqCategory SMALLINT NOT NULL,
	FOREIGN KEY (idFaqCategory) REFERENCES FAQCategory(id),
	value TEXT,
	PRIMARY KEY(faqCategoryAttributeId,idLanguage,idFaqCategory)
);

CREATE TABLE FAQQuestion(
	id SMALLINT AUTO_INCREMENT PRIMARY KEY,
	isVisible BIT NOT NULL
);

CREATE TABLE FAQQuestionAttribute(
	id SMALLINT AUTO_INCREMENT PRIMARY KEY,
	type VARCHAR(30) NOT NULL
);

CREATE TABLE TA_FAQQuestionAttribute_Language(
	idQuestionAttribute SMALLINT NOT NULL,
	idLanguage SMALLINT NOT NULL,
	value TEXT,
	PRIMARY KEY(idQuestionAttribute,idLanguage)
);



CREATE TABLE Country(
	id SMALLINT AUTO_INCREMENT PRIMARY KEY
);

CREATE TABLE CountryAttribute(
	id SMALLINT AUTO_INCREMENT PRIMARY KEY,
	type TEXT NOT NULL
);

CREATE TABLE TA_CountryAttribute_Language(
	countryAttributeId SMALLINT NOT NULL,
	FOREIGN KEY (countryAttributeId) REFERENCES CountryAttribute(id),
	idLanguage SMALLINT NOT NULL,
	FOREIGN KEY (idLanguage) REFERENCES Language(id),
	idCountry SMALLINT NOT NULL,
	FOREIGN KEY (idCountry	) REFERENCES Country(id),
	value TEXT,
	PRIMARY KEY(countryAttributeId,idLanguage,idCountry)
);

CREATE TABLE Province(
	id SMALLINT AUTO_INCREMENT PRIMARY KEY,
	idCountry SMALLINT NOT NULL,
	FOREIGN KEY (idCountry) REFERENCES Country(id)
);

CREATE TABLE ProvinceAttribute(
	id SMALLINT AUTO_INCREMENT PRIMARY KEY,
	type TEXT NOT NULL
);

CREATE TABLE TA_ProvinceAttribute_Language(
	provinceAttributeId SMALLINT NOT NULL,
	FOREIGN KEY (provinceAttributeId) REFERENCES ProvinceAttribute(id),
	idLanguage SMALLINT NOT NULL,
	FOREIGN KEY (idLanguage) REFERENCES Language(id),
	idProvince SMALLINT NOT NULL,
	FOREIGN KEY (idProvince) REFERENCES Province(id),
	value TEXT,
	PRIMARY KEY(provinceAttributeId,idLanguage,idProvince)
);

CREATE TABLE promo(
	id_product SMALLINT NOT NULL,
	rabais SMALLINT NOT NULL,
	PRIMARY KEY(id_product)
);