import { createTaskItem } from './script'

describe('create task test', () => {
  test('if text exist in the element', () => {
    let textExample = 'randomText'
    let text = createTaskItem(textExample).textContent
    expect(text.includes(textExample)).toBe(true)
  })
  test('if edit button is created', () => {
    let textExample = 'Edit'
    let text = createTaskItem('random task').textContent
    expect(text.includes(textExample)).toBe(true)
  })
  test('if delete button is created', () => {
    let textExample = 'Delete'
    let text = createTaskItem('random task').textContent
    expect(text.includes(textExample)).toBe(true)
  })
})

describe('edit task test', () => {
  test('if text exist in the element', () => {
    let textExample = 'randomText'
    let text = createTaskItem(textExample).textContent
    expect(text.includes(textExample)).toBe(true)
  })
})
