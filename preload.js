const express = require("express");
const app = express();
const port = 3002;
const cors = require("cors");

app.use(express.json());
app.use(cors());

const { User } = require("./models");

app.get("/", (req, res) => res.send("Hello World!"));
app.get("/users", async (req, res) => {
  const users = await User.findAll();
  res.send(users);
});

app.post("/users", async (req, res) => {
  const { name, role } = req.body;
  const user = await User.create({ name, role });
  res.send(user);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
