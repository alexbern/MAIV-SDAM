-- phpMyAdmin SQL Dump
-- version 4.4.10
-- http://www.phpmyadmin.net
--
-- Host: localhost:3306
-- Generation Time: Jun 06, 2016 at 12:13 AM
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `sdam_projects`
--

CREATE TABLE `sdam_projects` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `owner_id` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `sdam_projects`
--

INSERT INTO `sdam_projects` (`id`, `name`, `owner_id`) VALUES
(1, 'Project 1', 1),
(2, 'Project 2', 1);

-- --------------------------------------------------------

--
-- Table structure for table `sdam_rooms`
--

CREATE TABLE `sdam_rooms` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `tags` varchar(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `sdam_rooms`
--

INSERT INTO `sdam_rooms` (`id`, `name`, `tags`) VALUES
(1, 'Water Kamer', 'zee water rustgevend blauw derp'),
(2, 'Zon Kamer', 'zon licht warm strand derp');

-- --------------------------------------------------------

--
-- Table structure for table `sdam_users`
--

CREATE TABLE `sdam_users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `sdam_projects`
--
ALTER TABLE `sdam_projects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `sdam_rooms`
--
ALTER TABLE `sdam_rooms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `sdam_users`
--
ALTER TABLE `sdam_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `sdam_votes`
--
ALTER TABLE `sdam_votes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
