# Cuberto-Inspired Website Clone

A modern, animation-rich website implementation inspired by Cuberto.com, built with Next.js, Framer Motion, and Tailwind CSS.

## Implemented Sections

### 1. Hero Section
- Full-screen hero with dynamic text animations
- Interactive magnetic buttons with spring physics
- Mouse-following gradient background effect
- Staggered entrance animations for content
- Responsive design with mobile optimization

### 2. Projects Section
- Grid layout with hover interactions
- Smooth scale and fade transitions
- Parallax scroll effects
- Progressive loading animations
- Image hover effects with overlay

### 3. Services Section
- Card-based layout with hover animations
- Infinite rotation animation for icons
- Scroll-triggered fade and slide effects
- Responsive grid system
- Gradient backgrounds with hover states

## Technical Implementation

### Technologies Used
- **Next.js 13** - React framework with App Router
- **Framer Motion** - Animation library
- **Tailwind CSS** - Utility-first styling
- **TypeScript** - Type safety
- **Lucide React** - Icon system
- **React Intersection Observer** - Scroll-based animations

### Key Features

#### 1. Magnetic Button Effect
- Custom `useMagnetic` hook for mouse attraction effect
- Spring physics for smooth movement
- Configurable strength parameter
- Accessibility considerations with reduced motion support

#### 2. Scroll Animations
- Parallax scrolling effects
- Intersection Observer for triggering animations
- Spring-based smooth scrolling
- Progressive reveal animations

#### 3. Interactive Elements
- Mouse-following gradient
- Hover state animations
- Scale and transform effects
- Smooth transitions

## Challenges and Solutions

### 1. Performance Optimization
**Challenge**: Maintaining smooth animations with multiple effects running simultaneously.
**Solution**: 
- Used `useReducedMotion` hook for accessibility
- Implemented proper cleanup in custom hooks
- Optimized re-renders with proper dependencies

### 2. Responsive Design
**Challenge**: Maintaining animation quality across different screen sizes.
**Solution**:
- Tailwind breakpoints for responsive layouts
- Dynamic calculation of animation values based on viewport
- Mobile-first approach to animations

### 3. Animation Timing
**Challenge**: Coordinating multiple animations for a cohesive experience.
**Solution**:
- Implemented staggered animations using delays
- Created reusable animation variants
- Used spring physics for natural movement

## Code Structure
```
├── app/
│   ├── page.tsx        # Main page component
│   └── globals.css     # Global styles
├── hooks/
│   └── use-magnetic.ts # Custom magnetic effect hook
└── components/
    └── ui/            # Shadcn UI components
```

## Performance Considerations
- Lazy loading of images
- Optimized animation performance with `transform` properties
- Reduced motion support for accessibility
- Proper cleanup of event listeners
- Efficient state management

## Future Improvements
- Add more interactive elements
- Implement page transitions
- Add more sections from Cuberto
- Enhance mobile interactions
- Add more accessibility features