const { loginUser, registerUser } = require('./auth')
const { getUser } = require('./localStorage')

describe('loginUser', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should return an error if the username does not exist', () => {
    const result = loginUser('nonexistent', 'password')
    expect(result).toEqual({ success: false, message: 'Username not found.' })
  })

  it('should return an error if the password is incorrect', () => {
    registerUser('testuser', 'password123')
    const result = loginUser('testuser', 'wrongpassword')
    expect(result).toEqual({ success: false, message: 'Incorrect password.' })
  })

  it('should return a success message and user object if the login is successful', () => {
    registerUser('testuser', 'password123')
    const result = loginUser('testuser', 'password123')
    const user = getUser('testuser')
    expect(result).toEqual({ success: true, user })
  })
})

describe('registerUser', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should return an error if the username already exists', () => {
    registerUser('testuser', 'password123')
    const result = registerUser('testuser', 'password123')
    expect(result).toEqual({ success: false, message: 'Username already exists.' })
  })

  it('should return a success message if the registration is successful', () => {
    const result = registerUser('testuser', 'password123')
    expect(result).toEqual({ success: true, message: 'Registration successful!' })
  })
})
