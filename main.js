/**
 * ==========================================================================
 * PORTOFOLIO AHNAF CHAISAR AKBAR - JAVASCRIPT LOGIC
 * Features: Typing Effect, Filtering, Lightbox, Mobile Nav, Theme Toggle,
 * WhatsApp/Email Form Action, and Scroll Reveal.
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     0. OPENING / PRELOADER ANIMATION
     ========================================================================== */
  const preloader = document.getElementById('preloader');
  const preloaderBar = document.getElementById('preloaderBar');
  const preloaderStatus = document.getElementById('preloaderStatus');
  const preloaderCounter = document.getElementById('preloaderCounter');
  const skipPreloaderBtn = document.getElementById('skipPreloader');

  let loadProgress = 0;
  let preloaderDismissed = false;

  function dismissPreloader() {
    if (preloaderDismissed || !preloader) return;
    preloaderDismissed = true;
    
    if (preloaderBar) preloaderBar.style.width = '100%';
    if (preloaderCounter) preloaderCounter.textContent = '100%';
    if (preloaderStatus) preloaderStatus.textContent = 'Selamat datang!';

    setTimeout(() => {
      preloader.classList.add('fade-out');
      preloader.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 750);
    }, 280);
  }

  if (preloader) {
    document.body.style.overflow = 'hidden';

    const interval = setInterval(() => {
      if (preloaderDismissed) {
        clearInterval(interval);
        return;
      }

      loadProgress += Math.floor(Math.random() * 4) + 2;

      if (loadProgress >= 100) {
        loadProgress = 100;
        clearInterval(interval);
        dismissPreloader();
      } else {
        if (preloaderBar) preloaderBar.style.width = `${loadProgress}%`;
        if (preloaderCounter) preloaderCounter.textContent = `${loadProgress}%`;

        if (preloaderStatus) {
          if (loadProgress < 30) {
            preloaderStatus.textContent = 'Memuat modul & konfigurasi...';
          } else if (loadProgress < 65) {
            preloaderStatus.textContent = 'Menyiapkan aset visual & galeri...';
          } else if (loadProgress < 90) {
            preloaderStatus.textContent = 'Menyusun proyek & sertifikasi...';
          } else {
            preloaderStatus.textContent = 'Siap! Membuka beranda...';
          }
        }
      }
    }, 32);

    if (skipPreloaderBtn) {
      skipPreloaderBtn.addEventListener('click', () => {
        clearInterval(interval);
        dismissPreloader();
      });
    }

    // Safety fallback timeout
    setTimeout(() => {
      if (!preloaderDismissed) {
        clearInterval(interval);
        dismissPreloader();
      }
    }, 3800);
  }

  /* ==========================================================================
     1. THEME TOGGLE (DARK / LIGHT MODE)
     ========================================================================== */
  const themeToggle = document.getElementById('themeToggle');
  const htmlElement = document.documentElement;
  const themeIcon = themeToggle ? themeToggle.querySelector('.theme-icon') : null;

  // Check saved theme or default to dark
  const savedTheme = localStorage.getItem('ahnaf_theme') || 'dark';
  htmlElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      htmlElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('ahnaf_theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    if (theme === 'light') {
      themeIcon.className = 'fa-solid fa-sun theme-icon';
    } else {
      themeIcon.className = 'fa-solid fa-moon theme-icon';
    }
  }


  /* ==========================================================================
     2. NAVBAR SCROLL & ACTIVE LINK HIGHLIGHTING
     ========================================================================== */
  const navbarWrapper = document.querySelector('.navbar-wrapper');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  // Sticky navbar shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbarWrapper.classList.add('scrolled');
    } else {
      navbarWrapper.classList.remove('scrolled');
    }

    // Active Section Detection
    let currentSection = '';
    const scrollPosition = window.pageYOffset + 140;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile Menu Toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile menu when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }


  /* ==========================================================================
     3. DYNAMIC HERO TYPING ANIMATION
     ========================================================================== */
  const typingElement = document.getElementById('typingText');
  const roles = [
    'IT Support',
    'Web Developer',
    'UI/UX Designer',
    'PHP',
    'Ecommerce',
    'Generative AI',
    'Hardware'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function typeEffect() {
    if (!typingElement) return;

    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 90;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 1800; // Pause after full word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400; // Pause before typing next word
    }

    setTimeout(typeEffect, typingSpeed);
  }

  typeEffect();


  /* ==========================================================================
     3.5 STACKED DECK EFFECT (CARD SWIPING / INFINITE STACK SLIDER)
     ========================================================================== */
  const cardStack = document.getElementById('cardStack');
  const deckContainer = document.getElementById('stackedDeckContainer');
  const deckNextBtn = document.getElementById('deckNextBtn');
  const deckPrevBtn = document.getElementById('deckPrevBtn');
  const deckSwipeAction = document.getElementById('deckSwipeAction');
  const deckDotsContainer = document.getElementById('deckDots');

  if (cardStack) {
    let cards = Array.from(cardStack.querySelectorAll('.deck-card'));
    let isAnimating = false;
    let autoPlayTimer = null;

    // Create Dot Indicators
    if (deckDotsContainer) {
      deckDotsContainer.innerHTML = '';
      cards.forEach((_, idx) => {
        const dot = document.createElement('span');
        dot.className = `deck-dot ${idx === 0 ? 'active' : ''}`;
        dot.setAttribute('data-dot-index', idx);
        dot.addEventListener('click', (e) => {
          e.stopPropagation();
          if (isAnimating) return;
          swipeNext('right');
        });
        deckDotsContainer.appendChild(dot);
      });
    }

    function updateDots() {
      if (!deckDotsContainer) return;
      const topCard = cards[0];
      const activeOriginalIndex = parseInt(topCard.getAttribute('data-index') || '0', 10);
      const dots = deckDotsContainer.querySelectorAll('.deck-dot');
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === activeOriginalIndex);
      });
    }

    function renderDeck() {
      cards.forEach((card, index) => {
        card.classList.remove('swiping-right', 'swiping-left', 'active-card');
        card.style.transition = 'transform 0.45s cubic-bezier(0.18, 0.89, 0.32, 1.28), opacity 0.4s ease, filter 0.4s ease';

        if (index === 0) {
          // Top active card
          card.classList.add('active-card');
          card.style.zIndex = '10';
          card.style.transform = 'translate3d(0, 0, 0) scale(1) rotate(0deg)';
          card.style.opacity = '1';
          card.style.filter = 'brightness(1)';
          card.style.pointerEvents = 'auto';
        } else if (index === 1) {
          card.style.zIndex = '9';
          card.style.transform = 'translate3d(0, 14px, -20px) scale(0.95) rotate(-2.5deg)';
          card.style.opacity = '0.88';
          card.style.filter = 'brightness(0.9)';
          card.style.pointerEvents = 'none';
        } else if (index === 2) {
          card.style.zIndex = '8';
          card.style.transform = 'translate3d(0, 28px, -40px) scale(0.90) rotate(2.5deg)';
          card.style.opacity = '0.65';
          card.style.filter = 'brightness(0.8)';
          card.style.pointerEvents = 'none';
        } else if (index === 3) {
          card.style.zIndex = '7';
          card.style.transform = 'translate3d(0, 40px, -60px) scale(0.85) rotate(-1.5deg)';
          card.style.opacity = '0.35';
          card.style.filter = 'brightness(0.7)';
          card.style.pointerEvents = 'none';
        } else {
          card.style.zIndex = '5';
          card.style.transform = 'translate3d(0, 48px, -80px) scale(0.80)';
          card.style.opacity = '0';
          card.style.filter = 'brightness(0.6)';
          card.style.pointerEvents = 'none';
        }
      });
      updateDots();
    }

    function swipeNext(direction = 'right') {
      if (isAnimating || cards.length < 2) return;
      isAnimating = true;

      const topCard = cards[0];
      const swipeClass = direction === 'left' ? 'swiping-left' : 'swiping-right';
      topCard.classList.add(swipeClass);

      setTimeout(() => {
        // Move top card to back of array and DOM
        topCard.classList.remove(swipeClass);
        cardStack.appendChild(topCard);
        cards.push(cards.shift());
        renderDeck();
        isAnimating = false;
      }, 360);
    }

    function swipePrev() {
      if (isAnimating || cards.length < 2) return;
      isAnimating = true;

      // Bring bottom card to top
      const lastCard = cards[cards.length - 1];
      cardStack.insertBefore(lastCard, cardStack.firstChild);
      cards.unshift(cards.pop());

      // Prepare animation from outside
      lastCard.style.transition = 'none';
      lastCard.style.transform = 'translate3d(-120%, 20px, 40px) rotate(-20deg)';
      lastCard.style.opacity = '0';
      lastCard.style.zIndex = '11';

      setTimeout(() => {
        lastCard.style.transition = 'transform 0.45s cubic-bezier(0.18, 0.89, 0.32, 1.28), opacity 0.4s ease';
        renderDeck();
        setTimeout(() => {
          isAnimating = false;
        }, 450);
      }, 20);
    }

    // Touch & Mouse Drag / Swipe Handlers on Top Card
    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    function handleDragStart(e) {
      if (isAnimating) return;
      const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
      startX = clientX;
      currentX = clientX;
      isDragging = true;
      pauseAutoPlay();
    }

    function handleDragMove(e) {
      if (!isDragging || isAnimating) return;
      const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
      currentX = clientX;
      const deltaX = currentX - startX;
      const rotate = deltaX * 0.08;

      const topCard = cards[0];
      if (topCard) {
        topCard.style.transition = 'none';
        topCard.style.transform = `translate3d(${deltaX}px, ${Math.abs(deltaX) * 0.1}px, 0) rotate(${rotate}deg)`;
      }
    }

    function handleDragEnd() {
      if (!isDragging || isAnimating) return;
      isDragging = false;
      const deltaX = currentX - startX;
      const threshold = 65;

      if (deltaX > threshold) {
        swipeNext('right');
      } else if (deltaX < -threshold) {
        swipeNext('left');
      } else {
        // Snap back
        renderDeck();
      }
      startAutoPlay();
    }

    // Attach drag/click events on card stack
    cardStack.addEventListener('mousedown', handleDragStart);
    window.addEventListener('mousemove', handleDragMove);
    window.addEventListener('mouseup', handleDragEnd);

    cardStack.addEventListener('touchstart', handleDragStart, { passive: true });
    window.addEventListener('touchmove', handleDragMove, { passive: true });
    window.addEventListener('touchend', handleDragEnd);

    // Click on top card directly to swipe
    cardStack.addEventListener('click', () => {
      const deltaX = Math.abs(currentX - startX);
      if (deltaX < 8) {
        swipeNext('right');
      }
    });

    if (deckNextBtn) {
      deckNextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        swipeNext('right');
        pauseAutoPlay();
        startAutoPlay();
      });
    }

    if (deckPrevBtn) {
      deckPrevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        swipePrev();
        pauseAutoPlay();
        startAutoPlay();
      });
    }

    if (deckSwipeAction) {
      deckSwipeAction.addEventListener('click', (e) => {
        e.stopPropagation();
        swipeNext('right');
      });
    }

    // Auto-advance loop
    function startAutoPlay() {
      if (autoPlayTimer) clearInterval(autoPlayTimer);
      autoPlayTimer = setInterval(() => {
        swipeNext('right');
      }, 4200);
    }

    function pauseAutoPlay() {
      if (autoPlayTimer) clearInterval(autoPlayTimer);
    }

    if (deckContainer) {
      deckContainer.addEventListener('mouseenter', pauseAutoPlay);
      deckContainer.addEventListener('mouseleave', startAutoPlay);
    }

    // Initial render & start autoplay
    renderDeck();
    startAutoPlay();
  }


  /* ==========================================================================
     4. PROJECT FILTERING LOGIC
     ========================================================================== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Set active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });


  /* ==========================================================================
     5. CERTIFICATE FILTERING LOGIC
     ========================================================================== */
  const certFilterBtns = document.querySelectorAll('.filter-btn-cert');
  const certCards = document.querySelectorAll('.cert-card');

  certFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      certFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-cert-filter');

      certCards.forEach(card => {
        const category = card.getAttribute('data-cert-cat');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });


  /* ==========================================================================
     6. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersectElement || entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

});


/* ==========================================================================
   7. LIGHTBOX MODAL HANDLERS (GLOBAL SCOPE)
   ========================================================================== */
function openLightbox(imageSrc, title = 'Pratinjau Berkas') {
  const modal = document.getElementById('imageLightbox');
  const img = document.getElementById('lightboxImg');
  const titleEl = document.getElementById('lightboxTitle');
  const downloadBtn = document.getElementById('lightboxDownloadBtn');

  if (!modal || !img) return;

  img.src = imageSrc;
  if (titleEl) titleEl.textContent = title;
  
  if (downloadBtn) {
    downloadBtn.href = imageSrc;
    // Extract filename from path
    const filename = imageSrc.split('/').pop().replace('%20', '_');
    downloadBtn.setAttribute('download', filename);
  }

  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeLightbox(e) {
  if (e && e.target && e.target.classList.contains('lightbox-dialog')) {
    return; // Don't close if clicking inside dialog content
  }
  const modal = document.getElementById('imageLightbox');
  if (!modal) return;

  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

// Close on Escape key press
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeLightbox();
  }
});


/* ==========================================================================
   8. CONTACT FORM HANDLERS (WHATSAPP & EMAIL DIRECT)
   ========================================================================== */
function handleContactSubmit(event) {
  event.preventDefault();

  const name = document.getElementById('senderName')?.value.trim() || 'Rekan';
  const subject = document.getElementById('senderSubject')?.value.trim() || 'Pertanyaan';
  const message = document.getElementById('senderMessage')?.value.trim() || '';

  const waNumber = '6281265349553';
  const fullText = `Halo Ahnaf Chaisar Akbar,\n\nSaya: *${name}*\nPerihal: *${subject}*\n\nPesan:\n${message}\n\n(Dikirim melalui formulir portofolio personal)`;
  
  const encodedText = encodeURIComponent(fullText);
  const waUrl = `https://wa.me/${waNumber}?text=${encodedText}`;

  window.open(waUrl, '_blank', 'noopener,noreferrer');
}

function sendViaEmail() {
  const name = document.getElementById('senderName')?.value.trim() || 'Pengunjung Portofolio';
  const subject = document.getElementById('senderSubject')?.value.trim() || 'Peluang Proyek / Kerja';
  const message = document.getElementById('senderMessage')?.value.trim() || '';

  const email = 'ahnafchaisar@gmail.com';
  const mailSubject = encodeURIComponent(`[Portofolio] ${subject} - ${name}`);
  const mailBody = encodeURIComponent(`Halo Ahnaf Chaisar Akbar,\n\nNama: ${name}\n\nPesan:\n${message}\n\nSalam,\n${name}`);

  window.location.href = `mailto:${email}?subject=${mailSubject}&body=${mailBody}`;
}
