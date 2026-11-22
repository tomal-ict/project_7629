-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 09, 2026 at 05:37 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `agm_web_site`
--

-- --------------------------------------------------------

--
-- Table structure for table `advantages`
--

CREATE TABLE `advantages` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `subtitle` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `icon` varchar(255) NOT NULL DEFAULT '⭐',
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `advantages`
--

INSERT INTO `advantages` (`id`, `title`, `subtitle`, `description`, `icon`, `sort_order`, `created_at`, `updated_at`) VALUES
(1, 'Private AI Model', '0% Hallucinations', 'Our proprietary, deterministic model — built from the ground up in Bangladesh.', '🧠', 0, '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(2, 'Absolute Data Privacy', '100% Data Sovereignty', 'Your data never leaves your environment. No middle-layer storage, ever.', '🔐', 1, '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(3, 'Local Expertise, Global Reach', 'Made in Bangladesh', 'World-class AI engineering talent, serving enterprises across the globe.', '🌏', 2, '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(4, 'End-to-End Capability', '15+ AI Products', 'From analytics to computer vision to robotics — one partner, full stack.', '⚙️', 3, '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(5, 'Industry Agnostic', '10+ Industries', 'Proven across banking, manufacturing, agriculture, healthcare and more.', '🏢', 4, '2026-09-04 21:04:03', '2026-09-04 21:04:03');

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cache`
--

INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES
('brain-system-limited-cache-admin@gmail.com|172.16.18.99', 'i:2;', 1788611947),
('brain-system-limited-cache-admin@gmail.com|172.16.18.99:timer', 'i:1788611947;', 1788611947),
('brain-system-limited-cache-admin@mail.com|172.16.18.99', 'i:1;', 1788611961),
('brain-system-limited-cache-admin@mail.com|172.16.18.99:timer', 'i:1788611961;', 1788611961);

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `clients`
--

CREATE TABLE `clients` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `accent` varchar(255) NOT NULL DEFAULT '#0ea5e9',
  `group` enum('clients','pilots') NOT NULL DEFAULT 'clients',
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `clients`
--

INSERT INTO `clients` (`id`, `name`, `logo`, `accent`, `group`, `sort_order`, `created_at`, `updated_at`) VALUES
(1, 'SA Plumbing & Heating', 'sa-plumbing-heating.png', '#0ea5e9', 'clients', 0, '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(2, 'Unique Group', 'unique-group.png', '#8b5cf6', 'clients', 1, '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(3, 'X Ceramics Group', 'x-ceramics-limited.png', '#f59e0b', 'clients', 2, '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(4, 'Finlays', 'finlays.png', '#10b981', 'clients', 3, '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(5, 'Uniglory', 'uniglory.png', '#ef4444', 'clients', 4, '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(6, 'Popular Group', 'popular-pharma.webp', '#fa5252', 'pilots', 0, '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(7, 'Renata PLC', 'renata-icon.png', '#15aabf', 'pilots', 1, '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(8, 'Bata', 'bata.svg', '#e64980', 'pilots', 2, '2026-09-04 21:04:03', '2026-09-04 21:04:03');

-- --------------------------------------------------------

--
-- Table structure for table `comparisons`
--

CREATE TABLE `comparisons` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `feature` varchar(255) NOT NULL,
  `us_value` varchar(255) NOT NULL,
  `them_value` varchar(255) NOT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `comparisons`
--

INSERT INTO `comparisons` (`id`, `feature`, `us_value`, `them_value`, `sort_order`, `created_at`, `updated_at`) VALUES
(1, 'Data Privacy', '100% — your data never leaves your server', 'Processed on third-party cloud infrastructure', 0, '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(2, 'Hallucinations', 'Zero — deterministic, rule-based outputs', 'Frequent — inherent in large language models', 1, '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(3, 'Third-party dependency', 'None — fully self-contained system', 'Fully dependent on external AI providers', 2, '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(4, 'Customization depth', 'Complete — built around your processes', 'Limited to what the API allows', 3, '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(5, 'Offline capability', 'Yes — works without internet', 'Requires constant internet & API access', 4, '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(6, 'Middle layer storage', 'No middle layer data storage — ever', 'Data buffered and stored on vendor cloud', 5, '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(7, 'Compliance & audit', 'Full audit trail, local data sovereignty', 'Data may cross international jurisdictions', 6, '2026-09-04 21:04:03', '2026-09-04 21:04:03');

-- --------------------------------------------------------

--
-- Table structure for table `contact_messages`
--

CREATE TABLE `contact_messages` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `company` varchar(255) DEFAULT NULL,
  `message` text NOT NULL,
  `is_read` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `contact_messages`
--

INSERT INTO `contact_messages` (`id`, `name`, `email`, `phone`, `company`, `message`, `is_read`, `created_at`, `updated_at`) VALUES
(1, 'Test User', 'test@example.com', '+8801700000000', 'Test Co', 'Hello ABC AI System, please contact me about PULSE.', 0, '2026-09-04 21:16:46', '2026-09-04 21:24:55');

-- --------------------------------------------------------

--
-- Table structure for table `core_values`
--

CREATE TABLE `core_values` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `icon` varchar(255) NOT NULL DEFAULT '?',
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `core_values`
--

INSERT INTO `core_values` (`id`, `title`, `description`, `icon`, `sort_order`, `created_at`, `updated_at`) VALUES
(1, 'Innovation First', 'Continuously pushing boundaries in AI research — building solutions that did not exist before.', '💡', 0, '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(2, 'Data Privacy & Security', '100% client data sovereignty — data never passes through intermediate storage or pre-trained models.', '🔒', 1, '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(3, 'Zero Hallucination', 'Precise, deterministic outputs — eliminating the unreliability of traditional AI models entirely.', '🎯', 2, '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(4, 'Client-Centricity', 'Every solution is designed around client needs — seamless integration, scalability, and measurable ROI.', '🤝', 3, '2026-09-04 21:04:03', '2026-09-04 21:04:03');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `industries`
--

CREATE TABLE `industries` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `icon` varchar(255) NOT NULL DEFAULT '?',
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `industries`
--

INSERT INTO `industries` (`id`, `name`, `icon`, `sort_order`, `created_at`, `updated_at`) VALUES
(1, 'Banking & Finance', '🏦', 0, '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(2, 'Manufacturing', '🏭', 1, '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(3, 'Retail & Wholesale', '🛒', 2, '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(4, 'Agriculture', '🌾', 3, '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(5, 'Real Estate', '🏗️', 4, '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(6, 'Healthcare', '🏥', 5, '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(7, 'Logistics & Shipping', '🚢', 6, '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(8, 'Government', '🏛️', 7, '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(9, 'Smart Buildings', '🏢', 8, '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(10, 'BPO', '💼', 9, '2026-09-04 21:04:03', '2026-09-04 21:04:03');

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

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
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `methodologies`
--

CREATE TABLE `methodologies` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `icon` varchar(255) NOT NULL DEFAULT '?',
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `methodologies`
--

INSERT INTO `methodologies` (`id`, `title`, `description`, `icon`, `sort_order`, `created_at`, `updated_at`) VALUES
(1, 'Problem Identification', 'Pinpoint the real business challenge with stakeholders.', '🔍', 0, '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(2, 'Scope Analysis', 'Define boundaries, data, and success criteria.', '📐', 1, '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(3, 'Research', 'Investigate methods and design the approach.', '🔬', 2, '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(4, 'Prototype Dev', 'Build a rapid, testable prototype.', '🧪', 3, '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(5, 'Solution Refinement', 'Iterate on the prototype with real-world feedback.', '🛠️', 4, '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(6, 'Final Development', 'Engineer the production-grade solution.', '💻', 5, '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(7, 'Validation & Deploy', 'Rigorous validation, then deployment & support.', '🚀', 6, '2026-09-04 21:04:03', '2026-09-04 21:04:03');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2026_09_05_000001_create_settings_table', 2),
(5, '2026_09_05_000002_create_statistics_table', 2),
(6, '2026_09_05_000003_create_services_table', 2),
(7, '2026_09_05_000004_create_products_table', 2),
(8, '2026_09_05_000005_create_team_members_table', 2),
(9, '2026_09_05_000006_create_clients_table', 2),
(10, '2026_09_05_000007_create_industries_table', 2),
(11, '2026_09_05_000008_create_tech_domains_table', 2),
(12, '2026_09_05_000009_create_core_values_table', 2),
(13, '2026_09_05_000010_create_advantages_table', 2),
(14, '2026_09_05_000011_create_methodologies_table', 2),
(15, '2026_09_05_000012_create_contact_messages_table', 2),
(16, '2026_09_05_000013_create_comparisons_table', 2);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` bigint(20) UNSIGNED NOT NULL,
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
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `tag`, `metric`, `description`, `features`, `logo`, `demo`, `is_flagship`, `sort_order`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'PULSE', 'Analytics', '< 1 sec Query Response', 'Ask any business question in Bangla or English and get instant live insights from your ERP. No SQL, no data analyst, no waiting.', '[\"Natural language queries \\u2014 Bangla & English\",\"Auto-generated dashboards & live reports\",\"Connects to any ERP without ETL\",\"No middle layer data storage\"]', 'pluse.jpeg', '{\"kind\":\"pulse\",\"queries\":[\"Show top 5 products by total spending\",\"What are the most popular sales categories?\",\"Calculate revenue vs cost for all products\"],\"sidebar\":[\"Query\",\"Reports\",\"Database\",\"History\"],\"databases\":3,\"steps\":[\"Understand\",\"Scan data\",\"Build report\"],\"chartLabel\":\"Revenue by category\",\"topLabel\":\"Top products\",\"topItems\":[[\"Label A\",\"$32k\"],[\"Label B\",\"$27k\"],[\"Label C\",\"$21k\"],[\"Label D\",\"$16k\"],[\"Label E\",\"$13k\"]]}', 1, 0, 1, '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(2, 'Brain ClerK', 'PDF Intelligence', 'Any PDF Business Documents', 'Upload any business-related PDF. Brain ClerK extracts the key data, generates a clear report, and saves it securely for future access.', '[\"Invoices, sales, finance & operational PDFs\",\"Automatically extracts key business data\",\"Generates structured, ready-to-use reports\",\"Saves every report\"]', 'brainclerk-logo.jpg', '{\"kind\":\"clerk\",\"sidebar\":[\"PDF Library\",\"Extracted Data\",\"Reports\",\"Saved\"],\"files\":[\"Quarterly_Sales_Report.pdf\",\"Supplier_Cost_Analysis.pdf\",\"Operations_Performance.pdf\"],\"steps\":[\"Read PDF\",\"Extract Data\",\"Generate Report\",\"Save Report\"]}', 1, 1, 1, '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(3, 'DotLog', 'Computer Vision', '99.8% Face Recognition Accuracy', 'Your existing CCTV cameras become a full attendance system overnight. No hardware, no fingerprints, no queues.', '[\"Works with existing CCTV cameras\",\"No-touch face recognition at entry\",\"Real-time logs & payroll exports\",\"Multi-site & multi-shift support\"]', 'dotlog-logo.png', '{\"kind\":\"dotlog\",\"title\":\"AI Touch-less Smart Attendance\",\"subtitle\":\"CCTV-powered \\u00b7 Real-time logs\",\"entries\":[[\"EMP-023\",\"Arafat Rahman\",\"09:12:28 AM\",\"present\"],[\"EMP-027\",\"Samira Jahan\",\"09:14:02 AM\",\"present\"],[\"EMP-031\",\"Rakib Hasan\",\"09:17:41 AM\",\"present\"]]}', 1, 2, 1, '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(4, 'Light OCR', 'Mobile AI', '< 3 sec Invoice to ERP', 'Point any phone camera at a financial document. AI extracts all data and posts to your accounting system in under 3 seconds.', '[\"Any Android or iOS camera\",\"Invoices, receipts, bank statements\",\"Posts to ERP in under 3 seconds\",\"Offline-first with auto-sync\"]', 'lightocr-logo.png', '{\"kind\":\"lightocr\",\"sidebar\":[\"Dashboard\",\"Process OCR\",\"Saved data\",\"Company list\",\"Vendor list\"],\"docs\":[\"invoice_6980616f.pdf\",\"invoice_69804b81.jpeg\"]}', 1, 3, 1, '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(5, 'Moina', 'Conversational AI', '24/7 Always Active', 'Understands Bangla, English, and local dialects — and executes complex business workflows autonomously. It acts, not just answers.', '[\"Bangla, English & regional dialects\",\"Autonomous multi-step workflow execution\",\"Deep integration with your systems\",\"Round-the-clock operations\"]', 'moina-logo.svg', '{\"kind\":\"moina\",\"messages\":[\"Assalamu alaikum! Ki bhabe shahajjo korte pari?\",\"Apnar appointment booking complete korechi. CBC report ready.\"],\"items\":[[\"Healthcare AI\",\"active\"],[\"Voice language\",\"bn-bd\"],[\"Appointment booking\",\"realtime\"],[\"CBC report\",\"generated\"]]}', 1, 4, 1, '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(6, 'Smart BMS', 'IoT · Building Automation', '30% Energy Savings', 'Integrated monitoring, lighting automation, utility metering, and floor-wise control via Ethernet backbone with open protocol architecture — BACnet/IP, DALI, Modbus, CANbus, LoRa/BLE.', '[\"Lighting control \\u2014 zone, schedule & motion\",\"Energy metering \\u2014 kW, kWh, PF per floor\",\"AC, fire alarm, elevator & UPS monitoring\",\"BACnet\\/IP \\u00b7 DALI \\u00b7 Modbus \\u00b7 LoRa\\/BLE protocols\"]', 'smart-bms-logo.png', '{\"kind\":\"bms\",\"title\":\"Smart BMS \\u00b7 Online\",\"subtitle\":\"Ethernet backbone \\u00b7 Open protocols\",\"protocols\":[\"BACnet\\/IP\",\"DALI\",\"Modbus\",\"CANbus\",\"LoRa\\/BLE\"]}', 1, 5, 1, '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(7, 'Blens', 'AI Business Assistant', NULL, 'Voice AI chief of staff — calendar, emails, WhatsApp, and your schedule — all hands-free.', '[]', 'blens-card-logo.png', NULL, 0, 0, 1, '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(8, 'Sohojogi', 'Voice Order Management', NULL, 'Retailers speak orders in Bangla. Auto-invoiced, inventory updated, fully offline.', '[]', 'sohojogi-card-logo.png', NULL, 0, 1, 1, '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(9, 'Booking Model', 'Web Data Extraction', NULL, 'Reads buyer portals, posts to ERP — no API, no manual entry, 100% accuracy.', '[]', 'booking-model-logo-v3.png', NULL, 0, 2, 1, '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(10, 'Proxy Eye', 'Computer Vision QC', NULL, 'Detects fabric defects, construction anomalies, and security threats in real time.', '[]', 'proxy-eye-card-logo.png', NULL, 0, 3, 1, '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(11, 'Validex AI', 'Trade Finance AI', NULL, 'Validates LC documents against bank rules before submission. Zero discrepancies.', '[]', 'validex-ai-logo.png', NULL, 0, 4, 1, '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(12, 'AgroRx', 'Agricultural AI Platform', NULL, 'AI-powered crop monitoring, disease detection, and precision farming recommendations for Bangladeshi agriculture.', '[]', 'agrorx-card-logo.svg', NULL, 0, 5, 1, '2026-09-04 21:04:03', '2026-09-04 21:04:03');

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` bigint(20) UNSIGNED NOT NULL,
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
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `slug`, `title`, `subtitle`, `icon`, `color`, `color_light`, `intro`, `description`, `features`, `benefits`, `usecases`, `hero_image`, `gallery_images`, `stats`, `steps`, `why_us`, `featured_on_home`, `sort_order`, `created_at`, `updated_at`) VALUES
(1, 'proprietary-ai-products', 'Flagship AI Products', 'Deploy in Days, Not Months', '🚀', '#2563eb', '#eff6ff', 'Our flagship AI product suite covers analytics, document intelligence, computer vision, conversational AI and building automation. Each product is fully built, tested and ready to be configured to your environment.', 'Deploy any of our 15 ready-built AI solutions directly into your operations — live in days, not months.', '[\"Ready-to-deploy fully tested\",\"Customizable to your workflows\",\"Full onboarding & staff training\",\"Ongoing support & updates\"]', '[\"No Pre-trained Models\",\"Zero hallucinations\",\"100% data privacy\",\"Offline capability\",\"Rapid deployment\"]', '[\"ERP analytics via natural language\",\"Document extraction & posting\",\"AI attendance via CCTV\",\"Bangla voice chatbots\",\"Mobile OCR to ERP\"]', 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&auto=format&fit=crop&q=80', '[\"https:\\/\\/images.unsplash.com\\/photo-1677442135703-1787eea5ce01?w=1200&auto=format&fit=crop&q=80\",\"https:\\/\\/images.unsplash.com\\/photo-1620712943543-bcc4688e7485?w=1200&auto=format&fit=crop&q=80\",\"https:\\/\\/images.unsplash.com\\/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80\"]', '[{\"value\":\"15+\",\"label\":\"Ready Products\"},{\"value\":\"Days\",\"label\":\"Deployment Time\"},{\"value\":\"0\",\"label\":\"Hallucinations\"},{\"value\":\"100%\",\"label\":\"Data Privacy\"}]', '[{\"title\":\"Discovery\",\"desc\":\"Understand your environment, data and goals.\"},{\"title\":\"Configuration\",\"desc\":\"Fit the product to your processes and data.\"},{\"title\":\"Integration\",\"desc\":\"Connect with your ERP, CCTV or infrastructure.\"},{\"title\":\"Validation\",\"desc\":\"Rigorous testing with your real-world data.\"},{\"title\":\"Go-Live\",\"desc\":\"Deploy, train your team and launch.\"},{\"title\":\"Support\",\"desc\":\"Continuous optimization and updates.\"}]', 'Every flagship product runs entirely on our proprietary AI model — no pre-trained models, no third-party APIs, and absolute data privacy.', 1, 0, '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(2, 'custom-ai-development', 'Custom AI Development', 'Built From Scratch on Our Proprietary Model', '🧩', '#7c3aed', '#f3efff', 'When off-the-shelf solutions cannot capture your complexity, we design and engineer a custom AI system tailored to your exact workflows — fully owned by you.', 'Bespoke AI systems built from the ground up on our Proprietary Model. No templates. No compromises.', '[\"End-to-end development\",\"No Pre-trained Models\",\"Full system integration\",\"Source code ownership available\"]', '[\"Fully custom to your workflow\",\"Proprietary AI Model\",\"Complete data sovereignty\",\"IP ownership available\",\"Long-term partnership\"]', '[\"Custom NLP for local dialects\",\"Industry-specific computer vision\",\"Bespoke decision support systems\",\"Custom reasoning models\",\"AI-augmented ERP workflows\"]', 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&auto=format&fit=crop&q=80', '[\"https:\\/\\/images.unsplash.com\\/photo-1581091226825-a6a2a5aee158?w=1200&auto=format&fit=crop&q=80\",\"https:\\/\\/images.unsplash.com\\/photo-1524178232363-1fb2b075b655?w=1200&auto=format&fit=crop&q=80\",\"https:\\/\\/images.unsplash.com\\/photo-1554224155-6726b3ff858f?w=1200&auto=format&fit=crop&q=80\"]', '[{\"value\":\"12+\",\"label\":\"Custom Builds\"},{\"value\":\"100%\",\"label\":\"Proprietary Model\"},{\"value\":\"0\",\"label\":\"Pre-trained Models\"},{\"value\":\"6mo\",\"label\":\"Avg. Delivery\"}]', '[{\"title\":\"Discovery & Requirements\",\"desc\":\"Deep-dive into your business problem.\"},{\"title\":\"Architecture Design\",\"desc\":\"Design the model and integration blueprint.\"},{\"title\":\"Prototype & Validate\",\"desc\":\"Rapid prototype proven with real data.\"},{\"title\":\"Full Development\",\"desc\":\"Engineering the production AI system.\"},{\"title\":\"Integration & Testing\",\"desc\":\"Connect and validate end-to-end.\"},{\"title\":\"Deployment & Handover\",\"desc\":\"Go-live with full documentation & IP transfer.\"}]', 'Unlike competitors who wrap traditional AI models, we build from scratch. You get full IP ownership and a team that stays with you long after go-live.', 1, 1, '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(3, 'ai-research-rnd', 'AI Research & R&D', 'Pushing the Boundaries of Proprietary AI', '🔬', '#0ea5e9', '#eff8ff', 'Bring a research question, a domain challenge, or a moonshot idea. Our lab partners with you to invent, validate and publish.', 'Collaborative research partnerships pushing ML, NLP, Computer Vision, and Reasoning Models forward.', '[\"Cutting-edge research capability\",\"Joint IP development\",\"Published research & white papers\",\"Lab access & co-innovation\"]', '[\"Access to private AI lab\",\"Joint IP ownership\",\"Published outcomes\",\"Long-term research contracts\",\"Bangladesh + global talent\"]', '[\"ML model development for specialized domains\",\"Low-resource NLP for Bangla\",\"Computer vision for manufacturing QC\",\"Reasoning model development\",\"Decision support R&D\"]', 'https://images.unsplash.com/photo-1737644467636-6b0053476bb2?w=1200&auto=format&fit=crop&q=80', '[\"https:\\/\\/images.unsplash.com\\/photo-1737644467636-6b0053476bb2?w=1200&auto=format&fit=crop&q=80\",\"https:\\/\\/images.unsplash.com\\/photo-1620712943543-bcc4688e7485?w=1200&auto=format&fit=crop&q=80\",\"https:\\/\\/images.unsplash.com\\/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80\"]', '[{\"value\":\"5+\",\"label\":\"Years of R&D\"},{\"value\":\"3\",\"label\":\"Research Labs\"},{\"value\":\"15+\",\"label\":\"Engineers\"},{\"value\":\"100%\",\"label\":\"Proprietary\"}]', '[{\"title\":\"Problem Definition\",\"desc\":\"Frame the research question clearly.\"},{\"title\":\"Literature & Landscape Review\",\"desc\":\"Map existing work and gaps.\"},{\"title\":\"Hypothesis & Experimentation\",\"desc\":\"Design and run controlled experiments.\"},{\"title\":\"Model Development\",\"desc\":\"Build the new proprietary model.\"},{\"title\":\"Validation & Benchmarking\",\"desc\":\"Prove performance against baselines.\"},{\"title\":\"Deployment & Documentation\",\"desc\":\"Publish, patent or productize.\"}]', 'ABC AI System is the only AI R&D partner in Bangladesh with a fully Proprietary AI Model. Your research data never leaves your environment.', 1, 2, '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(4, 'ai-training-capacity', 'AI Training & Capacity', 'Enable Your Teams to Own AI', '🎓', '#059669', '#ecfdf5', 'AI succeeds only when people can run it. We build your internal capability with hands-on programs in Bangla and English.', 'Structured programs that enable your teams to use, manage, and govern AI with confidence.', '[\"Hands-on workshops & labs\",\"AI governance frameworks\",\"Team certification programs\",\"Custom learning paths\"]', '[\"Role-based learning paths\",\"Bangla & English delivery\",\"Hands-on with real tools\",\"Certification on completion\",\"On-site & remote options\"]', '[\"AI literacy for C-suite\",\"Technical AI practitioner programs\",\"Prompt engineering workshops\",\"AI governance & compliance training\",\"Department-specific AI use cases\"]', 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&auto=format&fit=crop&q=80', '[\"https:\\/\\/images.unsplash.com\\/photo-1524178232363-1fb2b075b655?w=1200&auto=format&fit=crop&q=80\",\"https:\\/\\/images.unsplash.com\\/photo-1554224155-6726b3ff858f?w=1200&auto=format&fit=crop&q=80\",\"https:\\/\\/images.unsplash.com\\/photo-1558494949-ef010cbdcc31?w=1200&auto=format&fit=crop&q=80\"]', '[{\"value\":\"500+\",\"label\":\"Professionals Trained\"},{\"value\":\"2\",\"label\":\"Delivery Languages\"},{\"value\":\"12\",\"label\":\"Module Tracks\"},{\"value\":\"100%\",\"label\":\"Hands-On\"}]', '[{\"title\":\"Assessment\",\"desc\":\"Evaluate current AI maturity.\"},{\"title\":\"Curriculum Design\",\"desc\":\"Tailor role-based learning paths.\"},{\"title\":\"Hands-On Labs\",\"desc\":\"Practice with our real tools.\"},{\"title\":\"Governance Training\",\"desc\":\"Embed responsible AI practices.\"},{\"title\":\"Certification\",\"desc\":\"Validate team capability.\"},{\"title\":\"Continuous Enablement\",\"desc\":\"Ongoing upskilling as AI evolves.\"}]', 'We train on the proprietary AI model itself — not generic abstractions — so your team governs and operates real, deployed intelligence.', 1, 3, '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(5, 'ai-audit-compliance', 'AI Audit & Compliance', 'Independent, Rigorous AI Evaluation', '🛡️', '#d97706', '#fffbeb', 'Before you deploy or after, our engineers audit your AI stack for accuracy, hallucination rate, bias, data security and regulatory compliance.', 'Independent, rigorous evaluation of any AI system — whether built by ABC AI System or a third party — for accuracy, hallucination rate, bias, data security, and full regulatory compliance.', '[\"Hallucination audit\",\"Security & privacy assessment\",\"Compliance certification\",\"Ongoing monitoring\"]', '[\"Vendor-neutral evaluation\",\"Regulatory compliance\",\"Detailed audit reports\",\"Bias detection\",\"Security risk mapping\"]', '[\"Pre-deployment AI audits\",\"Regulatory compliance review\",\"Third-party AI vendor assessment\",\"Ongoing AI performance monitoring\",\"Data privacy risk assessments\"]', 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&auto=format&fit=crop&q=80', '[\"https:\\/\\/images.unsplash.com\\/photo-1554224155-6726b3ff858f?w=1200&auto=format&fit=crop&q=80\",\"https:\\/\\/images.unsplash.com\\/photo-1558494949-ef010cbdcc31?w=1200&auto=format&fit=crop&q=80\",\"https:\\/\\/images.unsplash.com\\/photo-1486325212027-8081e485255e?w=1200&auto=format&fit=crop&q=80\"]', '[{\"value\":\"100%\",\"label\":\"Coverage\"},{\"value\":\"0\",\"label\":\"Bias Tolerance\"},{\"value\":\"24h\",\"label\":\"Response\"},{\"value\":\"Full\",\"label\":\"Audit Trail\"}]', '[{\"title\":\"Scoping\",\"desc\":\"Define audit boundaries and criteria.\"},{\"title\":\"Data & Model Review\",\"desc\":\"Inspect models, data flows and storage.\"},{\"title\":\"Bias & Accuracy Testing\",\"desc\":\"Empirical hallucination & bias tests.\"},{\"title\":\"Security Assessment\",\"desc\":\"Penetration and privacy risk mapping.\"},{\"title\":\"Report & Certification\",\"desc\":\"Detailed report and compliance cert.\"},{\"title\":\"Monitoring\",\"desc\":\"Ongoing performance surveillance.\"}]', 'Vendor-neutral by design — we audit any AI system, including our own, with the same rigor.', 0, 4, '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(6, 'iot-automation', 'IoT and Robotics', 'Intelligent Physical Infrastructure', '🤖', '#dc2626', '#fef2f2', 'From sensor design to real-time dashboards, we connect the physical world to your AI model for autonomous decisions.', 'End-to-end IoT infrastructure for smart factories, intelligent offices, and precision agriculture.', '[\"Custom sensor network design\",\"Real-time monitoring dashboards\",\"Predictive maintenance systems\",\"Cloud & edge integration\"]', '[\"Full infrastructure design\",\"AI-powered analytics\",\"Edge + cloud deployment\",\"Predictive intelligence\",\"Multi-site management\"]', '[\"Smart factory automation\",\"Agricultural IoT & precision farming\",\"Smart office building management\",\"Cold chain monitoring\",\"Industrial predictive maintenance\"]', 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&auto=format&fit=crop&q=80', '[\"https:\\/\\/images.unsplash.com\\/photo-1485827404703-89b55fcc595e?w=1200&auto=format&fit=crop&q=80\",\"https:\\/\\/images.unsplash.com\\/photo-1581092160562-40aa08e78837?w=1200&auto=format&fit=crop&q=80\",\"https:\\/\\/images.unsplash.com\\/photo-1581092918056-0c4c3acd3789?w=1200&auto=format&fit=crop&q=80\"]', '[{\"value\":\"10k+\",\"label\":\"Sensors Deployed\"},{\"value\":\"35%\",\"label\":\"Energy Saved Avg.\"},{\"value\":\"99.9%\",\"label\":\"Uptime\"},{\"value\":\"Edge\",\"label\":\"First-Class\"}]', '[{\"title\":\"Feasibility Study\",\"desc\":\"Survey the physical environment.\"},{\"title\":\"Sensor Architecture\",\"desc\":\"Design node, gateway and network layout.\"},{\"title\":\"Deployment\",\"desc\":\"Install and commission hardware.\"},{\"title\":\"AI Integration\",\"desc\":\"Connect streams to the proprietary model.\"},{\"title\":\"Dashboard & Alerts\",\"desc\":\"Real-time visual intelligence.\"},{\"title\":\"Optimization\",\"desc\":\"Continuous tuning and expansion.\"}]', 'We cover the full stack — sensors, gateways, edge processing, and proprietary AI analytics — under one team.', 1, 5, '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(7, 'big-data-mining', 'Big Data & Mining', 'From Noise to Intelligence', '📊', '#0891b2', '#ecfeff', 'We engineer automated pipelines that discover patterns and anomalies in your enterprise data — at any scale.', 'Automated pipelines that extract actionable intelligence from large-scale, messy data.', '[\"Automated data pipeline engineering\",\"Pattern recognition & anomaly detection\",\"BI dashboards & intelligence reports\",\"Data lake architecture\"]', '[\"Automated data processing\",\"Real-time intelligence\",\"Scalable architecture\",\"AI-powered analysis\",\"Multi-source integration\"]', '[\"Sales & operations analytics\",\"Customer behavior analysis\",\"Supply chain intelligence\",\"Financial risk pattern detection\",\"Social media data mining\"]', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80', '[\"https:\\/\\/images.unsplash.com\\/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80\",\"https:\\/\\/images.unsplash.com\\/photo-1558494949-ef010cbdcc31?w=1200&auto=format&fit=crop&q=80\",\"https:\\/\\/images.unsplash.com\\/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80\"]', '[{\"value\":\"PB\",\"label\":\"Scale Ready\"},{\"value\":\"24\\/7\",\"label\":\"Pipe Processing\"},{\"value\":\"50+\",\"label\":\"Source Types\"},{\"value\":\"0\",\"label\":\"Data Egress\"}]', '[{\"title\":\"Data Audit\",\"desc\":\"Map sources, quality and volume.\"},{\"title\":\"Pipeline Engineering\",\"desc\":\"Build automated ingestion & cleaning.\"},{\"title\":\"Model Fitting\",\"desc\":\"Train proprietary mining models.\"},{\"title\":\"Pattern Discovery\",\"desc\":\"Surface anomalies and insights.\"},{\"title\":\"Visual Intelligence\",\"desc\":\"Dashboards your teams will use.\"},{\"title\":\"Governance\",\"desc\":\"Access control and audit trails.\"}]', 'Your data is analyzed by our proprietary model inside your environment — never shipped to a cloud vendor.', 1, 6, '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(8, 'erp-implementation', 'ERP Implementation', 'Oracle & SAP, Augmented by AI', '🗂️', '#4f46e5', '#eef2ff', 'We implement Oracle and SAP ERP — then place a proprietary AI layer on top so complex workflows run themselves.', 'Oracle and SAP ERP with our proprietary AI automation layer on top.', '[\"Oracle & SAP certified consultants\",\"AI automation layer on ERP workflows\",\"Post-go-live support & optimization\",\"User training & change management\"]', '[\"Certified ERP consultants\",\"AI-augmented workflows\",\"Reduced manual effort\",\"Faster go-live\",\"Ongoing optimization\"]', '[\"Oracle ERP implementation\",\"SAP S\\/4HANA rollout\",\"ERP + AI document automation\",\"ERP + OCR for invoice processing\",\"Multi-entity ERP consolidation\"]', 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&auto=format&fit=crop&q=80', '[\"https:\\/\\/images.unsplash.com\\/photo-1664575602276-acd073f101bc?w=1200&auto=format&fit=crop&q=80\",\"https:\\/\\/images.unsplash.com\\/photo-1554224155-6726b3ff858f?w=1200&auto=format&fit=crop&q=80\",\"https:\\/\\/images.unsplash.com\\/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80\"]', '[{\"value\":\"100%\",\"label\":\"Certified Teams\"},{\"value\":\"2x\",\"label\":\"Faster Go-Live\"},{\"value\":\"50%\",\"label\":\"Manual Work Cut\"},{\"value\":\"24\\/7\",\"label\":\"Post-Go-Live Care\"}]', '[{\"title\":\"Assessment\",\"desc\":\"Evaluate processes and legacy systems.\"},{\"title\":\"Blueprint\",\"desc\":\"Design the target ERP architecture.\"},{\"title\":\"Build & Configure\",\"desc\":\"Configure Oracle\\/SAP modules.\"},{\"title\":\"AI Layer\",\"desc\":\"Automate workflows with proprietary AI.\"},{\"title\":\"Testing\",\"desc\":\"Validate end-to-end business scenarios.\"},{\"title\":\"Go-Live & Support\",\"desc\":\"Cutover, training and optimization.\"}]', 'We pair certified enterprise ERP expertise with an AI automation layer that no vanilla implementation offers.', 1, 7, '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(9, 'ar-vr-mr', 'AR / VR / MR', 'Immersive Enterprise Experiences', '🥽', '#9333ea', '#faf5ff', 'Translate complex training and design problems into immersive experiences your people can learn and act inside.', 'Immersive AR/VR/MR for enterprise training, simulation, product visualization, and remote collaboration.', '[\"Custom AR\\/VR application development\",\"Industrial training simulations\",\"Product & architectural visualization\",\"Remote collaboration environments\"]', '[\"Immersive learning outcomes\",\"Safer hands-on training\",\"Visual sales & design review\",\"Remote collaboration\",\"Measurable retention gains\"]', '[\"Industrial safety training\",\"Equipment maintenance simulation\",\"Real estate & architecture walkthroughs\",\"Remote expert support\",\"Product design reviews\"]', 'https://images.unsplash.com/photo-1626379953822-baec19c3accd?w=1200&auto=format&fit=crop&q=80', '[\"https:\\/\\/images.unsplash.com\\/photo-1626379953822-baec19c3accd?w=1200&auto=format&fit=crop&q=80\",\"https:\\/\\/images.unsplash.com\\/photo-1593508512255-86ab42a8e620?w=1200&auto=format&fit=crop&q=80\",\"https:\\/\\/images.unsplash.com\\/photo-1617802690992-15d93263d3a9?w=1200&auto=format&fit=crop&q=80\"]', '[{\"value\":\"3D\",\"label\":\"Native Experiences\"},{\"value\":\"90%\",\"label\":\"Retention Boost\"},{\"value\":\"100%\",\"label\":\"On-Premise Option\"},{\"value\":\"24\\/7\",\"label\":\"Remote Support\"}]', '[{\"title\":\"Use Case Discovery\",\"desc\":\"Pinpoint highest-ROI immersive scenarios.\"},{\"title\":\"Experience Design\",\"desc\":\"Storyboard interactions and assets.\"},{\"title\":\"3D Asset Creation\",\"desc\":\"Model your environments & products.\"},{\"title\":\"Development\",\"desc\":\"Build the AR\\/VR\\/MR application.\"},{\"title\":\"Pilot Testing\",\"desc\":\"Validate with real users.\"},{\"title\":\"Deployment\",\"desc\":\"Roll out across the enterprise.\"}]', 'We combine immersive development with proprietary AI — for adaptive, intelligent training that responds to the learner.', 1, 8, '2026-09-04 21:04:03', '2026-09-04 21:04:03');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('1Ax67hLuWtRptNlrb0gQ9SOivU0VNVTNe3RbeG4y', NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/152.0.0.0 Safari/537.36 Edg/152.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiQnN4bDZpbHRuVUtvSTJ2dFpPempuNHA4RlpyMjQ1QUlia0pIRXByaCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjk6Imh0dHA6Ly9sb2NhbGhvc3QvQUdNX1dlYl9zaXRlIjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1788610063),
('2CZcR91SrVA8r1LGkhYXF3lszjSsmj1E4mkxYjfo', NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/152.0.0.0 Safari/537.36 Edg/152.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZTRZR0xMcmNSR1FjTDRYbnhDUmJZbFRQanFvWmxoU2lFaUxmMWZLVSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjk6Imh0dHA6Ly9sb2NhbGhvc3QvQUdNX1dlYl9zaXRlIjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1788609857),
('3KbF4GSZAvwDCmdvXRVdEE6W48tWUeM3V6Hm2Gxk', NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/152.0.0.0 Safari/537.36 Edg/152.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoibGpyVG03UWdQUlZoWWF6YVJZRjNxVFFicklHUnlnNDE4NU1acGVzUSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjk6Imh0dHA6Ly9sb2NhbGhvc3QvQUdNX1dlYl9zaXRlIjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1788610166),
('5BIlKMjjbJHZtffh8A24M2UrD1EVFhjqumCYkp3a', NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/152.0.0.0 Safari/537.36 Edg/152.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoieHFCRWpSUThMZW1KMG01SURHQ1hMU2VVclkzak9RS0FnWmRJSUdOaiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjk6Imh0dHA6Ly9sb2NhbGhvc3QvQUdNX1dlYl9zaXRlIjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1788610074),
('7HHXNjrYL5cpMrN2ImgvJGqWKq8i9ZWyTPKMkolx', NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/152.0.0.0 Safari/537.36 Edg/152.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiSlZSRWI2V1loTlJNUXlEU2xweUFRTEtjd3pyVm1RTU9sMDA1R2RKciI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjk6Imh0dHA6Ly9sb2NhbGhvc3QvQUdNX1dlYl9zaXRlIjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1788610354),
('7sI6QxNu0mpa3c7ycLwHL64BlgmgjDuTfkw0Hh4R', NULL, '172.16.11.62', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiejMzQ2prSEhVdURzSkwyUW84NTd0M0RiUldManFFQmQ0bUtqanpPYyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzI6Imh0dHA6Ly8xNzIuMTYuMTguOTkvQUdNX1dlYl9zaXRlIjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1788613976),
('9nj0InYALYAOShXHmSx7C98wUko1hI1AjXi0T7ej', NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/152.0.0.0 Safari/537.36 Edg/152.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoidFRxYWJiUjdOQmFyeE1KVFhQajE0MUY1WTV1eVhoU1JONUd4bnhHSyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjk6Imh0dHA6Ly9sb2NhbGhvc3QvQUdNX1dlYl9zaXRlIjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1788610268),
('AlVVKAP9rXqj8ZlNWnhW3T4bPKjnejuW62Wv7AKG', NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/152.0.0.0 Safari/537.36 Edg/152.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiME9FNG5qN0hmaEhXbHdhcEpzclJERVhSUnMxQ2lvaFo1elFrR1NCViI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjk6Imh0dHA6Ly9sb2NhbGhvc3QvQUdNX1dlYl9zaXRlIjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1788610741),
('ciwslbJkMvXpTyr2hW0W5a0bQI3WQETdz4idYRXc', NULL, '::1', 'Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.26100.9168', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiMnpyaUR0bG00dEpZMzlkMmlqQlFXMWR4R0ZObWdYZDJhR2c1MGNWcCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjk6Imh0dHA6Ly9sb2NhbGhvc3QvQUdNX1dlYl9zaXRlIjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1788610080),
('fh88pog02vBDpnIn3mJgNrEwzEkFsNFrYpPL9lHD', NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/152.0.0.0 Safari/537.36 Edg/152.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZHpTRVBtTjdQamUyN0dzNWhyeHdMSTNuWFpWRm82WW5VN0dCV2xQSSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjk6Imh0dHA6Ly9sb2NhbGhvc3QvQUdNX1dlYl9zaXRlIjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1788610385),
('FRY5AJkhc8g9xRwoE3lpDT6uadiimNhZXXijQVOh', NULL, '::1', 'Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.26100.9168', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiaXhvOXlqamZCVWo2d2FOaHk5WTBHSGJvUEpLVGgzRTkyUGFKNG5RSyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjk6Imh0dHA6Ly9sb2NhbGhvc3QvQUdNX1dlYl9zaXRlIjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1788609762),
('GAbTTcHN1tshYhGaKjU5eri5rFMLKqJXKToJgPSc', NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/152.0.0.0 Safari/537.36 Edg/152.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiU2VDQ0ZxMTJNYWhQN0xlS0Z5S3pocEZiODJESjhNOENJdnlYZmFVVCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjk6Imh0dHA6Ly9sb2NhbGhvc3QvQUdNX1dlYl9zaXRlIjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1788608292),
('GuYH3Mj6too7zOaXaHGrmWZjamNLcc4kEVjiwcjG', NULL, '::1', 'Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.26100.9168', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoibk54NGdRM29Bd0NTYmFJbEFDSE5Rc0gxWlpXTW4zQVZhaG41NWs0ZCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjk6Imh0dHA6Ly9sb2NhbGhvc3QvQUdNX1dlYl9zaXRlIjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1788608775),
('Md1Hf1bwjWblSFUHcdw2C8S4d95TRyDbGlzsl12Z', NULL, '::1', 'Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.26100.9168', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoicnBaVzgyc2dwamczaDBiOU9jY1poUVJzdXczTzM1OVA5eTY4bDNwdCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjk6Imh0dHA6Ly9sb2NhbGhvc3QvQUdNX1dlYl9zaXRlIjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1788608382),
('nKhVH2JJtqpSZsl7cKLoI6p9fxpOkYy7NAMDAUcX', NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZm9PTndodGlDaGlmZWdzRFpKTjlyWWFVZTBJOXRwTEhhaER4alN6TSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjk6Imh0dHA6Ly9sb2NhbGhvc3QvQUdNX1dlYl9zaXRlIjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1788859577),
('PwpABYRV3X4Z1YzeUDQiWQAP16iHu3xTICyJWGyu', NULL, '172.16.18.99', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiWjZEcTNBY0FIMEVMNlhiTmcyc09SWFRRa0pNbHpSbHkzajl2WUhVbSI7czozOiJ1cmwiO2E6MTp7czo4OiJpbnRlbmRlZCI7czo0NzoiaHR0cDovLzE3Mi4xNi4xOC45OS9BR01fV2ViX3NpdGUvYWRtaW4vc2V0dGluZ3MiO31zOjk6Il9wcmV2aW91cyI7YToyOntzOjM6InVybCI7czozMjoiaHR0cDovLzE3Mi4xNi4xOC45OS9BR01fV2ViX3NpdGUiO3M6NToicm91dGUiO3M6NDoiaG9tZSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1788695602),
('qqsJXhczp9dh9ISt6GzQSNY62hC31u115OwEAM1u', NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/152.0.0.0 Safari/537.36 Edg/152.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiR09FOVpYR2doUXMxQ1ZLUDAwNnZndFZGMnpHTDdLTkpyaW9pVG5meiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjk6Imh0dHA6Ly9sb2NhbGhvc3QvQUdNX1dlYl9zaXRlIjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1788610766),
('rguqHOZx2FqtLfBhCzBytrjUy7R8OD2ucZoVPefE', 2, '172.16.18.99', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoicXJLWnpRUkFoS0RnQmNsSzNZSDV4d3Q3NFJyRlFoTG9STTNmYXJrUSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NDc6Imh0dHA6Ly8xNzIuMTYuMTguOTkvQUdNX1dlYl9zaXRlL2FkbWluL3NldHRpbmdzIjtzOjU6InJvdXRlIjtzOjIwOiJhZG1pbi5zZXR0aW5ncy5pbmRleCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fXM6MzoidXJsIjthOjA6e31zOjUwOiJsb2dpbl93ZWJfNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI7aToyO30=', 1788612046),
('rlMHdKr2HY6BDbP3HacxHVJ0zttbtVtR1Pqj4ElE', NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/152.0.0.0 Safari/537.36 Edg/152.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiTGxYRkgxb0VLdTB6aUMyWWg4UUZrZ0FyczQzYkZPeXZ0ekM4SHR6aiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjk6Imh0dHA6Ly9sb2NhbGhvc3QvQUdNX1dlYl9zaXRlIjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1788608283),
('RQATiBMrS0Etb1si7TWE2fDwrjJtjHEIsntuLtYz', NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/152.0.0.0 Safari/537.36 Edg/152.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoibHJlSVVncVI2Qm42WjZvQU5JVW8yS0hPYTgwYVA4eHBWcXYza2VPbyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjk6Imh0dHA6Ly9sb2NhbGhvc3QvQUdNX1dlYl9zaXRlIjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1788610126),
('SBHXn2dUeSwD36OQ5M8t8FnSzsKRlqeun0W3KgG7', NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/152.0.0.0 Safari/537.36 Edg/152.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoibFVjaThudVppSjdXMFNIWTg5cEwwVmliVFZRSklZdXMxNUY2dFVsQyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjk6Imh0dHA6Ly9sb2NhbGhvc3QvQUdNX1dlYl9zaXRlIjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1788611096),
('SHt0IKslTw87Sm9VucWTgLovhHAXkuUI9LVpwboT', NULL, '172.16.11.241', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiWlRmT2YwQzU5RENORGdHZ1VIRXNLSFpXWUxqRzBnU08zQ3kyRlJsRyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzI6Imh0dHA6Ly8xNzIuMTYuMTguOTkvQUdNX1dlYl9zaXRlIjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1788676984),
('SNRXkPTRvrqTzR2OCbTNpdjiDzIhVWqeYZSg5tKS', NULL, '::1', 'Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.26100.9168', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoic2dNREI1eEhXNFlIWE53TUQ2NGhhdlZOVWlMWFpnWmNOMnFSSkpPbSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjk6Imh0dHA6Ly9sb2NhbGhvc3QvQUdNX1dlYl9zaXRlIjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1788608275),
('Uz9f0UIgtTiZPzOsDIkvp7Db9cW2I7lzlaY7l1ik', NULL, '172.16.11.62', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoibjBmRjZqU2Ixc1VpWmtmQmE0NGxnSW9HUnN2ZUFkbUFobThPU0Z3NSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mzg6Imh0dHA6Ly8xNzIuMTYuMTguOTkvQUdNX1dlYl9zaXRlL2xvZ2luIjtzOjU6InJvdXRlIjtzOjU6ImxvZ2luIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czozOiJ1cmwiO2E6MTp7czo4OiJpbnRlbmRlZCI7czozODoiaHR0cDovLzE3Mi4xNi4xOC45OS9BR01fV2ViX3NpdGUvYWRtaW4iO319', 1788867481),
('v6215aagRkpkOJboXMpLALt4zAFAN6C5Ybk35tON', NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiNkFYT3dwbHFtZmQ5NkpXNjhtMXlKTXV4SGd2TjFuWEVMWXM4R0g1NSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjk6Imh0dHA6Ly9sb2NhbGhvc3QvQUdNX1dlYl9zaXRlIjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1788610431),
('wmRpqlzJP4258b1Xzg8ExS2tiyv8sos2Fev3GA4M', NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/152.0.0.0 Safari/537.36 Edg/152.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiRTFRTndlVHJkc2J4VW1ITzdBblQ1TjBLWFZ3VFNnSXZBdkN5RndGViI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjk6Imh0dHA6Ly9sb2NhbGhvc3QvQUdNX1dlYl9zaXRlIjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1788610030),
('xQ1t9fbyPSKIis7A7egqvHF8NeZubVpuK3XJwMvG', NULL, '::1', 'Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.26100.9168', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiVFlOcmZBN09VRG5Jc2VxTDlxV0x3YUFXeXJqeDZrUlFUbVBNN2w2aiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjk6Imh0dHA6Ly9sb2NhbGhvc3QvQUdNX1dlYl9zaXRlIjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1788610090),
('y9UgQ5ZWWyTwuLdChAWz6F5MYBuXKhCIOpgJRoLY', NULL, '::1', 'Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.26100.9168', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZmpPTXluYm9XQlNycDBNa1BEcUlKNzdzdXJtRjZ6MTB6MHpjbUFrMCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjk6Imh0dHA6Ly9sb2NhbGhvc3QvQUdNX1dlYl9zaXRlIjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1788610798),
('YgPOlQwSWSsZJVz6RYbMIOFy0MigzxE6Y4oQJy31', NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/152.0.0.0 Safari/537.36 Edg/152.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiU2xpYXlBVGRpVFZ4NVVtSzNBNVJHWGJqc3VwS05NeU9nTnFKM2h2dyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjk6Imh0dHA6Ly9sb2NhbGhvc3QvQUdNX1dlYl9zaXRlIjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1788610335),
('zLUeuxU6qtJ9TdkxGxj1utln3h9X4Sc46eZ4NKUV', NULL, '::1', 'Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.26100.9168', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiMFVTWUxyOFNUbFNYZkRyRm15U2xaUWw5VUlOWFprWHNMWDVzTGI3NCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjk6Imh0dHA6Ly9sb2NhbGhvc3QvQUdNX1dlYl9zaXRlIjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1788610175);

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `key` varchar(255) NOT NULL,
  `value` text DEFAULT NULL,
  `group` varchar(255) NOT NULL DEFAULT 'general',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `key`, `value`, `group`, `created_at`, `updated_at`) VALUES
(1, 'company_name', 'ABC AI System Limited', 'general', '2026-09-04 21:04:03', '2026-09-05 06:40:46'),
(2, 'company_tagline', 'Democratizing Artificial Intelligence', 'general', '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(3, 'founder_quote_by', 'Shakhawat Hossain, Managing Director', 'general', '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(4, 'copyright_year', '© 2025 ABC AI System Limited. All Rights Reserved.', 'general', '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(5, 'address', 'House 379, Road 6, Baridhara DOHS, Dhaka - 1206, Bangladesh', 'general', '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(6, 'email', 'sales@abcaisystemltd.com', 'general', '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(7, 'email_info', 'information@abcaisystemltd.com', 'general', '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(8, 'phone', '+88 01799-920150', 'general', '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(9, 'phone_tel', '+8801799920150', 'general', '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(10, 'website', 'www.abcaisystemltd.com', 'general', '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(11, 'linkedin', 'https://www.linkedin.com/company/107562399', 'general', '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(12, 'basis_url', 'https://basis.org.bd', 'general', '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(13, 'dcci_url', 'https://www.dhakachamber.com', 'general', '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(14, 'hero_badge', 'Pioneering Proprietary AI from Bangladesh', 'hero', '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(15, 'hero_title_1', 'Democratizing', 'hero', '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(16, 'hero_title_2', 'Artificial', 'hero', '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(17, 'hero_title_3', 'Intelligence', 'hero', '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(18, 'hero_sub', 'Empowering businesses with flagship AI solutions — no pre-trained models, zero hallucinations, and absolute data privacy.', 'hero', '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(19, 'hero_cta_primary', 'See Our Products', 'hero', '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(20, 'hero_cta_secondary', 'Book a Demo', 'hero', '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(21, 'about_tag', 'WHO WE ARE', 'about', '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(22, 'about_title', 'Building AI That Businesses Trust', 'about', '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(23, 'about_body', 'ABC AI System Limited is a pioneering AI solution developer headquartered in Dhaka, Bangladesh. Founded on the principle that \"AI should be accessible, accurate, and secure\" — we design flagship AI products, never relying on pre-trained models.', 'about', '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(24, 'about_image_caption', 'Proprietary AI Model', 'about', '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(25, 'about_image_sub', 'Built in Bangladesh · Serving the World', 'about', '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(26, 'vision_title', 'OUR VISION', 'about', '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(27, 'vision_text', 'To become a globally recognized leader in proprietary AI innovation, enabling businesses worldwide to harness the true power of artificial intelligence — securely, accurately, and without compromise.', 'about', '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(28, 'mission_title', 'OUR MISSION', 'about', '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(29, 'mission_text', 'To design and deliver intelligent, privacy-first AI solutions built on our proprietary model that drive measurable operational efficiency, cost savings, and competitive advantage for our clients across industries and geographies.', 'about', '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(30, 'values_tag', 'WHAT DEFINES US', 'about', '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(31, 'values_title', 'Core Values', 'about', '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(32, 'clients_tag', 'TRUSTED BY', 'about', '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(33, 'clients_title', 'Our Clients', 'about', '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(34, 'pilots_title', 'Pilot Running', 'about', '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(35, 'services_tag', 'SERVICES', 'services', '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(36, 'services_title', 'What We Do For You', 'services', '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(37, 'services_sub', 'From flagship products to end-to-end engineering — everything runs on our proprietary AI model.', 'services', '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(38, 'services_cta', 'Get a Free Consultation', 'services', '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(39, 'products_tag', 'PRODUCT PORTFOLIO', 'products', '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(40, 'products_title', 'Our Flagship AI Products', 'products', '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(41, 'products_sub', 'Built entirely on our own model. No pre-trained models. Your data never leaves your environment.', 'products', '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(42, 'more_products_tag', 'MORE PRODUCTS', 'products', '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(43, 'more_products_title', '6 More Powerful Solutions', 'products', '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(44, 'tech_tag', 'OUR TECHNOLOGY', 'technology', '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(45, 'tech_title', 'Built on Our Own AI Model', 'technology', '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(46, 'tech_sub', 'No external AI providers. No pre-trained models. Everything runs on our Proprietary Model — inside your infrastructure.', 'technology', '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(47, 'tech_cmp_tag', 'WHY ABC AI SYSTEM', 'technology', '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(48, 'tech_cmp_title', 'ABC AI System vs Generic AI', 'technology', '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(49, 'tech_adv_tag', 'WHY CHOOSE US', 'technology', '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(50, 'tech_adv_title', 'The ABC AI System Advantage', 'technology', '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(51, 'industries_tag', 'COVERAGE', 'industries', '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(52, 'industries_title', 'Transforming Every Sector', 'industries', '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(53, 'industries_sub', 'ABC AI System\'s AI products and services are designed to work across industries, geographies, and enterprise scales — from SMEs to large corporations.', 'industries', '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(54, 'leadership_tag', 'LEADERSHIP', 'leadership', '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(55, 'leadership_title', 'The Minds Behind ABC AI System', 'leadership', '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(56, 'leadership_sub', '6 leaders — Advisors & Core Team', 'leadership', '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(57, 'advisor_title', 'Advisory Panel', 'leadership', '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(58, 'core_title', 'Core Team', 'leadership', '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(59, 'founder_title', 'From the Founder', 'leadership', '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(60, 'founder_quotes', '[\"Why should businesses entrust their most sensitive data to black-box AI systems they cannot control?\",\"The answer drove us to build something fundamentally different — a proprietary AI model from the ground up. No third-party dependencies. No data leakage. No hallucinations. Just precise, deterministic, enterprise-grade intelligence that organizations can truly trust.\",\"Our mission extends beyond technology. We believe that the next wave of AI innovation will emerge from unexpected places — and Bangladesh, with its extraordinary talent pool, is poised to be at the forefront.\",\"Every product in our portfolio — from PULSE to Moina — was born from a real business challenge. We don\'t build technology for technology\'s sake. We build AI that delivers measurable outcomes: reduced costs, faster decisions, and competitive advantage.\"]', 'leadership', '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(61, 'method_tag', 'HOW WE WORK', 'methodology', '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(62, 'method_title', 'Research-Driven Approach', 'methodology', '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(63, 'method_sub', 'A structured seven-step process ensuring every solution is rigorously validated before deployment.', 'methodology', '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(64, 'contact_badge', 'GET IN TOUCH', 'contact', '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(65, 'contact_title', 'Let\'s Build Intelligence Together', 'contact', '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(66, 'contact_sub', 'Ready to explore how proprietary AI can transform your business? Reach out — we\'re ready to listen, understand, and build with you.', 'contact', '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(67, 'contact_cta', 'Send Us an Email', 'contact', '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(68, 'contact_head_label', 'Head Office', 'contact', '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(69, 'contact_email_label', 'Email', 'contact', '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(70, 'contact_phone_label', 'Phone', 'contact', '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(71, 'contact_follow_label', 'Follow us', 'contact', '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(72, 'contact_follow_linkedin', 'LinkedIn', 'contact', '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(73, 'contact_member_label', 'Member of', 'contact', '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(74, 'contact_form_title', 'Send a Message', 'contact', '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(75, 'footer_tagline', 'Democratizing Artificial Intelligence with proprietary, privacy-first solutions for enterprises.', 'footer', '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(76, 'footer_about_label', 'About Us', 'footer', '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(77, 'footer_leadership_label', 'Leadership', 'footer', '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(78, 'footer_technology_label', 'Technology', 'footer', '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(79, 'footer_industries_label', 'Industries', 'footer', '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(80, 'footer_why_label', 'Why Us', 'footer', '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(81, 'footer_contact_label', 'Contact', 'footer', '2026-09-04 21:04:03', '2026-09-04 21:04:03');

-- --------------------------------------------------------

--
-- Table structure for table `statistics`
--

CREATE TABLE `statistics` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `label` varchar(255) NOT NULL,
  `value` varchar(255) NOT NULL,
  `sub` varchar(255) DEFAULT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `statistics`
--

INSERT INTO `statistics` (`id`, `label`, `value`, `sub`, `sort_order`, `created_at`, `updated_at`) VALUES
(1, 'Flagship AI Products', '15+', 'Ready to deploy today', 0, '2026-09-04 21:04:03', '2026-09-04 21:42:09'),
(2, 'Data Privacy', '100%', 'Zero third-party access', 1, '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(3, 'Hallucinations', '0', 'Deterministic outputs', 2, '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(4, 'Industries Served', '10+', 'From banking to agriculture', 3, '2026-09-04 21:04:03', '2026-09-04 21:04:03');

-- --------------------------------------------------------

--
-- Table structure for table `team_members`
--

CREATE TABLE `team_members` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `category` enum('advisor','core') NOT NULL DEFAULT 'core',
  `bio` text DEFAULT NULL,
  `tags` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`tags`)),
  `links` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`links`)),
  `photo` varchar(255) DEFAULT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `team_members`
--

INSERT INTO `team_members` (`id`, `name`, `role`, `category`, `bio`, `tags`, `links`, `photo`, `sort_order`, `created_at`, `updated_at`) VALUES
(1, 'Osama Taseer', 'Advisor', 'advisor', 'Accomplished entrepreneur in the 100% export-oriented RMG Industry of Bangladesh. An engineer by education. Passions for AI and networks help take ABC AI System to the next level.', '[\"RMG Industry\",\"Business Chambers\"]', NULL, 'osama-taseer.jpg', 0, '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(2, 'Sabuj H Chowdhury, FCA', 'Advisor', 'advisor', 'Fellow Chartered Accountant from ICAB with 24+ years global experience. IIM Kolkata diploma. Former Regional CFO at HMD Global Oy, Business Controller at Microsoft and Nokia SE Asia & Pacific.', '[\"ICAB FCA\",\"IIM Kolkata\",\"Microsoft\",\"Nokia\"]', NULL, 'sabuj.jpg', 1, '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(3, 'Golam Farook', 'Advisor', 'advisor', 'Technology entrepreneur with 34+ years in IT. Chairman of AIMS, pioneer of ERP via DreamApps. IT background from Singapore National University; Management from University of Dhaka.', '[\"AIMS\",\"DreamApps\",\"34+ Years IT\"]', NULL, 'golam-farook.jpg', 2, '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(4, 'Dayal Kumar Barua', 'Chairman', 'core', 'Business leader providing strategic vision to ABC AI System. Heads Adip Group, overseeing Adip Power and Adip Trading Ltd.', '[\"Adip Group\",\"Adip Power\",\"Adip Trading Ltd.\"]', NULL, 'dayal.jpg', 0, '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(5, 'Shakhawat Hossain', 'Managing Director', 'core', 'AI expert and technical architect of ABC AI System\'s proprietary AI model. The visionary behind the zero-hallucination approach. Vice President, Data Transformers Inc. — Texas, USA.', '[\"Texas USA\",\"AI Architect\"]', NULL, 'shakhawat.jpg', 1, '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(6, 'S J Tarique', 'Director', 'core', 'Leads strategy, assesses needs, and develops tailored solutions. Leads Tech Cloud Ltd, Tech Cloud Venture, Zylo Lab, and Apricot (Real Estate).', '[\"Tech Cloud Ltd\",\"Tech Cloud Venture\",\"Zylo Lab\"]', '[\"https:\\/\\/zylo-lab.com\\/\",\"https:\\/\\/techcloudventure.com\\/\",\"https:\\/\\/techcloudltd.com\\/\"]', 'tarique.jpg', 2, '2026-09-04 21:04:03', '2026-09-04 21:04:03');

-- --------------------------------------------------------

--
-- Table structure for table `tech_domains`
--

CREATE TABLE `tech_domains` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `icon` varchar(255) NOT NULL DEFAULT '?',
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tech_domains`
--

INSERT INTO `tech_domains` (`id`, `title`, `description`, `icon`, `sort_order`, `created_at`, `updated_at`) VALUES
(1, 'Artificial Intelligence', 'Machine Learning · NLP · Computer Vision · Decision Support & Reasoning Models', '🤖', 0, '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(2, 'Big Data & Analytics', 'Scale-ready pipelines, real-time intelligence, and BI at any volume.', '📊', 1, '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(3, 'Data Mining', 'Automated pattern recognition and anomaly detection across massive datasets.', '⛏️', 2, '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(4, 'Internet of Things', 'Sensor networks, edge computing, and intelligent physical infrastructure.', '📡', 3, '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(5, 'Robotics', 'Autonomous systems for industrial, agricultural, and service robotics.', '🦾', 4, '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(6, 'ERP Platforms', 'Oracle & SAP implementation with a proprietary AI automation layer.', '🗂️', 5, '2026-09-04 21:04:03', '2026-09-04 21:04:03'),
(7, 'AR / VR / MR', 'Immersive enterprise training, simulation, and visualization experiences.', '🥽', 6, '2026-09-04 21:04:03', '2026-09-04 21:04:03');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(2, 'Site Administrator', 'admin@abcaisystemltd.com', '2026-09-05 04:39:26', '$2y$12$iXqEu5InrLssqT5dodqnMu0FUjXknfIbav4kER.WGtmYUSehzg/1q', NULL, '2026-09-05 04:39:26', '2026-09-05 04:39:26');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `advantages`
--
ALTER TABLE `advantages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_expiration_index` (`expiration`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_locks_expiration_index` (`expiration`);

--
-- Indexes for table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `comparisons`
--
ALTER TABLE `comparisons`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contact_messages`
--
ALTER TABLE `contact_messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `core_values`
--
ALTER TABLE `core_values`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `industries`
--
ALTER TABLE `industries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `methodologies`
--
ALTER TABLE `methodologies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `services_slug_unique` (`slug`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `settings_key_unique` (`key`),
  ADD KEY `settings_group_index` (`group`);

--
-- Indexes for table `statistics`
--
ALTER TABLE `statistics`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `team_members`
--
ALTER TABLE `team_members`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tech_domains`
--
ALTER TABLE `tech_domains`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `advantages`
--
ALTER TABLE `advantages`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `clients`
--
ALTER TABLE `clients`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `comparisons`
--
ALTER TABLE `comparisons`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `contact_messages`
--
ALTER TABLE `contact_messages`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `core_values`
--
ALTER TABLE `core_values`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `industries`
--
ALTER TABLE `industries`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `methodologies`
--
ALTER TABLE `methodologies`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- AUTO_INCREMENT for table `statistics`
--
ALTER TABLE `statistics`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `team_members`
--
ALTER TABLE `team_members`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `tech_domains`
--
ALTER TABLE `tech_domains`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
