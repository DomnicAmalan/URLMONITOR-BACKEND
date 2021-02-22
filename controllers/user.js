const User = require("../models/user");

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