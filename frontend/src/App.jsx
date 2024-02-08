import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoForm from './TodoForm';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedId, setEditedId] = useState(null);

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
    if (newTitle.trim().length === 0) {
      console.error("Tiltle cannot be empty");
      return;
    }
    try {
      await axios.put(`http://localhost:3000/todos/${id}`, { title: newTitle });
      console.log('Todo updated successfully');
      const response = await axios.get('http://localhost:3000/todos');
      setTodos(response.data);
      setEditedId(null);
      setEditedTitle('');
    } catch (error) {
      console.error("Error updating todos : ", error);
    }
  }

  function handleEdit(id, title) {
    setEditedId(id);
    setEditedTitle(title);
  }
  function handleEditChange(e) {
    setEditedTitle(e.target.value);
  }

  function handleEditSave(i) {
    editTodo(editedId, editedTitle);
  }

  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm setTodos={setTodos} />
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {
              editedId === todo.id ? (
                <div>
                  <input
                    type="text"
                    placeholder='edit todo here'
                    value={editedTitle}
                    onChange={handleEditChange}
                  />
                  <button onClick={handleEditSave} >Save</button>
                </div>
              ) : (
                <div>
                  {todo.title}
                  <button onClick={() => deleteTodo(todo.id)} >Delete</button>
                  <button onClick={() => handleEdit(todo.id, todo.title)} >Edit</button>
                </div>
              )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
