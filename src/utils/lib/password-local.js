import Local from "passport-local";
import { findUser, validatePassword } from "./user";

export const localStrategy = new Local.Strategy(function (username, password, done) {
  findUser({ username })
    .then(async (user) => {
      let validPassword = await validatePassword(user, password);

      if (user && validPassword) {
        done(null, user);
      } else {
        done(new Error("Invalid username and password combination"));
      }
    })
    .catch((error) => {
      done(error);
    });
});
