function openModal(e){var t=document.getElementsByTagName("body")[0],n=document.getElementById(e);t.classList.add("open-modal"),n.classList.add("opened")}function closeModal(){var n=document.getElementsByTagName("body")[0],o=document.querySelectorAll(".modal.opened"),e=document.getElementById("modal-container");n.classList.add("close-modal"),e.addEventListener("transitionend",function e(t){n.classList.remove("open-modal"),n.classList.remove("close-modal"),o.forEach(function(e){e.classList.remove("opened")}),this.removeEventListener("transitionend",e)})}document.addEventListener("DOMContentLoaded",function(){var e=document.querySelectorAll("[data-modal]"),t=document.querySelectorAll("[data-close-modal]"),n=document.getElementById("modal-container");e.forEach(function(t){t.addEventListener("click",function(e){openModal(t.dataset.modal)})}),n.addEventListener("click",function(e){this===e.target&&closeModal()}),t.forEach(function(e){e.addEventListener("click",function(e){closeModal()})})}),document.addEventListener("DOMContentLoaded",function(){document.querySelectorAll(".enable-on-load").forEach(function(e){e.removeAttribute("disabled")})});