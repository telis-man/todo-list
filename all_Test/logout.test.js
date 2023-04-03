const { logout, displayLoggedOutSection, setupLogout } = require('./logout')

describe('logout', () => {
  const originalLocalStorage = global.localStorage
  let registrationContainer, loginContainer, logoutContainer, todoTitle, loggedInSection

  beforeEach(() => {
    global.localStorage = {
      removeItem: jest.fn(),
    }

    registrationContainer = { style: { display: '' } }
    loginContainer = { style: { display: '' } }
    logoutContainer = { style: { display: '' } }
    todoTitle = { style: { display: '' } }
    loggedInSection = { style: { display: '' } }
  })

  afterEach(() => {
    global.localStorage = originalLocalStorage
  })

  test('removes loggedInUserKey from localStorage', () => {
    const loggedInUserKey = 'testLoggedInUserKey'
    logout(loggedInUserKey, registrationContainer, loginContainer, logoutContainer, todoTitle, loggedInSection)

    expect(localStorage.removeItem).toHaveBeenCalledWith(loggedInUserKey)
  })
})

describe('displayLoggedOutSection', () => {
  let registrationContainer, loginContainer, logoutContainer, todoTitle, loggedInSection

  beforeEach(() => {
    registrationContainer = { style: { display: '' } }
    loginContainer = { style: { display: '' } }
    logoutContainer = { style: { display: '' } }
    todoTitle = { style: { display: '' } }
    loggedInSection = { style: { display: '' } }
  })

  test('updates display properties for logout', () => {
    displayLoggedOutSection(registrationContainer, loginContainer, logoutContainer, todoTitle, loggedInSection)

    expect(registrationContainer.style.display).toBe('block')
    expect(loginContainer.style.display).toBe('block')
    expect(logoutContainer.style.display).toBe('none')
    expect(todoTitle.style.display).toBe('none')
    expect(loggedInSection.style.display).toBe('none')
  })
})

describe('setupLogout', () => {
  test('adds click event listener to logout button', () => {
    const logoutButton = {
      addEventListener: jest.fn(),
    }
    const loggedInUserKey = 'testLoggedInUserKey'

    setupLogout(logoutButton, loggedInUserKey)

    expect(logoutButton.addEventListener).toHaveBeenCalledWith('click', expect.any(Function))
  })
})
