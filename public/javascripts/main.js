import { initDeleteModal, initEditModal, initAddUserButton } from "./tableActions.js";

// Expose to global scope for onclick handlers
window.initDeleteModal = initDeleteModal;
window.initEditModal = initEditModal;
window.initAddUserButton = initAddUserButton;

document.addEventListener("DOMContentLoaded", () => {
  initDeleteModal();
  initEditModal();
  initAddUserButton();
});
