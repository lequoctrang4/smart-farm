

CREATE TABLE `control_equipment` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `postition` varchar(100) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `date_add` date NOT NULL,
  `auto` tinyint(1) NOT NULL,
  `type` varchar(50) NOT NULL,
  `farm_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `data`
--

CREATE TABLE `data` (
  `id` int(11) NOT NULL,
  `time` int(11) NOT NULL,
  `data` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `data_equipment`
--

CREATE TABLE `data_equipment` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `postition` varchar(100) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `date_add` date NOT NULL,
  `min` int(11) NOT NULL,
  `max` int(11) NOT NULL,
  `time` int(11) NOT NULL,
  `type` int(50) NOT NULL,
  `farm_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `farm`
--

CREATE TABLE `farm` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `address` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `farm`
--

INSERT INTO `farm` (`id`, `name`, `address`) VALUES
(1, 'Trang trại 1', 'Khu A'),
(2, 'Trang trại 2', 'Khu B'),
(3, 'Trang trại 3', 'Khu C');

-- --------------------------------------------------------

--
-- Table structure for table `statistical`
--

CREATE TABLE `statistical` (
  `id` int(11) NOT NULL,
  `name` int(100) NOT NULL,
  `des` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `bdate` date NOT NULL,
  `gender` varchar(20) NOT NULL,
  `phone_number` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL,
  `farm_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `bdate`, `gender`, `phone_number`, `email`, `password`, `isAdmin`, `farm_id`) VALUES
('giahuy13', 'Gia Huy', '2002-04-12', 'Nam', '0399609015', 'nguyengiahuy@gmail.com', 'Huy', 0, 1),
('lequoctrang4', 'Lê Quốc Trạng', '2002-03-26', 'Nam', '0399609015', 'lequoctrang4@gmail.com', 'Lequoctrang', 1, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `control_equipment`
--
ALTER TABLE `control_equipment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `farm_id` (`farm_id`);

--
-- Indexes for table `data`
--
ALTER TABLE `data`
  ADD PRIMARY KEY (`id`,`time`),
  ADD KEY `id` (`id`);

--
-- Indexes for table `data_equipment`
--
ALTER TABLE `data_equipment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `farm_id` (`farm_id`);

--
-- Indexes for table `farm`
--
ALTER TABLE `farm`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `statistical`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `farm_id` (`farm_id`);


ALTER TABLE `control_equipment`
  ADD CONSTRAINT `control_equipment_ibfk_1` FOREIGN KEY (`farm_id`) REFERENCES `farm` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `data`
  ADD CONSTRAINT `data_ibfk_1` FOREIGN KEY (`id`) REFERENCES `data_equipment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `data_equipment`
  ADD CONSTRAINT `data_equipment_ibfk_1` FOREIGN KEY (`farm_id`) REFERENCES `farm` (`id`)  ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`farm_id`) REFERENCES `farm` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;
