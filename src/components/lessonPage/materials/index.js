import React from "react";
import Link from "next/link";
import styles from "./materials.module.css";

export default function index({ lesson }) {
  let materials = lesson.fields.lessonMaterials;
  let keys = null;
  let items = null;

  if (materials) {
    keys = Object.keys(materials);
    items = keys.map((key, i) => {
      return <MaterialCard item={materials[key]} key={i} />;
    });
  }

  return (
    <>
      {keys ? (
        <div className={styles.container}>
          <h3>Lesson Materials</h3>
          {items}
        </div>
      ) : (
        <div className={styles.container}>
          <h3>Lesson Materials</h3>
          <p>No materials provided for this lesson.</p>
        </div>
      )}
    </>
  );
}

let MaterialCard = ({ item }) => {
  return (
    <Link href={item.link}>
      <a className={styles.linkContainerA}>
        <div className={styles.linkContainer}>
          <p className={styles.name}>{item.name}</p>
          <p className={styles.desc}>{item.desc}</p>
        </div>
      </a>
    </Link>
  );
};
