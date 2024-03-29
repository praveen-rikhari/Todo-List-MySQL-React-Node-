const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const cors = require('cors');
const PORT = 3000;

app.use(bodyParser.json());
// app.use(cors());

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true
  })
);

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'todo',
  database: 'todo_db'
});

db.connect(err => {
  if (err) {
    throw err;
  }
  console.log('MySQL connected...');
});

app.get('/', (req, res) => {
  res.send("Welcome to TODO APPLICATION 📄");
})

app.get('/todos', (req, res) => {
  db.query('SELECT * FROM todos', (err, result) => {
    if (err) {
      console.error('Error fetching todos:', err);
      res.send('Error fetching todos');
    } else {
      res.json(result);
    }
  });
});

//  ADDING TODOS
app.post('/todos', (req, res) => {
  const { title } = req.body;
  const todo = { title };

  db.query('INSERT INTO todos SET ?', todo, (err, result) => {
    if (err) {
      console.error('Error adding todo:', err);
      res.send('Error adding todo');
    } else {
      console.log('Todo added successfully');
      res.send('Todo added successfully');
    }
  });
});

//  DELETEING TODOS
app.delete('/todos/:id', (req, res) => {
  const todoId = req.params.id;

  db.query('DELETE FROM todos WHERE id = ?', todoId, (err, result) => {
    if (err) {
      console.error('Error deleting todo:', err);
      res.send('Error deleting todo');
    } else {
      console.log('Todo deleted successfully');
      res.send('Todo deleted successfully');
    }
  });
});

//EDITING TODOS
app.put('/todos/:id', (req, res) => {
  const todoId = req.params.id;
  const { title } = req.body;

  db.query('UPDATE todos SET title = ? WHERE id = ?', [title, todoId], (err, result) => {
    if (err) {
      console.error('Error updating todo:', err);
      res.send('Error updating todo');
    } else {
      console.log('Todo updated successfully');
      res.send('Todo updated successfully');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

