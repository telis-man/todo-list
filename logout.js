const logoutButton = document.getElementById("logout-button");
const registrationContainer = document.getElementById("registration-container");
const loginContainer = document.getElementById("login-container");

logoutButton.addEventListener("click", () => {
  loggedInUser = null;
  localStorage.removeItem("loggedIn"); // Remove the user's login state
  displayLoggedOutSection();
});

function displayLoggedOutSection() {
  registrationContainer.style.display = "block";
  loginContainer.style.display = "block";
  document.getElementById("logout-container").style.display = "none";
  document.getElementById("todo-title").style.display = "none";
  document.getElementById("logged-in-section").style.display = "none";
}
