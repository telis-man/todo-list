function displayLoggedOutSection(registrationContainer, loginContainer, logoutContainer, todoTitle, loggedInSection) {
  registrationContainer.style.display = 'block'
  loginContainer.style.display = 'block'
  logoutContainer.style.display = 'none'
  todoTitle.style.display = 'none'
  loggedInSection.style.display = 'none'
}

function logout(loggedInUserKey, registrationContainer, loginContainer, logoutContainer, todoTitle, loggedInSection) {
  localStorage.removeItem(loggedInUserKey)
  displayLoggedOutSection(registrationContainer, loginContainer, logoutContainer, todoTitle, loggedInSection)
}

function setupLogout(
  logoutButton,
  loggedInUserKey,
  registrationContainer,
  loginContainer,
  logoutContainer,
  todoTitle,
  loggedInSection,
) {
  logoutButton.addEventListener('click', () => {
    logout(loggedInUserKey, registrationContainer, loginContainer, logoutContainer, todoTitle, loggedInSection)
  })
}

module.exports = { logout, displayLoggedOutSection, setupLogout }
