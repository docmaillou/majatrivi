/**
 * MAJATRIVI Luxury Header with Adaptive Logo System
 * Handles logo transformation, scroll behavior, and header interactions
 */

class MajatriviLuxuryHeader {
  constructor() {
    this.header = document.querySelector('.majatrivi-luxury-header');
    this.logoTransform = document.querySelector('[data-logo-transform]');
    this.searchModal = document.querySelector('.majatrivi-luxury-header__search-modal');
    this.mobileNav = document.querySelector('.majatrivi-luxury-header__mobile-nav');
    
    if (!this.header) return;

    this.scrollThreshold = 100;
    this.logoTransformThreshold = 150;
    this.isScrolling = false;
    this.lastScrollY = window.scrollY;
    
    this.init();
  }

  /**
   * Initialize all header functionality
   */
  init() {
    this.initScrollBehavior();
    this.initLogoAnimation();
    this.initSearchModal();
    this.initMobileNav();
    this.initDropdowns();
    this.initAccessibility();
    this.initPerformanceOptimizations();
  }

  /**
   * Initialize scroll-based header behavior
   */
  initScrollBehavior() {
    let ticking = false;

    const updateHeader = () => {
      const scrollY = window.scrollY;
      const scrollDirection = scrollY > this.lastScrollY ? 'down' : 'up';
      
      // Add scrolled class for styling
      if (scrollY > this.scrollThreshold) {
        this.header.classList.add('scrolled');
      } else {
        this.header.classList.remove('scrolled');
      }

      // Handle logo transformation
      this.handleLogoTransformation(scrollY);

      this.lastScrollY = scrollY;
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick, { passive: true });
    
    // Initial call
    updateHeader();
  }

  /**
   * Handle adaptive logo transformation
   */
  handleLogoTransformation(scrollY) {
    if (!this.logoTransform) return;

    const shouldShowMinimal = scrollY > this.logoTransformThreshold;
    const currentState = this.logoTransform.classList.contains('logo-minimal');

    if (shouldShowMinimal && !currentState) {
      this.transformToMinimal();
    } else if (!shouldShowMinimal && currentState) {
      this.transformToFull();
    }
  }

  /**
   * Transform logo to minimal state
   */
  transformToMinimal() {
    if (!this.logoTransform) return;
    
    this.logoTransform.classList.add('logo-minimal');
    
    // Trigger M symbol animation
    const mSymbol = this.logoTransform.querySelector('.majatrivi-m-symbol path');
    if (mSymbol) {
      mSymbol.style.animation = 'none';
      mSymbol.offsetHeight; // Trigger reflow
      mSymbol.style.animation = 'draw-m 1s cubic-bezier(0.4, 0, 0.2, 1) forwards';
    }

    // Add staggered letter animation for exit
    const letters = this.logoTransform.querySelectorAll('.majatrivi-logo-letter');
    letters.forEach((letter, index) => {
      letter.style.transitionDelay = `${index * 0.02}s`;
    });
  }

  /**
   * Transform logo to full state
   */
  transformToFull() {
    if (!this.logoTransform) return;
    
    this.logoTransform.classList.remove('logo-minimal');
    
    // Add staggered letter animation for entrance
    const letters = this.logoTransform.querySelectorAll('.majatrivi-logo-letter');
    letters.forEach((letter, index) => {
      letter.style.transitionDelay = `${index * 0.03}s`;
    });
    
    // Reset delays after animation
    setTimeout(() => {
      letters.forEach(letter => {
        letter.style.transitionDelay = '';
      });
    }, 600);
  }

  /**
   * Initialize logo hover animations
   */
  initLogoAnimation() {
    const logoLink = this.header.querySelector('.majatrivi-luxury-header__logo-link');
    if (!logoLink) return;

    let hoverTimeout;

    logoLink.addEventListener('mouseenter', () => {
      clearTimeout(hoverTimeout);
      
      // Animate letters on hover
      const letters = logoLink.querySelectorAll('.majatrivi-logo-letter');
      letters.forEach((letter, index) => {
        setTimeout(() => {
          letter.style.transform = 'translateY(-3px)';
        }, index * 30);
      });

      // Animate M symbol on hover
      const mSymbol = logoLink.querySelector('.majatrivi-m-symbol');
      if (mSymbol) {
        mSymbol.style.transform = 'scale(1.1) rotate(5deg)';
      }
    });

    logoLink.addEventListener('mouseleave', () => {
      hoverTimeout = setTimeout(() => {
        // Reset letter animations
        const letters = logoLink.querySelectorAll('.majatrivi-logo-letter');
        letters.forEach((letter, index) => {
          setTimeout(() => {
            letter.style.transform = '';
          }, index * 20);
        });

        // Reset M symbol
        const mSymbol = logoLink.querySelector('.majatrivi-m-symbol');
        if (mSymbol) {
          mSymbol.style.transform = '';
        }
      }, 100);
    });
  }

  /**
   * Initialize search modal functionality
   */
  initSearchModal() {
    const searchToggle = this.header.querySelector('.majatrivi-luxury-header__search-toggle');
    const searchClose = this.header.querySelector('.majatrivi-luxury-header__search-close');
    const searchInput = this.header.querySelector('.majatrivi-luxury-header__search-input');
    const searchBackdrop = this.header.querySelector('.majatrivi-luxury-header__search-backdrop');

    if (!searchToggle || !this.searchModal) return;

    // Open search modal
    const openSearch = () => {
      this.searchModal.setAttribute('aria-hidden', 'false');
      searchToggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      
      // Focus on search input after animation
      setTimeout(() => {
        if (searchInput) searchInput.focus();
      }, 300);
    };

    // Close search modal
    const closeSearch = () => {
      this.searchModal.setAttribute('aria-hidden', 'true');
      searchToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      searchToggle.focus();
    };

    // Event listeners
    searchToggle.addEventListener('click', openSearch);
    
    if (searchClose) {
      searchClose.addEventListener('click', closeSearch);
    }
    
    if (searchBackdrop) {
      searchBackdrop.addEventListener('click', closeSearch);
    }

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.searchModal.getAttribute('aria-hidden') === 'false') {
        closeSearch();
      }
    });

    // Enhanced search functionality
    if (searchInput) {
      this.initSearchEnhancements(searchInput);
    }
  }

  /**
   * Initialize search enhancements
   */
  initSearchEnhancements(searchInput) {
    let searchTimeout;
    
    // Real-time search suggestions (placeholder for future implementation)
    searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      const query = e.target.value.trim();
      
      if (query.length < 2) return;
      
      searchTimeout = setTimeout(() => {
        // Implement live search suggestions here
        console.log('Searching for:', query);
      }, 300);
    });
  }

  /**
   * Initialize mobile navigation
   */
  initMobileNav() {
    const mobileToggle = this.header.querySelector('.majatrivi-luxury-header__mobile-toggle');
    
    if (!mobileToggle || !this.mobileNav) return;

    // Toggle mobile nav
    const toggleMobileNav = () => {
      const isOpen = mobileToggle.getAttribute('aria-expanded') === 'true';
      
      mobileToggle.setAttribute('aria-expanded', !isOpen);
      this.mobileNav.setAttribute('aria-hidden', isOpen);
      document.body.style.overflow = isOpen ? '' : 'hidden';
      
      // Animate hamburger
      this.animateHamburger(!isOpen);
    };

    mobileToggle.addEventListener('click', toggleMobileNav);

    // Close mobile nav on window resize
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024) {
        mobileToggle.setAttribute('aria-expanded', 'false');
        this.mobileNav.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        this.animateHamburger(false);
      }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.mobileNav.getAttribute('aria-hidden') === 'false') {
        toggleMobileNav();
      }
    });
  }

  /**
   * Animate hamburger menu icon
   */
  animateHamburger(isOpen) {
    const hamburger = this.header.querySelector('.majatrivi-luxury-header__hamburger');
    if (!hamburger) return;

    const spans = hamburger.querySelectorAll('span');
    
    if (isOpen) {
      spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
    } else {
      spans.forEach(span => {
        span.style.transform = '';
        span.style.opacity = '';
      });
    }
  }

  /**
   * Initialize dropdown functionality
   */
  initDropdowns() {
    const dropdowns = this.header.querySelectorAll('.majatrivi-luxury-header__dropdown');
    
    dropdowns.forEach(dropdown => {
      const summary = dropdown.querySelector('summary');
      const content = dropdown.querySelector('.majatrivi-luxury-header__dropdown-content');
      
      if (!summary || !content) return;

      // Custom dropdown behavior
      summary.addEventListener('click', (e) => {
        e.preventDefault();
        
        const isOpen = dropdown.hasAttribute('open');
        
        // Close all other dropdowns
        dropdowns.forEach(otherDropdown => {
          if (otherDropdown !== dropdown) {
            otherDropdown.removeAttribute('open');
          }
        });
        
        // Toggle current dropdown
        if (isOpen) {
          dropdown.removeAttribute('open');
        } else {
          dropdown.setAttribute('open', '');
        }
      });

      // Close dropdown when clicking outside
      document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target)) {
          dropdown.removeAttribute('open');
        }
      });
    });
  }

  /**
   * Initialize accessibility features
   */
  initAccessibility() {
    // Skip to main content link
    this.addSkipToContent();
    
    // Keyboard navigation
    this.initKeyboardNavigation();
    
    // Screen reader announcements
    this.initScreenReaderSupport();
  }

  /**
   * Add skip to main content link
   */
  addSkipToContent() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'majatrivi-skip-link';
    skipLink.style.cssText = `
      position: absolute;
      top: -40px;
      left: 6px;
      background: white;
      color: black;
      padding: 8px;
      text-decoration: none;
      border-radius: 4px;
      z-index: 10000;
      transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', () => {
      skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
      skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
  }

  /**
   * Initialize keyboard navigation
   */
  initKeyboardNavigation() {
    const focusableElements = this.header.querySelectorAll(`
      a, button, input, [tabindex]:not([tabindex="-1"])
    `);

    focusableElements.forEach(element => {
      element.addEventListener('keydown', (e) => {
        // Enter or Space for buttons
        if ((e.key === 'Enter' || e.key === ' ') && element.tagName === 'BUTTON') {
          e.preventDefault();
          element.click();
        }
      });
    });
  }

  /**
   * Initialize screen reader support
   */
  initScreenReaderSupport() {
    // Announce logo state changes
    if (this.logoTransform) {
      const logoObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.attributeName === 'class') {
            const isMinimal = this.logoTransform.classList.contains('logo-minimal');
            const announcement = isMinimal ? 'Logo minimized' : 'Logo expanded';
            this.announceToScreenReader(announcement);
          }
        });
      });

      logoObserver.observe(this.logoTransform, { attributes: true });
    }
  }

  /**
   * Announce messages to screen readers
   */
  announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    announcement.style.width = '1px';
    announcement.style.height = '1px';
    announcement.style.overflow = 'hidden';
    
    document.body.appendChild(announcement);
    announcement.textContent = message;
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }

  /**
   * Initialize performance optimizations
   */
  initPerformanceOptimizations() {
    // Lazy load dropdown content
    this.lazyLoadDropdowns();
    
    // Optimize scroll listeners
    this.optimizeScrollPerformance();
    
    // Preload critical resources
    this.preloadResources();
  }

  /**
   * Lazy load dropdown content
   */
  lazyLoadDropdowns() {
    const dropdowns = this.header.querySelectorAll('.majatrivi-luxury-header__dropdown');
    
    dropdowns.forEach(dropdown => {
      const summary = dropdown.querySelector('summary');
      let loaded = false;
      
      summary.addEventListener('mouseenter', () => {
        if (!loaded) {
          // Preload any dropdown images or content
          const images = dropdown.querySelectorAll('img[data-src]');
          images.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          });
          loaded = true;
        }
      }, { once: true });
    });
  }

  /**
   * Optimize scroll performance
   */
  optimizeScrollPerformance() {
    // Use passive listeners where possible
    const passiveSupported = this.supportsPassive();
    
    if (passiveSupported) {
      // Already using passive listeners in scroll init
      console.log('Using passive scroll listeners for better performance');
    }
  }

  /**
   * Check if passive listeners are supported
   */
  supportsPassive() {
    let passiveSupported = false;
    try {
      const options = {
        get passive() {
          passiveSupported = true;
          return false;
        }
      };
      window.addEventListener('test', null, options);
      window.removeEventListener('test', null, options);
    } catch (err) {
      passiveSupported = false;
    }
    return passiveSupported;
  }

  /**
   * Preload critical resources
   */
  preloadResources() {
    // Preload fonts used in logo
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.as = 'font';
    fontLink.type = 'font/woff2';
    fontLink.crossOrigin = 'anonymous';
    // Add font URL when available
    
    // Preload critical images
    const logoImages = this.header.querySelectorAll('img[src*="logo"]');
    logoImages.forEach(img => {
      const preloadLink = document.createElement('link');
      preloadLink.rel = 'preload';
      preloadLink.as = 'image';
      preloadLink.href = img.src;
      document.head.appendChild(preloadLink);
    });
  }

  /**
   * Handle reduced motion preferences
   */
  handleReducedMotion() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
      // Disable complex animations
      this.header.classList.add('reduce-motion');
      
      // Simplify logo transformation
      if (this.logoTransform) {
        this.logoTransform.style.transition = 'none';
      }
    }
  }

  /**
   * Public method to manually trigger logo transformation
   */
  setLogoState(state) {
    if (state === 'minimal') {
      this.transformToMinimal();
    } else if (state === 'full') {
      this.transformToFull();
    }
  }

  /**
   * Public method to get current logo state
   */
  getLogoState() {
    return this.logoTransform?.classList.contains('logo-minimal') ? 'minimal' : 'full';
  }

  /**
   * Destroy instance and cleanup
   */
  destroy() {
    // Remove event listeners and clean up
    window.removeEventListener('scroll', this.scrollHandler);
    window.removeEventListener('resize', this.resizeHandler);
    
    // Reset body overflow
    document.body.style.overflow = '';
    
    // Reset logo state
    if (this.logoTransform) {
      this.logoTransform.classList.remove('logo-minimal');
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.majatriviHeader = new MajatriviLuxuryHeader();
});

// Export for external use
window.MajatriviLuxuryHeader = MajatriviLuxuryHeader;

// Handle page visibility changes for performance
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // Pause animations when page is hidden
    document.body.classList.add('page-hidden');
  } else {
    // Resume animations when page is visible
    document.body.classList.remove('page-hidden');
  }
});