-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 12, 2021 at 04:24 AM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 8.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rental`
--

-- --------------------------------------------------------

--
-- Table structure for table `histories`
--

CREATE TABLE `histories` (
  `id` int(11) NOT NULL,
  `vehicle_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `rent_date` datetime DEFAULT NULL,
  `status` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `histories`
--

INSERT INTO `histories` (`id`, `vehicle_id`, `user_id`, `rent_date`, `status`) VALUES
(2, 1, 1, '2021-06-30 10:24:00', 'Rental finished'),
(3, 1, 2, '2021-08-03 11:45:00', 'Waiting for payment'),
(5, 1, 4, '2021-08-03 09:00:00', 'Payment succeed');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` int(11) NOT NULL,
  `date_of_birth` datetime DEFAULT NULL,
  `address` varchar(100) NOT NULL,
  `role` varchar(100) NOT NULL,
  `car_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `password`, `gender`, `email`, `phone`, `date_of_birth`, `address`, `role`, `car_id`) VALUES
(1, 'Akbar R', '$2b$10$WwE37Xt5ljMrQeQKkRys8eFWQf3gHN2yUq2vuLnkPtv2m4eaPf1WO', 'Male', 'akbar123@email.com', 2147483647, '1998-01-25 00:00:00', 'Jl. Kamojang, Pondok Gede', 'owner', 1),
(2, 'Andi A', '$2b$10$WEGHBaofnbSPBjGFb30sQ.nmori.Fsa1W959n4vfeK/MSUX9bSgLm', 'Male', 'andi321@email.com', 123456789, '1990-08-01 00:00:00', 'Jl. Margonda 1, Depok', '', 0),
(3, 'Mary J', '$2b$10$xG1pBTKxmGA2n1Gim7pIYeLzKCDbuRYmw6sk8yYyABkVJqXKpd4ae', 'Female', 'mary.johnson@email.com', 133912903, '1980-02-21 00:00:00', 'Brooklyn Ave.', '', 0),
(4, 'Adam S', '$2b$10$Jf77lilIj5idXUqvVUpU.e.FWFwuY1C/pkb1ZU1LJ21/ENkHMubgm', 'Male', 'schwarzenegger@email.com', 2147483647, '1982-03-11 00:00:00', 'USA', 'owner', 3);

-- --------------------------------------------------------

--
-- Table structure for table `vehicles`
--

CREATE TABLE `vehicles` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(100) NOT NULL,
  `price` int(11) NOT NULL,
  `category` varchar(100) NOT NULL,
  `stock` int(11) NOT NULL,
  `rating` double(2,1) NOT NULL,
  `owner` int(11) NOT NULL,
  `image` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vehicles`
--

INSERT INTO `vehicles` (`id`, `name`, `description`, `price`, `category`, `stock`, `rating`, `owner`, `image`) VALUES
(1, 'Toyota Avanza', 'Cheap and affordable for everyone!', 100000, 'Car', 10, 0.0, 1, ''),
(2, 'Toyota Alphard', 'If you\'re looking for luxury and comfort, this is the one.', 500000, 'Car', 5, 4.5, 0, ''),
(3, 'Honda Brio', 'Sometimes you just want to have a small car to ride.', 300000, 'Car', 5, 4.8, 4, ''),
(4, 'Yamaha NMAX', 'Large enough to support your belongings.', 150000, 'Motorbike', 9, 4.7, 0, '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `histories`
--
ALTER TABLE `histories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `vehicle_id` (`vehicle_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `car_id` (`car_id`);

--
-- Indexes for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `owner` (`owner`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `histories`
--
ALTER TABLE `histories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `histories`
--
ALTER TABLE `histories`
  ADD CONSTRAINT `histories_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `histories_ibfk_2` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
