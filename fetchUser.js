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
  for (let user of users) {
    if (user.username == username) {
      let clearedArr = user.content.filter(e => e.taskText !== task)
      user.content = clearedArr
      localStorage.setItem('users', JSON.stringify(users))
    }
  }
}

export function addTask(task) {
  let username = JSON.parse(sessionStorage.getItem('user')).username
  let users = JSON.parse(localStorage.getItem('users'))
  for (let user of users) {
    if (user.username == username) {
      let taskObj = {
        taskText: task,
        likeStatus: false,
      }
      user.content.push(taskObj)
      localStorage.setItem('users', JSON.stringify(users))
    }
  }
}

export function updateTask(task, updatedTask) {
  let username = JSON.parse(sessionStorage.getItem('user')).username
  let users = JSON.parse(localStorage.getItem('users'))
  for (let user of users) {
    if (user.username == username) {
      console.log(user.content, task)
      user.content.find(e => e.taskText == task).taskText = updatedTask
      localStorage.setItem('users', JSON.stringify(users))
    }
  }
}

export function toggleLikeStatus(task) {
  let username = JSON.parse(sessionStorage.getItem('user')).username
  let users = JSON.parse(localStorage.getItem('users'))
  for (let user of users) {
    if (user.username == username) {
      user.content.find(e => e.taskText == task).likeStatus = !user.content.find(e => e.taskText == task).likeStatus
      localStorage.setItem('users', JSON.stringify(users))
    }
  }
}
