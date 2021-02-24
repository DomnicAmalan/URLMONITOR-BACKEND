const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const tokenController = require("../controllers/token")

router.post("/add-user", userController.create);
router.post("/authenticate", tokenController.createJWTToken);
router.post("/check-user", userController.findUser);
router.post("/token", tokenController.generateToken);
router.post("/logout", tokenController.logout);

module.exports = router;
