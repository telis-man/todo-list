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
function loadTasks() {
  document.getElementById('task-list').innerHTML = ''
  loggedInUser.tasks.forEach(taskText => {
    const listItem = createTaskItem(taskText)
    document.getElementById('task-list').appendChild(listItem)
  })
}

// Flip-btn

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

const addTaskForm = document.getElementById('add-task-form')
const taskList = document.getElementById('task-list')

addTaskForm.addEventListener('submit', e => {
  e.preventDefault()

  if (!loggedInUser) {
    alert('Please log in to add tasks.')
    return
  }

  const taskInput = document.getElementById('task-input')
  const taskText = taskInput.value.trim()

  if (taskText) {
    const listItem = createTaskItem(taskText)
    taskList.appendChild(listItem)
    taskInput.value = ''

    loggedInUser.tasks.push(taskText)
    saveUser(loggedInUser)
  }
})

// task functions
// Create a task list item
function createTaskItem(taskText) {
  const listItem = document.createElement('li')
  const textNode = document.createElement('span')
  textNode.textContent = taskText

  const buttonsContainer = document.createElement('div')
  buttonsContainer.style.display = 'inline-block'
  buttonsContainer.style.marginLeft = '10px'

  const likeButton = document.createElement('i')
  likeButton.className = 'fas fa-thumbs-up like-icon'
  likeButton.addEventListener('click', () => {
    listItem.classList.toggle('favorite')
  })

  const editButton = document.createElement('button')
  editButton.textContent = 'Edit'
  editButton.classList.add('edit-button')
  editButton.addEventListener('click', () => {
    editTask(listItem, editButton)
  })

  const deleteButton = document.createElement('button')
  deleteButton.textContent = 'Delete'
  deleteButton.classList.add('delete-button')
  deleteButton.addEventListener('click', () => {
    deleteTask(listItem)
  })

  buttonsContainer.appendChild(likeButton)
  buttonsContainer.appendChild(editButton)
  buttonsContainer.appendChild(deleteButton)

  listItem.appendChild(textNode)
  listItem.appendChild(buttonsContainer)

  return listItem
}

// Edit task in place
function editTask(listItem, editButton) {
  const textNode = listItem.childNodes[0]
  const currentText = textNode.textContent

  const input = document.createElement('input')
  input.type = 'text'
  input.value = currentText

  listItem.replaceChild(input, textNode)

  const saveButton = document.createElement('button')
  saveButton.textContent = 'Save'
  saveButton.classList.add('save-button')
  saveButton.addEventListener('click', () => {
    updateTask(listItem, input, saveButton, editButton, currentText)
  })

  const buttonsContainer = listItem.childNodes[1]
  buttonsContainer.replaceChild(saveButton, editButton)

  input.focus()
}
module.exports = editTask
// Update task with the new text
function updateTask(listItem, input, saveButton, editButton, oldText) {
  const newText = input.value.trim()

  if (newText) {
    const textNode = document.createTextNode(newText)
    listItem.replaceChild(textNode, input)

    const taskIndex = loggedInUser.tasks.indexOf(oldText)
    if (taskIndex !== -1) {
      loggedInUser.tasks[taskIndex] = newText
      saveUser(loggedInUser)
    }
  } else {
    listItem.remove()
  }

  const buttonsContainer = listItem.childNodes[1]
  buttonsContainer.replaceChild(editButton, saveButton)
}

// Delete task
function deleteTask(listItem) {
  const taskText = listItem.childNodes[0].textContent

  const taskIndex = loggedInUser.tasks.indexOf(taskText)
  if (taskIndex !== -1) {
    loggedInUser.tasks.splice(taskIndex, 1)
    saveUser(loggedInUser)
  }

  listItem.remove()
}

module.exports = deleteTask

//script.js

// task.js

// // Add a new task

addTaskForm.addEventListener('submit', e => {
  e.preventDefault()

  if (!loggedInUser) {
    alert('Please log in to add tasks.')
    return
  }

  const taskInput = document.getElementById('task-input')
  const taskText = taskInput.value.trim()

  if (taskText) {
    const listItem = createTaskItem(taskText)
    taskList.appendChild(listItem)
    taskInput.value = ''

    loggedInUser.tasks.push(taskText)
    saveUser(loggedInUser)
  }
})

module.exports = createTaskItem

//task.js
//login.js

const loginForm = document.getElementById('login-form')
const registrationContainer = document.getElementById('registration-container')
const loginContainer = document.getElementById('login-container')

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
  localStorage.setItem(loggedInUserKey, JSON.stringify(loggedInUser))
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

//login.js
//global.js

const loggedInUserKey = 'loggedInUser'
const usersKey = 'users'
const loggedInSection = document.getElementById('logged-in-section')
const todoTitle = document.getElementById('todo-title')

document.addEventListener('DOMContentLoaded', () => {
  const loggedIn = localStorage.getItem(loggedInUserKey)

  if (loggedIn) {
    loggedInUser = JSON.parse(localStorage.getItem(loggedInUserKey))
    loadTasks()
    displayLoggedInSection()
  }
})

//global.js
//registration.js
const registrationForm = document.getElementById('registration-form')

registrationForm.addEventListener('submit', e => {
  e.preventDefault()

  const username = document.getElementById('register-username').value
  const password = document.getElementById('register-password').value

  if (getUser(username)) {
    showAlert('Username already exists.', 'error', 'registration')
    return
  }

  saveUser({ username, password })
  showAlert('Registration successful!', 'success', 'registration')
  registrationForm.reset()
})
//registration.js

//logout.js

const logoutButton = document.getElementById('logout-button')

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
//logout.js
