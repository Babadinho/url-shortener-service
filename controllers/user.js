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
  const { urlId, newUrlId, userId } = req.body;
  const expression = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  let regex = new RegExp(expression);

  if (!newUrlId) return res.status(400).send('Field cannot be empty');
  if (newUrlId.match(regex))
    return res.status(400).send('Invalid character(s)');
  if (newUrlId.length <= 3) return res.status(400).send('URL too short');
  if (urlId == newUrlId)
    return res.status(400).send("You havn't made any change to URL");

  try {
    const url = await Url.findOne({
      urlId: urlId,
      user: userId,
    });
    if (url) {
      url.urlId = newUrlId;
      url.shortUrl = `${process.env.CLIENT_URL}/${newUrlId}`;
      url.save();

      const user = await User.find({
        _id: userId,
      })
        .select('-password')
        .populate('last_shortened')
        .exec();

      res.json({ url, user });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send('Something went wrong. Try again');
  }
};
