const loggedInUserKey = "loggedInUser";
const usersKey = "users";

function displayLoggedInSection() {
  registrationContainer.style.display = "none";
  loginContainer.style.display = "none";
  document.getElementById("logout-container").style.display = "block";
  document.getElementById("todo-title").style.display = "block";
  document.getElementById("logged-in-section").style.display = "block";
}

document.addEventListener("DOMContentLoaded", () => {
  const loggedIn = localStorage.getItem(loggedInUserKey);

  if (loggedIn) {
    loggedInUser = JSON.parse(localStorage.getItem(loggedInUserKey));
    loadTasks();
    displayLoggedInSection();
  }
});
