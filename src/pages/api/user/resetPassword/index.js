import User from "../../../../models/User";
import dbConnect from "../../../../utils/dbConnect";
import { resetUserPassword } from "../../../../utils/lib/user";

export default async function resetPassword(req, res) {
  await dbConnect();
  let { userID, password, token } = req.body;
  let user = await User.findById(userID);

  if (user && token === user.passwordResetToken && user.passwordResetToken) {
    let { salt, hash } = await resetUserPassword(password);
    user.passwordResetToken = null;
    user.salt = salt;
    user.hash = hash;
    await user.save();

    res.status(200).json({ status: "success", msg: null });
  } else if (token === null) {
    res.status(200).json({ status: "failure", msg: "You have clicked an old password reset link.  Please request a new password reset." });
  } else {
    res.status(200).json({ status: "failure", msg: "We were unable to reset your password.  Please request a new password reset." });
  }
}
