/**
 * MAJATRIVI Luxury Animations - GitHub Repository Inspired
 * Advanced scroll animations with luxury timing and performance optimization
 */

class MajatriviLuxuryAnimations {
  constructor() {
    this.observer = null;
    this.isInitialized = false;
    this.debugMode = false;
    this.animatedElements = new Set();
    
    // Performance optimization
    this.throttledScrollHandler = this.throttle(this.handleScroll.bind(this), 16);
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', this.init.bind(this));
    } else {
      this.init();
    }
  }

  /**
   * Initialize the luxury animation system
   */
  init() {
    try {
      this.debugMode = new URLSearchParams(window.location.search).has('debug');
      
      this.initIntersectionObserver();
      this.initScrollAnimations();
      this.initLuxuryInteractions();
      this.isInitialized = true;
      
      if (this.debugMode) {
        console.log('✨ MAJATRIVI Luxury Animations initialized');
      }
    } catch (error) {
      console.error('MAJATRIVI Luxury Animations initialization failed:', error);
    }
  }

  /**
   * Initialize intersection observer with luxury timing
   */
  initIntersectionObserver() {
    if (!window.IntersectionObserver) return;

    this.observer = new IntersectionObserver(
      (entries) => this.handleIntersection(entries),
      {
        threshold: [0.1, 0.3, 0.7],
        rootMargin: '0px 0px -100px 0px'
      }
    );

    // Observe elements with luxury animation classes
    const animatedElements = document.querySelectorAll(`
      .luxury-fade-in-up,
      .luxury-reveal-mask,
      .luxury-stagger-children,
      [data-luxury-animation]
    `);

    animatedElements.forEach(el => {
      this.observer.observe(el);
    });
  }

  /**
   * Handle intersection with luxury animation patterns
   */
  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
        const animationType = entry.target.dataset.luxuryAnimation || this.getAnimationType(entry.target);
        
        this.triggerLuxuryAnimation(entry.target, animationType);
        this.animatedElements.add(entry.target);
        this.observer.unobserve(entry.target);
        
        if (this.debugMode) {
          console.log(`🎭 Luxury animation triggered: ${animationType}`, entry.target);
        }
      }
    });
  }

  /**
   * Get animation type from element classes
   */
  getAnimationType(element) {
    if (element.classList.contains('luxury-fade-in-up')) return 'fade-in-up';
    if (element.classList.contains('luxury-reveal-mask')) return 'reveal-mask';
    if (element.classList.contains('luxury-stagger-children')) return 'stagger-children';
    return 'fade-in';
  }

  /**
   * Trigger luxury animation based on type
   */
  triggerLuxuryAnimation(element, type) {
    switch(type) {
      case 'fade-in-up':
        this.animateFadeInUp(element);
        break;
      case 'reveal-mask':
        this.animateRevealMask(element);
        break;
      case 'stagger-children':
        this.animateStaggerChildren(element);
        break;
      case 'slide-in-left':
        this.animateSlideInLeft(element);
        break;
      case 'slide-in-right':
        this.animateSlideInRight(element);
        break;
      default:
        this.animateFadeIn(element);
    }
  }

  /**
   * Luxury fade in up animation
   */
  animateFadeInUp(element) {
    element.classList.add('is-visible');
  }

  /**
   * Luxury reveal mask animation
   */
  animateRevealMask(element) {
    element.style.animationPlayState = 'running';
  }

  /**
   * Luxury stagger children animation with refined timing
   */
  animateStaggerChildren(element) {
    const children = Array.from(element.children);
    
    children.forEach((child, index) => {
      setTimeout(() => {
        child.classList.add('is-visible');
        child.style.opacity = '1';
        child.style.transform = 'translateY(0)';
      }, index * 150); // Luxury timing - slower and more deliberate
    });

    element.classList.add('is-visible');
  }

  /**
   * Slide in from left with luxury easing
   */
  animateSlideInLeft(element) {
    element.style.opacity = '1';
    element.style.transform = 'translateX(0)';
    element.style.transition = 'all 1200ms cubic-bezier(0.25, 0.46, 0.45, 0.94)';
  }

  /**
   * Slide in from right with luxury easing
   */
  animateSlideInRight(element) {
    element.style.opacity = '1';
    element.style.transform = 'translateX(0)';
    element.style.transition = 'all 1200ms cubic-bezier(0.25, 0.46, 0.45, 0.94)';
  }

  /**
   * Basic fade in with luxury timing
   */
  animateFadeIn(element) {
    element.style.opacity = '1';
    element.style.transition = 'opacity 1200ms cubic-bezier(0.25, 0.46, 0.45, 0.94)';
  }

  /**
   * Initialize scroll-based animations
   */
  initScrollAnimations() {
    window.addEventListener('scroll', this.throttledScrollHandler, { passive: true });
  }

  /**
   * Handle scroll events for advanced effects
   */
  handleScroll() {
    const scrollY = window.pageYOffset;
    const windowHeight = window.innerHeight;
    
    // Parallax elements with luxury constraints
    const parallaxElements = document.querySelectorAll('[data-luxury-parallax]');
    parallaxElements.forEach(element => {
      const speed = parseFloat(element.dataset.luxuryParallax) || 0.3;
      const rect = element.getBoundingClientRect();
      
      if (rect.bottom >= 0 && rect.top <= windowHeight) {
        const yPos = -(scrollY * speed);
        element.style.transform = `translate3d(0, ${yPos}px, 0)`;
      }
    });

    // Opacity changes based on scroll
    const fadeElements = document.querySelectorAll('[data-luxury-fade]');
    fadeElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const elementCenter = rect.top + rect.height / 2;
      const windowCenter = windowHeight / 2;
      const distance = Math.abs(elementCenter - windowCenter);
      const maxDistance = windowHeight / 2;
      const opacity = Math.max(0.3, 1 - (distance / maxDistance));
      
      element.style.opacity = opacity;
    });
  }

  /**
   * Initialize luxury micro-interactions
   */
  initLuxuryInteractions() {
    // Enhanced hover effects for cards
    const luxuryCards = document.querySelectorAll('.luxury-card-premium');
    luxuryCards.forEach(card => {
      card.addEventListener('mouseenter', this.handleCardEnter.bind(this));
      card.addEventListener('mouseleave', this.handleCardLeave.bind(this));
    });

    // Button enhancement
    const luxuryButtons = document.querySelectorAll('.luxury-btn-premium');
    luxuryButtons.forEach(button => {
      button.addEventListener('mouseenter', this.handleButtonEnter.bind(this));
      button.addEventListener('mouseleave', this.handleButtonLeave.bind(this));
    });
  }

  /**
   * Handle card enter with luxury timing
   */
  handleCardEnter(event) {
    const card = event.currentTarget;
    card.style.willChange = 'transform';
    
    if (this.debugMode) {
      console.log('🎯 Luxury card hover enter');
    }
  }

  /**
   * Handle card leave
   */
  handleCardLeave(event) {
    const card = event.currentTarget;
    setTimeout(() => {
      card.style.willChange = 'auto';
    }, 600);
  }

  /**
   * Handle button enter
   */
  handleButtonEnter(event) {
    const button = event.currentTarget;
    button.style.willChange = 'transform';
  }

  /**
   * Handle button leave
   */
  handleButtonLeave(event) {
    const button = event.currentTarget;
    setTimeout(() => {
      button.style.willChange = 'auto';
    }, 600);
  }

  /**
   * Throttle function for performance
   */
  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  /**
   * Public API for manual animation triggering
   */
  triggerAnimation(element, type = 'fade-in') {
    if (element && !this.animatedElements.has(element)) {
      this.triggerLuxuryAnimation(element, type);
      this.animatedElements.add(element);
    }
  }

  /**
   * Reset animation state for an element
   */
  resetAnimation(element) {
    if (this.animatedElements.has(element)) {
      this.animatedElements.delete(element);
      element.classList.remove('is-visible');
      element.style.opacity = '';
      element.style.transform = '';
      element.style.transition = '';
    }
  }

  /**
   * Cleanup method
   */
  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
    
    window.removeEventListener('scroll', this.throttledScrollHandler);
    this.animatedElements.clear();
    this.isInitialized = false;
    
    if (this.debugMode) {
      console.log('🧹 MAJATRIVI Luxury Animations cleaned up');
    }
  }
}

// Initialize the luxury animation system
const majatriviLuxuryAnimations = new MajatriviLuxuryAnimations();

// Export for use in other scripts
window.MajatriviLuxuryAnimations = MajatriviLuxuryAnimations;
window.majatriviLuxuryAnimations = majatriviLuxuryAnimations;

// Handle reduced motion preferences
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  // Disable complex animations for accessibility
  const style = document.createElement('style');
  style.textContent = `
    .luxury-fade-in-up,
    .luxury-reveal-mask,
    .luxury-card-premium {
      transition-duration: 0.1s !important;
      animation-duration: 0.1s !important;
    }
  `;
  document.head.appendChild(style);
  
  if (majatriviLuxuryAnimations.debugMode) {
    console.log('♿ Reduced motion detected - luxury animations simplified');
  }
}