import React, { Component } from "react";
import axios from "axios";
import Favorite from "../Favorite/Favorite";
import Button from "../Button/addButton";
import EditField from "../EditField/EditField";
import "./memecard.css";

class MemeCard extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      favorites: [],
      caption: ""
    };

    this.add = this.add.bind(this);
    this.handledelete = this.handledelete.bind(this);
  }

  componentDidMount() {
    axios.get("/api/memes").then(res => {
      this.setState({ data: res.data });
      console.log(res);
    });
  }

  add(memes) {
    axios.post("/api/addMemes", { memes }).then(res => {
      // console.log("res", res.data);

      this.setState({
        favorites: res.data.favoriteMemes,
        data: res.data.memes
      });
      // console.log("res", res.data);
    });
  }

  handledelete(val) {
    axios.delete(`/api/deleteMeme/${val}`).then(res => {
      this.setState({
        favorites: res.data.favoriteMemes,
        data: res.data.memes
      });
    });
  }

  addCaption = val => {
    this.setState({ caption: val });
  };

  handleEdit = id => {
    const { caption } = this.state;
    axios.put(`/api/changeName/${id}`, { caption }).then(res => {
      this.setState({ favorites: res.data });
      // console.log("res", res.data);
    });
  };

  render() {
    const { data, favorites } = this.state;
    let displayData = data.map((memes, i) => {
      return (
        <div key={i}>
          <Favorite memes={memes} />
          <Button
            add={() => {
              this.add(memes);
            }}
          />
        </div>
      );
    });
    let favList = favorites.map((memes, i) => {
      return (
        <div key={i}>
          <Favorite memes={memes} key={i} />
          <button onClick={() => this.handledelete(memes.id)}>
            {" "}
            DELETE ME{" "}
          </button>
          <EditField
            edit={this.handleEdit}
            change={this.addCaption}
            memes={memes}
          />
        </div>
      );
    });

    return (
      <div className="allMemes">
        <div className="displayMemes">
          {" "}
          <h1> Meme's List </h1>
          <div className="memeList"> {displayData}</div>{" "}
        </div>
        <div>
          <h1> Zaido's Favorite</h1>
          <div className="favMemes"> {favList} </div>
        </div>
      </div>
    );
  }
}

export default MemeCard;
