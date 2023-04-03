const { getUser, saveUser, showAlert } = require('./utils')

describe('getUser', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should return null if the user does not exist', () => {
    const user = getUser('nonexistent')
    expect(user).toBeNull()
  })

  it('should return the user object if the user exists', () => {
    const testUser = {
      username: 'testuser',
      password: 'password123',
      tasks: [],
    }

    saveUser(testUser)

    const user = getUser('testuser')

    expect(user).toEqual(testUser)
  })
})
