const logoutButton = document.getElementById('logout-button')
import { registrationContainer } from './login'
import { loginContainer } from './login'
import { loggedInUserKey } from './global'
logoutButton.addEventListener('click', () => {
  loggedInUser = null
  localStorage.removeItem(loggedInUserKey)
  displayLoggedOutSection()
})

function displayLoggedOutSection() {
  registrationContainer.style.display = 'block'
  loginContainer.style.display = 'block'
  document.getElementById('logout-container').style.display = 'none'
  document.getElementById('todo-title').style.display = 'none'
  document.getElementById('logged-in-section').style.display = 'none'
}
