document.addEventListener('DOMContentLoaded', function () {
  let elementsDisabled = document.querySelectorAll('.enable-on-load');

  elementsDisabled.forEach((element) => {
    element.removeAttribute('disabled');
  });
});