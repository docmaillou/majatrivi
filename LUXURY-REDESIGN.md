# MAJATRIVI Luxury Homepage Redesign

## Overview

This project delivers a complete luxury homepage redesign for MAJATRIVI, a premium fashion brand. The new design features a modern, sophisticated aesthetic inspired by high-end fashion websites like Créature Atelier and Represent CLO.

## Design Features

### 🎥 Fullscreen Hero Video Section
- **File**: `sections/luxury-hero-video.liquid`
- Immersive fullscreen 4K video background
- Elegant typography with fade-in animations
- Call-to-action button with smooth hover effects
- Mobile-optimized with fallback image support
- Video autoplay with proper accessibility controls

### 🛍️ Luxury Product Showcase
- **File**: `sections/luxury-product-showcase.liquid`
- Two layout options: Standard Grid and Bento Grid (Editorial)
- Hover effects with image transitions
- Quick-add functionality
- Color swatch support
- Mobile-responsive design
- Proper Shopify product liquid templating

### 📖 Brand Story Section
- **File**: `sections/luxury-brand-story.liquid`
- Split-screen layout with text and imagery
- Image position flexibility (left/right)
- Elegant typography hierarchy
- Subtle animations and hover effects
- Mobile-first responsive design

### 🎨 Luxury Design System
- **File**: `assets/luxury-theme.css`
- Custom CSS variables for consistent styling
- Typography scale with clamp() for responsive sizing
- Luxury color palette (blacks, grays, whites, gold accents)
- Button styles with sophisticated hover effects
- Animation classes for scroll-triggered effects
- Accessibility-compliant focus states

### ⚡ Interactive Animations
- **File**: `assets/luxury-animations.js`
- Intersection Observer for scroll animations
- Smooth scrolling for anchor links
- Video optimization and controls
- Product card hover effects
- Parallax effects (optional)
- Performance-optimized animations

## Technical Implementation

### File Structure
```
/sections/
├── luxury-hero-video.liquid       # Fullscreen video hero
├── luxury-product-showcase.liquid # Product grid with hover effects  
└── luxury-brand-story.liquid      # Split-screen story section

/assets/
├── luxury-theme.css              # Core luxury styling
└── luxury-animations.js          # Interactive animations

/templates/
└── index.json                    # Updated homepage template

/snippets/
├── stylesheets.liquid            # Updated to include luxury CSS
└── scripts.liquid               # Updated to include luxury JS
```

### Homepage Structure (New)
1. **Luxury Hero Video** - Immersive fullscreen introduction
2. **Featured Product Showcase** - Bento grid layout highlighting key products
3. **Brand Story** - "Crafted with Passion" narrative section
4. **Bestsellers Showcase** - Standard grid showcasing popular items
5. **New Arrivals Story** - "Fall Collection 2024" promotional section

## Shopify Best Practices

### ✅ Liquid Templating
- Proper use of Shopify objects (`product`, `collection`, `settings`)
- Schema configuration for theme customization
- Conditional rendering for missing content
- Performance-optimized image handling with `image_url` filters

### ✅ Performance Optimization
- Lazy loading for images
- Optimized video handling with autoplay controls
- CSS and JS loaded efficiently
- Mobile-first responsive design
- Core Web Vitals compliance

### ✅ Accessibility
- WCAG 2.1 compliant color contrast
- Keyboard navigation support
- Screen reader friendly markup
- Reduced motion support for accessibility
- Proper focus states and ARIA labels

### ✅ Conversion Optimization
- Clear value propositions in hero section
- Strategic product placement with quick-add functionality  
- Trust-building brand story sections
- Multiple call-to-action points
- Mobile-optimized user experience

## Configuration Guide

### Hero Video Section Settings
```json
{
  "video_url": "URL to 4K MP4 video file",
  "fallback_image": "High-quality fallback image",
  "heading": "MAJATRIVI",
  "subheading": "Brand description text",
  "button_text": "Explore Collection", 
  "button_link": "/collections/all",
  "show_overlay": true,
  "overlay_opacity": 40
}
```

### Product Showcase Settings
```json
{
  "heading": "featured collection",
  "collection": "all",
  "products_to_show": 6,
  "layout_style": "bento", // or "standard"
  "show_description": false,
  "button_text": "View All Products",
  "button_link": "/collections/all"
}
```

### Brand Story Settings
```json
{
  "eyebrow": "Our Story", 
  "heading": "Crafted with Passion",
  "text_1": "Primary brand story text",
  "text_2": "Secondary supporting text",
  "button_text": "Learn More About Us",
  "button_link": "/pages/about",
  "image_position": "right" // or "left"
}
```

## Video Recommendations

For the hero section, use a high-quality fashion video with these specifications:
- **Resolution**: 1920x1080 minimum (4K preferred)
- **Format**: MP4 (H.264 codec)
- **Duration**: 15-30 seconds (looped)
- **File Size**: Under 10MB for web optimization
- **Content**: Fashion-focused, brand-appropriate footage

### Suggested Free Video Sources:
- Pexels.com (search: "luxury fashion", "clothing", "model")
- Unsplash.com (video section)
- Coverr.co (fashion category)

## Color Scheme

The luxury design uses a sophisticated palette:
- **Primary Black**: #0a0a0a
- **Charcoal**: #1a1a1a  
- **Gray**: #2d2d2d
- **Light Gray**: #f8f8f8
- **White**: #ffffff
- **Cream**: #fafafa
- **Gold Accent**: #d4af37

## Typography

- **Primary Font**: System font stack for performance
- **Heading Weights**: 200-400 (light to regular)
- **Body Weight**: 300-400
- **Letter Spacing**: Tight on headings (-0.03em to -0.01em)
- **Line Height**: 1.1-1.6 depending on text size

## Browser Support

- **Modern Browsers**: Chrome 88+, Firefox 85+, Safari 14+, Edge 88+
- **Mobile**: iOS Safari 14+, Chrome Mobile 88+
- **Fallbacks**: Graceful degradation for older browsers
- **JavaScript**: Progressive enhancement approach

## Performance Metrics

Target metrics for the redesigned homepage:
- **First Contentful Paint**: < 1.2s
- **Largest Contentful Paint**: < 2.5s  
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 3.5s
- **Mobile Page Speed**: 85+ on PageSpeed Insights

## Launch Checklist

### Pre-Launch
- [ ] Test all sections in Shopify theme editor
- [ ] Verify video loading and fallback images
- [ ] Test product showcase with actual product data
- [ ] Validate responsive design on all devices
- [ ] Check accessibility with screen reader
- [ ] Test performance with PageSpeed Insights
- [ ] Verify analytics tracking implementation

### Post-Launch  
- [ ] Monitor Core Web Vitals in Search Console
- [ ] A/B test hero video vs. static image
- [ ] Track conversion rates on product showcases
- [ ] Monitor video bandwidth usage
- [ ] Collect user feedback on new design
- [ ] Optimize based on real user metrics

## Support & Maintenance

### Regular Updates
- Update video content seasonally
- Refresh product showcases based on inventory
- Update brand story content for campaigns
- Monitor and optimize loading performance
- Test on new browser versions

### Troubleshooting
- If video doesn't load: Check file format and size
- If animations are choppy: Enable hardware acceleration
- If mobile layout breaks: Verify viewport meta tag
- If products don't display: Check collection settings

## Contact

For technical support or customization requests, refer to the Shopify development documentation or contact your development team.

---

**Note**: This luxury redesign focuses on creating a premium user experience that reflects the MAJATRIVI brand's commitment to quality and sophistication while maintaining excellent performance and accessibility standards.