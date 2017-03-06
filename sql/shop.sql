-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.6.25 - MySQL Community Server (GPL)
-- Server OS:                    Win32
-- HeidiSQL Version:             9.3.0.4984
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping structure for table shop.company
DROP TABLE IF EXISTS `company`;
CREATE TABLE IF NOT EXISTS `company` (
  `name` varchar(255) COLLATE utf8_german2_ci NOT NULL,
  `address` varchar(255) COLLATE utf8_german2_ci NOT NULL,
  `zip` int(11) NOT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_german2_ci;

-- Data exporting was unselected.


-- Dumping structure for table shop.customer
DROP TABLE IF EXISTS `customer`;
CREATE TABLE IF NOT EXISTS `customer` (
  `email` varchar(255) COLLATE utf8_german2_ci NOT NULL,
  `pwd` varchar(255) COLLATE utf8_german2_ci NOT NULL,
  `first_name` varchar(63) COLLATE utf8_german2_ci NOT NULL,
  `last_name` varchar(63) COLLATE utf8_german2_ci NOT NULL,
  `address` varchar(255) COLLATE utf8_german2_ci NOT NULL,
  `zip` int(11) NOT NULL,
  `isAuthenticated` int(11) DEFAULT NULL,
  `authToken` varchar(255) COLLATE utf8_german2_ci DEFAULT NULL,
  PRIMARY KEY (`email`),
  UNIQUE KEY `authToken` (`authToken`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_german2_ci;

-- Data exporting was unselected.


-- Dumping structure for table shop.item
DROP TABLE IF EXISTS `item`;
CREATE TABLE IF NOT EXISTS `item` (
  `id` int(11) NOT NULL,
  `name` varchar(63) COLLATE utf8_german2_ci NOT NULL,
  `item_number` int(11) NOT NULL,
  `price` float NOT NULL,
  `description` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_german2_ci;

INSERT INTO `item` (`id`, `name`, `item_number`, `price`, `description`, `imagePath`) VALUES
  (0, 'Bleistift', 11, 2, 'Mit einem Bleistift kann man super zeichnen! Oder schreiben, oder...', 'http://media.4teachers.de/images/thumbs/image_thumb.14955.png'),
  (1, 'Kugelschreiber', 123, 5, 'Der Kugelschreiber für die schönsten Unterschriften die man sich vorst', 'https://pixabay.com/static/uploads/photo/2014/02/24/15/37/pen-273656_960_720.jpg'),
  (3, 'Birne', 112, 3.5, 'Für die, die keine Äpfel mögen. Ist eine Vitaminbombe!', 'https://pixabay.com/static/uploads/photo/2014/04/05/11/31/cartoon-316150_960_720.jpg'),
  (4, 'Lorem Ipsum', 99, 15, 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonu', 'http://denielleemans.com/wp-content/uploads/2012/09/004_lorem.jpg'),
  (5, 'Wein', 1234, 8, 'Zum hinunterspülen von zum Beispiel Äpfel und Birnen.', 'http://www.discounter-preisvergleich.de/bilder/produkte/5512/5512_2008-09-11-19-49-46.jpg'),
  (6, 'Bier', 8118, 2.5, 'Nach dem deutschen Reinheitsgebot gebraut.', 'http://www.bilder-hochladen.net/files/big/3pnj-2ni-9c86.jpg');
/*!40000 ALTER TABLE `item` ENABLE KEYS */;

-- Dumping structure for table shop.shopping_card
DROP TABLE IF EXISTS `shopping_card`;
CREATE TABLE IF NOT EXISTS `shopping_card` (
  `customer_id` varchar(40) COLLATE utf8_german2_ci NOT NULL,
  PRIMARY KEY (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_german2_ci;

-- Data exporting was unselected.


-- Dumping structure for table shop.shopping_card_item
DROP TABLE IF EXISTS `shopping_card_item`;
CREATE TABLE IF NOT EXISTS `shopping_card_item` (
  `shopping_card_id` varchar(40) COLLATE utf8_german2_ci NOT NULL,
  `item_id` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  PRIMARY KEY (`shopping_card_id`,`item_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_german2_ci;

-- Data exporting was unselected.


-- Dumping structure for table shop.warehouse
DROP TABLE IF EXISTS `warehouse`;
CREATE TABLE IF NOT EXISTS `warehouse` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(63) COLLATE utf8_german2_ci NOT NULL,
  `company_name` varchar(255) COLLATE utf8_german2_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_german2_ci;

-- Data exporting was unselected.


-- Dumping structure for table shop.warehouse_item
DROP TABLE IF EXISTS `warehouse_item`;
CREATE TABLE IF NOT EXISTS `warehouse_item` (
  `item_id` int(11) NOT NULL,
  `warehouse_id` int(11) NOT NULL,
  `qty` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_german2_ci;

-- Data exporting was unselected.
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
