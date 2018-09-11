const express = require('express'),
      bodyParser = require('body-parser'),
      { Client } = require('pg'),
      cors = require('cors');

require('dotenv').load();

var app = express();

// https://www.npmjs.com/package/body-parser
var jsonParser = bodyParser.json();
const client = new Client();
client.connect();
app.use(cors());

const PORT = process.env.PORT || 3000;

app.route('/api/todos')
  .get((req, res) => {
    client.query('SELECT * FROM todos', (err, resp) => {
      if (err) {
        res.send(err);
      }
      res.json(resp.rows);
    });
  })
  .post(jsonParser, (req, res) => {
    client.query(`INSERT INTO todos (todo) VALUES ('${req.body.todo}')`, (err, resp) => {
      if (err) {
        console.log(err);
      }
      res.json(resp);
    });
  });

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });