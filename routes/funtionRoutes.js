const express = require("express");
const router = express.Router();
const {authenticateJWT} =  require("./helpers/authenticateRoute");
const FuntionController = require("../controllers/functions")

router.post("/url-monitor-add", authenticateJWT, FuntionController.createNewMontor)

module.exports = router;