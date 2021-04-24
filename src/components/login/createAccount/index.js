import React, { useState, useContext } from "react";
import styles from "./createAccount.module.css";

export default function index() {
  let [error, setError] = useState(null);
  let [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setLoading(true);
    const res = await fetch(`/api/user/signup`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: document.getElementById("email").value,
        password: document.getElementById("password").value,
        confirmPassword: document.getElementById("confirmPassword").value,
        name: document.getElementById("name").value,
      }),
    });

    const json = await res.json();
    setLoading(false);

    if (json.errMsg) {
      setError(json.errMsg);
    } else {
      setError("Account created successfully.  Please login.");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Create an Account</h2>
      <div>
        <div className={styles.inputContainer}>
          <p className={styles.inputLabel}>Name</p>
          <input className={styles.inputBox} id="name"></input>
        </div>
        <div className={styles.inputContainer}>
          <p className={styles.inputLabel}>Email</p>
          <input className={styles.inputBox} id="email"></input>
        </div>
        <div className={styles.inputContainer}>
          <p className={styles.inputLabel}>Password</p>
          <input className={styles.inputBox} type="password" id="password"></input>
        </div>
        <div className={styles.inputContainer}>
          <p className={styles.inputLabel}>Confirm Password</p>
          <input className={styles.inputBox} type="password" id="confirmPassword"></input>
        </div>

        <div className={styles.inputContainer}>
          <button className={`${styles.loginButton} dropshadow2`} onClick={() => handleSignup()}>
            Create Account
          </button>
        </div>

        <div className={styles.errorContainer}>{error ? <p className={styles.errMsg}>{error}</p> : null}</div>
      </div>
    </div>
  );
}
