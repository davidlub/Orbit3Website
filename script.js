// Nav border on scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => nav.classList.toggle('up', scrollY > 10), { passive: true });

// Scroll-triggered fade-in
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  });
}, { threshold: 0.07, rootMargin: '0px 0px -32px 0px' });
document.querySelectorAll('.f').forEach(el => io.observe(el));

// Demo form.
//
// Submitted by fetch to Netlify Forms rather than natively, so the inline
// confirmation stays on the page instead of navigating away. Netlify accepts a
// urlencoded POST to the page's own path as long as `form-name` is included.
//
// This previously called preventDefault() and then showed the success panel
// without sending anything anywhere — every enquiry was discarded while telling
// the sender it had been received. If the POST fails now, say so and point at the
// mailto rather than claiming success.
const form = document.getElementById('dform');
if (form) {
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const fn = document.getElementById('fn').value.trim();
    const fe = document.getElementById('fe').value.trim();
    const fc = document.getElementById('fc').value.trim();
    if (!fn || !fe || !fc) {
      // Highlight empty required fields
      [['fn', fn], ['fe', fe], ['fc', fc]].forEach(([id, val]) => {
        const el = document.getElementById(id);
        el.style.borderColor = val ? '' : 'var(--accent)';
      });
      return;
    }

    const btn = form.querySelector('button[type="submit"]');
    const label = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Sending…';
    const err = document.getElementById('form-err');
    if (err) err.style.display = 'none';

    try {
      const res = await fetch(form.getAttribute('action') || window.location.pathname, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form)).toString(),
      });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      form.style.display = 'none';
      document.getElementById('form-ok').style.display = 'block';
    } catch (_) {
      btn.disabled = false;
      btn.textContent = label;
      if (err) err.style.display = 'block';
    }
  });
}
