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
      .sort({ _id: -1 })
      .exec();
    res.json(urls);
  } catch (err) {
    console.log(err);
    return res.status(500).send('Something went wrong. Try again');
  }
};

exports.editUrl = async (req, res) => {
  const { urlId, urlID, userId } = req.body;
  const expression = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  let regex = new RegExp(expression);

  if (!urlID) return res.status(400).send('Field cannot be empty');
  if (urlID.match(regex)) return res.status(400).send('Invalid characters');

  try {
    const urls = await Url.find({
      urlId: urlId,
    });
    console.log();
    res.json(urls);
  } catch (err) {
    console.log(err);
    return res.status(500).send('Something went wrong. Try again');
  }
};
