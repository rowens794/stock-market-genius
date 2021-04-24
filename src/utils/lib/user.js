import crypto from "crypto";
import User from "../../models/User";
import dbConnect from "../../utils/dbConnect";
import helpers from "../helpers";

/**
 * User methods. The example doesn't contain a DB, but for real applications you must use a
 * db here, such as MongoDB, Fauna, SQL, etc.
 */

const users = [];

export async function createUser({ username, password, confirmPassword, name }) {
  // connect to the database
  await dbConnect();

  let validPassword = helpers.checkPasswordValidity(password, confirmPassword);
  let validEmail = helpers.validateAndNormalizeEmail(username);
  let userAlreadyExists = await User.findOne({ email: validEmail });

  if (validPassword.passwordValid && validEmail && !userAlreadyExists) {
    // Here you should create the user and save the salt and hashed password (some dbs may have
    // authentication methods that will do it for you so you don't have to worry about it):
    const salt = crypto.randomBytes(16).toString("hex");
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
    const activationKey = crypto.randomBytes(16).toString("hex");

    // create two default lists for the user

    const user = new User({
      //baseline profile information
      email: validEmail,
      username: validEmail,
      hash: hash,
      salt: salt,
      name: name,
      accountConfirmed: true, //emails arn't making it to inbox
      activationKey: activationKey,
      courseStatus: {
        l11: false,
        l12: false,
        l13: false,
        l14: false,
        l15: false,
        l16: false,
        l21: false,
        l22: false,
        l23: false,
        l24: false,
        l25: false,
        l31: false,
        l32: false,
        l33: false,
        l34: false,
        l35: false,
        l36: false,
        l37: false,
        l41: false,
        l42: false,
        l43: false,
        l44: false,
        l45: false,
        l46: false,
      },

      //subscription information
      signUpDate: Date.now(),
    });

    await user.save();

    return user;
  } else if (!validPassword.passwordValid) {
    return { error: validPassword.errMsg };
  } else if (!validEmail) {
    return { error: "Please enter a valid email address" };
  } else if (userAlreadyExists) {
    return { error: "A user with this email address already exists" };
  } else {
    return { error: "Error creating account" };
  }
}

export async function findUser({ username }) {
  // connect to the database
  await dbConnect();
  let user = await User.findOne({ email: username });

  return user;
}

// Compare the password of an already fetched user (using `findUser`) and compare the
// password for a potential match
export async function validatePassword(user, inputPassword) {
  const inputHash = crypto.pbkdf2Sync(inputPassword, user.salt, 1000, 64, "sha512").toString("hex");

  const passwordsMatch = user.hash === inputHash;

  return passwordsMatch;
}

export async function resetUserPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  return { salt, hash };
}
