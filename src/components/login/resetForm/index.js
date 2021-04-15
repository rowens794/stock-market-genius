import React, { useState, useContext } from "react";
import styles from "./loginForm.module.css";

export default function index() {
  let [error, setError] = useState(null);
  let [loading, setLoading] = useState(false);

  const handlereset = async () => {
    setError(null);

    setLoading(true);
    const res = await fetch(`/api/user/forgotPassword`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: document.getElementById("email").value,
      }),
    });

    const json = await res.json();
    setLoading(false);
    setError(json.msg);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Reset Your Password</h2>
      <p className={styles.subtitle}>Enter your email and we'll send you a link to reset your password.</p>

      <div>
        <div className={styles.inputContainer}>
          <p className={styles.inputLabel}>Email</p>
          <input className={styles.inputBox} id={"email"}></input>
        </div>

        <div className={styles.inputContainer}>
          <button className={`${styles.loginButton} dropshadow2`} onClick={() => handlereset()}>
            Send Reset Request
          </button>
        </div>

        <div className={styles.errorContainer}>{error ? <p className={styles.errMsg}>{error}</p> : null}</div>
      </div>
    </div>
  );
}
