const client = require("@mailchimp/mailchimp_marketing");
const User = require("../../../models/User");
const { dbConnect } = require("../../../utils/dbConnect");

export default async function handler(req, res) {
  client.setConfig({
    apiKey: process.env.apiKey,
    server: process.env.serverLocation,
  });

  let users = await User.find({});

  for (let i = 0; i < users.length; i++) {
    let user = users[i];

    const response = await client.lists.batchListMembers(process.env.listID, {
      members: [
        {
          email_address: user.email,
          status: "subscribed",
          merge_fields: {
            FULLNAME: user.name,
          },
          tags: ["App Registration"],
        },
      ],
    });

    if (response.errors.length) {
      console.log(response.errors[0]);
    }
  }

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.send("done");
}
