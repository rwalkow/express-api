const mongoose = require('mongoose');

const concertsSchema = new mongoose.Schema({

  performer: { type: String, required: true, ref: 'Performer' },
  genre: { type: String, required: true, ref: 'Genre' },
  price: { type: String, required: true },
  day: { type: String, required: true },
  image: { type: String, required: true }
},
  {
    // versionKey: '_somethingElse' 
    versionKey: false
  });

module.exports = mongoose.model('Concert', concertsSchema);
