const Monitors = require("../models/monitor")
const agenda = require('../agenda')
const MonitorLogs = require("../models/monitorlogs")
const Jobs = require('mongoose-model-agenda');


exports.createNewMontor = async(req, res) => {
  const monitor = await Monitors.create({
    config: req.body,
    id: req.user.username,
    status: false
  })
  res.status(200).json(res.json({
    monitor
  }))
}

exports.editMonitor = async(req, res) => {
  const monitor = await Monitors.findByIdAndUpdate(req.params.id, {config: req.body});
  res.status(200).json(res.json({
    monitor
  }))
}

exports.addNewJob = async(name, id, interval) => {
  console.log("agenda")
  try{
    const Scheduler = agenda.create('monitors');
    Scheduler.unique({'job_id': String(id)})
    await agenda.start();
    await Scheduler.repeatEvery(interval).save();
  }
  catch(err) {
    console.log(err)
  }
  
}

exports.listMonitors = async(req, res) => {
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

exports.activateDeactivateJob = async(req, res) => {
  console.log(req.body.status)
  try{
    if(req.body.status){
      const monitor = await Monitors.findById(req.params.id);
      const { _id, config } = monitor
      const addJob = await this.addNewJob(config.name, _id, config.cron);
    }
    else{
      await Jobs.findOneAndRemove({job_id: req.params.id}) 
    }
    await Monitors.findByIdAndUpdate(req.params.id, req.body)
    return res.status(200)
  }
  catch(err) {
    console.log(err)
    return res.status(500)
  }
  
}

exports.getAllLogs = async(req, res) => {
  const data = await MonitorLogs.find({jobid: req.params.id})
  res.status(200).json(data)
}

exports.getMonitor = async(req, res) => {
  const data = await Monitors.findById(req.params.id)
  res.status(200).json(data)
}