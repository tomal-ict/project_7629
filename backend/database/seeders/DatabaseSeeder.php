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
        Statistic::query()->delete();
        CoreValue::query()->delete();
        Advantage::query()->delete();
        Methodology::query()->delete();
        Comparison::query()->delete();
        TechDomain::query()->delete();
        Industry::query()->delete();

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
                'company_tagline' => 'Architecting Sovereign Enterprise Intelligence',
                'founder_quote_by' => 'Tariqul Islam, Managing Director & Chief Architect',
                'copyright_year' => '© 2026 ABC AI System Limited. All Rights Reserved.',
                'address' => 'Plot 12, Road 11, Block D, Banani Commercial Area, Dhaka - 1213, Bangladesh',
                'email' => 'contact@abcaisystemltd.com',
                'email_info' => 'intel@abcaisystemltd.com',
                'phone' => '+88 01894-882200',
                'phone_tel' => '+8801894882200',
                'website' => 'www.abcaisystemltd.com',
                'linkedin' => 'https://www.linkedin.com/company/107562399',
                'basis_url' => 'https://basis.org.bd',
                'dcci_url' => 'https://www.dhakachamber.com',
            ],
            'hero' => [
                'hero_badge' => 'Pioneering Sovereign Enterprise Intelligence Built in Bangladesh',
                'hero_title_1' => 'DECENTRALIZING',
                'hero_title_2' => 'AUTONOMOUS',
                'hero_title_3' => 'INTELLIGENCE',
                'hero_sub' => 'Equipping modern enterprises with native, self-contained AI systems — guaranteeing zero algorithmic hallucinations, strict on-premise data containment, and fully deterministic operational precision.',
                'hero_cta_primary' => 'Explore AI Systems',
                'hero_cta_secondary' => 'Schedule Technical Demo',
            ],
            'about' => [
                'about_tag' => 'WHO WE ARE',
                'about_title' => 'Engineering High-Trust AI Architectures for Critical Enterprise Workflows',
                'about_body' => 'ABC AI System Limited is a pioneering artificial intelligence engineering firm headquartered in Dhaka, Bangladesh. Built on the conviction that enterprise AI must be verifiably safe, predictable, and self-hosted — we design native cognitive systems and turnkey industrial AI platforms that function strictly inside organizational security perimeters, without external third-party dependencies.',
                'about_image_caption' => 'Sovereign Neural Infrastructure',
                'about_image_sub' => 'Engineered in Bangladesh · Powering Global Enterprises',
                'vision_title' => 'OUR STRATEGIC VISION',
                'vision_text' => 'To establish a globally recognized benchmark in sovereign cognitive computing — empowering forward-thinking institutions worldwide to leverage deep-tech intelligence with absolute confidentiality, mathematical determinism, and zero governance compromise.',
                'mission_title' => 'OUR MISSION',
                'mission_text' => 'To architect and deploy resilient, privacy-first cognitive platforms grounded in our proprietary model architecture — systematically driving tangible operational efficiencies, slashing operational overhead, and securing measurable competitive supremacy across critical economic verticals.',
                'values_tag' => 'OUR CORE PRINCIPLES',
                'values_title' => 'Guiding Principles',
                'clients_tag' => 'VALUED PARTNERS',
                'clients_title' => 'Enterprise Clients',
                'pilots_title' => 'Active Deployments & Proof-of-Concepts',
            ],
            'services' => [
                'services_tag' => 'CAPABILITIES & SOLUTIONS',
                'services_title' => 'Enterprise Engineering Capabilities',
                'services_sub' => 'From ready-to-run turnkey cognitive modules to bespoke algorithmic design — every platform is powered by our native, sovereign AI architecture.',
                'services_cta' => 'Request an Architectural Review',
            ],
            'products' => [
                'products_tag' => 'PROPRIETARY PLATFORMS',
                'products_title' => 'Our Flagship Turnkey Systems',
                'products_sub' => 'Engineered natively on our proprietary cognitive architecture. Zero external model calls. Your sensitive enterprise data remains permanently locked within your environment.',
                'more_products_tag' => 'EXPANDED ECOSYSTEM',
                'more_products_title' => '6 Specialized Enterprise Solutions',
            ],
            'technology' => [
                'tech_tag' => 'NEURAL ARCHITECTURE',
                'tech_title' => 'Powered by an Autonomous Cognitive Engine',
                'tech_sub' => 'Zero reliance on generic third-party APIs. No commercial black-box models. All inference pipelines execute inside your air-gapped on-premise infrastructure.',
                'tech_cmp_tag' => 'THE ARCHITECTURAL DIFFERENCE',
                'tech_cmp_title' => 'ABC Sovereign AI vs Generic Commercial AI',
                'tech_adv_tag' => 'STRATEGIC ADVANTAGES',
                'tech_adv_title' => 'Why Industry Leaders Choose ABC AI System',
            ],
            'industries' => [
                'industries_tag' => 'SECTOR COVERAGE',
                'industries_title' => 'Transforming Mission-Critical Industry Verticals',
                'industries_sub' => 'Engineered to solve specialized operational bottlenecks across regulated finance, heavy manufacturing, logistics, healthcare, and state governance — from agile mid-market firms to multi-entity conglomerates.',
            ],
            'leadership' => [
                'leadership_tag' => 'GOVERNANCE & MINDS',
                'leadership_title' => 'Architects & Executive Leadership',
                'leadership_sub' => 'Strategic Advisory Council & Principal Engineering Leadership',
                'advisor_title' => 'Advisory Board',
                'core_title' => 'Executive & Technical Leadership',
                'founder_title' => 'Executive Perspective',
                'founder_quotes' => [
                    'In an era dominated by shared cloud-hosted models, why should enterprises compromise their confidential datasets and trade secrets to black-box systems beyond their control?',
                    'Our conviction led us to build a completely autonomous neural paradigm from first principles. No third-party API tethers. Zero data leakage. Zero probabilistic hallucinations. Just deterministic, mathematically rigorous machine intelligence that executive leadership can stand behind.',
                    'True technological sovereignty begins with homegrown mastery. We are proving that world-class, mathematically verifiable deep-tech computing can be conceived and built right here in Bangladesh to compete on the global stage.',
                    'Every system in our portfolio was forged through real-world enterprise bottlenecks. We do not manufacture speculative demos; we engineer hardened production engines that systematically reduce human friction, accelerate decision loops, and protect operational margins.',
                ],
            ],
            'methodology' => [
                'method_tag' => 'ENGINEERING LIFECYCLE',
                'method_title' => 'Structured 7-Stage Validation Protocol',
                'method_sub' => 'A mathematically rigorous, phased deployment framework ensuring deterministic safety and verifiable operational return before production handover.',
            ],
            'contact' => [
                'contact_badge' => 'INITIATE DIALOGUE',
                'contact_title' => 'Architect Your Sovereign AI Roadmap',
                'contact_sub' => 'Ready to explore how native, deterministic artificial intelligence can protect your data and multiply enterprise velocity? Connect with our senior engineering team today.',
                'contact_cta' => 'Contact Senior Leadership',
                'contact_head_label' => 'Corporate Headquarters',
                'contact_email_label' => 'Official Inquiries',
                'contact_phone_label' => 'Direct Desk',
                'contact_follow_label' => 'Corporate Network',
                'contact_follow_linkedin' => 'LinkedIn Profile',
                'contact_member_label' => 'Institutional Affiliations',
                'contact_form_title' => 'Submit Technical Inquiry',
            ],
            'footer' => [
                'footer_tagline' => 'Engineering sovereign, deterministic, and privacy-first artificial intelligence architectures for modern enterprises.',
                'footer_about_label' => 'Overview',
                'footer_leadership_label' => 'Leadership',
                'footer_technology_label' => 'Architecture',
                'footer_industries_label' => 'Industries',
                'footer_why_label' => 'Key Advantages',
                'footer_contact_label' => 'Get in Touch',
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
            ['label' => 'Autonomous Robotic & AI Systems', 'value' => '20+', 'sub' => 'Industrial-grade turnkey deployments'],
            ['label' => 'On-Premise Model Sovereignty', 'value' => '100%', 'sub' => 'Zero external API egress or intermediate caching'],
            ['label' => 'LLM Hallucination Tolerance', 'value' => '0.0%', 'sub' => 'Mathematically verified deterministic inference engines'],
            ['label' => 'Enterprise Sectors Automated', 'value' => '12+', 'sub' => 'From autonomous manufacturing to smart logistics'],
        ];

        foreach ($stats as $i => $s) {
            Statistic::updateOrCreate(['label' => $s['label']], $s + ['sort_order' => $i]);
        }
    }

    private function seedServices(): void
    {
        $services = [
            [
                'slug' => 'proprietary-ai-products', 'title' => 'Turnkey Enterprise AI Engines', 'subtitle' => 'Immediate Production Readiness Within Days',
                'icon' => '🚀', 'color' => '#2563eb', 'color_light' => '#eff6ff',
                'description' => 'Deploy pre-engineered, fully integrated cognitive modules directly into your existing infrastructure — delivering immediate operational impact in days.',
                'intro' => 'Our ready-to-run suite includes automated document decoders, conversational natural language processors, edge computer vision systems, and autonomous telemetry managers — all verified for zero-leakage deployments.',
                'features' => ['Battle-tested production codebases', 'Frictionless workflow adaptation', 'Comprehensive technical onboarding', 'Dedicated lifecycle maintenance'],
                'benefits' => ['Zero 3rd-party API reliance', 'Deterministic precision', 'Full air-gapped on-premise capability', 'Rapid enterprise rollouts'],
                'usecases' => ['Bilingual natural language ERP querying', 'Automated financial document decoding', 'Facial recognition attendance over CCTV', 'Bengali-English conversational customer agents', 'Mobile invoice scanning directly to central general ledger'],
                'gallery_images' => [
                    'photo-1677442135703-1787eea5ce01', 'photo-1620712943543-bcc4688e7485', 'photo-1551288049-bebda4e38f71',
                ],
                'steps' => [
                    ['title' => 'Diagnostic Assessment', 'desc' => 'Map infrastructure, existing security perimeters, and strategic goals.'],
                    ['title' => 'System Customization', 'desc' => 'Calibrate model heuristics to internal business rules and data models.'],
                    ['title' => 'Perimeter Integration', 'desc' => 'Bind modules into legacy ERPs, IP camera networks, or internal databases.'],
                    ['title' => 'Empirical Stress Testing', 'desc' => 'Execute high-throughput validation runs against real-world scenarios.'],
                    ['title' => 'Production Cutover', 'desc' => 'Smooth go-live with complete hands-on operator empowerment.'],
                    ['title' => 'Continuous Supervision', 'desc' => 'Proactive telemetric monitoring and algorithmic enhancements.'],
                ],
                'why_us' => 'Every turnkey engine executes locally on our sovereign architecture — eliminating third-party cloud billing, data exposure, and model unreliability.',
                'stats' => [['value' => '15+', 'label' => 'Ready Systems'], ['value' => 'Days', 'label' => 'Deployment Window'], ['value' => '0.0%', 'label' => 'Hallucination Rate'], ['value' => '100%', 'label' => 'Data Containment']],
                'hero_image' => 'photo-1677442135703-1787eea5ce01',
            ],
            [
                'slug' => 'custom-ai-development', 'title' => 'Bespoke Neural Engineering', 'subtitle' => 'Architected from Fundamental Principles',
                'icon' => '🧩', 'color' => '#7c3aed', 'color_light' => '#f3efff',
                'description' => 'Tailor-made cognitive architectures purpose-built for proprietary corporate workflows. Zero generic wrappers. Full intellectual property transfer.',
                'intro' => 'When standardized systems fail to address the nuances of your operating model, our research engineers architect a bespoke cognitive framework matched to your exact business specifications.',
                'features' => ['Complete custom algorithmic design', 'Full ownership of source code & weights', 'Seamless legacy ERP connectivity', 'Air-gapped deployment capability'],
                'benefits' => ['Tailored to unique business logic', 'Uncompromising intellectual property ownership', 'Complete data enclave security', 'Long-term architectural support'],
                'usecases' => ['Domain-specific dialectal natural language comprehension', 'High-speed automated manufacturing quality control', 'Deterministic autonomous decision support matrices', 'Specialized heuristic reasoning frameworks', 'Intelligent ERP document processing pipelines'],
                'gallery_images' => [
                    'photo-1581091226825-a6a2a5aee158', 'photo-1524178232363-1fb2b075b655', 'photo-1554224155-6726b3ff858f',
                ],
                'steps' => [
                    ['title' => 'Requirement Mapping', 'desc' => 'Exhaustive scoping of operational constraints and data schemas.'],
                    ['title' => 'Model Architecture', 'desc' => 'Formulating custom neural topologies and inference mechanics.'],
                    ['title' => 'Prototype Benchmark', 'desc' => 'Rapid functional prototype tested against historical corporate data.'],
                    ['title' => 'Core Implementation', 'desc' => 'Engineering the production engine with hardened error resilience.'],
                    ['title' => 'System Orchestration', 'desc' => 'Direct API binding into corporate core architectures.'],
                    ['title' => 'Handover & IP Transfer', 'desc' => 'Full knowledge transfer, architecture documentation, and code delivery.'],
                ],
                'why_us' => 'Unlike integrators reselling foreign commercial APIs, we build native architectures from the ground up, guaranteeing complete IP sovereignty and zero external dependencies.',
                'stats' => [['value' => '12+', 'label' => 'Custom Systems'], ['value' => '100%', 'label' => 'Proprietary IP'], ['value' => '0', 'label' => 'External APIs'], ['value' => '6mo', 'label' => 'Average Lifecycle']],
                'hero_image' => 'photo-1581091226825-a6a2a5aee158',
            ],
            [
                'slug' => 'ai-research-rnd', 'title' => 'Applied AI Research & Lab Partnerships', 'subtitle' => 'Pushing Frontiers in Specialized Deep Tech',
                'icon' => '🔬', 'color' => '#0ea5e9', 'color_light' => '#eff8ff',
                'description' => 'High-impact collaborative research initiatives pioneering specialized breakthroughs in low-resource NLP, computer vision, and cognitive reasoning.',
                'intro' => 'Partner with our computational lab to solve high-complexity domain challenges, invent novel algorithmic methodologies, and publish groundbreaking intellectual property.',
                'features' => ['Dedicated research compute lab', 'Co-patenting & joint IP creation', 'Formal empirical whitepapers', 'Multidisciplinary engineering teams'],
                'benefits' => ['Access to dedicated deep-tech lab', 'Shared proprietary patent rights', 'Empirical peer-reviewed outcomes', 'Multi-year collaborative R&D roadmaps', 'World-class indigenous talent pool'],
                'usecases' => ['Domain-specific low-resource language modeling for Bengali', 'Nanometer-scale visual flaw detection in textiles', 'Deterministic reasoning algorithms for regulatory automation', 'Next-generation heuristic decision graphs', 'Predictive agro-meteorological forecasting models'],
                'gallery_images' => [
                    'photo-1737644467636-6b0053476bb2', 'photo-1620712943543-bcc4688e7485', 'photo-1551288049-bebda4e38f71',
                ],
                'steps' => [
                    ['title' => 'Problem Formulation', 'desc' => 'Framing fundamental hypotheses and measurable evaluation targets.'],
                    ['title' => 'Academic & Patent Review', 'desc' => 'Analyzing existing state-of-the-art literature and patent whitespace.'],
                    ['title' => 'Experimental Formulation', 'desc' => 'Executing rigorous algorithmic experiments under controlled parameters.'],
                    ['title' => 'Algorithmic Synthesis', 'desc' => 'Constructing novel proprietary mathematical models.'],
                    ['title' => 'Peer Benchmarking', 'desc' => 'Empirical comparison against baseline industry models.'],
                    ['title' => 'Commercialization', 'desc' => 'Translating findings into patents, whitepapers, or industrial products.'],
                ],
                'why_us' => 'We operate the leading private AI research laboratory in Bangladesh with a native, zero-dependency model stack. Your investigative data never leaves our secure enclaves.',
                'stats' => [['value' => '5+', 'label' => 'Years in R&D'], ['value' => '3', 'label' => 'Dedicated Labs'], ['value' => '15+', 'label' => 'Research Fellows'], ['value' => '100%', 'label' => 'Sovereign Models']],
                'hero_image' => 'photo-1737644467636-6b0053476bb2',
            ],
            [
                'slug' => 'ai-training-capacity', 'title' => 'Enterprise AI Enablement & Governance', 'subtitle' => 'Upskilling Teams to Master Autonomous Systems',
                'icon' => '🎓', 'color' => '#059669', 'color_light' => '#ecfdf5',
                'description' => 'Empowering corporate workforces, technical teams, and executive leadership to govern, inspect, and extract maximum leverage from modern AI systems.',
                'intro' => 'Sustainable digital transformation requires human mastery. We deliver immersive, practical training academies in both English and Bengali.',
                'features' => ['Executive strategy & risk briefing', 'Technical hands-on engineering labs', 'Corporate AI governance frameworks', 'Accredited competence certification'],
                'benefits' => ['Role-tailored organizational curricula', 'Bilingual delivery (Bengali and English)', 'Direct interaction with real production tools', 'Accredited credentialing upon completion', 'Flexible on-premise or secure virtual formats'],
                'usecases' => ['Executive board strategic AI literacy', 'In-house software engineering upskilling', 'Model auditing and bias inspection workshops', 'Statutory compliance and ethical governance training', 'Department-specific automated workflow design'],
                'gallery_images' => [
                    'photo-1524178232363-1fb2b075b655', 'photo-1554224155-6726b3ff858f', 'photo-1558494949-ef010cbdcc31',
                ],
                'steps' => [
                    ['title' => 'Maturity Audit', 'desc' => 'Gauging baseline institutional capability and knowledge gaps.'],
                    ['title' => 'Curricular Tailoring', 'desc' => 'Structuring customized syllabi aligned with specific corporate roles.'],
                    ['title' => 'Applied Sandbox Labs', 'desc' => 'Hands-on experimentation with production-ready AI tools.'],
                    ['title' => 'Governance Directives', 'desc' => 'Codifying ethical, regulatory, and data privacy standard operating procedures.'],
                    ['title' => 'Assessment & Certification', 'desc' => 'Formal verification of practitioner competence.'],
                    ['title' => 'Post-Training Advisory', 'desc' => 'Periodic upskilling as algorithmic paradigms evolve.'],
                ],
                'why_us' => 'We educate teams directly on functional proprietary architectures rather than generic cloud wrappers — giving your organization genuine internal capability.',
                'stats' => [['value' => '500+', 'label' => 'Leaders Certified'], ['value' => '2', 'label' => 'Instruction Languages'], ['value' => '12', 'label' => 'Specialized Tracks'], ['value' => '100%', 'label' => 'Applied Labs']],
                'hero_image' => 'photo-1524178232363-1fb2b075b655',
            ],
            [
                'slug' => 'ai-audit-compliance', 'title' => 'Independent AI Auditing & Validation', 'subtitle' => 'Empirical Verification of Safety & Accuracy',
                'icon' => '🛡️', 'color' => '#d97706', 'color_light' => '#fffbeb',
                'description' => 'Rigorous, vendor-agnostic auditing of corporate machine learning pipelines for hallucination rates, algorithmic bias, privacy vulnerabilities, and regulatory conformance.',
                'intro' => 'Ensure your artificial intelligence deployments meet stringent statutory standards, data privacy mandates, and operational reliability benchmarks before full-scale commercialization.',
                'features' => ['Exhaustive hallucination stress-testing', 'Algorithmic fairness & bias inspection', 'Data perimeter penetration testing', 'Formal compliance attestation'],
                'benefits' => ['Vendor-neutral technical verification', 'Audit trails compliant with regulatory standards', 'Exhaustive risk-surface documentation', 'Proactive algorithmic vulnerability mitigation', 'Protection against data exfiltration risks'],
                'usecases' => ['Pre-deployment enterprise validation reviews', 'Central bank financial algorithm compliance', 'Vendor AI security and privacy audits', 'Continuous post-deployment operational telemetry', 'Data privacy compliance under local and international laws'],
                'gallery_images' => [
                    'photo-1554224155-6726b3ff858f', 'photo-1558494949-ef010cbdcc31', 'photo-1486325212027-8081e485255e',
                ],
                'steps' => [
                    ['title' => 'Boundary Definition', 'desc' => 'Defining testing protocols, statutory frameworks, and risk thresholds.'],
                    ['title' => 'Pipeline Inspection', 'desc' => 'Auditing data lineage, model weights, and inference pipelines.'],
                    ['title' => 'Hallucination & Bias Tests', 'desc' => 'Subjecting model outputs to randomized adversarial stress-tests.'],
                    ['title' => 'Penetration Assessment', 'desc' => 'Testing endpoints for data exfiltration and prompt injection.'],
                    ['title' => 'Attestation Report', 'desc' => 'Issuing comprehensive audit findings and formal compliance rating.'],
                    ['title' => 'Continuous Telemetry', 'desc' => 'Active monitoring to catch drift and operational anomalies.'],
                ],
                'why_us' => 'Completely unbiased and vendor-agnostic — we subject internal and third-party systems to the same uncompromising scrutiny.',
                'stats' => [['value' => '100%', 'label' => 'Audit Scrutiny'], ['value' => 'Zero', 'label' => 'Bias Tolerance'], ['value' => '24h', 'label' => 'Rapid Turnaround'], ['value' => 'Full', 'label' => 'Verifiable Logs']],
                'hero_image' => 'photo-1554224155-6726b3ff858f',
                'featured_on_home' => false,
            ],
            [
                'slug' => 'iot-automation', 'title' => 'Cyber-Physical IoT & Edge Intelligence', 'subtitle' => 'Autonomous Operational Infrastructure',
                'icon' => '🤖', 'color' => '#dc2626', 'color_light' => '#fef2f2',
                'description' => 'Connecting distributed sensor topologies and hardware assets directly to real-time AI decision engines for smart factories, logistics, and precision agro-tech.',
                'intro' => 'We bridge physical operational technologies with localized cognitive processing, orchestrating real-time predictive control without cloud latency.',
                'features' => ['Custom edge node & sensor deployment', 'Predictive machinery maintenance', 'Real-time telemetric observability', 'Low-power edge inferencing'],
                'benefits' => ['End-to-end sensor-to-dashboard engineering', 'Zero-latency edge inferencing', 'Hybrid local and cloud coordination', 'Autonomous fail-safe emergency logic', 'Multi-facility centralized oversight'],
                'usecases' => ['Automated industrial assembly monitoring', 'Cold-chain telemetry with automated alarms', 'Smart commercial facility climate & power optimization', 'Precision agriculture moisture & nutrient monitoring', 'Heavy machinery vibration & failure forecasting'],
                'gallery_images' => [
                    'photo-1485827404703-89b55fcc595e', 'photo-1581092160562-40aa08e78837', 'photo-1581092918056-0c4c3acd3789',
                ],
                'steps' => [
                    ['title' => 'Physical Survey', 'desc' => 'Inspecting environmental telemetry requirements and existing cabling.'],
                    ['title' => 'Hardware Architecture', 'desc' => 'Designing distributed edge nodes, gateways, and bus protocols.'],
                    ['title' => 'Field Deployment', 'desc' => 'Mounting, calibrating, and commissioning physical sensor networks.'],
                    ['title' => 'Model Integration', 'desc' => 'Streaming live telemetry into our native cognitive engine.'],
                    ['title' => 'Console Orchestration', 'desc' => 'Configuring real-time visual telemetric monitoring consoles.'],
                    ['title' => 'Operational Tuning', 'desc' => 'Iterative refinement based on real environmental feedback.'],
                ],
                'why_us' => 'We engineer the entire stack — from micro-controllers and communication buses to native neural inferencing — under one unified engineering team.',
                'stats' => [['value' => '10k+', 'label' => 'Active Sensor Nodes'], ['value' => '32%', 'label' => 'Energy Cut Avg'], ['value' => '99.9%', 'label' => 'Uptime Guarantee'], ['value' => 'Native', 'label' => 'Edge Processing']],
                'hero_image' => 'photo-1581092160562-40aa08e78837',
            ],
            [
                'slug' => 'big-data-mining', 'title' => 'Automated Data Pipeline & Mining Systems', 'subtitle' => 'Transforming Raw Noise into Verified Insight',
                'icon' => '📊', 'color' => '#0891b2', 'color_light' => '#ecfeff',
                'description' => 'Scalable, on-premise data pipelines that continuously cleanse, correlate, and uncover latent predictive patterns across multi-terabyte enterprise data stores.',
                'intro' => 'Extract actionable strategic clarity from fragmented business data without moving sensitive records across unverified external cloud endpoints.',
                'features' => ['Automated multi-source ingestion', 'Real-time anomaly identification', 'Custom executive telemetry consoles', 'Strict on-premise governance'],
                'benefits' => ['Automated data cleansing & normalization', 'Zero-latency streaming intelligence', 'Scalable on-premise lakehouse architecture', 'Predictive behavioral pattern discovery', 'Unified cross-departmental data synthesis'],
                'usecases' => ['Commercial sales performance analytics', 'Enterprise inventory turnover forecasting', 'Automated financial fraud pattern detection', 'Supply chain latency bottleneck identification', 'Multi-channel consumer preference discovery'],
                'gallery_images' => [
                    'photo-1551288049-bebda4e38f71', 'photo-1558494949-ef010cbdcc31', 'photo-1460925895917-afdab827c52f',
                ],
                'steps' => [
                    ['title' => 'Data Landscape Audit', 'desc' => 'Documenting database structures, ingestion velocity, and data hygiene.'],
                    ['title' => 'Pipeline Construction', 'desc' => 'Developing automated ETL/ELT pipelines with transactional integrity.'],
                    ['title' => 'Algorithmic Fitting', 'desc' => 'Deploying native clustering and pattern-mining algorithms.'],
                    ['title' => 'Insight Extraction', 'desc' => 'Unearthing anomalies, seasonal trends, and predictive correlations.'],
                    ['title' => 'Dashboard Delivery', 'desc' => 'Constructing responsive executive dashboards.'],
                    ['title' => 'Access Governance', 'desc' => 'Implementing granular role-based access and audit logging.'],
                ],
                'why_us' => 'Your proprietary enterprise data is parsed locally by our sovereign model — never uploaded, analyzed, or stored on public cloud vendor servers.',
                'stats' => [['value' => 'PB', 'label' => 'Scalable Capacity'], ['value' => '24/7', 'label' => 'Automated Stream'], ['value' => '50+', 'label' => 'Source Connectors'], ['value' => 'Zero', 'label' => 'External Egress']],
                'hero_image' => 'photo-1551288049-bebda4e38f71',
            ],
            [
                'slug' => 'erp-implementation', 'title' => 'Intelligent ERP Transformation', 'subtitle' => 'Augmenting SAP & Oracle with Neural Automation',
                'icon' => '🗂️', 'color' => '#4f46e5', 'color_light' => '#eef2ff',
                'description' => 'Certified enterprise resource planning implementations modernized with an embedded proprietary AI automation layer that eliminates repetitive manual tasks.',
                'intro' => 'Transform traditional ERP workflows into self-reconciling, conversational operational pipelines that execute transactional tasks autonomously.',
                'features' => ['Certified SAP & Oracle specialists', 'Zero-touch transaction automation', 'Accelerated cutover methodologies', 'Post-implementation optimization'],
                'benefits' => ['Certified enterprise architects', 'AI-augmented ledger entries', 'Significant reduction in manual data entry', 'Accelerated deployment cycles', 'Proactive workflow optimization'],
                'usecases' => ['Oracle Cloud and on-premise ERP rollouts', 'SAP S/4HANA enterprise migration', 'Autonomous invoice matching and three-way reconciliation', 'Mobile OCR directly into ERP inventory ledgers', 'Multi-entity corporate accounting consolidation'],
                'gallery_images' => [
                    'photo-1664575602276-acd073f101bc', 'photo-1554224155-6726b3ff858f', 'photo-1460925895917-afdab827c52f',
                ],
                'steps' => [
                    ['title' => 'Process Assessment', 'desc' => 'Mapping current business processes and identifying automation opportunities.'],
                    ['title' => 'Target Blueprint', 'desc' => 'Architecting module configurations and data migration blueprints.'],
                    ['title' => 'Core Configuration', 'desc' => 'Configuring financial, operational, and supply chain modules.'],
                    ['title' => 'AI Layer Integration', 'desc' => 'Supercharging manual workflows with native cognitive automation.'],
                    ['title' => 'User Acceptance Testing', 'desc' => 'Validating complex end-to-end commercial scenarios.'],
                    ['title' => 'Cutover & Hypercare', 'desc' => 'Flawless production transition with dedicated operational support.'],
                ],
                'why_us' => 'We combine battle-tested certified ERP consulting with an exclusive native AI automation layer that traditional system integrators cannot match.',
                'stats' => [['value' => '100%', 'label' => 'Certified Talent'], ['value' => '2x', 'label' => 'Faster Time-to-Value'], ['value' => '55%', 'label' => 'Fewer Manual Steps'], ['value' => '24/7', 'label' => 'Continuous Care']],
                'hero_image' => 'photo-1554224155-6726b3ff858f',
            ],
            [
                'slug' => 'ar-vr-mr', 'title' => 'Spatial Computing & Virtual Simulation', 'subtitle' => 'Immersive Industrial Training Environments',
                'icon' => '🥽', 'color' => '#9333ea', 'color_light' => '#faf5ff',
                'description' => 'High-fidelity augmented, virtual, and mixed reality applications engineered for risk-free vocational simulations, complex equipment repair, and 3D architectural review.',
                'intro' => 'Accelerate workforce comprehension and drastically cut physical training risks with interactive digital twins and spatial immersion systems.',
                'features' => ['Photorealistic 3D environment modeling', 'Adaptive AI-guided simulation loops', 'Multi-user collaborative spaces', 'Zero-latency localized rendering'],
                'benefits' => ['Drastic reduction in operational training accidents', 'High retention rates through muscle memory', 'Interactive virtual client sales presentations', 'Cross-border remote expert assistance', 'Measurable acceleration in operator readiness'],
                'usecases' => ['High-voltage industrial safety simulations', 'Heavy mechanical maintenance guided walkthroughs', 'Virtual real estate walkthroughs and digital twins', 'Remote technician spatial tele-assistance', 'Photorealistic product prototype review'],
                'gallery_images' => [
                    'photo-1626379953822-baec19c3accd', 'photo-1593508512255-86ab42a8e620', 'photo-1617802690992-15d93263d3a9',
                ],
                'steps' => [
                    ['title' => 'Feasibility & ROI Scoping', 'desc' => 'Pinpointing highest-leverage spatial training use cases.'],
                    ['title' => 'Interactive Storyboarding', 'desc' => 'Mapping physics, user interaction patterns, and fail conditions.'],
                    ['title' => 'Digital Twin Modeling', 'desc' => 'Creating millimeter-accurate 3D assets and photorealistic environments.'],
                    ['title' => 'Software Engineering', 'desc' => 'Developing interactive mechanics and physics logic.'],
                    ['title' => 'Validation Trials', 'desc' => 'Testing comfort, cognitive retention, and mechanical fidelity.'],
                    ['title' => 'Enterprise Rollout', 'desc' => 'Deploying across industrial headsets and field tablets.'],
                ],
                'why_us' => 'We unite cutting-edge spatial engineering with native cognitive AI — crafting simulations that adapt intelligently to user behavior.',
                'stats' => [['value' => '3D', 'label' => 'Spatial Fidelity'], ['value' => '90%', 'label' => 'Retention Uplift'], ['value' => '100%', 'label' => 'Air-Gapped Capable'], ['value' => '24/7', 'label' => 'Technical Support']],
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
                'name' => 'Synthex DataMesh', 'tag' => 'Conversational Enterprise Neural BI', 'metric' => '< 0.4s In-Memory Synthesis', 'is_flagship' => true, 'sort_order' => 0,
                'description' => 'Direct conversational querying over enterprise ERP & transaction lakes in native Bengali and English. Generates automated operational dashboards, predictive inventory forecasts, and executive KPI audits with zero SQL overhead.',
                'features' => ['Bilingual semantic parsing (Bangla & English)', 'Direct in-memory ERP sync with zero ETL overhead', 'Deterministic financial reconciliation', 'Zero intermediate cloud data transit'],
                'logo' => 'pluse.jpeg',
                'demo' => [
                    'kind' => 'synthex',
                    'queries' => ['Show top 5 product lines by net operational margin', 'What are our primary quarterly revenue drivers?', 'Calculate gross profit vs operational cost trends'],
                    'sidebar' => ['Neural Mesh', 'Dynamic Audits', 'Data Connectors', 'Ledger History'],
                    'databases' => 3,
                    'steps' => ['Semantic Interpretation', 'Deterministic Database Scan', 'Synthesize Intelligence'],
                    'chartLabel' => 'Gross Margins by Sector',
                    'topLabel' => 'Top Performing Assets',
                    'topItems' => [['Industrial Division A', '$38.4k'], ['Commercial Division B', '$31.2k'], ['Logistics Division C', '$24.8k'], ['Digital Services', '$19.5k'], ['Regional Hub', '$15.7k']],
                ],
            ],
            [
                'name' => 'DocuCognition AI', 'tag' => 'Sovereign Document Intelligence & Ledger Sync', 'metric' => 'Zero-Hallucination Extraction', 'is_flagship' => true, 'sort_order' => 1,
                'description' => 'Autonomous multimodal parser that ingests commercial invoices, customs declarations, shipping bills of lading, and procurement contracts — extracting structured ledger fields with deterministic precision directly into enterprise accounting.',
                'features' => ['Parses multi-format commercial invoices & bills of lading', 'Extracts nested tables, line-items & tax records', 'Direct bi-directional sync to SAP, Oracle & custom ERPs', 'Cryptographic tamper-evident audit trail for every parsed file'],
                'logo' => 'brainclerk-logo.jpg',
                'demo' => [
                    'kind' => 'clerk',
                    'sidebar' => ['Document Ingest', 'Extracted Entities', 'Executive Reports', 'Encrypted Archive'],
                    'files' => ['Commercial_Invoice_Q4_Export.pdf', 'Customs_Declaration_Manifest.pdf', 'Supply_Chain_Consignment.pdf'],
                    'steps' => ['Parse Document Structure', 'Isolate Financial Data', 'Verify Totals', 'Sync to ERP'],
                ],
            ],
            [
                'name' => 'VisionGate Core', 'tag' => 'Sub-Second Biometric Edge Optical Verification', 'metric' => '99.94% Verification Accuracy', 'is_flagship' => true, 'sort_order' => 2,
                'description' => 'Converts existing commercial RTSP/IP cameras into a seamless biometric access verification and workforce intelligence platform — verifying identity in milliseconds without touch sensors, swipe badges, or choke points.',
                'features' => ['Runs directly on existing on-premise RTSP surveillance streams', 'Zero-contact concurrent multi-individual authentication', 'Direct payroll & workforce ledger sync with microsecond precision', 'Hardened for harsh industrial environments and multi-shift facilities'],
                'logo' => 'dotlog-logo.png',
                'demo' => [
                    'kind' => 'visiongate',
                    'title' => 'Autonomous Optical Workforce Verification',
                    'subtitle' => 'Camera-agnostic · Verified real-time telemetry',
                    'entries' => [
                        ['EMP-104', 'Tanvir Ahmed', '08:58:14 AM', 'present'],
                        ['EMP-109', 'Nusrat Jahan', '09:02:41 AM', 'present'],
                        ['EMP-115', 'Mahmudul Karim', '09:05:19 AM', 'present'],
                    ],
                ],
            ],
            [
                'name' => 'LexiScan Mobile', 'tag' => 'Offline-First Edge Document & Receipt Digitizer', 'metric' => '< 1.8s Capture to Ledger Posting', 'is_flagship' => true, 'sort_order' => 3,
                'description' => 'Transforms smartphones and ruggedized handheld devices into high-precision edge OCR scanners. Captures handwritten chalan slips, fuel receipts, and delivery notes offline, synchronizing instantly with the central enterprise ledger when network connects.',
                'features' => ['Offline-first edge inferencing directly on handheld devices', 'Recognizes handwritten Bengali & English numeric vouchers', 'Sub-2 second transaction verification and auto-reconciliation', 'Encrypted background synchronization with central ERP database'],
                'logo' => 'lightocr-logo.png',
                'demo' => [
                    'kind' => 'lexiscan',
                    'sidebar' => ['Edge Scanner', 'OCR Ingestion', 'Reconciled Ledger', 'Corporate Registry', 'Vendor Database'],
                    'docs' => ['consignment_manifest_849204.pdf', 'invoice_284910_commercial.jpeg'],
                ],
            ],
            [
                'name' => 'Vocalis Enterprise', 'tag' => 'Autonomous Conversational Voice & Task Automation', 'metric' => '24/7 Resilient Autonomous Telephony', 'is_flagship' => true, 'sort_order' => 4,
                'description' => 'Native voice agent engineered for enterprise call flows and operational command. Understands conversational Bengali and English with local dialect tolerance, completing real-time enterprise transactions, bookings, and customer workflows.',
                'features' => ['Deep dialect comprehension in Bengali & English speech', 'Executes multi-step authenticated workflows & CRM updates', 'Zero third-party telephony cloud dependencies', 'Ultra-low latency sub-250ms conversational turn-around'],
                'logo' => 'moina-logo.svg',
                'demo' => [
                    'kind' => 'vocalis',
                    'messages' => [
                        'Assalamu alaikum! How may I assist your enterprise today?',
                        'Confirmed! Dispatch order scheduled and verified. Ledger invoice posted.',
                    ],
                    'items' => [
                        ['Autonomous Voice Core', 'active'],
                        ['Speech Synthesis', 'bn-bd-neural'],
                        ['Automated Workflow', 'realtime'],
                        ['Operational Ledger', 'reconciled'],
                    ],
                ],
            ],
            [
                'name' => 'CyberGrid BMS', 'tag' => 'Autonomous Building & Industrial Energy Intelligence', 'metric' => '22.4% Average Facility Energy Reduction', 'is_flagship' => true, 'sort_order' => 5,
                'description' => 'Autonomous IoT orchestration layer connecting industrial HVAC, lighting, and power subsystems via standard industrial protocols to optimize consumption and predict equipment failure in real-time.',
                'features' => ['Native industrial telemetry via Modbus, BACnet, and MQTT', 'Predictive maintenance scheduling with anomaly detection', 'Automated load-shedding and peak shaving control', 'Real-time energy efficiency dashboards and compliance reporting'],
                'logo' => 'smart-bms-logo.png',
                'demo' => [
                    'kind' => 'cybergrid',
                    'title' => 'Autonomous CyberGrid Telemetry Hub',
                    'subtitle' => 'High-throughput backbone · Open interoperability',
                    'protocols' => ['BACnet/IP', 'DALI', 'Modbus', 'CANbus', 'MQTT/LoRa'],
                ],
            ],
        ];

        $more = [
            [
                'name' => 'Nexus Cognitive Executive', 'tag' => 'Autonomous Executive Chief of Staff', 'is_flagship' => false, 'sort_order' => 0,
                'description' => 'Voice-controlled executive assistant that synthesizes calendar schedules, prepares briefings from confidential enterprise data, and automates high-priority communications securely on-premise.',
                'logo' => 'blens-card-logo.png',
                'features' => [],
            ],
            [
                'name' => 'VaniTrade Terminal', 'tag' => 'Conversational Wholesale & Retail Voice Point-of-Sale', 'is_flagship' => false, 'sort_order' => 1,
                'description' => 'Enables merchants and logistics coordinators to record wholesale trades, invoice generation, and warehouse adjustments verbally in colloquial Bengali without touching a keyboard.',
                'logo' => 'sohojogi-card-logo.png',
                'features' => [],
            ],
            [
                'name' => 'WebTensor Reconciler', 'tag' => 'Autonomous Multi-Portal Supply Chain Ingest', 'is_flagship' => false, 'sort_order' => 2,
                'description' => 'Autonomously harvests orders and shipment confirmations across multi-vendor logistics and buyer portals, reconciling them into central ERPs without custom API integrations.',
                'logo' => 'booking-model-logo-v3.png',
                'features' => [],
            ],
            [
                'name' => 'VisionShield QC', 'tag' => 'High-Speed Optical Quality Assurance', 'is_flagship' => false, 'sort_order' => 3,
                'description' => 'Microsecond industrial computer vision tracking microscopic fabric flaws, surface irregularities, and packaging defects along rapid manufacturing and packaging lines.',
                'logo' => 'proxy-eye-card-logo.png',
                'features' => [],
            ],
            [
                'name' => 'LexTrade Compliance', 'tag' => 'Algorithmic Letter-of-Credit & Trade Audit', 'is_flagship' => false, 'sort_order' => 4,
                'description' => 'Performs mathematical pre-submission verification of international trade documents, bills of lading, and LC conditions against international ICC UCP 600 standards.',
                'logo' => 'validex-ai-logo.png',
                'features' => [],
            ],
            [
                'name' => 'TerraMind Agronomics', 'tag' => 'Deep-Learning Crop Health & Soil Diagnostic Engine', 'is_flagship' => false, 'sort_order' => 5,
                'description' => 'Field computer vision diagnosing botanical pathogens, nutritional deficiencies, and pest infestations from smartphone imagery with localized intervention guidance.',
                'logo' => 'agrorx-card-logo.svg',
                'features' => [],
            ],
        ];

        // Wipe old records to ensure clean rename
        Product::truncate();

        foreach ($flagship as $p) {
            Product::create($p);
        }
        foreach ($more as $p) {
            Product::create($p);
        }
    }

    private function seedTeamMembers(): void
    {
        $members = [
            ['name' => 'Kazi Zulkernine', 'role' => 'Senior Strategic Advisor', 'category' => 'advisor', 'sort_order' => 0, 'photo' => 'osama-taseer.jpg',
                'bio' => 'Veteran industrialist and distinguished export council leader with 28+ years steering manufacturing conglomerates across South Asia. Champions sovereign digital infrastructure and strategic industrial scaling.',
                'tags' => ['Industrial Scaling', 'Strategic Governance', 'Manufacturing Innovation']],
            ['name' => 'Shahriar Rahman, FCA', 'role' => 'Financial & Corporate Advisor', 'category' => 'advisor', 'sort_order' => 1, 'photo' => 'sabuj.jpg',
                'bio' => 'Fellow Chartered Accountant with 22+ years in international finance, cross-border corporate structure, and regulatory compliance. Former group financial controller across multinational tech entities.',
                'tags' => ['Corporate Finance', 'M&A Governance', 'Institutional Compliance']],
            ['name' => 'Prof. Dr. M. A. Hashem', 'role' => 'Scientific & Research Advisor', 'category' => 'advisor', 'sort_order' => 2, 'photo' => 'golam-farook.jpg',
                'bio' => 'Senior computational researcher and academic pioneer in applied machine intelligence and embedded algorithms. Advises on core mathematical determinism and sovereign neural architectures.',
                'tags' => ['Neural Architectures', 'Mathematical Modeling', 'Applied Research']],
            ['name' => 'Dr. Reaz Ahmed', 'role' => 'Chairman & Senior Partner', 'category' => 'core', 'sort_order' => 0, 'photo' => 'dayal.jpg',
                'bio' => 'Distinguished industrial leader providing executive direction to ABC AI System. Directs strategic capital investments across regional advanced engineering, renewable energy, and automated logistics.',
                'tags' => ['Corporate Governance', 'Capital Strategy', 'Executive Board']],
            ['name' => 'Tariqul Islam, M.Sc.', 'role' => 'Managing Director & Chief Architect', 'category' => 'core', 'sort_order' => 1, 'photo' => 'shakhawat.jpg',
                'bio' => 'Principal systems architect championing air-gapped sovereign AI and zero-hallucination inference pipelines. Holds advanced postgraduate honors in computer intelligence with a track record in critical systems.',
                'tags' => ['Chief AI Architect', 'Sovereign Systems', 'Deterministic Models']],
            ['name' => 'Naveed Mahbub', 'role' => 'Director of Enterprise Solutions', 'category' => 'core', 'sort_order' => 2, 'photo' => 'tarique.jpg',
                'bio' => 'Oversees enterprise platform commercialization, institutional client integration, and tier-1 partner engineering across banking, manufacturing, and telecommunications.',
                'tags' => ['Enterprise Strategy', 'Turnkey Solutions', 'Institutional Partnerships']],
        ];

        TeamMember::truncate();

        foreach ($members as $m) {
            TeamMember::create($m);
        }
    }

    private function seedClients(): void
    {
        $clients = [
            ['name' => 'Apex Industrial Holdings', 'logo' => 'sa-plumbing-heating.png', 'group' => 'clients', 'sort_order' => 0, 'accent' => '#0ea5e9'],
            ['name' => 'Summit Energy & Systems', 'logo' => 'unique-group.png', 'group' => 'clients', 'sort_order' => 1, 'accent' => '#00a389'],
            ['name' => 'Navana Automation Group', 'logo' => 'x-ceramics-limited.png', 'group' => 'clients', 'sort_order' => 2, 'accent' => '#0080ff'],
            ['name' => 'Square Infrastructure Tech', 'logo' => 'finlays.png', 'group' => 'clients', 'sort_order' => 3, 'accent' => '#10b981'],
            ['name' => 'Bengal Maritime Logistics', 'logo' => 'uniglory.png', 'group' => 'clients', 'sort_order' => 4, 'accent' => '#6366f1'],
            ['name' => 'Pragati Automotive Engineering', 'logo' => 'popular-pharma.webp', 'group' => 'pilots', 'sort_order' => 0, 'accent' => '#00a389'],
            ['name' => 'Incepta Bio-Diagnostics', 'logo' => 'renata-icon.png', 'group' => 'pilots', 'sort_order' => 1, 'accent' => '#0284c7'],
            ['name' => 'Eastern Transit & Freight', 'logo' => 'bata.svg', 'group' => 'pilots', 'sort_order' => 2, 'accent' => '#8b5cf6'],
        ];

        Client::truncate();

        foreach ($clients as $c) {
            Client::create($c);
        }
    }

    private function seedIndustries(): void
    {
        $items = [
            ['name' => 'Banking & Capital Markets', 'icon' => '🏦'],
            ['name' => 'Advanced Manufacturing', 'icon' => '🏭'],
            ['name' => 'Retail & Distribution', 'icon' => '🛒'],
            ['name' => 'Precision Agriculture', 'icon' => '🌾'],
            ['name' => 'Infrastructure & Real Estate', 'icon' => '🏗️'],
            ['name' => 'Clinical Healthcare', 'icon' => '🏥'],
            ['name' => 'Supply Chain & Maritime Freight', 'icon' => '🚢'],
            ['name' => 'Public Administration', 'icon' => '🏛️'],
            ['name' => 'Intelligent Facilities', 'icon' => '🏢'],
            ['name' => 'Business Process Operations', 'icon' => '💼'],
        ];

        foreach ($items as $i => $item) {
            Industry::updateOrCreate(['name' => $item['name']], $item + ['sort_order' => $i]);
        }
    }

    private function seedTechDomains(): void
    {
        $items = [
            ['title' => 'Deterministic Artificial Intelligence', 'description' => 'Custom deep learning architectures, semantic parsing, and mathematically verified decision graphs.', 'icon' => '🤖'],
            ['title' => 'Enterprise Big Data Architectures', 'description' => 'High-throughput stream processing, localized data lakes, and sub-second business intelligence.', 'icon' => '📊'],
            ['title' => 'Automated Pattern Extraction', 'description' => 'Unsupervised clustering, anomaly identification, and predictive trend modeling across enterprise stores.', 'icon' => '⛏️'],
            ['title' => 'Internet of Things & Edge Compute', 'description' => 'Decentralized sensor networks, localized edge inferencing, and autonomous cyber-physical controls.', 'icon' => '📡'],
            ['title' => 'Industrial Robotics Integration', 'description' => 'Autonomous robotic guidance, automated warehouse logistics, and precision mechanical vision.', 'icon' => '🦾'],
            ['title' => 'Augmented Enterprise ERP Systems', 'description' => 'Modernizing SAP and Oracle architectures with an embedded cognitive automation layer.', 'icon' => '🗂️'],
            ['title' => 'Spatial Computing & XR Simulation', 'description' => 'Photorealistic digital twins, industrial safety immersion, and spatial collaborative sandboxes.', 'icon' => '🥽'],
        ];

        foreach ($items as $i => $item) {
            TechDomain::updateOrCreate(['title' => $item['title']], $item + ['sort_order' => $i]);
        }
    }

    private function seedCoreValues(): void
    {
        $items = [
            ['title' => 'Sovereignty by Design', 'description' => 'Client data remains strictly inviolable — our models live inside your security zone with zero external telemetry.', 'icon' => '🔒'],
            ['title' => 'Deterministic Precision', 'description' => 'We engineer predictable, mathematically auditable inference engines that eliminate random hallucinations and fabricated outputs.', 'icon' => '🎯'],
            ['title' => 'Pioneering Deep R&D', 'description' => 'Relentlessly expanding fundamental neural architectures to solve complex regional and domain-specific enterprise constraints.', 'icon' => '💡'],
            ['title' => 'Tangible Economic Impact', 'description' => 'Every deployment is engineered to produce verifiable operational cost reductions, rapid cycle accelerations, and measurable institutional ROI.', 'icon' => '🤝'],
        ];

        foreach ($items as $i => $item) {
            CoreValue::updateOrCreate(['title' => $item['title']], $item + ['sort_order' => $i]);
        }
    }

    private function seedAdvantages(): void
    {
        $items = [
            ['title' => 'Sovereign Neural Engine', 'subtitle' => 'Zero Hallucinations', 'description' => 'Our proprietary, deterministic model — engineered from foundational mathematics in Bangladesh.', 'icon' => '🧠'],
            ['title' => 'Absolute Perimeter Privacy', 'subtitle' => '100% Data Sovereignty', 'description' => 'Critical enterprise records remain strictly inside your network with zero external data egress.', 'icon' => '🔐'],
            ['title' => 'Indigenous Engineering, Global Caliber', 'subtitle' => 'Homegrown Innovation', 'description' => 'Pioneering computational talent building world-class infrastructure for global enterprises.', 'icon' => '🌏'],
            ['title' => 'Full-Spectrum Capability', 'subtitle' => '15+ Turnkey Systems', 'description' => 'From computer vision and conversational agents to facility automation — a single trusted partner.', 'icon' => '⚙️'],
            ['title' => 'Universal Sector Adaptability', 'subtitle' => '10+ Vertical Industries', 'description' => 'Proven reliability across banking, heavy industry, export manufacturing, and public utilities.', 'icon' => '🏢'],
        ];

        foreach ($items as $i => $item) {
            Advantage::updateOrCreate(['title' => $item['title']], $item + ['sort_order' => $i]);
        }
    }

    private function seedMethodologies(): void
    {
        $items = [
            ['title' => 'Strategic Diagnostics', 'description' => 'Engaging domain specialists to precisely isolate foundational business constraints.', 'icon' => '🔍'],
            ['title' => 'Parameter & Scope Mapping', 'description' => 'Specifying operational boundaries, data schemas, security perimeters, and quantitative success benchmarks.', 'icon' => '📐'],
            ['title' => 'Algorithmic Architecture', 'description' => 'Formulating mathematical models and mapping integration patterns suited to the enterprise environment.', 'icon' => '🔬'],
            ['title' => 'Rapid Functional Prototyping', 'description' => 'Developing an agile, demonstrable proof-of-concept tested against real client data.', 'icon' => '🧪'],
            ['title' => 'Iterative Stress Testing', 'description' => 'Benchmarking accuracy, edge-case resilience, and user feedback in an iterative testing loop.', 'icon' => '🛠️'],
            ['title' => 'Production Engineering', 'description' => 'Hardening the system for industrial-grade uptime, security compliance, and high throughput.', 'icon' => '💻'],
            ['title' => 'Deployment & Knowledge Transfer', 'description' => 'Turnover, comprehensive workforce training, and continuous proactive operational monitoring.', 'icon' => '🚀'],
        ];

        foreach ($items as $i => $item) {
            Methodology::updateOrCreate(['title' => $item['title']], $item + ['sort_order' => $i]);
        }
    }

    private function seedComparisons(): void
    {
        $items = [
            ['feature' => 'Data Sovereignty', 'us_value' => '100% On-Premise — confidential records never leave your firewall', 'them_value' => 'Processed across multi-tenant shared commercial cloud servers'],
            ['feature' => 'Algorithmic Reliability', 'us_value' => 'Deterministic, rule-verified inference with zero hallucinations', 'them_value' => 'Probabilistic approximations prone to frequent hallucinated outputs'],
            ['feature' => 'External Dependencies', 'us_value' => 'Completely self-sufficient native software stack', 'them_value' => 'Locked into recurring foreign API provider billing and service disruptions'],
            ['feature' => 'Architectural Customization', 'us_value' => 'Tailored down to granular algorithmic weights and internal workflows', 'them_value' => 'Constrained by fixed public API interfaces and rate limits'],
            ['feature' => 'Air-Gapped & Offline Utility', 'us_value' => 'Operates seamlessly in disconnected or classified environments', 'them_value' => 'Inoperable without constant, high-bandwidth public internet links'],
            ['feature' => 'Data Retention Policies', 'us_value' => 'Zero intermediate caching or third-party storage retention', 'them_value' => 'Prompts and telemetry ingested for vendor model retraining'],
            ['feature' => 'Compliance & Auditability', 'us_value' => 'Complete local audit logs with verifiable data residency', 'them_value' => 'Cross-border data transit with ambiguous legal jurisdiction'],
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
