import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';

const App = () => {
  const [todos, setTodos] = useState([]);
  
  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm setTodos={setTodos} />
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
