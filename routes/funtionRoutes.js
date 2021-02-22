const express = require("express");
const router = express.Router();
const {authenticateJWT} =  require("./helpers/authenticateRoute");

router.post("/url-monitor-add", authenticateJWT, (req, res) => {console.log("iii"), res.send("shdhjsdjshj")})

module.exports = router;