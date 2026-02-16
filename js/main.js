'use strict';

document.addEventListener('DOMContentLoaded', function initApp() {

  // ==========================================================================
  // CONFIGURATION
  // ==========================================================================

  const CONFIG = {
    navbarOffset: 80,             // Hauteur de la navbar fixe (px)
    scrolledThreshold: 50,        // Seuil pour ajouter .scrolled à la navbar
    backToTopThreshold: 500,      // Seuil d'apparition du bouton retour en haut
    revealThreshold: 0.15,        // Seuil Intersection Observer pour les reveals
    parallaxFactor: 0.35,         // Intensité de l'effet parallaxe (0 = aucun, 1 = plein)
    staggerDelay: 120,            // Délai entre chaque élément dans un stagger (ms)
    typingSpeed: 90,              // Vitesse du typing effect (ms par lettre)
  };

  // Détecte si l'utilisateur préfère réduire les mouvements
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Détecte si on est sur mobile (pour désactiver le parallaxe)
  const isMobile = window.matchMedia('(max-width: 768px)').matches;


  // ==========================================================================
  // UTILITAIRES
  // ==========================================================================

  /** Limite l'exécution d'une fonction via requestAnimationFrame */
  function rafThrottle(callback) {
    let ticking = false;
    return function rafThrottled() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function onFrame() {
        callback();
        ticking = false;
      });
    };
  }


  // ==========================================================================
  // 1. NAVBAR — COMPORTEMENT AU SCROLL
  // ==========================================================================

  function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    let lastScrollY = window.scrollY;
    let isHidden = false;

    function handleNavbarScroll() {
      const currentScrollY = window.scrollY;

      // Ajouter / retirer la classe .scrolled
      if (currentScrollY > CONFIG.scrolledThreshold) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }

      // Cacher la navbar quand on scrolle vers le bas, montrer vers le haut
      // On ne cache que si on a suffisamment scrollé (évite le flickering en haut)
      if (currentScrollY > CONFIG.navbarOffset * 2) {
        if (currentScrollY > lastScrollY && !isHidden) {
          // Scroll vers le bas — cacher
          navbar.classList.add('navbar-hidden');
          isHidden = true;
        } else if (currentScrollY < lastScrollY && isHidden) {
          // Scroll vers le haut — montrer
          navbar.classList.remove('navbar-hidden');
          isHidden = false;
        }
      } else {
        // Tout en haut — toujours visible
        navbar.classList.remove('navbar-hidden');
        isHidden = false;
      }

      lastScrollY = currentScrollY;
    }

    window.addEventListener('scroll', rafThrottle(handleNavbarScroll), { passive: true });
  }


  // ==========================================================================
  // 2. MENU MOBILE (HAMBURGER)
  // ==========================================================================

  function initMobileMenu() {
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.querySelector('.nav-menu');
    if (!toggle || !menu) return;

    function openMenu() {
      menu.classList.add('active');
      toggle.classList.add('active');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.classList.add('no-scroll');
    }

    function closeMenu() {
      menu.classList.remove('active');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('no-scroll');
    }

    function toggleMenu() {
      if (menu.classList.contains('active')) {
        closeMenu();
      } else {
        openMenu();
      }
    }

    // Toggle au clic sur le hamburger
    toggle.addEventListener('click', toggleMenu);

    // Fermer si on clique en dehors du menu et du toggle
    document.addEventListener('click', function handleOutsideClick(e) {
      if (menu.classList.contains('active') && !menu.contains(e.target) && !toggle.contains(e.target)) {
        closeMenu();
      }
    });

    // Fermer le menu quand on clique sur un lien de navigation
    const navLinks = menu.querySelectorAll('.nav-link');
    navLinks.forEach(function attachLinkClose(link) {
      link.addEventListener('click', closeMenu);
    });
  }


  // ==========================================================================
  // 3. SMOOTH SCROLL NAVIGATION
  // ==========================================================================

  function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    function handleAnchorClick(e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const targetPosition = target.getBoundingClientRect().top + window.scrollY - CONFIG.navbarOffset;

      // Si l'utilisateur préfère pas de mouvement, on saute directement
      if (prefersReducedMotion) {
        window.scrollTo(0, targetPosition);
      } else {
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }

    anchorLinks.forEach(function attachSmoothScroll(link) {
      link.addEventListener('click', handleAnchorClick);
    });
  }


  // ==========================================================================
  // 4. ANIMATIONS AU SCROLL (REVEAL) — INTERSECTION OBSERVER
  // ==========================================================================

  function initRevealAnimations() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-up');
    if (!revealElements.length) return;

    // Si l'utilisateur préfère pas de mouvement, on active tout immédiatement
    if (prefersReducedMotion) {
      revealElements.forEach(function activateImmediately(el) {
        el.classList.add('active');
      });
      return;
    }

    // Calculer les délais stagger pour les éléments dans un même conteneur
    function applyStaggerDelays() {
      // Regrouper les éléments reveal par conteneur parent
      const groups = new Map();

      revealElements.forEach(function groupByParent(el) {
        const parent = el.parentElement;
        if (!groups.has(parent)) {
          groups.set(parent, []);
        }
        groups.get(parent).push(el);
      });

      // Appliquer un délai progressif si plusieurs éléments dans le même conteneur
      groups.forEach(function assignDelays(children) {
        if (children.length > 1) {
          children.forEach(function setDelay(child, index) {
            // Le data-delay explicite a la priorité
            if (!child.hasAttribute('data-delay')) {
              child.style.transitionDelay = (index * CONFIG.staggerDelay) + 'ms';
            }
          });
        }
      });
    }

    applyStaggerDelays();

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: CONFIG.revealThreshold
    };

    const revealObserver = new IntersectionObserver(function handleRevealEntry(entries, observer) {
      entries.forEach(function processEntry(entry) {
        if (entry.isIntersecting) {
          const el = entry.target;

          // Appliquer le data-delay s'il est défini
          if (el.hasAttribute('data-delay')) {
            const delay = parseInt(el.getAttribute('data-delay'), 10);
            setTimeout(function activateWithDelay() {
              el.classList.add('active');
            }, delay);
          } else {
            el.classList.add('active');
          }

          // Ne déclencher qu'une seule fois
          observer.unobserve(el);
        }
      });
    }, observerOptions);

    revealElements.forEach(function observeElement(el) {
      revealObserver.observe(el);
    });
  }


  // ==========================================================================
  // 5. LIGHTBOX / VISIONNEUSE DE PHOTOS
  // ==========================================================================

  function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = lightbox ? lightbox.querySelector('.lightbox-close') : null;
    const prevBtn = lightbox ? lightbox.querySelector('.lightbox-prev') : null;
    const nextBtn = lightbox ? lightbox.querySelector('.lightbox-next') : null;

    if (!lightbox || !lightboxImage) return;

    // Collecter toutes les images qui ont un data-lightbox
    const lightboxImages = document.querySelectorAll('[data-lightbox]');
    if (!lightboxImages.length) return;

    let currentImages = [];   // Images de la séance active
    let currentIndex = 0;     // Index dans la séance active
    let previouslyFocused = null; // Élément qui avait le focus avant l'ouverture

    /** Regroupe les images par valeur de data-lightbox (par séance) */
    function getImagesByGroup(groupName) {
      return Array.from(document.querySelectorAll('[data-lightbox="' + groupName + '"]'));
    }

    /** Ouvre la lightbox avec une image donnée */
    function openLightbox(img) {
      const group = img.getAttribute('data-lightbox');
      currentImages = getImagesByGroup(group);
      currentIndex = currentImages.indexOf(img);

      previouslyFocused = document.activeElement;

      showCurrentImage();
      lightbox.removeAttribute('hidden');

      // Petite pause pour laisser le navigateur appliquer la suppression du hidden
      requestAnimationFrame(function activateLightbox() {
        lightbox.classList.add('active');
      });

      document.body.classList.add('no-scroll');
      closeBtn.focus();
    }

    /** Ferme la lightbox */
    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.classList.remove('no-scroll');

      // Attendre la fin de la transition avant de cacher
      function handleTransitionEnd() {
        lightbox.setAttribute('hidden', '');
        lightboxImage.src = '';
        lightboxImage.alt = '';
        lightbox.removeEventListener('transitionend', handleTransitionEnd);

        // Restituer le focus
        if (previouslyFocused) {
          previouslyFocused.focus();
        }
      }

      lightbox.addEventListener('transitionend', handleTransitionEnd);

      // Fallback si pas de transition (ex: prefers-reduced-motion)
      setTimeout(function fallbackClose() {
        if (!lightbox.hasAttribute('hidden')) {
          lightbox.setAttribute('hidden', '');
          lightboxImage.src = '';
        }
      }, 600);
    }

    /** Met à jour l'image affichée */
    function showCurrentImage() {
      const img = currentImages[currentIndex];
      if (!img) return;

      lightboxImage.src = img.src;
      lightboxImage.alt = img.alt || '';
      if (lightboxCaption) lightboxCaption.textContent = img.alt || '';

      // Gestion des boutons prev/next
      if (prevBtn) prevBtn.style.display = currentImages.length > 1 ? '' : 'none';
      if (nextBtn) nextBtn.style.display = currentImages.length > 1 ? '' : 'none';
    }

    /** Image suivante */
    function showNext() {
      currentIndex = (currentIndex + 1) % currentImages.length;
      showCurrentImage();
    }

    /** Image précédente */
    function showPrev() {
      currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
      showCurrentImage();
    }

    // Clic sur les images de galerie
    lightboxImages.forEach(function attachLightboxOpen(img) {
      // Rendre les images cliquables et accessibles
      img.style.cursor = 'pointer';
      img.setAttribute('tabindex', '0');
      img.setAttribute('role', 'button');

      img.addEventListener('click', function handleImageClick() {
        openLightbox(this);
      });

      // Ouverture au clavier (Enter ou Espace)
      img.addEventListener('keydown', function handleImageKeydown(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(this);
        }
      });
    });

    // Bouton fermer
    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

    // Boutons précédent / suivant
    if (prevBtn) prevBtn.addEventListener('click', showPrev);
    if (nextBtn) nextBtn.addEventListener('click', showNext);

    // Fermer en cliquant sur le fond sombre (pas sur l'image ni les boutons)
    lightbox.addEventListener('click', function handleBackdropClick(e) {
      if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
        closeLightbox();
      }
    });

    // Navigation au clavier
    document.addEventListener('keydown', function handleLightboxKeyboard(e) {
      if (lightbox.hasAttribute('hidden')) return;

      switch (e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          showPrev();
          break;
        case 'ArrowRight':
          showNext();
          break;
      }
    });
  }


  // ==========================================================================
  // 6. EFFET PARALLAXE LÉGER
  // ==========================================================================

  function initParallax() {
    // Désactiver sur mobile ou si l'utilisateur préfère pas de mouvement
    if (prefersReducedMotion || isMobile) return;

    const hero = document.querySelector('.hero');
    if (!hero) return;

    const heroImage = hero.querySelector('.hero-image-wrapper img');
    if (!heroImage) return;

    function handleParallax() {
      const scrollY = window.scrollY;
      const heroBottom = hero.offsetTop + hero.offsetHeight;

      // Ne calculer que si le hero est visible
      if (scrollY < heroBottom) {
        const translateY = scrollY * CONFIG.parallaxFactor;
        heroImage.style.transform = 'translateY(' + translateY + 'px)';
      }
    }

    window.addEventListener('scroll', rafThrottle(handleParallax), { passive: true });
  }


  // ==========================================================================
  // 7. ANIMATION DE TEXTE — TYPING EFFECT SUR "PHOTOGRAPHE"
  // ==========================================================================

  function initTypingAnimation() {
    if (prefersReducedMotion) return;

    const subtitle = document.querySelector('.hero-role');
    if (!subtitle) return;

    const originalText = subtitle.textContent.trim();
    subtitle.textContent = '';
    subtitle.style.visibility = 'visible';

    let charIndex = 0;

    function typeNextChar() {
      if (charIndex < originalText.length) {
        subtitle.textContent += originalText.charAt(charIndex);
        charIndex++;
        setTimeout(typeNextChar, CONFIG.typingSpeed);
      }
    }

    // Petit délai initial pour laisser le temps à la page de se charger
    setTimeout(typeNextChar, 400);
  }


  // ==========================================================================
  // 8. BOUTON BACK TO TOP
  // ==========================================================================

  function initBackToTop() {
    const backToTop = document.getElementById('back-to-top');
    if (!backToTop) return;

    function handleBackToTopVisibility() {
      if (window.scrollY > CONFIG.backToTopThreshold) {
        backToTop.removeAttribute('hidden');
        // Petit délai pour permettre la transition CSS après suppression de hidden
        requestAnimationFrame(function showBtn() {
          backToTop.classList.add('visible');
        });
      } else {
        backToTop.classList.remove('visible');
        // Attendre la fin de la transition avant de cacher
        setTimeout(function hideBtn() {
          if (!backToTop.classList.contains('visible')) {
            backToTop.setAttribute('hidden', '');
          }
        }, 400);
      }
    }

    window.addEventListener('scroll', rafThrottle(handleBackToTopVisibility), { passive: true });

    // Le smooth scroll est déjà géré par initSmoothScroll via le href="#top"
  }


  // ==========================================================================
  // 9. LAZY LOADING AMÉLIORÉ — FADE-IN AU CHARGEMENT DES IMAGES
  // ==========================================================================

  function initImageLoadEffects() {
    const images = document.querySelectorAll('img[loading="lazy"]');

    images.forEach(function attachLoadEffect(img) {
      // Si l'image est déjà chargée (depuis le cache)
      if (img.complete && img.naturalWidth > 0) {
        img.classList.add('loaded');
        return;
      }

      img.addEventListener('load', function handleImageLoad() {
        this.classList.add('loaded');
      });

      img.addEventListener('error', function handleImageError() {
        // En cas d'erreur, on ajoute quand même la classe pour éviter un état bloqué
        this.classList.add('loaded');
      });
    });
  }


  // ==========================================================================
  // 10. GESTION DU FORMULAIRE DE CONTACT
  // ==========================================================================

  function initContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    function validateField(field) {
      const value = field.value.trim();
      let isValid = true;

      // Vérifier que le champ n'est pas vide s'il est requis
      if (field.hasAttribute('required') && value === '') {
        isValid = false;
      }

      // Validation email basique
      if (field.type === 'email' && value !== '') {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = emailPattern.test(value);
      }

      // Feedback visuel
      if (isValid) {
        field.classList.remove('field-error');
        field.classList.add('field-valid');
      } else {
        field.classList.remove('field-valid');
        field.classList.add('field-error');
      }

      return isValid;
    }

    function handleFormSubmit(e) {
      const fields = form.querySelectorAll('input, textarea, select');
      let formValid = true;

      fields.forEach(function checkField(field) {
        if (!validateField(field)) {
          formValid = false;
        }
      });

      if (!formValid) {
        e.preventDefault();
        // Focus sur le premier champ en erreur
        const firstError = form.querySelector('.field-error');
        if (firstError) firstError.focus();
      }
    }

    // Validation au blur sur chaque champ
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(function attachBlurValidation(input) {
      input.addEventListener('blur', function handleBlur() {
        validateField(this);
      });
    });

    form.addEventListener('submit', handleFormSubmit);
  }


  // ==========================================================================
  // INITIALISATION GÉNÉRALE
  // ==========================================================================

  initNavbar();
  initMobileMenu();
  initSmoothScroll();
  initRevealAnimations();
  initLightbox();
  initParallax();
  initBackToTop();
  initImageLoadEffects();
  initTypingAnimation();
  initContactForm();

});
