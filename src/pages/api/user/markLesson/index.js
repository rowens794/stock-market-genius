import User from "../../../../models/User";
import dbConnect from "../../../../utils/dbConnect";

export default async function resetPassword(req, res) {
  await dbConnect();
  let { userID, lessonID, markType } = req.body;

  let user = await User.findById(userID); //refresh the user by repulling data

  user.courseStatus[lessonID] = markType;
  await user.save();

  res.status(200).json({ lessonState: user.courseStatus });
}
