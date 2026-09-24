// меню на мобилке. больше тут ничего и не надо, сайт статика.
(function () {
  var burger = document.getElementById('burger');
  var nav = document.getElementById('navLinks');
  if (!burger || !nav) return;
  burger.addEventListener('click', function () {
    nav.classList.toggle('open');
  });
  nav.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      nav.classList.remove('open');
    });
  });
})();
