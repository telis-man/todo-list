export function getUser(username) {
  const users = JSON.parse(localStorage.getItem('users')) || {}
  return users[username]
}

export function saveUser(user) {
  const users = JSON.parse(localStorage.getItem('users')) || {}
  user.tasks = user.tasks || []
  users[user.username] = user
  localStorage.setItem('users', JSON.stringify(users))
}
export function showAlert(message, className, formType) {
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
