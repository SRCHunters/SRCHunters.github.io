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
  const y = window.scrollY + 120;
  let cur = sections[0]?.id;
  sections.forEach(s => { if (s.offsetTop <= y) cur = s.id; });
  navA.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur));
  document.getElementById('nav').style.boxShadow = window.scrollY > 10 ? '0 10px 30px #ec489922' : 'none';
});

// Reveal on scroll
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('vis'); io.unobserve(e.target); }
}), { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Pink petals canvas
const c = document.getElementById('petals'), x = c.getContext('2d');
let stars = [];
function resize() {
  c.width = innerWidth; c.height = innerHeight;
  stars = Array.from({ length: Math.min(120, innerWidth / 10) }, () => ({
    x: Math.random() * c.width, y: Math.random() * c.height,
    r: Math.random() * 2.2 + .6, s: Math.random() * .5 + .15,
    o: Math.random() * Math.PI * 2
  }));
}
resize(); addEventListener('resize', resize);
(function anim() {
  x.clearRect(0, 0, c.width, c.height);
  stars.forEach(st => {
    st.y += st.s; st.o += .01; if (st.y > c.height) st.y = 0;
    x.globalAlpha = .25 + Math.abs(Math.sin(st.o)) * .35;
    x.fillStyle = '#ec4899';
    x.beginPath(); x.arc(st.x, st.y, st.r, 0, 7); x.fill();
  });
  requestAnimationFrame(anim);
})();
