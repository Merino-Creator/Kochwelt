function toggleMenu() {
    const btn = document.getElementById('menuBtn');
    const menu = document.getElementById('mobileMenu');
    const backdrop = document.getElementById('menuBackdrop');

    if (!btn || !menu || !backdrop) return;

    function setOpen(on) {
        btn.setAttribute('aria-expanded', String(on));
        menu.classList.toggle('open', on);
        backdrop.classList.toggle('show', on);
        document.body.style.overflow = on ? 'hidden' : '';
    }

    btn.addEventListener('click', () => setOpen(!menu.classList.contains('open')));
    backdrop.addEventListener('click', () => setOpen(false));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });

    // Bei Breite > 800px sicher schließen
    const mq = window.matchMedia('(max-width: 800px)');
    function handleWidth(e){ if (!e.matches) setOpen(false); }
    mq.addEventListener ? mq.addEventListener('change', handleWidth) : mq.addListener(handleWidth);
    (toggleMenu);
}