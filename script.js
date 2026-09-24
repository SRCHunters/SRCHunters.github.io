// бургер + плавное появление блоков
(function () {
  var burger = document.getElementById('burger');
  var nav = document.getElementById('navLinks');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('open');
      });
    });
  }

  // reveal on scroll
  var els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  if (!('IntersectionObserver' in window)) {
    els.forEach(function (el) { el.classList.add('vis'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('vis'); io.unobserve(e.target); }
    });
  }, { threshold: 0.08 });
  els.forEach(function (el) { io.observe(el); });

  // страховка: если observer по какой-то причине не сработал — показать всё через 1.5с,
  // чтобы страница никогда не осталась пустой
  setTimeout(function () {
    document.querySelectorAll('.reveal:not(.vis)').forEach(function (el) { el.classList.add('vis'); });
  }, 1500);
})();
