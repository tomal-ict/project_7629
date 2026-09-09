<?php

namespace Database\Seeders;

use App\Models\Advantage;
use App\Models\Client;
use App\Models\Comparison;
use App\Models\ContactMessage;
use App\Models\CoreValue;
use App\Models\Industry;
use App\Models\Methodology;
use App\Models\Product;
use App\Models\Service;
use App\Models\Setting;
use App\Models\Statistic;
use App\Models\TeamMember;
use App\Models\TechDomain;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->seedSettings();
        $this->seedStatistics();
        $this->seedServices();
        $this->seedProducts();
        $this->seedTeamMembers();
        $this->seedClients();
        $this->seedIndustries();
        $this->seedTechDomains();
        $this->seedCoreValues();
        $this->seedAdvantages();
        $this->seedMethodologies();
        $this->seedComparisons();

        User::query()->updateOrCreate(
            ['email' => 'admin@abcaisystemltd.com'],
            [
                'name' => 'Site Administrator',
                'password' => Hash::make('admin123'),
                'email_verified_at' => now(),
            ]
        );
    }

    private function seedSettings(): void
    {
        $settings = [
            'general' => [
                'company_name' => 'ABC AI System Limited',
                'company_tagline' => 'Democratizing Artificial Intelligence',
                'founder_quote_by' => 'Shakhawat Hossain, Managing Director',
                'copyright_year' => '© 2025 ABC AI System Limited. All Rights Reserved.',
                'address' => 'House 379, Road 6, Baridhara DOHS, Dhaka - 1206, Bangladesh',
                'email' => 'sales@abcaisystemltd.com',
                'email_info' => 'information@abcaisystemltd.com',
                'phone' => '+88 01799-920150',
                'phone_tel' => '+8801799920150',
                'website' => 'www.abcaisystemltd.com',
                'linkedin' => 'https://www.linkedin.com/company/107562399',
                'basis_url' => 'https://basis.org.bd',
                'dcci_url' => 'https://www.dhakachamber.com',
            ],
            'hero' => [
                'hero_badge' => 'Pioneering Proprietary AI from Bangladesh',
                'hero_title_1' => 'Democratizing',
                'hero_title_2' => 'Artificial',
                'hero_title_3' => 'Intelligence',
                'hero_sub' => 'Empowering businesses with flagship AI solutions — no pre-trained models, zero hallucinations, and absolute data privacy.',
                'hero_cta_primary' => 'See Our Products',
                'hero_cta_secondary' => 'Book a Demo',
            ],
            'about' => [
                'about_tag' => 'WHO WE ARE',
                'about_title' => 'Building AI That Businesses Trust',
                'about_body' => 'ABC AI System Limited is a pioneering AI solution developer headquartered in Dhaka, Bangladesh. Founded on the principle that "AI should be accessible, accurate, and secure" — we design flagship AI products, never relying on pre-trained models.',
                'about_image_caption' => 'Proprietary AI Model',
                'about_image_sub' => 'Built in Bangladesh · Serving the World',
                'vision_title' => 'OUR VISION',
                'vision_text' => 'To become a globally recognized leader in proprietary AI innovation, enabling businesses worldwide to harness the true power of artificial intelligence — securely, accurately, and without compromise.',
                'mission_title' => 'OUR MISSION',
                'mission_text' => 'To design and deliver intelligent, privacy-first AI solutions built on our proprietary model that drive measurable operational efficiency, cost savings, and competitive advantage for our clients across industries and geographies.',
                'values_tag' => 'WHAT DEFINES US',
                'values_title' => 'Core Values',
                'clients_tag' => 'TRUSTED BY',
                'clients_title' => 'Our Clients',
                'pilots_title' => 'Pilot Running',
            ],
            'services' => [
                'services_tag' => 'SERVICES',
                'services_title' => 'What We Do For You',
                'services_sub' => 'From flagship products to end-to-end engineering — everything runs on our proprietary AI model.',
                'services_cta' => 'Get a Free Consultation',
            ],
            'products' => [
                'products_tag' => 'PRODUCT PORTFOLIO',
                'products_title' => 'Our Flagship AI Products',
                'products_sub' => 'Built entirely on our own model. No pre-trained models. Your data never leaves your environment.',
                'more_products_tag' => 'MORE PRODUCTS',
                'more_products_title' => '6 More Powerful Solutions',
            ],
            'technology' => [
                'tech_tag' => 'OUR TECHNOLOGY',
                'tech_title' => 'Built on Our Own AI Model',
                'tech_sub' => 'No external AI providers. No pre-trained models. Everything runs on our Proprietary Model — inside your infrastructure.',
                'tech_cmp_tag' => 'WHY ABC AI SYSTEM',
                'tech_cmp_title' => 'ABC AI System vs Generic AI',
                'tech_adv_tag' => 'WHY CHOOSE US',
                'tech_adv_title' => 'The ABC AI System Advantage',
            ],
            'industries' => [
                'industries_tag' => 'COVERAGE',
                'industries_title' => 'Transforming Every Sector',
                'industries_sub' => 'ABC AI System\'s AI products and services are designed to work across industries, geographies, and enterprise scales — from SMEs to large corporations.',
            ],
            'leadership' => [
                'leadership_tag' => 'LEADERSHIP',
                'leadership_title' => 'The Minds Behind ABC AI System',
                'leadership_sub' => '6 leaders — Advisors & Core Team',
                'advisor_title' => 'Advisory Panel',
                'core_title' => 'Core Team',
                'founder_title' => 'From the Founder',
                'founder_quotes' => [
                    'Why should businesses entrust their most sensitive data to black-box AI systems they cannot control?',
                    'The answer drove us to build something fundamentally different — a proprietary AI model from the ground up. No third-party dependencies. No data leakage. No hallucinations. Just precise, deterministic, enterprise-grade intelligence that organizations can truly trust.',
                    'Our mission extends beyond technology. We believe that the next wave of AI innovation will emerge from unexpected places — and Bangladesh, with its extraordinary talent pool, is poised to be at the forefront.',
                    'Every product in our portfolio — from PULSE to Moina — was born from a real business challenge. We don\'t build technology for technology\'s sake. We build AI that delivers measurable outcomes: reduced costs, faster decisions, and competitive advantage.',
                ],
            ],
            'methodology' => [
                'method_tag' => 'HOW WE WORK',
                'method_title' => 'Research-Driven Approach',
                'method_sub' => 'A structured seven-step process ensuring every solution is rigorously validated before deployment.',
            ],
            'contact' => [
                'contact_badge' => 'GET IN TOUCH',
                'contact_title' => 'Let\'s Build Intelligence Together',
                'contact_sub' => 'Ready to explore how proprietary AI can transform your business? Reach out — we\'re ready to listen, understand, and build with you.',
                'contact_cta' => 'Send Us an Email',
                'contact_head_label' => 'Head Office',
                'contact_email_label' => 'Email',
                'contact_phone_label' => 'Phone',
                'contact_follow_label' => 'Follow us',
                'contact_follow_linkedin' => 'LinkedIn',
                'contact_member_label' => 'Member of',
                'contact_form_title' => 'Send a Message',
            ],
            'footer' => [
                'footer_tagline' => 'Democratizing Artificial Intelligence with proprietary, privacy-first solutions for enterprises.',
                'footer_about_label' => 'About Us',
                'footer_leadership_label' => 'Leadership',
                'footer_technology_label' => 'Technology',
                'footer_industries_label' => 'Industries',
                'footer_why_label' => 'Why Us',
                'footer_contact_label' => 'Contact',
            ],
        ];

        foreach ($settings as $group => $items) {
            foreach ($items as $key => $value) {
                Setting::updateOrCreate(
                    ['key' => $key],
                    ['value' => is_array($value) ? json_encode($value, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) : $value, 'group' => $group]
                );
            }
        }
    }

    private function seedStatistics(): void
    {
        $stats = [
            ['label' => 'Flagship AI Products', 'value' => '15+', 'sub' => 'Ready to deploy today'],
            ['label' => 'Data Privacy', 'value' => '100%', 'sub' => 'Zero third-party access'],
            ['label' => 'Hallucinations', 'value' => '0', 'sub' => 'Deterministic outputs'],
            ['label' => 'Industries Served', 'value' => '10+', 'sub' => 'From banking to agriculture'],
        ];

        foreach ($stats as $i => $s) {
            Statistic::updateOrCreate(['label' => $s['label']], $s + ['sort_order' => $i]);
        }
    }

    private function seedServices(): void
    {
        $services = [
            [
                'slug' => 'proprietary-ai-products', 'title' => 'Flagship AI Products', 'subtitle' => 'Deploy in Days, Not Months',
                'icon' => '🚀', 'color' => '#2563eb', 'color_light' => '#eff6ff',
                'description' => 'Deploy any of our 15 ready-built AI solutions directly into your operations — live in days, not months.',
                'intro' => 'Our flagship AI product suite covers analytics, document intelligence, computer vision, conversational AI and building automation. Each product is fully built, tested and ready to be configured to your environment.',
                'features' => ['Ready-to-deploy fully tested', 'Customizable to your workflows', 'Full onboarding & staff training', 'Ongoing support & updates'],
                'benefits' => ['No Pre-trained Models', 'Zero hallucinations', '100% data privacy', 'Offline capability', 'Rapid deployment'],
                'usecases' => ['ERP analytics via natural language', 'Document extraction & posting', 'AI attendance via CCTV', 'Bangla voice chatbots', 'Mobile OCR to ERP'],
                'gallery_images' => [
                    'photo-1677442135703-1787eea5ce01', 'photo-1620712943543-bcc4688e7485', 'photo-1551288049-bebda4e38f71',
                ],
                'steps' => [
                    ['title' => 'Discovery', 'desc' => 'Understand your environment, data and goals.'],
                    ['title' => 'Configuration', 'desc' => 'Fit the product to your processes and data.'],
                    ['title' => 'Integration', 'desc' => 'Connect with your ERP, CCTV or infrastructure.'],
                    ['title' => 'Validation', 'desc' => 'Rigorous testing with your real-world data.'],
                    ['title' => 'Go-Live', 'desc' => 'Deploy, train your team and launch.'],
                    ['title' => 'Support', 'desc' => 'Continuous optimization and updates.'],
                ],
                'why_us' => 'Every flagship product runs entirely on our proprietary AI model — no pre-trained models, no third-party APIs, and absolute data privacy.',
                'stats' => [['value' => '15+', 'label' => 'Ready Products'], ['value' => 'Days', 'label' => 'Deployment Time'], ['value' => '0', 'label' => 'Hallucinations'], ['value' => '100%', 'label' => 'Data Privacy']],
                'hero_image' => 'photo-1677442135703-1787eea5ce01',
            ],
            [
                'slug' => 'custom-ai-development', 'title' => 'Custom AI Development', 'subtitle' => 'Built From Scratch on Our Proprietary Model',
                'icon' => '🧩', 'color' => '#7c3aed', 'color_light' => '#f3efff',
                'description' => 'Bespoke AI systems built from the ground up on our Proprietary Model. No templates. No compromises.',
                'intro' => 'When off-the-shelf solutions cannot capture your complexity, we design and engineer a custom AI system tailored to your exact workflows — fully owned by you.',
                'features' => ['End-to-end development', 'No Pre-trained Models', 'Full system integration', 'Source code ownership available'],
                'benefits' => ['Fully custom to your workflow', 'Proprietary AI Model', 'Complete data sovereignty', 'IP ownership available', 'Long-term partnership'],
                'usecases' => ['Custom NLP for local dialects', 'Industry-specific computer vision', 'Bespoke decision support systems', 'Custom reasoning models', 'AI-augmented ERP workflows'],
                'gallery_images' => [
                    'photo-1581091226825-a6a2a5aee158', 'photo-1524178232363-1fb2b075b655', 'photo-1554224155-6726b3ff858f',
                ],
                'steps' => [
                    ['title' => 'Discovery & Requirements', 'desc' => 'Deep-dive into your business problem.'],
                    ['title' => 'Architecture Design', 'desc' => 'Design the model and integration blueprint.'],
                    ['title' => 'Prototype & Validate', 'desc' => 'Rapid prototype proven with real data.'],
                    ['title' => 'Full Development', 'desc' => 'Engineering the production AI system.'],
                    ['title' => 'Integration & Testing', 'desc' => 'Connect and validate end-to-end.'],
                    ['title' => 'Deployment & Handover', 'desc' => 'Go-live with full documentation & IP transfer.'],
                ],
                'why_us' => 'Unlike competitors who wrap traditional AI models, we build from scratch. You get full IP ownership and a team that stays with you long after go-live.',
                'stats' => [['value' => '12+', 'label' => 'Custom Builds'], ['value' => '100%', 'label' => 'Proprietary Model'], ['value' => '0', 'label' => 'Pre-trained Models'], ['value' => '6mo', 'label' => 'Avg. Delivery']],
                'hero_image' => 'photo-1581091226825-a6a2a5aee158',
            ],
            [
                'slug' => 'ai-research-rnd', 'title' => 'AI Research & R&D', 'subtitle' => 'Pushing the Boundaries of Proprietary AI',
                'icon' => '🔬', 'color' => '#0ea5e9', 'color_light' => '#eff8ff',
                'description' => 'Collaborative research partnerships pushing ML, NLP, Computer Vision, and Reasoning Models forward.',
                'intro' => 'Bring a research question, a domain challenge, or a moonshot idea. Our lab partners with you to invent, validate and publish.',
                'features' => ['Cutting-edge research capability', 'Joint IP development', 'Published research & white papers', 'Lab access & co-innovation'],
                'benefits' => ['Access to private AI lab', 'Joint IP ownership', 'Published outcomes', 'Long-term research contracts', 'Bangladesh + global talent'],
                'usecases' => ['ML model development for specialized domains', 'Low-resource NLP for Bangla', 'Computer vision for manufacturing QC', 'Reasoning model development', 'Decision support R&D'],
                'gallery_images' => [
                    'photo-1737644467636-6b0053476bb2', 'photo-1620712943543-bcc4688e7485', 'photo-1551288049-bebda4e38f71',
                ],
                'steps' => [
                    ['title' => 'Problem Definition', 'desc' => 'Frame the research question clearly.'],
                    ['title' => 'Literature & Landscape Review', 'desc' => 'Map existing work and gaps.'],
                    ['title' => 'Hypothesis & Experimentation', 'desc' => 'Design and run controlled experiments.'],
                    ['title' => 'Model Development', 'desc' => 'Build the new proprietary model.'],
                    ['title' => 'Validation & Benchmarking', 'desc' => 'Prove performance against baselines.'],
                    ['title' => 'Deployment & Documentation', 'desc' => 'Publish, patent or productize.'],
                ],
                'why_us' => 'ABC AI System is the only AI R&D partner in Bangladesh with a fully Proprietary AI Model. Your research data never leaves your environment.',
                'stats' => [['value' => '5+', 'label' => 'Years of R&D'], ['value' => '3', 'label' => 'Research Labs'], ['value' => '15+', 'label' => 'Engineers'], ['value' => '100%', 'label' => 'Proprietary']],
                'hero_image' => 'photo-1737644467636-6b0053476bb2',
            ],
            [
                'slug' => 'ai-training-capacity', 'title' => 'AI Training & Capacity', 'subtitle' => 'Enable Your Teams to Own AI',
                'icon' => '🎓', 'color' => '#059669', 'color_light' => '#ecfdf5',
                'description' => 'Structured programs that enable your teams to use, manage, and govern AI with confidence.',
                'intro' => 'AI succeeds only when people can run it. We build your internal capability with hands-on programs in Bangla and English.',
                'features' => ['Hands-on workshops & labs', 'AI governance frameworks', 'Team certification programs', 'Custom learning paths'],
                'benefits' => ['Role-based learning paths', 'Bangla & English delivery', 'Hands-on with real tools', 'Certification on completion', 'On-site & remote options'],
                'usecases' => ['AI literacy for C-suite', 'Technical AI practitioner programs', 'Prompt engineering workshops', 'AI governance & compliance training', 'Department-specific AI use cases'],
                'gallery_images' => [
                    'photo-1524178232363-1fb2b075b655', 'photo-1554224155-6726b3ff858f', 'photo-1558494949-ef010cbdcc31',
                ],
                'steps' => [
                    ['title' => 'Assessment', 'desc' => 'Evaluate current AI maturity.'],
                    ['title' => 'Curriculum Design', 'desc' => 'Tailor role-based learning paths.'],
                    ['title' => 'Hands-On Labs', 'desc' => 'Practice with our real tools.'],
                    ['title' => 'Governance Training', 'desc' => 'Embed responsible AI practices.'],
                    ['title' => 'Certification', 'desc' => 'Validate team capability.'],
                    ['title' => 'Continuous Enablement', 'desc' => 'Ongoing upskilling as AI evolves.'],
                ],
                'why_us' => 'We train on the proprietary AI model itself — not generic abstractions — so your team governs and operates real, deployed intelligence.',
                'stats' => [['value' => '500+', 'label' => 'Professionals Trained'], ['value' => '2', 'label' => 'Delivery Languages'], ['value' => '12', 'label' => 'Module Tracks'], ['value' => '100%', 'label' => 'Hands-On']],
                'hero_image' => 'photo-1524178232363-1fb2b075b655',
            ],
            [
                'slug' => 'ai-audit-compliance', 'title' => 'AI Audit & Compliance', 'subtitle' => 'Independent, Rigorous AI Evaluation',
                'icon' => '🛡️', 'color' => '#d97706', 'color_light' => '#fffbeb',
                'description' => 'Independent, rigorous evaluation of any AI system — whether built by ABC AI System or a third party — for accuracy, hallucination rate, bias, data security, and full regulatory compliance.',
                'intro' => 'Before you deploy or after, our engineers audit your AI stack for accuracy, hallucination rate, bias, data security and regulatory compliance.',
                'features' => ['Hallucination audit', 'Security & privacy assessment', 'Compliance certification', 'Ongoing monitoring'],
                'benefits' => ['Vendor-neutral evaluation', 'Regulatory compliance', 'Detailed audit reports', 'Bias detection', 'Security risk mapping'],
                'usecases' => ['Pre-deployment AI audits', 'Regulatory compliance review', 'Third-party AI vendor assessment', 'Ongoing AI performance monitoring', 'Data privacy risk assessments'],
                'gallery_images' => [
                    'photo-1554224155-6726b3ff858f', 'photo-1558494949-ef010cbdcc31', 'photo-1486325212027-8081e485255e',
                ],
                'steps' => [
                    ['title' => 'Scoping', 'desc' => 'Define audit boundaries and criteria.'],
                    ['title' => 'Data & Model Review', 'desc' => 'Inspect models, data flows and storage.'],
                    ['title' => 'Bias & Accuracy Testing', 'desc' => 'Empirical hallucination & bias tests.'],
                    ['title' => 'Security Assessment', 'desc' => 'Penetration and privacy risk mapping.'],
                    ['title' => 'Report & Certification', 'desc' => 'Detailed report and compliance cert.'],
                    ['title' => 'Monitoring', 'desc' => 'Ongoing performance surveillance.'],
                ],
                'why_us' => 'Vendor-neutral by design — we audit any AI system, including our own, with the same rigor.',
                'stats' => [['value' => '100%', 'label' => 'Coverage'], ['value' => '0', 'label' => 'Bias Tolerance'], ['value' => '24h', 'label' => 'Response'], ['value' => 'Full', 'label' => 'Audit Trail']],
                'hero_image' => 'photo-1554224155-6726b3ff858f',
                'featured_on_home' => false,
            ],
            [
                'slug' => 'iot-automation', 'title' => 'IoT and Robotics', 'subtitle' => 'Intelligent Physical Infrastructure',
                'icon' => '🤖', 'color' => '#dc2626', 'color_light' => '#fef2f2',
                'description' => 'End-to-end IoT infrastructure for smart factories, intelligent offices, and precision agriculture.',
                'intro' => 'From sensor design to real-time dashboards, we connect the physical world to your AI model for autonomous decisions.',
                'features' => ['Custom sensor network design', 'Real-time monitoring dashboards', 'Predictive maintenance systems', 'Cloud & edge integration'],
                'benefits' => ['Full infrastructure design', 'AI-powered analytics', 'Edge + cloud deployment', 'Predictive intelligence', 'Multi-site management'],
                'usecases' => ['Smart factory automation', 'Agricultural IoT & precision farming', 'Smart office building management', 'Cold chain monitoring', 'Industrial predictive maintenance'],
                'gallery_images' => [
                    'photo-1485827404703-89b55fcc595e', 'photo-1581092160562-40aa08e78837', 'photo-1581092918056-0c4c3acd3789',
                ],
                'steps' => [
                    ['title' => 'Feasibility Study', 'desc' => 'Survey the physical environment.'],
                    ['title' => 'Sensor Architecture', 'desc' => 'Design node, gateway and network layout.'],
                    ['title' => 'Deployment', 'desc' => 'Install and commission hardware.'],
                    ['title' => 'AI Integration', 'desc' => 'Connect streams to the proprietary model.'],
                    ['title' => 'Dashboard & Alerts', 'desc' => 'Real-time visual intelligence.'],
                    ['title' => 'Optimization', 'desc' => 'Continuous tuning and expansion.'],
                ],
                'why_us' => 'We cover the full stack — sensors, gateways, edge processing, and proprietary AI analytics — under one team.',
                'stats' => [['value' => '10k+', 'label' => 'Sensors Deployed'], ['value' => '35%', 'label' => 'Energy Saved Avg.'], ['value' => '99.9%', 'label' => 'Uptime'], ['value' => 'Edge', 'label' => 'First-Class']],
                'hero_image' => 'photo-1581092160562-40aa08e78837',
            ],
            [
                'slug' => 'big-data-mining', 'title' => 'Big Data & Mining', 'subtitle' => 'From Noise to Intelligence',
                'icon' => '📊', 'color' => '#0891b2', 'color_light' => '#ecfeff',
                'description' => 'Automated pipelines that extract actionable intelligence from large-scale, messy data.',
                'intro' => 'We engineer automated pipelines that discover patterns and anomalies in your enterprise data — at any scale.',
                'features' => ['Automated data pipeline engineering', 'Pattern recognition & anomaly detection', 'BI dashboards & intelligence reports', 'Data lake architecture'],
                'benefits' => ['Automated data processing', 'Real-time intelligence', 'Scalable architecture', 'AI-powered analysis', 'Multi-source integration'],
                'usecases' => ['Sales & operations analytics', 'Customer behavior analysis', 'Supply chain intelligence', 'Financial risk pattern detection', 'Social media data mining'],
                'gallery_images' => [
                    'photo-1551288049-bebda4e38f71', 'photo-1558494949-ef010cbdcc31', 'photo-1460925895917-afdab827c52f',
                ],
                'steps' => [
                    ['title' => 'Data Audit', 'desc' => 'Map sources, quality and volume.'],
                    ['title' => 'Pipeline Engineering', 'desc' => 'Build automated ingestion & cleaning.'],
                    ['title' => 'Model Fitting', 'desc' => 'Train proprietary mining models.'],
                    ['title' => 'Pattern Discovery', 'desc' => 'Surface anomalies and insights.'],
                    ['title' => 'Visual Intelligence', 'desc' => 'Dashboards your teams will use.'],
                    ['title' => 'Governance', 'desc' => 'Access control and audit trails.'],
                ],
                'why_us' => 'Your data is analyzed by our proprietary model inside your environment — never shipped to a cloud vendor.',
                'stats' => [['value' => 'PB', 'label' => 'Scale Ready'], ['value' => '24/7', 'label' => 'Pipe Processing'], ['value' => '50+', 'label' => 'Source Types'], ['value' => '0', 'label' => 'Data Egress']],
                'hero_image' => 'photo-1551288049-bebda4e38f71',
            ],
            [
                'slug' => 'erp-implementation', 'title' => 'ERP Implementation', 'subtitle' => 'Oracle & SAP, Augmented by AI',
                'icon' => '🗂️', 'color' => '#4f46e5', 'color_light' => '#eef2ff',
                'description' => 'Oracle and SAP ERP with our proprietary AI automation layer on top.',
                'intro' => 'We implement Oracle and SAP ERP — then place a proprietary AI layer on top so complex workflows run themselves.',
                'features' => ['Oracle & SAP certified consultants', 'AI automation layer on ERP workflows', 'Post-go-live support & optimization', 'User training & change management'],
                'benefits' => ['Certified ERP consultants', 'AI-augmented workflows', 'Reduced manual effort', 'Faster go-live', 'Ongoing optimization'],
                'usecases' => ['Oracle ERP implementation', 'SAP S/4HANA rollout', 'ERP + AI document automation', 'ERP + OCR for invoice processing', 'Multi-entity ERP consolidation'],
                'gallery_images' => [
                    'photo-1664575602276-acd073f101bc', 'photo-1554224155-6726b3ff858f', 'photo-1460925895917-afdab827c52f',
                ],
                'steps' => [
                    ['title' => 'Assessment', 'desc' => 'Evaluate processes and legacy systems.'],
                    ['title' => 'Blueprint', 'desc' => 'Design the target ERP architecture.'],
                    ['title' => 'Build & Configure', 'desc' => 'Configure Oracle/SAP modules.'],
                    ['title' => 'AI Layer', 'desc' => 'Automate workflows with proprietary AI.'],
                    ['title' => 'Testing', 'desc' => 'Validate end-to-end business scenarios.'],
                    ['title' => 'Go-Live & Support', 'desc' => 'Cutover, training and optimization.'],
                ],
                'why_us' => 'We pair certified enterprise ERP expertise with an AI automation layer that no vanilla implementation offers.',
                'stats' => [['value' => '100%', 'label' => 'Certified Teams'], ['value' => '2x', 'label' => 'Faster Go-Live'], ['value' => '50%', 'label' => 'Manual Work Cut'], ['value' => '24/7', 'label' => 'Post-Go-Live Care']],
                'hero_image' => 'photo-1554224155-6726b3ff858f',
            ],
            [
                'slug' => 'ar-vr-mr', 'title' => 'AR / VR / MR', 'subtitle' => 'Immersive Enterprise Experiences',
                'icon' => '🥽', 'color' => '#9333ea', 'color_light' => '#faf5ff',
                'description' => 'Immersive AR/VR/MR for enterprise training, simulation, product visualization, and remote collaboration.',
                'intro' => 'Translate complex training and design problems into immersive experiences your people can learn and act inside.',
                'features' => ['Custom AR/VR application development', 'Industrial training simulations', 'Product & architectural visualization', 'Remote collaboration environments'],
                'benefits' => ['Immersive learning outcomes', 'Safer hands-on training', 'Visual sales & design review', 'Remote collaboration', 'Measurable retention gains'],
                'usecases' => ['Industrial safety training', 'Equipment maintenance simulation', 'Real estate & architecture walkthroughs', 'Remote expert support', 'Product design reviews'],
                'gallery_images' => [
                    'photo-1626379953822-baec19c3accd', 'photo-1593508512255-86ab42a8e620', 'photo-1617802690992-15d93263d3a9',
                ],
                'steps' => [
                    ['title' => 'Use Case Discovery', 'desc' => 'Pinpoint highest-ROI immersive scenarios.'],
                    ['title' => 'Experience Design', 'desc' => 'Storyboard interactions and assets.'],
                    ['title' => '3D Asset Creation', 'desc' => 'Model your environments & products.'],
                    ['title' => 'Development', 'desc' => 'Build the AR/VR/MR application.'],
                    ['title' => 'Pilot Testing', 'desc' => 'Validate with real users.'],
                    ['title' => 'Deployment', 'desc' => 'Roll out across the enterprise.'],
                ],
                'why_us' => 'We combine immersive development with proprietary AI — for adaptive, intelligent training that responds to the learner.',
                'stats' => [['value' => '3D', 'label' => 'Native Experiences'], ['value' => '90%', 'label' => 'Retention Boost'], ['value' => '100%', 'label' => 'On-Premise Option'], ['value' => '24/7', 'label' => 'Remote Support']],
                'hero_image' => 'photo-1626379953822-baec19c3accd',
            ],
        ];

        foreach ($services as $i => $s) {
            $s['sort_order'] = $i;
            $s['gallery_images'] = array_map(fn ($im) => static::unsplashUrl($im), $s['gallery_images']);
            $s['hero_image'] = static::unsplashUrl($s['hero_image']);
            Service::updateOrCreate(['slug' => $s['slug']], $s);
        }
    }

    private function seedProducts(): void
    {
        $flagship = [
            [
                'name' => 'PULSE', 'tag' => 'Analytics', 'metric' => '< 1 sec Query Response', 'is_flagship' => true, 'sort_order' => 0,
                'description' => 'Ask any business question in Bangla or English and get instant live insights from your ERP. No SQL, no data analyst, no waiting.',
                'features' => ['Natural language queries — Bangla & English', 'Auto-generated dashboards & live reports', 'Connects to any ERP without ETL', 'No middle layer data storage'],
                'logo' => 'pluse.jpeg',
                'demo' => [
                    'kind' => 'pulse',
                    'queries' => ['Show top 5 products by total spending', 'What are the most popular sales categories?', 'Calculate revenue vs cost for all products'],
                    'sidebar' => ['Query', 'Reports', 'Database', 'History'],
                    'databases' => 3,
                    'steps' => ['Understand', 'Scan data', 'Build report'],
                    'chartLabel' => 'Revenue by category',
                    'topLabel' => 'Top products',
                    'topItems' => [['Label A', '$32k'], ['Label B', '$27k'], ['Label C', '$21k'], ['Label D', '$16k'], ['Label E', '$13k']],
                ],
            ],
            [
                'name' => 'Brain ClerK', 'tag' => 'PDF Intelligence', 'metric' => 'Any PDF Business Documents', 'is_flagship' => true, 'sort_order' => 1,
                'description' => 'Upload any business-related PDF. Brain ClerK extracts the key data, generates a clear report, and saves it securely for future access.',
                'features' => ['Invoices, sales, finance & operational PDFs', 'Automatically extracts key business data', 'Generates structured, ready-to-use reports', 'Saves every report'],
                'logo' => 'brainclerk-logo.jpg',
                'demo' => [
                    'kind' => 'clerk',
                    'sidebar' => ['PDF Library', 'Extracted Data', 'Reports', 'Saved'],
                    'files' => ['Quarterly_Sales_Report.pdf', 'Supplier_Cost_Analysis.pdf', 'Operations_Performance.pdf'],
                    'steps' => ['Read PDF', 'Extract Data', 'Generate Report', 'Save Report'],
                ],
            ],
            [
                'name' => 'DotLog', 'tag' => 'Computer Vision', 'metric' => '99.8% Face Recognition Accuracy', 'is_flagship' => true, 'sort_order' => 2,
                'description' => 'Your existing CCTV cameras become a full attendance system overnight. No hardware, no fingerprints, no queues.',
                'features' => ['Works with existing CCTV cameras', 'No-touch face recognition at entry', 'Real-time logs & payroll exports', 'Multi-site & multi-shift support'],
                'logo' => 'dotlog-logo.png',
                'demo' => [
                    'kind' => 'dotlog',
                    'title' => 'AI Touch-less Smart Attendance',
                    'subtitle' => 'CCTV-powered · Real-time logs',
                    'entries' => [
                        ['EMP-023', 'Arafat Rahman', '09:12:28 AM', 'present'],
                        ['EMP-027', 'Samira Jahan', '09:14:02 AM', 'present'],
                        ['EMP-031', 'Rakib Hasan', '09:17:41 AM', 'present'],
                    ],
                ],
            ],
            [
                'name' => 'Light OCR', 'tag' => 'Mobile AI', 'metric' => '< 3 sec Invoice to ERP', 'is_flagship' => true, 'sort_order' => 3,
                'description' => 'Point any phone camera at a financial document. AI extracts all data and posts to your accounting system in under 3 seconds.',
                'features' => ['Any Android or iOS camera', 'Invoices, receipts, bank statements', 'Posts to ERP in under 3 seconds', 'Offline-first with auto-sync'],
                'logo' => 'lightocr-logo.png',
                'demo' => [
                    'kind' => 'lightocr',
                    'sidebar' => ['Dashboard', 'Process OCR', 'Saved data', 'Company list', 'Vendor list'],
                    'docs' => ['invoice_6980616f.pdf', 'invoice_69804b81.jpeg'],
                ],
            ],
            [
                'name' => 'Moina', 'tag' => 'Conversational AI', 'metric' => '24/7 Always Active', 'is_flagship' => true, 'sort_order' => 4,
                'description' => 'Understands Bangla, English, and local dialects — and executes complex business workflows autonomously. It acts, not just answers.',
                'features' => ['Bangla, English & regional dialects', 'Autonomous multi-step workflow execution', 'Deep integration with your systems', 'Round-the-clock operations'],
                'logo' => 'moina-logo.svg',
                'demo' => [
                    'kind' => 'moina',
                    'messages' => [
                        'Assalamu alaikum! Ki bhabe shahajjo korte pari?',
                        'Apnar appointment booking complete korechi. CBC report ready.',
                    ],
                    'items' => [
                        ['Healthcare AI', 'active'],
                        ['Voice language', 'bn-bd'],
                        ['Appointment booking', 'realtime'],
                        ['CBC report', 'generated'],
                    ],
                ],
            ],
            [
                'name' => 'Smart BMS', 'tag' => 'IoT · Building Automation', 'metric' => '30% Energy Savings', 'is_flagship' => true, 'sort_order' => 5,
                'description' => 'Integrated monitoring, lighting automation, utility metering, and floor-wise control via Ethernet backbone with open protocol architecture — BACnet/IP, DALI, Modbus, CANbus, LoRa/BLE.',
                'features' => ['Lighting control — zone, schedule & motion', 'Energy metering — kW, kWh, PF per floor', 'AC, fire alarm, elevator & UPS monitoring', 'BACnet/IP · DALI · Modbus · LoRa/BLE protocols'],
                'logo' => 'smart-bms-logo.png',
                'demo' => [
                    'kind' => 'bms',
                    'title' => 'Smart BMS · Online',
                    'subtitle' => 'Ethernet backbone · Open protocols',
                    'protocols' => ['BACnet/IP', 'DALI', 'Modbus', 'CANbus', 'LoRa/BLE'],
                ],
            ],
        ];

        $more = [
            [
                'name' => 'Blens', 'tag' => 'AI Business Assistant', 'is_flagship' => false, 'sort_order' => 0,
                'description' => 'Voice AI chief of staff — calendar, emails, WhatsApp, and your schedule — all hands-free.',
                'logo' => 'blens-card-logo.png',
                'features' => [],
            ],
            [
                'name' => 'Sohojogi', 'tag' => 'Voice Order Management', 'is_flagship' => false, 'sort_order' => 1,
                'description' => 'Retailers speak orders in Bangla. Auto-invoiced, inventory updated, fully offline.',
                'logo' => 'sohojogi-card-logo.png',
                'features' => [],
            ],
            [
                'name' => 'Booking Model', 'tag' => 'Web Data Extraction', 'is_flagship' => false, 'sort_order' => 2,
                'description' => 'Reads buyer portals, posts to ERP — no API, no manual entry, 100% accuracy.',
                'logo' => 'booking-model-logo-v3.png',
                'features' => [],
            ],
            [
                'name' => 'Proxy Eye', 'tag' => 'Computer Vision QC', 'is_flagship' => false, 'sort_order' => 3,
                'description' => 'Detects fabric defects, construction anomalies, and security threats in real time.',
                'logo' => 'proxy-eye-card-logo.png',
                'features' => [],
            ],
            [
                'name' => 'Validex AI', 'tag' => 'Trade Finance AI', 'is_flagship' => false, 'sort_order' => 4,
                'description' => 'Validates LC documents against bank rules before submission. Zero discrepancies.',
                'logo' => 'validex-ai-logo.png',
                'features' => [],
            ],
            [
                'name' => 'AgroRx', 'tag' => 'Agricultural AI Platform', 'is_flagship' => false, 'sort_order' => 5,
                'description' => 'AI-powered crop monitoring, disease detection, and precision farming recommendations for Bangladeshi agriculture.',
                'logo' => 'agrorx-card-logo.svg',
                'features' => [],
            ],
        ];

        foreach ($flagship as $p) {
            Product::updateOrCreate(['name' => $p['name']], $p);
        }
        foreach ($more as $p) {
            Product::updateOrCreate(['name' => $p['name']], $p);
        }
    }

    private function seedTeamMembers(): void
    {
        $members = [
            ['name' => 'Osama Taseer', 'role' => 'Advisor', 'category' => 'advisor', 'sort_order' => 0, 'photo' => 'osama-taseer.jpg',
                'bio' => 'Accomplished entrepreneur in the 100% export-oriented RMG Industry of Bangladesh. An engineer by education. Passions for AI and networks help take ABC AI System to the next level.',
                'tags' => ['RMG Industry', 'Business Chambers']],
            ['name' => 'Sabuj H Chowdhury, FCA', 'role' => 'Advisor', 'category' => 'advisor', 'sort_order' => 1, 'photo' => 'sabuj.jpg',
                'bio' => 'Fellow Chartered Accountant from ICAB with 24+ years global experience. IIM Kolkata diploma. Former Regional CFO at HMD Global Oy, Business Controller at Microsoft and Nokia SE Asia & Pacific.',
                'tags' => ['ICAB FCA', 'IIM Kolkata', 'Microsoft', 'Nokia']],
            ['name' => 'Golam Farook', 'role' => 'Advisor', 'category' => 'advisor', 'sort_order' => 2, 'photo' => 'golam-farook.jpg',
                'bio' => 'Technology entrepreneur with 34+ years in IT. Chairman of AIMS, pioneer of ERP via DreamApps. IT background from Singapore National University; Management from University of Dhaka.',
                'tags' => ['AIMS', 'DreamApps', '34+ Years IT']],
            ['name' => 'Dayal Kumar Barua', 'role' => 'Chairman', 'category' => 'core', 'sort_order' => 0, 'photo' => 'dayal.jpg',
                'bio' => 'Business leader providing strategic vision to ABC AI System. Heads Adip Group, overseeing Adip Power and Adip Trading Ltd.',
                'tags' => ['Adip Group', 'Adip Power', 'Adip Trading Ltd.']],
            ['name' => 'Shakhawat Hossain', 'role' => 'Managing Director', 'category' => 'core', 'sort_order' => 1, 'photo' => 'shakhawat.jpg',
                'bio' => 'AI expert and technical architect of ABC AI System\'s proprietary AI model. The visionary behind the zero-hallucination approach. Vice President, Data Transformers Inc. — Texas, USA.',
                'tags' => ['Texas USA', 'AI Architect']],
            ['name' => 'S J Tarique', 'role' => 'Director', 'category' => 'core', 'sort_order' => 2, 'photo' => 'tarique.jpg',
                'bio' => 'Leads strategy, assesses needs, and develops tailored solutions. Leads Tech Cloud Ltd, Tech Cloud Venture, Zylo Lab, and Apricot (Real Estate).',
                'tags' => ['Tech Cloud Ltd', 'Tech Cloud Venture', 'Zylo Lab'],
                'links' => ['https://zylo-lab.com/', 'https://techcloudventure.com/', 'https://techcloudltd.com/']],
        ];

        foreach ($members as $m) {
            TeamMember::updateOrCreate(['name' => $m['name']], $m);
        }
    }

    private function seedClients(): void
    {
        $clients = [
            ['name' => 'SA Plumbing & Heating', 'logo' => 'sa-plumbing-heating.png', 'group' => 'clients', 'sort_order' => 0, 'accent' => '#0ea5e9'],
            ['name' => 'Unique Group', 'logo' => 'unique-group.png', 'group' => 'clients', 'sort_order' => 1, 'accent' => '#8b5cf6'],
            ['name' => 'X Ceramics Group', 'logo' => 'x-ceramics-limited.png', 'group' => 'clients', 'sort_order' => 2, 'accent' => '#f59e0b'],
            ['name' => 'Finlays', 'logo' => 'finlays.png', 'group' => 'clients', 'sort_order' => 3, 'accent' => '#10b981'],
            ['name' => 'Uniglory', 'logo' => 'uniglory.png', 'group' => 'clients', 'sort_order' => 4, 'accent' => '#ef4444'],
            ['name' => 'Popular Group', 'logo' => 'popular-pharma.webp', 'group' => 'pilots', 'sort_order' => 0, 'accent' => '#fa5252'],
            ['name' => 'Renata PLC', 'logo' => 'renata-icon.png', 'group' => 'pilots', 'sort_order' => 1, 'accent' => '#15aabf'],
            ['name' => 'Bata', 'logo' => 'bata.svg', 'group' => 'pilots', 'sort_order' => 2, 'accent' => '#e64980'],
        ];

        foreach ($clients as $c) {
            Client::updateOrCreate(['name' => $c['name']], $c);
        }
    }

    private function seedIndustries(): void
    {
        $items = [
            ['name' => 'Banking & Finance', 'icon' => '🏦'],
            ['name' => 'Manufacturing', 'icon' => '🏭'],
            ['name' => 'Retail & Wholesale', 'icon' => '🛒'],
            ['name' => 'Agriculture', 'icon' => '🌾'],
            ['name' => 'Real Estate', 'icon' => '🏗️'],
            ['name' => 'Healthcare', 'icon' => '🏥'],
            ['name' => 'Logistics & Shipping', 'icon' => '🚢'],
            ['name' => 'Government', 'icon' => '🏛️'],
            ['name' => 'Smart Buildings', 'icon' => '🏢'],
            ['name' => 'BPO', 'icon' => '💼'],
        ];

        foreach ($items as $i => $item) {
            Industry::updateOrCreate(['name' => $item['name']], $item + ['sort_order' => $i]);
        }
    }

    private function seedTechDomains(): void
    {
        $items = [
            ['title' => 'Artificial Intelligence', 'description' => 'Machine Learning · NLP · Computer Vision · Decision Support & Reasoning Models', 'icon' => '🤖'],
            ['title' => 'Big Data & Analytics', 'description' => 'Scale-ready pipelines, real-time intelligence, and BI at any volume.', 'icon' => '📊'],
            ['title' => 'Data Mining', 'description' => 'Automated pattern recognition and anomaly detection across massive datasets.', 'icon' => '⛏️'],
            ['title' => 'Internet of Things', 'description' => 'Sensor networks, edge computing, and intelligent physical infrastructure.', 'icon' => '📡'],
            ['title' => 'Robotics', 'description' => 'Autonomous systems for industrial, agricultural, and service robotics.', 'icon' => '🦾'],
            ['title' => 'ERP Platforms', 'description' => 'Oracle & SAP implementation with a proprietary AI automation layer.', 'icon' => '🗂️'],
            ['title' => 'AR / VR / MR', 'description' => 'Immersive enterprise training, simulation, and visualization experiences.', 'icon' => '🥽'],
        ];

        foreach ($items as $i => $item) {
            TechDomain::updateOrCreate(['title' => $item['title']], $item + ['sort_order' => $i]);
        }
    }

    private function seedCoreValues(): void
    {
        $items = [
            ['title' => 'Innovation First', 'description' => 'Continuously pushing boundaries in AI research — building solutions that did not exist before.', 'icon' => '💡'],
            ['title' => 'Data Privacy & Security', 'description' => '100% client data sovereignty — data never passes through intermediate storage or pre-trained models.', 'icon' => '🔒'],
            ['title' => 'Zero Hallucination', 'description' => 'Precise, deterministic outputs — eliminating the unreliability of traditional AI models entirely.', 'icon' => '🎯'],
            ['title' => 'Client-Centricity', 'description' => 'Every solution is designed around client needs — seamless integration, scalability, and measurable ROI.', 'icon' => '🤝'],
        ];

        foreach ($items as $i => $item) {
            CoreValue::updateOrCreate(['title' => $item['title']], $item + ['sort_order' => $i]);
        }
    }

    private function seedAdvantages(): void
    {
        $items = [
            ['title' => 'Private AI Model', 'subtitle' => '0% Hallucinations', 'description' => 'Our proprietary, deterministic model — built from the ground up in Bangladesh.', 'icon' => '🧠'],
            ['title' => 'Absolute Data Privacy', 'subtitle' => '100% Data Sovereignty', 'description' => 'Your data never leaves your environment. No middle-layer storage, ever.', 'icon' => '🔐'],
            ['title' => 'Local Expertise, Global Reach', 'subtitle' => 'Made in Bangladesh', 'description' => 'World-class AI engineering talent, serving enterprises across the globe.', 'icon' => '🌏'],
            ['title' => 'End-to-End Capability', 'subtitle' => '15+ AI Products', 'description' => 'From analytics to computer vision to robotics — one partner, full stack.', 'icon' => '⚙️'],
            ['title' => 'Industry Agnostic', 'subtitle' => '10+ Industries', 'description' => 'Proven across banking, manufacturing, agriculture, healthcare and more.', 'icon' => '🏢'],
        ];

        foreach ($items as $i => $item) {
            Advantage::updateOrCreate(['title' => $item['title']], $item + ['sort_order' => $i]);
        }
    }

    private function seedMethodologies(): void
    {
        $items = [
            ['title' => 'Problem Identification', 'description' => 'Pinpoint the real business challenge with stakeholders.', 'icon' => '🔍'],
            ['title' => 'Scope Analysis', 'description' => 'Define boundaries, data, and success criteria.', 'icon' => '📐'],
            ['title' => 'Research', 'description' => 'Investigate methods and design the approach.', 'icon' => '🔬'],
            ['title' => 'Prototype Dev', 'description' => 'Build a rapid, testable prototype.', 'icon' => '🧪'],
            ['title' => 'Solution Refinement', 'description' => 'Iterate on the prototype with real-world feedback.', 'icon' => '🛠️'],
            ['title' => 'Final Development', 'description' => 'Engineer the production-grade solution.', 'icon' => '💻'],
            ['title' => 'Validation & Deploy', 'description' => 'Rigorous validation, then deployment & support.', 'icon' => '🚀'],
        ];

        foreach ($items as $i => $item) {
            Methodology::updateOrCreate(['title' => $item['title']], $item + ['sort_order' => $i]);
        }
    }

    private function seedComparisons(): void
    {
        $items = [
            ['feature' => 'Data Privacy', 'us_value' => '100% — your data never leaves your server', 'them_value' => 'Processed on third-party cloud infrastructure'],
            ['feature' => 'Hallucinations', 'us_value' => 'Zero — deterministic, rule-based outputs', 'them_value' => 'Frequent — inherent in large language models'],
            ['feature' => 'Third-party dependency', 'us_value' => 'None — fully self-contained system', 'them_value' => 'Fully dependent on external AI providers'],
            ['feature' => 'Customization depth', 'us_value' => 'Complete — built around your processes', 'them_value' => 'Limited to what the API allows'],
            ['feature' => 'Offline capability', 'us_value' => 'Yes — works without internet', 'them_value' => 'Requires constant internet & API access'],
            ['feature' => 'Middle layer storage', 'us_value' => 'No middle layer data storage — ever', 'them_value' => 'Data buffered and stored on vendor cloud'],
            ['feature' => 'Compliance & audit', 'us_value' => 'Full audit trail, local data sovereignty', 'them_value' => 'Data may cross international jurisdictions'],
        ];

        foreach ($items as $i => $item) {
            Comparison::updateOrCreate(['feature' => $item['feature']], $item + ['sort_order' => $i]);
        }
    }

    private static function unsplashUrl(string $id): string
    {
        return "https://images.unsplash.com/{$id}?w=1200&auto=format&fit=crop&q=80";
    }
}