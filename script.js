function getUser(username) {
  const users = JSON.parse(localStorage.getItem('users')) || {}
  return users[username]
}

function saveUser(user) {
  const users = JSON.parse(localStorage.getItem('users')) || {}
  user.tasks = user.tasks || []
  users[user.username] = user
  localStorage.setItem('users', JSON.stringify(users))
}
function showAlert(message, className, formType) {
  const alertContainer = document.getElementById(`${formType}-alert`)

  // Update the alert container content
  alertContainer.textContent = message
  alertContainer.classList.add(className)
  alertContainer.style.display = 'block'

  // Remove the alert message after 3 seconds
  setTimeout(() => {
    alertContainer.textContent = ''
    alertContainer.classList.remove(className)
    alertContainer.style.display = 'none'
  }, 3000)
}

// Display or hide authentication forms and logout button based on user's login status
function displayAuthElements() {
  const authContainer = document.getElementById('auth-container')
  const logoutContainer = document.getElementById('logout-container')

  if (loggedInUser) {
    authContainer.style.display = 'none'
    logoutContainer.style.display = 'block'
  } else {
    authContainer.style.display = 'block'
    logoutContainer.style.display = 'none'
  }
}

// Load tasks for the loggedInUser
export function loadTasks() {
  taskList.innerHTML = ''
  loggedInUser.tasks.forEach(taskText => {
    const listItem = createTaskItem(taskText)
    taskList.appendChild(listItem)
  })
}

Flip - btn

document.querySelectorAll('.flip-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    var card = document.querySelector('.card')
    card.classList.toggle('flipped')
    btn.style.display = 'none'
  })
})

document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', function (event) {
    event.preventDefault()
    var flipBtn = form.querySelector('.flip-btn')
    if (flipBtn) {
      flipBtn.style.display = 'block'
    }
  })
})

document.getElementById('logged-in-section').classList.add('fade-in')
