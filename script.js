
  function toggleMenu() {
    const panel = document.getElementById('responsiveNavLinks');
    const btn   = document.getElementById('menuButton');
    const isOpen = panel.classList.toggle('open');      // Klasse an/aus

    // Zugänglichkeit:
    btn.setAttribute('aria-expanded', String(isOpen));
    // Seite hinten nicht scrollen, wenn offen:
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  // Panel schließt, wenn man auf einen Link klickt
  document.addEventListener('click', (e) => {
    const panel = document.getElementById('responsiveNavLinks');
    const btn   = document.getElementById('menuButton');

    if (!panel.classList.contains('open')) return;

    const link = e.target.closest('.responsiveNavLink');
    if (link) {
      panel.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  // ESC schließt
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const panel = document.getElementById('responsiveNavLinks');
    const btn   = document.getElementById('menuButton');
    if (panel.classList.contains('open')) {
      panel.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

