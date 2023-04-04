export function fetchUser(username, password) {
  if (localStorage.getItem('users')) {
    const usersArr = JSON.parse(localStorage.getItem('users'))
    for (user of usersArr) {
      if (user.username === username && user.password === password) {
        return user
      }
    }
  } else {
    // window.location.href = 'loginForm.html'
  }
}

export function fetchUsers() {
  return JSON.parse(localStorage.getItem('users'))
}

export function addNewUser(userObj, username) {
  let users = JSON.parse(localStorage.getItem('users')) || []
  users.push(userObj)
  localStorage.setItem('users', JSON.stringify(users))
}
//const newArr = arr.filter(e => e !== '3')
export function deleteTask(task) {
  let username = JSON.parse(sessionStorage.getItem('user')).username
  let users = JSON.parse(localStorage.getItem('users'))
  for (user of users) {
    if (user.username == username) {
      let clearedArr = user.content.filter(e => e !== task)
      user.content = clearedArr
      localStorage.setItem('users', JSON.stringify(users))
    }
  }
}

export function addTask(task) {
  let username = JSON.parse(sessionStorage.getItem('user')).username
  let users = JSON.parse(localStorage.getItem('users'))
  for (user of users) {
    if (user.username == username) {
      user.content.push(task)
      localStorage.setItem('users', JSON.stringify(users))
    }
  }
}

export function updateTask(task, updatedTask) {
  let username = JSON.parse(sessionStorage.getItem('user')).username
  let users = JSON.parse(localStorage.getItem('users'))
  for (user of users) {
    if (user.username == username) {
      user.content[user.content.indexOf(task)] = updatedTask
      localStorage.setItem('users', JSON.stringify(users))
    }
  }
}
