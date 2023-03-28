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
