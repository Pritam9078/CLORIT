# CLORIT - 3D Satellite NDVI Dashboard

## Overview
A comprehensive React + TypeScript frontend application for visualizing NDVI (Normalized Difference Vegetation Index) data for mangrove forest monitoring using 3D satellite globe visualization.

## 🌟 Features

### Core Components

#### 1. **3D Satellite Globe** (`SatelliteGlobe2.tsx`)
- **Interactive 3D visualization** with CSS 3D transforms
- **NDVI color mapping**: Green (healthy), Yellow (moderate), Red (poor)
- **Role-based data filtering** for different user types
- **Project markers** with click interactions
- **Dual view modes**: Satellite view vs NDVI view
- **Real-time rotation** and smooth animations
- **Regional information panels** with project statistics

#### 2. **Role-Based Dashboards**

##### Community User Dashboard (`CommunityUserDashboard.tsx`)
- **Personal land monitoring** - limited to user's registered areas
- **NDVI health metrics** with trend visualization
- **Carbon credits tracking** and alerts
- **Interactive bar chart** showing NDVI progression
- **Project-specific notifications** and health updates

##### NGO Dashboard (`NGODashboard2.tsx`)
- **Multi-project oversight** for assigned verification areas
- **Data upload center** with drag-and-drop file handling
- **Verification task management** with priority indicators
- **Field survey integration** for ground-truth validation
- **Progress tracking** through verification stages

##### NCCR Government Dashboard (`NCCRDashboard2.tsx`)
- **National overview** with full project visibility
- **Project approval workflow** with status management
- **Comprehensive analytics** and regional distribution
- **Data export capabilities** (CSV, Excel, JSON, GIS)
- **Historical NDVI datasets** access

#### 3. **Landing Page** (`LandingPage2.tsx`)
- **Professional design** with ocean blue theme
- **Role selection interface** with feature comparisons
- **Smooth animations** and responsive layout
- **Environmental branding** with blue carbon focus

## 🎨 Design System

### Color Palette
- **Background**: `#F8FAF9` (soft white)
- **Primary Ocean Blue**: `#0077B6` → `#00B4D8` (gradients)
- **Secondary Green**: `#4CAF50` → `#81C784` (nature/health)
- **Accent Sand**: `#E0E7E9` (neutral highlights)

### NDVI Color Coding
- **Healthy vegetation**: `#4CAF50` (NDVI ≥ 0.6)
- **Moderate vegetation**: `#FFEB3B` (NDVI 0.4-0.6)
- **Poor vegetation**: `#F44336` (NDVI < 0.4)

### UI Elements
- **Rounded corners**: `border-radius: 1rem`
- **Glassmorphism effects**: `backdrop-filter: blur(10px)`
- **Soft shadows**: `box-shadow: 0 10px 25px rgba(0, 119, 182, 0.1)`
- **Smooth transitions**: `transition: all 0.3s ease`

## 🏗️ Architecture

### Component Hierarchy
```
NDVIApp.tsx (Main App)
├── LandingPage2.tsx (Role Selection)
├── CommunityUserDashboard.tsx
│   └── SatelliteGlobe2.tsx
├── NGODashboard2.tsx
│   └── SatelliteGlobe2.tsx
└── NCCRDashboard2.tsx
    └── SatelliteGlobe2.tsx
```

### Data Flow
1. **Landing Page** → Role selection triggers navigation
2. **Role-based filtering** → Projects filtered by user permissions
3. **Globe interaction** → Region clicks update selected project
4. **Real-time updates** → NDVI data refreshed periodically

### State Management
- **Local component state** using React hooks
- **Props-based communication** between parent and child components
- **Role-based data filtering** at component level

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Modern browser with CSS 3D support

### Installation
```bash
# Navigate to project directory
cd /Users/pritam/Desktop/Dapps/CLORIT

# Install dependencies (already done)
npm install

# Start development server
npm run dev
```

### Accessing the Application
1. **Main Platform**: http://localhost:8080/
2. **NDVI Dashboard**: http://localhost:8080/ndvi-dashboard
3. **Direct Role Access**:
   - Community: Click "Community User" on landing page
   - NGO: Click "NGO Verifier" on landing page  
   - NCCR: Click "NCCR Admin" on landing page

## 📊 Sample Data

### Project Locations
- **Sundarbans Restoration** (West Bengal): 22.5°N, 89.0°E
- **Kerala Backwaters** (Kerala): 9.9°N, 76.3°E
- **Odisha Coast** (Odisha): 19.8°N, 85.8°E
- **Tamil Nadu Estuary** (Tamil Nadu): 11.1°N, 79.8°E
- **Gujarat Coastal Zone** (Gujarat): 22.3°N, 69.8°E

### Role-Based Data Access
- **Community Users**: See only their registered projects
- **NGO Verifiers**: Access to assigned verification projects
- **NCCR Admins**: Full national view of all projects

## 🔧 Technical Implementation

### 3D Globe Rendering
- **CSS 3D Transforms** for sphere visualization
- **Mathematical projection** from lat/lng to 3D coordinates
- **Dynamic marker positioning** with real-time updates
- **Performance optimized** with requestAnimationFrame

### NDVI Visualization
- **Color-coded markers** based on vegetation health
- **Interactive legends** with clear health indicators
- **Time-series data** support for historical tracking
- **Statistical aggregation** for regional overviews

### Responsive Design
- **Mobile-first approach** with CSS Grid
- **Adaptive layouts** for different screen sizes
- **Touch-friendly interactions** for mobile devices
- **Progressive enhancement** for advanced features

## 🌐 Integration Points

### Future API Connections
- **Satellite data APIs** for real NDVI imagery
- **Authentication services** for user management
- **Project management APIs** for CRUD operations
- **Export services** for data download functionality

### Data Sources
- **Sentinel-2 satellite imagery** for NDVI calculation
- **Field survey data** from NGO uploads
- **Government approval workflows** for project status
- **Carbon credit calculations** based on vegetation health

## 🔒 Security Considerations

### Role-Based Access Control
- **Data filtering** based on user permissions
- **Route protection** for sensitive administrative functions
- **Input validation** for file uploads and form data

### Data Privacy
- **Geolocation privacy** for community users
- **Secure file handling** for survey data uploads
- **Audit trails** for government approval processes

## 📱 Mobile Responsiveness

### Breakpoints
- **Desktop**: 1200px+ (full feature set)
- **Tablet**: 768px-1199px (adapted layouts)
- **Mobile**: <768px (simplified interfaces)

### Touch Interactions
- **Globe navigation** with touch gestures
- **Swipe navigation** for dashboard tabs
- **Pinch-to-zoom** for detailed map views

## 🎯 Performance Optimization

### Rendering Performance
- **Component memoization** for expensive calculations
- **Lazy loading** for non-critical components
- **Efficient re-rendering** with React.memo
- **Animation performance** with CSS transforms

### Data Optimization
- **Role-based data filtering** reduces payload
- **Component-level state management** minimizes updates
- **Debounced interactions** for smooth user experience

## 🚀 Deployment Considerations

### Build Optimization
```bash
npm run build
```

### Environment Configuration
- **Development**: Local satellite data simulation
- **Staging**: Test data with real API connections
- **Production**: Live satellite feeds and authentication

### Browser Compatibility
- **Modern browsers** with ES6+ support
- **CSS 3D transforms** support required
- **WebGL fallback** for advanced visualizations

## 🤝 Contributing

### Code Structure
- **Component-based architecture** with clear separation
- **TypeScript interfaces** for type safety
- **Consistent styling** with shared design system
- **Comprehensive commenting** for complex calculations

### Development Workflow
1. **Local development** with hot reload
2. **Component testing** in isolation
3. **Integration testing** across user roles
4. **Performance profiling** for optimization

This documentation provides a comprehensive overview of the NDVI dashboard application, covering all major features, technical implementation details, and deployment considerations.
