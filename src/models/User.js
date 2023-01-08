const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  email: {
    type: "String",
    unique: true,
    required: true,
  },
  password: {
    type: "String",
    required: true,
  },
});
//presave hook  this is function that going to run before we try to save instance of user into tthe db
userSchema.pre("save", function (next) {
  const user = this;
  //this is referring to current user we want to save
  //next is working like callin next function as we do in authentication
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    // if there is error while generating salt
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

// if we use arrow function here ('save',()=>{}) then vaue of this will refer to context of this inside this file but we want to access user we want to save so we have to use keyword function here we can access user by using this
// userSchema.pre('save',()=>{
// this   this is refering to inside this whole file so thats why we use function keyword
// })

userSchema.methods.comparePassword = function (candidatePassword) {
  // we are crating promise ourselve so that we can use sync await
  const user = this;
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
      if (err) {
        return reject(err);
      }
      if (!isMatch) {
        return reject(false);
      }
      resolve(true);
    });
  });
};
mongoose.model("User", userSchema);
// /we dont export or import this bcz mongoose expect us to use this only once
//we are saying every User is going to have this userSchema
