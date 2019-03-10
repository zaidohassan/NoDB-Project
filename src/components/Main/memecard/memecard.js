import React, { Component } from "react";
import axios from "axios";
import Favorite from "../Favorite/Favorite";
import AddButton from "../Button/addButton";
import EditField from "../EditField/EditField";
import "./memecard.css";

class MemeCard extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      favorites: [],
      caption: "",
      display: true
    };

    this.add = this.add.bind(this);
    this.handledelete = this.handledelete.bind(this);
  }

  componentDidMount() {
    axios.get("/api/memes").then(res => {
      console.log(res.data);
      this.setState({ data: res.data });
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

  handleDisplay = () => {
    this.setState({ display: !this.state.display });
  };

  render() {
    const { data, favorites } = this.state;
    let displayData = data.map((memes, i) => {
      return (
        <div key={i}>
          <Favorite memes={memes} />
          <div className="Abutton">
            <AddButton
              add={() => {
                this.add(memes);
              }}
            />
          </div>
        </div>
      );
    });
    let favList = favorites.map((memes, i) => {
      return (
        <div className="buttonLayout" key={i}>
          <Favorite memes={memes} key={i} />
          <button
            className="btn btn-success btn-lg btn-block"
            onClick={() => this.handledelete(memes.id)}
          >
            {" "}
            DELETE MEME{" "}
          </button>
          <EditField
            edit={this.handleEdit}
            change={this.addCaption}
            memes={meme}
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
        <div className="entireFavsList">
          <button
            className="btn btn-success btn-lg btn-block"
            onClick={() => this.handleDisplay()}
          >
            {" "}
            Zaido's Favorite{" "}
          </button>
          {this.state.display === true ? (
            <div className="favMemes"> {favList} </div>
          ) : (
            <div className="hiddenMeme">
              {" "}
              <img src="https://bit.ly/2oewMAa" />
              <p> You Cant Escape Me(mes)!</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default MemeCard;
