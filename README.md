<div align="center">

<img src="public/assets/nirvan-banner.jpg" alt="NIRVAN '26 — Annual Technical Festival" width="100%" style="border: 2px solid #1A1A1A; box-shadow: 6px 6px 0px #1A1A1A;" />

<br />
<br />

⚡ NIRVAN '26 — Annual Technical Festival
* Uttarakhand's Premier Engineering, Cyber & E-Sports Showdown *

[![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Firebase](https://img.shields.io/badge/Firebase-10.7-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com)
[![Vercel Deployment](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://webathon-nirvan.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

<br />

**The official web platform for NIRVAN '26 — the flagship annual technical festival organized by [Graphic Era Hill University](https://www.gehu.ac.in/), Haldwani in partnership with the Tech Geeks Club.**

Built with a bold, functionalist **Brutalist / Bauhaus design language**, responsive cross-device layouts, custom React hook architectures, 3D physics-based card tilts, and zero-latency cloud registrations.

<br />

[🌐 **Explore Live Demo**](https://webathon-nirvan.vercel.app) · [📋 **Report Issue**](https://github.com/Sanidhyanegi07/webathon/issues) · [✨ **Request Feature**](https://github.com/Sanidhyanegi07/webathon/issues) · [🤝 **Sponsorship**](mailto:sanidhyanegi050107@://gmail.com)


---

</div>
<br />

## 📑 Table of Contents

- [🎯 Overview & Vision](#-overview--vision)
- [✨ Key Architectural Highlights](#-key-architectural-highlights)
- [🎨 Brutalist Design System](#-brutalist-design-system)
- [🛠️ Tech Stack & Architecture](#️-tech-stack--architecture)
- [🎪 Flagship Events](#-flagship-events)
- [📅 Master Schedule Engine](#-master-schedule-engine)
- [🏗️ Project Structure](#️-project-structure)
- [🚀 Quickstart & Setup](#-quickstart--setup)
- [🔥 Firebase Configuration](#-firebase-configuration)
- [🚢 Automated CI/CD Deployment](#-automated-cicd-deployment)
- [👥 Core Team & Contributors](#-core-team--contributors)
- [📄 License](#-license)

---

## 🎯 Overview & Vision

**NIRVAN '26** is a 4-day, inter-college technological summit bringing together **500+ student developers, ethical hackers, designers, and gamers** with a collective cash pool of **₹1,75,000+**.

The web application acts as the digital command center for the festival:
1. **Interactive Discovery**: Fast, client-side faceted filtering & full-text search across all competitions.
2. **Zero-Friction Registration**: Google Auth + multi-step team registration with instant ticket issuance.
3. **Master Timeline**: Synchronized schedule viewer with track filters and active live-session detection.
4. **Partner Ecosystem**: Dynamic sponsor prospectus featuring animated marquees and tier comparisons.

---

## ✨ Key Architectural Highlights

| Module | Engineering Pattern | Impact |
|:---|:---|:---|
| **🪟 3D Perspective Tilt Cards** | Mouse-coordinate vector calculation with dynamic specular glare overlay & spring-like CSS transforms | High-impact visual engagement on desktop without layout jitter |
| **🌊 Scroll Reveal Engine** | Custom `useInView` hook wrapping `IntersectionObserver` with configurable entry thresholds & stagger timing | Silky smooth section entrances without heavyweight external animation bundles |
| **📊 Eased Stat Counters** | Custom `useCountUp` hook using `requestAnimationFrame` and a cubic ease-out curve (`1 - (1 - t)³`) | Numbers count smoothly from 0 to 500+ upon entering the viewport |
| **🎫 Resilient Dual-Write** | Hybrid Firebase Firestore + synchronous `localStorage` fallback persistence | 100% registration reliability even under poor network or aggressive adblockers |
| **📏 Scroll Progress Depth** | Hardware-accelerated fixed indicator synced with active section intersection | Immediate visual orientation across deep landing page content |
| **📱 Desktop & Mobile Centric** | Balanced 2-column desktop grid & seamless mobile stack with zero text or node collisions | Zero horizontal overflow, tested on 360px–1920px viewports |

---

## 🎨 Brutalist Design System

NIRVAN '26 rejects cookie-cutter corporate templates in favor of a raw, geometric, and functionalist **Bauhaus / Neo-Brutalist** aesthetic.

### Color Palette

| Swatch | Color Name | Hex Code | Purpose |
|:---:|:---|:---|:---|
| 🟡 | **Bauhaus Yellow** | `#FFCC00` | Primary brand accent, interactive highlights, CTA hover states |
| ⬛ | **Ink Black** | `#1A1A1A` | Hard borders, heavy typography, brutalist drop-shadows |
| 🟤 | **Cream Neutral** | `#F5F0E8` | Matte backdrop, high-contrast readable surfaces |
| ⬜ | **Pure White** | `#FFFFFF` | Card backgrounds, elevated modal dialogs |
| 🔴 | **Alert Red** | `#E63B2E` | Cybersecurity track accent, error states |
| 🔵 | **Electric Blue** | `#0055FF` | Coding / Hackathon category badge, tech links |
| 🟢 | **Emerald Green** | `#10B981` | Gaming / E-Sports category badge, live pulsing indicators |

### Component Style Utility

```css
/* Signature Brutalist Components (src/index.css) */
.brutal-btn {
  /* Solid ink fill with 4px hard shadow, expands to 8px on hover */
  border: 2px solid #1A1A1A;
  box-shadow: 4px 4px 0px 0px #1A1A1A;
  transition: all 0.2s cubic-bezier(0.22, 1, 0.36, 1);
}

.card-brutal {
  /* Elevated surface with clean high-contrast boundaries */
  background: #FFFFFF;
  border: 2px solid #1A1A1A;
  box-shadow: 6px 6px 0px 0px #1A1A1A;
}

.section-label {
  /* Upper-case badge with animated light shimmer */
  font-family: 'Space Grotesk', sans-serif;
  letter-spacing: 0.25em;
  background: rgba(255, 204, 0, 0.2);
}
```

---

## 🛠️ Tech Stack & Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                        NIRVAN '26 ARCHITECTURE                         
├────────────────────────────────────────────────────────────────────────┤
│                                                                        
│   [ Client Browser ]                                                   
│           │                                                            
│           ├── Single Page App (React 18 + Vite 5 Bundler)              
│           │      ├── Presentation Layer (Tailwind CSS 3.4 + Space Gro) 
│           │      ├── Custom Hooks (useInView, useCountUp, useReg)      
│           │      └── Component Tree (Hero, Schedule, Events, Modals)   
│           │                                                            
│           ├── Local State (LocalStorage Mirror & Ticket Cache)         
│           │                                                            
│           └── Cloud Services                                           
│                  ├── Google Firebase Auth (OAuth 2.0 Sign-In)          
│                  ├── Cloud Firestore (Encrypted Registration Store)    
│                  └── Vercel / GitHub Pages (Global Edge Distribution)  
│                                                                        
└────────────────────────────────────────────────────────────────────────┘
```

### Core Technologies
- **UI Runtime**: [React 18.2](https://react.dev/)
- **Build Engine**: [Vite 5.4](https://vitejs.dev/)
- **Styling Architecture**: [Tailwind CSS 3.4](https://tailwindcss.com/) + PostCSS Autoprefixer
- **Backend & Persistence**: [Firebase 10.7](https://firebase.google.com/) (Authentication + Cloud Firestore)
- **Typography**: Space Grotesk (Headlines & Badges) + Inter (Body Copy) via Google Fonts
- **Iconography**: [Lucide React](https://lucide.dev/) (Tree-shakeable SVG icons)
- **Micro-Delight**: Canvas Confetti particle physics engine on successful registration

---

## 🎪 Flagship Events

<div align="center">

| Event | Category | Date | Prize Pool | Team Format |
|:---|:---:|:---:|:---:|:---:|
| ⚡ **Hackathon** | Coding | Oct 24 | **₹50,000** | 2–4 Members |
| 🗺️ **Treasure Hunt** | Adventure | Oct 24 | **₹20,000** | 3–5 Members |
| 🚩 **Capture The Flag** | Security | Oct 25 | **₹25,000** | 1–3 Members |
| 🎮 **E-Sports Arena** | Gaming | Oct 26 | **₹40,000** | Squad / Solo |
| 🛠️ **Workshop Series** | Learning | Oct 24–25 | **Certificates + Mentorship** | Individual |

</div>

---

## 📅 Master Schedule Engine

The festival timeline utilizes a collision-proof flex card architecture:
- **Dedicated Time Badges**: Clear time labels (`09:00 IST`) isolated from interactive indicators.
- **Track Status**: Color-coded category tags with animated `● Live Now` detection based on real-time clock calculation.
- **Responsive Day Toggles**: Grid of Day selectors (`Day 1` to `Day 4`) scaling gracefully across mobile viewports.
- **Sticky Header Clearance**: Built-in `scroll-mt-24` and `html { scroll-padding-top: 5.5rem; }` so section headers never hide under the navigation bar.

---

## 🏗️ Project Structure

```
webathon/
├── 📄 index.html                 # HTML5 template with SEO, OpenGraph & Preload hints
├── 📄 package.json               # Dependencies, scripts & repository metadata
├── 📄 LICENSE                    # Official MIT License
├── 📄 vite.config.js             # Vite config with manual chunk optimization
├── 📄 tailwind.config.js         # Custom theme extensions, fonts, and colors
├── 📄 postcss.config.js          # PostCSS processing pipeline
├── 📄 firestore.rules            # Firestore database security rules
├── 📄 firestore.indexes.json     # Firestore composite index definitions
├── 📄 firebase.json              # Firebase CLI hosting rules
├── 📄 .env.example               # Environment variables template
│
├── 📁 .github/
│   └── workflows/
│       └── deploy.yml            # Automated GitHub Pages CI/CD workflow
│
├── 📁 public/
│   └── assets/
│       ├── nirvan-banner.jpg     # Hero festival banner
│       ├── gehu-logo.jpg         # Graphic Era Hill University logo
│       ├── tech-geeks-logo.jpg   # Tech Geeks club logo
│       └── gallery/              # Archive photography (photo1.jpg – photo5.jpg)
│
└── 📁 src/
    ├── main.jsx                  # Application bootstrap
    ├── App.jsx                   # Layout root assembler
    ├── index.css                 # Global CSS design tokens & brutalist components
    │
    ├── 📁 components/
    │   ├── Navbar.jsx            # Sticky navigation with reading depth progress bar
    │   ├── HeroSection.jsx       # 2-column desktop / mobile stacked hero + countdown card
    │   ├── AboutSection.jsx      # Scroll-triggered count-up statistics
    │   ├── EventsSection.jsx     # Interactive 3D tilt cards, search & detail modals
    │   ├── ScheduleSection.jsx   # Collision-free multi-day timeline engine
    │   ├── SpeakersSection.jsx   # Keynote mentor directory with expandable abstracts
    │   ├── SponsorsSection.jsx   # Partnership prospectus with continuous marquee ribbon
    │   ├── GallerySection.jsx    # Photo archive with category tabs & keyboard lightbox
    │   ├── ContactSection.jsx    # Contact details & campus coordinates
    │   ├── Footer.jsx            # Quick navigation & legal credits
    │   └── RegistrationModal.jsx # Multi-step registration flow + confetti celebration
    │
    ├── 📁 context/
    │   └── AuthContext.jsx       # Firebase Google Auth provider & state
    │
    ├── 📁 hooks/
    │   ├── useInView.js          # IntersectionObserver scroll reveal engine
    │   ├── useCountUp.js         # Smooth cubic ease-out counter hook
    │   └── useRegistration.js    # Resilient dual-write Firestore + LocalStorage hook
    │
    ├── 📁 data/
    │   └── index.js              # Centralized events, speakers, schedule & gallery data
    │
    └── 📁 lib/
        ├── firebase.js           # Firebase SDK initialization with fallbacks
        └── utils.js              # Class merger utility (`cn`) and countdown math
```

---

## 🚀 Quickstart & Setup

### Prerequisites
- **Node.js**: `v18.x` or higher
- **npm**: `v9.x` or higher
- **Git**: Latest version

### Local Development

```bash
# 1. Clone the repository
git clone https://github.com/Sanidhyanegi07/webathon.git

# 2. Navigate to project root
cd webathon

# 3. Install dependencies
npm install

# 4. Start local development server
npm run dev
```

The application will be accessible at: **`http://localhost:3000`** ⚡

### Production Build

```bash
# Compile and minify for production
npm run build

# Preview production build locally
npm run preview
```

---

## 🔥 Firebase Configuration

To link your own Firebase project for authentication and Firestore registration storage:

1. Duplicate `.env.example` as `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
2. Populate `.env.local` with your Firebase Console credentials:
   ```env
   VITE_FIREBASE_API_KEY=AIzaSy...
   VITE_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-app
   VITE_FIREBASE_STORAGE_BUCKET=your-app.firebasestorage.app
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=1:123456:web:...
   VITE_FIREBASE_MEASUREMENT_ID=G-...
   ```

> [!NOTE]
> The app is architected with a local persistence mirror. Even without Firebase keys configured, registrations will seamlessly save to browser `localStorage` and generate valid ticket cards!

---

## 🚢 Automated CI/CD Deployment

### Vercel (Current Production Host)
Every commit pushed to the `main` branch automatically triggers a production deployment on Vercel:
👉 **[https://webathon-nirvan.vercel.app/](https://webathon-nirvan.vercel.app/)**

### GitHub Pages (Configured Workflow)
This repository includes a pre-configured GitHub Actions workflow in `.github/workflows/deploy.yml`:
- Runs automated dependency install and `vite build`.
- Generates `404.html` SPA routing fallbacks.
- Deploys static build artifacts to GitHub Pages on every release push.

---

## 👥 Core Team & Contributors

<div align="center">

| Contributor | Role | Affiliation |
|:---|:---|:---|
| **[Sanidhya Negi](https://github.com/Sanidhyanegi07)** | 🚀 Lead Developer & Architect | Graphic Era Hill University |
| **Karan** | 💻 Frontend Engineering | Graphic Era Hill University |
| **Rudraksh** | 💻 UI / Component Design | Graphic Era Hill University |
| **Shobhit** | 💻 Content & QA | Graphic Era Hill University |

*Proudly crafted by the students of Graphic Era Hill University, Bhimtal for the Web-a-thon Hackathon.*

</div>

---

## 📄 License

This project is licensed under the open-source **MIT License** — see the [LICENSE](LICENSE) file for complete details.

<div align="center">

### ⭐ Star this repository if you found it inspiring!

</div>
