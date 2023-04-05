const { getUser, saveUser, showAlert } = require('./utils');

describe('getUser', () => {
  beforeEach(() => {
    // Clear local storage before each test
    localStorage.clear();
  });

  it('should return null if the user does not exist', () => {
    const user = getUser('nonexistent');
    expect(user).toBeNull();
  });

  it('should return the user object if the user exists', () => {
    const testUser = {
      username: 'testuser',
      password: 'password123',
      tasks: [],
    };

    // Save the test user to local storage
    saveUser(testUser);

    // Retrieve the user from local storage
    const user = getUser('testuser');

    // Test if the retrieved user matches the test user object
    expect(user).toEqual(testUser);
  });
});

// Write tests for saveUser and showAlert functions
