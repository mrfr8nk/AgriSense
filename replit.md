# Overview

AgriSense AI Pro is a professional farming application with a glassmorphism-style interface featuring an eco-conscious green aesthetic. Built as a full-stack TypeScript application using React for the frontend and Express for the backend, it supports multiple themes (light, dark, and eco) with responsive design across all devices.

**Status**: Production-ready, fully deployable to Vercel with real API integrations.

**Features**:
- Firebase Google Sign-In + Email/Password Auth
- Real-time weather data (Open-Meteo)
- AI chatbot & image analysis (BK9 AI)
- Farm project management
- Community forum with engagement
- Multi-language support (English/Shona)
- Professional animations & transitions

# User Preferences

Preferred communication style: Simple, everyday language.
Deploy target: Vercel (configured and tested)
API approach: Real data only, no mocks

# System Architecture

## Deployment Configuration

**Vercel Setup**
- vercel.json configured for full-stack deployment
- buildCommand: `npm run build` (Vite + esbuild)
- outputDirectory: `dist` (contains both frontend + backend)
- Routes configured: /api/* → Express backend, /* → React frontend
- .vercelignore excludes unnecessary files
- Environment variables required: DATABASE_URL, SESSION_SECRET, Firebase credentials

**Build Process**
- Frontend: Vite builds to dist/public
- Backend: esbuild bundles TypeScript to dist/index.js (ESM format)
- Assets: Generated images included (farmer, landscape, nature, technology)
- Production optimized: Code splitting, CSS minification, tree-shaking

**Recent Fixes (Nov 25, 2025)**
- Fixed weather route to use path params (/api/weather/:lat/:lon)
- Fixed project creation validation
- Fixed community posts validation
- Improved error handling and logging
- Added proper type casting for API responses
- Updated community forum UI with better styling and empty states

## Frontend Architecture

**Framework & Build Tool**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server for fast builds and hot module replacement
- React Router (wouter) for lightweight client-side routing
- React Query (@tanstack/react-query) for server state management and data fetching

**UI Component System**
- Shadcn/ui component library with Radix UI primitives for accessible, unstyled components
- Tailwind CSS for utility-first styling with custom eco-green color palette
- Class Variance Authority (CVA) for variant-based component styling
- Custom glassmorphism design system with layered depth and transparency effects

**Design System**
- Three theme modes: light, dark, and eco (specialized green theme)
- Responsive breakpoints: mobile-first approach with md (768px), lg (1024px), and xl (1280px)
- Custom color system including eco palette (eco-50 through eco-900) and semantic color tokens
- Typography using Google Fonts (Inter/Poppins) with system font fallbacks
- Spacing system based on Tailwind's standardized units

**State Management**
- React Query for async state and server data
- React hooks for local component state
- Theme persistence using localStorage

## Backend Architecture

**Server Framework**
- Express.js for HTTP server and API routing
- TypeScript for type safety across the stack
- Separate development and production entry points (index-dev.ts, index-prod.ts)

**Development vs Production**
- Development: Vite middleware integration for HMR and dynamic module loading
- Production: Static file serving from pre-built dist/public directory
- esbuild for fast backend bundling in production builds

**API Design**
- RESTful API structure with /api prefix for all backend routes
- Modular route registration system in routes.ts
- Request/response logging middleware with timing metrics
- JSON body parsing with raw body preservation for webhooks

**Data Layer**
- Storage abstraction interface (IStorage) for flexible data persistence
- In-memory storage implementation (MemStorage) for development
- Database-ready architecture with Drizzle ORM configured for PostgreSQL
- Schema definitions using Drizzle with Zod validation

## External APIs & Services

**Authentication**
- Firebase v12+ for Google Sign-In
- Environment variables: VITE_FIREBASE_API_KEY, VITE_FIREBASE_PROJECT_ID, VITE_FIREBASE_APP_ID

**AI & Analysis**
- BK9 API for chatbot (model: gemini_2_5_flash)
- BK9 Vision API for crop image analysis (model: meta-llama/llama-4-scout)
- Requests via fetch (no SDK needed)

**Weather**
- Open-Meteo API for real-time weather data
- Free tier, no API key required
- Cached for performance (1 hour TTL)

**Image Hosting**
- Catbox.moe for temporary image uploads (free tier)
- Used for community posts and image analysis

## External Dependencies

**Database**
- Drizzle ORM for type-safe database queries and migrations
- Configured for PostgreSQL via @neondatabase/serverless
- Schema migrations managed through drizzle-kit
- Connection via DATABASE_URL environment variable
- Tables: farmers, projects, community_posts, comments, notifications, chat_messages, analysis_reports, weather_cache

**UI & Styling**
- Radix UI for headless component primitives
- Shadcn/ui component library
- Lucide React for professional icons (no emoji used)
- TailwindCSS v4 with custom eco palette
- Framer Motion for animations

**Development Tools**
- Replit-specific plugins (error modal, cartographer, dev banner)
- PostCSS with Tailwind v4 and Autoprefixer
- TSX for TypeScript execution
- Vite v5 for fast builds

**Other**
- React Hook Form + Zod for form validation
- React Query v5 for server state
- Wouter for lightweight routing
- Express session + Passport for session management