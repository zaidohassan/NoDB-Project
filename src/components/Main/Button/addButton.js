import React from "react";
import "./Button.css";

const AddButton = props => {
  return (
    <button
      className="btn btn-success btn-lg btn-block"
      onClick={() => props.add()}
    >
      {" "}
      ADD ME{" "}
    </button>
  );
};
export default AddButton;
