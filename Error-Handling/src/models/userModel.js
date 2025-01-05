let users = []; // In-memory "database"

class UserModel {
  static createUser(userData) {
    if (!userData.username || !userData.password) {
      throw new Error('Missing required fields: username or password');
    }

    // Simulate user creation
    const newUser = { id: users.length + 1, ...userData };
    users.push(newUser);
    return newUser;
  }

  static getUserById(id) {
    const user = users.find(u => u.id === id);
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }
    return user;
  }
}

module.exports = UserModel;
