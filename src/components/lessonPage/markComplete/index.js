import React, { useContext } from "react";
import styles from "./mc.module.css";

import { userContext } from "../../../contexts/user";

export default function index({ lesson }) {
  const [user, setUser] = useContext(userContext);

  let lessonString = `l${lesson.fields.sectionNumber}${lesson.fields.lessonNumber}`;

  const markComplete = () => {
    user.markLessonComplete(user, setUser, lessonString);
  };

  const markIncomplete = () => {
    user.markLessonIncomplete(user, setUser, lessonString);
  };

  return (
    <div className={styles.container}>
      {user.lessonState[lessonString] ? (
        <div className={styles.buttonComplete} onClick={markIncomplete}>
          <p className={styles.textComplete}>Mark Incomplete</p>
        </div>
      ) : (
        <div className={styles.buttonIncomplete} onClick={markComplete}>
          <p className={styles.textIncomplete}>Mark Complete</p>
        </div>
      )}
    </div>
  );
}
