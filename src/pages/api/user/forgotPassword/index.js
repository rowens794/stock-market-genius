import crypto from "crypto";

import helpers from "../../../../utils/helpers";
import User from "../../../../models/User";
import dbConnect from "../../../../utils/dbConnect";
import { sendPasswordReset } from "../../../../utils/mail/sendPasswordReset";

export default async function resetPassword(req, res) {
  await dbConnect();

  let email = helpers.validateAndNormalizeEmail(req.body.email);
  let user = await User.findOne({ email: email });

  if (user) {
    user.passwordResetToken = crypto.randomBytes(16).toString("hex");
    user.passwordResetTokenExpiration = new Date();
    user.passwordResetTokenExpiration.setHours(user.passwordResetTokenExpiration.getHours() + 2);
    await user.save();
    sendPasswordReset(user);
    res.status(200).json({ msg: "Password reset link sent to your email address." });
  } else {
    res.status(200).json({ msg: "We were unable to find a user with that email address on file." });
  }
}
