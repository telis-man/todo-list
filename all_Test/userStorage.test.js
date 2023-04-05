import { getUser, saveUser } from './userStorage';

describe('getUser', () => {
  beforeEach(() => {
    
    localStorage.clear();
  });

  it('should return null if the user does not exist', () => {
    const result = getUser('nonexistent');
    expect(result).toBeNull();
  });

  it('should return the user object if the user exists', () => {
    localStorage.setItem('users', JSON.stringify({ existing: { username: 'existing', password: 'password' } }));
    const result = getUser('existing');
    expect(result).toEqual({ username: 'existing', password: 'password' });
  });
});

describe('saveUser', () => {
  beforeEach(() => {
    
    localStorage.clear();
  });

  it('should save a new user to local storage', () => {
    saveUser({ username: 'newuser', password: 'password' });
    const savedUser = JSON.parse(localStorage.getItem('users')).newuser;
    expect(savedUser).toEqual({ username: 'newuser', password: 'password', tasks: [] });
  });

  it('should update an existing user in local storage', () => {
    localStorage.setItem('users', JSON.stringify({ existing: { username: 'existing', password: 'password', tasks: [] } }));
    saveUser({ username: 'existing', password: 'newpassword', tasks: ['task1', 'task2'] });
    const updatedUser = JSON.parse(localStorage.getItem('users')).existing;
    expect(updatedUser).toEqual({ username: 'existing', password: 'newpassword', tasks: ['task1', 'task2'] });
  });
});