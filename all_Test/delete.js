function deleteTask(listItem, loggedInUser, saveUser) {
  const taskText = listItem.childNodes[0].textContent

  const taskIndex = loggedInUser.tasks.indexOf(taskText)
  if (taskIndex !== -1) {
    loggedInUser.tasks.splice(taskIndex, 1)
    saveUser(loggedInUser)

    listItem.remove()
  }
}
module.exports = {
  deleteTask,
}
