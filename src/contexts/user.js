import React, { useState } from "react";

export const userContext = React.createContext();

const Context = ({ children }) => {
  const [user, setUser] = useState({
    ...initialState,
  });

  return <userContext.Provider value={[user, setUser]}>{children}</userContext.Provider>;
};

export default Context;

const login = async (email, password, user, setUser) => {
  let promise = new Promise(async (resolve, reject) => {
    const res = await fetch(`/api/user/login`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: email,
        password: password,
      }),
    });

    const json = await res.json();

    let response = {
      status: null,
      msg: null,
      showResendConfirmation: null,
      confirmID: json.userID,
    };

    if (json.status === "success") {
      let tempUser = { ...user };
      tempUser.loggedIn = true;
      tempUser.lessonState = json.userState.courseStatus;
      tempUser.userID = json.userState.userID;

      window.localStorage.setItem("mg-token", json.jwt);
      setUser(tempUser);
      response.status = "success";
      resolve(response);
    } else {
      response.status = "failure";
      response.msg = json.msg;
      response.showResendConfirmation = json.showResendAccountConfirm;
      resolve(response);
    }
  });

  return promise;
};

const logout = async (user, setUser) => {
  let tempUser = { ...user };
  tempUser.loggedIn = false;
  tempUser.lessonState = {};
  window.localStorage.removeItem("mg-token");

  setUser(tempUser);
};

const markLessonComplete = async (user, setUser, lessonString) => {
  let promise = new Promise(async (resolve, reject) => {
    const res = await fetch(`/api/user/markLesson`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lessonID: lessonString,
        markType: true,
        userID: user.userID,
      }),
    });

    const json = await res.json();

    let tempUser = { ...user };
    tempUser.lessonState = json.lessonState;
    setUser(tempUser);

    resolve(true);
  });

  return promise;
};

const markLessonIncomplete = async (user, setUser, lessonString) => {
  let promise = new Promise(async (resolve, reject) => {
    const res = await fetch(`/api/user/markLesson`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lessonID: lessonString,
        markType: false,
        userID: user.userID,
      }),
    });

    const json = await res.json();

    let tempUser = { ...user };
    tempUser.lessonState = json.lessonState;
    setUser(tempUser);

    resolve(true);
  });

  return promise;
};

const initialState = {
  loggedIn: false,
  lessonState: {},
  login,
  logout,
  markLessonComplete,
  markLessonIncomplete,
};
