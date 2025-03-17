// src/components/TodoList.jsx
import React, { useState } from 'react';

const TodoList = ({ todos, setTodos }) => {
  const [newTodo, setNewTodo] = useState('');
  const [showInput, setShowInput] = useState(false);

  const addTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim() === '') return;
    
    const newTodoItem = {
      id: Date.now().toString(),
      text: newTodo,
      completed: false,
      timestamp: new Date().toISOString()
    };
    
    setTodos([...todos, newTodoItem]);
    setNewTodo('');
    setShowInput(false);
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="todo-list-container">
      <div className="todo-header">
        <h2>Todo List</h2>
        <button 
          className="add-todo-button" 
          onClick={() => setShowInput(true)}
          style={{ display: showInput ? 'none' : 'block' }}
        >
          <span className="material-icons">add</span>
        </button>
      </div>
      {showInput && (
  <div className="todo-form-container">
    <form onSubmit={addTodo} className="todo-form inline-form">
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new task"
        autoFocus
      />
      <div className="todo-form-actions">
        <button type="button" onClick={() => setShowInput(false)} className="btn-secondary">Cancel</button>
        <button type="submit" className="btn-primary">Add Task</button>
      </div>
    </form>
  </div>
)}
      <ul className="todo-items">
        {todos.map(todo => (
          <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <div className="todo-item-content">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              <span className="todo-text">{todo.text}</span>
            </div>
            <button className="delete-todo" onClick={() => deleteTodo(todo.id)}>
              <span className="material-icons">delete</span>
            </button>
          </li>
        ))}
      </ul>
      
      {todos.length === 0 && !showInput && (
        <div className="empty-state">
          <p>No tasks yet! Click + to add one.</p>
        </div>
      )}
    </div>
  );
};

export default TodoList;
