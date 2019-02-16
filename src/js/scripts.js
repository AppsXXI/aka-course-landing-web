document.addEventListener('DOMContentLoaded', function () {
  var elementsDisabled = document.querySelectorAll('.enable-on-load');

  elementsDisabled.forEach(function (element) {
    element.removeAttribute('disabled');
  });
});

document.addEventListener('scroll', function (event) {
  var body = document.body;
  var html = document.documentElement;
  var scrollTop = body.scrollTop || html.scrollTop;
  var windowHeight = window.outerHeight;
  var firstNav = document.querySelector('.first-nav');

  // console.log(windowHeight)
  if (scrollTop >= windowHeight) {
    firstNav.classList.add('scrolling');
  } else {
    firstNav.classList.remove('scrolling');
  }
});