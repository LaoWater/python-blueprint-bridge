# Blue Pigeon - Programming Education Platform

## Project Overview
Blue Pigeon is an educational platform focused on teaching "The Art of Programming" through algorithmic thinking and pattern recognition. The project emphasizes understanding computational principles over syntax memorization, targeting developers who want to master algorithms, data structures, and essential programming patterns.

## Theme & Philosophy
**"Like a pigeon carrying essential messages across vast distances, Blue Pigeon carries the core patterns and principles needed to master programming."**

### Core Educational Philosophy:
- **Algorithmic Intuition**: Focus on understanding patterns and knowing where to look for solutions
- **Blueprint Mastery**: Essential programming patterns that developers can apply anywhere
- **Pattern Recognition**: Training developers to see underlying structures in any codebase
- **AI-Era Programming**: Emphasizing conceptual understanding over memorization in an AI-driven world

## Tech Stack & Architecture

### Frontend Stack
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: 
  - Radix UI primitives for accessibility
  - shadcn/ui component library
  - Custom blueprint-themed components
- **Routing**: React Router v6
- **State Management**: React Context (Auth, Content)
- **Data Fetching**: React Query (@tanstack/react-query)

### Backend & Database
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Real-time**: Supabase subscriptions
- **API**: Supabase Edge Functions
- **File Storage**: Supabase Storage

### Key Features
- **Content Management**: Editable content system for admins
- **Code Visualization**: Interactive code blocks with syntax highlighting
- **Progressive Learning**: Structured curriculum from foundations to mastery
- **Theme Support**: Dark/light mode with custom pigeon branding
- **Responsive Design**: Mobile-first approach
- **Chat Assistant**: Integrated help system

## Project Structure

### Pages Architecture
```
/pages/
├── LandingPage.tsx          # Main landing with philosophy carousel
├── Foundations.tsx          # Python & AI Foundations
├── Blueprints.tsx           # Core Blueprint Patterns  
├── BlueprintsMastery.tsx    # Advanced Mastery
├── DataCalculus.tsx         # Data Science focus
├── DataVisualizing.tsx      # Visualization techniques
├── MachineLearning.tsx      # ML fundamentals
├── AdvancedMachineLearning.tsx # Advanced ML
├── AuthPage.tsx             # Authentication
├── ProfilePage.tsx          # User profiles
└── AdminPage.tsx            # Admin content management
```

### Component Architecture
- **Editable System**: Content can be edited by admins in real-time
- **Modular UI**: Reusable components following design system
- **Context Providers**: Global state management for auth and content

### Database Schema
```sql
-- Content management
content (id, page, section, title, description, code, created_by, timestamps)

-- User management  
profiles (id, username, admin_level, timestamps)
```

## Design System

### Color Palette
- **Python Colors**: Blue (#306998), Yellow (#FFD43B) 
- **Brand Colors**: Blue Pigeon themes with blue/indigo gradients
- **Semantic**: Standard shadcn/ui color tokens

### Typography & Animations
- **Fonts**: System fonts with careful hierarchy
- **Animations**: Smooth transitions, scroll-triggered animations
- **Layout**: Grid-based responsive design

## Development Workflow

### Available Scripts
```bash
npm run dev          # Development server
npm run build        # Production build
npm run build:dev    # Development build
npm run lint         # ESLint checking
npm run preview      # Preview production build
```

### Development Setup
1. Clone repository
2. Install dependencies: `npm install`
3. Configure Supabase environment variables
4. Start development server: `npm run dev`

## Key Learning Paths

1. **Foundations**: Python fundamentals with algorithmic thinking
2. **Blueprint Patterns**: Essential coding patterns and algorithms  
3. **Advanced Mastery**: Complex algorithms and system design
4. **Data Track**: Calculus, visualization, and machine learning
5. **Specialization**: Advanced ML and AI applications

## Content Management
- Admins can edit all content in real-time
- Content is stored in Supabase with version control
- Seeding system for initial content population
- Dynamic table of contents generation

## Partner Integration
- **SkillBrain Partnership**: Educational collaboration
- **Lovable Platform**: Built using Lovable development environment

This platform combines modern web technologies with thoughtful educational design to create an engaging learning experience focused on algorithmic mastery rather than syntax memorization.