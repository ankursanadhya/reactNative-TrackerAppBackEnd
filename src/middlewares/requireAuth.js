const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  //we write Authorization in postman but wheen req come express lower cases any header name
  if (!authorization) {
    return res.status(401).send({ error: 'Must Be loged In' });
  }
  //authorization= {Bearer asfdsfsddskj677asd75...}
  const token = authorization.replace('Bearer ', '');
  jwt.verify(token,'MY_SECRET_KEY', async (err, payload) => {
    //here payload will be our userid which we provide while creating user
    if (err) {
        // console.lg(token)
        // console.log(err)
      return res.status(402).send({ error: 'You Must Be Logged In' });
    }
    const { userId } = payload;
    const user = await User.findById(userId);
    //we are checking what user name exit on this user id
    req.user = user;
    //in some  route we may require the username
    next();
  });
  //first  argument is token we want to verify which we get from user 2 is secret key
};
