# Maze Pathfinder

## Overview

A 3D maze visualization game built with React and Three.js that demonstrates pathfinding algorithms. Users select an algorithm (A*, BFS, DFS, UCS, or IDS) and watch a ball navigate through a procedurally generated maze using the selected search strategy. The application visualizes both the path found and cells visited during the search.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **React + TypeScript**: Single-page application with no routing needed
- **React Three Fiber**: Declarative 3D rendering using Three.js
- **Zustand**: Lightweight state management with subscription selectors for maze state, game state, and audio
- **Tailwind CSS + Radix UI**: Styling system with shadcn/ui component library
- **Vite**: Build tool and development server with GLSL shader support

### State Management
The app uses Zustand stores with `subscribeWithSelector` middleware:
- `useMaze`: Manages maze generation, algorithm selection, pathfinding results, ball position, and game phases (menu → solving → moving → completed)
- `useGame`: Simpler game state for ready/playing/ended phases
- `useAudio`: Audio playback controls

### 3D Scene Structure
- `Maze3D`: Renders walls, floor, path visualization, and visited cells
- `Ball`: Animated sphere that follows the computed path
- `Camera`: Dynamic camera that follows the ball during movement
- `Lights`: Scene lighting with ambient and directional lights

### Pathfinding Implementation
Located in `client/src/lib/pathfinding.ts`:
- A* Search with Manhattan distance heuristic
- Breadth-First Search (BFS)
- Depth-First Search (DFS)
- Uniform Cost Search (UCS)
- Iterative Deepening Search (IDS)

Each algorithm returns both the solution path and visited cells for visualization.

### Backend Architecture
- **Express.js**: Minimal REST API server
- **In-memory storage**: Default storage implementation using Map data structures
- **PostgreSQL ready**: Drizzle ORM configured with schema for users table
- **Session support**: connect-pg-simple available for session management

### Build System
- Development: Vite dev server with HMR
- Production: Custom esbuild script bundles server with allowlisted dependencies for faster cold starts

## External Dependencies

### Database
- **PostgreSQL**: Configured via `DATABASE_URL` environment variable
- **Drizzle ORM**: Schema-first database toolkit with `drizzle-kit` for migrations
- Schema location: `shared/schema.ts`

### 3D Graphics
- **Three.js** via React Three Fiber and Drei helpers
- **Postprocessing** for visual effects
- Font assets in `client/public/fonts/`

### UI Components
- **Radix UI**: Full suite of accessible primitives
- **Lucide React**: Icon library
- **class-variance-authority**: Component variant management

### API Layer
- **TanStack Query**: Data fetching with custom `apiRequest` wrapper
- Fetch-based API calls with credential handling