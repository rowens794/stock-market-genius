import Iron from "@hapi/iron";
import NextList from "../../../../models/NextList";
import { getTokenCookie } from "../../../../utils/userManagment/lib/auth-cookies";
const TOKEN_SECRET = process.env.TOKEN_SECRET;

export default async function refreshUser(req, res) {
  const token = getTokenCookie(req);

  if (!token) {
    res.json(false);
  } else {
    const session = await Iron.unseal(token, TOKEN_SECRET, Iron.defaults);

    //get userLists
    let lists = await NextList.find({ UserID: session._doc._id });
    session._doc.lists = lists;
    res.json(session._doc);
  }
}
