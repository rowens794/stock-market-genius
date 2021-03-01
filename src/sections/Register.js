/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Button } from "theme-ui";
import { rgba } from "polished";
import SectionHeading from "components/section-heading";

const Register = () => {
  return (
    <div style={{ marginTop: "150px" }} sx={styles.pageBody} id="register">
      {/* <Container> */}
      <SectionHeading sx={styles.heading} title="Register for the Course!" />
      <div sx={styles.textContent}>
        I am currently recording, editing, and finalizing all of the course content. But I'd love it if you'd join the waitlist and I'll let you know
        as soon as production has wrapped.
      </div>

      <form action="">
        <label for="fname" sx={styles.label}>
          Name:
        </label>
        <br />
        <input type="text" id="fname" name="fname" defaultValue="John" sx={styles.input}></input>
        <br />
        <br />

        <label for="fname" sx={styles.label}>
          Email:
        </label>
        <br />
        <input type="text" id="fname" name="fname" defaultValue="john@gmail.com" sx={styles.input}></input>
        <br />
        <br />
        <br />

        <Button>Submit Registration</Button>
      </form>
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
