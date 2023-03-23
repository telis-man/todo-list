// Add a new task
const addTaskForm = document.getElementById("add-task-form");
const taskList = document.getElementById("task-list");

addTaskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!loggedInUser) {
    alert("Please log in to add tasks.");
    return;
  }

  const taskInput = document.getElementById("task-input");
  const taskText = taskInput.value.trim();

  if (taskText) {
    const listItem = createTaskItem(taskText);
    taskList.appendChild(listItem);
    taskInput.value = "";

    loggedInUser.tasks.push(taskText);
    saveUser(loggedInUser);
  }
});

// Create a task list item
function createTaskItem(taskText) {
  const listItem = document.createElement("li");
  const textNode = document.createTextNode(taskText);

  const likeButton = document.createElement("i");
  likeButton.className = "fas fa-thumbs-up like-icon";
  likeButton.addEventListener("click", () => {
    listItem.classList.toggle("favorite");
  });

  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.classList.add("edit-button");
  editButton.addEventListener("click", () => {
    editTask(listItem);
  });

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("delete-button");
  deleteButton.addEventListener("click", () => {
    deleteTask(listItem);
  });

  listItem.appendChild(textNode);
  listItem.appendChild(likeButton);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
}

// Edit task in place
function editTask(listItem) {
  const textNode = listItem.childNodes[0];
  const currentText = textNode.textContent;

  const input = document.createElement("input");
  input.type = "text";
  input.value = currentText;

  listItem.replaceChild(input, textNode);

  const editButton = listItem.querySelector("button");
  const saveButton = document.createElement("button");
  saveButton.textContent = "Save";
  saveButton.classList.add("save-button");
  saveButton.addEventListener("click", () => {
    updateTask(listItem, input, saveButton, editButton, currentText);
  });

  listItem.replaceChild(saveButton, editButton);

  input.focus();
}

// Update task with the new text
function updateTask(listItem, input, saveButton, editButton, oldText) {
  const newText = input.value.trim();

  if (newText) {
    const textNode = document.createTextNode(newText);
    listItem.replaceChild(textNode, input);

    const taskIndex = loggedInUser.tasks.indexOf(oldText);
    if (taskIndex !== -1) {
      loggedInUser.tasks[taskIndex] = newText;
      saveUser(loggedInUser);
    }
  } else {
    listItem.remove();
  }

  listItem.replaceChild(editButton, saveButton);
}

// Delete task
function deleteTask(listItem) {
  const taskText = listItem.childNodes[0].textContent;

  const taskIndex = loggedInUser.tasks.indexOf(taskText);
  if (taskIndex !== -1) {
    loggedInUser.tasks.splice(taskIndex, 1);
    saveUser(loggedInUser);
  }

  listItem.remove();
}
