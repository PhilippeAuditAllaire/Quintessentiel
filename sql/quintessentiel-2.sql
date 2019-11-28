-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Nov 02, 2019 at 07:12 PM
-- Server version: 5.7.24
-- PHP Version: 7.2.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `quintessentiel`
--

-- --------------------------------------------------------

--
-- Table structure for table `blogarticle`
--

DROP TABLE IF EXISTS `blogarticle`;
CREATE TABLE IF NOT EXISTS `blogarticle` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `imageStart` varchar(100) DEFAULT NULL,
  `imageMiddle` varchar(100) DEFAULT NULL,
  `imageEnd` varchar(100) DEFAULT NULL,
  `postedDate` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `blogattribute`
--

DROP TABLE IF EXISTS `blogattribute`;
CREATE TABLE IF NOT EXISTS `blogattribute` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `type` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `blogcomment`
--

DROP TABLE IF EXISTS `blogcomment`;
CREATE TABLE IF NOT EXISTS `blogcomment` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `idBlogArticle` smallint(6) NOT NULL,
  `content` varchar(255) DEFAULT NULL,
  `postedDate` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idBlogArticle` (`idBlogArticle`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `blogcomment_commentstatus`
--

DROP TABLE IF EXISTS `blogcomment_commentstatus`;
CREATE TABLE IF NOT EXISTS `blogcomment_commentstatus` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `idBlogComment` smallint(6) DEFAULT NULL,
  `idCommentStatus` smallint(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idBlogComment` (`idBlogComment`),
  KEY `idCommentStatus` (`idCommentStatus`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `isVisible` bit(1) NOT NULL,
  `title` varchar(30) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `categoryattribute`
--

DROP TABLE IF EXISTS `categoryattribute`;
CREATE TABLE IF NOT EXISTS `categoryattribute` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `type` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `civility`
--

DROP TABLE IF EXISTS `civility`;
CREATE TABLE IF NOT EXISTS `civility` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `civility`
--

INSERT INTO `civility` (`id`) VALUES
(1),
(2),
(3);

-- --------------------------------------------------------

--
-- Table structure for table `civilityattribute`
--

DROP TABLE IF EXISTS `civilityattribute`;
CREATE TABLE IF NOT EXISTS `civilityattribute` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `type` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `civilityattribute`
--

INSERT INTO `civilityattribute` (`id`, `type`) VALUES
(1, 'civilityName');

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
CREATE TABLE IF NOT EXISTS `comment` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `idProduct` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `idStatus` smallint(6) NOT NULL,
  `title` varchar(50) NOT NULL,
  `commentTxt` varchar(1000) NOT NULL,
  `postedDate` date NOT NULL,
  `rating` smallint(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idProduct` (`idProduct`),
  KEY `idUser` (`idUser`),
  KEY `idStatus` (`idStatus`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `commentstatus`
--

DROP TABLE IF EXISTS `commentstatus`;
CREATE TABLE IF NOT EXISTS `commentstatus` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `conditions`
--

DROP TABLE IF EXISTS `conditions`;
CREATE TABLE IF NOT EXISTS `conditions` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `conditionsattribute`
--

DROP TABLE IF EXISTS `conditionsattribute`;
CREATE TABLE IF NOT EXISTS `conditionsattribute` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `type` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `country`
--

DROP TABLE IF EXISTS `country`;
CREATE TABLE IF NOT EXISTS `country` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `countryattribute`
--

DROP TABLE IF EXISTS `countryattribute`;
CREATE TABLE IF NOT EXISTS `countryattribute` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `type` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `faqcategory`
--

DROP TABLE IF EXISTS `faqcategory`;
CREATE TABLE IF NOT EXISTS `faqcategory` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `faqcategoryattribute`
--

DROP TABLE IF EXISTS `faqcategoryattribute`;
CREATE TABLE IF NOT EXISTS `faqcategoryattribute` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `type` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `faqquestion`
--

DROP TABLE IF EXISTS `faqquestion`;
CREATE TABLE IF NOT EXISTS `faqquestion` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `isVisible` bit(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `faqquestionattribute`
--

DROP TABLE IF EXISTS `faqquestionattribute`;
CREATE TABLE IF NOT EXISTS `faqquestionattribute` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `type` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `ingredient`
--

DROP TABLE IF EXISTS `ingredient`;
CREATE TABLE IF NOT EXISTS `ingredient` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `idProduct` int(11) NOT NULL,
  `IdMeasure` smallint(6) NOT NULL,
  `quantity` smallint(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idProduct` (`idProduct`),
  KEY `IdMeasure` (`IdMeasure`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `landingtext`
--

DROP TABLE IF EXISTS `landingtext`;
CREATE TABLE IF NOT EXISTS `landingtext` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `title` varchar(30) NOT NULL,
  `content` varchar(500) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `landingtext_attribute`
--

DROP TABLE IF EXISTS `landingtext_attribute`;
CREATE TABLE IF NOT EXISTS `landingtext_attribute` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `language`
--

DROP TABLE IF EXISTS `language`;
CREATE TABLE IF NOT EXISTS `language` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `name` varchar(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `language`
--

INSERT INTO `language` (`id`, `name`) VALUES
(1, 'fr'),
(2, 'en');

-- --------------------------------------------------------

--
-- Table structure for table `measureunit`
--

DROP TABLE IF EXISTS `measureunit`;
CREATE TABLE IF NOT EXISTS `measureunit` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idStatus` smallint(6) DEFAULT NULL,
  `taxes` float DEFAULT NULL,
  `orderDate` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idStatus` (`idStatus`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `orderstatus`
--

DROP TABLE IF EXISTS `orderstatus`;
CREATE TABLE IF NOT EXISTS `orderstatus` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `name` varchar(25) DEFAULT NULL,
  `description` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
CREATE TABLE IF NOT EXISTS `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `retailPrice` float NOT NULL,
  `costPrice` float NOT NULL,
  `quantity` smallint(6) NOT NULL,
  `image` varchar(100) NOT NULL,
  `featured` bit(1) NOT NULL,
  `isVisible` bit(1) NOT NULL,
  `dropWeightGram` float NOT NULL,
  `amazonAffiliateLink` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=63 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `retailPrice`, `costPrice`, `quantity`, `image`, `featured`, `isVisible`, `dropWeightGram`, `amazonAffiliateLink`) VALUES
(1, 10, 2, 2, 'default.jpg', b'1', b'1', 2, NULL),
(2, 0, 28.8, 1, '', b'0', b'0', 0, NULL),
(3, 0, 90, 1, '', b'0', b'0', 0, NULL),
(4, 0, 49.5, 1, '', b'0', b'0', 0, NULL),
(5, 0, 150, 1, '', b'0', b'0', 0, NULL),
(6, 0, 98.1, 1, '', b'0', b'0', 0, NULL),
(7, 0, 67.5, 1, '', b'0', b'0', 0, NULL),
(8, 0, 50, 1, '', b'0', b'0', 0, NULL),
(9, 0, 114.3, 1, '', b'0', b'0', 0, NULL),
(10, 0, 29.7, 1, '', b'0', b'0', 0, NULL),
(11, 0, 28.8, 1, '', b'0', b'0', 0, NULL),
(12, 0, 36.9, 1, '', b'0', b'0', 0, NULL),
(13, 0, 719, 1, '', b'0', b'0', 0, NULL),
(14, 0, 117, 1, '', b'0', b'0', 0, NULL),
(15, 0, 80.1, 1, '', b'0', b'0', 0, NULL),
(16, 0, 45, 1, '', b'0', b'0', 0, NULL),
(17, 0, 43.2, 1, '', b'0', b'0', 0, NULL),
(18, 0, 50, 1, '', b'0', b'0', 0, NULL),
(19, 0, 49.5, 1, '', b'0', b'0', 0, NULL),
(20, 0, 17.1, 1, '', b'0', b'0', 0, NULL),
(21, 0, 45, 1, '', b'0', b'0', 0, NULL),
(22, 0, 13.5, 1, '', b'0', b'0', 0, NULL),
(23, 0, 11.7, 1, '', b'0', b'0', 0, NULL),
(24, 0, 188.1, 1, '', b'0', b'0', 0, NULL),
(25, 0, 27, 1, '', b'0', b'0', 0, NULL),
(26, 0, 0, 32, '', b'0', b'0', 0, NULL),
(27, 0, 13.8, 32, '', b'0', b'0', 0, NULL),
(28, 0, 56.4, 32, '', b'0', b'0', 0, NULL),
(29, 0, 97, 32, '', b'0', b'0', 0, NULL),
(30, 0, 210, 32, '', b'0', b'0', 0, NULL),
(31, 0, 45.6, 100, '', b'0', b'0', 0, NULL),
(32, 0, 96, 100, '', b'0', b'0', 0, NULL),
(33, 0, 33, 32, '', b'0', b'0', 0, NULL),
(34, 0, 13.2, 32, '', b'0', b'0', 0, NULL),
(35, 0, 23.4, 32, '', b'0', b'0', 0, NULL),
(36, 0, 21.6, 32, '', b'0', b'0', 0, NULL),
(37, 0, 14.4, 32, '', b'0', b'0', 0, NULL),
(38, 0, 22.4, 32, '', b'0', b'0', 0, NULL),
(39, 0, 0, 32, '', b'0', b'0', 0, NULL),
(40, 0, 22.8, 32, '', b'0', b'0', 0, NULL),
(41, 0, 28.2, 32, '', b'0', b'0', 0, NULL),
(42, 0, 27.38, 1, '', b'0', b'0', 0, NULL),
(43, 0, 19.2, 1, '', b'0', b'0', 0, NULL),
(44, 0, 31, 1, '', b'0', b'0', 0, NULL),
(45, 0, 19.2, 1, '', b'0', b'0', 0, NULL),
(46, 0, 23.2, 1, '', b'0', b'0', 0, NULL),
(47, 0, 30, 1, '', b'0', b'0', 0, NULL),
(48, 0, 12, 1, '', b'0', b'0', 0, NULL),
(49, 0, 14, 450, '', b'0', b'0', 0, NULL),
(50, 0, 27, 100, '', b'0', b'0', 0, NULL),
(51, 0, 16.2, 1, '', b'0', b'0', 0, NULL),
(52, 0, 15, 1, '', b'0', b'0', 0, NULL),
(53, 0, 15, 1, '', b'0', b'0', 0, NULL),
(54, 0, 25, 1, '', b'0', b'0', 0, NULL),
(55, 0, 0, 0, '', b'0', b'0', 0, NULL),
(56, 0, 27, 1, '', b'0', b'0', 0, NULL),
(57, 0, 12, 1, '', b'0', b'0', 0, NULL),
(58, 0, 0, 0, '', b'0', b'0', 0, NULL),
(59, 0, 0, 0, '', b'0', b'0', 0, NULL),
(60, 0, 0, 0, '', b'0', b'0', 0, NULL),
(61, 0, 0, 0, '', b'0', b'0', 0, NULL),
(62, 0, 0, 0, '', b'0', b'0', 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `productattribute`
--

DROP TABLE IF EXISTS `productattribute`;
CREATE TABLE IF NOT EXISTS `productattribute` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `type` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `productattribute`
--

INSERT INTO `productattribute` (`id`, `type`) VALUES
(1, 'title'),
(2, 'description'),
(3, 'provider');

-- --------------------------------------------------------

--
-- Table structure for table `province`
--

DROP TABLE IF EXISTS `province`;
CREATE TABLE IF NOT EXISTS `province` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `provinceattribute`
--

DROP TABLE IF EXISTS `provinceattribute`;
CREATE TABLE IF NOT EXISTS `provinceattribute` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `type` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `provinceattribute`
--

INSERT INTO `provinceattribute` (`id`, `type`) VALUES
(1, 'title'),
(2, 'description');

-- --------------------------------------------------------

--
-- Table structure for table `recipe`
--

DROP TABLE IF EXISTS `recipe`;
CREATE TABLE IF NOT EXISTS `recipe` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `description` text,
  `instruction` text,
  `isCustom` bit(1) NOT NULL,
  `productName` varchar(40) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `shipping`
--

DROP TABLE IF EXISTS `shipping`;
CREATE TABLE IF NOT EXISTS `shipping` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idOrders` int(11) NOT NULL,
  `deliveryAddress` varchar(50) DEFAULT NULL,
  `parcelFee` float DEFAULT NULL,
  `shippingDate` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idOrders` (`idOrders`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tag`
--

DROP TABLE IF EXISTS `tag`;
CREATE TABLE IF NOT EXISTS `tag` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `title` varchar(30) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tagattribute`
--

DROP TABLE IF EXISTS `tagattribute`;
CREATE TABLE IF NOT EXISTS `tagattribute` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `type` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `ta_blogattribute_language`
--

DROP TABLE IF EXISTS `ta_blogattribute_language`;
CREATE TABLE IF NOT EXISTS `ta_blogattribute_language` (
  `idBlogAttribute` smallint(6) NOT NULL,
  `idLanguage` smallint(6) NOT NULL,
  `value` text,
  PRIMARY KEY (`idBlogAttribute`,`idLanguage`),
  KEY `idLanguage` (`idLanguage`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `ta_categoryattribute_language`
--

DROP TABLE IF EXISTS `ta_categoryattribute_language`;
CREATE TABLE IF NOT EXISTS `ta_categoryattribute_language` (
  `idCategoryAttribute` smallint(6) NOT NULL,
  `idLanguage` smallint(6) NOT NULL,
  `idCategory` smallint(6) NOT NULL,
  `value` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idCategoryAttribute`,`idLanguage`,`idCategory`),
  KEY `idLanguage` (`idLanguage`),
  KEY `idCategory` (`idCategory`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `ta_category_product`
--

DROP TABLE IF EXISTS `ta_category_product`;
CREATE TABLE IF NOT EXISTS `ta_category_product` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `idCategory` smallint(6) NOT NULL,
  `idProduct` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idCategory` (`idCategory`),
  KEY `idProduct` (`idProduct`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `ta_civilityattribute_language`
--

DROP TABLE IF EXISTS `ta_civilityattribute_language`;
CREATE TABLE IF NOT EXISTS `ta_civilityattribute_language` (
  `civilityAttributeId` smallint(6) NOT NULL,
  `idLanguage` smallint(6) NOT NULL,
  `idCivility` smallint(6) NOT NULL,
  `value` text,
  PRIMARY KEY (`civilityAttributeId`,`idLanguage`,`idCivility`),
  KEY `idLanguage` (`idLanguage`),
  KEY `idCivility` (`idCivility`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ta_civilityattribute_language`
--

INSERT INTO `ta_civilityattribute_language` (`civilityAttributeId`, `idLanguage`, `idCivility`, `value`) VALUES
(1, 1, 1, 'Homme'),
(1, 2, 1, 'Male'),
(1, 1, 2, 'Femme'),
(1, 2, 2, 'Female');

-- --------------------------------------------------------

--
-- Table structure for table `ta_conditionsattribute_language`
--

DROP TABLE IF EXISTS `ta_conditionsattribute_language`;
CREATE TABLE IF NOT EXISTS `ta_conditionsattribute_language` (
  `conditionAttributeId` smallint(6) NOT NULL,
  `idLanguage` smallint(6) NOT NULL,
  `idConditions` smallint(6) NOT NULL,
  `value` text,
  PRIMARY KEY (`conditionAttributeId`,`idLanguage`,`idConditions`),
  KEY `idLanguage` (`idLanguage`),
  KEY `idConditions` (`idConditions`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `ta_countryattribute_language`
--

DROP TABLE IF EXISTS `ta_countryattribute_language`;
CREATE TABLE IF NOT EXISTS `ta_countryattribute_language` (
  `countryAttributeId` smallint(6) NOT NULL,
  `idLanguage` smallint(6) NOT NULL,
  `idCountry` smallint(6) NOT NULL,
  `value` text,
  PRIMARY KEY (`countryAttributeId`,`idLanguage`,`idCountry`),
  KEY `idLanguage` (`idLanguage`),
  KEY `idCountry` (`idCountry`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `ta_faqcategoryattribute_language`
--

DROP TABLE IF EXISTS `ta_faqcategoryattribute_language`;
CREATE TABLE IF NOT EXISTS `ta_faqcategoryattribute_language` (
  `faqCategoryAttributeId` smallint(6) NOT NULL,
  `idLanguage` smallint(6) NOT NULL,
  `idFaqCategory` smallint(6) NOT NULL,
  `value` text,
  PRIMARY KEY (`faqCategoryAttributeId`,`idLanguage`,`idFaqCategory`),
  KEY `idLanguage` (`idLanguage`),
  KEY `idFaqCategory` (`idFaqCategory`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `ta_faqquestionattribute_language`
--

DROP TABLE IF EXISTS `ta_faqquestionattribute_language`;
CREATE TABLE IF NOT EXISTS `ta_faqquestionattribute_language` (
  `idQuestionAttribute` smallint(6) NOT NULL,
  `idLanguage` smallint(6) NOT NULL,
  `value` text,
  PRIMARY KEY (`idQuestionAttribute`,`idLanguage`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `ta_ingredients_recipe`
--

DROP TABLE IF EXISTS `ta_ingredients_recipe`;
CREATE TABLE IF NOT EXISTS `ta_ingredients_recipe` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `idIngredient` smallint(6) DEFAULT NULL,
  `idRecipe` smallint(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idIngredient` (`idIngredient`),
  KEY `idRecipe` (`idRecipe`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `ta_landingtextattribute_language`
--

DROP TABLE IF EXISTS `ta_landingtextattribute_language`;
CREATE TABLE IF NOT EXISTS `ta_landingtextattribute_language` (
  `landingTextAttribute` smallint(6) NOT NULL,
  `languageId` smallint(6) NOT NULL,
  `value` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `ta_order_product`
--

DROP TABLE IF EXISTS `ta_order_product`;
CREATE TABLE IF NOT EXISTS `ta_order_product` (
  `idProduct` int(11) NOT NULL,
  `idOrders` int(11) NOT NULL,
  `quantity` smallint(6) NOT NULL,
  PRIMARY KEY (`idProduct`,`idOrders`),
  KEY `idOrders` (`idOrders`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `ta_productattribute_language`
--

DROP TABLE IF EXISTS `ta_productattribute_language`;
CREATE TABLE IF NOT EXISTS `ta_productattribute_language` (
  `productAttributeId` smallint(6) NOT NULL,
  `idLanguage` smallint(6) NOT NULL,
  `idProduct` int(11) NOT NULL,
  `value` text,
  PRIMARY KEY (`productAttributeId`,`idLanguage`,`idProduct`),
  KEY `idLanguage` (`idLanguage`),
  KEY `idProduct` (`idProduct`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ta_productattribute_language`
--

INSERT INTO `ta_productattribute_language` (`productAttributeId`, `idLanguage`, `idProduct`, `value`) VALUES
(1, 1, 1, 'CECI EST LE FUCKING TITRE'),
(2, 1, 1, 'LOREM IPSUE FZSKLHDG KGHZLKJHGSLKDHGROWIHGKHDGFKLHGKJBHKXB\r\n\r\nDESCIRPTION SJDS'),
(1, 1, 2, 'HV-Abricot'),
(3, 1, 2, 'Zayat Aroma'),
(1, 1, 3, 'HV-Argan'),
(3, 1, 3, 'Zayat Aroma'),
(1, 1, 4, 'HV-Avocat'),
(3, 1, 4, 'Zayat Aroma\r\n'),
(1, 1, 5, 'HV-Argousier'),
(3, 1, 5, 'Zayat Aroma');

-- --------------------------------------------------------

--
-- Table structure for table `ta_provinceattribute_language`
--

DROP TABLE IF EXISTS `ta_provinceattribute_language`;
CREATE TABLE IF NOT EXISTS `ta_provinceattribute_language` (
  `provinceAttributeId` smallint(6) NOT NULL,
  `idLanguage` smallint(6) NOT NULL,
  `idProvince` smallint(6) NOT NULL,
  `value` text,
  PRIMARY KEY (`provinceAttributeId`,`idLanguage`,`idProvince`),
  KEY `idLanguage` (`idLanguage`),
  KEY `idProvince` (`idProvince`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `ta_tagattribute_language`
--

DROP TABLE IF EXISTS `ta_tagattribute_language`;
CREATE TABLE IF NOT EXISTS `ta_tagattribute_language` (
  `idTagAttribute` smallint(6) NOT NULL,
  `idLanguage` smallint(6) NOT NULL,
  `idTag` smallint(6) NOT NULL,
  `value` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idTagAttribute`,`idLanguage`,`idTag`),
  KEY `idLanguage` (`idLanguage`),
  KEY `idTag` (`idTag`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `ta_tag_product`
--

DROP TABLE IF EXISTS `ta_tag_product`;
CREATE TABLE IF NOT EXISTS `ta_tag_product` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `idTag` smallint(6) NOT NULL,
  `idProduct` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idTag` (`idTag`),
  KEY `idProduct` (`idProduct`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `ta_users_conditions`
--

DROP TABLE IF EXISTS `ta_users_conditions`;
CREATE TABLE IF NOT EXISTS `ta_users_conditions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idUsers` int(11) NOT NULL,
  `conditionsId` smallint(6) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idUsers` (`idUsers`),
  KEY `conditionsId` (`conditionsId`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idCivility` smallint(6) NOT NULL,
  `firstName` varchar(20) NOT NULL,
  `lastName` varchar(20) NOT NULL,
  `email` varchar(40) NOT NULL,
  `birthDate` date NOT NULL,
  `password` varchar(255) NOT NULL,
  `newsletter` bit(1) NOT NULL,
  `isAdmin` bit(1) NOT NULL DEFAULT b'0',
  `address` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idCivility` (`idCivility`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `promo` (
  `id_product` smallint(6) NOT NULL AUTO_INCREMENT,
  `rabais` smallint(6) NOT NULL,
  PRIMARY KEY (`id_product`)
) 

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
