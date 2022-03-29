const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

exports.register = async (req, res) => {
  try {
    console.log(req.body);
    const { username, email, password } = req.body;
    //validate fields
    if (!username || !email || !password)
      return res.status(400).send('All fields are required');

    //validate password
    let hasNumber = /\d/;
    if (password.length < 6)
      return res
        .status(400)
        .send('Pasword too short, must be 6 characters and above');
    if (!hasNumber.test(password))
      return res.status(400).send('Pasword must contain a number');

    //check if user email already exists
    let userExist = await User.findOne({ email: email }).exec();
    if (userExist) return res.status(400).send('Email already exists');

    //check if username already exists
    let userNameExist = await User.findOne({ username: username }).exec();
    if (userNameExist) return res.status(400).send('Username already taken');

    //register user
    const user = new User(req.body);

    //hash password and save user
    bcrypt.genSalt(12, function (err, salt) {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        user.save();
        return res.json({ ok: true });
      });
    });
  } catch (err) {
    console.log('User registration failed', err);
    return res.status(400).send('Error. Try again');
  }
};

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
});

exports.login = async (req, res) => {
  const { email, password } = req.body;
  //validation
  if (!email || !password)
    return res.status(400).send('All fields are required');

  try {
    let user = await User.findOne({ email }).populate('last_shortened').exec();
    if (!user)
      return res.status(400).send('User with that email does not exist');

    //match password
    bcrypt.compare(password, user.password, function (err, match) {
      if (!match || err) {
        return res.status(400).send('Password is incorrect');
      }
      console.log('password match', match);
      //Generate jwt signed token and send as reponse to client
      let token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
      });

      return res.json({
        token,
        user: {
          _id: user._id,
          email: user.email,
          username: user.username,
          urls: user.urls,
          role: user.role,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          last_shortened: user.last_shortened,
        },
      });
    });
  } catch (err) {
    console.log('Login Error', err);
    res.status(400).send('Login failed. try again');
  }
};
