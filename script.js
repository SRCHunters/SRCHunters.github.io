// Mobile menu (only on pages that have it)
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
if (burger && navLinks) {
  burger.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => navLinks.classList.remove('open'))
  );
}

// Active nav on scroll (only anchor navs)
const sections = [...document.querySelectorAll('main section[id]')];
const navA = [...document.querySelectorAll('.links a[href^="#"]')];
if (sections.length && navA.length) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY + 140;
    let cur = sections[0].id;
    sections.forEach(s => { if (s.offsetTop <= y) cur = s.id; });
    navA.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur));
  });
}

// Reveal on scroll
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('vis'); io.unobserve(e.target); }
}), { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Light-blue drift background
const c = document.getElementById('bg'), x = c ? c.getContext('2d') : null;
let pts = [];
function resize() {
  if (!c) return;
  c.width = innerWidth; c.height = innerHeight;
  pts = Array.from({ length: Math.min(110, innerWidth / 12) }, () => ({
    x: Math.random() * c.width, y: Math.random() * c.height,
    r: Math.random() * 2 + .6, s: Math.random() * .4 + .12,
    o: Math.random() * Math.PI * 2
  }));
}
if (c && x) {
  resize(); addEventListener('resize', resize);
  x.font = '11px Inter, sans-serif';
  (function anim() {
    x.clearRect(0, 0, c.width, c.height);
    pts.forEach(p => {
      p.y += p.s; p.o += .008; if (p.y > c.height + 12) { p.y = -12; p.x = Math.random() * c.width; }
      x.globalAlpha = .05 + Math.abs(Math.sin(p.o)) * .09;
      x.fillStyle = '#7dd3fc';
      x.beginPath(); x.arc(p.x, p.y, p.r, 0, 7); x.fill();
    });
    requestAnimationFrame(anim);
  })();
}
