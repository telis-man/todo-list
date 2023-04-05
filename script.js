import 'bootstrap/dist/js/bootstrap.min.js'
import { generateTaskItem } from './generators'
import { addTask } from './fetchUser'

window.addEventListener('load', () => {
  let user = JSON.parse(sessionStorage.getItem('user'))
  //Logout button
  document.querySelector('#logoutButton').addEventListener('click', () => {
    sessionStorage.clear()
    window.location.href = 'index.html'
  })
  //Welcome tag
  document.querySelector('#welcomeTag').textContent = `Welcome, ${user.username}!`

  document.querySelector('#addButton').addEventListener('click', () => {
    const taskValue = document.querySelector('#inputTask').value
    if (taskValue) {
      addTask(taskValue)
      generateTaskItem(taskValue)
      document.querySelector('#inputTask').value = ''
    } else {
      console.log('Enter text')
    }
  })
  //add all tasks
  let allTasks = user.content

  for (let task of allTasks) {
    generateTaskItem(task.taskText, task.likeStatus)
  }
})
