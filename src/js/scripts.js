document.addEventListener('DOMContentLoaded', function () {
  var elementsDisabled = document.querySelectorAll('.enable-on-load');

  elementsDisabled.forEach(function (element) {
    element.removeAttribute('disabled');
  });
});