# ABC AI System Limited — Full Stack (Laravel Backend + React Frontend)

এই প্রজেক্টটি সম্পূর্ণভাবে **Laravel Backend** এবং **Node.js React Frontend** এই দুটি পৃথক ফোল্ডারে রিফ্যাক্টর ও সাজানো হয়েছে। এটি সিপ্যানেল (cPanel), যেকোনো সাধারণ Apache হোস্টিং বা XAMPP-তে কোনো প্রকার `npm run` বা ব্যাকগ্রাউন্ড Node ডেমন ছাড়া সরাসরি রান করার জন্য প্রস্তুত।

**মূল বৈশিষ্ট্য:**
1. **অরিজিনাল ডিজাইন অপরিবর্তিত রাখা হয়েছে**: মূল ওয়েবসাইটের সকল CSS (`site-base.css`, `site-nav-hero.css`, `site-sections.css`, `site-extra.css`, `admin.css`), আইকন, ফন্ট (Plus Jakarta Sans) এবং ইন্টারঅ্যাক্টিভ ৩ডি ক্যানভাস অ্যানিমেশন (`hero-neural.js`) হুবহু অক্ষুণ্ণ রাখা হয়েছে।
2. **জিরো-কমান্ড ও পিএইচপি মাস্কিং (Zero-Command & Pure HTML Entry)**: প্রজেক্টের রুটে কোনো `index.php` নেই, সরাসরি `index.html` রয়েছে। ফলে ব্রাউজার বা বাহ্যিক কেউ দেখে বুঝতেই পারবে না যে ব্যাকএন্ডে PHP চলছে। `X-Powered-By` হেডার সম্পূর্ণ মুছে ফেলা হয়েছে। শুধু ব্যাকগ্রাউন্ডে সিকিউর API কল করার জন্য `.htaccess` দিয়ে লারাভেল হ্যান্ডেল করা হয়। কোনো `npm run` কমান্ডের প্রয়োজন নেই।
3. **এনক্রিপ্টেড ডাটা আদান-প্রদান (End-to-End Payload Encryption)**: React ফ্রন্টএন্ড এবং Laravel ব্যাকএন্ডের মধ্যে সকল ডাটা **AES-256-CBC + HMAC-SHA256** ক্রিপ্টোগ্রাফিক অ্যালগরিদম দিয়ে এনক্রিপ্ট হয়ে আদান-প্রদান হয়। ফলে ব্রাউজার নেটওয়ার্ক ট্যাবে বা ম্যান-ইন-দ্য-মিডল (MITM) অ্যাটাকে কোনো প্লেইন টেক্সট ডাটা হ্যাকাররা দেখতে পারবে না।
4. **এন্টারপ্রাইজ লেভেল সিকিউরিটি**: 
   - SQL Injection Prevention (Eloquent ORM + PDO parameterization)
   - XSS & Null Byte Stripping Middleware
   - Clickjacking Protection (`X-Frame-Options: SAMEORIGIN`)
   - MIME Sniffing Protection (`X-Content-Type-Options: nosniff`)
   - Brute-Force Rate Limiting (লগইন এবং কন্টাক্ট এপিআই-এ লিমিট)
   - Apache Security Rules (.env, .git, artisan ফাইল ব্রাউজার থেকে সরাসরি ব্লকড)

---

## 📁 প্রজেক্ট আর্কিটেকচার (Project Structure)

```
project_7629/
│
├── backend/                       # সম্পূর্ণ লারাভেল ব্যাকএন্ড (Laravel 12 REST API)
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/Api/   # Site, Auth, Admin API কন্ট্রোলার
│   │   │   └── Middleware/        # Crypto, SecurityHeaders, Sanitize, TokenAuth
│   │   ├── Models/                # Eloquent Models (Service, Product, Team, ইত্যাদি)
│   │   └── Services/              # CryptoService (AES-256-CBC + HMAC-SHA256)
│   ├── bootstrap/
│   ├── config/                    # cors.php, security, app config
│   ├── database/
│   │   ├── migrations/            # সব ডাটাবেস মাইগ্রেশন
│   │   └── seeders/               # ডেমো ডাটা সিডার
│   ├── public/                    # Production-ready Compiled React Assets, CSS & JS
│   │   ├── assets/                # Vite Compiled Bundles
│   │   ├── css/                   # Original Site Stylesheets
│   │   ├── js/                    # Original hero-neural.js & site.js
│   │   ├── images/                # Original SVG Logos & Graphics
│   │   ├── index.html             # React SPA Entry
│   │   └── index.php              # Laravel Front Controller
│   ├── routes/
│   │   ├── api.php                # সুরক্ষিত ও এনক্রিপ্টেড API এন্ডপয়েন্ট
│   │   └── web.php                # SPA Fallback Route
│   ├── storage/
│   ├── artisan
│   ├── composer.json
│   └── .env                       # ডাটাবেস ও সিকিউরিটি কনফিগারেশন
│
├── frontend/                      # সম্পূর্ণ React (Vite + Node.js) সোর্স কোড
│   ├── src/
│   │   ├── components/            # Navbar, Hero, Stats, Services, Products, ইত্যাদি
│   │   ├── pages/                 # Home, ServiceDetail, Admin Dashboard & CRUDs
│   │   ├── services/
│   │   │   ├── crypto.js          # Client-side AES-256-CBC + HMAC-SHA256
│   │   │   └── api.js             # Transparent Encrypted Axios Client
│   │   ├── context/               # AuthContext, SiteContext
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/                    # css, js, images assets for development/build
│   ├── dist/                      # প্রি-বিল্ড প্রোডাকশন ফাইল
│   ├── package.json
│   └── vite.config.js
│
├── .htaccess                      # Root Apache Router (cPanel & Localhost অটোমেটিক হ্যান্ডলার)
├── index.html                     # Root Pure HTML/SPA Entry (কোনো PHP স্বাক্ষর ছাড়াই সরাসরি সার্ভ হয়)
├── assets/                        # Compiled Production Bundles
├── css/                           # Original Stylesheets
├── js/                            # 3D Canvas & Scripts
├── images/                        # Vector Icons & Graphics
└── demo.sql                       # সম্পূর্ণ ডাটাবেস ব্যাকআপ
```

---

## 🚀 সিপ্যানেল বা যেকোনো হোস্টিংয়ে রান করার নিয়ম (Deployment Guide)

### ধাপ ১: ফাইল আপলোড
- সম্পূর্ণ ফোল্ডারটি আপনার cPanel-এর `public_html` অথবা সাবডোমেনের রুটে আপলোড করুন।

### ধাপ ২: ডাটাবেস সংযোগ (`backend/.env`)
- `backend/.env` ফাইলটি এডিট করে আপনার ডাটাবেসের তথ্য দিন:
  ```env
  DB_CONNECTION=mysql
  DB_HOST=127.0.0.1
  DB_PORT=3306
  DB_DATABASE=your_database_name
  DB_USERNAME=your_database_user
  DB_PASSWORD=your_database_password
  ```
- যদি ডাটাবেসে ডাটা থাকে, তবে সরাসরি প্রজেক্ট রান করবে!
- যদি নতুন ডাটাবেস হয়, তবে রুট ফোল্ডারে থাকা `demo.sql` ফাইলটি phpMyAdmin দিয়ে Import করে নিলেই সকল ডেমো ডাটা (সেটিংস, সার্ভিস, প্রোডাক্টস, টিম) রেডি হয়ে যাবে।

### ধাপ ৩: কোনো এক্সট্রা কমান্ড লাগবে না!
- কোনো `npm run dev` বা `npm run build` বা নোড সার্ভার রান করার দরকার নেই।
- রুট `.htaccess` এবং `backend/public` এর প্রি-বিল্ড ফ্রন্টএন্ড সরাসরি ব্রাউজারে সার্ভ হবে।

---

## 🔐 এডমিন প্যানেল তথ্য (Admin Portal)

- **অ্যাক্সেস URL**: `http://localhost/1_AGM/project_7629/#admin` অথবা `http://your-domain.com/#admin`
- **Default Email**: `admin@abcaisystemltd.com`
- **Default Password**: `admin123`

---

## 🛠️ ভবিষ্যতে ফ্রন্টএন্ড কোড এডিট করলে কীভাবে বিল্ড করবেন?
আপনি যদি `frontend/src/` ফোল্ডারের কোডে কোনো পরিবর্তন করেন, তবে বিল্ড করার জন্য:
```powershell
cd frontend
npm run build
Copy-Item -Path "dist/*" -Destination "../backend/public" -Recurse -Force
```
কপি হয়ে গেলে এটি স্বয়ংক্রিয়ভাবে লাইভ হয়ে যাবে।
