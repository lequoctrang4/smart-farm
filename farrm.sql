DROP DATABASE `farm`;
create database if not exists `farm`;
use `farm`;

CREATE TABLE if not EXISTS `control_equipment` (
  `id` varchar(10) NOT NULL,
  `name` varchar(100) NOT NULL,
  `status` int(10) NOT NULL DEFAULT 0,
  `date_add` date NOT NULL DEFAULT CURRENT_DATE,
  `image` varchar(100),
  `farm_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
ALTER TABLE `control_equipment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `farm_id` (`farm_id`);

CREATE TABLE if not EXISTS `data` (
  `id` varchar(10) NOT NULL,
  `time` datetime NOT NULL,
  `data` FLOAT(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE if not EXISTS `data_equipment` (
  `id` varchar(10) NOT NULL,
  `name` varchar(100) NOT NULL,
  `date_add` date NOT NULL DEFAULT CURRENT_DATE,
  `min` int(11) NOT NULL DEFAULT 0,
  `min_action` varchar(10),
  `max` int(11) NOT NULL DEFAULT 0,
  `max_action` varchar(10),
  `auto` int(10) NOT NULL DEFAULT 0,
  `image` varchar(100),
  `farm_id` int(10) NOT NULL,
  FOREIGN KEY (`min_action`) REFERENCES `control_equipment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`max_action`) REFERENCES `control_equipment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE if not EXISTS `farm` (
  `id` int(10) NOT NULL,
  `name` varchar(100) NOT NULL,
  `address` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE if not EXISTS `user` (
  `id` int(10) PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `bdate` date,
  `gender` varchar(20) NOT NULL check (`gender` = 'Nam' or `gender` = 'Nữ' or `gender` = 'Khác'),
  `phone_number` varchar(20) UNIQUE NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(250) NOT NULL,
  `register_at` date NOT NULL,
  `avatar` varchar(100),
  `isAdmin` int(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE if not EXISTS `statistical` (
  `id` int(10) NOT NULL,
  `name` int(100) NOT NULL,
  `description` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



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


ALTER TABLE `control_equipment`
  ADD CONSTRAINT `control_equipment_ibfk_1` FOREIGN KEY (`farm_id`) REFERENCES `farm` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `data`
  ADD CONSTRAINT `data_ibfk_1` FOREIGN KEY (`id`) REFERENCES `data_equipment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;


INSERT INTO `farm` (`id`, `name`, `address`) VALUES
(1, 'Trang trại 1', 'Khu A'),
(2, 'Trang trại 2', 'Khu B'),
(3, 'Trang trại 3', 'Khu C');

INSERT INTO `control_equipment` (`id`, `name`, `status`, `date_add`, `image`, `farm_id`) VALUES
('v10', 'Máy bơm', 0, '2023-04-08', 'v10.jpg', 1),
('v11', 'Đèn', 0, '2023-04-08', 'v11.jpg', 1);

INSERT INTO `data_equipment` (`id`, `name`, `date_add`, `min`, `min_action`, `max`, `max_action`, `image`, `farm_id`) VALUES
('v1', 'Cảm biến nhiệt độ', '2023-04-08', 20, NULL, 30, NULL, 'v1.jpg', 1),
('v2', 'Cảm biến độ ẩm không khí', '2023-04-08', 20, NULL, 30, NULL, 'v2.jpg', 1),
('v3', 'Cảm biến độ ẩm đất', '2023-04-08', 20, 'v10', 30, NULL, 'v3.jpg', 1),
('v4', 'Cảm biến ánh sáng', '2023-04-08', 20, 'v11', 30, NULL, 'v4.jpg', 1);

INSERT INTO `user` (`id`, `name`, `bdate`, `gender`, `phone_number`, `email`, `password`, `register_at`, `avatar`, `isAdmin`) VALUES
(1, 'Lê Quốc Trạng', NULL, 'Khác', '0399609015', 'lequoctrang4@gmail.com', '$2a$12$gFHY6dkZT5iPaYZs/sFOGugJhaK4Wt1op1AoMS67w9EAeDyTxGW7m', '2023-04-08', NULL, 0),
(2, 'Gia Huy', NULL, 'Khác', '0828479273', 'giahuy575621@gmail.com', '$2a$12$ZHWR/vG9wzAXNiWEO7lR4ewi.DnaaQBwKfSe/s62p5ITTC5dCacfq', '2023-04-08', NULL, 0);
