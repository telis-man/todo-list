import 'bootstrap/dist/js/bootstrap.min.js'
import { fetchUser } from './fetchUser'
import { generateRegisterForm } from './generators'
import { fetchUsers } from './fetchUser'
import { addNewUser } from './fetchUser'

// let objArr = [
//   {
//     username: 'mantas1',
//     password: 'password',
//     content: 'agnoisfnoaisjf',
//   },
//   {
//     username: 'mantas2',
//     password: 'password',
//     content: 'rkjtykytjet',
//   },
// ]

// localStorage.setItem('users', JSON.stringify(objArr))
// sessionStorage.setItem('username', 'mantas1')

window.addEventListener('DOMContentLoaded', () => {
  if (sessionStorage.getItem('user')) {
    //If Logged in
    // window.location.href = 'main.html'
  }

  document.querySelector('form').addEventListener('submit', e => {
    //Login
    e.preventDefault()
    if (fetchUser(e.target.formUsername.value, e.target.formPassword.value)) {
      const userObj = fetchUser(e.target.formUsername.value, e.target.formPassword.value)
      sessionStorage.setItem('user', JSON.stringify(userObj))
      window.location.href = 'main.html'
    } else {
      console.log('Incorrect username or password')
    }
  })
  document.querySelector('.buttonRegister').addEventListener('click', () => {
    generateRegisterForm()

    document.querySelector('.registerButtonNewUser').addEventListener('click', () => {
      let username = document.querySelector('.usernameInputEelement')
      let password = document.querySelector('.passwordInputEelement')
      let passwordRepeat = document.querySelector('.passwordRepeatInputEelement')
      if (password.value == passwordRepeat.value) {
        let usersArr = fetchUsers() || []

        if (!usersArr.map(user => user.username).includes(username.value)) {
          let newUserObj = {
            username: username.value,
            password: password.value,
            content: [],
          }
          addNewUser(newUserObj)
          location.reload()
        } else {
          console.log('Username is already in use')
          username.value = ''
        }
      } else {
        console.log('Passwords do not match')
        password.value = ''
        passwordRepeat.value = ''
      }
    })
  })
})
