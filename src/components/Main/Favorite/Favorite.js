import React from "react";
import "./Favorite.css";

const Favorite = props => {
  const { name, url } = props.memes;
  return (
    <div className="memes">
      <span>
        {" "}
        <h3> {name} </h3>{" "}
      </span>
      <img src={url} alt={name} />
    </div>
  );
};

export default Favorite;
