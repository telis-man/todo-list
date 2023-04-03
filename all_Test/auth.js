const { getUser, saveUser } = require('./localStorage')

function loginUser(username, password) {
  const user = getUser(username)

  if (!user) {
    return { success: false, message: 'Username not found.' }
  }

  if (user.password !== password) {
    return { success: false, message: 'Incorrect password.' }
  }

  return { success: true, user }
}

function registerUser(username, password) {
  if (getUser(username)) {
    return { success: false, message: 'Username already exists.' }
  }

  const newUser = { username, password, tasks: [] }
  saveUser(newUser)
  return { success: true, message: 'Registration successful!' }
}

module.exports = {
  loginUser,
  registerUser,
}
