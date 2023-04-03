const { createTaskItem, toggleFavorite, editTask, updateTask, deleteTask } = require('./task');

describe('createTaskItem', () => {
  it('should create a task item with the given text', () => {
    const taskText = 'Sample task';
    const listItem = createTaskItem(taskText);
    expect(listItem).toBeDefined();
    expect(listItem.text).toBe(taskText);
  });
});

describe('toggleFavorite', () => {
  it('should toggle the favorite status of a task item', () => {
    const taskItem = createTaskItem('Sample task');
    toggleFavorite(taskItem);
    expect(taskItem.isFavorite).toBe(true);
    toggleFavorite(taskItem);
    expect(taskItem.isFavorite).toBe(false);
  });
});

describe('editTask', () => {
  it('should update the text of a task item', () => {
    const taskText = 'Sample task';
    const newTaskText = 'Updated task';
    const taskItem = createTaskItem(taskText);
    editTask(taskItem, newTaskText);
    expect(taskItem.text).toBe(newTaskText);
  });
});

describe('updateTask', () => {
  it('should update the task text and save the changes', () => {
    const taskList = ['Task 1', 'Task 2', 'Task 3'];
    const taskIndex = 1;
    const newTaskText = 'Updated task';
    updateTask(taskList, taskIndex, newTaskText);
    expect(taskList[taskIndex]).toBe(newTaskText);
  });

  it('should delete the task if the new text is empty', () => {
    const taskList = ['Task 1', 'Task 2', 'Task 3'];
    const taskIndex = 1;
    updateTask(taskList, taskIndex, '');
    expect(taskList).toEqual(['Task 1', 'Task 3']);
  });
});

describe('deleteTask', () => {
  it('should delete the task from the list', () => {
    const taskList = ['Task 1', 'Task 2', 'Task 3'];
    const taskIndex = 1;
    deleteTask(taskList, taskIndex);
    expect(taskList).toEqual(['Task 1', 'Task 3']);
  });
});