import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoForm from './TodoForm';
import toast, { Toaster } from 'react-hot-toast';
import './App.css';

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
      toast.success('Todo deleted successfully 👍.')
      console.log('Todo deleted successfully');

      const response = await axios.get('http://localhost:3000/todos');
      setTodos(response.data);
    } catch (error) {
      console.error("Error deleting todos : ", error);
    }
  };

  const editTodo = async (id, newTitle) => {
    if (newTitle.trim().length === 0) {
      toast.error("Tiltle cannot be empty.");
      console.error("Tiltle cannot be empty");
      return;
    }
    
    try {
      await axios.put(`http://localhost:3000/todos/${id}`, { title: newTitle });
      console.log('Todo updated successfully');
      toast.success("Todo updated successfully 👍");

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

  return (<>
    <Toaster position='top-right' toastOptions={{ duration: 3000 }} />
    <div className='container'>
      <h1 className='heading'>
        Todo List 📝
      </h1>

      <TodoForm setTodos={setTodos} />

      <ul className='todo-list'>
        {todos.map(todo => (
          <li key={todo.id} className='todo-item'>
            {
              editedId === todo.id ? (
                <div className='todo-item-content' >
                  <input
                    className='save-input'
                    type="text"
                    placeholder='edit todo here'
                    value={editedTitle}
                    onChange={handleEditChange}
                  />
                  <button className='btn btn-save' onClick={handleEditSave} >Save</button>
                </div>
              ) : (
                <div className='todo-item-content'>
                  <span className="todo-title">{todo.title} </span>
                  <div className="todo-buttons">
                    <button className='btn btn-delete' onClick={() => deleteTodo(todo.id)} ><i className="bi bi-trash-fill lg"></i></button>
                    <button className='btn btn-edit' onClick={() => handleEdit(todo.id, todo.title)} ><i className="bi bi-pencil-square lg"></i></button>
                  </div>
                </div>
              )}
          </li>
        ))}
      </ul>
    </div>
  </>
  );
};

export default App;
