const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const refreshTokenSecret = process.env.APP_REFRESH_TOKEN_SECRET;
const refreshTokens = [];

exports.createJWTToken = async(req, res) => {
  const checker = req.body.email
  const user = await User.findOne({email: checker}, {password: 0});
  console.log(refreshTokens)
  try{
    bcrypt.compareSync(checker, user.email);
    const accessToken = jwt.sign({ username: user.email, }, accessTokenSecret, {
      expiresIn: "24h"
    });  
    const refreshToken = jwt.sign({ username: user.email }, refreshTokenSecret); 
    refreshTokens.push(refreshToken);
    res.status(200).json(res.json({
        user,
        accessToken,
        refreshToken
    }))
  }
  catch(err){
    console.log(err.message)
  }
}

exports.generateToken = async(req, res) => {
  const {refreshToken} = req.body;
  console.log(refreshTokens, refreshToken)
  if (!refreshToken) {
    return res.sendStatus(205);
  }
  if (!refreshTokens.includes(refreshToken)) {
      return res.sendStatus(205);
  }

  jwt.verify(refreshToken, refreshTokenSecret, (err, user) => {
    if (err) {
        console.log(err)
        return res.sendStatus(403);
    }

    const accessToken = jwt.sign({ username: user.email }, "yourSecretKey", { expiresIn: '24h' });

    res.json({
        accessToken,
        refreshToken
    });
});
}