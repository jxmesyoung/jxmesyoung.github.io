// ---- Theme toggle ----
  const themeToggle = document.getElementById('themeToggle');
  const root = document.documentElement;

  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
  }

  setTheme('dark');

  const scripts = [
    {
      title: 'Internment Camp',
      pages: 109,
      logline: 'As WW2 ends, a patriotic Japanese-American girl fights alongside her family to regain their U.S. citizenship. Her family gave it away in the first place.',
      previewUrl: 'writing/internment-camp-preview.pdf'
    },
    {
      title: "Hunter Fang and the Emperor's Banner",
      pages: 128,
      logline: 'An obsessive treasure hunter attempts to secure what remains of Genghis Khan’s lost spirit banner, only to discover his spirit still attached to it.',
      previewUrl: 'writing/hunter-fang-preview.pdf'
    },
    {
      title: 'Rich Kid Assassin',
      pages: 110,
      logline: "A privileged high school senior organizes a game of 'Assassin' for her classmates in order to test the latest performance-enhancing drugs produced by her family's pharmaceutical company.",
      previewUrl: 'writing/rich-kid-assassin-preview.pdf'
    }
  ];

  const grid = document.getElementById('scriptsGrid');
  scripts.forEach((s, i) => {
    const card = document.createElement('button');
    card.className = 'script-card fade-in';
    card.style.transitionDelay = `${i * 0.12}s`;
    card.innerHTML = `
      <p class="card-title">${s.title}</p>
      <p class="card-pages">${s.pages} pages</p>
    `;
    card.addEventListener('click', () => openModal(i));
    grid.appendChild(card);
  });

  // ---- Modal ----
  const backdrop = document.getElementById('modalBackdrop');
  const modalTitle = document.getElementById('modalTitle');
  const modalPages = document.getElementById('modalPages');
  const modalLogline = document.getElementById('modalLogline');
  const modalPreviewLink = document.getElementById('modalPreviewLink');
  const modalClose = document.getElementById('modalClose');

  function openModal(index) {
    const s = scripts[index];
    modalTitle.textContent = s.title;
    modalPages.textContent = `${s.pages} pages`;
    modalLogline.textContent = s.logline;
    modalPreviewLink.href = s.previewUrl;
    backdrop.classList.add('open');
    modalClose.focus();
  }

  function closeModal() {
    backdrop.classList.remove('open');
  }

  modalClose.addEventListener('click', closeModal);
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && backdrop.classList.contains('open')) closeModal();
  });

  // ---- Scroll fade-in ----
  const fadeEls = document.querySelectorAll('.fade-in');
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  fadeEls.forEach((el) => fadeObserver.observe(el));

  const linkedinLink = document.getElementById('linkedinLink');
  if (linkedinLink) {
    linkedinLink.addEventListener('click', (e) => {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if (!isMobile) return; // desktop: let the normal https link behave as-is

      e.preventDefault();
      const webUrl = linkedinLink.href;
      const appUrl = 'linkedin://in/jamesyoung9';
      const clickedAt = Date.now();

      // If the app opens, this tab gets backgrounded and the fallback below
      // never fires (or fires too late to matter). If nothing handles the
      // custom scheme, we land back here quickly and go to the web version.
      window.location.href = appUrl;
      setTimeout(() => {
        if (Date.now() - clickedAt < 2000) {
          window.location.href = webUrl;
        }
      }, 600);
    });
  }
