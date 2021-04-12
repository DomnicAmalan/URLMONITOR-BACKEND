const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const refreshTokenSecret = process.env.APP_REFRESH_TOKEN_SECRET;
const accessTokenSecret = process.env.APP_ACCESS_TOKEN_SECRET
const refreshTokens = [];

exports.createJWTToken = async(req, res) => {
  const {email, password} = req.body
  const user = await User.findOne({email: email});
  console.log(email, password)
  try{
    bcrypt.compareSync(password, user.password);
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

exports.VerifyTokenGenerate = async(email) => {
  const verifytoken = await jwt.sign({ username: email}, "verificationtoken", { expiresIn: '24h' });
  return verifytoken
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

exports.VerifyEmailToken = async(req, res) => {
  const token = req.params.token
  try{
    const data = await jwt.verify(token, "verificationtoken")
    const status = await User.findOneAndUpdate({email: data.username}, {verified: true}); 
    res.send("Verified Successfully")
  }
  catch(err) {
    res.send(err.message)
  }
  
  
}

exports.logout = async(req, res) => {
  var index = refreshTokens.indexOf(req.body.refreshToken);
  if (index !== -1) {
    refreshTokens.splice(index, 1);
  }
  res.status(200).json(true)
}