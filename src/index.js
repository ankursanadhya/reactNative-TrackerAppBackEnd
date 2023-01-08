require("./models/User");
require("./models/Track");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
//body parser is a lib tht will pass info associated with body property of incoming req
const authRoutes = require("./routes/authRoutes");
const trackRoutes = require("./routes/trackRoutes");
const requireAuth = require("./middlewares/requireAuth");

const app = express();
app.use(bodyParser.json());
//this must be above autroutes
//body parser is a lib tht will pass info associated with body property of incoming req once its parses info this will place all info into req part of the routes
app.use(authRoutes);
app.use(trackRoutes);
const mongouri =
  "mongodb+srv://admin:passwordpassword@cluster0.z4fkb.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongouri);
mongoose.connection.on("connected", () => {
  console.log("connection success with mongodb");
});
mongoose.connection.on("err", () => {
  console.log("connection not good with mongodb", err);
});
app.get("/", requireAuth, (req, res) => {
  // res.send("hu");
  res.send(`Your email:${req.user.email}`)
});
// when someone makes a get type http request to root route of our application we want to run this function .this func run automatically with an request obj(obj tht represent incoming http request ) and a res object which represt outgoing response

app.listen(3000, () => {
  console.log("listening on Port 3000");
});
