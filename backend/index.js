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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

