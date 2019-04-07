document.addEventListener('DOMContentLoaded', function () {
  var modalLinks = document.querySelectorAll('[data-modal]');
  var closeModalLinks = document.querySelectorAll('[data-close-modal]');
  var modalContainer = document.getElementById('modal-container');
  
  modalLinks.forEach(function (element) {
    element.addEventListener('click', function (event) {
      openModal(element.dataset.modal);
    });
  });

  modalContainer.addEventListener('click', function (event) {
    if (this === event.target) {
      closeModal();
    }
  });

  closeModalLinks.forEach(function (closeLink) {
    closeLink.addEventListener('click', function(event) {
      closeModal();
    });
  });
});

function openModal(modalid) {
  var body = document.getElementsByTagName('body')[0];
  var modal = document.getElementById(modalid);

  body.classList.add('open-modal');
  modal.classList.add('opened');
}

function closeModal() {
  var body = document.getElementsByTagName('body')[0];
  var modals = document.querySelectorAll('.modal.opened');
  var modalContainer = document.getElementById('modal-container');

  if (modals.length) {
    body.classList.add('close-modal');
    
    modalContainer.addEventListener('transitionend', function reset(event) {
      body.classList.remove('open-modal');
      body.classList.remove('close-modal');
      
      modals.forEach(function (modal) {
        modal.classList.remove('opened');
      });
      
      this.removeEventListener('transitionend', reset);
    });
  }
}