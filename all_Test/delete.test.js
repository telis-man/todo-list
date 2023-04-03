const { deleteTask } = require('./delete')

describe('deleteTask', () => {
  let listItem, loggedInUser, saveUser

  beforeEach(() => {
    listItem = {
      childNodes: [{ textContent: 'Test Task' }],
      remove: jest.fn(),
    }
    loggedInUser = {
      tasks: ['Test Task'],
    }
    saveUser = jest.fn()
  })

  test('deletes a task from the loggedInUser tasks and removes the listItem', () => {
    deleteTask(listItem, loggedInUser, saveUser)

    expect(loggedInUser.tasks.length).toBe(0)
    expect(saveUser).toHaveBeenCalledWith(loggedInUser)
    expect(listItem.remove).toHaveBeenCalledTimes(1)
  })

  test('does not delete a non-existent task', () => {
    listItem.childNodes[0].textContent = 'Non-existent Task'

    deleteTask(listItem, loggedInUser, saveUser)

    expect(loggedInUser.tasks.length).toBe(1)
    expect(saveUser).toHaveBeenCalledTimes(0)
    expect(listItem.remove).toHaveBeenCalledTimes(0)
  })
})
