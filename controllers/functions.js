const Monitors = require("../models/monitor")
const Monitor = require('ping-monitor');


exports.createNewMontor = async(req, res) => {
  const monitor = await Monitors.create({
    config: req.body,
    id: req.user.username
  })
  res.json({
    monitor,
    message: "create monitor successfully"
  });
}