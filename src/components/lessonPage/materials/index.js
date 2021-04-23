import React, { useContext } from "react";
import Link from "next/link";

import { userContext } from "../../../contexts/user";
import styles from "./materials.module.css";

export default function index({ lesson }) {
  let [user, setUser] = useContext(userContext);
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
          {!user.loggedIn ? (
            <div>
              <p>Only logged in users can access course materials.</p>
              <p>
                Registration is 100% free.{" "}
                <Link href={`/create-account`}>
                  <a>Create an account here.</a>
                </Link>
              </p>
            </div>
          ) : null}
          {user.loggedIn ? items : null}
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
