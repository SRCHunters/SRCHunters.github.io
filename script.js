// Mobile menu
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => navLinks.classList.remove('open'))
);

// Active nav on scroll
const sections = [...document.querySelectorAll('section[id]')];
const navA = [...document.querySelectorAll('.links a')];
window.addEventListener('scroll', () => {
  const y = window.scrollY + 140;
  let cur = sections[0]?.id;
  sections.forEach(s => { if (s.offsetTop <= y) cur = s.id; });
  navA.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur));
});

// Reveal on scroll
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('vis'); io.unobserve(e.target); }
}), { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Faint binary drift background
const c = document.getElementById('bg'), x = c.getContext('2d');
let pts = [];
function resize() {
  c.width = innerWidth; c.height = innerHeight;
  pts = Array.from({ length: Math.min(90, innerWidth / 14) }, () => ({
    x: Math.random() * c.width, y: Math.random() * c.height,
    s: Math.random() * .35 + .1, t: Math.random() > .5 ? '1' : '0',
    o: Math.random() * Math.PI * 2
  }));
}
resize(); addEventListener('resize', resize);
(function anim() {
  x.clearRect(0, 0, c.width, c.height);
  x.font = '11px Inter, sans-serif';
  pts.forEach(p => {
    p.y += p.s; p.o += .008; if (p.y > c.height + 12) { p.y = -12; p.x = Math.random() * c.width; }
    x.globalAlpha = .05 + Math.abs(Math.sin(p.o)) * .09;
    x.fillStyle = '#7dd3fc';
    x.fillText(p.t, p.x, p.y);
  });
  requestAnimationFrame(anim);
})();
