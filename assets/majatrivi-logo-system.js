/**
 * MAJATRIVI Logo System - Adaptive Transformation
 * Transforms from full MAJATRIVI wordmark to clean M symbol on scroll
 */

class MajatriviLogoSystem {
  constructor() {
    this.header = null;
    this.scrollThreshold = 80;
    this.scrollThresholdMobile = 60;
    this.isScrolled = false;
    this.isInitialized = false;
    this.ticking = false;
    this.debugMode = false;
    
    // Performance optimization
    this.scrollHandler = this.throttle(this.handleScroll.bind(this), 16);
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', this.init.bind(this));
    } else {
      this.init();
    }
  }

  /**
   * Initialize the logo system
   */
  init() {
    try {
      // Enable debug mode if URL parameter is present
      this.debugMode = new URLSearchParams(window.location.search).has('debug');
      
      this.header = document.getElementById('majatrivi-luxury-header');
      
      if (!this.header) {
        if (this.debugMode) console.warn('MAJATRIVI Logo System: Header element not found');
        return;
      }

      this.setupEventListeners();
      this.handleScroll(); // Check initial scroll position
      this.isInitialized = true;
      
      if (this.debugMode) {
        console.log('✅ MAJATRIVI Logo System initialized successfully');
        this.logPerformanceMetrics();
      }
    } catch (error) {
      console.error('MAJATRIVI Logo System initialization failed:', error);
    }
  }

  /**
   * Set up event listeners
   */
  setupEventListeners() {
    // Scroll event with passive listener for better performance
    window.addEventListener('scroll', this.scrollHandler, { passive: true });
    
    // Handle window resize for responsive breakpoints
    window.addEventListener('resize', this.throttle(this.handleResize.bind(this), 250), { passive: true });
    
    // Handle visibility change for performance optimization
    document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));
    
    // Keyboard navigation support
    this.setupKeyboardNavigation();
  }

  /**
   * Handle scroll events with performance optimization
   */
  handleScroll() {
    if (!this.ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        const threshold = window.innerWidth <= 768 ? this.scrollThresholdMobile : this.scrollThreshold;
        const shouldBeScrolled = scrollY > threshold;

        if (shouldBeScrolled !== this.isScrolled) {
          this.isScrolled = shouldBeScrolled;
          this.updateHeaderState();
          
          if (this.debugMode) {
            console.log(`🔄 Logo state changed: ${this.isScrolled ? 'Minimal M' : 'Full MAJATRIVI'} at ${scrollY}px`);
          }
        }
        
        this.ticking = false;
      });
      
      this.ticking = true;
    }
  }

  /**
   * Update header visual state
   */
  updateHeaderState() {
    if (!this.header) return;

    if (this.isScrolled) {
      this.header.classList.add('scrolled');
      this.header.setAttribute('data-state', 'scrolled');
    } else {
      this.header.classList.remove('scrolled');
      this.header.setAttribute('data-state', 'default');
    }

    // Trigger custom event for other scripts to listen to
    const event = new CustomEvent('majatriviLogoChange', {
      detail: {
        isScrolled: this.isScrolled,
        state: this.isScrolled ? 'minimal' : 'full'
      }
    });
    document.dispatchEvent(event);
  }

  /**
   * Handle window resize
   */
  handleResize() {
    // Recalculate scroll position on resize
    this.handleScroll();
  }

  /**
   * Handle page visibility changes for performance
   */
  handleVisibilityChange() {
    if (document.hidden) {
      // Pause animations when page is not visible
      if (this.header) {
        this.header.style.animationPlayState = 'paused';
      }
    } else {
      // Resume animations when page becomes visible
      if (this.header) {
        this.header.style.animationPlayState = 'running';
        this.handleScroll(); // Re-check scroll position
      }
    }
  }

  /**
   * Set up keyboard navigation
   */
  setupKeyboardNavigation() {
    const logoLink = this.header?.querySelector('.majatrivi-luxury-header__logo-link');
    const navLinks = this.header?.querySelectorAll('.majatrivi-luxury-header__nav-link');
    const socialLinks = this.header?.querySelectorAll('.majatrivi-luxury-header__social-link');

    // Ensure proper focus management
    [logoLink, ...navLinks, ...socialLinks].forEach(link => {
      if (link) {
        link.addEventListener('focus', this.handleFocus.bind(this));
        link.addEventListener('blur', this.handleBlur.bind(this));
      }
    });
  }

  /**
   * Handle focus events
   */
  handleFocus(event) {
    event.target.style.outline = '2px solid rgba(212, 175, 55, 0.8)';
    event.target.style.outlineOffset = '2px';
  }

  /**
   * Handle blur events
   */
  handleBlur(event) {
    event.target.style.outline = '';
    event.target.style.outlineOffset = '';
  }

  /**
   * Throttle function for performance optimization
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
   * Performance metrics logging (debug mode only)
   */
  logPerformanceMetrics() {
    if (!this.debugMode) return;

    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.name.includes('majatrivi')) {
          console.log(`📊 Performance: ${entry.name} - ${entry.duration.toFixed(2)}ms`);
        }
      });
    });

    observer.observe({ entryTypes: ['measure', 'navigation'] });
  }

  /**
   * Cleanup method for proper memory management
   */
  destroy() {
    window.removeEventListener('scroll', this.scrollHandler);
    window.removeEventListener('resize', this.handleResize);
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    
    this.header = null;
    this.isInitialized = false;
    
    if (this.debugMode) {
      console.log('🧹 MAJATRIVI Logo System cleaned up');
    }
  }

  /**
   * Public API for manual state control
   */
  setMinimalState(force = false) {
    if (force || !this.isScrolled) {
      this.isScrolled = true;
      this.updateHeaderState();
    }
  }

  setFullState(force = false) {
    if (force || this.isScrolled) {
      this.isScrolled = false;
      this.updateHeaderState();
    }
  }

  /**
   * Get current logo state
   */
  getCurrentState() {
    return {
      isScrolled: this.isScrolled,
      state: this.isScrolled ? 'minimal' : 'full',
      threshold: window.innerWidth <= 768 ? this.scrollThresholdMobile : this.scrollThreshold,
      scrollPosition: window.pageYOffset || document.documentElement.scrollTop
    };
  }
}

// Initialize the logo system
const majatriviLogo = new MajatriviLogoSystem();

// Export for use in other scripts
window.MajatriviLogoSystem = MajatriviLogoSystem;
window.majatriviLogo = majatriviLogo;

// Handle reduced motion preferences
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.style.setProperty('--logo-transition', 'none');
  if (majatriviLogo.debugMode) {
    console.log('♿ Reduced motion detected - animations simplified');
  }
}