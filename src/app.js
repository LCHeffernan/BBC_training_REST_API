const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/albums', (req, res) => {
  const { artist } = req.query;
  let returnAlbum = null;
  if (artist) {
    fs.readFile(__dirname + '/' + 'albums.json', 'utf8',
      function (_, data) {
        data = JSON.parse(data)
        for (let i = 0; i < data.length; i++) {
          if (data[i].artist == artist) {
            returnAlbum = data[i];
            return res.status(200).send(returnAlbum)
          }
        }
        return res.status(200).send("Artist not found");
      })
  } else {
    fs.readFile(__dirname + '/' + 'albums.json', 'utf8', function (_, data) {
      res.status(200).send(data)
    })
  }
})

app.get('/albums/:id', (req, res) => {
  fs.readFile(__dirname + '/' + 'albums.json', 'utf8', function (_, data) {
    const { id } = req.params
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

app.delete('/albums/:id', (req, res) => {
  fs.readFile(__dirname + '/' + 'albums.json', 'utf8', function (_, data) {
    let { id } = req.params
    data = JSON.parse(data)
    console.log('you requested album ' + id)
    for (let i = 0; i < data.length; i++) {
      if (data[i].id == id) {
        data.splice(i, 1)
      }
    }
    fs.writeFile(__dirname + '/' + 'albums.json',
      JSON.stringify(data), function
      (err) {
      if (err) { return console.log(err) }
    })
  })
  res.status(204).send('album removed if it existed')
})

app.post('/albums', (req, res) => {
  const newAlbum = req.body
  fs.readFile(__dirname + '/' + 'albums.json', 'utf8', function (_, data) {
    data = JSON.parse(data)
    data.push(newAlbum)
    res.end(JSON.stringify(data))
    fs.writeFile(__dirname + '/' + 'albums.json',
      JSON.stringify(data), function
      (err) {
      if (err) { return console.log(err) }
    })
  })
  res.status(201).send('album successfully created')
})

app.put('/albums/:id', (req, res) => {
  const { id } = req.params;
  let updatedAlbum = req.body
  fs.readFile(__dirname + '/' + 'albums.json', 'utf8',
    function (_, data) {
      data = JSON.parse(data)
      for (let i = 0; i < data.length; i++) {
        if (data[i].id == id) {
          data[i] = { id, ...updatedAlbum }
        }
      }
      res.end(JSON.stringify(data))
      fs.writeFile(__dirname + '/' + 'albums.json',
        JSON.stringify(data), function
        (err) {
        if (err) { return console.log(err) }
      })
    })
  res.status(200).send('album updated if it existed')
})

module.exports = app;