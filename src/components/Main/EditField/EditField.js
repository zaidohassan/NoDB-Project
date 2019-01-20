import React from "react";

const EditName = props => {
  const { id } = props.memes;
  return (
    <div>
      <input onChange={e => props.change(e.target.value)} />
      <button onClick={() => props.edit(id)}>Edit ME </button>
    </div>
  );
};

export default EditName;
