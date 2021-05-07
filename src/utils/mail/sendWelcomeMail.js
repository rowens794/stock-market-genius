const sg = require("sendgrid")(process.env.SENDGRID_API_KEY);

let apiUrl = "http://localhost:3000";
process.env.NODE_ENV !== "development" ? (apiUrl = process.env.apiUrl) : null;

export async function sendWelcomeEmail(user) {
  let email = user.email;
  let name = user.name;
  let userID = user._id;
  let activationCode = user.activationKey;

  return new Promise((resolve, reject) => {
    let request = sg.emptyRequest({
      method: "POST",
      path: "/v3/mail/send",
      body: {
        personalizations: [
          {
            to: [
              {
                email: email,
              },
            ],
            subject: "Activate Your Account",
          },
        ],
        from: {
          email: "ryan@beastockmarketgenius.com",
        },
        content: [
          {
            type: "text/plain",
            value: `Welcome to the course.  I'm so exicted that your here.  To activate your account please visit the following link. \n\n ${apiUrl}confirmAccount/${userID}/${activationCode}`,
          },
        ],
      },
    });

    sg.API(request, function (error, response) {
      if (error) {
        // a false return indicates a failure to successfully send the email
        reject(false);
      } else {
        // a true return indicates a successfully sent email
        resolve(true);
      }
    });
  });
}
