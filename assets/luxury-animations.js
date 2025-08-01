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
   * Handle reduced motion preferences
   */
  handleReducedMotion() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
      document.body.classList.add('reduce-motion');
      
      // Disable complex animations
      const animatedElements = document.querySelectorAll('[data-aos]');
      animatedElements.forEach(el => {
        el.classList.add('is-visible');
      });
    }
  }
}

// Initialize animations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new LuxuryAnimations();
});

// Export for use in other scripts
window.LuxuryAnimations = LuxuryAnimations;