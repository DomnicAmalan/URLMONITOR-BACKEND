const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const jwt = require('jsonwebtoken');
const User = require("../models/user");

const authenticateJWT = async(req, res, next) => {
  const authHeader = req.headers.authorization;
  const currentUser = req.headers.currentuser

  if (authHeader) {
      const token = authHeader.split(' ')[1];
      const user =  await User.findById(currentUser)
      const accessTokenSecret = 'yourSecretKey';
      jwt.verify(token, accessTokenSecret, (err, user) => {
        if (err) {
          // console.log(err)
          return res.sendStatus(403);
        }
        req.user = user;
        next();
      });
  } else {
      res.sendStatus(401);
  }
};

router.post("/add-user", userController.create);
router.post("/authenticate", userController.createJWTToken);
router.get("/user", authenticateJWT, (req, res) => {console.log("iii"), res.send("shdhjsdjshj")});
router.post("/check-user", userController.findUser);
router.post("/token", userController.generateToken);

module.exports = router;
