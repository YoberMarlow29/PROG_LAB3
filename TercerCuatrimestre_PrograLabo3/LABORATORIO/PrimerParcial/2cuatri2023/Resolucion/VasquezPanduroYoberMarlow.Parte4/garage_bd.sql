-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-10-2023 a las 16:18:48
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `garage_bd`
--
CREATE DATABASE IF NOT EXISTS `garage_bd` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `garage_bd`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `autos`
--

CREATE TABLE `autos` (
  `patente` varchar(30) NOT NULL,
  `marca` varchar(30) NOT NULL,
  `color` varchar(15) NOT NULL,
  `precio` double NOT NULL,
  `foto` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `autos`
--

INSERT INTO `autos` (`patente`, `marca`, `color`, `precio`, `foto`) VALUES
('ÑE56ER', 'ferrari_modif23', '#ed0707', 9999, 'ÑE56ER.161324.jpg'),
('FNS5456F', 'ROJOa', '#ff0000', 100000, 'sin foto'),
('DNF6545F', 'cheverolet', '#00ff00', 465, 'DNF6545F.144458.jpg'),
('SFS64SDS', 'CITROEN', '#2113dd', 9999, 'SFS64SDS.144606.jpg'),
('SS2FSD2', 'citroen', '#00ff00', 42424, 'SS2FSD2.144803.jpg'),
('fsf', 'sdsd', '#00ff00', 86686, 'fsf.145158.jpg'),
('wtwyw', 'twtwwtwtwwt', '#00ff00', 644646, 'wtwyw.145241.jpg'),
('NO133SFS', 'perian', '#ff0000', 100000, 'sin foto'),
('NKLF343', 'ASASF', '#00ff00', 2, 'NKLF343.150908.jpg'),
('FF42D', 'KHEA', '#7ab62f', 64669, 'FF42D.161314.png'),
('GDGD5F', 'SURAN', '#2448ff', 64669, 'GDGD5F.161301.png'),
('pasn24', 'citroen', '#ff0000', 100000, 'sin foto'),
('neif42', 'citroen', '#896161', 100000, 'sin foto');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
