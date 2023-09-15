const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/albums', function (_, res) {
    fs.readFile(__dirname + '/' + 'albums.json', 'utf8', function (_, data) {
      console.log(data)
      res.status(200).send(data)
    })
  })

module.exports = app;