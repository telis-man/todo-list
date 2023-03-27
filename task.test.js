const createTaskItem = require('./task')

describe('function test', () => {
  test('task test text', () => {
    const text = 'Random text'
    const listItem = createTaskItem(text)
    const listText = listItem.getAttribute('data-testid').toBe('liTestId')
    expect(listText.textContent).toBe(text)
  })
})
