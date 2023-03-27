const loginForm = document.getElementById('login-form')
const registrationContainer = document.getElementById('registration-container')
const loginContainer = document.getElementById('login-container')
import { loadTasks } from './script'

loginForm.addEventListener('submit', e => {
  e.preventDefault()

  const username = document.getElementById('login-username').value
  const password = document.getElementById('login-password').value

  const user = getUser(username)

  if (!user) {
    showAlert('Username not found.', 'error', 'login')
    return
  }

  if (user.password !== password) {
    showAlert('Incorrect password.', 'error', 'login')
    return
  }

  loggedInUser = user
  showAlert('Login successful!', 'success', 'login')
  loginForm.reset()
  loadTasks()
  displayLoggedInSection()
})

function displayLoggedInSection() {
  registrationContainer.style.display = 'none'
  loginContainer.style.display = 'none'
  document.getElementById('logout-container').style.display = 'block'
  document.getElementById('todo-title').style.display = 'block'
  document.getElementById('logged-in-section').style.display = 'block'
}
