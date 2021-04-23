/** @jsxRuntime classic */
/** @jsx jsx */
import react, { useState, useEffect } from "react";
import Link from "next/link";
import { jsx, Button } from "theme-ui";
import { rgba } from "polished";
import SectionHeading from "components/section-heading";
import { logEvent } from "../analytics/index";
// import RedditPixel from "react-reddit-pixel";

const Register = () => {
  let [submissionState, setSubmissionState] = useState(null);

  const subscribeHandler = async () => {
    let apiUrl = "http://localhost:3000";
    process.env.NODE_ENV !== "development" ? (apiUrl = "https://beastockmarketgenius.com/") : null;

    let email = document.getElementById("email").value;

    fetch(`${apiUrl}/api/route`, {
      method: "GET", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        email: email,
      },
    })
      .then((res) => res.text())
      .then(function (data) {
        if (!data) {
          logEvent("Registration", "Registered");
          // RedditPixel.track("Lead");
          setSubmissionState("SUBMITTED");
        }
        if (data === "ERROR_CONTACT_EXISTS") {
          setSubmissionState("ERROR_CONTACT_EXISTS");
        } else if (data) setSubmissionState("ERROR");
      });
  };

  return (
    <div style={{ marginTop: "150px" }} sx={styles.pageBody} id="register">
      {/* <Container> */}
      <SectionHeading sx={styles.heading} title="Register for the Course!" />
      <div sx={styles.textContent}>
        The majority of the course content is written and currently accessible. Over the next few weeks I will be finalizing the content for the last
        course section on valuation and recording all course videos. By registering, you'll be able to access all course materials, keep track of your
        progress, and I'll keep you notified as the remaining content is finalized.
      </div>

      <div sx={styles.textContent}>
        Just to be clear, this is a <b>free course</b>. I'm not going to ask you to pay once it's complete.
      </div>

      {/* <label htmlFor="email" sx={styles.label}>
        Email:
      </label>
      <br />
      <input type="text" id="email" name="email" defaultValue="example@mail.com" sx={styles.input}></input>
      <br />
      <br />
      <br /> */}

      <Link href="/create-account">
        <a>
          <Button>Register for Free</Button>
        </a>
      </Link>

      {submissionState === "SUBMITTED" ? <p>Submission recieved</p> : null}
      {submissionState === "ERROR_CONTACT_EXISTS" ? <p>You've already registered</p> : null}
      {submissionState === "ERROR" ? <p>There was an error with your submission, please check your email address.</p> : null}
      <div style={{ height: "30vh" }}></div>
    </div>
  );
};

export default Register;

const styles = {
  submit: {
    fontFamily: "body",
    fontWeight: 700,
    fontSize: [1, null, null, 2, 2, 2],
    lineHeight: [1.87, null, null, 2.08],
    color: "white",
  },
  input: {
    fontFamily: "body",
    fontWeight: 400,
    fontSize: [1, null, null, 2, 2, 2],
    lineHeight: [1.87, null, null, 2.08],
    color: "black",
    padding: "4px",
    width: "100%",
    maxWidth: "320px",
    margin: "auto",
    textAlign: "center",
  },
  label: {
    fontFamily: "body",
    fontWeight: 400,
    fontSize: [1, null, null, 2, 2, 2],
    lineHeight: [1.87, null, null, 2.08],
    color: "black",
    width: "100%",
    maxWidth: "320px",
    margin: "auto",
  },
  pageBody: {
    width: "90%",
    maxWidth: "880px",
    margin: "auto",
    textAlign: "center",
  },
  section: {
    backgroundColor: rgba("#FFF5ED", 0.5),
    pt: [7, null, null, 9, null, 10, 11],
    pb: [9, null, null, 10, 11],
  },
  textContent: {
    margin: "50px 0",
  },
  sectionHeading: {
    fontFamily: "heading",
    fontWeight: 700,
    fontSize: [2, null, null, 3, 4, 6],
    lineHeight: [1.87, null, null, 2.08],
    color: "black",
  },
  showOnDesktop: {
    visibility: ["none", "none", "inline-block"],
  },
  mobileContainer: {
    paddingTop: "80px",
  },
  author: {
    fontFamily: "body",
    fontWeight: 400,
    fontSize: [2, null, null, 3, 4, 6],
    lineHeight: [1.87, null, null, 2.08],
    color: "#7E8896",
  },
};
