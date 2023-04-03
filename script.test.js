const localStorageMock = (() => {
  let store = {}

  return {
    getItem: key => {
      return store[key]
    },
    setItem: (key, value) => {
      store[key] = value.toString()
    },
    clear: () => {
      store = {}
    },
    removeItem: key => {
      delete store[key]
    },
  }
})()

// Object.defineProperty(window, 'localStorage', { value: localStorageMock })

const { getUser, saveUser, createTaskItem, editTask, updateTask, deleteTask } = require('./script.js')

describe('getUser', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('should return undefined for a non-existent user', () => {
    expect(getUser('nonexistentuser')).toBeUndefined()
  })

  test('should return the user object for an existing user', () => {
    const user = {
      username: 'testuser',
      password: 'testpassword',
      tasks: [],
    }
    localStorage.setItem('users', JSON.stringify({ [user.username]: user }))
    expect(getUser('testuser')).toEqual(user)
  })
})

describe('saveUser', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('should save a new user to localStorage', () => {
    const user = {
      username: 'testuser',
      password: 'testpassword',
      tasks: [],
    }
    saveUser(user)
    expect(JSON.parse(localStorage.getItem('users'))).toEqual({ [user.username]: user })
  })

  test('should update an existing user in localStorage', () => {
    const user = {
      username: 'testuser',
      password: 'testpassword',
      tasks: [],
    }
    localStorage.setItem('users', JSON.stringify({ [user.username]: user }))
    user.tasks.push('testtask')
    saveUser(user)
    expect(JSON.parse(localStorage.getItem('users'))).toEqual({ [user.username]: user })
  })
})

describe('createTaskItem', () => {
  test('should create a new task item with the correct text', () => {
    const taskText = 'test task'
    const listItem = createTaskItem(taskText)
    expect(listItem.childNodes[0].textContent).toEqual(taskText)
  })
})

describe('editTask', () => {
  test('should replace the text node with an input element', () => {
    const listItem = createTaskItem('test task')
    const editButton = listItem.querySelector('.edit-button')
    editTask(listItem, editButton)
    expect(listItem.childNodes[0].nodeName).toEqual('INPUT')
  })
})

describe('updateTask', () => {
  test('should update the task text and save the changes to localStorage', () => {
    const listItem = createTaskItem('test task')
    const input = listItem.querySelector('input')
    input.value = 'new test task'
    const saveButton = listItem.querySelector('.save-button')
    const editButton = listItem.querySelector('.edit-button')
    const oldText = 'test task'
    const user = {
      username: 'testuser',
      password: 'testpassword',
      tasks: [oldText],
    }
    localStorage.setItem('users', JSON.stringify({ [user.username]: user }))
    updateTask(listItem, input, saveButton, editButton, oldText)
    expect(listItem.childNodes[0].textContent).toEqual('new test task')
    expect(user.tasks).toEqual(['new test task'])
    expect(JSON.parse(localStorage.getItem('users'))).toEqual({ [user.username]: user })
  })
})
