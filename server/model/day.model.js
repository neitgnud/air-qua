const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const day = new Schema({
  time: {type: Date},
  value: {type: Number}
});

 module.exports = mongoose.model('Day', day);
