const client = require("@mailchimp/mailchimp_marketing");

export default async function handler(req, res) {
  client.setConfig({
    apiKey: process.env.apiKey,
    server: process.env.serverLocation,
  });

  const run = async () => {
    let errors = null;
    const response = await client.lists.batchListMembers(process.env.listID, {
      members: [
        {
          email_address: req.headers.email,
          status: "subscribed",
          // merge_fields: {},
        },
      ],
    });

    if (response.errors.length) {
      errors = response.errors[0].error_code;
    }

    return errors;
  };

  let error = await run();

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.send(error);
}
