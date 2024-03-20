// Usage example

const User = require('./Schema/schema');

// Create a new user
const newUser = new User({
  name: 'John Doe',
  email: 'john@example.com',
  age: 30,
});
console.log(newUser);
// Save the user to the database
newUser.save();
