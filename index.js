const express = require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");

const path = require("path");

const mainRoutes = require("./routes/router");

const { createServer } = require("http");
const port = 3000;

const hbs = exphbs.create({ defaultLayout: "main", extname: "hbs" });

const app = express();

app.engine("hbs", hbs.engine);

app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));

app.use(mainRoutes);

mongoose
  .connect(
    "mongodb+srv://Igor:somepassword1999@main.2p6yd.mongodb.net/App?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("mongo connected");
  })
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  // AppS.create({
  //   name: "Igor",
  //   surname: "Pypkin",
  //   email: "some@gmail.com",
  //   password: "somepass",
  //   posts: {
  //     1: {
  //       title: "hello",
  //       body: "Some text",
  //     },
  //   },
  // })
  //   .then((user) => res.send(user))
  //   .catch((err) => console.log(err));
});

const server = createServer(app);
server.listen(port, () => {
  console.log("Server started", port);
});
