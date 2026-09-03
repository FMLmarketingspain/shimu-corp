// Mobile nav toggle.
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.nav');
  const burger = document.querySelector('.burger');
  if (!nav || !burger) return;

  function closeMenu() {
    nav.classList.remove('open');
    burger.textContent = 'MENU';
    burger.setAttribute('aria-expanded', 'false');
  }

  function toggleMenu() {
    const isOpen = nav.classList.toggle('open');
    burger.textContent = isOpen ? 'CLOSE' : 'MENU';
    burger.setAttribute('aria-expanded', String(isOpen));
  }

  burger.setAttribute('aria-expanded', 'false');
  burger.addEventListener('click', toggleMenu);

  // Close the menu once a link is used, so an in-page anchor jump
  // (or navigating to another page) doesn't leave it open behind.
  nav.querySelectorAll('.navlinks a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  // Read more / read less toggles — each button reveals the hidden
  // block immediately before it (a "bio-more" div, in current usage).
  document.querySelectorAll('.read-more-toggle').forEach((btn) => {
    const target = btn.previousElementSibling;
    if (!target) return;
    btn.addEventListener('click', () => {
      const nowHidden = !target.hasAttribute('hidden');
      target.toggleAttribute('hidden');
      btn.textContent = nowHidden ? 'Read more' : 'Read less';
      btn.setAttribute('aria-expanded', String(!nowHidden));
    });
  });
});
