# Eco-Green Glassmorphism Landing Page Design Guidelines

## Design Approach
**Reference-Based with Specific Aesthetic**: Modern glassmorphism style inspired by Apple's design language, combined with an eco-conscious green palette and fluid animations. The design prioritizes visual impact while maintaining clean, professional presentation.

## Core Design Principles
1. **Layered Depth**: Use multiple glassmorphic layers to create visual hierarchy
2. **Organic Flow**: Smooth, nature-inspired animations and transitions
3. **Sustainable Aesthetics**: Eco-green palette with transparency and light
4. **Responsive Fluidity**: Seamless adaptation across all screen sizes

---

## Typography System

**Font Stack**:
- Primary: 'Inter' or 'Poppins' (Google Fonts)
- Fallback: -apple-system, system-ui, sans-serif

**Hierarchy**:
- Hero Headline: 3.5rem (56px) / Bold / line-height 1.1
- Section Headers: 2.5rem (40px) / Bold / line-height 1.2
- Subheadings: 1.5rem (24px) / Semibold / line-height 1.4
- Body Text: 1rem (16px) / Regular / line-height 1.6
- Small Text/Labels: 0.875rem (14px) / Medium / line-height 1.5

---

## Layout & Spacing System

**Tailwind Spacing Units**: Standardize on 4, 8, 12, 16, 20, 24, 32 (p-4, m-8, gap-12, py-16, etc.)

**Container Strategy**:
- Max width: `max-w-7xl` for main content sections
- Section padding: `py-20 lg:py-32` for vertical rhythm
- Content padding: `px-6 lg:px-8` for horizontal spacing
- Component gaps: `gap-8` for card grids, `gap-12` for major sections

**Responsive Breakpoints**:
- Mobile-first approach
- Tablet: md: (768px+)
- Desktop: lg: (1024px+)
- Wide: xl: (1280px+)

---

## Glassmorphism Specifications

**Primary Glass Effect**:
```
backdrop-filter: blur(12px)
background: rgba(255, 255, 255, 0.1) [light mode]
background: rgba(255, 255, 255, 0.05) [dark mode]
border: 1px solid rgba(255, 255, 255, 0.2)
border-radius: 20px
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1)
```

**Secondary Glass (Cards)**:
```
backdrop-filter: blur(8px)
background: rgba(255, 255, 255, 0.08)
border: 1px solid rgba(255, 255, 255, 0.15)
border-radius: 16px
```

**Eco-Green Accent Glass**:
```
backdrop-filter: blur(10px)
background: rgba(74, 222, 128, 0.15) [light]
background: rgba(74, 222, 128, 0.08) [dark]
border: 1px solid rgba(74, 222, 128, 0.3)
```

---

## Component Architecture

### Header (Sticky Navigation)
- Height: 80px desktop, 64px mobile
- Glassmorphic background with blur
- Logo left-aligned, navigation center, theme toggle + CTA right
- Navigation: 5-6 menu items with hover underline effect
- Theme toggle: Circular icon button with smooth rotation transition
- Mobile: Hamburger menu with slide-in glassmorphic drawer

### Hero Section
- Height: 90vh minimum
- **Large Hero Image**: Full-width background with gradient overlay (eco-green to transparent)
- Glassmorphic content card positioned center-left or center
- Headline + subheadline + dual CTA buttons
- Buttons on hero image: Glassmorphic background with blur, no hover color change (only scale transform)
- Floating animated elements (subtle leaf/nature icons)

### Animated Image Slider
- Full-width carousel below hero or as feature section
- Auto-slide every 4-5 seconds with smooth crossfade
- Glassmorphic navigation dots below
- Images: 1920x800px landscape format
- Overlay gradient on images for text readability
- Slide indicators and controls with glass effect

### Feature/Service Sections
- 3-column grid (lg:grid-cols-3, md:grid-cols-2, grid-cols-1)
- Glassmorphic cards with hover lift effect (transform: translateY(-8px))
- Icon at top, heading, description, optional CTA link
- Consistent card height with padding: p-8

### About/Content Section
- 2-column layout: Image left, content right (alternating pattern)
- Glassmorphic content containers
- Images: 800x600px with rounded corners (rounded-2xl)

### Footer
- Multi-column layout: 4 columns desktop, 2 tablet, 1 mobile
- Glassmorphic background, lighter blur than header
- Sections: Company info, Quick links, Resources, Newsletter signup
- Social icons with glass hover effect
- Copyright bar at bottom with subtle border-top
- Newsletter form: Glass input field + eco-green CTA button

---

## Theme Toggle System

**Three Modes**:
1. **Light Mode**: White/light backgrounds, eco-green accents, dark text
2. **Dark Mode**: Dark blue/charcoal backgrounds, bright eco-green accents, light text
3. **Eco Mode**: Nature-inspired green gradient backgrounds, glass elements with green tint

**Toggle Button**: 
- Icon rotation transition (sun → moon → leaf)
- Position: Top-right header
- Smooth 300ms transition for all theme changes
- Persist selection in localStorage

---

## Animation Specifications

**Page Load**:
- Hero content: Fade-in + slide-up (600ms delay)
- Navigation: Fade-in (300ms)
- Glassmorphic cards: Stagger fade-in as they enter viewport

**Scroll Animations**:
- Sections fade-in + slight slide-up when 20% visible
- Use Intersection Observer API
- Timing: 500ms ease-out

**Image Slider**:
- Transition: Crossfade 800ms
- Navigation dots scale on active (transform: scale(1.3))
- Pause on hover

**Interactive Elements**:
- Buttons: Scale 1.05 on hover, slight glow effect
- Glass cards: translateY(-8px) + shadow increase on hover
- Links: Smooth underline expansion
- All transitions: 300ms ease-in-out

**Performance**: Use `will-change: transform` sparingly, prefer `transform` and `opacity` for animations

---

## Images

**Hero Background**: 
- Large landscape image (1920x1080px minimum)
- Nature/eco theme: Forest, green landscape, sustainable technology
- Gradient overlay: linear-gradient(135deg, rgba(16, 185, 129, 0.3), transparent)

**Image Slider**:
- 4-5 rotating images showcasing products/services/features
- Consistent 16:9 or 21:9 aspect ratio
- Each with eco-green tinted overlay for brand consistency

**Section Images**:
- Feature icons: Simple line icons or glass-effect illustrations
- About section: Authentic photography, rounded corners
- Team/testimonial photos: Circular crops with subtle glass border

---

## Accessibility & Performance
- Maintain WCAG AA contrast ratios (4.5:1 for text)
- Focus states: Eco-green outline with 2px offset
- Keyboard navigation for all interactive elements
- Reduced motion media query support for animations
- Lazy load images below fold
- Optimize glassmorphism blur for performance (limit layers)

---

**Key Deliverable**: A visually stunning, eco-conscious landing page with smooth glassmorphism effects, professional multi-section layout, animated image carousel, and seamless theme switching—all optimized for modern browsers with minimal JavaScript complexity.