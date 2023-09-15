const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/albums', (_, res) => {
  fs.readFile(__dirname + '/' + 'albums.json', 'utf8', function (_, data) {
    res.status(200).send(data)
  })
})

app.get('/albums/:id', (req, res) => {
  fs.readFile(__dirname + '/' + 'albums.json', 'utf8', function (_, data) {
    const id = req.params.id
    data = JSON.parse(data)
    console.log('you requested album ' + id)
    let returnAlbum
    for (let i = 0; i < data.length; i++) {

      if (data[i].id == id) {
        returnAlbum = data[i]
      }
    }
    console.log(returnAlbum)
    res.status(200).send(JSON.stringify(returnAlbum))
  })
})

module.exports = app;