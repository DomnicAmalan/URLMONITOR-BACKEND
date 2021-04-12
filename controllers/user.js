const User = require("../models/user");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const path = require("path");
const ejs = require('ejs');
const {VerifyTokenGenerate, VerifyEmailToken} = require('./token')
const {SendMail} = require('./mail')

exports.create = async(req, res) => {
  const { email, password } = req.body;
  const encryptedPassword = await bcrypt.hash(password, saltRounds)
  if (!email) {
    return res.status(400).send({
      message: "Required field can not be empty",
    });
  }
  const user = await User.create({
    email,
    password: encryptedPassword
  });

  const mailData = {
    from: 'amalandomnic@gmail.com', 
    subject: 'Ping Monitor Verify Email',
    to: email
  };
  const token = await VerifyTokenGenerate(email)
  console.log(token)
  const template = await ejs.renderFile(path.join(__dirname, '../templates/email.ejs'),{user_firstname: "Domnic", token:`http://localhost:3030/api/users/verify-token/${token}`})
  mailData.html = template
  const mailsent =  await SendMail(mailData)
  console.log(mailsent, "mail status")
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