import { deleteTask } from './fetchUser'
import { addTask } from './fetchUser'
import { updateTask } from './fetchUser'
import { toggleLikeStatus } from './fetchUser'

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

// function editControl(editButton, cardBody, card, task, saveButton) {
//   editButton.addEventListener('click', () => {
//     let editTaskInput = document.createElement('input')
//     editTaskInput.className = 'form-control'
//     let text = cardBody.textContent
//     editTaskInput.value = text
//     saveButton.disabled = false
//     editButton.disabled = true
//     cardBody.textContent = ''
//     cardBody.prepend(editTaskInput)

//     saveButton.addEventListener('click', () => {
//       updateTask(text, editTaskInput.value)
//       saveButton.disabled = true
//       cardBody.textContent = editTaskInput.value
//       editButton.disabled = false
//       editTaskInput.remove()
//     })
//   })
// }

// function deleteControl(deleteButton, card, cardBody) {
//   deleteButton.addEventListener('click', () => {
//     deleteTask(cardBody.textContent)
//     card.remove()
//   })
// }

export function generateTaskItem(task, likeStatus) {
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

  // editControl(editButton, cardBody, card, task, saveButton)
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
  // deleteControl(deleteButton, card, cardBody)

  deleteButton.addEventListener('click', () => {
    deleteTask(cardBody.textContent)
    card.remove()
  })

  //heart button
  let heartButton = document.createElement('i')
  likeStatus
    ? (heartButton.className = 'fa-sharp fa-solid fa-heart')
    : (heartButton.className = 'fa-sharp fa-regular fa-heart')
  heartButton.style.color = 'red'
  heartButton.style.transform = 'translate(40px)'
  heartButton.style.fontSize = '1.5em'

  heartButton.addEventListener('click', () => {
    heartButton.classList.toggle('fa-regular')
    heartButton.classList.toggle('fa-solid')
    toggleLikeStatus(cardBody.textContent)
  })

  // <i class="fa-sharp fa-solid fa-heart"></i>
  // <i class="fa-sharp fa-regular fa-heart"></i>
  card.append(cardBody, editButton, deleteButton, saveButton, heartButton)
  document.querySelector('.addTaskContainer').after(card)
}
