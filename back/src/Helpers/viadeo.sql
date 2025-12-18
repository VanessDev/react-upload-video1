-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : jeu. 18 déc. 2025 à 08:56
-- Version du serveur : 8.4.3
-- Version de PHP : 8.3.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : viadeo
--

-- --------------------------------------------------------

--
-- Structure de la table comments
--

CREATE TABLE comments (
  id int NOT NULL,
  comment text NOT NULL,
  video_id int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table notations
--

CREATE TABLE notations (
  id int NOT NULL,
  notation int NOT NULL,
  video_id int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table theme
--

CREATE TABLE theme (
  id int NOT NULL,
  name varchar(100) NOT NULL,
  video_id int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table videos
--

CREATE TABLE videos (
  id int NOT NULL,
  title varchar(255) DEFAULT NULL,
  posted_by int DEFAULT '1',
  created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  description text,
  filename varchar(255) DEFAULT NULL,
  original_name varchar(255) DEFAULT NULL,
  mime_type varchar(100) DEFAULT NULL,
  size bigint DEFAULT NULL,
  path varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table videos
--

INSERT INTO videos (id, title, posted_by, created_at, description, filename, original_name, mime_type, size, path) VALUES
(1, 'sqsqssq', 1, '2025-12-17 09:52:21', 'dssdsd', '1765961541045-777197-14906571_3840_2160_30fps.mp4', '14906571_3840_2160_30fps.mp4', 'video/mp4', 71693653, 'C:\\laragon\\www\\react-upload-video\\back\\src\\uploads\\videos\\1765961541045-777197-14906571_3840_2160_30fps.mp4'),
(2, 'Ciel de New York', 1, '2025-12-17 11:04:06', 'Voici une video de new york !', '1765965846032-397003-12234621_2160_3840_30fps.mp4', '12234621_2160_3840_30fps.mp4', 'video/mp4', 47700927, 'C:\\laragon\\www\\react-upload-video\\back\\src\\uploads\\videos\\1765965846032-397003-12234621_2160_3840_30fps.mp4'),
(3, 'Batiments ', 1, '2025-12-17 11:07:29', 'VOici les facades de batiments!', '1765966048732-628745-13641362_3840_2160_25fps.mp4', '13641362_3840_2160_25fps.mp4', 'video/mp4', 46070879, 'C:\\laragon\\www\\react-upload-video\\back\\src\\uploads\\videos\\1765966048732-628745-13641362_3840_2160_25fps.mp4'),
(4, 'Autoroute', 1, '2025-12-17 11:08:27', 'Voici les autoroutes', '1765966106907-423196-14806349_2160_3840_30fps.mp4', '14806349_2160_3840_30fps.mp4', 'video/mp4', 57084861, 'C:\\laragon\\www\\react-upload-video\\back\\src\\uploads\\videos\\1765966106907-423196-14806349_2160_3840_30fps.mp4'),
(5, 'Rivière', 1, '2025-12-17 11:10:21', 'Voici la rivière qui coule!', '1765966219819-267766-14839619_3840_2160_24fps.mp4', '14839619_3840_2160_24fps.mp4', 'video/mp4', 164628296, 'C:\\laragon\\www\\react-upload-video\\back\\src\\uploads\\videos\\1765966219819-267766-14839619_3840_2160_24fps.mp4'),
(6, 'Selfie copines!', 1, '2025-12-17 11:10:50', 'Voici trois copines qui font des seflies', '1765966250393-215953-14847453_1920_1080_30fps.mp4', '14847453_1920_1080_30fps.mp4', 'video/mp4', 2148788, 'C:\\laragon\\www\\react-upload-video\\back\\src\\uploads\\videos\\1765966250393-215953-14847453_1920_1080_30fps.mp4'),
(7, 'Plage!', 1, '2025-12-17 11:11:08', 'voici la plage!', '1765966268214-136204-14876583_3840_2160_30fps.mp4', '14876583_3840_2160_30fps.mp4', 'video/mp4', 26837832, 'C:\\laragon\\www\\react-upload-video\\back\\src\\uploads\\videos\\1765966268214-136204-14876583_3840_2160_30fps.mp4'),
(8, 'Savon rose', 1, '2025-12-17 11:11:49', 'voici des savons roses!', '1765966309133-728278-14881723_1920_1080_30fps.mp4', '14881723_1920_1080_30fps.mp4', 'video/mp4', 28317644, 'C:\\laragon\\www\\react-upload-video\\back\\src\\uploads\\videos\\1765966309133-728278-14881723_1920_1080_30fps.mp4'),
(9, 'Montagnes', 1, '2025-12-17 11:12:08', 'voici des montagnes!', '1765966328631-579391-14901276_2160_3840_50fps.mp4', '14901276_2160_3840_50fps.mp4', 'video/mp4', 16409757, 'C:\\laragon\\www\\react-upload-video\\back\\src\\uploads\\videos\\1765966328631-579391-14901276_2160_3840_50fps.mp4'),
(10, 'Roses', 1, '2025-12-17 11:12:34', 'voici une belle rose', '1765966354299-44150-14901399_1920_1080_25fps.mp4', '14901399_1920_1080_25fps.mp4', 'video/mp4', 3150949, 'C:\\laragon\\www\\react-upload-video\\back\\src\\uploads\\videos\\1765966354299-44150-14901399_1920_1080_25fps.mp4'),
(11, 'Vestiges', 1, '2025-12-17 11:12:59', 'voici des vestiges!', '1765966379288-105900-14903571_3840_2160_25fps.mp4', '14903571_3840_2160_25fps.mp4', 'video/mp4', 14253003, 'C:\\laragon\\www\\react-upload-video\\back\\src\\uploads\\videos\\1765966379288-105900-14903571_3840_2160_25fps.mp4'),
(12, 'La mer', 1, '2025-12-17 11:13:16', 'voici la mer!', '1765966395971-943101-14927527_1440_2560_30fps.mp4', '14927527_1440_2560_30fps.mp4', 'video/mp4', 67557053, 'C:\\laragon\\www\\react-upload-video\\back\\src\\uploads\\videos\\1765966395971-943101-14927527_1440_2560_30fps.mp4'),
(13, 'Un bus', 1, '2025-12-17 11:13:57', 'Un bus passe dans le desert', '1765966437344-688615-19155049-hd_1920_1080_50fps.mp4', '19155049-hd_1920_1080_50fps.mp4', 'video/mp4', 5883275, 'C:\\laragon\\www\\react-upload-video\\back\\src\\uploads\\videos\\1765966437344-688615-19155049-hd_1920_1080_50fps.mp4');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table comments
--
ALTER TABLE comments
  ADD PRIMARY KEY (id),
  ADD KEY fk_comments_video (video_id);

--
-- Index pour la table notations
--
ALTER TABLE notations
  ADD PRIMARY KEY (id),
  ADD KEY fk_notations_video (video_id);

--
-- Index pour la table theme
--
ALTER TABLE theme
  ADD PRIMARY KEY (id),
  ADD KEY fk_theme_video (video_id);

--
-- Index pour la table videos
--
ALTER TABLE videos
  ADD PRIMARY KEY (id);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table comments
--
ALTER TABLE comments
  MODIFY id int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table notations
--
ALTER TABLE notations
  MODIFY id int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table theme
--
ALTER TABLE theme
  MODIFY id int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table videos
--
ALTER TABLE videos
  MODIFY id int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table comments
--
ALTER TABLE comments
  ADD CONSTRAINT fk_comments_video FOREIGN KEY (video_id) REFERENCES videos (id) ON DELETE CASCADE;

--
-- Contraintes pour la table notations
--
ALTER TABLE notations
  ADD CONSTRAINT fk_notations_video FOREIGN KEY (video_id) REFERENCES videos (id) ON DELETE CASCADE;

--
-- Contraintes pour la table theme
--
ALTER TABLE theme
  ADD CONSTRAINT fk_theme_video FOREIGN KEY (video_id) REFERENCES videos (id) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
