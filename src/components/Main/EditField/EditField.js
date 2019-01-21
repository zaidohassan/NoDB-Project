import React from "react";
import "./EditField.css";

const EditName = props => {
  const { id } = props.memes;
  return (
    <div className="Edit">
      <button
        className="btn btn-success btn-sm btn-block"
        onClick={() => props.edit(id)}
      >
        Caption Meme{" "}
      </button>

      <div>
        <input onChange={e => props.change(e.target.value)} />
      </div>
    </div>
  );
};

export default EditName;
