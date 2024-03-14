// Usage example

const User = require('./Schema/schema');

// Create a new user
const newUser = new User({
  name: 'John Doe',
  email: 'john@example.com',
  age: 30,
});

// Save the user to the database
newUser.save((err, user) => {
  if (err) {
    console.error(err);
  } else {
    console.log('User created successfully:', user);
  }
});
