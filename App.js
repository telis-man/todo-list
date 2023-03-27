document.querySelector('form').addEventListener('submit', event => {
  event.preventDefault()
  let taskPost = document.createElement('div')

  let pPost = document.createElement('p')
  pPost.textContent = event.target.taskInput.value

  let checkboxPost = document.createElement('input')
  checkboxPost.setAttribute('type', 'checkbox')

  let aPost = document.createElement('a')
  aPost.textContent = 'edit'

  container = document.querySelector('.container')

  taskPost.append(checkboxPost)
  taskPost.append(pPost)
  taskPost.append(aPost)
  container.append(taskPost)
})
