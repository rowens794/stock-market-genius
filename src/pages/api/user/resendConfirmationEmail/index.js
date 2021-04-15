import { sendWelcomeEmail } from "../../../../utils/mail/sendWelcomeMail";
import User from "../../../../models/User";

export default async function signup(req, res) {
  let user = await User.findById(req.body.userID);

  if (!user) {
    res.json("error");
  } else {
    sendWelcomeEmail(user);
    res.json("success");
  }
}
