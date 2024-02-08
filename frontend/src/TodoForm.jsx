import React, { useState } from 'react';
import axios from 'axios';

const TodoForm = ({ setTodos }) => {
  const [title, setTitle] = useState('');

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const addNewTodo = async (e) => {
    e.preventDefault();

    if (title.trim().length === 0) {
      console.error("Tiltle cannot be empty");
      return;
    }

    try {
      await axios.post('http://localhost:3000/todos', { title });
      console.log('Todo added successfully 👍');

      const response = await axios.get('http://localhost:3000/todos');
      console.log(response);
      setTodos(response.data);
      setTitle('');
    } catch (error) {
      console.error('Error adding todo ❌ :', error);
    }
  };


  return (
    <form onSubmit={addNewTodo}>
      <input
        type="text"
        placeholder="Enter your todo"
        value={title}
        onChange={handleChange}
      />
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default TodoForm;

