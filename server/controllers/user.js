const User = require('../models/User');
const Url = require('../models/Url');

exports.getUser = async (req, res) => {
  let user = await User.findById(req.params.userId)
    .populate('last_shortened')
    .exec();
  user.password = undefined;
  return res.json(user);
};

exports.getUserUrls = async (req, res) => {
  try {
    const urls = await Url.find({
      user: req.params.userId,
    })
      .populate('user')
      .sort({ createdAt: '-1' })
      // .populate('author category location')
      .exec();
    res.json(urls);
  } catch (err) {
    console.log(err);
    return res.status(500).send('Something went wrong. Try again');
  }
};
