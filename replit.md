# Overview

EcoGreen is a modern web application featuring a glassmorphism-style landing page with an eco-conscious green aesthetic. The project is built as a full-stack TypeScript application using React for the frontend and Express for the backend, with support for multiple themes (light, dark, and eco) and responsive design across all devices.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

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

## External Dependencies

**Database**
- Drizzle ORM for type-safe database queries and migrations
- Configured for PostgreSQL via @neondatabase/serverless
- Schema migrations managed through drizzle-kit
- Connection via DATABASE_URL environment variable

**Third-Party UI Libraries**
- Radix UI for headless, accessible component primitives (accordion, dialog, dropdown, popover, tooltip, etc.)
- Embla Carousel for touch-enabled carousels
- Lucide React for consistent icon system
- React Day Picker for calendar/date selection
- CMDK for command palette interface
- Recharts for data visualization components

**Form Management**
- React Hook Form for performant form state management
- @hookform/resolvers for validation schema integration
- Zod for runtime type validation and schema definition

**Development Tools**
- Replit-specific plugins for development experience (error modal, cartographer, dev banner)
- PostCSS with Tailwind and Autoprefixer for CSS processing
- TSX for running TypeScript in development

**Session Management**
- Connect-pg-simple for PostgreSQL-backed session storage (configured but not actively used)
- Express session middleware ready for authentication implementation

**Utility Libraries**
- date-fns for date manipulation and formatting
- clsx and tailwind-merge (via cn utility) for conditional className composition
- nanoid for generating unique identifiers