-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: agm_web_site
-- ------------------------------------------------------
-- Server version	10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `advantages`
--

DROP TABLE IF EXISTS `advantages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `advantages` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `subtitle` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `icon` varchar(255) NOT NULL DEFAULT '⭐',
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `advantages`
--

LOCK TABLES `advantages` WRITE;
/*!40000 ALTER TABLE `advantages` DISABLE KEYS */;
INSERT INTO `advantages` VALUES (1,'Private AI Model','0% Hallucinations','Our proprietary, deterministic model — built from the ground up in Bangladesh.','🧠',0,'2026-09-04 21:04:03','2026-09-04 21:04:03'),(2,'Absolute Data Privacy','100% Data Sovereignty','Your data never leaves your environment. No middle-layer storage, ever.','🔐',1,'2026-09-04 21:04:03','2026-09-04 21:04:03'),(3,'Local Expertise, Global Reach','Made in Bangladesh','World-class AI engineering talent, serving enterprises across the globe.','🌏',2,'2026-09-04 21:04:03','2026-09-04 21:04:03'),(4,'End-to-End Capability','15+ AI Products','From analytics to computer vision to robotics — one partner, full stack.','⚙️',3,'2026-09-04 21:04:03','2026-09-04 21:04:03'),(5,'Industry Agnostic','10+ Industries','Proven across banking, manufacturing, agriculture, healthcare and more.','🏢',4,'2026-09-04 21:04:03','2026-09-04 21:04:03');
/*!40000 ALTER TABLE `advantages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache`
--

DROP TABLE IF EXISTS `cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL,
  PRIMARY KEY (`key`),
  KEY `cache_expiration_index` (`expiration`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache`
--

LOCK TABLES `cache` WRITE;
/*!40000 ALTER TABLE `cache` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL,
  PRIMARY KEY (`key`),
  KEY `cache_locks_expiration_index` (`expiration`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache_locks`
--

LOCK TABLES `cache_locks` WRITE;
/*!40000 ALTER TABLE `cache_locks` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache_locks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clients`
--

DROP TABLE IF EXISTS `clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `clients` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `accent` varchar(255) NOT NULL DEFAULT '#0ea5e9',
  `group` enum('clients','pilots') NOT NULL DEFAULT 'clients',
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients`
--

LOCK TABLES `clients` WRITE;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
INSERT INTO `clients` VALUES (1,'SA Plumbing & Heating','sa-plumbing-heating.png','#0ea5e9','clients',0,'2026-09-04 21:04:03','2026-09-04 21:04:03'),(2,'Unique Group','unique-group.png','#8b5cf6','clients',1,'2026-09-04 21:04:03','2026-09-04 21:04:03'),(3,'X Ceramics Group','x-ceramics-limited.png','#f59e0b','clients',2,'2026-09-04 21:04:03','2026-09-04 21:04:03'),(4,'Finlays','finlays.png','#10b981','clients',3,'2026-09-04 21:04:03','2026-09-04 21:04:03'),(5,'Uniglory','uniglory.png','#ef4444','clients',4,'2026-09-04 21:04:03','2026-09-04 21:04:03'),(6,'Popular Group','popular-pharma.webp','#fa5252','pilots',0,'2026-09-04 21:04:03','2026-09-04 21:04:03'),(7,'Renata PLC','renata-icon.png','#15aabf','pilots',1,'2026-09-04 21:04:03','2026-09-04 21:04:03'),(8,'Bata','bata.svg','#e64980','pilots',2,'2026-09-04 21:04:03','2026-09-04 21:04:03');
/*!40000 ALTER TABLE `clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comparisons`
--

DROP TABLE IF EXISTS `comparisons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comparisons` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `feature` varchar(255) NOT NULL,
  `us_value` varchar(255) NOT NULL,
  `them_value` varchar(255) NOT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comparisons`
--

LOCK TABLES `comparisons` WRITE;
/*!40000 ALTER TABLE `comparisons` DISABLE KEYS */;
INSERT INTO `comparisons` VALUES (1,'Data Privacy','100% — your data never leaves your server','Processed on third-party cloud infrastructure',0,'2026-09-04 21:04:03','2026-09-04 21:04:03'),(2,'Hallucinations','Zero — deterministic, rule-based outputs','Frequent — inherent in large language models',1,'2026-09-04 21:04:03','2026-09-04 21:04:03'),(3,'Third-party dependency','None — fully self-contained system','Fully dependent on external AI providers',2,'2026-09-04 21:04:03','2026-09-04 21:04:03'),(4,'Customization depth','Complete — built around your processes','Limited to what the API allows',3,'2026-09-04 21:04:03','2026-09-04 21:04:03'),(5,'Offline capability','Yes — works without internet','Requires constant internet & API access',4,'2026-09-04 21:04:03','2026-09-04 21:04:03'),(6,'Middle layer storage','No middle layer data storage — ever','Data buffered and stored on vendor cloud',5,'2026-09-04 21:04:03','2026-09-04 21:04:03'),(7,'Compliance & audit','Full audit trail, local data sovereignty','Data may cross international jurisdictions',6,'2026-09-04 21:04:03','2026-09-04 21:04:03');
/*!40000 ALTER TABLE `comparisons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contact_messages`
--

DROP TABLE IF EXISTS `contact_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contact_messages` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `company` varchar(255) DEFAULT NULL,
  `message` text NOT NULL,
  `is_read` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact_messages`
--

LOCK TABLES `contact_messages` WRITE;
/*!40000 ALTER TABLE `contact_messages` DISABLE KEYS */;
INSERT INTO `contact_messages` VALUES (1,'Test User','test@example.com','+8801700000000','Test Co','Hello ABC AI System, please contact me about PULSE.',0,'2026-09-04 21:16:46','2026-09-04 21:24:55');
/*!40000 ALTER TABLE `contact_messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `core_values`
--

DROP TABLE IF EXISTS `core_values`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `core_values` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `icon` varchar(255) NOT NULL DEFAULT '?',
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `core_values`
--

LOCK TABLES `core_values` WRITE;
/*!40000 ALTER TABLE `core_values` DISABLE KEYS */;
INSERT INTO `core_values` VALUES (1,'Innovation First','Continuously pushing boundaries in AI research — building solutions that did not exist before.','💡',0,'2026-09-04 21:04:03','2026-09-04 21:04:03'),(2,'Data Privacy & Security','100% client data sovereignty — data never passes through intermediate storage or pre-trained models.','🔒',1,'2026-09-04 21:04:03','2026-09-04 21:04:03'),(3,'Zero Hallucination','Precise, deterministic outputs — eliminating the unreliability of traditional AI models entirely.','🎯',2,'2026-09-04 21:04:03','2026-09-04 21:04:03'),(4,'Client-Centricity','Every solution is designed around client needs — seamless integration, scalability, and measurable ROI.','🤝',3,'2026-09-04 21:04:03','2026-09-04 21:04:03');
/*!40000 ALTER TABLE `core_values` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `failed_jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `industries`
--

DROP TABLE IF EXISTS `industries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `industries` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `icon` varchar(255) NOT NULL DEFAULT '?',
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `industries`
--

LOCK TABLES `industries` WRITE;
/*!40000 ALTER TABLE `industries` DISABLE KEYS */;
INSERT INTO `industries` VALUES (1,'Banking & Finance','🏦',0,'2026-09-04 21:04:03','2026-09-04 21:04:03'),(2,'Manufacturing','🏭',1,'2026-09-04 21:04:03','2026-09-04 21:04:03'),(3,'Retail & Wholesale','🛒',2,'2026-09-04 21:04:03','2026-09-04 21:04:03'),(4,'Agriculture','🌾',3,'2026-09-04 21:04:03','2026-09-04 21:04:03'),(5,'Real Estate','🏗️',4,'2026-09-04 21:04:03','2026-09-04 21:04:03'),(6,'Healthcare','🏥',5,'2026-09-04 21:04:03','2026-09-04 21:04:03'),(7,'Logistics & Shipping','🚢',6,'2026-09-04 21:04:03','2026-09-04 21:04:03'),(8,'Government','🏛️',7,'2026-09-04 21:04:03','2026-09-04 21:04:03'),(9,'Smart Buildings','🏢',8,'2026-09-04 21:04:03','2026-09-04 21:04:03'),(10,'BPO','💼',9,'2026-09-04 21:04:03','2026-09-04 21:04:03');
/*!40000 ALTER TABLE `industries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_batches`
--

DROP TABLE IF EXISTS `job_batches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_batches`
--

LOCK TABLES `job_batches` WRITE;
/*!40000 ALTER TABLE `job_batches` DISABLE KEYS */;
/*!40000 ALTER TABLE `job_batches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) unsigned NOT NULL,
  `reserved_at` int(10) unsigned DEFAULT NULL,
  `available_at` int(10) unsigned NOT NULL,
  `created_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `methodologies`
--

DROP TABLE IF EXISTS `methodologies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `methodologies` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `icon` varchar(255) NOT NULL DEFAULT '?',
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `methodologies`
--

LOCK TABLES `methodologies` WRITE;
/*!40000 ALTER TABLE `methodologies` DISABLE KEYS */;
INSERT INTO `methodologies` VALUES (1,'Problem Identification','Pinpoint the real business challenge with stakeholders.','🔍',0,'2026-09-04 21:04:03','2026-09-04 21:04:03'),(2,'Scope Analysis','Define boundaries, data, and success criteria.','📐',1,'2026-09-04 21:04:03','2026-09-04 21:04:03'),(3,'Research','Investigate methods and design the approach.','🔬',2,'2026-09-04 21:04:03','2026-09-04 21:04:03'),(4,'Prototype Dev','Build a rapid, testable prototype.','🧪',3,'2026-09-04 21:04:03','2026-09-04 21:04:03'),(5,'Solution Refinement','Iterate on the prototype with real-world feedback.','🛠️',4,'2026-09-04 21:04:03','2026-09-04 21:04:03'),(6,'Final Development','Engineer the production-grade solution.','💻',5,'2026-09-04 21:04:03','2026-09-04 21:04:03'),(7,'Validation & Deploy','Rigorous validation, then deployment & support.','🚀',6,'2026-09-04 21:04:03','2026-09-04 21:04:03');
/*!40000 ALTER TABLE `methodologies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'0001_01_01_000000_create_users_table',1),(2,'0001_01_01_000001_create_cache_table',1),(3,'0001_01_01_000002_create_jobs_table',1),(4,'2026_09_05_000001_create_settings_table',2),(5,'2026_09_05_000002_create_statistics_table',2),(6,'2026_09_05_000003_create_services_table',2),(7,'2026_09_05_000004_create_products_table',2),(8,'2026_09_05_000005_create_team_members_table',2),(9,'2026_09_05_000006_create_clients_table',2),(10,'2026_09_05_000007_create_industries_table',2),(11,'2026_09_05_000008_create_tech_domains_table',2),(12,'2026_09_05_000009_create_core_values_table',2),(13,'2026_09_05_000010_create_advantages_table',2),(14,'2026_09_05_000011_create_methodologies_table',2),(15,'2026_09_05_000012_create_contact_messages_table',2),(16,'2026_09_05_000013_create_comparisons_table',2);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `tag` varchar(255) DEFAULT NULL,
  `metric` varchar(255) DEFAULT NULL,
  `description` text NOT NULL,
  `features` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`features`)),
  `logo` varchar(255) DEFAULT NULL,
  `demo` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`demo`)),
  `is_flagship` tinyint(1) NOT NULL DEFAULT 1,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'PULSE','Analytics','< 1 sec Query Response','Ask any business question in Bangla or English and get instant live insights from your ERP. No SQL, no data analyst, no waiting.','[\"Natural language queries \\u2014 Bangla & English\",\"Auto-generated dashboards & live reports\",\"Connects to any ERP without ETL\",\"No middle layer data storage\"]','pluse.jpeg','{\"kind\":\"pulse\",\"queries\":[\"Show top 5 products by total spending\",\"What are the most popular sales categories?\",\"Calculate revenue vs cost for all products\"],\"sidebar\":[\"Query\",\"Reports\",\"Database\",\"History\"],\"databases\":3,\"steps\":[\"Understand\",\"Scan data\",\"Build report\"],\"chartLabel\":\"Revenue by category\",\"topLabel\":\"Top products\",\"topItems\":[[\"Label A\",\"$32k\"],[\"Label B\",\"$27k\"],[\"Label C\",\"$21k\"],[\"Label D\",\"$16k\"],[\"Label E\",\"$13k\"]]}',1,0,1,'2026-09-04 21:04:03','2026-09-04 21:04:03'),(2,'Brain ClerK','PDF Intelligence','Any PDF Business Documents','Upload any business-related PDF. Brain ClerK extracts the key data, generates a clear report, and saves it securely for future access.','[\"Invoices, sales, finance & operational PDFs\",\"Automatically extracts key business data\",\"Generates structured, ready-to-use reports\",\"Saves every report\"]','brainclerk-logo.jpg','{\"kind\":\"clerk\",\"sidebar\":[\"PDF Library\",\"Extracted Data\",\"Reports\",\"Saved\"],\"files\":[\"Quarterly_Sales_Report.pdf\",\"Supplier_Cost_Analysis.pdf\",\"Operations_Performance.pdf\"],\"steps\":[\"Read PDF\",\"Extract Data\",\"Generate Report\",\"Save Report\"]}',1,1,1,'2026-09-04 21:04:03','2026-09-04 21:04:03'),(3,'DotLog','Computer Vision','99.8% Face Recognition Accuracy','Your existing CCTV cameras become a full attendance system overnight. No hardware, no fingerprints, no queues.','[\"Works with existing CCTV cameras\",\"No-touch face recognition at entry\",\"Real-time logs & payroll exports\",\"Multi-site & multi-shift support\"]','dotlog-logo.png','{\"kind\":\"dotlog\",\"title\":\"AI Touch-less Smart Attendance\",\"subtitle\":\"CCTV-powered \\u00b7 Real-time logs\",\"entries\":[[\"EMP-023\",\"Arafat Rahman\",\"09:12:28 AM\",\"present\"],[\"EMP-027\",\"Samira Jahan\",\"09:14:02 AM\",\"present\"],[\"EMP-031\",\"Rakib Hasan\",\"09:17:41 AM\",\"present\"]]}',1,2,1,'2026-09-04 21:04:03','2026-09-04 21:04:03'),(4,'Light OCR','Mobile AI','< 3 sec Invoice to ERP','Point any phone camera at a financial document. AI extracts all data and posts to your accounting system in under 3 seconds.','[\"Any Android or iOS camera\",\"Invoices, receipts, bank statements\",\"Posts to ERP in under 3 seconds\",\"Offline-first with auto-sync\"]','lightocr-logo.png','{\"kind\":\"lightocr\",\"sidebar\":[\"Dashboard\",\"Process OCR\",\"Saved data\",\"Company list\",\"Vendor list\"],\"docs\":[\"invoice_6980616f.pdf\",\"invoice_69804b81.jpeg\"]}',1,3,1,'2026-09-04 21:04:03','2026-09-04 21:04:03'),(5,'Moina','Conversational AI','24/7 Always Active','Understands Bangla, English, and local dialects — and executes complex business workflows autonomously. It acts, not just answers.','[\"Bangla, English & regional dialects\",\"Autonomous multi-step workflow execution\",\"Deep integration with your systems\",\"Round-the-clock operations\"]','moina-logo.svg','{\"kind\":\"moina\",\"messages\":[\"Assalamu alaikum! Ki bhabe shahajjo korte pari?\",\"Apnar appointment booking complete korechi. CBC report ready.\"],\"items\":[[\"Healthcare AI\",\"active\"],[\"Voice language\",\"bn-bd\"],[\"Appointment booking\",\"realtime\"],[\"CBC report\",\"generated\"]]}',1,4,1,'2026-09-04 21:04:03','2026-09-04 21:04:03'),(6,'Smart BMS','IoT · Building Automation','30% Energy Savings','Integrated monitoring, lighting automation, utility metering, and floor-wise control via Ethernet backbone with open protocol architecture — BACnet/IP, DALI, Modbus, CANbus, LoRa/BLE.','[\"Lighting control \\u2014 zone, schedule & motion\",\"Energy metering \\u2014 kW, kWh, PF per floor\",\"AC, fire alarm, elevator & UPS monitoring\",\"BACnet\\/IP \\u00b7 DALI \\u00b7 Modbus \\u00b7 LoRa\\/BLE protocols\"]','smart-bms-logo.png','{\"kind\":\"bms\",\"title\":\"Smart BMS \\u00b7 Online\",\"subtitle\":\"Ethernet backbone \\u00b7 Open protocols\",\"protocols\":[\"BACnet\\/IP\",\"DALI\",\"Modbus\",\"CANbus\",\"LoRa\\/BLE\"]}',1,5,1,'2026-09-04 21:04:03','2026-09-04 21:04:03'),(7,'Blens','AI Business Assistant',NULL,'Voice AI chief of staff — calendar, emails, WhatsApp, and your schedule — all hands-free.','[]','blens-card-logo.png',NULL,0,0,1,'2026-09-04 21:04:03','2026-09-04 21:04:03'),(8,'Sohojogi','Voice Order Management',NULL,'Retailers speak orders in Bangla. Auto-invoiced, inventory updated, fully offline.','[]','sohojogi-card-logo.png',NULL,0,1,1,'2026-09-04 21:04:03','2026-09-04 21:04:03'),(9,'Booking Model','Web Data Extraction',NULL,'Reads buyer portals, posts to ERP — no API, no manual entry, 100% accuracy.','[]','booking-model-logo-v3.png',NULL,0,2,1,'2026-09-04 21:04:03','2026-09-04 21:04:03'),(10,'Proxy Eye','Computer Vision QC',NULL,'Detects fabric defects, construction anomalies, and security threats in real time.','[]','proxy-eye-card-logo.png',NULL,0,3,1,'2026-09-04 21:04:03','2026-09-04 21:04:03'),(11,'Validex AI','Trade Finance AI',NULL,'Validates LC documents against bank rules before submission. Zero discrepancies.','[]','validex-ai-logo.png',NULL,0,4,1,'2026-09-04 21:04:03','2026-09-04 21:04:03'),(12,'AgroRx','Agricultural AI Platform',NULL,'AI-powered crop monitoring, disease detection, and precision farming recommendations for Bangladeshi agriculture.','[]','agrorx-card-logo.svg',NULL,0,5,1,'2026-09-04 21:04:03','2026-09-04 21:04:03');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `services` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `slug` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `subtitle` varchar(255) DEFAULT NULL,
  `icon` varchar(255) NOT NULL DEFAULT '?',
  `color` varchar(255) NOT NULL DEFAULT '#2563eb',
  `color_light` varchar(255) NOT NULL DEFAULT '#eff6ff',
  `intro` text DEFAULT NULL,
  `description` text NOT NULL,
  `features` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`features`)),
  `benefits` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`benefits`)),
  `usecases` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`usecases`)),
  `hero_image` varchar(255) DEFAULT NULL,
  `gallery_images` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`gallery_images`)),
  `stats` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`stats`)),
  `steps` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`steps`)),
  `why_us` text DEFAULT NULL,
  `featured_on_home` tinyint(1) NOT NULL DEFAULT 1,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `services_slug_unique` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT INTO `services` VALUES (1,'proprietary-ai-products','Flagship AI Products','Deploy in Days, Not Months','🚀','#2563eb','#eff6ff','Our flagship AI product suite covers analytics, document intelligence, computer vision, conversational AI and building automation. Each product is fully built, tested and ready to be configured to your environment.','Deploy any of our 15 ready-built AI solutions directly into your operations — live in days, not months.','[\"Ready-to-deploy fully tested\",\"Customizable to your workflows\",\"Full onboarding & staff training\",\"Ongoing support & updates\"]','[\"No Pre-trained Models\",\"Zero hallucinations\",\"100% data privacy\",\"Offline capability\",\"Rapid deployment\"]','[\"ERP analytics via natural language\",\"Document extraction & posting\",\"AI attendance via CCTV\",\"Bangla voice chatbots\",\"Mobile OCR to ERP\"]','https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&auto=format&fit=crop&q=80','[\"https:\\/\\/images.unsplash.com\\/photo-1677442135703-1787eea5ce01?w=1200&auto=format&fit=crop&q=80\",\"https:\\/\\/images.unsplash.com\\/photo-1620712943543-bcc4688e7485?w=1200&auto=format&fit=crop&q=80\",\"https:\\/\\/images.unsplash.com\\/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80\"]','[{\"value\":\"15+\",\"label\":\"Ready Products\"},{\"value\":\"Days\",\"label\":\"Deployment Time\"},{\"value\":\"0\",\"label\":\"Hallucinations\"},{\"value\":\"100%\",\"label\":\"Data Privacy\"}]','[{\"title\":\"Discovery\",\"desc\":\"Understand your environment, data and goals.\"},{\"title\":\"Configuration\",\"desc\":\"Fit the product to your processes and data.\"},{\"title\":\"Integration\",\"desc\":\"Connect with your ERP, CCTV or infrastructure.\"},{\"title\":\"Validation\",\"desc\":\"Rigorous testing with your real-world data.\"},{\"title\":\"Go-Live\",\"desc\":\"Deploy, train your team and launch.\"},{\"title\":\"Support\",\"desc\":\"Continuous optimization and updates.\"}]','Every flagship product runs entirely on our proprietary AI model — no pre-trained models, no third-party APIs, and absolute data privacy.',1,0,'2026-09-04 21:04:03','2026-09-04 21:04:03'),(2,'custom-ai-development','Custom AI Development','Built From Scratch on Our Proprietary Model','🧩','#7c3aed','#f3efff','When off-the-shelf solutions cannot capture your complexity, we design and engineer a custom AI system tailored to your exact workflows — fully owned by you.','Bespoke AI systems built from the ground up on our Proprietary Model. No templates. No compromises.','[\"End-to-end development\",\"No Pre-trained Models\",\"Full system integration\",\"Source code ownership available\"]','[\"Fully custom to your workflow\",\"Proprietary AI Model\",\"Complete data sovereignty\",\"IP ownership available\",\"Long-term partnership\"]','[\"Custom NLP for local dialects\",\"Industry-specific computer vision\",\"Bespoke decision support systems\",\"Custom reasoning models\",\"AI-augmented ERP workflows\"]','https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&auto=format&fit=crop&q=80','[\"https:\\/\\/images.unsplash.com\\/photo-1581091226825-a6a2a5aee158?w=1200&auto=format&fit=crop&q=80\",\"https:\\/\\/images.unsplash.com\\/photo-1524178232363-1fb2b075b655?w=1200&auto=format&fit=crop&q=80\",\"https:\\/\\/images.unsplash.com\\/photo-1554224155-6726b3ff858f?w=1200&auto=format&fit=crop&q=80\"]','[{\"value\":\"12+\",\"label\":\"Custom Builds\"},{\"value\":\"100%\",\"label\":\"Proprietary Model\"},{\"value\":\"0\",\"label\":\"Pre-trained Models\"},{\"value\":\"6mo\",\"label\":\"Avg. Delivery\"}]','[{\"title\":\"Discovery & Requirements\",\"desc\":\"Deep-dive into your business problem.\"},{\"title\":\"Architecture Design\",\"desc\":\"Design the model and integration blueprint.\"},{\"title\":\"Prototype & Validate\",\"desc\":\"Rapid prototype proven with real data.\"},{\"title\":\"Full Development\",\"desc\":\"Engineering the production AI system.\"},{\"title\":\"Integration & Testing\",\"desc\":\"Connect and validate end-to-end.\"},{\"title\":\"Deployment & Handover\",\"desc\":\"Go-live with full documentation & IP transfer.\"}]','Unlike competitors who wrap traditional AI models, we build from scratch. You get full IP ownership and a team that stays with you long after go-live.',1,1,'2026-09-04 21:04:03','2026-09-04 21:04:03'),(3,'ai-research-rnd','AI Research & R&D','Pushing the Boundaries of Proprietary AI','🔬','#0ea5e9','#eff8ff','Bring a research question, a domain challenge, or a moonshot idea. Our lab partners with you to invent, validate and publish.','Collaborative research partnerships pushing ML, NLP, Computer Vision, and Reasoning Models forward.','[\"Cutting-edge research capability\",\"Joint IP development\",\"Published research & white papers\",\"Lab access & co-innovation\"]','[\"Access to private AI lab\",\"Joint IP ownership\",\"Published outcomes\",\"Long-term research contracts\",\"Bangladesh + global talent\"]','[\"ML model development for specialized domains\",\"Low-resource NLP for Bangla\",\"Computer vision for manufacturing QC\",\"Reasoning model development\",\"Decision support R&D\"]','https://images.unsplash.com/photo-1737644467636-6b0053476bb2?w=1200&auto=format&fit=crop&q=80','[\"https:\\/\\/images.unsplash.com\\/photo-1737644467636-6b0053476bb2?w=1200&auto=format&fit=crop&q=80\",\"https:\\/\\/images.unsplash.com\\/photo-1620712943543-bcc4688e7485?w=1200&auto=format&fit=crop&q=80\",\"https:\\/\\/images.unsplash.com\\/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80\"]','[{\"value\":\"5+\",\"label\":\"Years of R&D\"},{\"value\":\"3\",\"label\":\"Research Labs\"},{\"value\":\"15+\",\"label\":\"Engineers\"},{\"value\":\"100%\",\"label\":\"Proprietary\"}]','[{\"title\":\"Problem Definition\",\"desc\":\"Frame the research question clearly.\"},{\"title\":\"Literature & Landscape Review\",\"desc\":\"Map existing work and gaps.\"},{\"title\":\"Hypothesis & Experimentation\",\"desc\":\"Design and run controlled experiments.\"},{\"title\":\"Model Development\",\"desc\":\"Build the new proprietary model.\"},{\"title\":\"Validation & Benchmarking\",\"desc\":\"Prove performance against baselines.\"},{\"title\":\"Deployment & Documentation\",\"desc\":\"Publish, patent or productize.\"}]','ABC AI System is the only AI R&D partner in Bangladesh with a fully Proprietary AI Model. Your research data never leaves your environment.',1,2,'2026-09-04 21:04:03','2026-09-04 21:04:03'),(4,'ai-training-capacity','AI Training & Capacity','Enable Your Teams to Own AI','🎓','#059669','#ecfdf5','AI succeeds only when people can run it. We build your internal capability with hands-on programs in Bangla and English.','Structured programs that enable your teams to use, manage, and govern AI with confidence.','[\"Hands-on workshops & labs\",\"AI governance frameworks\",\"Team certification programs\",\"Custom learning paths\"]','[\"Role-based learning paths\",\"Bangla & English delivery\",\"Hands-on with real tools\",\"Certification on completion\",\"On-site & remote options\"]','[\"AI literacy for C-suite\",\"Technical AI practitioner programs\",\"Prompt engineering workshops\",\"AI governance & compliance training\",\"Department-specific AI use cases\"]','https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&auto=format&fit=crop&q=80','[\"https:\\/\\/images.unsplash.com\\/photo-1524178232363-1fb2b075b655?w=1200&auto=format&fit=crop&q=80\",\"https:\\/\\/images.unsplash.com\\/photo-1554224155-6726b3ff858f?w=1200&auto=format&fit=crop&q=80\",\"https:\\/\\/images.unsplash.com\\/photo-1558494949-ef010cbdcc31?w=1200&auto=format&fit=crop&q=80\"]','[{\"value\":\"500+\",\"label\":\"Professionals Trained\"},{\"value\":\"2\",\"label\":\"Delivery Languages\"},{\"value\":\"12\",\"label\":\"Module Tracks\"},{\"value\":\"100%\",\"label\":\"Hands-On\"}]','[{\"title\":\"Assessment\",\"desc\":\"Evaluate current AI maturity.\"},{\"title\":\"Curriculum Design\",\"desc\":\"Tailor role-based learning paths.\"},{\"title\":\"Hands-On Labs\",\"desc\":\"Practice with our real tools.\"},{\"title\":\"Governance Training\",\"desc\":\"Embed responsible AI practices.\"},{\"title\":\"Certification\",\"desc\":\"Validate team capability.\"},{\"title\":\"Continuous Enablement\",\"desc\":\"Ongoing upskilling as AI evolves.\"}]','We train on the proprietary AI model itself — not generic abstractions — so your team governs and operates real, deployed intelligence.',1,3,'2026-09-04 21:04:03','2026-09-04 21:04:03'),(5,'ai-audit-compliance','AI Audit & Compliance','Independent, Rigorous AI Evaluation','🛡️','#d97706','#fffbeb','Before you deploy or after, our engineers audit your AI stack for accuracy, hallucination rate, bias, data security and regulatory compliance.','Independent, rigorous evaluation of any AI system — whether built by ABC AI System or a third party — for accuracy, hallucination rate, bias, data security, and full regulatory compliance.','[\"Hallucination audit\",\"Security & privacy assessment\",\"Compliance certification\",\"Ongoing monitoring\"]','[\"Vendor-neutral evaluation\",\"Regulatory compliance\",\"Detailed audit reports\",\"Bias detection\",\"Security risk mapping\"]','[\"Pre-deployment AI audits\",\"Regulatory compliance review\",\"Third-party AI vendor assessment\",\"Ongoing AI performance monitoring\",\"Data privacy risk assessments\"]','https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&auto=format&fit=crop&q=80','[\"https:\\/\\/images.unsplash.com\\/photo-1554224155-6726b3ff858f?w=1200&auto=format&fit=crop&q=80\",\"https:\\/\\/images.unsplash.com\\/photo-1558494949-ef010cbdcc31?w=1200&auto=format&fit=crop&q=80\",\"https:\\/\\/images.unsplash.com\\/photo-1486325212027-8081e485255e?w=1200&auto=format&fit=crop&q=80\"]','[{\"value\":\"100%\",\"label\":\"Coverage\"},{\"value\":\"0\",\"label\":\"Bias Tolerance\"},{\"value\":\"24h\",\"label\":\"Response\"},{\"value\":\"Full\",\"label\":\"Audit Trail\"}]','[{\"title\":\"Scoping\",\"desc\":\"Define audit boundaries and criteria.\"},{\"title\":\"Data & Model Review\",\"desc\":\"Inspect models, data flows and storage.\"},{\"title\":\"Bias & Accuracy Testing\",\"desc\":\"Empirical hallucination & bias tests.\"},{\"title\":\"Security Assessment\",\"desc\":\"Penetration and privacy risk mapping.\"},{\"title\":\"Report & Certification\",\"desc\":\"Detailed report and compliance cert.\"},{\"title\":\"Monitoring\",\"desc\":\"Ongoing performance surveillance.\"}]','Vendor-neutral by design — we audit any AI system, including our own, with the same rigor.',0,4,'2026-09-04 21:04:03','2026-09-04 21:04:03'),(6,'iot-automation','IoT and Robotics','Intelligent Physical Infrastructure','🤖','#dc2626','#fef2f2','From sensor design to real-time dashboards, we connect the physical world to your AI model for autonomous decisions.','End-to-end IoT infrastructure for smart factories, intelligent offices, and precision agriculture.','[\"Custom sensor network design\",\"Real-time monitoring dashboards\",\"Predictive maintenance systems\",\"Cloud & edge integration\"]','[\"Full infrastructure design\",\"AI-powered analytics\",\"Edge + cloud deployment\",\"Predictive intelligence\",\"Multi-site management\"]','[\"Smart factory automation\",\"Agricultural IoT & precision farming\",\"Smart office building management\",\"Cold chain monitoring\",\"Industrial predictive maintenance\"]','https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&auto=format&fit=crop&q=80','[\"https:\\/\\/images.unsplash.com\\/photo-1485827404703-89b55fcc595e?w=1200&auto=format&fit=crop&q=80\",\"https:\\/\\/images.unsplash.com\\/photo-1581092160562-40aa08e78837?w=1200&auto=format&fit=crop&q=80\",\"https:\\/\\/images.unsplash.com\\/photo-1581092918056-0c4c3acd3789?w=1200&auto=format&fit=crop&q=80\"]','[{\"value\":\"10k+\",\"label\":\"Sensors Deployed\"},{\"value\":\"35%\",\"label\":\"Energy Saved Avg.\"},{\"value\":\"99.9%\",\"label\":\"Uptime\"},{\"value\":\"Edge\",\"label\":\"First-Class\"}]','[{\"title\":\"Feasibility Study\",\"desc\":\"Survey the physical environment.\"},{\"title\":\"Sensor Architecture\",\"desc\":\"Design node, gateway and network layout.\"},{\"title\":\"Deployment\",\"desc\":\"Install and commission hardware.\"},{\"title\":\"AI Integration\",\"desc\":\"Connect streams to the proprietary model.\"},{\"title\":\"Dashboard & Alerts\",\"desc\":\"Real-time visual intelligence.\"},{\"title\":\"Optimization\",\"desc\":\"Continuous tuning and expansion.\"}]','We cover the full stack — sensors, gateways, edge processing, and proprietary AI analytics — under one team.',1,5,'2026-09-04 21:04:03','2026-09-04 21:04:03'),(7,'big-data-mining','Big Data & Mining','From Noise to Intelligence','📊','#0891b2','#ecfeff','We engineer automated pipelines that discover patterns and anomalies in your enterprise data — at any scale.','Automated pipelines that extract actionable intelligence from large-scale, messy data.','[\"Automated data pipeline engineering\",\"Pattern recognition & anomaly detection\",\"BI dashboards & intelligence reports\",\"Data lake architecture\"]','[\"Automated data processing\",\"Real-time intelligence\",\"Scalable architecture\",\"AI-powered analysis\",\"Multi-source integration\"]','[\"Sales & operations analytics\",\"Customer behavior analysis\",\"Supply chain intelligence\",\"Financial risk pattern detection\",\"Social media data mining\"]','https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80','[\"https:\\/\\/images.unsplash.com\\/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80\",\"https:\\/\\/images.unsplash.com\\/photo-1558494949-ef010cbdcc31?w=1200&auto=format&fit=crop&q=80\",\"https:\\/\\/images.unsplash.com\\/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80\"]','[{\"value\":\"PB\",\"label\":\"Scale Ready\"},{\"value\":\"24\\/7\",\"label\":\"Pipe Processing\"},{\"value\":\"50+\",\"label\":\"Source Types\"},{\"value\":\"0\",\"label\":\"Data Egress\"}]','[{\"title\":\"Data Audit\",\"desc\":\"Map sources, quality and volume.\"},{\"title\":\"Pipeline Engineering\",\"desc\":\"Build automated ingestion & cleaning.\"},{\"title\":\"Model Fitting\",\"desc\":\"Train proprietary mining models.\"},{\"title\":\"Pattern Discovery\",\"desc\":\"Surface anomalies and insights.\"},{\"title\":\"Visual Intelligence\",\"desc\":\"Dashboards your teams will use.\"},{\"title\":\"Governance\",\"desc\":\"Access control and audit trails.\"}]','Your data is analyzed by our proprietary model inside your environment — never shipped to a cloud vendor.',1,6,'2026-09-04 21:04:03','2026-09-04 21:04:03'),(8,'erp-implementation','ERP Implementation','Oracle & SAP, Augmented by AI','🗂️','#4f46e5','#eef2ff','We implement Oracle and SAP ERP — then place a proprietary AI layer on top so complex workflows run themselves.','Oracle and SAP ERP with our proprietary AI automation layer on top.','[\"Oracle & SAP certified consultants\",\"AI automation layer on ERP workflows\",\"Post-go-live support & optimization\",\"User training & change management\"]','[\"Certified ERP consultants\",\"AI-augmented workflows\",\"Reduced manual effort\",\"Faster go-live\",\"Ongoing optimization\"]','[\"Oracle ERP implementation\",\"SAP S\\/4HANA rollout\",\"ERP + AI document automation\",\"ERP + OCR for invoice processing\",\"Multi-entity ERP consolidation\"]','https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&auto=format&fit=crop&q=80','[\"https:\\/\\/images.unsplash.com\\/photo-1664575602276-acd073f101bc?w=1200&auto=format&fit=crop&q=80\",\"https:\\/\\/images.unsplash.com\\/photo-1554224155-6726b3ff858f?w=1200&auto=format&fit=crop&q=80\",\"https:\\/\\/images.unsplash.com\\/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80\"]','[{\"value\":\"100%\",\"label\":\"Certified Teams\"},{\"value\":\"2x\",\"label\":\"Faster Go-Live\"},{\"value\":\"50%\",\"label\":\"Manual Work Cut\"},{\"value\":\"24\\/7\",\"label\":\"Post-Go-Live Care\"}]','[{\"title\":\"Assessment\",\"desc\":\"Evaluate processes and legacy systems.\"},{\"title\":\"Blueprint\",\"desc\":\"Design the target ERP architecture.\"},{\"title\":\"Build & Configure\",\"desc\":\"Configure Oracle\\/SAP modules.\"},{\"title\":\"AI Layer\",\"desc\":\"Automate workflows with proprietary AI.\"},{\"title\":\"Testing\",\"desc\":\"Validate end-to-end business scenarios.\"},{\"title\":\"Go-Live & Support\",\"desc\":\"Cutover, training and optimization.\"}]','We pair certified enterprise ERP expertise with an AI automation layer that no vanilla implementation offers.',1,7,'2026-09-04 21:04:03','2026-09-04 21:04:03'),(9,'ar-vr-mr','AR / VR / MR','Immersive Enterprise Experiences','🥽','#9333ea','#faf5ff','Translate complex training and design problems into immersive experiences your people can learn and act inside.','Immersive AR/VR/MR for enterprise training, simulation, product visualization, and remote collaboration.','[\"Custom AR\\/VR application development\",\"Industrial training simulations\",\"Product & architectural visualization\",\"Remote collaboration environments\"]','[\"Immersive learning outcomes\",\"Safer hands-on training\",\"Visual sales & design review\",\"Remote collaboration\",\"Measurable retention gains\"]','[\"Industrial safety training\",\"Equipment maintenance simulation\",\"Real estate & architecture walkthroughs\",\"Remote expert support\",\"Product design reviews\"]','https://images.unsplash.com/photo-1626379953822-baec19c3accd?w=1200&auto=format&fit=crop&q=80','[\"https:\\/\\/images.unsplash.com\\/photo-1626379953822-baec19c3accd?w=1200&auto=format&fit=crop&q=80\",\"https:\\/\\/images.unsplash.com\\/photo-1593508512255-86ab42a8e620?w=1200&auto=format&fit=crop&q=80\",\"https:\\/\\/images.unsplash.com\\/photo-1617802690992-15d93263d3a9?w=1200&auto=format&fit=crop&q=80\"]','[{\"value\":\"3D\",\"label\":\"Native Experiences\"},{\"value\":\"90%\",\"label\":\"Retention Boost\"},{\"value\":\"100%\",\"label\":\"On-Premise Option\"},{\"value\":\"24\\/7\",\"label\":\"Remote Support\"}]','[{\"title\":\"Use Case Discovery\",\"desc\":\"Pinpoint highest-ROI immersive scenarios.\"},{\"title\":\"Experience Design\",\"desc\":\"Storyboard interactions and assets.\"},{\"title\":\"3D Asset Creation\",\"desc\":\"Model your environments & products.\"},{\"title\":\"Development\",\"desc\":\"Build the AR\\/VR\\/MR application.\"},{\"title\":\"Pilot Testing\",\"desc\":\"Validate with real users.\"},{\"title\":\"Deployment\",\"desc\":\"Roll out across the enterprise.\"}]','We combine immersive development with proprietary AI — for adaptive, intelligent training that responds to the learner.',1,8,'2026-09-04 21:04:03','2026-09-04 21:04:03');
/*!40000 ALTER TABLE `services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) unsigned DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('1m0NgWUoSywpNQGgFKnT8I5lJpo4QAb5wK2h0Aw1',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.26100.9168','YTozOntzOjY6Il90b2tlbiI7czo0MDoiQUpSNlc0SFFQVFREcG5GNGUwUUt4SExON01VY0JHd3NrYmZFQkplYSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzI6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC90ZWNobm9sb2d5IjtzOjU6InJvdXRlIjtzOjEwOiJ0ZWNobm9sb2d5Ijt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==',1788580344),('208eY3Rwcq7vLEAkvyCdwFbFbn7xLp0bX1E9kLsZ',1,'127.0.0.1','Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.26100.9168','YTo0OntzOjY6Il90b2tlbiI7czo0MDoiTXVpa0RWaDBTaW05V04xSzViQVFVcThjMGFjWGtweVlLMWVnYVkwNSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjc6Imh0dHA6Ly8xMjcuMC4wLjE6ODA4MS9sb2dpbiI7czo1OiJyb3V0ZSI7czo1OiJsb2dpbiI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fXM6NTA6ImxvZ2luX3dlYl81OWJhMzZhZGRjMmIyZjk0MDE1ODBmMDE0YzdmNThlYTRlMzA5ODlkIjtpOjE7fQ==',1788578640),('2faxqYtqMTWcRei2yDKZkWQIoKvAFnnQk6RLiRPK',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.26100.9168','YTozOntzOjY6Il90b2tlbiI7czo0MDoiaENpNDMyN2t2Q2JXc3VlenVVeXIyMkI1SVNsVzJSbFZURWRZTmg5NiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7czo0OiJob21lIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==',1788580548),('2zD1ajyEaH6QUzLmHUWyheGvFzwAJFdG7863aUVN',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.26100.9168','YTozOntzOjY6Il90b2tlbiI7czo0MDoiS3QydGlzb2pGQ1Zpd2RtRlhrakx6RXZnSVQ0NW1hNXZqSHVybFJveSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NTQ6Imh0dHA6Ly8xMjcuMC4wLjE6ODA4MS9zZXJ2aWNlcy9wcm9wcmlldGFyeS1haS1wcm9kdWN0cyI7czo1OiJyb3V0ZSI7czoxMzoic2VydmljZXMuc2hvdyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1788578183),('3MscKi5aMd7eNKDlIpJRcUAFucvap3qwR1M045Au',1,'127.0.0.1','curl/8.21.0','YTo0OntzOjY6Il90b2tlbiI7czo0MDoicWJBT3o1RmdhcHRrRXBxbVBUOWY5aExKTFd2Q1RIT1d0TDNaZlR5SCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NDM6Imh0dHA6Ly8xMjcuMC4wLjE6ODA4MS9hZG1pbi9zZXR0aW5ncy8xL2VkaXQiO3M6NToicm91dGUiO3M6MTk6ImFkbWluLnNldHRpbmdzLmVkaXQiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjUwOiJsb2dpbl93ZWJfNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI7aToxO30=',1788579050),('596t6TFx9xmoN1dFHxSaiD9FJ3B4NdkQVpuLXdVS',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.26100.9168','YTozOntzOjY6Il90b2tlbiI7czo0MDoiT0JMZTJPTGY3bHFZRXVWeFoxamVpNkZwc0VNS0dPY0FEcTNkTlpLeSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODA4MSI7czo1OiJyb3V0ZSI7czo0OiJob21lIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==',1788578198),('a9oEndeJpATDIH40H2ja0sI8421jQCgIxnow1ZK1',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.26100.9168','YTozOntzOjY6Il90b2tlbiI7czo0MDoibEZIRWxzTUtXSHVZOHJyZ1A4QVBGcjFHWVZvT2RyOUpQckFrcEttTyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzI6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9pbmR1c3RyaWVzIjtzOjU6InJvdXRlIjtzOjEwOiJpbmR1c3RyaWVzIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==',1788580307),('aVnWJOf6U5zR6Vy4nvBlFVQRXq75P7Xfr1R0ItYa',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.26100.9168','YTozOntzOjY6Il90b2tlbiI7czo0MDoiRTZSd3RES1I1ZlExNHRJWmszV1BheUVnVmljVzFNSFkyTG90WGk1ciI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9wcm9kdWN0cyI7czo1OiJyb3V0ZSI7czo4OiJwcm9kdWN0cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1788580305),('AXL6mGmiFvZg8xxurVE0KxOeGmfB65ZtO6zAbTOX',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.26100.9168','YTozOntzOjY6Il90b2tlbiI7czo0MDoibFFTeGdYY2YxQ0pUWFkzT0xGa01vM0dzYjFhbDE1a2VKNnJIa1VoMyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjc6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9sb2dpbiI7czo1OiJyb3V0ZSI7czo1OiJsb2dpbiI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1788579841),('ayFAGP6ZCCZHTfH3XHjro9Yd02y4QxbCQHMgtrO3',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.26100.9168','YTozOntzOjY6Il90b2tlbiI7czo0MDoiNzdLdTd0bjNXVDFxYjd5UHNmWnlkUXVqQzVHOFEzNE5FbmxxcFljaiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7czo0OiJob21lIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==',1788580371),('bEJvsgIePj5f3OrA5zQVS5mJdj1h3BjL9XMgA9Ij',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.26100.9168','YTozOntzOjY6Il90b2tlbiI7czo0MDoieHhGemZIdEs5T3hnRVdpQWlhVnNkc1ZBOXdLTWdsQWJ5b3RBd2hjMSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9wcm9kdWN0cyI7czo1OiJyb3V0ZSI7czo4OiJwcm9kdWN0cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1788580317),('bH9W5lD2Jaddp16IRt02pKMtJyMU9uyB9eNwAWJw',1,'127.0.0.1','Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.26100.9168','YTo0OntzOjY6Il90b2tlbiI7czo0MDoiTGVFRmQ4VG5WRjZ3UVZGQmVuV3FYS00xUVVEd1RTM0N6N1NyeDFhaiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjc6Imh0dHA6Ly8xMjcuMC4wLjE6ODA4MS9hZG1pbiI7czo1OiJyb3V0ZSI7czoxNToiYWRtaW4uZGFzaGJvYXJkIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6MTt9',1788578665),('BRLrnGVvPB8w6QDXHfxq0PYDPZJenZ970msik3Of',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.26100.9168','YTozOntzOjY6Il90b2tlbiI7czo0MDoicU40elViWVNNc2pHMVpUdW5oNGh5SkZpS09MRDhzeUNzSndyYklLciI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODA4MSI7czo1OiJyb3V0ZSI7czo0OiJob21lIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==',1788578182),('csGUQJQRSNwtqLJzXCECXg6lMnMoXN2MlkLPpXBG',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.26100.9168','YTozOntzOjY6Il90b2tlbiI7czo0MDoiQUtoaG50c2xOTTNOYWt4aEh1UU5CWk1jaDJHbWh6WlRjMGV3RmFxeCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7czo0OiJob21lIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==',1788579840),('cXqszkjXFTp9bLCx7bhWZyVVfeCM0e6DZFos7cnx',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.26100.9168','YTozOntzOjY6Il90b2tlbiI7czo0MDoiUHBQQzRyQ001MHNJbnhNWnBsNmNnVUhKSWRvS3FXa0FnMERETURnSCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjc6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hYm91dCI7czo1OiJyb3V0ZSI7czo1OiJhYm91dCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1788580343),('d5dP3m5BhiG4JSqNk1qGu3RAQl3nJnUdCiqAEYpj',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.26100.9168','YTozOntzOjY6Il90b2tlbiI7czo0MDoiaFlLYVY1aU5zbHNKSGZlMWN5d0VWVFlRMHRXVmtTVWFqS1lOaE5mOSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9wcm9kdWN0cyI7czo1OiJyb3V0ZSI7czo4OiJwcm9kdWN0cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1788580344),('e30RoNFgbvuuv7RsKV74qCDI0u0VgiFvhtu4EvbH',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.26100.9168','YTozOntzOjY6Il90b2tlbiI7czo0MDoienVEMm1xVVQ3dzhVbjM5dHBtQ29WYkVYMGQyamFrRHdxenVFbG93MiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7czo0OiJob21lIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==',1788580563),('eYNxGS3GOQqMbWUPYbKOqJAs0RRU0ZWcyDmyKTLA',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.26100.9168','YTozOntzOjY6Il90b2tlbiI7czo0MDoiZ2VpejV0Y0VIT3JSbmU5UHduWldFSXNOV1E1WjdNaGE4UkpKVnp6VyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NTQ6Imh0dHA6Ly8xMjcuMC4wLjE6ODA4MS9zZXJ2aWNlcy9wcm9wcmlldGFyeS1haS1wcm9kdWN0cyI7czo1OiJyb3V0ZSI7czoxMzoic2VydmljZXMuc2hvdyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1788578198),('FF49rUsOR2h6E2v3DCwTlK6o7WiGgOvrbPfWnyoL',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.26100.9168','YTozOntzOjY6Il90b2tlbiI7czo0MDoidFZIZHU1c0hLSnFIRlZ0enp4c3ZwWVZqcW9zNmFFbWtHNEVMNmpXaSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjk6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9jb250YWN0IjtzOjU6InJvdXRlIjtzOjc6ImNvbnRhY3QiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1788580373),('ftnj0cJPTnDa9enDyqjc8iAzhjjy1MaMmLYIwAGP',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.26100.9168','YTozOntzOjY6Il90b2tlbiI7czo0MDoiVmZybVhhVHVmRmJTRlZDRTBFV2ZxdnhZRFM4WXljSHltWks1ZTlXZCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NTQ6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9zZXJ2aWNlcy9wcm9wcmlldGFyeS1haS1wcm9kdWN0cyI7czo1OiJyb3V0ZSI7czoxMzoic2VydmljZXMuc2hvdyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1788580345),('gOjqW3LUB0J2SLQRML6P5SHq5ortBA4cAIhWzQVx',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.26100.9168','YTozOntzOjY6Il90b2tlbiI7czo0MDoia2dYSWVuc2lYdzJkTUEyOGpVcVlYTDg3azk1MkJIaHI2Z2NsVWxORCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzI6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9pbmR1c3RyaWVzIjtzOjU6InJvdXRlIjtzOjEwOiJpbmR1c3RyaWVzIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==',1788580372),('GV6tncjNhShyALttAzmhez9rQBpymiKQ71doG9Ek',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.26100.9168','YTozOntzOjY6Il90b2tlbiI7czo0MDoiQWZYRG9ETlFvSGFrUzZBdGdqRm5uVEl2aEFvZEhuV2lNRkUxRHpxUCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NTQ6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9zZXJ2aWNlcy9wcm9wcmlldGFyeS1haS1wcm9kdWN0cyI7czo1OiJyb3V0ZSI7czoxMzoic2VydmljZXMuc2hvdyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1788580372),('H03xsBjbzb9Szlfrb1W35e0bSQj8jFxLVXkrtLFg',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.26100.9168','YTozOntzOjY6Il90b2tlbiI7czo0MDoiNVAyTGVuTUV4bDhYU2h5aUFiQjJNUHBHTTVYd3NCdDJjTnVOdURHWSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9zZXJ2aWNlcyI7czo1OiJyb3V0ZSI7czoxNDoic2VydmljZXMuaW5kZXgiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1788580344),('h26XojNOIjVyektKhEn2de3s4GFr21sSPyP07wi7',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.26100.9168','YTozOntzOjY6Il90b2tlbiI7czo0MDoidERMRFBiSnZpMXpJbThVaEN2enMyeXUxMUVsTm9uN0xQZ2Y3MENwOSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzI6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC90ZWNobm9sb2d5IjtzOjU6InJvdXRlIjtzOjEwOiJ0ZWNobm9sb2d5Ijt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==',1788580306),('igHSxUNnMrUwzmcp4P7rBvDoQB91xuhFZysc7nWc',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.26100.9168','YTozOntzOjY6Il90b2tlbiI7czo0MDoibkdEUk14NXZqTHYxY2JHUlNaSFFPS3Ywa2hVYTdHQzZaRk1iZ3V4NiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7czo0OiJob21lIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==',1788580323),('J2z7IkxIK1h39NvI9LwGdcjiW0oicaOMOcStrW6I',1,'127.0.0.1','curl/8.21.0','YTo1OntzOjY6Il90b2tlbiI7czo0MDoiR1NpbjJKbXlydjJZTDB4T3h3cGtzNW5xMUNreFFvNlBhUnJGcGR3TiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mzg6Imh0dHA6Ly8xMjcuMC4wLjE6ODA4MS9hZG1pbi9zdGF0aXN0aWNzIjtzOjU6InJvdXRlIjtzOjIyOiJhZG1pbi5zdGF0aXN0aWNzLmluZGV4Ijt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MTp7aTowO3M6Njoic3RhdHVzIjt9czozOiJuZXciO2E6MDp7fX1zOjUwOiJsb2dpbl93ZWJfNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI7aToxO3M6Njoic3RhdHVzIjtzOjIwOiJUZWFtIG1lbWJlciBjcmVhdGVkLiI7fQ==',1788578735),('JCQ2ujijXic07pqeyqvXCn41VkXUeecUflFITaet',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.26100.9168','YTozOntzOjY6Il90b2tlbiI7czo0MDoibzF6MFVJZFJuZVdzTTY1SXZKY0ZQTXdoaHV1QnR2ZmR3V0N2c2ZVcCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjc6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hYm91dCI7czo1OiJyb3V0ZSI7czo1OiJhYm91dCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1788580371),('jOvhSbCHplONpDetPsdqmDqla3FOA1nbaDuMI3Y4',NULL,'127.0.0.1','curl/8.21.0','YTozOntzOjY6Il90b2tlbiI7czo0MDoidG01RDlFYmU4VVMyRDFKczdrbEJtM09sSDV2NjRiRk1jdTFFa2JjQyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7czo0OiJob21lIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==',1788579730),('kfvysYOEnfYpUXDSRZD76extaneKLq8LVV57bRdS',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.26100.9168','YTozOntzOjY6Il90b2tlbiI7czo0MDoiZUtPTUlXR1NnOWhibVpNUjdYSE1zZWd5Z3V3ckM4SVo1bTdoM1lycyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjc6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hYm91dCI7czo1OiJyb3V0ZSI7czo1OiJhYm91dCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1788580318),('l73AVGhQVZzX0Lexsm6ZAbjvEQobrIl7jQrrqC9e',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.26100.9168','YTozOntzOjY6Il90b2tlbiI7czo0MDoibUtoblZ3aVYzVG85ZzRlTDgyWHJxY3loR2lrOEt1ODBVcEtRWE1KVyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7czo0OiJob21lIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==',1788580317),('LpHphV79YZ1Tyqqkqkt5BBKDjWE45OjUppNHtbi4',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.26100.9168','YTozOntzOjY6Il90b2tlbiI7czo0MDoiN1BOTlVQNVAxNHlGNmQ1OUV2d25kQmJqd1Nrelk5dTBYbFliVEYwMCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjc6Imh0dHA6Ly8xMjcuMC4wLjE6ODA4MS9sb2dpbiI7czo1OiJyb3V0ZSI7czo1OiJsb2dpbiI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1788578624),('NdOZimYhnc4JHByMKpMCF8uM4y0aGwNRSX64QsJw',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.26100.9168','YTozOntzOjY6Il90b2tlbiI7czo0MDoiWmFWMVIxbzhEdEkxUHE3MXlCcHNISmp1aVpzaWwyNHhHSzBISGxBSCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NTQ6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9zZXJ2aWNlcy9wcm9wcmlldGFyeS1haS1wcm9kdWN0cyI7czo1OiJyb3V0ZSI7czoxMzoic2VydmljZXMuc2hvdyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1788580306),('NxpAVG5keZFn57QLwYH1woGDWhIqyrsDLZXiTlt5',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.26100.9168','YTozOntzOjY6Il90b2tlbiI7czo0MDoiSU5BaldvcXJyM3JUUTExZTdTd1FGSXlrZlEybkxLeUdBbVJUVnQ3YiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9zZXJ2aWNlcyI7czo1OiJyb3V0ZSI7czoxNDoic2VydmljZXMuaW5kZXgiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1788580371),('oCfnwS55lwljHH8MiOuktk3c61vDOZ1n23sw360s',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.26100.9168','YTozOntzOjY6Il90b2tlbiI7czo0MDoiWlp0N3pCS3NZNmpGS2VPY21zcDk3V1RSNHdUUHVaWVJvUzcyajlMTyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzI6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC90ZWNobm9sb2d5IjtzOjU6InJvdXRlIjtzOjEwOiJ0ZWNobm9sb2d5Ijt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==',1788580372),('OyBI91WeJSHPLwl2QPhvnWrS80Y7B7csXUyfvzzK',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.26100.9168','YTozOntzOjY6Il90b2tlbiI7czo0MDoiSVVSNE93U0lYa1lJYzM0d01LR1R1cFBaQmx0bEY4Mzl0aGt3VE1LRSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzI6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9sZWFkZXJzaGlwIjtzOjU6InJvdXRlIjtzOjEwOiJsZWFkZXJzaGlwIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==',1788580373),('p2GABjNILEhINxCD3URdx4tNMRGJIuIvY3fWiV6n',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.26100.9168','YTozOntzOjY6Il90b2tlbiI7czo0MDoiS2ZhQWdZQ2VCOGxiNFVmT1Q3QlU2RUVISnlWcjlrdUxWR0VWVGUwZSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NTQ6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9zZXJ2aWNlcy9wcm9wcmlldGFyeS1haS1wcm9kdWN0cyI7czo1OiJyb3V0ZSI7czoxMzoic2VydmljZXMuc2hvdyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1788580550),('pG1Ol8scgAILLWs2vPJIauov9cndzKbEGHvOWnJ2',1,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36','YTo1OntzOjY6Il90b2tlbiI7czo0MDoid2paSUpPYzUzYjdTcFNqTlJaWTRySk9SeDdHaHlIR0VqWFVJbEUxNyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7czo0OiJob21lIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czozOiJ1cmwiO2E6MDp7fXM6NTA6ImxvZ2luX3dlYl81OWJhMzZhZGRjMmIyZjk0MDE1ODBmMDE0YzdmNThlYTRlMzA5ODlkIjtpOjE7fQ==',1788582609),('prRFQVEMatKsmiL7D8qpIhCzDCv5ORql7BgWCURH',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.26100.9168','YTozOntzOjY6Il90b2tlbiI7czo0MDoiUFhGWmxZRWlnVlhZdmkzU0RpWHJ5T0FrRzhOcHc0YnVzRVpuTmE4VSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODA4MSI7czo1OiJyb3V0ZSI7czo0OiJob21lIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==',1788578175),('QY3riWiNZo1xqNWm71ry0mdQ1aQpKwOxrAlYYkVR',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.26100.9168','YTozOntzOjY6Il90b2tlbiI7czo0MDoiSXhhdHptNE1FN2IxcHJmRENHU1lmaFdXNWI4T2s2bFFrcmFaYXpvRyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NTQ6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9zZXJ2aWNlcy9wcm9wcmlldGFyeS1haS1wcm9kdWN0cyI7czo1OiJyb3V0ZSI7czoxMzoic2VydmljZXMuc2hvdyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1788580373),('R76EG3PaKWAH95b1wnYT6mrd9IjRimE3fqThh8fV',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.26100.9168','YTozOntzOjY6Il90b2tlbiI7czo0MDoiQXBCeUdIZXRiTG8zMFF1aFl5WlprSm1pc2NqRVJPZEhtTnI5MlZucSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9zZXJ2aWNlcyI7czo1OiJyb3V0ZSI7czoxNDoic2VydmljZXMuaW5kZXgiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1788580318),('Re5PWBGYN9gQpvEOR8RXHwrzYgUVblPLFBpCRfiP',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.26100.9168','YTozOntzOjY6Il90b2tlbiI7czo0MDoiaDVRbTR5NFJZUTlQdVM1Z0x2VVU2NDBXNGF0Qzl5clZVVGdocmJuNSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9wcm9kdWN0cyI7czo1OiJyb3V0ZSI7czo4OiJwcm9kdWN0cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1788580371),('sGcF8Jwj6Wr1xOaAOYYuI4nHs0v0CphdZJgcn7ZJ',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.26100.9168','YTo0OntzOjY6Il90b2tlbiI7czo0MDoiZ3M4UlRtNWZmUEg1SGRLQzJtVlczOEFadEZVMlhYZnNoVU54U2RtdiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjc6Imh0dHA6Ly8xMjcuMC4wLjE6ODA4MS9sb2dpbiI7czo1OiJyb3V0ZSI7czo1OiJsb2dpbiI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fXM6MzoidXJsIjthOjE6e3M6ODoiaW50ZW5kZWQiO3M6MzY6Imh0dHA6Ly8xMjcuMC4wLjE6ODA4MS9hZG1pbi9tZXNzYWdlcyI7fX0=',1788578601),('sKXroCv41fJKhf2TzkuXId5Aysh03XeMBDKnLt8Q',1,'127.0.0.1','Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.26100.9168','YTo0OntzOjY6Il90b2tlbiI7czo0MDoiWVNORWNCYUVjY01LaW5OWFlqVXMzQ1p5ckY1QVZGNjNIRzFyNDZGNiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzE6Imh0dHA6Ly8xMjcuMC4wLjE6ODA4MS9kYXNoYm9hcmQiO3M6NToicm91dGUiO3M6OToiZGFzaGJvYXJkIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6MTt9',1788578680),('TCPdPdq5gGhxSBasRQQOGtIQa8moJWDe4xyAhSk6',1,'127.0.0.1','curl/8.21.0','YTo0OntzOjY6Il90b2tlbiI7czo0MDoiaXBDenJFMmdMRWdjb0tjYkNQUm1GQktDdE9BeW8xcTRtaTJVMjRodCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NDM6Imh0dHA6Ly8xMjcuMC4wLjE6ODA4MS9hZG1pbi9wcm9kdWN0cy8xL2VkaXQiO3M6NToicm91dGUiO3M6MTk6ImFkbWluLnByb2R1Y3RzLmVkaXQiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjUwOiJsb2dpbl93ZWJfNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI7aToxO30=',1788579089),('TJcfeCtZ06AueD2gPWaEsVM1rfB5OgnYWZDiVwpm',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.26100.9168','YTozOntzOjY6Il90b2tlbiI7czo0MDoiZmY5a2l0aTc2eURuUHE0YUNaY2x5Z3M4d01uQWRmeVA3TldCSVlHNCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7czo0OiJob21lIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==',1788580558),('TQAIfgp87E6I9kCLzPHTeZjUdXLonGm5fDcRMrXn',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.26100.9168','YTozOntzOjY6Il90b2tlbiI7czo0MDoiQ0lPRVI5SWhlY003N0I4SWpTem5PaGxhSmdiT1ZIY2RPYTFZYVZGYSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7czo0OiJob21lIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==',1788580343),('TuncFeoA5iWJv0cuLXVKR5rCat4CeJ5I3eQsCQkm',1,'127.0.0.1','Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.26100.9168','YTo1OntzOjY6Il90b2tlbiI7czo0MDoibnlzNHVnbFlqUGF1ZWJFRG96UVFKQjBEVkJyTlQ5RXlQc0hLVVhsTCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mzg6Imh0dHA6Ly8xMjcuMC4wLjE6ODA4MS9hZG1pbi9zdGF0aXN0aWNzIjtzOjU6InJvdXRlIjtzOjIyOiJhZG1pbi5zdGF0aXN0aWNzLmluZGV4Ijt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MTp7aTowO3M6Njoic3RhdHVzIjt9czozOiJuZXciO2E6MDp7fX1zOjUwOiJsb2dpbl93ZWJfNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI7aToxO3M6Njoic3RhdHVzIjtzOjE4OiJTdGF0aXN0aWMgY3JlYXRlZC4iO30=',1788578720),('tVxjrFt4oiMJ58yLecLmYI4hIRZGwfRQOfgVZ7QL',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.26100.9168','YTozOntzOjY6Il90b2tlbiI7czo0MDoiM245Z0J3ZEhNQktjQ1ZqS3ZNRzdxRERlcHFVUEpJQUpyMTJYbEV5SCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NTQ6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9zZXJ2aWNlcy9wcm9wcmlldGFyeS1haS1wcm9kdWN0cyI7czo1OiJyb3V0ZSI7czoxMzoic2VydmljZXMuc2hvdyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1788579841),('v52xgCCHVNN2qPU9zAfDufGjAj6Hcu9tCdgTfaPm',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.26100.9168','YTozOntzOjY6Il90b2tlbiI7czo0MDoiMzRKSkloVFEwaUF0d0pteUljWXBQRkdMUWM0c3Zxd3pjQjhBYXlUTSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzI6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9pbmR1c3RyaWVzIjtzOjU6InJvdXRlIjtzOjEwOiJpbmR1c3RyaWVzIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==',1788580344),('v9ZjIfyYOQNQHshmnQFaycPeBC9UWaktru8GoNpt',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.26100.9168','YTozOntzOjY6Il90b2tlbiI7czo0MDoiZlJxbExpSVB1RU1CcXNpRXp3WDAwRnZXaEdxRDZ0WUc4Q0xTTVR2SCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjk6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9jb250YWN0IjtzOjU6InJvdXRlIjtzOjc6ImNvbnRhY3QiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1788580345),('vmGFoJ6OU2c55OV6Hbvnlb74Hj9KKBPLovITPLgC',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.26100.9168','YTozOntzOjY6Il90b2tlbiI7czo0MDoidmhGWE9EbmkzdDRZb1RrY2V3cjNEZUEyNm00NVY0Q2tKMkhUOVJDaCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7czo0OiJob21lIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==',1788579833),('wbpyOEh5usie4ToHkozWsfzRbtJBE6WRmfFWdeeg',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.26100.9168','YTozOntzOjY6Il90b2tlbiI7czo0MDoiQjJIQ21pZjJuRkplSE52TXBmYldMcjI1UE9vendDY2l0MDFxNXFNRCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzI6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9sZWFkZXJzaGlwIjtzOjU6InJvdXRlIjtzOjEwOiJsZWFkZXJzaGlwIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==',1788580345),('Wj6ufLftsaZ0TX8hCGWRkgE1MvIdqh4AY6T3uKcm',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.26100.9168','YTozOntzOjY6Il90b2tlbiI7czo0MDoiclNuUXF4TW5EYnAxcGFpbDhxczlOUWIxWHhrbjNmZ2toSE9hYzVrNiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjk6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9jb250YWN0IjtzOjU6InJvdXRlIjtzOjc6ImNvbnRhY3QiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1788580307),('wk0vzRtzBL2b0VUdMaO1xiRr5vRtaiFP8PCGAaeC',1,'127.0.0.1','Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.26100.9168','YTo1OntzOjY6Il90b2tlbiI7czo0MDoiOTdCS0dnUjhxUk9ra2g3WTA3T3Vod2JLRU52WkdSQU12blpKV2wzbyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mzg6Imh0dHA6Ly8xMjcuMC4wLjE6ODA4MS9hZG1pbi9zdGF0aXN0aWNzIjtzOjU6InJvdXRlIjtzOjIyOiJhZG1pbi5zdGF0aXN0aWNzLmluZGV4Ijt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MTp7aTowO3M6Njoic3RhdHVzIjt9czozOiJuZXciO2E6MDp7fX1zOjUwOiJsb2dpbl93ZWJfNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI7aToxO3M6Njoic3RhdHVzIjtzOjIzOiJNZXNzYWdlIG1hcmtlZCBhcyByZWFkLiI7fQ==',1788578695),('XrbtRdCk6Ciptd5UsqZN0bsjTwkSCJEXovCTy50r',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.26100.9168','YTozOntzOjY6Il90b2tlbiI7czo0MDoidWhOUnpFU0RRZGE0TkE3V1ZFZlhwU0M5alZYODZ6aWh2UnpkQkVSRyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjc6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hYm91dCI7czo1OiJyb3V0ZSI7czo1OiJhYm91dCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1788580305),('xtGN4xDg6gMKyLEACTU7wIkv9URQIQWuRIVYIFls',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.26100.9168','YTozOntzOjY6Il90b2tlbiI7czo0MDoiNTFReHl4djlSUzBYZW91QnJEMG1IQXkyOUxjQXpZMnNTcGI2Zm9jSSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7czo0OiJob21lIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==',1788580305),('xuNHeNRrWq7QJIAA6Gmc4BZ0E7Y1hDXjU2NVyXtB',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.26100.9168','YTozOntzOjY6Il90b2tlbiI7czo0MDoiZGdhVkVyYWV4aWN0NUJWWXYzN0lXYlBkb3RmWHAxdm9QOUxNMmoxUSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9zZXJ2aWNlcyI7czo1OiJyb3V0ZSI7czoxNDoic2VydmljZXMuaW5kZXgiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1788580306),('YKOqZ1bwUuqnlw7GOYVHxymfi7dxAHO4ImXv2uhN',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.26100.9168','YTozOntzOjY6Il90b2tlbiI7czo0MDoickJNejREYldKZkd3bzVvYW5qR2hleFlDUW1JN1J1RFhkR2h6ZDF2MCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODA4MSI7czo1OiJyb3V0ZSI7czo0OiJob21lIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==',1788578206),('z0wMKbowCaOiSMybvG3tIgoOZlzovOURLBvxfmkm',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.26100.9168','YTozOntzOjY6Il90b2tlbiI7czo0MDoiQmVwZ2tOVlF6NDB5bzdjSGhUMkdqbk9YRUxmcm90eWpjSWtGTmo4RyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzI6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9sZWFkZXJzaGlwIjtzOjU6InJvdXRlIjtzOjEwOiJsZWFkZXJzaGlwIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==',1788580307);
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `settings`
--

DROP TABLE IF EXISTS `settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `settings` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `key` varchar(255) NOT NULL,
  `value` text DEFAULT NULL,
  `group` varchar(255) NOT NULL DEFAULT 'general',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `settings_key_unique` (`key`),
  KEY `settings_group_index` (`group`)
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `settings`
--

LOCK TABLES `settings` WRITE;
/*!40000 ALTER TABLE `settings` DISABLE KEYS */;
INSERT INTO `settings` VALUES (1,'company_name','ABC AI System Limited','general','2026-09-04 21:04:03','2026-09-04 21:04:03'),(2,'company_tagline','Democratizing Artificial Intelligence','general','2026-09-04 21:04:03','2026-09-04 21:04:03'),(3,'founder_quote_by','Shakhawat Hossain, Managing Director','general','2026-09-04 21:04:03','2026-09-04 21:04:03'),(4,'copyright_year','© 2025 ABC AI System Limited. All Rights Reserved.','general','2026-09-04 21:04:03','2026-09-04 21:04:03'),(5,'address','House 379, Road 6, Baridhara DOHS, Dhaka - 1206, Bangladesh','general','2026-09-04 21:04:03','2026-09-04 21:04:03'),(6,'email','sales@abcaisystemltd.com','general','2026-09-04 21:04:03','2026-09-04 21:04:03'),(7,'email_info','information@abcaisystemltd.com','general','2026-09-04 21:04:03','2026-09-04 21:04:03'),(8,'phone','+88 01799-920150','general','2026-09-04 21:04:03','2026-09-04 21:04:03'),(9,'phone_tel','+8801799920150','general','2026-09-04 21:04:03','2026-09-04 21:04:03'),(10,'website','www.abcaisystemltd.com','general','2026-09-04 21:04:03','2026-09-04 21:04:03'),(11,'linkedin','https://www.linkedin.com/company/107562399','general','2026-09-04 21:04:03','2026-09-04 21:04:03'),(12,'basis_url','https://basis.org.bd','general','2026-09-04 21:04:03','2026-09-04 21:04:03'),(13,'dcci_url','https://www.dhakachamber.com','general','2026-09-04 21:04:03','2026-09-04 21:04:03'),(14,'hero_badge','Pioneering Proprietary AI from Bangladesh','hero','2026-09-04 21:04:03','2026-09-04 21:04:03'),(15,'hero_title_1','Democratizing','hero','2026-09-04 21:04:03','2026-09-04 21:04:03'),(16,'hero_title_2','Artificial','hero','2026-09-04 21:04:03','2026-09-04 21:04:03'),(17,'hero_title_3','Intelligence','hero','2026-09-04 21:04:03','2026-09-04 21:04:03'),(18,'hero_sub','Empowering businesses with flagship AI solutions — no pre-trained models, zero hallucinations, and absolute data privacy.','hero','2026-09-04 21:04:03','2026-09-04 21:04:03'),(19,'hero_cta_primary','See Our Products','hero','2026-09-04 21:04:03','2026-09-04 21:04:03'),(20,'hero_cta_secondary','Book a Demo','hero','2026-09-04 21:04:03','2026-09-04 21:04:03'),(21,'about_tag','WHO WE ARE','about','2026-09-04 21:04:03','2026-09-04 21:04:03'),(22,'about_title','Building AI That Businesses Trust','about','2026-09-04 21:04:03','2026-09-04 21:04:03'),(23,'about_body','ABC AI System Limited is a pioneering AI solution developer headquartered in Dhaka, Bangladesh. Founded on the principle that \"AI should be accessible, accurate, and secure\" — we design flagship AI products, never relying on pre-trained models.','about','2026-09-04 21:04:03','2026-09-04 21:04:03'),(24,'about_image_caption','Proprietary AI Model','about','2026-09-04 21:04:03','2026-09-04 21:04:03'),(25,'about_image_sub','Built in Bangladesh · Serving the World','about','2026-09-04 21:04:03','2026-09-04 21:04:03'),(26,'vision_title','OUR VISION','about','2026-09-04 21:04:03','2026-09-04 21:04:03'),(27,'vision_text','To become a globally recognized leader in proprietary AI innovation, enabling businesses worldwide to harness the true power of artificial intelligence — securely, accurately, and without compromise.','about','2026-09-04 21:04:03','2026-09-04 21:04:03'),(28,'mission_title','OUR MISSION','about','2026-09-04 21:04:03','2026-09-04 21:04:03'),(29,'mission_text','To design and deliver intelligent, privacy-first AI solutions built on our proprietary model that drive measurable operational efficiency, cost savings, and competitive advantage for our clients across industries and geographies.','about','2026-09-04 21:04:03','2026-09-04 21:04:03'),(30,'values_tag','WHAT DEFINES US','about','2026-09-04 21:04:03','2026-09-04 21:04:03'),(31,'values_title','Core Values','about','2026-09-04 21:04:03','2026-09-04 21:04:03'),(32,'clients_tag','TRUSTED BY','about','2026-09-04 21:04:03','2026-09-04 21:04:03'),(33,'clients_title','Our Clients','about','2026-09-04 21:04:03','2026-09-04 21:04:03'),(34,'pilots_title','Pilot Running','about','2026-09-04 21:04:03','2026-09-04 21:04:03'),(35,'services_tag','SERVICES','services','2026-09-04 21:04:03','2026-09-04 21:04:03'),(36,'services_title','What We Do For You','services','2026-09-04 21:04:03','2026-09-04 21:04:03'),(37,'services_sub','From flagship products to end-to-end engineering — everything runs on our proprietary AI model.','services','2026-09-04 21:04:03','2026-09-04 21:04:03'),(38,'services_cta','Get a Free Consultation','services','2026-09-04 21:04:03','2026-09-04 21:04:03'),(39,'products_tag','PRODUCT PORTFOLIO','products','2026-09-04 21:04:03','2026-09-04 21:04:03'),(40,'products_title','Our Flagship AI Products','products','2026-09-04 21:04:03','2026-09-04 21:04:03'),(41,'products_sub','Built entirely on our own model. No pre-trained models. Your data never leaves your environment.','products','2026-09-04 21:04:03','2026-09-04 21:04:03'),(42,'more_products_tag','MORE PRODUCTS','products','2026-09-04 21:04:03','2026-09-04 21:04:03'),(43,'more_products_title','6 More Powerful Solutions','products','2026-09-04 21:04:03','2026-09-04 21:04:03'),(44,'tech_tag','OUR TECHNOLOGY','technology','2026-09-04 21:04:03','2026-09-04 21:04:03'),(45,'tech_title','Built on Our Own AI Model','technology','2026-09-04 21:04:03','2026-09-04 21:04:03'),(46,'tech_sub','No external AI providers. No pre-trained models. Everything runs on our Proprietary Model — inside your infrastructure.','technology','2026-09-04 21:04:03','2026-09-04 21:04:03'),(47,'tech_cmp_tag','WHY ABC AI SYSTEM','technology','2026-09-04 21:04:03','2026-09-04 21:04:03'),(48,'tech_cmp_title','ABC AI System vs Generic AI','technology','2026-09-04 21:04:03','2026-09-04 21:04:03'),(49,'tech_adv_tag','WHY CHOOSE US','technology','2026-09-04 21:04:03','2026-09-04 21:04:03'),(50,'tech_adv_title','The ABC AI System Advantage','technology','2026-09-04 21:04:03','2026-09-04 21:04:03'),(51,'industries_tag','COVERAGE','industries','2026-09-04 21:04:03','2026-09-04 21:04:03'),(52,'industries_title','Transforming Every Sector','industries','2026-09-04 21:04:03','2026-09-04 21:04:03'),(53,'industries_sub','ABC AI System\'s AI products and services are designed to work across industries, geographies, and enterprise scales — from SMEs to large corporations.','industries','2026-09-04 21:04:03','2026-09-04 21:04:03'),(54,'leadership_tag','LEADERSHIP','leadership','2026-09-04 21:04:03','2026-09-04 21:04:03'),(55,'leadership_title','The Minds Behind ABC AI System','leadership','2026-09-04 21:04:03','2026-09-04 21:04:03'),(56,'leadership_sub','6 leaders — Advisors & Core Team','leadership','2026-09-04 21:04:03','2026-09-04 21:04:03'),(57,'advisor_title','Advisory Panel','leadership','2026-09-04 21:04:03','2026-09-04 21:04:03'),(58,'core_title','Core Team','leadership','2026-09-04 21:04:03','2026-09-04 21:04:03'),(59,'founder_title','From the Founder','leadership','2026-09-04 21:04:03','2026-09-04 21:04:03'),(60,'founder_quotes','[\"Why should businesses entrust their most sensitive data to black-box AI systems they cannot control?\",\"The answer drove us to build something fundamentally different — a proprietary AI model from the ground up. No third-party dependencies. No data leakage. No hallucinations. Just precise, deterministic, enterprise-grade intelligence that organizations can truly trust.\",\"Our mission extends beyond technology. We believe that the next wave of AI innovation will emerge from unexpected places — and Bangladesh, with its extraordinary talent pool, is poised to be at the forefront.\",\"Every product in our portfolio — from PULSE to Moina — was born from a real business challenge. We don\'t build technology for technology\'s sake. We build AI that delivers measurable outcomes: reduced costs, faster decisions, and competitive advantage.\"]','leadership','2026-09-04 21:04:03','2026-09-04 21:04:03'),(61,'method_tag','HOW WE WORK','methodology','2026-09-04 21:04:03','2026-09-04 21:04:03'),(62,'method_title','Research-Driven Approach','methodology','2026-09-04 21:04:03','2026-09-04 21:04:03'),(63,'method_sub','A structured seven-step process ensuring every solution is rigorously validated before deployment.','methodology','2026-09-04 21:04:03','2026-09-04 21:04:03'),(64,'contact_badge','GET IN TOUCH','contact','2026-09-04 21:04:03','2026-09-04 21:04:03'),(65,'contact_title','Let\'s Build Intelligence Together','contact','2026-09-04 21:04:03','2026-09-04 21:04:03'),(66,'contact_sub','Ready to explore how proprietary AI can transform your business? Reach out — we\'re ready to listen, understand, and build with you.','contact','2026-09-04 21:04:03','2026-09-04 21:04:03'),(67,'contact_cta','Send Us an Email','contact','2026-09-04 21:04:03','2026-09-04 21:04:03'),(68,'contact_head_label','Head Office','contact','2026-09-04 21:04:03','2026-09-04 21:04:03'),(69,'contact_email_label','Email','contact','2026-09-04 21:04:03','2026-09-04 21:04:03'),(70,'contact_phone_label','Phone','contact','2026-09-04 21:04:03','2026-09-04 21:04:03'),(71,'contact_follow_label','Follow us','contact','2026-09-04 21:04:03','2026-09-04 21:04:03'),(72,'contact_follow_linkedin','LinkedIn','contact','2026-09-04 21:04:03','2026-09-04 21:04:03'),(73,'contact_member_label','Member of','contact','2026-09-04 21:04:03','2026-09-04 21:04:03'),(74,'contact_form_title','Send a Message','contact','2026-09-04 21:04:03','2026-09-04 21:04:03'),(75,'footer_tagline','Democratizing Artificial Intelligence with proprietary, privacy-first solutions for enterprises.','footer','2026-09-04 21:04:03','2026-09-04 21:04:03'),(76,'footer_about_label','About Us','footer','2026-09-04 21:04:03','2026-09-04 21:04:03'),(77,'footer_leadership_label','Leadership','footer','2026-09-04 21:04:03','2026-09-04 21:04:03'),(78,'footer_technology_label','Technology','footer','2026-09-04 21:04:03','2026-09-04 21:04:03'),(79,'footer_industries_label','Industries','footer','2026-09-04 21:04:03','2026-09-04 21:04:03'),(80,'footer_why_label','Why Us','footer','2026-09-04 21:04:03','2026-09-04 21:04:03'),(81,'footer_contact_label','Contact','footer','2026-09-04 21:04:03','2026-09-04 21:04:03');
/*!40000 ALTER TABLE `settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `statistics`
--

DROP TABLE IF EXISTS `statistics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `statistics` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `label` varchar(255) NOT NULL,
  `value` varchar(255) NOT NULL,
  `sub` varchar(255) DEFAULT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `statistics`
--

LOCK TABLES `statistics` WRITE;
/*!40000 ALTER TABLE `statistics` DISABLE KEYS */;
INSERT INTO `statistics` VALUES (1,'Flagship AI Products','15+','Ready to deploy today',0,'2026-09-04 21:04:03','2026-09-04 21:42:09'),(2,'Data Privacy','100%','Zero third-party access',1,'2026-09-04 21:04:03','2026-09-04 21:04:03'),(3,'Hallucinations','0','Deterministic outputs',2,'2026-09-04 21:04:03','2026-09-04 21:04:03'),(4,'Industries Served','10+','From banking to agriculture',3,'2026-09-04 21:04:03','2026-09-04 21:04:03');
/*!40000 ALTER TABLE `statistics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `team_members`
--

DROP TABLE IF EXISTS `team_members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `team_members` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `category` enum('advisor','core') NOT NULL DEFAULT 'core',
  `bio` text DEFAULT NULL,
  `tags` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`tags`)),
  `links` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`links`)),
  `photo` varchar(255) DEFAULT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team_members`
--

LOCK TABLES `team_members` WRITE;
/*!40000 ALTER TABLE `team_members` DISABLE KEYS */;
INSERT INTO `team_members` VALUES (1,'Osama Taseer','Advisor','advisor','Accomplished entrepreneur in the 100% export-oriented RMG Industry of Bangladesh. An engineer by education. Passions for AI and networks help take ABC AI System to the next level.','[\"RMG Industry\",\"Business Chambers\"]',NULL,'osama-taseer.jpg',0,'2026-09-04 21:04:03','2026-09-04 21:04:03'),(2,'Sabuj H Chowdhury, FCA','Advisor','advisor','Fellow Chartered Accountant from ICAB with 24+ years global experience. IIM Kolkata diploma. Former Regional CFO at HMD Global Oy, Business Controller at Microsoft and Nokia SE Asia & Pacific.','[\"ICAB FCA\",\"IIM Kolkata\",\"Microsoft\",\"Nokia\"]',NULL,'sabuj.jpg',1,'2026-09-04 21:04:03','2026-09-04 21:04:03'),(3,'Golam Farook','Advisor','advisor','Technology entrepreneur with 34+ years in IT. Chairman of AIMS, pioneer of ERP via DreamApps. IT background from Singapore National University; Management from University of Dhaka.','[\"AIMS\",\"DreamApps\",\"34+ Years IT\"]',NULL,'golam-farook.jpg',2,'2026-09-04 21:04:03','2026-09-04 21:04:03'),(4,'Dayal Kumar Barua','Chairman','core','Business leader providing strategic vision to ABC AI System. Heads Adip Group, overseeing Adip Power and Adip Trading Ltd.','[\"Adip Group\",\"Adip Power\",\"Adip Trading Ltd.\"]',NULL,'dayal.jpg',0,'2026-09-04 21:04:03','2026-09-04 21:04:03'),(5,'Shakhawat Hossain','Managing Director','core','AI expert and technical architect of ABC AI System\'s proprietary AI model. The visionary behind the zero-hallucination approach. Vice President, Data Transformers Inc. — Texas, USA.','[\"Texas USA\",\"AI Architect\"]',NULL,'shakhawat.jpg',1,'2026-09-04 21:04:03','2026-09-04 21:04:03'),(6,'S J Tarique','Director','core','Leads strategy, assesses needs, and develops tailored solutions. Leads Tech Cloud Ltd, Tech Cloud Venture, Zylo Lab, and Apricot (Real Estate).','[\"Tech Cloud Ltd\",\"Tech Cloud Venture\",\"Zylo Lab\"]','[\"https:\\/\\/zylo-lab.com\\/\",\"https:\\/\\/techcloudventure.com\\/\",\"https:\\/\\/techcloudltd.com\\/\"]','tarique.jpg',2,'2026-09-04 21:04:03','2026-09-04 21:04:03');
/*!40000 ALTER TABLE `team_members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tech_domains`
--

DROP TABLE IF EXISTS `tech_domains`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tech_domains` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `icon` varchar(255) NOT NULL DEFAULT '?',
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tech_domains`
--

LOCK TABLES `tech_domains` WRITE;
/*!40000 ALTER TABLE `tech_domains` DISABLE KEYS */;
INSERT INTO `tech_domains` VALUES (1,'Artificial Intelligence','Machine Learning · NLP · Computer Vision · Decision Support & Reasoning Models','🤖',0,'2026-09-04 21:04:03','2026-09-04 21:04:03'),(2,'Big Data & Analytics','Scale-ready pipelines, real-time intelligence, and BI at any volume.','📊',1,'2026-09-04 21:04:03','2026-09-04 21:04:03'),(3,'Data Mining','Automated pattern recognition and anomaly detection across massive datasets.','⛏️',2,'2026-09-04 21:04:03','2026-09-04 21:04:03'),(4,'Internet of Things','Sensor networks, edge computing, and intelligent physical infrastructure.','📡',3,'2026-09-04 21:04:03','2026-09-04 21:04:03'),(5,'Robotics','Autonomous systems for industrial, agricultural, and service robotics.','🦾',4,'2026-09-04 21:04:03','2026-09-04 21:04:03'),(6,'ERP Platforms','Oracle & SAP implementation with a proprietary AI automation layer.','🗂️',5,'2026-09-04 21:04:03','2026-09-04 21:04:03'),(7,'AR / VR / MR','Immersive enterprise training, simulation, and visualization experiences.','🥽',6,'2026-09-04 21:04:03','2026-09-04 21:04:03');
/*!40000 ALTER TABLE `tech_domains` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Site Administrator','admin@gmail.com','2026-09-04 21:42:09','$2y$12$Vk3vuigPSkNS14nu.qwf2e6XAwfZChGcFjYJaMSToNo4hGDsCS5Aq','kMDqcAmnEAITjEVDvX3wl0BLaqUUx9X7mS7HWOOrYYtD2YmUm73x1CaMN0pw','2026-09-04 21:04:04','2026-09-04 21:45:27');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-09-05 10:32:24
