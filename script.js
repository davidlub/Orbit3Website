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

// Demo form
const form = document.getElementById('dform');
if (form) {
  form.addEventListener('submit', e => {
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
    form.style.display = 'none';
    document.getElementById('form-ok').style.display = 'block';
  });
}
