var ObjectId = require("mongoose").Types.ObjectId;

import { setLoginSession } from "../../../../utils/lib/auth";
import User from "../../../../models/User";
import dbConnect from "../../../../utils/dbConnect";

export default async function confirmAccount(req, res) {
  await dbConnect();
  let { userID, token } = req.body;

  if (isObjectIdValid(userID)) {
    let user = await User.findOne({ _id: userID });

    if (user && token === user.activationKey && user.activationKey) {
      //update the user doc
      user.accountConfirmed = true;
      await user.save();

      //save a new cookie
      const session = { ...user };
      await setLoginSession(res, session);

      //build userstate
      let userState = {
        name: user.name,
        email: user.email,
        username: user.username,
        subscriptionType: user.subscriptionType,
        signUpDate: user.signUpDate,
        accountConfirmed: user.accountConfirmed,
      };

      res.status(200).json({ status: "success", msg: "Your account has been confirmed.  Please login.", userState: userState });
    } else {
      res
        .status(200)
        .json({ status: "failure", msg: "There was a problem confirming your account. Please contact support at support@intellispect.co." });
    }
  } else {
    res
      .status(200)
      .json({ status: "failure", msg: "There was a problem confirming your account. Please contact support at support@intellispect.co." });
  }
}

const isObjectIdValid = (id) => {
  return ObjectId.isValid(id) ? (String(new ObjectId(id) === id) ? true : false) : false;
};
