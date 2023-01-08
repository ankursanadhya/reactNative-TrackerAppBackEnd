const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require("../middlewares/requireAuth");
const Track = mongoose.model("Track");
const router = express.Router();
router.use(requireAuth);
//this will ensure tht all the req handlers we attatched to this router will require to sign in
router.get("/tracks", async (req, res) => {
  const tracks = await Track.find({ userId: req.user._id });
  //here we get our userid in req.user by middleware requireAuth
  res.send(tracks);
});
router.post("/tracks", async (req, res) => {
  const { name, locations } = req.body;
  if (!name || !locations) {
    return res
      .status(422)
      .send({ error: "You Must provide valid name and loactions" });
  }
  try {
    const track = new Track({ name, locations, userId: req.user._id });
    await track.save();
    res.send(track);
  } catch (error) {
    res.status(422).send({ error: err.message });
  }
});
module.exports = router;
