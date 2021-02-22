const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const tokenController = require("../controllers/token")
const {authenticateJWT} =  require("./helpers/authenticateRoute")


router.post("/add-user", userController.create);
router.post("/authenticate", tokenController.createJWTToken);
router.get("/user", authenticateJWT, (req, res) => {console.log("iii"), res.status(200).send("shdhjsdjshj")});
router.post("/check-user", userController.findUser);
router.post("/token", tokenController.generateToken);

module.exports = router;
