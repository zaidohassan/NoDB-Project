import React from "react";
import "./Button.css";

const Button = props => {
  return <button onClick={() => props.add()}> ADD ME </button>;
};
export default Button;
