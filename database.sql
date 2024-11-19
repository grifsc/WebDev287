-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 19, 2024 at 05:23 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `WebDev287`
--

-- --------------------------------------------------------

--
-- Table structure for table `Bookings`
--

CREATE TABLE `Bookings` (
  `id` int(50) NOT NULL,
  `ClientID` int(50) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Service` varchar(100) NOT NULL,
  `Status` varchar(50) NOT NULL,
  `Payment` varchar(50) NOT NULL,
  `Price` varchar(150) NOT NULL,
  `Date` varchar(150) NOT NULL,
  `Time` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Bookings`
--

INSERT INTO `Bookings` (`id`, `ClientID`, `Name`, `Service`, `Status`, `Payment`, `Price`, `Date`, `Time`) VALUES
(1, 3, 'Alice Brown', 'Blastoise Car Cleaning', 'Pending', 'Unpaid', '39.99', 'Mar. 28, 2024', '4:00 PM'),
(2, 4, 'Sarah Knowles', 'Primeape\'s 1h boxing Lesson', 'Pending', 'Unpaid', '59.99', 'Dec. 30, 2024', '12:00 PM'),
(3, 5, 'Michael Turner', 'Sylveon\'s Medical Care', 'Complete', 'Paid', '79.99', 'Oct. 29, 2024', '1:00 PM'),
(4, 6, 'Rebecca Lee', 'Fishing with Cramorant', 'Cancelled', 'Unpaid', '39.99', 'Oct. 28, 2024', '3:00 PM'),
(5, 2, 'John Doe', 'Roasting Smores with Cyndaquil', 'Pending', 'Unpaid', '29.99', 'Dec. 12, 2024', '3:00 PM'),
(6, 7, 'Chris Martin', 'Playing with Togepi', 'Complete', 'Paid', '49.99', 'Oct. 22, 2024', '4:00 PM'),
(7, 8, 'Lily West', 'Jigglypuff Singing a Lullaby', 'Complete', 'Unpaid', '39.99', 'Nov. 16, 2024', '10:00 AM'),
(8, 9, 'Jessica Adams', 'Bring Mr. Mime to your Party', 'Pending', 'Unpaid', '79.99', 'Dec. 30, 2024', '9:00 AM'),
(9, 10, 'Brad Smith', 'Blastoise Car Cleaning', 'Cancelled', 'Unpaid', '39.99', 'Oct. 10, 2024', '2:00 PM'),
(10, 12, 'Evan Scott', 'Fishing with Cramorant', 'Complete', 'Paid', '39.99', 'Oct. 2, 2024', '2:00 PM'),
(11, 11, 'Theo Mannuel', 'Primeape\'s 1h Boxing Lesson', 'Complete', 'Paid', '59.99', 'Oct. 8, 2024', '11:00 AM'),
(12, 13, 'Jane Doe', 'Roasting Smores with Cyndaquil', 'Complete', 'Paid', '29.99', 'Oct. 1, 2024', '12:00 PM');

-- --------------------------------------------------------

--
-- Table structure for table `Contact`
--

CREATE TABLE `Contact` (
  `id` int(50) NOT NULL,
  `Description` varchar(500) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Phone` varchar(50) NOT NULL,
  `Adress` varchar(50) NOT NULL,
  `City` varchar(50) NOT NULL,
  `State` varchar(50) NOT NULL,
  `ZipCode` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Contact`
--

INSERT INTO `Contact` (`id`, `Description`, `Email`, `Phone`, `Adress`, `City`, `State`, `ZipCode`) VALUES
(1, ' We\'d love to hear from you! Whether you have questions about our Pokémon services, need assistance with a booking, or want to share your experience with Pokerent, our team is here to help. Reach out, and let\'s make your Pokémon adventure unforgettable! ', 'pokerent@gmail.com', '(514) 123 - 4567', '123 Made-Up Road', 'Montreal', 'Quebec', 'H1A 123');

-- --------------------------------------------------------

--
-- Table structure for table `Footer`
--

CREATE TABLE `Footer` (
  `ID` int(50) NOT NULL,
  `AboutUs` varchar(500) NOT NULL,
  `Facebook` varchar(50) NOT NULL,
  `Instagram` varchar(50) NOT NULL,
  `Twitter` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Footer`
--

INSERT INTO `Footer` (`ID`, `AboutUs`, `Facebook`, `Instagram`, `Twitter`) VALUES
(1, 'PokéRent brings the magic of Pokémon to everyday life. From cleaning and healing to unforgettable events, our Pokémon partners are ready to lend a hand (or paw)! Rent your ideal Pokémon for any occasion and experience the wonder firsthand.', 'https://www.facebook.com', 'https://www.instagram.com', 'https://x.com/?lang=en');

-- --------------------------------------------------------

--
-- Table structure for table `HomePage`
--

CREATE TABLE `HomePage` (
  `id` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Logo` varchar(150) NOT NULL,
  `Welcome` varchar(150) NOT NULL,
  `Hook` varchar(500) NOT NULL,
  `Why` varchar(500) NOT NULL,
  `Reason1` varchar(500) NOT NULL,
  `Description1` varchar(500) NOT NULL,
  `Reason2` varchar(500) NOT NULL,
  `Description2` varchar(500) NOT NULL,
  `Reason3` varchar(500) NOT NULL,
  `Description3` varchar(500) NOT NULL,
  `BackgroundImg` varchar(500) NOT NULL,
  `Slide1` varchar(500) NOT NULL,
  `Slide2` varchar(500) NOT NULL,
  `Slide3` varchar(500) NOT NULL,
  `Slide4` varchar(500) NOT NULL,
  `Caption1` varchar(500) NOT NULL,
  `Caption2` varchar(500) NOT NULL,
  `Caption3` varchar(500) NOT NULL,
  `Caption4` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `HomePage`
--

INSERT INTO `HomePage` (`id`, `Name`, `Logo`, `Welcome`, `Hook`, `Why`, `Reason1`, `Description1`, `Reason2`, `Description2`, `Reason3`, `Description3`, `BackgroundImg`, `Slide1`, `Slide2`, `Slide3`, `Slide4`, `Caption1`, `Caption2`, `Caption3`, `Caption4`) VALUES
(1, 'PokéRent', '/images/logo.png', 'Welcome to PokéRent!', 'Discover the magic of Pokémon-assisted services! From cleaning to healing, our friendly Pokémon are here to help you with a variety of tasks. Rent a Pokémon for your next project and experience the ease and efficiency of working alongside these amazing creatures. Let\'s make your life easier—one Pokémon at a time!', 'Why Choose Our PokéService Rentals?', 'Expert Assistance', 'Our Pokémon are specially trained to assist with various tasks, ensuring high-quality service every time. Whether it\'s cleaning or healing, our Pokémon have the skills you need!', 'Reliable and Trustworthy', 'We prioritize safety and trust. Each Pokémon in our service has been vetted and trained, so you can rest assured that they will handle your needs with care and professionalism.', 'Affordable Rentals', 'Enjoy competitive pricing on all our Pokémon rentals. We believe everyone should experience the magic of Pokémon assistance without breaking the bank!', '/images/background.jpg', '/images/blastoise-cleaning.jpg', '/images/cramorant-fishing.webp', '/images/togepi-playing.avif', '/images/jigglipuff-singing.webp', 'Your Personal Car Cleaning Champion! Let our water-blasting Pokémon handle the tough grime while you sit back and relax.', 'Casting Lines with Cramorant! Experience a unique fishing adventure as our skilled Pokémon swoops in to catch your dinner—just watch out for the occasional snack!', 'Playtime with Togepi! Experience joy and laughter as this little bundle of happiness brings fun and smiles to your day. Let\'s make magical memories together!', 'Jigglypuff\'s Serenade! Let the enchanting melodies of Jigglypuff soothe your soul as it fills the air with magical tunes. Get ready to sing along and drift into dreamland!');

-- --------------------------------------------------------

--
-- Table structure for table `Services`
--

CREATE TABLE `Services` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `price` varchar(150) NOT NULL,
  `description` varchar(500) NOT NULL,
  `image` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Services`
--

INSERT INTO `Services` (`id`, `name`, `price`, `description`, `image`) VALUES
(1, 'Cleaning with Blastoise', '39.99', 'Let Blastoise take care of your cleaning needs with its powerful water jets, ensuring a spotless home while creating a fun and engaging atmosphere. Experience a clean like never before, as Blastoise tackles dirt and grime with ease!', '/images/9.png'),
(2, 'Primeapes 1h Boxing Lesson', '59.99', 'Join Primeape for an exhilarating one-hour boxing lesson, tailored for all skill levels. Whether you are a beginner looking to learn the basics or an experienced fighter wanting to refine your techniques, Primeapes energetic training will keep you motivated!', '/images/57.png'),
(3, 'Sylveons Medical Care', '79.99', 'Experience compassionate and gentle medical care with Sylveons nurturing approach. Ideal for those seeking health services, Sylveon ensures a comfortable environment that promotes healing and well-being.', '/images/700.png'),
(4, 'Fishing with Cramorant', '39.99', 'Join Cramorant for an exciting fishing adventure, where you will explore the best fishing spots while learning valuable techniques. Enjoy a day out in nature as Cramorant helps you catch unique fish and creates unforgettable memories!', '/images/845.png'),
(5, 'Roasting Smores with Cyndaquil', '29.99', 'Gather around the campfire with Cyndaquil to roast delicious smores in a cozy setting. This delightful experience is perfect for families and friends looking to bond over sweet treats and stories while enjoying the warmth of the fire.', '/images/155.png'),
(6, 'Playing with Togepi', '49.99', 'Enjoy a playful afternoon with Togepi, known for its cheerful spirit and playful antics. This service is perfect for children and families looking to have fun while making new friends in a safe and joyful environment.', '/images/175.png'),
(7, 'Jigglypuff Singing a Lullaby', '39.99', 'Unwind and relax as Jigglypuff serenades you with its soothing lullabies. This calming experience is perfect for those seeking a peaceful atmosphere, making it an excellent addition to your evening routine for stress relief.', '/images/39.png'),
(8, 'Bring Mr. Mime to your Party', '79.99', 'Make your party unforgettable by inviting Mr. Mime! Known for its entertaining antics and magical performances, Mr. Mime will delight guests of all ages, ensuring your event is filled with laughter and joy.', '/images/122.png');

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `id` int(10) NOT NULL,
  `Admin` tinyint(1) NOT NULL,
  `First` varchar(50) NOT NULL,
  `Last` varchar(50) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Password` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`id`, `Admin`, `First`, `Last`, `Email`, `Password`) VALUES
(1, 1, 'Matteo', 'Admin', 'matteo@gmail.com', 'admin'),
(2, 0, 'John', 'Doe', 'john.doe@gmail.com', 'client123'),
(3, 0, 'Alice', 'Brown', 'alice.brown@gmail.com', 'client123'),
(4, 0, 'Sarah', 'Knowles', 'sarah.knowles@gmail.com', 'client123'),
(5, 0, 'Michael', 'Turner', 'michael.turner@gmail.com', 'client123'),
(6, 0, 'Rebecca', 'Lee', 'rebecca.lee@gmail.com', 'client123'),
(7, 0, 'Chris', 'Martin', 'chris.martin@gmail.com', 'client123'),
(8, 0, 'Lily', 'West', 'lily.west@gmail.com', 'client123'),
(9, 0, 'Jessica', 'Adams', 'jessica.adams@gmail.com', 'client123'),
(10, 0, 'Brad', 'Smith', 'brad.smith@gmail.com', 'client123'),
(11, 0, 'Theo', 'Manuel', 'theo.manuel@gmail.com', 'client123'),
(12, 0, 'Evan', 'Scott', 'evan.scott@gmail.com', 'client123'),
(13, 0, 'Jane', 'Doe', 'jane.doe@gmail.com', 'client123');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Bookings`
--
ALTER TABLE `Bookings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Contact`
--
ALTER TABLE `Contact`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Footer`
--
ALTER TABLE `Footer`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `HomePage`
--
ALTER TABLE `HomePage`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Services`
--
ALTER TABLE `Services`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Bookings`
--
ALTER TABLE `Bookings`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `Contact`
--
ALTER TABLE `Contact`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `Footer`
--
ALTER TABLE `Footer`
  MODIFY `ID` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `HomePage`
--
ALTER TABLE `HomePage`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `Services`
--
ALTER TABLE `Services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
