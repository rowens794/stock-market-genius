import { createUser } from "../../../../utils/lib/user";
import { sendWelcomeEmail } from "../../../../utils/mail/sendWelcomeMail";

export default async function signup(req, res) {
  try {
    let user = await createUser(req.body);
    if (!user.error) {
      await sendWelcomeEmail(user);
      res.status(200).send({ done: true });
    } else {
      res.status(200).send({ done: true, errMsg: user.error });
    }
  } catch (error) {
    console.error(error);
    res.status(500).end(error.message);
  }
}
