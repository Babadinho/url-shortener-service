const ShortUniqueId = require('short-unique-id');
const Url = require('../models/Url');
const User = require('../models/User');

exports.shortenGuest = async (req, res) => {
  const { mainUrl } = req.body;

  const expression =
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  let regex = new RegExp(expression);

  if (!mainUrl) return res.status(400).send('URL field is Empty');
  if (!mainUrl.match(regex)) return res.status(400).send('Enter a valid URL');

  let uid = new ShortUniqueId({ length: 7 });
  uid.setDictionary('alphanum_lower');
  const urlId = uid();

  try {
    let url = await Url.findOne({ originalUrl: mainUrl, status: 'public' });

    if (url) {
      res.json(url);
    } else {
      const shortUrl = `${process.env.CLIENT_URL}/${urlId}`;

      newUrl = new Url({
        originalUrl: mainUrl,
        shortUrl,
        urlId,
        status: 'public',
        date: new Date(),
      });

      await newUrl.save();
      res.json(newUrl);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json('Server Error');
  }
};

exports.shortenUser = async (req, res) => {
  const { mainUrl, userId } = req.body;

  const expression =
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  let regex = new RegExp(expression);

  if (!mainUrl) return res.status(400).send('URL field is Empty');
  if (!mainUrl.match(regex)) return res.status(400).send('Enter a valid URL');

  let uid = new ShortUniqueId({ length: 7 });
  uid.setDictionary('alphanum_lower');
  const urlId = uid();

  try {
    let url = await Url.findOne({
      originalUrl: mainUrl,
      user: userId,
      status: 'private',
    });

    let user = await User.findById(userId).select('-password').exec();

    if (url) {
      const userUrl = user.urls.indexOf(url._id);
      console.log(userUrl);
      if (userUrl >= 0) {
        user.urls.splice(userUrl, 1);
        user.urls.unshift(url._id);
        user.last_shortened = url._id;
        user.save();
        await user.populate('last_shortened');
        return res.json({ url, user });
      }
    } else {
      const shortUrl = `${process.env.CLIENT_URL}/${urlId}`;

      const newUrl = new Url({
        originalUrl: mainUrl,
        shortUrl,
        user: userId,
        urlId,
        status: 'private',
        date: new Date(),
      });

      newUrl.save();
      user.urls.unshift(newUrl._id);
      user.last_shortened = newUrl._id;
      await user.save();
      await user.populate('last_shortened');
      return res.json({
        url: newUrl,
        user,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json('Server Error');
  }
};
