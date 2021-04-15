import React from "react";
import User from "./user";

const ContextWrapper = ({ children }) => {
  return <User>{children}</User>;
};

export default ContextWrapper;
