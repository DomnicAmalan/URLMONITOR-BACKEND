const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const accessTokenSecret = process.env.APP_ACCESS_TOKEN_SECRET


exports.authenticateJWT = async(req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
      const token = authHeader.split(' ')[1];
      console.log(accessTokenSecret)
      jwt.verify(token, accessTokenSecret, (err, user) => {
        if (err) {
          return res.sendStatus(401);
        }
        req.user = user;
        next();
      });
  } else {
      res.sendStatus(401);
  }
};