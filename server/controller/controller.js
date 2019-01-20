const axios = require("axios");
let memes = [];
let favoriteMemes = [];
// console.log("res", memes);

module.exports = {
  getData: (req, res) => {
    axios
      .get("https://api.imgflip.com/get_memes")
      .then(response => {
        // console.log(response.data.data.memes);
        memes = response.data.data.memes;
        // console.log(memes);

        res.status(200).json(memes);
      })
      .catch(err => console.log(err));
  },
  addMemes: (req, res) => {
    favoriteMemes.push(req.body.memes);
    // console.log("Res", req.body.memes);
    const index = memes.findIndex(function(meme) {
      //   console.log("Res", memes);
      return +meme.id === +req.body.memes.id;
    });
    memes.splice(index, 1);
    // console.log("newres", memes);
    // console.log("res", index);
    res.status(200).json({ favoriteMemes, memes });
  },

  deleteMemes: (req, res) => {
    // console.log("res", req.body);
    const deleteId = +req.params.id;
    for (let i = 0; i < favoriteMemes.length; i++) {
      if (+favoriteMemes[i].id === deleteId) {
        memes.unshift(favoriteMemes[i]);
        favoriteMemes.splice(i, 1);
      }
    }

    res.status(200).json({ favoriteMemes, memes });
  },

  editName: (req, res) => {
    // console.log("id", req.params.id);
    favoriteMemes.forEach(namechange => {
      if (+namechange.id == +req.params.id) {
        namechange.name = req.body.caption;
      }
    });
    res.status(200).json(favoriteMemes);
    // console.log("res", req.body.caption);
  }
};
