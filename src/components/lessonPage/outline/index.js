/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useContext } from "react";
import Link from "next/link";
import { jsx, Box, Container } from "theme-ui";
import TaskComplete from "../../../components/icons/taskComplete";
import NoStatus from "../../../components/icons/emptyCircle";
import { userContext } from "../../../contexts/user";

const Content = ({ orderedLessons, setNavSelection }) => {
  const [user, setUser] = useContext(userContext);

  let sections = orderedLessons.map((section, i) => {
    let lessons = section.map((lesson) => {
      let lessonMark = null;
      if (user.loggedIn && user.lessonState && user.lessonState[lesson.lessonID]) lessonMark = "complete";

      return (
        <div sx={styles.lessonFlex} key={lesson.id}>
          {!lessonMark ? (
            <div sx={styles.lessonIndicator}>
              <NoStatus color={"7f7f7f"} size={24} />
            </div>
          ) : null}

          {lessonMark === "complete" ? (
            <div sx={styles.lessonIndicator}>
              <TaskComplete color={"0A8080"} size={24} />
            </div>
          ) : null}

          <Link href={`/course/${lesson.id}`}>
            <a sx={styles.lessonLink} onClick={() => setNavSelection("content")}>
              {lesson.title}
            </a>
          </Link>
        </div>
      );
    });

    return (
      <div key={i}>
        <h3>{section[0].sectionName}</h3>
        {lessons}
      </div>
    );
  });

  return (
    <Box as="section" id="about-course" sx={styles.section}>
      <h2 sx={styles.courseOutline}>Course Outline</h2>

      <Container>{sections}</Container>
    </Box>
  );
};

export default Content;

const styles = {
  section: {
    pt: [2, 2, 2, 2, 2, 2, 7],
    pb: [7, 7, 7, 9, 9, 10, 11],
    pl: [2],
    pr: [2],
    maxWidth: [null, null, null, 455, 660],
    margin: "auto",
  },
  heading: {
    maxWidth: [null, null, null, 455, 660],
    mb: [6, null, null, 8, null, 9, 13],
  },
  courseOutline: {
    mt: 0,
  },
  contentWrapper: {
    gap: "1rem",
    display: "grid",
    justifyContent: ["center", null, null, "unset"],
  },
  courseDesc: {
    margin: "auto",
  },
  lessonContainer: {
    maxWidth: [null, null, null, 660, 800],
    margin: "3rem auto",
  },
  lessonFlex: {
    display: "flex",
    flexDirection: "row",
    margin: ".5rem",
  },
  lessonIndicator: {
    color: "green",
    marginRight: ".5rem",
  },
  lessonLink: {
    textDecoration: "none",
    cursor: "pointer",
  },
};
