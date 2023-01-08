const express = require("express");
const mongoose = require("mongoose");
const User = mongoose.model("User");
//now we can use User to manuplate and query all data which is stored in usercollection
const router = express.Router();
//router is a obj that allow us to associate some no of root handlers with it
//now we can take email and password out of body of incoming request
const jwt = require("jsonwebtoken");
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = new User({ email, password });
    await user.save();
    //this save function for mongodb is asynchrnous func this will save our user to mongodb
    const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY");
    //1 argument is info we want to save inside token, 2 argument is secret key for jwt token
    res.send({ token: token });
  } catch (error) {
    return res.status(422).send(error.message);
    console.log("not good");
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).send({ error: "Must Provide email and Password" });
  }
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(404).send({ error: "Email Not Found" });
  }

  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY");
    res.send({ token });
  } catch (err) {
    return res.status(422).send({ error: "Invalid password or email" });
  }
});
module.exports = router;
