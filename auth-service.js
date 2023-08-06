const bcrypt = require('bcrypt');
const registeredUsers = []; // Store registered users in-memory

async function RegisterUser(userData) {
  try {
    // Checking if the user already exists
    const existingUser = registeredUsers.find(user => user.userName === userData.userName);
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hashing the password
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Adding the user to the list
    registeredUsers.push({
      userName: userData.userName,
      password: hashedPassword,
      email: userData.email
    });
  } catch (error) {
    throw error;
  }
}

async function CheckUser(userData) {
  try {
    // To find the user by username
    const user = registeredUsers.find(u => u.userName === userData.userName);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Comparing the hashed password
    const passwordMatch = await bcrypt.compare(userData.password, user.password);
    if (!passwordMatch) {
      throw new Error('Invalid credentials');
    }

    // Returning user data without password
    const { password, ...userDataWithoutPassword } = user;
    return userDataWithoutPassword;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  RegisterUser,
  CheckUser
};
