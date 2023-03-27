

CREATE TABLE if not EXISTS `control_equipment` (
  `id` int(10) NOT NULL,
  `name` varchar(100) NOT NULL,
  `postition` varchar(100) NOT NULL,
  `status` VARCHAR(10) NOT NULL DEFAULT "OFF" check (`status` = 'ON' or `status` = 'OFF'),
  `date_add` date NOT NULL DEFAULT CURRENT_DATE,
  `auto` varchar(10) NOT NULL DEFAULT "OFF" check (`status` = 'ON' or `status` = 'OFF'),
  `type` varchar(50) NOT NULL,
  `farm_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE if not EXISTS `data` (
  `id` int(10) NOT NULL,
  `time` datetime NOT NULL,
  `data` FLOAT(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE if not EXISTS `data_equipment` (
  `id` int(10) NOT NULL,
  `name` varchar(100) NOT NULL,
  `postition` varchar(100) NOT NULL,
  `status` varchar(10) NOT NULL DEFAULT 'OFF' check (`status` = 'ON' or `status` = 'OFF'),
  `date_add` date NOT NULL DEFAULT CURRENT_DATE,
  `min` int(11) NOT NULL DEFAULT 0,
  `max` int(11) NOT NULL DEFAULT 0,
  `time` int(11) NOT NULL DEFAULT 0,
  `type` varchar(50) NOT NULL,
  `farm_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE if not EXISTS `farm` (
  `id` int(10) NOT NULL,
  `name` varchar(100) NOT NULL,
  `address` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE if not EXISTS `user` (
  `name` varchar(100) NOT NULL,
  `bdate` date,
  `gender` varchar(20) NOT NULL check (`gender` = 'Nam' or `gender` = 'Nữ' or `gender` = 'Khác'),
  `phone_number` varchar(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(250) NOT NULL,
  `register_at` date NOT NULL,
  `isAdmin` int(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE if not EXISTS `statistical` (
  `id` int(10) NOT NULL,
  `name` int(100) NOT NULL,
  `description` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


ALTER TABLE `control_equipment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `farm_id` (`farm_id`);

ALTER TABLE `data`
  ADD PRIMARY KEY (`id`,`time`),
  ADD KEY `id` (`id`);

ALTER TABLE `data_equipment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `farm_id` (`farm_id`);
ALTER TABLE `farm`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `statistical`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `user`
  ADD PRIMARY KEY (`phone_number`);

ALTER TABLE `control_equipment`
  ADD CONSTRAINT `control_equipment_ibfk_1` FOREIGN KEY (`farm_id`) REFERENCES `farm` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `data`
  ADD CONSTRAINT `data_ibfk_1` FOREIGN KEY (`id`) REFERENCES `data_equipment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `data_equipment`
  ADD CONSTRAINT `data_equipment_ibfk_1` FOREIGN KEY (`farm_id`) REFERENCES `farm` (`id`)  ON DELETE CASCADE ON UPDATE CASCADE;


INSERT INTO `farm` (`id`, `name`, `address`) VALUES
(1, 'Trang trại 1', 'Khu A'),
(2, 'Trang trại 2', 'Khu B'),
(3, 'Trang trại 3', 'Khu C');


