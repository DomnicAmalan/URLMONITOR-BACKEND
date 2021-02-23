const Monitors = require("../models/monitor")
const agenda = require('../agenda')
var mongoose = require('mongoose');
const Jobs = require('mongoose-model-agenda');



exports.createNewMontor = async(req, res) => {
  const monitor = await Monitors.create({
    config: req.body,
    id: req.user.username
  })
  const { _id, config } = monitor
  this.addNewJob(_id, config.confing.intervalUnits, config.interval);
  res.status(200).json(res.json({
    monitor
  }))
}

exports.addNewJob = async(id, units, interval) => {
  const Scheduler = agenda.create('send email report');
  Scheduler.unique({'job_id': String(id)})
  await agenda.start();
  await Scheduler.repeatEvery(`${interval} ${units}`).save();
}

exports.listMonitors = async(req, res) => {
  console.log(req.user)
  const monitorsList = await Monitors.find({
    id: req.user.username
  });
  res.status(200).json(
    monitorsList
  )
}

exports.deleteMonitor = async(req, res) => {
  const MonitorLogsDelete = await Jobs.findOneAndRemove({job_id: req.params.id})
  const MonitorDelete = await Monitors.findByIdAndRemove({_id: req.params.id}); 
  res.status(200).json(
    true
  )
}