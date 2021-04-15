const sg = require("sendgrid")(process.env.SENDGRID_API_KEY);

let apiUrl = "http://localhost:3000";
process.env.NODE_ENV !== "development" ? (apiUrl = process.env.apiUrl) : null;

export async function sendPasswordReset(user) {
  let email = user.email;
  let userID = user._id;
  let resetToken = user.passwordResetToken;

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
            subject: "Reset Your Password",
          },
        ],
        from: {
          email: "ryan@beastockmarketgenius.com",
        },
        content: [
          {
            type: "text/plain",
            value: `To reset your password please visit the following link. \n\n ${apiUrl}/resetPassword/${userID}/${resetToken}`,
          },
        ],
      },
    });

    sg.API(request, function (error, response) {
      if (error) {
        console.log(error);
        // a false return indicates a failure to successfully send the email
        reject(false);
      } else {
        // a true return indicates a successfully sent email
        resolve(true);
      }
    });
  });
}
