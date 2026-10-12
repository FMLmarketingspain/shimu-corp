// Mobile nav toggle.
document.addEventListener('DOMContentLoaded', () => {
  // Licences page: open certificates in an in-page lightbox instead of
  // linking to the raw file, and block right-click/drag on the images.
  // This deters casual copying — it can't stop a screenshot, and the
  // PDF's own viewer toolbar (Chrome/Edge/Firefox built-in) is outside
  // the page's control.
  const lightbox = document.getElementById('licence-lightbox');
  if (lightbox) {
    const body = document.getElementById('licence-lightbox-body');
    const title = document.getElementById('licence-lightbox-title');
    const openLightbox = (src, type, label) => {
      title.textContent = label || '';
      body.innerHTML = '';
      if (type === 'pdf') {
        const wrap = document.createElement('div');
        wrap.className = 'licence-lightbox-pdf';
        const frame = document.createElement('iframe');
        frame.src = src + '#toolbar=0&navpanes=0';
        frame.title = label || 'Document preview';
        const fallback = document.createElement('p');
        fallback.className = 'licence-lightbox-fallback';
        fallback.innerHTML = 'Not showing? <a href="' + src + '" target="_blank" rel="noopener">Open the PDF in a new tab ↗</a>';
        wrap.appendChild(frame);
        wrap.appendChild(fallback);
        body.appendChild(wrap);
      } else {
        const img = document.createElement('img');
        img.src = src;
        img.alt = label || '';
        img.oncontextmenu = () => false;
        img.draggable = false;
        body.appendChild(img);
      }
      lightbox.hidden = false;
      document.body.style.overflow = 'hidden';
    };
    const closeLightbox = () => {
      lightbox.hidden = true;
      body.innerHTML = '';
      document.body.style.overflow = '';
    };
    document.querySelectorAll('[data-licence-src]').forEach((card) => {
      card.addEventListener('click', () => {
        openLightbox(
          card.getAttribute('data-licence-src'),
          card.getAttribute('data-licence-type'),
          card.getAttribute('data-licence-title')
        );
      });
    });
    lightbox.querySelectorAll('[data-licence-close]').forEach((el) => {
      el.addEventListener('click', closeLightbox);
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !lightbox.hidden) closeLightbox();
    });
  }

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
