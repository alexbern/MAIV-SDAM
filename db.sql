-- phpMyAdmin SQL Dump
-- version 4.4.10
-- http://www.phpmyadmin.net
--
-- Host: localhost:3306
-- Generation Time: Jun 09, 2016 at 02:45 PM
-- Server version: 5.5.42
-- PHP Version: 7.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sdam`
--

-- --------------------------------------------------------

--
-- Table structure for table `sdam_newsletters`
--

CREATE TABLE `sdam_newsletters` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `sdam_newsletters`
--

INSERT INTO `sdam_newsletters` (`id`, `email`, `name`) VALUES
(1, 'itsalexbernard@gmail.com', 'Alex'),
(2, 'itsalexbernard@gmail.com', 'Alexder');

-- --------------------------------------------------------

--
-- Table structure for table `sdam_projects`
--

CREATE TABLE `sdam_projects` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `owner_id` int(11) NOT NULL,
  `shortdesc` text NOT NULL,
  `intro` text NOT NULL,
  `description` text NOT NULL,
  `img1` varchar(255) DEFAULT NULL,
  `img2` varchar(255) DEFAULT NULL,
  `img3` varchar(255) DEFAULT NULL,
  `img4` varchar(255) DEFAULT NULL,
  `img5` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `sdam_reviews`
--

CREATE TABLE `sdam_reviews` (
  `id` int(11) NOT NULL,
  `room_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `review` varchar(255) NOT NULL,
  `sfeer` int(11) NOT NULL,
  `checkin` int(11) NOT NULL,
  `beauty` int(11) NOT NULL,
  `interior` int(11) NOT NULL,
  `accomo` int(11) NOT NULL,
  `value` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `sdam_rooms`
--

CREATE TABLE `sdam_rooms` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `tags` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `sdam_rooms`
--

INSERT INTO `sdam_rooms` (`id`, `name`, `tags`, `description`, `image`) VALUES
(1, 'Het Jeneverappartement', 'jenever drank appartement', 'Overnacht alsof u in een oude jeneverstokerij bent!', 'emptyroom.jpg'),
(2, 'De Thuishaven', 'thuis haven zee rotterdam boot', 'Ingericht met allerlei items uit de Rotterdamse haven...', 'emptyroom.jpg'),
(3, 'Het Ambachtshuis', 'ambacht huis antiek houten vernieuwend', 'Van het bad op bootjes tot het antiek houten kingsize bed...', 'emptyroom.jpg'),
(4, 'Sofie en Anne', 'sofie en anne schildering', 'Voor deze kamer schilderden we de muren en het plafond vol met de Rotterdamse skyline.', 'emptyroom.jpg'),
(5, 'Joy’s appartement', 'moderne kunst joy appartement', 'Een appartement vol moderne kunst, geïnspireerd op het Rotterdamse moraal...', 'emptyroom.jpg'),
(6, 'Schiedamse Vogelvlucht', 'vogelvlucht hoog comfort', 'Een fijne comfortkamer ingericht met natuurfotorgrafie uit Midden-Delfland.', 'emptyroom.jpg'),
(7, 'Babbersmolen kamer', 'babbersmolen kamer eeuwen oud', 'Deze kamer is ingericht net als de eeuwenoude Schiedamse Babbersmolen...', 'emptyroom.jpg'),
(8, 'Schiedam in Bedrijf kamer', 'schiedam bedrijf kamer fotografie', 'Gedecoreerd met fotografie van de huidige tentoonstelling uit het Schiedamse Museum.', 'emptyroom.jpg'),
(9, 'Golden experience', 'golden experience daan', 'In de hotelkamer ingericht door Daan van Golden, je overnacht in een van zijn expositieruimtes.', 'emptyroom.jpg'),
(10, 'De Roze kamer', 'pink roze girly girls girl love', 'Perfect voor ‘lovebirds’ die op zoek zijn naar een stedentripje...', 'emptyroom.jpg'),
(11, 'De Bioscoop', 'bioscoop film popcorn', 'Deze kamer bevat een gigantisch projectie scherm voor de filmliefhebbers...\n', 'emptyroom.jpg'),
(12, 'Art Deco Huis', 'art deco kunst', 'Een luxe comfortwoning ingericht in art deco stijl.', 'emptyroom.jpg'),
(13, 'Surrealistische kamer', 'surrealistisch kamer', 'Dit appartement is ingericht met meubels en kunst in surrealistische stijl.', 'emptyroom.jpg'),
(14, 'Jugenstil appartement', 'appartement', 'Ingericht in art nouveau, biedt deze kamer een smaakvol verblijf.', 'emptyroom.jpg'),
(15, 'Deco Landschap woning', 'deco landschap woning', 'Geïnspireerd door de deco landschappen van Tom de Vos.', 'emptyroom.jpg'),
(16, 'Markthal kamer', 'mini markthal markt betaling', 'Dit appartement is ingericht als mini-markthal, met bloemenschildering op het plafond!', 'emptyroom.jpg'),
(17, 'Euromast view', 'europa euromast 360', 'In deze kamer word realtime het 360 graden uitzicht vanuit de euromast geprojecteerd op de muren', 'emptyroom.jpg'),
(18, 'The Corky Room', 'corky tuttig ingericht', 'Deze kamer is lekker tuttig ingericht, alsof je bij je oma blijft logeren.', 'emptyroom.jpg'),
(19, 'Cat Palace', 'cat katten catladies', 'Voor alle catladies out there: naar dit appartement kun je je katten meenemen.', 'emptyroom.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `sdam_users`
--

CREATE TABLE `sdam_users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `phone` varchar(255) NOT NULL,
  `role` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `sdam_users`
--

INSERT INTO `sdam_users` (`id`, `email`, `password`, `name`, `image`, `phone`, `role`) VALUES
(1, 'itsalexbernard@gmail.com', '$2a$12$3R.IkW.aq7Kn/7uT4jggEOMgH1sqh57i6UBbu2/aDh5ZjN.YT.lhq', 'Alex Bernard', NULL, '0494113273', 0);

-- --------------------------------------------------------

--
-- Table structure for table `sdam_votes`
--

CREATE TABLE `sdam_votes` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sdam_newsletters`
--
ALTER TABLE `sdam_newsletters`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sdam_projects`
--
ALTER TABLE `sdam_projects`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sdam_reviews`
--
ALTER TABLE `sdam_reviews`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sdam_rooms`
--
ALTER TABLE `sdam_rooms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sdam_users`
--
ALTER TABLE `sdam_users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sdam_votes`
--
ALTER TABLE `sdam_votes`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sdam_newsletters`
--
ALTER TABLE `sdam_newsletters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `sdam_projects`
--
ALTER TABLE `sdam_projects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `sdam_reviews`
--
ALTER TABLE `sdam_reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `sdam_rooms`
--
ALTER TABLE `sdam_rooms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=20;
--
-- AUTO_INCREMENT for table `sdam_users`
--
ALTER TABLE `sdam_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `sdam_votes`
--
ALTER TABLE `sdam_votes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
