const loggedInUserKey = 'loggedInUser'
const usersKey = 'users'
const loggedInSection = document.getElementById('logged-in-section')
const todoTitle = document.getElementById('todo-title')

function displayLoggedInSection() {
  registrationContainer.style.display = 'none'
  loginContainer.style.display = 'none'
  document.getElementById('logout-container').style.display = 'block'
  document.getElementById('todo-title').style.display = 'block'
  document.getElementById('logged-in-section').style.display = 'block'
}

document.addEventListener('DOMContentLoaded', () => {
  const loggedIn = localStorage.getItem(loggedInUserKey)

  if (loggedIn) {
    loggedInUser = JSON.parse(localStorage.getItem(loggedInUserKey))
    loadTasks()
    displayLoggedInSection()
  }
})
