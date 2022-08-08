const express = require('express');
const router = express.Router();
const database = require('../db');
const { v4: uuidv4 } = require('uuid');

router.route('/concerts').get((req, res) => {
  const db = database.concerts;
  res.json(db);
});

router.route('/concerts/:id').get((req, res) => {
  const db = database.concerts;

  if (req.params.id === 'random') {
    res.json(db[Math.floor(Math.random() * db.length)]);
  }
  else {
    const results = db.find(obj => {
      return obj.id == req.params.id;
    })
    if (results)
      res.json(results);
    else
      res.json({ message: '404: Page not found!' });
  }
});

router.route('/concerts/').post((req, res) => {
  const db = database.concerts;

  const { performer, genre, price, day, image } = req.body;

  if (performer && genre && price && day && image) {
    res.json({ message: 'Save' });
    const obj = {id: uuidv4(), performer: performer, genre: genre, price: price, day: day, image: image, };
    db.push(obj);
  }
  else {
    res.json({ message: 'You can\'t leave fields empty!' });
  }
});

router.route('/concerts/:id').put((req, res) => {
  const db = database.concerts;
  const { performer, genre, price, day, image } = req.body;
  const results = db.find(obj => {
    return obj.id == req.params.id;
  })
  results.performer = performer,
  results.genre = genre,
  results.price = price,
  results.day = day,
  results.image = image,
  res.json({ message: 'Update OK' });
});

router.route('/concerts/:id').delete((req, res) => {
  const db = database.concerts;
  const id = parseInt(req.params.id);
  const removeIndex = db.map(function (item) { return item.id; }).indexOf(id);
  if (parseInt(removeIndex) >= 0) db.splice(removeIndex, 1);
  res.json({ message: 'Delete OK' });
});

module.exports = router;
