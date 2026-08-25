# NIRVAN '26 ⚡️

The official website for **NIRVAN '26**, the annual technical festival of Graphic Era Hill University (GEHU), Dehradun. 
Built with React, Vite, and Tailwind CSS using a bold, custom brutalist design language.

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start development server:**
   ```bash
   npm run dev
   ```
3. **Build for production:**
   ```bash
   npm run build
   ```

## 🎨 Design System & Architecture

This project strictly adheres to a **Brutalist / Bauhaus design system**. 

### Core Tech Stack
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Backend (Optional)**: Firebase (for event registrations)

### Styling Guidelines
- **Colors**: Uses a custom palette (`#F5F0E8` cream background, `#1A1A1A` border/text, `#FFCC00` accent yellow). All colors are defined in `tailwind.config.js`.
- **Typography**: Uses `Space Grotesk` (Headlines) and `Inter` (Body).
- **Components**: Everything is built using custom components leveraging Tailwind's `@layer components` in `index.css`.
  - `.brutal-btn`
  - `.card-brutal`
  - `.section-label`

## 📁 Project Structure

```
├── src/
│   ├── components/      # Reusable UI sections (Hero, Events, Schedule, etc.)
│   ├── context/         # React Context (AuthContext)
│   ├── data/            # Static data (Events list, Speakers, Schedule)
│   ├── hooks/           # Custom hooks (useRegistration)
│   ├── lib/             # Utilities (Firebase init, cn merge)
│   ├── App.jsx          # Main application layout
│   └── index.css        # Global styles & Tailwind layers
├── public/              # Static assets (Logos, images)
├── tailwind.config.js   # Theme configuration
└── package.json
```

## ⚙️ Environment Variables

To enable user registration and Firebase integration, create a `.env.local` file at the root:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## 🛠️ Built By
- Sanidhya
- Karan
- Rudraksh
- Shobhit
