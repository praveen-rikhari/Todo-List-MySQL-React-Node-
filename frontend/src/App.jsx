import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoForm from './TodoForm';

const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('http://localhost:3000/todos');
        setTodos(response.data);
      } catch (error) {
        console.error("Error fetching todos: ", error);
      }
    };
    fetchTodos();
  }, [])

  const deleteTodos = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/todos/${id}`);
      console.log('Todo deleted successfully');
      const response = await axios.get('http://localhost:3000/todos');
      setTodos(response.data);
    } catch (error) {
      console.error("Error deleting todos : ", error);
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm setTodos={setTodos} />
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.title}
            <button onClick={() => deleteTodos(todo.id)} >Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
