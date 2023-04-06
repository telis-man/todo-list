function createTaskItem(taskText) {
  const listItem = {
    text: taskText,
    isFavorite: false,
  }

  return listItem
}

function toggleFavorite(taskItem) {
  taskItem.isFavorite = !taskItem.isFavorite
}

function editTask(taskItem, newText) {
  taskItem.text = newText
}

function updateTask(taskList, taskIndex, newText) {
  if (newText) {
    taskList[taskIndex] = newText
  } else {
    taskList.splice(taskIndex, 1)
  }
}

function deleteTask(taskList, taskIndex) {
  taskList.splice(taskIndex, 1)
}

module.exports = {
  createTaskItem,
  toggleFavorite,
  editTask,
  updateTask,
  deleteTask,
}
