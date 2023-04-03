function getUser(username) {
  const users = JSON.parse(localStorage.getItem('users')) || {}
  return users[username] || null
}

function saveUser(user) {
  const users = JSON.parse(localStorage.getItem('users')) || {}
  user.tasks = user.tasks || []
  users[user.username] = user
  localStorage.setItem('users', JSON.stringify(users))
}

function showAlert(message, className, formType) {
  const alertContainer = document.getElementById(`${formType}-alert`)

  alertContainer.textContent = message
  alertContainer.classList.add(className)
  alertContainer.style.display = 'block'

  setTimeout(() => {
    alertContainer.textContent = ''
    alertContainer.classList.remove(className)
    alertContainer.style.display = 'none'
  }, 3000)
}

module.exports = {
  getUser,
  saveUser,
  showAlert,
}
