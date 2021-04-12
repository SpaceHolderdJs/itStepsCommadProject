const { Router } = require("express");
const userModel = require("../models/User");
const router = Router();

router.get("/", async (req, res) => {
  const users = await userModel.find({}).lean();
  console.log(users);
  res.render("index", {
    title: "main",
    isMain: true,
    script: "/js/front.js",
    users: users,
  });
});

router.get("/registration", (req, res) => {
  res.render("registration", {
    title: "registration",
    isRegistration: true,
    script: "/js/validation.js",
  });
});

router.post("/registration", async (req, res) => {
  const user = new userModel({
    name: req.body.userName,
    surname: req.body.surname,
    email: req.body.email,
    password: req.body.password,
    registrationDate: new Date(),
  });

  await user.save();
  res.redirect("/login");
});

router.get("/login", (req, res) => {
  res.render("login", {
    title: "login",
    isRegistration: true,
    script: "/js/validation.js",
  });
});

router.post("/login", async (req, res) => {
  const user = await userModel.findOne({ email: req.body.email }).lean().exec();

  console.log(user);
  if (!user)
    return res.render("wrong", {
      title: "oops",
      msg: "Some data is wrong",
    });
  user.password === req.body.password &&
    res.render("profile", {
      title: user.name,
      user,
    });
});

router.get("/profile", (req, res) => {
  res.render("profile", {
    title: "profile",
  });
});

router.get("/wrong", (req, res) => {
  res.render("wrong", {
    title: "wrong",
  });
});

router.get("/feedback", (req, res) => {
  res.render("feedback"),
    {
      title: "feeedback",
    };
});

module.exports = router;
