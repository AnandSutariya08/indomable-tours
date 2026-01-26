# Indomable Tours - Luxury Travel Website

## Overview

Indomable Tours is a luxury travel agency website specializing in curated travel experiences across India, Nepal, Bhutan, and Sri Lanka. The platform features a customer-facing marketing site with tour listings, destination guides, blog content, and testimonials, along with a full admin panel for content management. Data is stored in Firebase Firestore with local JSON seed data as fallback.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Stack
- **Framework**: React 18 with TypeScript, built using Vite
- **Styling**: Tailwind CSS with custom brand design system (60% cream, 25% gold, 10% blue, 5% red color ratio)
- **UI Components**: shadcn/ui component library with Radix UI primitives
- **Animations**: Framer Motion for page transitions and scroll animations
- **Routing**: React Router DOM for client-side navigation
- **State Management**: TanStack React Query for server state, React Context for auth state

### Component Architecture
- **Layout Components**: Header, Footer, PageHeader provide consistent structure across pages
- **Feature Components**: ExploreTours, ExploreDestinations, Testimonials, BlogHighlights are data-driven sections
- **Admin Components**: AdminLayout wraps all admin pages with sidebar navigation; ImageUploader handles Firebase Storage uploads
- **UI Components**: Located in `src/components/ui/`, these are shadcn/ui components following Radix patterns

### Data Layer
- **Primary Data Source**: Firebase Firestore collections (tours, destinations, blogPosts, cities, testimonials, team, travelInfo, etc.)
- **Fallback Strategy**: Local JSON seed files in `src/data/seed/` provide offline/demo data when Firestore is unavailable
- **Custom Hooks**: `useFirestoreData.ts` exports typed hooks (useTours, useBlogPosts, useDestinations, etc.) that fetch from Firestore with automatic fallback to seed data

### Admin Panel
- **Authentication**: Simple session-based auth stored in sessionStorage (demo only - uses hardcoded credentials)
- **Protected Routes**: AdminLayout component checks auth state and redirects to login if not authenticated
- **CRUD Operations**: Full create/read/update/delete for all content types via `firestoreService.ts`
- **Image Management**: Firebase Storage integration for uploading tour/blog images

### Routing Structure
- Public routes: `/`, `/tours`, `/tours/:id`, `/destinations`, `/travel-info`, `/tours-by-city`, `/blog`, `/blog/:id`, `/about`
- Admin routes: `/admin` (login), `/admin/dashboard`, `/admin/tours`, `/admin/blog`, `/admin/destinations`, `/admin/cities`, `/admin/testimonials`, `/admin/team`, `/admin/travel-info`, `/admin/home-sections`, `/admin/seed-uploader`

### Design System
- **Typography**: Belanosima for headings, Albert Sans for body text
- **CSS Variables**: Custom properties defined in `src/index.css` for theming
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Animation Classes**: Custom keyframes for fade-in, slide-up, and scale effects

## External Dependencies

### Firebase Services
- **Firestore**: Document database for all content (tours, destinations, blog posts, testimonials, team members, travel info, cities)
- **Storage**: Image and media file hosting for uploaded content
- **Configuration**: Environment variables for Firebase config with hardcoded fallbacks in `src/lib/firebase.ts`

### Third-Party Libraries
- **@tanstack/react-query**: Async state management and caching
- **framer-motion**: Animation library for page transitions and scroll effects
- **lucide-react**: Icon library
- **date-fns**: Date formatting utilities
- **embla-carousel-react**: Carousel/slider component
- **react-day-picker**: Calendar component for date selection
- **zod**: Schema validation (via @hookform/resolvers)
- **vaul**: Drawer component primitive
- **cmdk**: Command menu component

### Development Tools
- **Vite**: Build tool and dev server (configured on port 5000)
- **Vitest**: Testing framework with jsdom environment
- **ESLint**: Code linting with TypeScript and React plugins
- **TypeScript**: Strict mode disabled for flexibility, path aliases configured (`@/` maps to `src/`)