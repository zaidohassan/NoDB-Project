const express = require("express");
const app = express();
const { json } = require("body-parser");
const port = 3001;
const {
  getData,
  addMemes,
  deleteMemes,
  editName
} = require("./controller/controller");

app.use(json());

app.get("/api/memes", getData);
app.post("/api/addMemes", addMemes);
app.delete("/api/deleteMeme/:id", deleteMemes);
app.put("/api/changeName/:id", editName);

app.listen(port, () => console.log(`Listening on port ${port}`));
