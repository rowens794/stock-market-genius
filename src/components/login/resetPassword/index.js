import React, { useState, useContext } from "react";
import { useRouter } from "next/router";

import styles from "./loginForm.module.css";
import helpers from "../../../utils/helpers";

export default function index() {
  let [error, setError] = useState(null);
  let [resetSucessful, setResetSuccessful] = useState(false);
  const router = useRouter();

  const handleReset = async () => {
    let { userID, token } = router.query;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    if (helpers.checkPasswordValidity(password, confirmPassword)) {
      const res = await fetch(`/api/user/resetPassword`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password,
          userID,
          token,
        }),
      });

      const json = await res.json();

      if (json.status === "success") {
        //handle a successful reset
        setError("Password Sucessfully Reset.  Please Login.");
        setResetSuccessful(true);
      } else {
        // display error message
        setError(json.msg);
      }
    } else {
      setError("Passwords do not match");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Reset Your Password</h2>
      <p className={styles.subtitle}>Enter your new password.</p>

      <div>
        <div className={styles.inputContainer}>
          <p className={styles.inputLabel}>New Password</p>
          <input className={styles.inputBox} id={"password"} type="password"></input>
        </div>

        <div className={styles.inputContainer}>
          <p className={styles.inputLabel}>Confirm Password</p>
          <input className={styles.inputBox} id={"confirmPassword"} type="password"></input>
        </div>

        <div className={styles.inputContainer}>
          <button className={`${styles.loginButton} dropshadow2`} onClick={() => handleReset()}>
            Change Password
          </button>
        </div>

        <div className={styles.errorContainer}>{error ? <p className={styles.errMsg}>{error}</p> : null}</div>
      </div>
    </div>
  );
}
