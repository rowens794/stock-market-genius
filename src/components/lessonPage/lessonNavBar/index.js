import React from "react";
import styles from "./nav.module.css";

export default function index({ navSelection, setNavSelection }) {
  let handleClick = (selection) => {
    setNavSelection(selection);
  };
  return (
    <div className={styles.container}>
      <div className={styles.overFlowContainer}>
        <div className={styles.itemContainer}>
          {navSelection === "content" ? (
            <p className={styles.navSelection}>Content</p>
          ) : (
            <p className={styles.navItem} onClick={() => handleClick("content")}>
              Content
            </p>
          )}
          <p className={styles.navDivider}> | </p>

          {navSelection === "materials" ? (
            <p className={styles.navSelection}>Lesson Materials</p>
          ) : (
            <p className={styles.navItem} onClick={() => handleClick("materials")}>
              Lesson Materials
            </p>
          )}
          <p className={styles.navDivider}> | </p>

          {navSelection === "outline" ? (
            <p className={styles.navSelection}>Course Outline</p>
          ) : (
            <p className={styles.navItem} onClick={() => handleClick("outline")}>
              Course Outline
            </p>
          )}
          <p className={styles.navDivider}> | </p>

          {navSelection === "blog" ? (
            <p className={styles.navSelection}>Blog</p>
          ) : (
            <p className={styles.navItem} onClick={() => handleClick("blog")}>
              Blog
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
