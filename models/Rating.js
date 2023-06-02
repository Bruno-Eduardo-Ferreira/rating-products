const mongoose = require('mongoose')

const ratingSchema = new mongoose.Schema({
  idPessoa: {
    type: String,
    required: true,
  },
  idProduto: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
});

const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;
