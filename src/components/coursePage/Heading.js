/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useContext, useEffect, useState } from "react";
import YouTube from "react-youtube";

import Link from "next/link";
import { jsx, Box, Container } from "theme-ui";
import SectionHeading from "components/section-heading";
import { userContext } from "../../contexts/user";

const Heading = () => {
  const [user, setUser] = useContext(userContext);
  const [showVideo, setShowVideo] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // only execute all the code below in client side
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      setShowVideo(true);
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const opts = {
    height: windowSize.width < 800 ? windowSize.width * (9 / 16) : 800 * (9 / 16),
    width: windowSize.width < 800 ? windowSize.width : 800,
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  const trackUser = () => {};

  return (
    <Box as="section" id="about-course" sx={styles.section}>
      <Container>
        <div style={{ margin: "auto", textAlign: "center" }}>
          {showVideo ? <YouTube videoId="T9ngD8o0vio" opts={opts} onReady={trackUser} /> : null}
        </div>

        <Box sx={styles.contentWrapper}>
          <p sx={styles.courseDesc}>This page displays the entire course curriculum so that you can get an idea of where this journey will lead. </p>
          {!user.loggedIn ? (
            <p sx={styles.courseDesc}>
              If you{" "}
              <Link href="/create-account">
                <a>register</a>
              </Link>
              , you can also keep track of your progress through the course on this page.
            </p>
          ) : null}
          {user.loggedIn ? (
            <p sx={styles.courseDesc}>As a registered user, you can also use this page to keep track of your progress through the material.</p>
          ) : null}{" "}
        </Box>
      </Container>
    </Box>
  );
};

export default Heading;

const styles = {
  section: {
    pt: [11, 11, 11, 12, 12, 12, 14],
    pb: [7, 7, 7, 5, 5, 5, 5],
  },
  heading: {
    maxWidth: [null, null, null, 455, 660],
    mb: [6, null, null, 8, null, 9, 13],
  },
  contentWrapper: {
    display: "grid",
    justifyContent: ["center", null, null, "unset"],
  },
  courseDesc: {
    margin: "auto",
  },
};
