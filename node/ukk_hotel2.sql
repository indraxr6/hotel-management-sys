-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 16, 2023 at 06:53 AM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 8.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ukk_hotel`
--

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` varchar(255) NOT NULL,
  `order_number` varchar(255) DEFAULT NULL,
  `order_name` varchar(255) DEFAULT NULL,
  `order_email` varchar(255) DEFAULT NULL,
  `order_date` datetime DEFAULT NULL,
  `checkout_date` datetime DEFAULT NULL,
  `checkin_date` datetime DEFAULT NULL,
  `guest_name` varchar(255) DEFAULT NULL,
  `room_count` int(11) DEFAULT NULL,
  `id_room_type` int(11) DEFAULT NULL,
  `order_status` enum('NEW','CHECK-IN','CHECK-OUT') DEFAULT NULL,
  `id_user` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `order_number`, `order_name`, `order_email`, `order_date`, `checkout_date`, `checkin_date`, `guest_name`, `room_count`, `id_room_type`, `order_status`, `id_user`, `createdAt`, `updatedAt`) VALUES
('26a0a8a8-82c4-472d-aa6d-2fc82a6c940d', 'INV-50772', 'Faizi Luxury', 'faizi@example.com', '2023-02-08 02:18:11', '2023-01-26 00:00:00', '2023-01-23 00:00:00', 'Gweh doang', 9, 3, 'NEW', '@MYDWJ', '2023-02-08 02:18:11', '2023-02-08 02:18:11'),
('58483a6a-c840-48fb-89bf-719679779f44', 'INV-28175', 'Whangsaff', 'whangsaff@gmail.com', '2023-02-13 02:37:07', '2023-02-16 00:00:00', '2023-02-13 00:00:00', 'Indra, Faiz, Rayhan, Zaim', 9, 1, 'CHECK-IN', '@MYDWJ', '2023-02-13 02:37:07', '2023-02-13 03:12:08'),
('cb0abe92-5a8c-410a-b659-d5c772098d2c', 'INV-91664', 'Whangsaff', 'whangsaff@gmail.com', '2023-02-13 03:16:58', '2023-02-16 00:00:00', '2023-02-13 00:00:00', 'Indra, Faiz, Rayhan, Zaim', 11, 1, 'NEW', '@MYDWJ', '2023-02-13 03:16:58', '2023-02-13 03:16:58'),
('ecf49089-025e-448d-9705-ac6f9cb75b25', 'INV-25293', 'Edited', 'edited@gmail.com', '2023-02-13 03:16:37', '2023-02-16 00:00:00', '2023-02-13 00:00:00', 'EDITED', 11, 1, 'NEW', '@HNBYI8', '2023-02-13 03:16:37', '2023-02-13 03:33:37');

-- --------------------------------------------------------

--
-- Table structure for table `order_details`
--

CREATE TABLE `order_details` (
  `id` int(11) NOT NULL,
  `id_order` varchar(255) DEFAULT NULL,
  `id_room` int(11) DEFAULT NULL,
  `access_date` datetime NOT NULL,
  `price` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `order_details`
--

INSERT INTO `order_details` (`id`, `id_order`, `id_room`, `access_date`, `price`, `createdAt`, `updatedAt`) VALUES
(494, '26a0a8a8-82c4-472d-aa6d-2fc82a6c940d', 4, '2023-01-23 00:00:00', 450, '2023-02-08 02:18:11', '2023-02-08 02:18:11'),
(495, '26a0a8a8-82c4-472d-aa6d-2fc82a6c940d', 5, '2023-01-23 00:00:00', 450, '2023-02-08 02:18:11', '2023-02-08 02:18:11'),
(496, '26a0a8a8-82c4-472d-aa6d-2fc82a6c940d', 6, '2023-01-23 00:00:00', 450, '2023-02-08 02:18:11', '2023-02-08 02:18:11'),
(497, '26a0a8a8-82c4-472d-aa6d-2fc82a6c940d', 7, '2023-01-23 00:00:00', 450, '2023-02-08 02:18:11', '2023-02-08 02:18:11'),
(498, '26a0a8a8-82c4-472d-aa6d-2fc82a6c940d', 8, '2023-01-23 00:00:00', 450, '2023-02-08 02:18:11', '2023-02-08 02:18:11'),
(499, '26a0a8a8-82c4-472d-aa6d-2fc82a6c940d', 9, '2023-01-23 00:00:00', 450, '2023-02-08 02:18:11', '2023-02-08 02:18:11'),
(500, '26a0a8a8-82c4-472d-aa6d-2fc82a6c940d', 10, '2023-01-23 00:00:00', 450, '2023-02-08 02:18:11', '2023-02-08 02:18:11'),
(501, '26a0a8a8-82c4-472d-aa6d-2fc82a6c940d', 11, '2023-01-23 00:00:00', 450, '2023-02-08 02:18:11', '2023-02-08 02:18:11'),
(502, '26a0a8a8-82c4-472d-aa6d-2fc82a6c940d', 12, '2023-01-23 00:00:00', 450, '2023-02-08 02:18:11', '2023-02-08 02:18:11'),
(503, '26a0a8a8-82c4-472d-aa6d-2fc82a6c940d', 4, '2023-01-24 00:00:00', 450, '2023-02-08 02:18:11', '2023-02-08 02:18:11'),
(504, '26a0a8a8-82c4-472d-aa6d-2fc82a6c940d', 5, '2023-01-24 00:00:00', 450, '2023-02-08 02:18:11', '2023-02-08 02:18:11'),
(505, '26a0a8a8-82c4-472d-aa6d-2fc82a6c940d', 6, '2023-01-24 00:00:00', 450, '2023-02-08 02:18:11', '2023-02-08 02:18:11'),
(506, '26a0a8a8-82c4-472d-aa6d-2fc82a6c940d', 7, '2023-01-24 00:00:00', 450, '2023-02-08 02:18:11', '2023-02-08 02:18:11'),
(507, '26a0a8a8-82c4-472d-aa6d-2fc82a6c940d', 8, '2023-01-24 00:00:00', 450, '2023-02-08 02:18:11', '2023-02-08 02:18:11'),
(508, '26a0a8a8-82c4-472d-aa6d-2fc82a6c940d', 9, '2023-01-24 00:00:00', 450, '2023-02-08 02:18:11', '2023-02-08 02:18:11'),
(509, '26a0a8a8-82c4-472d-aa6d-2fc82a6c940d', 10, '2023-01-24 00:00:00', 450, '2023-02-08 02:18:11', '2023-02-08 02:18:11'),
(510, '26a0a8a8-82c4-472d-aa6d-2fc82a6c940d', 11, '2023-01-24 00:00:00', 450, '2023-02-08 02:18:11', '2023-02-08 02:18:11'),
(511, '26a0a8a8-82c4-472d-aa6d-2fc82a6c940d', 12, '2023-01-24 00:00:00', 450, '2023-02-08 02:18:11', '2023-02-08 02:18:11'),
(512, '26a0a8a8-82c4-472d-aa6d-2fc82a6c940d', 4, '2023-01-25 00:00:00', 450, '2023-02-08 02:18:11', '2023-02-08 02:18:11'),
(513, '26a0a8a8-82c4-472d-aa6d-2fc82a6c940d', 5, '2023-01-25 00:00:00', 450, '2023-02-08 02:18:11', '2023-02-08 02:18:11'),
(514, '26a0a8a8-82c4-472d-aa6d-2fc82a6c940d', 6, '2023-01-25 00:00:00', 450, '2023-02-08 02:18:11', '2023-02-08 02:18:11'),
(515, '26a0a8a8-82c4-472d-aa6d-2fc82a6c940d', 7, '2023-01-25 00:00:00', 450, '2023-02-08 02:18:11', '2023-02-08 02:18:11'),
(516, '26a0a8a8-82c4-472d-aa6d-2fc82a6c940d', 8, '2023-01-25 00:00:00', 450, '2023-02-08 02:18:11', '2023-02-08 02:18:11'),
(517, '26a0a8a8-82c4-472d-aa6d-2fc82a6c940d', 9, '2023-01-25 00:00:00', 450, '2023-02-08 02:18:11', '2023-02-08 02:18:11'),
(518, '26a0a8a8-82c4-472d-aa6d-2fc82a6c940d', 10, '2023-01-25 00:00:00', 450, '2023-02-08 02:18:11', '2023-02-08 02:18:11'),
(519, '26a0a8a8-82c4-472d-aa6d-2fc82a6c940d', 11, '2023-01-25 00:00:00', 450, '2023-02-08 02:18:11', '2023-02-08 02:18:11'),
(520, '26a0a8a8-82c4-472d-aa6d-2fc82a6c940d', 12, '2023-01-25 00:00:00', 450, '2023-02-08 02:18:11', '2023-02-08 02:18:11'),
(572, '58483a6a-c840-48fb-89bf-719679779f44', 1, '2023-02-13 00:00:00', 225, '2023-02-13 02:37:07', '2023-02-13 02:37:07'),
(573, '58483a6a-c840-48fb-89bf-719679779f44', 2, '2023-02-13 00:00:00', 225, '2023-02-13 02:37:07', '2023-02-13 02:37:07'),
(574, '58483a6a-c840-48fb-89bf-719679779f44', 3, '2023-02-13 00:00:00', 225, '2023-02-13 02:37:07', '2023-02-13 02:37:07'),
(575, '58483a6a-c840-48fb-89bf-719679779f44', 4, '2023-02-13 00:00:00', 225, '2023-02-13 02:37:07', '2023-02-13 02:37:07'),
(576, '58483a6a-c840-48fb-89bf-719679779f44', 5, '2023-02-13 00:00:00', 225, '2023-02-13 02:37:07', '2023-02-13 02:37:07'),
(577, '58483a6a-c840-48fb-89bf-719679779f44', 6, '2023-02-13 00:00:00', 225, '2023-02-13 02:37:07', '2023-02-13 02:37:07'),
(578, '58483a6a-c840-48fb-89bf-719679779f44', 7, '2023-02-13 00:00:00', 225, '2023-02-13 02:37:07', '2023-02-13 02:37:07'),
(579, '58483a6a-c840-48fb-89bf-719679779f44', 8, '2023-02-13 00:00:00', 225, '2023-02-13 02:37:07', '2023-02-13 02:37:07'),
(580, '58483a6a-c840-48fb-89bf-719679779f44', 9, '2023-02-13 00:00:00', 225, '2023-02-13 02:37:07', '2023-02-13 02:37:07'),
(581, '58483a6a-c840-48fb-89bf-719679779f44', 1, '2023-02-14 00:00:00', 225, '2023-02-13 02:37:07', '2023-02-13 02:37:07'),
(582, '58483a6a-c840-48fb-89bf-719679779f44', 2, '2023-02-14 00:00:00', 225, '2023-02-13 02:37:07', '2023-02-13 02:37:07'),
(583, '58483a6a-c840-48fb-89bf-719679779f44', 3, '2023-02-14 00:00:00', 225, '2023-02-13 02:37:07', '2023-02-13 02:37:07'),
(584, '58483a6a-c840-48fb-89bf-719679779f44', 4, '2023-02-14 00:00:00', 225, '2023-02-13 02:37:07', '2023-02-13 02:37:07'),
(585, '58483a6a-c840-48fb-89bf-719679779f44', 5, '2023-02-14 00:00:00', 225, '2023-02-13 02:37:07', '2023-02-13 02:37:07'),
(586, '58483a6a-c840-48fb-89bf-719679779f44', 6, '2023-02-14 00:00:00', 225, '2023-02-13 02:37:07', '2023-02-13 02:37:07'),
(587, '58483a6a-c840-48fb-89bf-719679779f44', 7, '2023-02-14 00:00:00', 225, '2023-02-13 02:37:07', '2023-02-13 02:37:07'),
(588, '58483a6a-c840-48fb-89bf-719679779f44', 8, '2023-02-14 00:00:00', 225, '2023-02-13 02:37:07', '2023-02-13 02:37:07'),
(589, '58483a6a-c840-48fb-89bf-719679779f44', 9, '2023-02-14 00:00:00', 225, '2023-02-13 02:37:07', '2023-02-13 02:37:07'),
(590, '58483a6a-c840-48fb-89bf-719679779f44', 1, '2023-02-15 00:00:00', 225, '2023-02-13 02:37:07', '2023-02-13 02:37:07'),
(591, '58483a6a-c840-48fb-89bf-719679779f44', 2, '2023-02-15 00:00:00', 225, '2023-02-13 02:37:07', '2023-02-13 02:37:07'),
(592, '58483a6a-c840-48fb-89bf-719679779f44', 3, '2023-02-15 00:00:00', 225, '2023-02-13 02:37:07', '2023-02-13 02:37:07'),
(593, '58483a6a-c840-48fb-89bf-719679779f44', 4, '2023-02-15 00:00:00', 225, '2023-02-13 02:37:07', '2023-02-13 02:37:07'),
(594, '58483a6a-c840-48fb-89bf-719679779f44', 5, '2023-02-15 00:00:00', 225, '2023-02-13 02:37:07', '2023-02-13 02:37:07'),
(595, '58483a6a-c840-48fb-89bf-719679779f44', 6, '2023-02-15 00:00:00', 225, '2023-02-13 02:37:07', '2023-02-13 02:37:07'),
(596, '58483a6a-c840-48fb-89bf-719679779f44', 7, '2023-02-15 00:00:00', 225, '2023-02-13 02:37:07', '2023-02-13 02:37:07'),
(597, '58483a6a-c840-48fb-89bf-719679779f44', 8, '2023-02-15 00:00:00', 225, '2023-02-13 02:37:07', '2023-02-13 02:37:07'),
(598, '58483a6a-c840-48fb-89bf-719679779f44', 9, '2023-02-15 00:00:00', 225, '2023-02-13 02:37:07', '2023-02-13 02:37:07'),
(629, 'ecf49089-025e-448d-9705-ac6f9cb75b25', 1, '2023-02-13 00:00:00', 225, '2023-02-13 03:16:37', '2023-02-13 03:16:37'),
(630, 'ecf49089-025e-448d-9705-ac6f9cb75b25', 2, '2023-02-13 00:00:00', 225, '2023-02-13 03:16:37', '2023-02-13 03:16:37'),
(631, 'ecf49089-025e-448d-9705-ac6f9cb75b25', 3, '2023-02-13 00:00:00', 225, '2023-02-13 03:16:37', '2023-02-13 03:16:37'),
(632, 'ecf49089-025e-448d-9705-ac6f9cb75b25', 4, '2023-02-13 00:00:00', 225, '2023-02-13 03:16:37', '2023-02-13 03:16:37'),
(633, 'ecf49089-025e-448d-9705-ac6f9cb75b25', 5, '2023-02-13 00:00:00', 225, '2023-02-13 03:16:37', '2023-02-13 03:16:37'),
(634, 'ecf49089-025e-448d-9705-ac6f9cb75b25', 6, '2023-02-13 00:00:00', 225, '2023-02-13 03:16:37', '2023-02-13 03:16:37'),
(635, 'ecf49089-025e-448d-9705-ac6f9cb75b25', 7, '2023-02-13 00:00:00', 225, '2023-02-13 03:16:37', '2023-02-13 03:16:37'),
(636, 'ecf49089-025e-448d-9705-ac6f9cb75b25', 8, '2023-02-13 00:00:00', 225, '2023-02-13 03:16:37', '2023-02-13 03:16:37'),
(637, 'ecf49089-025e-448d-9705-ac6f9cb75b25', 9, '2023-02-13 00:00:00', 225, '2023-02-13 03:16:37', '2023-02-13 03:16:37'),
(638, 'ecf49089-025e-448d-9705-ac6f9cb75b25', 10, '2023-02-13 00:00:00', 225, '2023-02-13 03:16:37', '2023-02-13 03:16:37'),
(639, 'ecf49089-025e-448d-9705-ac6f9cb75b25', 11, '2023-02-13 00:00:00', 225, '2023-02-13 03:16:37', '2023-02-13 03:16:37'),
(640, 'ecf49089-025e-448d-9705-ac6f9cb75b25', 1, '2023-02-14 00:00:00', 225, '2023-02-13 03:16:37', '2023-02-13 03:16:37'),
(641, 'ecf49089-025e-448d-9705-ac6f9cb75b25', 2, '2023-02-14 00:00:00', 225, '2023-02-13 03:16:37', '2023-02-13 03:16:37'),
(642, 'ecf49089-025e-448d-9705-ac6f9cb75b25', 3, '2023-02-14 00:00:00', 225, '2023-02-13 03:16:37', '2023-02-13 03:16:37'),
(643, 'ecf49089-025e-448d-9705-ac6f9cb75b25', 4, '2023-02-14 00:00:00', 225, '2023-02-13 03:16:37', '2023-02-13 03:16:37'),
(644, 'ecf49089-025e-448d-9705-ac6f9cb75b25', 5, '2023-02-14 00:00:00', 225, '2023-02-13 03:16:37', '2023-02-13 03:16:37'),
(645, 'ecf49089-025e-448d-9705-ac6f9cb75b25', 6, '2023-02-14 00:00:00', 225, '2023-02-13 03:16:37', '2023-02-13 03:16:37'),
(646, 'ecf49089-025e-448d-9705-ac6f9cb75b25', 7, '2023-02-14 00:00:00', 225, '2023-02-13 03:16:37', '2023-02-13 03:16:37'),
(647, 'ecf49089-025e-448d-9705-ac6f9cb75b25', 8, '2023-02-14 00:00:00', 225, '2023-02-13 03:16:37', '2023-02-13 03:16:37'),
(648, 'ecf49089-025e-448d-9705-ac6f9cb75b25', 9, '2023-02-14 00:00:00', 225, '2023-02-13 03:16:37', '2023-02-13 03:16:37'),
(649, 'ecf49089-025e-448d-9705-ac6f9cb75b25', 10, '2023-02-14 00:00:00', 225, '2023-02-13 03:16:37', '2023-02-13 03:16:37'),
(650, 'ecf49089-025e-448d-9705-ac6f9cb75b25', 11, '2023-02-14 00:00:00', 225, '2023-02-13 03:16:37', '2023-02-13 03:16:37'),
(651, 'ecf49089-025e-448d-9705-ac6f9cb75b25', 1, '2023-02-15 00:00:00', 225, '2023-02-13 03:16:37', '2023-02-13 03:16:37'),
(652, 'ecf49089-025e-448d-9705-ac6f9cb75b25', 2, '2023-02-15 00:00:00', 225, '2023-02-13 03:16:37', '2023-02-13 03:16:37'),
(653, 'ecf49089-025e-448d-9705-ac6f9cb75b25', 3, '2023-02-15 00:00:00', 225, '2023-02-13 03:16:37', '2023-02-13 03:16:37'),
(654, 'ecf49089-025e-448d-9705-ac6f9cb75b25', 4, '2023-02-15 00:00:00', 225, '2023-02-13 03:16:37', '2023-02-13 03:16:37'),
(655, 'ecf49089-025e-448d-9705-ac6f9cb75b25', 5, '2023-02-15 00:00:00', 225, '2023-02-13 03:16:37', '2023-02-13 03:16:37'),
(656, 'ecf49089-025e-448d-9705-ac6f9cb75b25', 6, '2023-02-15 00:00:00', 225, '2023-02-13 03:16:37', '2023-02-13 03:16:37'),
(657, 'ecf49089-025e-448d-9705-ac6f9cb75b25', 7, '2023-02-15 00:00:00', 225, '2023-02-13 03:16:37', '2023-02-13 03:16:37'),
(658, 'ecf49089-025e-448d-9705-ac6f9cb75b25', 8, '2023-02-15 00:00:00', 225, '2023-02-13 03:16:37', '2023-02-13 03:16:37'),
(659, 'ecf49089-025e-448d-9705-ac6f9cb75b25', 9, '2023-02-15 00:00:00', 225, '2023-02-13 03:16:37', '2023-02-13 03:16:37'),
(660, 'ecf49089-025e-448d-9705-ac6f9cb75b25', 10, '2023-02-15 00:00:00', 225, '2023-02-13 03:16:37', '2023-02-13 03:16:37'),
(661, 'ecf49089-025e-448d-9705-ac6f9cb75b25', 11, '2023-02-15 00:00:00', 225, '2023-02-13 03:16:37', '2023-02-13 03:16:37'),
(662, 'cb0abe92-5a8c-410a-b659-d5c772098d2c', 1, '2023-02-13 00:00:00', 225, '2023-02-13 03:16:58', '2023-02-13 03:16:58'),
(663, 'cb0abe92-5a8c-410a-b659-d5c772098d2c', 2, '2023-02-13 00:00:00', 225, '2023-02-13 03:16:58', '2023-02-13 03:16:58'),
(664, 'cb0abe92-5a8c-410a-b659-d5c772098d2c', 3, '2023-02-13 00:00:00', 225, '2023-02-13 03:16:58', '2023-02-13 03:16:58'),
(665, 'cb0abe92-5a8c-410a-b659-d5c772098d2c', 4, '2023-02-13 00:00:00', 225, '2023-02-13 03:16:58', '2023-02-13 03:16:58'),
(666, 'cb0abe92-5a8c-410a-b659-d5c772098d2c', 5, '2023-02-13 00:00:00', 225, '2023-02-13 03:16:58', '2023-02-13 03:16:58'),
(667, 'cb0abe92-5a8c-410a-b659-d5c772098d2c', 6, '2023-02-13 00:00:00', 225, '2023-02-13 03:16:58', '2023-02-13 03:16:58'),
(668, 'cb0abe92-5a8c-410a-b659-d5c772098d2c', 7, '2023-02-13 00:00:00', 225, '2023-02-13 03:16:58', '2023-02-13 03:16:58'),
(669, 'cb0abe92-5a8c-410a-b659-d5c772098d2c', 8, '2023-02-13 00:00:00', 225, '2023-02-13 03:16:58', '2023-02-13 03:16:58'),
(670, 'cb0abe92-5a8c-410a-b659-d5c772098d2c', 9, '2023-02-13 00:00:00', 225, '2023-02-13 03:16:58', '2023-02-13 03:16:58'),
(671, 'cb0abe92-5a8c-410a-b659-d5c772098d2c', 10, '2023-02-13 00:00:00', 225, '2023-02-13 03:16:58', '2023-02-13 03:16:58'),
(672, 'cb0abe92-5a8c-410a-b659-d5c772098d2c', 11, '2023-02-13 00:00:00', 225, '2023-02-13 03:16:58', '2023-02-13 03:16:58'),
(673, 'cb0abe92-5a8c-410a-b659-d5c772098d2c', 1, '2023-02-14 00:00:00', 225, '2023-02-13 03:16:58', '2023-02-13 03:16:58'),
(674, 'cb0abe92-5a8c-410a-b659-d5c772098d2c', 2, '2023-02-14 00:00:00', 225, '2023-02-13 03:16:58', '2023-02-13 03:16:58'),
(675, 'cb0abe92-5a8c-410a-b659-d5c772098d2c', 3, '2023-02-14 00:00:00', 225, '2023-02-13 03:16:58', '2023-02-13 03:16:58'),
(676, 'cb0abe92-5a8c-410a-b659-d5c772098d2c', 4, '2023-02-14 00:00:00', 225, '2023-02-13 03:16:58', '2023-02-13 03:16:58'),
(677, 'cb0abe92-5a8c-410a-b659-d5c772098d2c', 5, '2023-02-14 00:00:00', 225, '2023-02-13 03:16:58', '2023-02-13 03:16:58'),
(678, 'cb0abe92-5a8c-410a-b659-d5c772098d2c', 6, '2023-02-14 00:00:00', 225, '2023-02-13 03:16:58', '2023-02-13 03:16:58'),
(679, 'cb0abe92-5a8c-410a-b659-d5c772098d2c', 7, '2023-02-14 00:00:00', 225, '2023-02-13 03:16:58', '2023-02-13 03:16:58'),
(680, 'cb0abe92-5a8c-410a-b659-d5c772098d2c', 8, '2023-02-14 00:00:00', 225, '2023-02-13 03:16:58', '2023-02-13 03:16:58'),
(681, 'cb0abe92-5a8c-410a-b659-d5c772098d2c', 9, '2023-02-14 00:00:00', 225, '2023-02-13 03:16:58', '2023-02-13 03:16:58'),
(682, 'cb0abe92-5a8c-410a-b659-d5c772098d2c', 10, '2023-02-14 00:00:00', 225, '2023-02-13 03:16:58', '2023-02-13 03:16:58'),
(683, 'cb0abe92-5a8c-410a-b659-d5c772098d2c', 11, '2023-02-14 00:00:00', 225, '2023-02-13 03:16:58', '2023-02-13 03:16:58'),
(684, 'cb0abe92-5a8c-410a-b659-d5c772098d2c', 1, '2023-02-15 00:00:00', 225, '2023-02-13 03:16:58', '2023-02-13 03:16:58'),
(685, 'cb0abe92-5a8c-410a-b659-d5c772098d2c', 2, '2023-02-15 00:00:00', 225, '2023-02-13 03:16:58', '2023-02-13 03:16:58'),
(686, 'cb0abe92-5a8c-410a-b659-d5c772098d2c', 3, '2023-02-15 00:00:00', 225, '2023-02-13 03:16:58', '2023-02-13 03:16:58'),
(687, 'cb0abe92-5a8c-410a-b659-d5c772098d2c', 4, '2023-02-15 00:00:00', 225, '2023-02-13 03:16:58', '2023-02-13 03:16:58'),
(688, 'cb0abe92-5a8c-410a-b659-d5c772098d2c', 5, '2023-02-15 00:00:00', 225, '2023-02-13 03:16:58', '2023-02-13 03:16:58'),
(689, 'cb0abe92-5a8c-410a-b659-d5c772098d2c', 6, '2023-02-15 00:00:00', 225, '2023-02-13 03:16:58', '2023-02-13 03:16:58'),
(690, 'cb0abe92-5a8c-410a-b659-d5c772098d2c', 7, '2023-02-15 00:00:00', 225, '2023-02-13 03:16:58', '2023-02-13 03:16:58'),
(691, 'cb0abe92-5a8c-410a-b659-d5c772098d2c', 8, '2023-02-15 00:00:00', 225, '2023-02-13 03:16:58', '2023-02-13 03:16:58'),
(692, 'cb0abe92-5a8c-410a-b659-d5c772098d2c', 9, '2023-02-15 00:00:00', 225, '2023-02-13 03:16:58', '2023-02-13 03:16:58'),
(693, 'cb0abe92-5a8c-410a-b659-d5c772098d2c', 10, '2023-02-15 00:00:00', 225, '2023-02-13 03:16:58', '2023-02-13 03:16:58'),
(694, 'cb0abe92-5a8c-410a-b659-d5c772098d2c', 11, '2023-02-15 00:00:00', 225, '2023-02-13 03:16:58', '2023-02-13 03:16:58');

-- --------------------------------------------------------

--
-- Table structure for table `rooms`
--

CREATE TABLE `rooms` (
  `id` int(11) NOT NULL,
  `room_number` int(11) DEFAULT NULL,
  `id_room_type` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `rooms`
--

INSERT INTO `rooms` (`id`, `room_number`, `id_room_type`, `createdAt`, `updatedAt`) VALUES
(1, 100, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 101, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(3, 102, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(4, 103, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(5, 104, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(6, 105, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(7, 106, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(8, 107, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(9, 108, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(10, 109, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(11, 110, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(12, 111, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(13, 112, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(14, 113, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(15, 114, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(16, 115, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(17, 116, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(18, 117, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(19, 118, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(20, 119, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(21, 201, 2, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(22, 202, 2, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(23, 203, 2, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(24, 204, 2, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(25, 205, 2, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(26, 206, 2, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(27, 207, 2, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(28, 208, 2, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(29, 209, 2, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(30, 210, 2, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(31, 211, 2, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(32, 212, 2, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(33, 213, 2, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(34, 214, 2, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(35, 301, 3, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(36, 302, 3, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(37, 303, 3, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(38, 304, 3, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(39, 305, 3, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(40, 306, 3, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(41, 307, 3, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(42, 308, 3, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(43, 309, 3, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(44, 310, 3, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(45, 311, 3, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(46, 312, 3, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(47, 401, 4, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(48, 402, 4, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(49, 403, 4, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(50, 404, 4, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(51, 405, 4, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(52, 406, 4, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(53, 407, 4, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(54, 408, 4, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(55, 501, 5, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(56, 502, 5, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(57, 503, 5, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(58, 504, 5, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(59, 505, 5, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(60, 506, 5, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(61, 507, 5, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(62, 508, 5, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(63, 509, 5, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(64, 510, 5, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(65, 601, 6, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(66, 602, 6, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(67, 603, 6, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(68, 604, 6, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(69, 605, 6, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(70, 606, 6, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(71, 607, 6, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(72, 608, 6, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(73, 609, 6, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(74, 610, 6, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(75, 611, 6, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(76, 612, 6, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(77, 613, 6, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(78, 614, 6, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(79, 615, 6, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(80, 616, 6, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(81, 701, 7, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(82, 702, 7, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(83, 703, 7, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(84, 704, 7, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(85, 705, 7, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(86, 706, 7, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(87, 707, 7, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(88, 801, 8, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(89, 802, 8, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(90, 803, 8, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(91, 804, 8, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(92, 901, 9, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(93, 902, 9, '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `room_types`
--

CREATE TABLE `room_types` (
  `id` int(11) NOT NULL,
  `room_type_name` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  `description` text NOT NULL,
  `photo` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `facilities` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `room_types`
--

INSERT INTO `room_types` (`id`, `room_type_name`, `price`, `description`, `photo`, `createdAt`, `updatedAt`, `facilities`) VALUES
(1, 'Standard Room', 75, 'A basic room with comfortable bed and amenities. Enjoy a cozy and comfortable stay in our Standard Room, featuring a plush queen-sized bed, modern amenities, and a sleek bathroom. ', 'standard_room.jpg', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'TV, Air conditioning, Refrigerator, Wi-Fi, Balcony'),
(2, 'Deluxe Room', 100, 'Elevate your stay in our Deluxe Room, which includes all the amenities of our Standard Room, plus additional luxuries such as a king-sized bed, premium toiletries, and a mini fridge stocked with snacks and refreshments.', 'deluxe_room.jpg', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'TV, Air conditioning, Refrigerator, Wi-Fi, Balcony, Garden View'),
(3, 'Suite Room', 150, 'Indulge in the spacious and upgraded amenities of our Suite Room, which features a separate living area with a flat-screen TV, a king-sized bed, a large bathroom with a luxurious bathtub, and stunning views of the city', 'suite_room.jpg', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'TV, Air conditioning, Refrigerator, Wi-Fi, Balcony, City view, Breakfast'),
(4, 'Executive Room', 125, 'Our Executive Room is designed to cater to the needs of business travelers, with features such as an ergonomic workspace, high-speed Wi-Fi, a king-sized bed with luxury linens, and a Nespresso machine for your morning coffee fix.', 'executive_room.jpg', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'TV, Air conditioning, Refrigerator, Wi-Fi, Balcony, City view, Breakfast, Bathrobe & Slippers'),
(5, 'Presidential Suite', 300, 'The epitome of luxury and exclusivity, our Presidential Suite features a grand living area, a master bedroom with a king-sized bed, a private balcony with breathtaking views of the city, and a personal butler to cater to your every need.', 'presidential_suite.jpg', '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(6, 'Family Room', 150, 'A room designed for families with added space and amenities for families. Our spacious and family-friendly room features two queen-sized beds, a mini-fridge, a microwave, and a flat-screen TV with premium channels.', 'family_room.jpg', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'WiFi, TV, Air conditioning, Private bathroom, Balcony, Family Sofa, Desk, Baby bathub'),
(7, 'Studio Room', 90, 'A room with a compact living area and kitchenette. Our Studio Room is perfect for longer stays and guests who desire added space and functionality. In addition to a cozy living area and kitchenette, the room features a queen-sized bed and an ergonomic workspace.', 'studio_room.jpg', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'Kitchenette, Washing machine, Dryer, Ironing board, Work desk, Sitting area, Soundproofing, Black-out curtains'),
(8, 'VIP Room', 200, 'A room with VIP level amenities and services. Treat yourself to the ultimate in luxury and personalized service with our VIP Room, featuring high-end amenities such as a king-sized bed with luxury linens, a personal butler, and exclusive access to our VIP lounge.', 'vip_room.jpg', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'King-size bed, Balcony, Pool, Mini bar, 24/7 room service, Bathrobe, Slippers'),
(9, 'Venue Room', 400, 'A venue room is a space designed for events, meetings, and gatherings. It offers a flexible and convenient solution for businesses and individuals who require a professional environment for their events. The venue room features modern furnishings and state-of-the-art technology, making it an ideal choice for presentations, conferences, and training sessions. The room is equipped with comfortable seating, high-speed internet, and audio-visual equipment, providing a seamless experience for attendees.', 'venue_room.png', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'Audiovisual equipment, Stage lighting, Projector, Sound system, Podium, Microphones, Wi-Fi');

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20230118033414-create-user.js'),
('20230118033415-create-room-type.js'),
('20230118033416-create-room.js'),
('20230118033418-create-order.js'),
('20230118033420-create-order-details.js');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `photo` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('ADMIN','RECEPTIONIST') NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `photo`, `email`, `password`, `role`, `createdAt`, `updatedAt`) VALUES
('@3EKD6E', 'Admin', 'g.JPG', 'admin@gmail.com', '$2b$10$9Lt6DS2/ZzDu2XYL4oIgv.g9GQgTbRdgDeBDeHSKxQdFNEwSCrkX6', 'ADMIN', '2023-01-20 12:13:42', '2023-01-20 12:13:42'),
('@HNBYI8', '9673d74d-2291-44a8-885c-082c5634ce87', 'g.JPG', 'test3', '$2b$10$w/jGou/F/I2dop8LQbg6JOu2kf9kMLb/BQrFO29kfe5dZRLpwRc9m', 'RECEPTIONIST', '2023-01-21 02:53:37', '2023-01-21 02:53:37'),
('@MYDWJ', 'edited428824', 'Slanda.png', 'edited@2jbekf', '$2b$10$Zm6S6U3m02e0B13Np4a2UOmJ5iWYe4aTj75MDmIIxX0mRf1.z7lZu', 'RECEPTIONIST', '2023-01-20 07:27:41', '2023-01-20 13:27:52'),
('@V23C5', 'Indrax', '14_04_2022 04_40_12 - Copy.png', 'indra@gmail.com', '$2b$10$xxpbKXcZzJYq5QyECjMG1.3/sdDPGnlrhvU15vTdOnY2sS7V9zy/S', 'RECEPTIONIST', '2023-01-20 07:51:21', '2023-01-20 07:51:21');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `order_number` (`order_number`),
  ADD KEY `id_room_type` (`id_room_type`),
  ADD KEY `id_user` (`id_user`);

--
-- Indexes for table `order_details`
--
ALTER TABLE `order_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_order` (`id_order`),
  ADD KEY `id_room` (`id_room`);

--
-- Indexes for table `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_room_type` (`id_room_type`);

--
-- Indexes for table `room_types`
--
ALTER TABLE `room_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `order_details`
--
ALTER TABLE `order_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=725;

--
-- AUTO_INCREMENT for table `rooms`
--
ALTER TABLE `rooms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=94;

--
-- AUTO_INCREMENT for table `room_types`
--
ALTER TABLE `room_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`id_room_type`) REFERENCES `room_types` (`id`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`);

--
-- Constraints for table `order_details`
--
ALTER TABLE `order_details`
  ADD CONSTRAINT `order_details_ibfk_1` FOREIGN KEY (`id_order`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `order_details_ibfk_2` FOREIGN KEY (`id_room`) REFERENCES `rooms` (`id`);

--
-- Constraints for table `rooms`
--
ALTER TABLE `rooms`
  ADD CONSTRAINT `rooms_ibfk_1` FOREIGN KEY (`id_room_type`) REFERENCES `room_types` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;


SELECT room_types.*, count(rooms.id) as room_remaining
FROM rooms
LEFT JOIN room_types ON rooms.id_room_type = room_types.id
LEFT JOIN order_details ON order_details.id_room = rooms.id AND order_details.access_date BETWEEN '${checkin_date} 00:00:00' AND '${checkout_date} 23:59:59'
WHERE order_details.access_date IS NULL
GROUP BY room_types.id;

/////////////////////

SELECT order_details.id_room 
FROM order_details 
WHERE access_date BETWEEN '${checkin_date} 00:00:00' AND '${checkout_date} 23:59:59';

//seng bener

SELECT rooms.id as room_id, room_types.id as type_id
FROM rooms
LEFT JOIN room_types ON rooms.id_room_type = room_types.id
LEFT JOIN order_details ON order_details.id_room = rooms.id AND order_details.access_date BETWEEN '${checkin_date} 00:00:00' AND '${checkout_date} 23:59:59'
WHERE order_details.access_date IS NULL