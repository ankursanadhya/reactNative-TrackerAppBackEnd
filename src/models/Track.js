const mongoose = require("mongoose");

const pointSchema = new mongoose.Schema({
  timestamp: Number,
  coords: {
    latitude: Number,
    longitude: Number,
    altitude: Number,
    accuracy: Number,
    heading: Number,
    speed: Number,
  },
});
const trackSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    // here we indicate tht userID is a reference to some other object stored inside of mongo DB
    ref: "User",
    //this tells that this is pointing out an instance of User as was defined in User.js
    //this also tells tht our userId is pointing to our User.js
  },
  name: {
    type: String,
    default: "",
  },
  locations: [pointSchema],
});

mongoose.model("Track", trackSchema);
 //in this step that ties some collection of data inside of mongo db to mongoose