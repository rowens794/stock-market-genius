import passport from "passport";
import nextConnect from "next-connect";
var jwt = require("jsonwebtoken");

import { localStrategy } from "../../../../utils/lib/password-local";
import { setLoginSession } from "../../../../utils/lib/auth";

const authenticate = (method, req, res) =>
  new Promise((resolve, reject) => {
    passport.authenticate(method, { session: false }, (error, token) => {
      if (error) {
        reject(error);
      } else {
        resolve(token);
      }
    })(req, res);
  });

//local strategy is config'ed in utils/usermanagement/lib
passport.use(localStrategy);

export default nextConnect()
  .use(passport.initialize())
  .post(async (req, res) => {
    try {
      const user = await authenticate("local", req, res);

      //verify the account is confirmed before allowing login
      if (user.accountConfirmed) {
        // session is the payload to save in the token, it may contain basic info about the user
        const session = { ...user };

        await setLoginSession(res, session);

        // add expiration time to state
        var expiration = new Date();
        expiration.setHours(expiration.getHours() + 48);

        let userState = {
          userID: user._id,
          name: user.name,
          email: user.email,
          username: user.username,
          signUpDate: user.signUpDate,
          accountConfirmed: user.accountConfirmed,
          courseStatus: user.courseStatus,
          cookieExpiration: expiration, //set expiration for 8 hours after generation
        };

        const jwt = createJWT(user._id);

        res.status(200).send({ status: "success", userState, jwt });
      } else {
        //if account is not confirmed notify user and offer to resend link
        res.status(200).send({
          status: "failure",
          msg: "Your account is not confirmed. Please click the link in the account confirmation email we sent.",
          showResendAccountConfirm: true,
          userID: user._id,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(401).send({ status: "failure", msg: "Incorrect Username / Password" });
    }
  });

const createJWT = (userID) => {
  var expiration = new Date();
  expiration.setHours(expiration.getHours() + 48);

  var token = jwt.sign({ userID: userID, expire: expiration }, process.env.JWT_SECRET);
  return token;
};
