const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      max: 12,
      unique: true,
      index: true,
      lowercase: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    urls: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Url',
      },
    ],
    last_shortened: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Url',
    },
    role: {
      type: String,
      default: 'user',
    },
    resetPasswordLink: {
      data: String,
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
