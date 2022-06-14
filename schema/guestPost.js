const mongoose = require('mongoose');
var validator = require('validator');

const guestPost = new mongoose.Schema({
  description: {
    type: String,
  },
  price: {
    type: Number
  }
});

const Guestpost = new mongoose.model('Guestpost', guestPost);
module.exports = Guestpost;