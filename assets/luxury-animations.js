/**
 * MAJATRIVI Luxury Theme Animations
 * Provides smooth scrolling, intersection observer animations, and luxury interactions
 */

class LuxuryAnimations {
  constructor() {
    this.initObserver();
    this.initSmoothScrolling();
    this.initParallaxEffects();
    this.initVideoControls();
    this.initLuxuryInteractions();
    this.initMajatriviHeader();
    this.initAdvancedScrollEffects();
    this.initSectionTransitions();
    this.initMajatriviAnimations();
    this.initTextRevealAnimations();
    this.initHeroEnhancements();
  }

  /**
   * Initialize Intersection Observer for scroll animations
   */
  initObserver() {
    if (!window.IntersectionObserver) return;

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          
          // Add staggered animations for child elements
          const children = entry.target.querySelectorAll('[data-aos]');
          children.forEach((child, index) => {
            setTimeout(() => {
              child.classList.add('is-visible');
            }, index * 100);
          });
        }
      });
    }, observerOptions);

    // Observe elements with animation classes
    const animatedElements = document.querySelectorAll(`
      .luxury-fade-in,
      .luxury-slide-in-left,
      .luxury-slide-in-right,
      .luxury-scale-in,
      [data-aos]
    `);

    animatedElements.forEach(el => {
      this.observer.observe(el);
    });
  }

  /**
   * Initialize smooth scrolling for anchor links
   */
  initSmoothScrolling() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          
          const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
          const targetPosition = target.offsetTop - headerHeight - 20;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });

    // Add scroll indicator functionality
    this.initScrollIndicator();
  }

  /**
   * Initialize scroll indicator
   */
  initScrollIndicator() {
    const scrollIndicators = document.querySelectorAll('.luxury-hero__scroll-indicator');
    
    scrollIndicators.forEach(indicator => {
      indicator.addEventListener('click', () => {
        const nextSection = indicator.closest('section').nextElementSibling;
        if (nextSection) {
          nextSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  /**
   * Initialize parallax effects
   */
  initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (parallaxElements.length > 0) {
      let ticking = false;

      const updateParallax = () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
          const rate = scrolled * -0.5;
          element.style.transform = `translateY(${rate}px)`;
        });
        
        ticking = false;
      };

      const requestTick = () => {
        if (!ticking) {
          requestAnimationFrame(updateParallax);
          ticking = true;
        }
      };

      window.addEventListener('scroll', requestTick, { passive: true });
    }
  }

  /**
   * Initialize video controls for hero sections
   */
  initVideoControls() {
    const heroVideos = document.querySelectorAll('.luxury-hero__video');
    
    heroVideos.forEach(video => {
      // Ensure video plays on page load
      video.addEventListener('loadeddata', () => {
        video.play().catch(e => {
          console.log('Video autoplay prevented:', e);
        });
      });

      // Pause video when out of view to save bandwidth
      const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            video.play().catch(e => console.log('Video play failed:', e));
          } else {
            video.pause();
          }
        });
      }, { threshold: 0.25 });

      videoObserver.observe(video);
    });
  }

  /**
   * Initialize luxury interaction effects
   */
  initLuxuryInteractions() {
    // Product card hover effects
    this.initProductCardEffects();
    
    // Button hover effects
    this.initButtonEffects();
    
    // Image zoom effects
    this.initImageZoomEffects();
    
    // Quick add functionality
    this.initQuickAddButtons();
  }

  /**
   * Initialize product card hover effects
   */
  initProductCardEffects() {
    const productCards = document.querySelectorAll('.luxury-showcase__product-card');
    
    productCards.forEach(card => {
      const quickAdd = card.querySelector('.luxury-showcase__quick-add');
      
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
        if (quickAdd) {
          quickAdd.style.transform = 'translateX(-50%) translateY(0)';
          quickAdd.style.opacity = '1';
        }
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        if (quickAdd) {
          quickAdd.style.transform = 'translateX(-50%) translateY(100%)';
          quickAdd.style.opacity = '0';
        }
      });
    });
  }

  /**
   * Initialize button hover effects
   */
  initButtonEffects() {
    const buttons = document.querySelectorAll('.luxury-btn, .luxury-hero__button, .luxury-showcase__view-all');
    
    buttons.forEach(button => {
      button.addEventListener('mouseenter', () => {
        const arrow = button.querySelector('svg');
        if (arrow) {
          arrow.style.transform = 'translateX(3px)';
        }
      });
      
      button.addEventListener('mouseleave', () => {
        const arrow = button.querySelector('svg');
        if (arrow) {
          arrow.style.transform = 'translateX(0)';
        }
      });
    });
  }

  /**
   * Initialize image zoom effects
   */
  initImageZoomEffects() {
    const zoomContainers = document.querySelectorAll('.luxury-image-zoom, .luxury-showcase__image-wrapper');
    
    zoomContainers.forEach(container => {
      const image = container.querySelector('img');
      
      if (image) {
        container.addEventListener('mouseenter', () => {
          image.style.transform = 'scale(1.05)';
        });
        
        container.addEventListener('mouseleave', () => {
          image.style.transform = 'scale(1)';
        });
      }
    });
  }

  /**
   * Initialize quick add buttons
   */
  initQuickAddButtons() {
    const quickAddButtons = document.querySelectorAll('.luxury-showcase__quick-add-btn');
    
    quickAddButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const productId = button.dataset.productId;
        if (productId) {
          this.handleQuickAdd(productId, button);
        }
      });
    });
  }

  /**
   * Handle quick add functionality
   */
  handleQuickAdd(productId, button) {
    const originalText = button.innerHTML;
    button.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/><path d="m9 12 2 2 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>Adding...';
    button.disabled = true;

    // Simulate API call (replace with actual Shopify cart API)
    setTimeout(() => {
      button.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/><path d="m9 12 2 2 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>Added!';
      
      setTimeout(() => {
        button.innerHTML = originalText;
        button.disabled = false;
      }, 2000);
    }, 1000);
  }

  /**
   * Initialize scroll-triggered counter animations
   */
  initCounterAnimations() {
    const counters = document.querySelectorAll('[data-counter]');
    
    counters.forEach(counter => {
      const target = parseInt(counter.dataset.counter);
      const duration = parseInt(counter.dataset.duration) || 2000;
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.animateCounter(counter, target, duration);
            observer.unobserve(counter);
          }
        });
      });
      
      observer.observe(counter);
    });
  }

  /**
   * Animate counter numbers
   */
  animateCounter(element, target, duration) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      element.textContent = Math.floor(start);
      
      if (start >= target) {
        element.textContent = target;
        clearInterval(timer);
      }
    }, 16);
  }

  /**
   * Add loading states for better UX
   */
  initLoadingStates() {
    // Add loading class to body until page is fully loaded
    document.body.classList.add('loading');
    
    window.addEventListener('load', () => {
      document.body.classList.remove('loading');
      document.body.classList.add('loaded');
      
      // Trigger entrance animations
      setTimeout(() => {
        document.body.classList.add('animations-ready');
      }, 100);
    });
  }

  /**
   * Initialize MAJATRIVI header interactions
   */
  initMajatriviHeader() {
    const header = document.querySelector('.majatrivi-header');
    if (!header) return;

    // Mobile menu toggle
    const mobileToggle = header.querySelector('.majatrivi-header__mobile-toggle');
    const mobileNav = header.querySelector('.majatrivi-header__mobile-nav');
    
    if (mobileToggle && mobileNav) {
      mobileToggle.addEventListener('click', () => {
        const isOpen = mobileToggle.getAttribute('aria-expanded') === 'true';
        mobileToggle.setAttribute('aria-expanded', !isOpen);
        mobileNav.setAttribute('aria-hidden', isOpen);
        document.body.style.overflow = isOpen ? '' : 'hidden';
      });
    }

    // Search modal toggle
    const searchToggle = header.querySelector('.majatrivi-header__search-toggle');
    const searchModal = header.querySelector('.majatrivi-header__search-modal');
    const searchClose = header.querySelector('.majatrivi-header__search-close');
    
    if (searchToggle && searchModal) {
      searchToggle.addEventListener('click', () => {
        searchModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        // Focus on search input
        const searchInput = searchModal.querySelector('.majatrivi-header__search-input');
        if (searchInput) {
          setTimeout(() => searchInput.focus(), 100);
        }
      });
    }

    if (searchClose && searchModal) {
      searchClose.addEventListener('click', () => {
        searchModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      });
    }

    // Close modals on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (mobileNav && mobileNav.getAttribute('aria-hidden') === 'false') {
          mobileToggle.setAttribute('aria-expanded', 'false');
          mobileNav.setAttribute('aria-hidden', 'true');
          document.body.style.overflow = '';
        }
        if (searchModal && searchModal.getAttribute('aria-hidden') === 'false') {
          searchModal.setAttribute('aria-hidden', 'true');
          document.body.style.overflow = '';
        }
      }
    });

    // Header scroll behavior
    this.initHeaderScrollBehavior(header);
  }

  /**
   * Initialize header scroll behavior
   */
  initHeaderScrollBehavior(header) {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateHeader = () => {
      const scrollY = window.scrollY;
      
      // Add scrolled class when scrolled
      if (scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      lastScrollY = scrollY;
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick, { passive: true });
  }

  /**
   * Initialize advanced scroll effects
   */
  initAdvancedScrollEffects() {
    const parallaxElements = document.querySelectorAll('.majatrivi-parallax-slow, .majatrivi-parallax-medium, .majatrivi-parallax-fast');
    
    if (parallaxElements.length === 0) return;

    let ticking = false;

    const updateParallax = () => {
      const scrollY = window.pageYOffset;
      
      parallaxElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + scrollY;
        const elementHeight = rect.height;
        const windowHeight = window.innerHeight;
        
        // Only apply parallax when element is in viewport
        if (rect.bottom >= 0 && rect.top <= windowHeight) {
          const scrollOffset = scrollY - elementTop + windowHeight;
          element.style.setProperty('--scroll-offset', `${scrollOffset}px`);
        }
      });
      
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick, { passive: true });
  }

  /**
   * Initialize section transitions
   */
  initSectionTransitions() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          
          // Handle staggered children
          if (entry.target.classList.contains('majatrivi-stagger-children')) {
            const children = entry.target.children;
            Array.from(children).forEach((child, index) => {
              setTimeout(() => {
                child.style.opacity = '1';
                child.style.transform = 'translateY(0)';
              }, index * 100);
            });
          }

          // Handle reveal text
          const revealTexts = entry.target.querySelectorAll('.majatrivi-reveal-text');
          revealTexts.forEach((text, index) => {
            setTimeout(() => {
              text.classList.add('is-visible');
            }, index * 150);
          });
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    // Observe elements with transition classes
    const transitionElements = document.querySelectorAll(`
      .majatrivi-section-transition,
      .majatrivi-stagger-children,
      .majatrivi-reveal
    `);

    transitionElements.forEach(el => {
      observer.observe(el);
    });
  }

  /**
   * Enhanced smooth scrolling with easing
   */
  smoothScrollTo(target, duration = 1000) {
    const targetPosition = target.offsetTop - (document.querySelector('.majatrivi-header')?.offsetHeight || 0);
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    const easeInOutQuart = (t) => {
      return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
    };

    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const eased = easeInOutQuart(progress);
      
      window.scrollTo(0, startPosition + distance * eased);
      
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  }

  /**
   * Initialize MAJATRIVI specific animations
   */
  initMajatriviAnimations() {
    // Add flowing background to hero sections
    this.addFlowingBackgrounds();
    
    // Initialize floating elements
    this.initFloatingElements();
    
    // Add section flow animations
    this.addSectionFlowAnimations();
  }

  /**
   * Add flowing backgrounds to sections (skip if already exists in section)
   */
  addFlowingBackgrounds() {
    const heroSections = document.querySelectorAll('.luxury-hero:not(.majatrivi-hero)');
    
    heroSections.forEach(section => {
      if (!section.querySelector('.majatrivi-flowing-bg') && !section.querySelector('.majatrivi-hero__flowing-bg')) {
        const flowingBg = document.createElement('div');
        flowingBg.className = 'majatrivi-flowing-bg';
        section.appendChild(flowingBg);
        section.classList.add('majatrivi-hero-enhanced');
      }
    });
  }

  /**
   * Initialize floating elements
   */
  initFloatingElements() {
    const floatingElements = document.querySelectorAll('[data-float]');
    
    floatingElements.forEach(element => {
      const speed = element.dataset.float || 'normal';
      element.classList.add('majatrivi-floating-element');
      
      if (speed === 'slow') {
        element.classList.add('majatrivi-floating-element--slow');
      } else if (speed === 'fast') {
        element.classList.add('majatrivi-floating-element--fast');
      }
    });
  }

  /**
   * Add section flow animations
   */
  addSectionFlowAnimations() {
    const sections = document.querySelectorAll('section, .section');
    
    sections.forEach((section, index) => {
      if (index > 0 && !section.classList.contains('no-flow')) {
        section.classList.add('majatrivi-section-flow');
      }
    });
  }

  /**
   * Initialize text reveal animations
   */
  initTextRevealAnimations() {
    const textElements = document.querySelectorAll('[data-text-reveal]');
    
    textElements.forEach(element => {
      this.wrapTextLines(element);
      element.classList.add('majatrivi-text-reveal');
    });

    // Observe text reveal elements
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '0px 0px -100px 0px'
    });

    textElements.forEach(el => observer.observe(el));
  }

  /**
   * Wrap text lines for reveal animation
   */
  wrapTextLines(element) {
    const text = element.textContent;
    const words = text.split(' ');
    const wordsPerLine = Math.ceil(words.length / 3); // Approximate 3 lines
    
    element.innerHTML = '';
    
    for (let i = 0; i < words.length; i += wordsPerLine) {
      const line = words.slice(i, i + wordsPerLine).join(' ');
      const lineSpan = document.createElement('span');
      lineSpan.className = 'reveal-line';
      lineSpan.textContent = line;
      element.appendChild(lineSpan);
      
      if (i + wordsPerLine < words.length) {
        element.appendChild(document.createElement('br'));
      }
    }
  }

  /**
   * Initialize hero enhancements
   */
  initHeroEnhancements() {
    // Enhanced button interactions
    this.enhanceHeroButtons();
    
    // Add scroll indicators
    this.addScrollIndicators();
    
    // Initialize mouse parallax for hero elements
    this.initMouseParallax();
  }

  /**
   * Enhance hero buttons with MAJATRIVI styling (skip if already styled)
   */
  enhanceHeroButtons() {
    const heroButtons = document.querySelectorAll('.luxury-hero__button:not(.majatrivi-hero__cta), [data-hero-button]:not(.majatrivi-hero__cta)');
    
    heroButtons.forEach(button => {
      if (!button.classList.contains('majatrivi-hero-btn')) {
        button.classList.add('majatrivi-hero-btn');
        
        // Add arrow if it doesn't exist
        if (!button.querySelector('.btn-arrow') && !button.querySelector('svg')) {
          const arrow = document.createElement('span');
          arrow.className = 'btn-arrow';
          arrow.innerHTML = '→';
          button.appendChild(arrow);
        }
      }
    });
  }

  /**
   * Add scroll indicators to hero sections (disabled for clean design)
   */
  addScrollIndicators() {
    // Disabled for clean, minimal design - no scroll indicators needed
    return;
  }

  /**
   * Initialize mouse parallax for hero elements
   */
  initMouseParallax() {
    const parallaxElements = document.querySelectorAll('[data-mouse-parallax]');
    
    if (parallaxElements.length === 0) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let ticking = false;

    const updateMouseParallax = () => {
      parallaxElements.forEach(element => {
        const speed = parseFloat(element.dataset.mouseParallax) || 0.1;
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = (mouseX - centerX) * speed;
        const deltaY = (mouseY - centerY) * speed;
        
        element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
      });
      
      ticking = false;
    };

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      if (!ticking) {
        requestAnimationFrame(updateMouseParallax);
        ticking = true;
      }
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
  }

  /**
   * Handle reduced motion preferences
   */
  handleReducedMotion() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
      document.body.classList.add('reduce-motion');
      
      // Disable complex animations
      const animatedElements = document.querySelectorAll('[data-aos], .majatrivi-section-transition, .majatrivi-reveal-text');
      animatedElements.forEach(el => {
        el.classList.add('is-visible');
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
    }
  }
}

// Performance optimization for animations
class PerformanceOptimizer {
  constructor() {
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.isLowEndDevice = this.detectLowEndDevice();
    this.initPerformanceOptimizations();
  }

  detectLowEndDevice() {
    // Simple heuristic for low-end devices
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const deviceMemory = navigator.deviceMemory;
    const hardwareConcurrency = navigator.hardwareConcurrency;
    
    if (deviceMemory && deviceMemory < 4) return true;
    if (hardwareConcurrency && hardwareConcurrency < 4) return true;
    if (connection && connection.effectiveType && ['slow-2g', '2g', '3g'].includes(connection.effectiveType)) return true;
    
    return false;
  }

  initPerformanceOptimizations() {
    if (this.prefersReducedMotion || this.isLowEndDevice) {
      document.body.classList.add('reduce-animations');
      
      // Simplify animations for better performance
      const style = document.createElement('style');
      style.textContent = `
        .reduce-animations .majatrivi-flowing-bg::before,
        .reduce-animations .majatrivi-flowing-bg::after,
        .reduce-animations .majatrivi-hero-enhanced::before,
        .reduce-animations .majatrivi-section-flow::before {
          animation-duration: 0.1s !important;
          animation-iteration-count: 1 !important;
        }
        
        .reduce-animations .majatrivi-floating-element {
          animation: none !important;
        }
      `;
      document.head.appendChild(style);
    }
  }
}

// Initialize animations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize performance optimizer first
  new PerformanceOptimizer();
  
  // Then initialize animations
  new LuxuryAnimations();
});

// Export for use in other scripts
window.LuxuryAnimations = LuxuryAnimations;
window.PerformanceOptimizer = PerformanceOptimizer;