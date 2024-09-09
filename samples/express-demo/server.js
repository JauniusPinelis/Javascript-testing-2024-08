const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

let todos = [
    {id: 1, task: "clean room"},
    {id: 2, task: "clean car"}
];

// Get all todos
app.get('/todos', (req, res) => {
    res.json(todos);
});

// Get a specific todo by ID
app.get('/todos/:todoId', (req, res) => {
    todo = todos.find(t => t.id == req.params.todoId);
    if (!todo) return res.status(404).send('Todo not found');
    res.json(todo);
});

// Create a new todo
app.post('/todos', (req, res) => {
    const todo = {
        id: todos.length + 1,
        task: req.body.task,
        completed: false
    };
    todos.push(todo);
    res.status(201).json(todo);
});

// Update a todo by ID
app.put('/todos/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) return res.status(404).send('Todo not found');

    todo.task = req.body.task;
    todo.completed = req.body.completed;
    res.json(todo);
});

// Delete a todo by ID
app.delete('/todos/:id', (req, res) => {
    const todoIndex = todos.findIndex(t => t.id === parseInt(req.params.id));
    if (todoIndex === -1) return res.status(404).send('Todo not found');

    todos.splice(todoIndex, 1);
    res.status(204).send();
});

// Start the server
app.listen(port, () => {
    console.log(`Todo API listening at http://localhost:${port}`);
});
