const express = require('express');
const bodyParser = require('body-parser');
const knex = require('./db/knex');

const port = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/todo', (req, res) => {
  // knex.raw('select * from todos').then((todos) => {
  //   res.send(todos);
  // });
  knex.select().from('todos').then((todos) => {
    res.send(todos);
  });
});

app.get('/todo/:id', (req, res) => {
  knex.select().from('todos').where('id', req.params.id).then((todos) => {
    res.send(todos);
  });
});

app.post('/todos', (req, res) => {
  let title = req.body.title;
  let userId = req.body.userId;
  knex('todos').insert({
    title: title,
    user_id: userId,
  }).then(() => {
    knex.select().from('todos').then((todos) => {
      res.send(todos);
    });
  });
});

app.put('/todos/:id', (req, res) => {
  knex('todos').where('id', req.params.id).update({
    title: req.body.title,
    completed: req.body.completed,
  }).then(() => {
    knex.select().from('todos').then((todos) => {
      res.send(todos);
    });
  });
});

app.delete('/todos/:id', (req, res) => {
  knex.from('todos').where('id', req.params.id).delete().then(() => {
    knex.select().from('todos').then((todos) => {
      res.send(todos);
    });
  });
});

app.get('/todos-user/:id', (req, res) => {
  knex.from('todos')
    .innerJoin('users', 'todos.user_id', 'users.id')
    .where('todos.user_id', req.params.id)
    .then((todos) => {
      res.send(todos);
    })
});

app.listen(port, () => {
  console.log("Listenting on port:", port);
});
