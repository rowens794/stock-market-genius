var jwt = require("jsonwebtoken");

import User from "../../../../models/User";

export default async function signup(req, res) {
  let decodedJWT = jwt.verify(req.body.token, process.env.JWT_SECRET);

  if (new Date() < new Date(decodedJWT.expire)) {
    let user = await User.findById(decodedJWT.userID);

    let userState = {
      userID: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      signUpDate: user.signUpDate,
      accountConfirmed: user.accountConfirmed,
      courseStatus: user.courseStatus,
    };

    res.status(200).send({ loggedIn: true, userState });
  } else {
    res.status(200).send({ loggedIn: false, userState: null });
  }
}
