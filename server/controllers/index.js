const Url = require('../models/Url');
const User = require('../models/User');

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

exports.stats = async (req, res) => {
  try {
    const urls = await Url.find().countDocuments();
    const users = await User.find().countDocuments();
    return res.json({ urls, users });
  } catch (err) {
    console.log(err);
    res.status(500).json('Server Error');
  }
};
