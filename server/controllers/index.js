const Url = require('../models/Url');

exports.index = (req, res) => {
  res.send('Welcome to URL Shortener');
};
exports.redirect = async (req, res) => {
  console.log(req.params.urlId);

  try {
    const url = await Url.findOne({ urlId: req.params.urlId });
    if (url) {
      url.clicks++;
      url.save();
      return res.redirect(url.originalUrl);
    } else res.status(404).json('Not found');
  } catch (err) {
    console.log(err);
    res.status(500).json('Server Error');
  }
};
