document.addEventListener('DOMContentLoaded', function () {
  let modalLinks = document.querySelectorAll('[data-modal]');
  let closeModalLinks = document.querySelectorAll('[data-close-modal]');
  let modalContainer = document.getElementById('modal-container');
  
  modalLinks.forEach((element) => {
    element.addEventListener('click', function (event) {
      openModal(element.dataset.modal);
    });
  });

  modalContainer.addEventListener('click', function (event) {
    if (this === event.target) {
      closeModal();
    }
  });

  closeModalLinks.forEach((closeLink) => {
    closeLink.addEventListener('click', function(event) {
      closeModal();
    });
  });
});

function openModal(modalid) {
  let body = document.getElementsByTagName('body')[0];
  let modal = document.getElementById(modalid);

  body.classList.add('open-modal');
  modal.classList.add('opened');
}

function closeModal() {
  let body = document.getElementsByTagName('body')[0];
  let modals = document.querySelectorAll('.modal.opened');
  let modalContainer = document.getElementById('modal-container');

  body.classList.add('close-modal');
  
  modalContainer.addEventListener('transitionend', function reset(event) {
    body.classList.remove('open-modal');
    body.classList.remove('close-modal');
  
    modals.forEach((modal) => {
      modal.classList.remove('opened');
    });

    this.removeEventListener('transitionend', reset);
  });
}