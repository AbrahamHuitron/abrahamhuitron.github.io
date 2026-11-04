/**
 * Abraham Huitron — Interactive Web Resume & Analytics Portfolio
 * Theme Toggle, Experience Filtering, Skill Highlighting, Print Helper, & JPEG Lightbox
 */

document.addEventListener('DOMContentLoaded', () => {
  /* ========================================================================
     1. Dark / Light Theme Toggle
     ======================================================================== */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlEl = document.documentElement;
  const savedTheme = localStorage.getItem('ah_theme') || 'dark';

  const applyTheme = (theme) => {
    if (theme === 'light') {
      htmlEl.setAttribute('data-theme', 'light');
    } else {
      htmlEl.removeAttribute('data-theme');
    }
    localStorage.setItem('ah_theme', theme);
    updateThemeIcon(theme);
  };

  const updateThemeIcon = (theme) => {
    if (!themeToggleBtn) return;
    const sunIcon = themeToggleBtn.querySelector('.icon-sun');
    const moonIcon = themeToggleBtn.querySelector('.icon-moon');
    if (sunIcon && moonIcon) {
      sunIcon.style.display = theme === 'light' ? 'none' : 'block';
      moonIcon.style.display = theme === 'light' ? 'block' : 'none';
    }
    themeToggleBtn.setAttribute(
      'aria-label',
      theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'
    );
  };

  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = htmlEl.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      applyTheme(current === 'light' ? 'dark' : 'light');
    });
  }

  /* ========================================================================
     2. Experience Category Filter
     ======================================================================== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const expCards = document.querySelectorAll('.exp-card');
  const skillPills = document.querySelectorAll('.skill-pill[data-skill]');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-filter');

      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      // Clear active skill pill selection when switching category filters
      skillPills.forEach((p) => p.classList.remove('active'));
      document.querySelectorAll('.tag').forEach((t) => t.classList.remove('tag--highlight'));

      expCards.forEach((card) => {
        const categories = (card.getAttribute('data-categories') || '').split(',');
        if (category === 'all' || categories.includes(category)) {
          card.classList.remove('hidden-by-filter');
        } else {
          card.classList.add('hidden-by-filter');
        }
      });
    });
  });

  /* ========================================================================
     3. Interactive Skill Tag Highlighting
     ======================================================================== */
  skillPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      const skillKey = (pill.getAttribute('data-skill') || '').toLowerCase();
      const isAlreadyActive = pill.classList.contains('active');

      // Reset all pills and tags
      skillPills.forEach((p) => p.classList.remove('active'));
      document.querySelectorAll('.tag').forEach((t) => t.classList.remove('tag--highlight'));

      // Reset experience filter to 'all'
      filterBtns.forEach((b) => {
        b.classList.toggle('active', b.getAttribute('data-filter') === 'all');
      });
      expCards.forEach((c) => c.classList.remove('hidden-by-filter'));

      if (!isAlreadyActive && skillKey) {
        pill.classList.add('active');
        document.querySelectorAll('.tag').forEach((tag) => {
          const tagText = tag.textContent.toLowerCase();
          if (tagText.includes(skillKey) || skillKey.includes(tagText)) {
            tag.classList.add('tag--highlight');
          }
        });
      }
    });
  });

  /* ========================================================================
     4. Print / Save as PDF Handler
     ======================================================================== */
  const printButtons = document.querySelectorAll('.js-print-resume');
  printButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Ensure all experience cards are visible before printing
      expCards.forEach((c) => c.classList.remove('hidden-by-filter'));
      filterBtns.forEach((b) => {
        b.classList.toggle('active', b.getAttribute('data-filter') === 'all');
      });
      window.print();
    });
  });

  /* ========================================================================
     5. Active Section Scroll Spy
     ======================================================================== */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const onScroll = () => {
    const scrollPos = window.scrollY + 140;
    sections.forEach((sec) => {
      if (sec.hasAttribute('hidden')) return;
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });

  /* ========================================================================
     6. Future-Ready JPEG Lightbox Modal (For Power BI Dashboard Screenshots)
     ======================================================================== */
  const lightbox = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxClose = document.getElementById('lightbox-close');

  document.querySelectorAll('.gallery-card, .js-zoom-preview').forEach((card) => {
    card.addEventListener('click', () => {
      const imgSrc = card.getAttribute('data-full-img');
      const title = card.getAttribute('data-title');
      if (lightbox && lightboxImg && imgSrc) {
        lightboxImg.src = imgSrc;
        lightboxImg.alt = title || 'Dashboard Preview';
        if (lightboxTitle) lightboxTitle.textContent = title || 'Project Preview';
        lightbox.classList.add('open');
        lightbox.setAttribute('aria-hidden', 'false');
      }
    });
  });

  const closeLightbox = () => {
    if (lightbox) {
      lightbox.classList.remove('open');
      lightbox.setAttribute('aria-hidden', 'true');
    }
  };

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  /* ========================================================================
     7. Profile Card Photo Mode Toggle (Executive / Illustrated / Casual)
     ======================================================================== */
  const photoModeBtns = document.querySelectorAll('.profile-mode-btn[data-photo-mode]');
  const proImg = document.getElementById('profile-img-pro');
  const illustratedImg = document.getElementById('profile-img-illustrated');
  const casualImg = document.getElementById('profile-img-casual');

  photoModeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const mode = btn.getAttribute('data-photo-mode');
      photoModeBtns.forEach((b) => b.classList.toggle('active', b === btn));
      if (proImg) proImg.classList.toggle('is-active', mode === 'pro');
      if (illustratedImg) illustratedImg.classList.toggle('is-active', mode === 'illustrated');
      if (casualImg) casualImg.classList.toggle('is-active', mode === 'casual');
    });
  });
});

