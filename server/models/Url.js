const mongoose = require('mongoose');

const UrlSchema = new mongoose.Schema({
  urlId: {
    type: String,
    required: true,
  },
  originalUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
  },
  visits: {
    type: Number,
    required: true,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  status: {
    type: 'string',
    default: 'public',
  },
  date: {
    type: String,
    default: Date.now,
  },
});

module.exports = mongoose.model('Url', UrlSchema);
