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
    this.initWhimsyElements();
    this.initMagicalInteractions();
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
    const heroVideos = document.querySelectorAll('.luxury-hero__video, .majatrivi-hero__video');
    
    heroVideos.forEach(video => {
      // Ensure video plays on page load
      video.addEventListener('loadeddata', () => {
        video.classList.add('loaded');
        video.play().catch(e => {
          console.log('Video autoplay prevented:', e);
        });
      });

      // Better loading experience
      video.addEventListener('canplay', () => {
        video.classList.add('loaded');
      });

      // Handle video interaction overlay for MAJATRIVI videos
      const videoOverlay = video.parentElement?.querySelector('.majatrivi-hero__video-overlay');
      if (videoOverlay) {
        this.initMajatriviVideoControls(video, videoOverlay);
      }

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
   * Initialize MAJATRIVI video controls
   */
  initMajatriviVideoControls(video, overlay) {
    let isPlaying = true;
    const playIcon = overlay.querySelector('.play-icon');
    const pauseIcon = overlay.querySelector('.pause-icon');
    
    // Set initial state
    playIcon.style.display = 'none';
    pauseIcon.style.display = 'block';
    overlay.style.opacity = '0';
    
    // Show/hide overlay on hover
    const heroSection = video.closest('.majatrivi-hero');
    if (heroSection) {
      heroSection.addEventListener('mouseenter', () => {
        overlay.style.opacity = '1';
      });
      
      heroSection.addEventListener('mouseleave', () => {
        if (isPlaying) {
          overlay.style.opacity = '0';
        }
      });
    }
    
    // Toggle play/pause on click
    overlay.addEventListener('click', (e) => {
      e.stopPropagation();
      
      if (isPlaying) {
        video.pause();
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
        overlay.style.opacity = '1';
      } else {
        video.play();
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
        overlay.style.opacity = '0';
      }
      
      isPlaying = !isPlaying;
    });
    
    // Handle video events
    video.addEventListener('play', () => {
      isPlaying = true;
      playIcon.style.display = 'none';
      pauseIcon.style.display = 'block';
    });
    
    video.addEventListener('pause', () => {
      isPlaying = false;
      playIcon.style.display = 'block';
      pauseIcon.style.display = 'none';
      overlay.style.opacity = '1';
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

      // Handle logo transformation for MAJATRIVI header
      const logoTransform = header.querySelector('[data-logo-transform]');
      if (logoTransform) {
        if (scrollY > 100) {
          logoTransform.classList.add('logo-minimal');
        } else {
          logoTransform.classList.remove('logo-minimal');
        }
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
   * Initialize whimsy elements for delightful interactions
   */
  initWhimsyElements() {
    this.initCursorGlow();
    this.initVideoMagic();
    this.initLoadingDelight();
    this.initScrollHintMagic();
  }

  /**
   * Initialize magical cursor glow effect
   */
  initCursorGlow() {
    const heroSections = document.querySelectorAll('[data-whimsy-hero]');
    
    heroSections.forEach(hero => {
      const cursorGlow = hero.querySelector('[data-cursor-glow]');
      if (!cursorGlow) return;
      
      let isInside = false;
      let animationFrame = null;
      
      const updateGlow = (e) => {
        if (animationFrame) return;
        
        animationFrame = requestAnimationFrame(() => {
          const rect = hero.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          cursorGlow.style.left = x + 'px';
          cursorGlow.style.top = y + 'px';
          
          // Add subtle scaling based on movement speed
          const speed = Math.sqrt(e.movementX ** 2 + e.movementY ** 2);
          const scale = Math.min(1.5, 1 + speed * 0.01);
          cursorGlow.style.transform = `translate(-50%, -50%) scale(${scale})`;
          
          animationFrame = null;
        });
      };
      
      hero.addEventListener('mouseenter', () => {
        isInside = true;
        cursorGlow.style.opacity = '1';
      });
      
      hero.addEventListener('mouseleave', () => {
        isInside = false;
        cursorGlow.style.opacity = '0';
      });
      
      hero.addEventListener('mousemove', updateGlow);
    });
  }

  /**
   * Initialize video magic interactions
   */
  initVideoMagic() {
    const videoControls = document.querySelectorAll('[data-video-control]');
    
    videoControls.forEach(control => {
      const video = control.closest('.majatrivi-hero__media').querySelector('video');
      if (!video) return;
      
      let isPlaying = false;
      
      // Update play/pause state
      const updatePlayState = () => {
        if (video.paused) {
          control.classList.remove('video-playing');
          isPlaying = false;
        } else {
          control.classList.add('video-playing');
          isPlaying = true;
        }
      };
      
      // Video event listeners
      video.addEventListener('play', updatePlayState);
      video.addEventListener('pause', updatePlayState);
      
      // Control click interaction
      control.addEventListener('click', (e) => {
        e.stopPropagation();
        
        if (isPlaying) {
          video.pause();
          this.createRippleEffect(e.target, e);
        } else {
          video.play().catch(() => {});
          this.createSparkleEffect(e.target, e);
        }
      });
      
      // Initial state
      updatePlayState();
    });
  }

  /**
   * Initialize loading delight animations
   */
  initLoadingDelight() {
    const loadingElements = document.querySelectorAll('[data-hero-loading]');
    
    loadingElements.forEach(loading => {
      const hero = loading.closest('[data-whimsy-hero]');
      const video = hero?.querySelector('video');
      
      if (!video) {
        loading.classList.add('hidden');
        return;
      }
      
      // Show loading initially
      loading.classList.remove('hidden');
      
      // Array of delightful loading messages
      const loadingMessages = [
        'Preparing magic...',
        'Crafting beauty...',
        'Almost ready...',
        'One moment...'
      ];
      
      const loadingText = loading.querySelector('.majatrivi-hero__loading-text');
      let messageIndex = 0;
      
      // Cycle through messages
      const messageInterval = setInterval(() => {
        if (loadingText) {
          loadingText.style.opacity = '0';
          setTimeout(() => {
            messageIndex = (messageIndex + 1) % loadingMessages.length;
            loadingText.textContent = loadingMessages[messageIndex];
            loadingText.style.opacity = '0.8';
          }, 300);
        }
      }, 2000);
      
      // Hide loading when video is ready
      const hideLoading = () => {
        clearInterval(messageInterval);
        loading.classList.add('hidden');
        
        // Add a delightful entrance for the content
        setTimeout(() => {
          const content = hero.querySelector('.majatrivi-hero__content');
          if (content) {
            content.style.animation = 'majatrivi-content-entrance 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
          }
        }, 300);
      };
      
      if (video.readyState >= 2) {
        hideLoading();
      } else {
        video.addEventListener('loadeddata', hideLoading, { once: true });
        video.addEventListener('canplaythrough', hideLoading, { once: true });
        
        // Fallback timeout
        setTimeout(hideLoading, 5000);
      }
    });
  }

  /**
   * Initialize scroll hint magic
   */
  initScrollHintMagic() {
    const scrollHints = document.querySelectorAll('[data-scroll-hint]');
    
    scrollHints.forEach(hint => {
      hint.addEventListener('click', () => {
        this.createSparkleEffect(hint);
        
        // Smooth scroll to next section
        const nextSection = hint.closest('section').nextElementSibling;
        if (nextSection) {
          this.smoothScrollTo(nextSection, 1500);
        }
      });
      
      // Hide scroll hint when user starts scrolling
      let scrollTimeout;
      const handleScroll = () => {
        hint.style.opacity = '0.3';
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          if (window.scrollY < 100) {
            hint.style.opacity = '0.7';
          }
        }, 1000);
      };
      
      window.addEventListener('scroll', handleScroll, { passive: true });
    });
  }

  /**
   * Initialize magical interactions
   */
  initMagicalInteractions() {
    this.initMagneticButtons();
    this.initParticleEffects();
    this.initDelightfulHovers();
  }

  /**
   * Initialize magnetic button effects
   */
  initMagneticButtons() {
    const magneticButtons = document.querySelectorAll('[data-magnetic-btn]');
    
    magneticButtons.forEach(button => {
      const strength = 0.3;
      let isHovering = false;
      
      button.addEventListener('mouseenter', () => {
        isHovering = true;
        button.style.transition = 'transform 0.1s ease-out';
      });
      
      button.addEventListener('mouseleave', () => {
        isHovering = false;
        button.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        button.style.transform = 'translateY(-2px) scale(1.02)';
      });
      
      button.addEventListener('mousemove', (e) => {
        if (!isHovering) return;
        
        const rect = button.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = (e.clientX - centerX) * strength;
        const deltaY = (e.clientY - centerY) * strength;
        
        button.style.transform = `translateY(${-2 + deltaY}px) translateX(${deltaX}px) scale(1.02)`;
      });
      
      // Add click effect
      button.addEventListener('click', (e) => {
        this.createBurstEffect(button, e);
      });
    });
  }

  /**
   * Initialize particle effects
   */
  initParticleEffects() {
    const particleContainers = document.querySelectorAll('[data-particles]');
    
    particleContainers.forEach(container => {
      this.createFloatingParticles(container);
    });
  }

  /**
   * Create floating particles
   */
  createFloatingParticles(container) {
    const particleCount = window.innerWidth < 768 ? 3 : 6;
    
    for (let i = 0; i < particleCount; i++) {
      setTimeout(() => {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        
        // Random positioning
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = Math.random() * 3 + 1;
        const duration = Math.random() * 10 + 8;
        const delay = Math.random() * 5;
        
        particle.style.cssText = `
          position: absolute;
          left: ${x}%;
          top: ${y}%;
          width: ${size}px;
          height: ${size}px;
          background: radial-gradient(circle, rgba(212, 175, 55, 0.6) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
          animation: particle-drift ${duration}s infinite ease-in-out;
          animation-delay: ${delay}s;
          z-index: 1;
        `;
        
        container.appendChild(particle);
        
        // Remove particle after animation cycle
        setTimeout(() => {
          if (particle.parentNode) {
            particle.remove();
          }
        }, (duration + delay) * 1000);
      }, i * 1000);
    }
    
    // Recreate particles periodically
    setTimeout(() => {
      if (container.parentNode) {
        this.createFloatingParticles(container);
      }
    }, 15000);
  }

  /**
   * Create ripple effect
   */
  createRippleEffect(element, event) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
      position: absolute;
      left: ${x}px;
      top: ${y}px;
      width: ${size}px;
      height: ${size}px;
      background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple-expand 0.6s ease-out;
      pointer-events: none;
      z-index: 1000;
    `;
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  }

  /**
   * Create sparkle effect
   */
  createSparkleEffect(element, event) {
    const sparkleCount = 5;
    const rect = element.getBoundingClientRect();
    
    for (let i = 0; i < sparkleCount; i++) {
      const sparkle = document.createElement('div');
      const x = event ? event.clientX - rect.left : rect.width / 2;
      const y = event ? event.clientY - rect.top : rect.height / 2;
      
      sparkle.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        width: 4px;
        height: 4px;
        background: rgba(212, 175, 55, 0.9);
        border-radius: 50%;
        transform: scale(0);
        animation: sparkle-burst 0.8s ease-out ${i * 0.1}s;
        pointer-events: none;
        z-index: 1000;
      `;
      
      element.style.position = 'relative';
      element.appendChild(sparkle);
      
      setTimeout(() => sparkle.remove(), 800 + i * 100);
    }
  }

  /**
   * Create burst effect
   */
  createBurstEffect(element, event) {
    const burstCount = 8;
    const rect = element.getBoundingClientRect();
    const centerX = event.clientX - rect.left;
    const centerY = event.clientY - rect.top;
    
    for (let i = 0; i < burstCount; i++) {
      const particle = document.createElement('div');
      const angle = (i / burstCount) * Math.PI * 2;
      const distance = 30 + Math.random() * 20;
      const size = Math.random() * 3 + 2;
      
      particle.style.cssText = `
        position: absolute;
        left: ${centerX}px;
        top: ${centerY}px;
        width: ${size}px;
        height: ${size}px;
        background: rgba(212, 175, 55, 0.8);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        animation: burst-particle 0.6s ease-out;
        pointer-events: none;
        z-index: 1000;
        --angle: ${angle}rad;
        --distance: ${distance}px;
      `;
      
      element.style.position = 'relative';
      element.appendChild(particle);
      
      setTimeout(() => particle.remove(), 600);
    }
  }

  /**
   * Initialize delightful hovers
   */
  initDelightfulHovers() {
    // Add subtle breathing to hero elements
    const heroElements = document.querySelectorAll('.majatrivi-hero__title, .majatrivi-hero__subtitle');
    
    heroElements.forEach(element => {
      let hoverTimeout;
      
      element.addEventListener('mouseenter', () => {
        element.style.transition = 'transform 0.3s ease';
        element.style.transform = 'scale(1.02)';
        
        // Add subtle glow
        element.style.textShadow = '0 0 20px rgba(212, 175, 55, 0.3)';
      });
      
      element.addEventListener('mouseleave', () => {
        element.style.transform = 'scale(1)';
        element.style.textShadow = 'none';
      });
    });
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

// Add magical CSS animations dynamically
const magicalStyles = document.createElement('style');
magicalStyles.textContent = `
  @keyframes particle-drift {
    0%, 100% {
      transform: translateY(0px) translateX(0px) scale(1) rotate(0deg);
      opacity: 0.6;
    }
    25% {
      transform: translateY(-20px) translateX(10px) scale(1.2) rotate(90deg);
      opacity: 1;
    }
    50% {
      transform: translateY(-5px) translateX(-15px) scale(0.8) rotate(180deg);
      opacity: 0.8;
    }
    75% {
      transform: translateY(-30px) translateX(5px) scale(1.1) rotate(270deg);
      opacity: 0.9;
    }
  }
  
  @keyframes ripple-expand {
    0% {
      transform: scale(0);
      opacity: 0.7;
    }
    100% {
      transform: scale(1);
      opacity: 0;
    }
  }
  
  @keyframes sparkle-burst {
    0% {
      transform: scale(0) rotate(0deg);
      opacity: 1;
    }
    100% {
      transform: scale(1) rotate(180deg) translate(20px, -20px);
      opacity: 0;
    }
  }
  
  @keyframes burst-particle {
    0% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }
    100% {
      transform: translate(-50%, -50%) 
                 translate(
                   calc(cos(var(--angle)) * var(--distance)),
                   calc(sin(var(--angle)) * var(--distance))
                 ) 
                 scale(0);
      opacity: 0;
    }
  }
  
  @keyframes majatrivi-content-entrance {
    0% {
      opacity: 0;
      transform: translateY(30px) scale(0.95);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`;
document.head.appendChild(magicalStyles);

// Initialize animations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize performance optimizer first
  new PerformanceOptimizer();
  
  // Then initialize animations
  new LuxuryAnimations();
});

// Add intersection observer for magical entrance effects
const magicalObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('magical-entrance');
      
      // Add sparkle effect for special elements
      if (entry.target.hasAttribute('data-sparkle-entrance')) {
        setTimeout(() => {
          const sparkles = 3;
          for (let i = 0; i < sparkles; i++) {
            setTimeout(() => {
              const sparkle = document.createElement('div');
              sparkle.style.cssText = `
                position: absolute;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                width: 4px;
                height: 4px;
                background: rgba(212, 175, 55, 0.8);
                border-radius: 50%;
                animation: sparkle-entrance 1s ease-out;
                pointer-events: none;
                z-index: 10;
              `;
              entry.target.style.position = 'relative';
              entry.target.appendChild(sparkle);
              setTimeout(() => sparkle.remove(), 1000);
            }, i * 200);
          }
        }, 500);
      }
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
});

// Observe magical elements
document.addEventListener('DOMContentLoaded', () => {
  const magicalElements = document.querySelectorAll('.majatrivi-hero, [data-whimsy-hero]');
  magicalElements.forEach(el => magicalObserver.observe(el));
});

// Export for use in other scripts
window.LuxuryAnimations = LuxuryAnimations;
window.PerformanceOptimizer = PerformanceOptimizer;