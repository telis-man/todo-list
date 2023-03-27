const loggedInUserKey = "loggedInUser";
const usersKey = "users";
const loggedInSection = document.getElementById("logged-in-section");
const todoTitle = document.getElementById("todo-title");

// Check if the user is logged in on page load
document.addEventListener("DOMContentLoaded", () => {
  const loggedIn = localStorage.getItem("loggedIn");

  if (loggedIn) {
    loggedInUser = JSON.parse(localStorage.getItem(loggedInUserKey));
    loadTasks();
    displayLoggedInSection();
  }
});
