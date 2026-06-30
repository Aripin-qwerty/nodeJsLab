const addUserButton = document.getElementById("add-user-btn");

export function initDeleteModal() {
  const deleteButtons = document.querySelectorAll(".delete-btn");
  const deleteForm = document.getElementById("delete-form");

  deleteButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      const userId = btn.dataset.id;

      // Set the form action to the delete endpoint with user ID
      deleteForm.action = `/user/${userId}?_method=DELETE`;

      // Show the modal
      if (my_modal_1) {
        my_modal_1.showModal();
      }
    });
  });
}

export function initAddUserButton() {
  const addUserBtn = document.getElementById("init-add-user-btn");
  const userForm = document.getElementById("user-form");
  const modalTitle = document.getElementById("modal-title");
  const usernameInput = document.getElementById("username-input");
  const emailInput = document.getElementById("email-input");
  const roleInput = document.getElementById("role-input");
  const passwordInput = document.getElementById("password-input");

  if (addUserBtn) {
    addUserBtn.addEventListener("click", (e) => {
      e.preventDefault();

      // Reset modal title
      modalTitle.textContent = "Create User";

      // Reset form fields
      usernameInput.value = "";
      emailInput.value = "";
      roleInput.value = "";
      passwordInput.value = "";

      // Reset form action to create endpoint
      userForm.action = "/user";

      // Reset textcontext button
      addUserButton.textContent = "Add";

      // Show the modal
      if (my_modal_3) {
        my_modal_3.showModal();
      }
    });
  }
}

export function initEditModal() {
  const editButtons = document.querySelectorAll(".edit-btn");
  const userForm = document.getElementById("user-form");
  const modalTitle = document.getElementById("modal-title");
  const usernameInput = document.getElementById("username-input");
  const emailInput = document.getElementById("email-input");
  const roleInput = document.getElementById("role-input");
  const passwordInput = document.getElementById("password-input");

  editButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      const userId = btn.dataset.id;
      const username = btn.dataset.username;
      const email = btn.dataset.email;
      const role = btn.dataset.role;

      // Update modal title
      modalTitle.textContent = "Edit User";

      // Populate form fields
      usernameInput.value = username;
      emailInput.value = email;
      roleInput.value = role;
      passwordInput.value = "";

      // Update form action to edit endpoint
      userForm.action = `/user/${userId}?_method=PUT`;

      // Update textcontext button
      addUserButton.textContent = "Update";

      // Show the modal
      if (my_modal_3) {
        my_modal_3.showModal();
      }
    });
  });
}
