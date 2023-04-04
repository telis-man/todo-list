import { deleteTask } from './fetchUser'
import { addTask } from './fetchUser'
import { updateTask } from './fetchUser'

export function generateRegisterForm() {
  document.querySelector('.buttonLogin').remove()
  document.querySelector('.buttonRegister').remove()
  let formElement = document.querySelector('form')

  let repeatPasswordDiv = document.createElement('div')
  repeatPasswordDiv.classList.add('form-group')
  let repeatPasswordLabel = document.createElement('label')
  repeatPasswordLabel.textContent = 'Repeat Password'
  let repeatPasswordInput = document.createElement('input')
  repeatPasswordInput.classList.add('form-control', 'passwordRepeatInputEelement')
  repeatPasswordInput.setAttribute('placeholder', 'Repeat Password')
  repeatPasswordInput.setAttribute('type', 'password')
  let buttonElementRegister = document.createElement('button')
  buttonElementRegister.classList.add('registerButtonNewUser', 'btn', 'btn-primary')
  buttonElementRegister.textContent = 'Register'
  buttonElementRegister.setAttribute('type', 'button')
  let buttonElementBack = document.createElement('button')
  buttonElementBack.classList.add('btn-secondary', 'btn', 'float-end')
  buttonElementBack.textContent = 'Back to Login'
  buttonElementBack.addEventListener('click', () => {
    location.reload()
  })
  repeatPasswordDiv.append(repeatPasswordLabel, repeatPasswordInput)
  formElement.append(repeatPasswordDiv, buttonElementRegister, buttonElementBack)
}

function editControl(editButton, cardBody, card, task, saveButton) {
  editButton.addEventListener('click', () => {
    let editTaskInput = document.createElement('input')
    editTaskInput.className = 'form-control'
    let text = cardBody.textContent
    editTaskInput.value = text
    saveButton.disabled = false
    editButton.disabled = true
    cardBody.textContent = ''
    cardBody.prepend(editTaskInput)

    saveButton.addEventListener('click', () => {
      updateTask(text, editTaskInput.value)
      saveButton.disabled = true
      cardBody.textContent = editTaskInput.value
      editButton.disabled = false
      editTaskInput.remove()
    })
  })
}

function deleteControl(deleteButton, card, cardBody) {
  deleteButton.addEventListener('click', () => {
    deleteTask(cardBody.textContent)
    card.remove()
  })
}

export function generateTaskItem(task) {
  let card = document.createElement('div')
  card.className = 'card d-flex flex-row align-items-center mt-3'

  let cardBody = document.createElement('div')
  cardBody.className = 'card-body'
  cardBody.textContent = task

  let editButton = document.createElement('button')
  editButton.className = 'btn d-block btn-sm btn-outline-primary'
  editButton.textContent = 'Edit'

  let deleteButton = document.createElement('button')
  deleteButton.className = 'btn btn-default btn-sm btn-outline-danger'
  deleteButton.textContent = 'Delete'

  let saveButton = document.createElement('button')
  saveButton.className = 'btn btn-default btn-sm btn-outline-success'
  saveButton.textContent = 'Save'
  saveButton.disabled = true

  editControl(editButton, cardBody, card, task, saveButton)
  deleteControl(deleteButton, card, cardBody)

  card.append(cardBody, editButton, deleteButton, saveButton)

  document.querySelector('.container').append(card)
}
