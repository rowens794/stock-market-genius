import React from "react";
import Link from "next/link";
import styles from "./subNav.module.css";

export default function index({ rawSort, lessonID, setNavSelection }) {
  let index = 0;
  rawSort.forEach((item, i) => (item.id === lessonID ? (index = i) : null));

  let prevLesson = index > 0 ? rawSort[index - 1] : null;
  let nextLesson = index < rawSort.length - 1 ? rawSort[index + 1] : null;

  const resetNavSelection = () => {
    console.log("hit");
  };

  return (
    <div className={styles.container}>
      {prevLesson ? (
        <Link href={`/course/${prevLesson.slug}`}>
          <a className={styles.activeButton}>Previous</a>
        </Link>
      ) : (
        <p className={styles.inactiveButton}>Previous</p>
      )}
      {nextLesson ? (
        <Link href={`/course/${nextLesson.slug}`}>
          <a className={styles.activeButton}>Next</a>
        </Link>
      ) : (
        <p className={styles.inactiveButton}>Next</p>
      )}
    </div>
  );
}
