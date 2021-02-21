const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const refreshTokenSecret = 'yourrefreshtokensecrethere';
const refreshTokens = [];

exports.create = async(req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).send({
      message: "Required field can not be empty",
    });
  }
  const user = await User.create({
    email,
  });
  res.json({
    user,
    message: "create user successfully"
  });
};

exports.findUser = async(req, res) => {
  const user = await User.findOne({email: req.body.email})
  if (!user) {
    return res.status(200).send(null);
  }
  else{
    return res.status(200).send(user)
  }
};

exports.createJWTToken = async(req, res) => {
  const checker = req.body.email
  const user = await User.findOne({email: checker}, {password: 0});
  
  try{
    bcrypt.compareSync(checker, user.email);
    const accessToken = jwt.sign({ username: user.email, }, "yourSecretKey", {
      expiresIn: "10s"
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
    return res.sendStatus(401);
  }
  if (!refreshTokens.includes(refreshToken)) {
      return res.sendStatus(403);
  }

  jwt.verify(refreshToken, refreshTokenSecret, (err, user) => {
    if (err) {
        console.log(err)
        return res.sendStatus(403);
    }

    const accessToken = jwt.sign({ username: user.email }, "yourSecretKey", { expiresIn: '10s' });

    res.json({
        accessToken,
        refreshToken
    });
});
}