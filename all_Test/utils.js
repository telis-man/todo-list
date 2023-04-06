function getUser(username) {
    const users = JSON.parse(localStorage.getItem('users')) || {};
    return users[username] || null;
  }
  
  function saveUser(user) {
    const users = JSON.parse(localStorage.getItem('users')) || {}
    user.tasks = user.tasks || []
    users[user.username] = user
    localStorage.setItem('users', JSON.stringify(users))
  }
  
  function showAlert(message, className, formType) {
    const alertContainer = document.getElementById(`${formType}-alert`);
  
    // Update the alert container content
    alertContainer.textContent = message;
    alertContainer.classList.add(className);
    alertContainer.style.display = 'block';
  
    // Remove the alert message after 3 seconds
    setTimeout(() => {
      alertContainer.textContent = '';
      alertContainer.classList.remove(className);
      alertContainer.style.display = 'none';
    }, 3000);
  }
  
  module.exports = {
    getUser,
    saveUser,
    showAlert,
  };