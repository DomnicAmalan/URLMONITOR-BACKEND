const express = require("express");
const router = express.Router();
const {authenticateJWT} =  require("./helpers/authenticateRoute");
const MailController = require("../controllers/mail")

router.get("/send-mail", MailController.SendMail);

module.exports = router;