const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  //baseline profile information
  email: String,
  username: { type: String, unique: true, required: true },
  hash: String,
  salt: String,
  name: String,
  accountConfirmed: Boolean,
  activationKey: String,
  passwordResetToken: String,
  passwordResetTokenExpiration: Date,

  //subscription information
  signUpDate: Date,
  courseStatus: {
    l11: Boolean,
    l12: Boolean,
    l13: Boolean,
    l14: Boolean,
    l15: Boolean,
    l16: Boolean,
    l21: Boolean,
    l22: Boolean,
    l23: Boolean,
    l24: Boolean,
    l25: Boolean,
    l31: Boolean,
    l32: Boolean,
    l33: Boolean,
    l34: Boolean,
    l35: Boolean,
    l36: Boolean,
    l37: Boolean,
    l41: Boolean,
    l42: Boolean,
    l43: Boolean,
    l44: Boolean,
    l45: Boolean,
    l46: Boolean,
  },
});

userSchema.index({ email: -1 });

let User = (mongoose.models && mongoose.models.User) || mongoose.model("User", userSchema);

module.exports = User;
