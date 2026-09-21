<div align="center">

# ⚡ NIRVAN '26

### Annual Technical Festival

<img src="public/assets/nirvan-banner.jpg" alt="NIRVAN '26 — Annual Technical Festival" width="100%" />

<br />

**Uttarakhand's Premier Engineering, Cybersecurity & E-Sports Showdown**

[![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-10.7-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://webathon-nirvan.vercel.app/)
[![MIT License](https://img.shields.io/badge/License-MIT-10B981?style=for-the-badge)](LICENSE)

[🌐 **Live Demo**](https://webathon-nirvan.vercel.app/) · [🐛 **Report an Issue**](https://github.com/Sanidhyanegi07/webathon/issues) · [✨ **Request a Feature**](https://github.com/Sanidhyanegi07/webathon/issues/new)

</div>

---

## 📑 Contents

- [🎯 About NIRVAN '26](#-about-nirvan-26)
- [✨ Highlights](#-highlights)
- [🎨 Design System](#-design-system)
- [🛠️ Tech Stack](#️-tech-stack)
- [🎪 Flagship Events](#-flagship-events)
- [📅 Schedule Experience](#-schedule-experience)
- [🏗️ Project Structure](#️-project-structure)
- [🚀 Getting Started](#-getting-started)
- [🔥 Firebase Configuration](#-firebase-configuration)
- [🚢 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [👥 Team](#-team)
- [📄 License](#-license)

---

## 🎯 About NIRVAN '26

**NIRVAN '26** is the official web platform for the annual technical festival organised by [Graphic Era Hill University](https://www.gehu.ac.in/), Haldwani, in partnership with Tech Geeks.

The platform brings event discovery, schedules, speakers, sponsors, registration, and festival updates together in one fast, responsive single-page application. Its visual identity follows a bold **neo-brutalist / Bauhaus design language** with strong borders, hard shadows, high-contrast colors, and purposeful motion.

### At a glance

- 🎯 **4-day** inter-college technology festival
- 👥 **500+** developers, ethical hackers, designers, and gamers
- 🏆 **₹1,75,000+** in combined prize money
- 📱 Responsive experience for mobile, tablet, and desktop
- 🔐 Google authentication with Firestore registration support
- 💾 Local-storage fallback when Firebase is unavailable

## ✨ Highlights

| Feature | Description |
| --- | --- |
| **Interactive event discovery** | Search and filter competitions by category, format, and event details. |
| **Guided registration** | Multi-step team registration with ticket generation and success feedback. |
| **Master schedule** | Multi-day timeline with track filters and automatic live-session detection. |
| **Immersive interactions** | 3D tilt cards, scroll reveals, count-up statistics, marquees, and confetti feedback. |
| **Partner showcase** | Sponsor tiers and partnership information presented through an interactive prospectus. |
| **Responsive by design** | Carefully structured layouts that remain usable from 360px mobile screens to large desktops. |

## 🎨 Design System

NIRVAN uses a functional neo-brutalist design system focused on clarity, contrast, and tactile interactions.

| Color | Hex | Usage |
| --- | --- | --- |
| 🟡 Bauhaus Yellow | `#FFCC00` | Primary accent, highlights, and calls to action |
| ⬛ Ink Black | `#1A1A1A` | Borders, typography, and hard shadows |
| 🟤 Cream Neutral | `#F5F0E8` | Main page background |
| ⬜ Pure White | `#FFFFFF` | Cards and elevated surfaces |
| 🔴 Alert Red | `#E63B2E` | Security track accents and error states |
| 🔵 Electric Blue | `#0055FF` | Coding track accents and links |
| 🟢 Emerald Green | `#10B981` | Gaming track accents and live indicators |

Shared visual utilities such as `.brutal-btn`, `.card-brutal`, and `.section-label` are defined in `src/index.css`.

## 🛠️ Tech Stack

- **UI runtime:** [React 18.2](https://react.dev/)
- **Build tool:** [Vite 5.4](https://vitejs.dev/)
- **Styling:** [Tailwind CSS 3.4](https://tailwindcss.com/), PostCSS, and Autoprefixer
- **Authentication and data:** [Firebase Authentication](https://firebase.google.com/docs/auth) and Cloud Firestore
- **Icons:** [Lucide React](https://lucide.dev/)
- **Typography:** Space Grotesk for headings and Inter for body text
- **Micro-interactions:** Canvas Confetti and custom React hooks
- **Deployment:** Vercel, with a GitHub Pages workflow included

### Architecture overview

```text
Browser
  └── React single-page application
      ├── Presentation: sections, cards, modals, and responsive layouts
      ├── Interaction: search, filters, animations, and schedule controls
      ├── Custom hooks: viewport reveals, count-up stats, and registration
      └── Services
          ├── Firebase Auth + Firestore
          └── localStorage fallback + ticket cache
```

## 🎪 Flagship Events

| Event | Category | Date | Prize Pool | Team Format |
| --- | :---: | :---: | ---: | --- |
| ⚡ **Hackathon** | Coding | Oct 24 | **₹50,000** | 2–4 members |
| 🗺️ **Treasure Hunt** | Adventure | Oct 24 | **₹20,000** | 3–5 members |
| 🚩 **Capture The Flag** | Security | Oct 25 | **₹25,000** | 1–3 members |
| 🎮 **E-Sports Arena** | Gaming | Oct 26 | **₹40,000** | Squad / solo |
| 🛠️ **Workshop Series** | Learning | Oct 24–25 | Certificates + mentorship | Individual |

> Event information is maintained centrally in `src/data/index.js`, allowing content updates without changing presentation components.

## 📅 Schedule Experience

The schedule is designed for quick scanning across all four days:

- Clear time badges with IST labels
- Category-specific track colors
- Automatic `Live Now` status based on the current time
- Responsive day selectors for smaller screens
- Scroll padding that keeps section headings visible below the sticky navbar

## 🏗️ Project Structure

```text
webathon/
├── public/assets/           # Banner, logos, and gallery images
├── src/
│   ├── components/          # Navbar, sections, cards, modals, and footer
│   ├── context/             # Firebase authentication context
│   ├── data/                # Events, speakers, schedule, and gallery content
│   ├── hooks/               # useInView, useCountUp, and useRegistration
│   └── lib/                 # Firebase setup and shared utilities
├── .github/workflows/       # Deployment workflow
├── .env.example             # Firebase environment variable template
├── firebase.json            # Firebase hosting configuration
├── firestore.rules          # Firestore security rules
├── index.html               # SEO and Open Graph metadata
├── package.json             # Scripts and dependencies
└── vite.config.js           # Vite configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js **18 or later**
- npm **9 or later**
- Git

### Installation

```bash
git clone https://github.com/Sanidhyanegi07/webathon.git
cd webathon
npm install
npm run dev
```

Open the local URL shown by Vite—usually [`http://localhost:5173`](http://localhost:5173).

### Available scripts

```bash
npm run dev       # Start the development server
npm run build     # Create an optimized production build
npm run preview   # Preview the production build locally
```

## 🔥 Firebase Configuration

Firebase is optional for running the interface locally. Without credentials, registrations use the browser's local-storage fallback.

To enable Google authentication and Firestore persistence:

1. Copy the example environment file:

   ```bash
   cp .env.example .env.local
   ```

2. Add your Firebase web-app configuration:

   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

3. In Firebase Console, enable Google sign-in, create the required Firestore database, and add local and deployed domains to the authorised domains list.

> **Security note:** Vite variables are exposed to the browser. Never add private keys, service-account credentials, or other server secrets to `.env.local`. Use Firestore security rules to protect registration data.

## 🚢 Deployment

### Vercel

The production site is available at [webathon-nirvan.vercel.app](https://webathon-nirvan.vercel.app/). Connect the repository to Vercel and configure the Firebase `VITE_*` variables in the project settings when cloud features are enabled.

### GitHub Pages

The repository includes `.github/workflows/deploy.yml`, which builds the Vite application and deploys the static output to GitHub Pages. If deploying under a project subpath, verify the Vite `base` configuration before publishing.

## 🤝 Contributing

Contributions, suggestions, and bug reports are welcome.

1. Fork the repository.
2. Create a branch: `git checkout -b feat/your-change`.
3. Make and test your changes with `npm run build`.
4. Commit your work: `git commit -m "feat: describe your change"`.
5. Push the branch and open a pull request.

For larger changes, open an issue first so the approach can be discussed.

## 👥 Team

| Contributor | Role | Affiliation |
| --- | --- | --- |
| [**Sanidhya Negi**](https://github.com/Sanidhyanegi07) | Lead Developer & Architect | Graphic Era Hill University |
| **Karan** | Frontend Engineering | Graphic Era Hill University |
| **Rudraksh** | UI & Component Design | Graphic Era Hill University |
| **Shobhit** | Content & QA | Graphic Era Hill University |

<div align="center">

**Made with ⚡ by the students of Graphic Era Hill University for the Web-a-thon Hackathon.**

## 📄 License

This project is released under the [MIT License](LICENSE).

⭐ If you found the project useful or inspiring, consider giving it a star.

</div>
