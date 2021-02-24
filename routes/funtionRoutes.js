const express = require("express");
const router = express.Router();
const {authenticateJWT} =  require("./helpers/authenticateRoute");
const FuntionController = require("../controllers/functions")

router.post("/url-monitor-add", authenticateJWT, FuntionController.createNewMontor);
router.post("/list-monitors", authenticateJWT, FuntionController.listMonitors)
router.delete("/delete-monitor/:id", authenticateJWT, FuntionController.deleteMonitor);
router.post("/activate-job/:id/", authenticateJWT, FuntionController.activateDeactivateJob);
router.get("/get-logs/:id", authenticateJWT, FuntionController.getAllLogs);
router.get("/get-monitor/:id", authenticateJWT, FuntionController.getMonitor)
router.post("/update-monitor/:id", authenticateJWT, FuntionController.editMonitor)


module.exports = router;