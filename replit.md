# Overview

Atmoscope is a professional weather dashboard application built with React and Express. The application provides comprehensive weather information including current conditions, 5-day forecasts, hourly charts, and detailed atmospheric data. It features a modern, responsive design with a dark theme optimized for weather visualization, utilizing glass morphism effects and smooth animations to create an engaging user experience.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

The client-side is built as a Single Page Application (SPA) using React with TypeScript. The architecture follows a component-based design pattern with clear separation of concerns:

- **UI Framework**: React with TypeScript for type safety and better development experience
- **Styling**: Tailwind CSS with a custom design system featuring weather-themed colors and glass morphism effects
- **Component Library**: shadcn/ui components with Radix UI primitives for accessible, customizable UI elements
- **State Management**: React hooks for local state, TanStack Query for server state management and caching
- **Routing**: Wouter for lightweight client-side routing
- **Build Tool**: Vite for fast development and optimized production builds

## Backend Architecture

The server follows a RESTful API design using Express.js:

- **Framework**: Express.js with TypeScript for the REST API
- **Development Setup**: Vite middleware integration for seamless full-stack development
- **Storage Interface**: Abstracted storage layer with in-memory implementation for development
- **Error Handling**: Centralized error handling middleware
- **Request Logging**: Custom middleware for API request monitoring

## Data Storage Solutions

The application uses a flexible storage architecture:

- **ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL configured for production (using Neon Database)
- **Development Storage**: In-memory storage implementation for local development
- **Schema Management**: Shared schema definitions between client and server using Zod for validation

## Authentication and Authorization

Basic user management infrastructure is in place with:

- **User Schema**: PostgreSQL table with username/password fields
- **Storage Interface**: CRUD operations for user management
- **Session Management**: Express session configuration with PostgreSQL session store

## Design System and Theming

The application implements a comprehensive design system:

- **Color Scheme**: Dark theme with weather-specific color variables (stormy, sunny, cloudy, rainy, snowy)
- **Glass Effects**: Custom CSS variables for backdrop-blur and transparency effects
- **Typography**: Responsive text sizing with consistent spacing
- **Animations**: Custom keyframes for smooth transitions and loading states
- **Responsive Design**: Mobile-first approach with collapsible sidebar and adaptive layouts

# External Dependencies

## Third-Party APIs

- **WeatherAPI**: Primary weather data source providing current conditions, forecasts, and location search functionality
- **API Configuration**: Centralized API key management and rate limiting considerations

## UI and Visualization Libraries

- **Radix UI**: Comprehensive set of accessible UI primitives for complex components
- **Recharts**: Chart library for weather data visualization and 24-hour forecast displays
- **Lucide React**: Consistent icon library for weather conditions and UI elements
- **Class Variance Authority**: Type-safe variant management for component styling

## Development and Build Tools

- **Vite**: Modern build tool with HMR and optimized bundling
- **ESBuild**: Fast JavaScript bundler for server-side code
- **PostCSS**: CSS processing with Tailwind CSS integration
- **TypeScript**: Static type checking across the entire codebase

## Database and ORM

- **Neon Database**: Serverless PostgreSQL for production deployment
- **Drizzle Kit**: Database migrations and schema management
- **Drizzle Zod**: Schema validation integration

## Utility Libraries

- **date-fns**: Date manipulation and formatting for weather timestamps
- **clsx & tailwind-merge**: Conditional CSS class management
- **wouter**: Lightweight routing solution
- **nanoid**: Unique ID generation for components and sessions

The architecture prioritizes developer experience with hot module replacement, type safety throughout the stack, and a modular component system that supports rapid feature development while maintaining code quality and performance.