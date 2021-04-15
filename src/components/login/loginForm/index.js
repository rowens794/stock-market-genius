import React, { useState, useContext } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

import styles from "./loginForm.module.css";
import { userContext } from "../../../contexts/user";

export default function index() {
  let [user, setUser] = useContext(userContext);
  let [error, setError] = useState(null);
  let [resendConfirmation, setResendConfirmation] = useState(false);
  let [confirmationID, setConfirmationID] = useState(null);

  const router = useRouter();

  const handlelogin = async () => {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let status = await user.login(username, password, user, setUser);
    if (status.showResendConfirmation) {
      setResendConfirmation(true);
      setConfirmationID(status.confirmID);
    }
    if (status.msg) setError(status.msg);
    if (status.status && !status.msg) router.push("/course");
  };

  const handleResendConfirmation = async () => {
    await axios.post(`/api/user/resendConfirmationEmail`, { userID: confirmationID });
    setError("A new confirmation email has been sent to your inbox.");
  };

  const removeError = () => {
    setError(null);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Login</h2>
      <div>
        <div className={styles.inputContainer}>
          <p className={styles.inputLabel}>Email</p>
          <input className={styles.inputBox} id="username" onChange={removeError}></input>
        </div>
        <div className={styles.inputContainer}>
          <p className={styles.inputLabel}>Password</p>
          <input className={styles.inputBox} type="password" id="password" onChange={removeError}></input>
        </div>

        <div className={styles.inputContainer}>
          <button className={`${styles.loginButton} dropshadow2`} onClick={() => handlelogin()}>
            Login
          </button>
        </div>

        <div className={styles.forgotPasswordContainer}>
          <Link href="/forgot-password">
            <a className={styles.forgotPasswordLink}>Forgot Password</a>
          </Link>
        </div>

        <div className={styles.errorContainer}>{error ? <p className={styles.errMsg}>{error}</p> : null}</div>

        {resendConfirmation ? (
          <div className={styles.inputContainer}>
            <button className={`${styles.loginButton} dropshadow2`} onClick={() => handleResendConfirmation()}>
              Resend Confirmation Email
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
