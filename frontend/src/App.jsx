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

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/todos/${id}`);
      console.log('Todo deleted successfully');
      const response = await axios.get('http://localhost:3000/todos');
      setTodos(response.data);
    } catch (error) {
      console.error("Error deleting todos : ", error);
    }
  };

  const editTodo = async (id, newTitle) => {
    try {
      await axios.put(`http://localhost:3000/todos/${id}`, { title: newTitle });
      console.log('Todo updated successfully');
      const response = await axios.get('http://localhost:3000/todos');
      setTodos(response.data);
    } catch (error) {
      console.error("Error updating todos : ", error);
    }
  }

  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm setTodos={setTodos} />
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.title}
            <button onClick={() => deleteTodo(todo.id)} >Delete</button>
            <button onClick={() => editTodo(todo.id, "newTitle")} >Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
