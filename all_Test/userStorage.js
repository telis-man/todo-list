export function getUser(username) {
  const users = JSON.parse(localStorage.getItem('users')) || {};
  return users[username] || null;
}

export function saveUser(user) {
  const users = JSON.parse(localStorage.getItem('users')) || {};
  user.tasks = user.tasks || [];
  users[user.username] = user;
  localStorage.setItem('users', JSON.stringify(users));
}