import Todo from "../models/todo.model.js";

// Get all todos of the logged-in user
export const getTodos = async (req, res) => {
  try {
    const userId = req.userId;
    const todos = await Todo.find({ user: userId });
    res.status(200).json({ todos });
  } catch (err) {
    console.error("Error fetching todos:", err);
    res
      .status(500)
      .json({ message: "Failed to fetch todos.", error: err.message });
  }
};

// Add a new todo for the logged-in user
export const addTodo = async (req, res) => {
  try {
    const userId = req.userId;
    const { task, date, time, isCompleted } = req.body;

    if (!task || !date || !time) {
      return res
        .status(400)
        .json({ message: "Task, date, and time are required." });
    }

    const newTodo = new Todo({
      task,
      date,
      time,
      isCompleted: isCompleted || false,
      user: userId,
    });

    const savedTodo = await newTodo.save();

    res
      .status(201)
      .json({ message: "Todo added successfully.", todo: savedTodo });
  } catch (err) {
    console.error("Error adding todo:", err);
    res
      .status(500)
      .json({ message: "Failed to add todo.", error: err.message });
  }
};

// Update a todo by ID for the logged-in user
export const updateTodo = async (req, res) => {
  try {
    const userId = req.userId;
    const todoId = req.params.id;
    const updates = req.body;

    const todo = await Todo.findOne({ _id: todoId, user: userId });
    if (!todo) {
      return res.status(404).json({ message: "Todo not found." });
    }

    Object.assign(todo, updates);
    await todo.save();

    res.status(200).json({ message: "Todo updated successfully.", todo });
  } catch (err) {
    console.error("Error updating todo:", err);
    res
      .status(500)
      .json({ message: "Failed to update todo.", error: err.message });
  }
};

// Delete a todo by ID for the logged-in user
export const deleteTodo = async (req, res) => {
  try {
    const userId = req.userId;
    const todoId = req.params.id;

    const todo = await Todo.findOneAndDelete({ _id: todoId, user: userId });
    if (!todo) {
      return res.status(404).json({ message: "Todo not found." });
    }

    res.status(200).json({ message: "Todo deleted successfully." });
  } catch (err) {
    console.error("Error deleting todo:", err);
    res
      .status(500)
      .json({ message: "Failed to delete todo.", error: err.message });
  }
};
