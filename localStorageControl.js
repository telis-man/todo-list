export function addNewUser(userObj) {
  let users = JSON.parse(localStorage.getItem('users'))
  users.push(userObj)
  localStorage.setItem('users', users)
}
