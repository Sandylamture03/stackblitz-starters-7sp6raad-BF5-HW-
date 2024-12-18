const { resolve } = require('path');

const express = require('express');
const app = express();
const PORT = 3000;

/*  Question 1: Nested Routes: Implement a Route for Nested Resources

Create a nested route under /users/:id to handle retrieving a user's posts. The endpoint should be /users/:id/posts, where :id is the user ID.

Task: Access http://localhost:3000/users/456/posts and ensure the server returns { message: 'Posts for User ID: 456' }. */

// Nested route to get posts for a specific user
app.get('/users/:id/posts', (req, res) => {
  const userId = req.params.id; // Access the user ID from the route parameters
  return res.status(200).json({ message: `Posts for User ID: ${userId}` });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

/*  Question 2: Organizing Routes: Group Routes for a Resource

Define routes for managing user data, including retrieving all users, retrieving a single user by ID, creating a new user, and updating an existing user. Use the /users base path for these routes.

Test each endpoint (GET /users, GET /users/:id, POST /users, and PUT /users/:id) to ensure they respond with the appropriate messages.

For example, accessing http://localhost:3000/users/789 should return { message: 'Details of user 789' }.

 */

app.use(express.json()); // Middleware to parse JSON bodies

// Sample data to simulate a database
let users = [
  { id: 100, name: 'Alice' },
  { id: 789, name: 'Bob' },
];

// Route to retrieve all users
app.get('/users', (req, res) => {
  return res.status(200).json(users);
});

// Route to retrieve a single user by ID
app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const user = users.find((u) => u.id === userId);
  if (user) {
    return res.status(200).json({ message: `Details of user ${userId}` });
  } else {
    return res.status(404).json({ message: 'User not found' });
  }
});

// Route to create a new user
app.post('/users', (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
  };
  users.push(newUser);
  return res.status(201).json(newUser);
});

// Route to update an existing user
app.put('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const userIndex = users.findIndex((u) => u.id === userId);
  if (userIndex !== -1) {
    users[userIndex].name = req.body.name;
    return res.status(200).json({ message: `User ${userId} updated` });
  } else {
    return res.status(404).json({ message: 'User not found' });
  }
});
