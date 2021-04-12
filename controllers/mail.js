var nodemailer = require('nodemailer');

const {
  GMAIL_SERVICE_PORT,
  GMAIL_SERVICE_HOST,
  GMAIL_USER_NAME,
  GMAIL_USER_PASSWORD
} = process.env;

const transporter = nodemailer.createTransport({
  port: GMAIL_SERVICE_PORT,
  host: GMAIL_SERVICE_HOST,
     auth: {
          user: GMAIL_USER_NAME,
          pass: GMAIL_USER_PASSWORD,
       },
  secure: false,
  requireTLS: true,
});

exports.SendMail = async(mailData) => {
  console.log("dyfdy", mailData)
  transporter.sendMail(mailData, function (err, info) {
    if(err){
      console.log(err)
      return err
    }
    else{
      console.log(info)
      return info
    }
      
 });
}