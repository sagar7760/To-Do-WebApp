const express = require('express');
const router = express.Router();
const { createTodo, getTodos, getCompletedTodos, updateTodo, deleteTodo, permanentlyDeleteTodo,uncompleteTodo,completeTodo,undoDeleteTodo,getDeletedTodos, getAllTodos } = require('../controllers/todoController');
const protect = require('../middleware/auth');


router.use(protect);

// Route to create a new todo
router.post('/',createTodo);

// Route to get active todos for user
router.get('/',getTodos);

// Route to get all todos for user (including completed and deleted)
router.get('/all', getAllTodos);

// Route to get completed todos for user
router.get('/completed',getCompletedTodos)
// Route to update a todo
router.put('/:id',updateTodo);

// Route to delete a todo (soft delete)
router.put('/delete/:id',deleteTodo);

// Route to get deleted todos for user
router.get('/deleted', getDeletedTodos);

// undo a soft delete
router.put('/undo/:id', undoDeleteTodo);

// Route to permanently delete a todo
router.delete('/:id',permanentlyDeleteTodo);


// Route to mark a todo as completed
router.put('/complete/:id',completeTodo);

// Route to mark a todo as uncompleted
router.put('/uncomplete/:id',uncompleteTodo);

module.exports = router;

// This code defines the routes for managing todos in a Node.js application using Express.
// It includes routes for creating, retrieving, updating, deleting, and marking todos as completed or uncompleted.
// The `protect` middleware is used to ensure that only authenticated users can access these routes.