const ShortUniqueId = require('short-unique-id');
const Url = require('../models/Url');

exports.shorten = async (req, res) => {
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
    let url = await Url.findOne({ originalUrl: mainUrl });
    if (url) {
      res.json(url);
    } else {
      const shortUrl = `${process.env.CLIENT_URL}/${urlId}`;

      url = new Url({
        originalUrl: mainUrl,
        shortUrl,
        urlId,
        date: new Date(),
      });

      await url.save();
      res.json(url);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json('Server Error');
  }
};
