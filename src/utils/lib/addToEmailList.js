const client = require("@mailchimp/mailchimp_marketing");

export default async function handler(email, name) {
  let promise = new Promise(async (resolve, reject) => {
    client.setConfig({
      apiKey: process.env.apiKey,
      server: process.env.serverLocation,
    });

    let errors = null;
    const response = await client.lists.batchListMembers(process.env.listID, {
      members: [
        {
          email_address: email,
          status: "subscribed",
          merge_fields: {
            FULLNAME: name,
          },
          tags: ["App Registration"],
        },
      ],
    });

    if (response.errors.length) {
      console.log(response.errors);
    }

    resolve(null);
  });

  return promise;
}
