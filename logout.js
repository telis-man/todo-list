const logoutButton = document.getElementById("logout-button");
logoutButton.addEventListener("click", () => {
  loggedInUser = null;
  displayLoggedOutSection();
});

function displayLoggedOutSection() {
  registrationContainer.style.display = "block";
  loginContainer.style.display = "block";
  document.getElementById("logout-container").style.display = "none";
  document.getElementById("todo-title").style.display = "none";
  document.getElementById("logged-in-section").style.display = "none";
}
