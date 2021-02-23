const dotenv = require('dotenv');
const Agenda = require('agenda');
const Monitors = require("./models/monitor");
const Monitor = require('ping-monitor');
const MonitorLogs = require("./models/monitorlogs")

dotenv.config();

const MONGO_URI = process.env.MONGO_URI

const agenda = new Agenda({
  db: {address: MONGO_URI, collection: 'jobs'}
});

agenda
 .on('ready', () => {
   console.log('Agenda started!')})
 .on('error', () => console.log('Agenda connection error!'));

agenda.define('send email report', {priority: 'high', concurrency: 10}, async(job, done) => {
  const PingData = await Monitors.findById(job.attrs.job_id)
  const myMonitor = await new Monitor(PingData.config)
  await myMonitor.on('up', function (res, state) {
      MonitorLogs.create({
        jobid: job.attrs.job_id,
        responseTime: res.responseTime
      })
  });
  await myMonitor.on('down', function (res) {
      console.log('Oh Snap!! ' + res.website + ' is down! ' + res.statusMessage);
  });
  await myMonitor.on('stop', function (website) {
      console.log(website + ' monitor has stopped.');
  });
  await myMonitor.on('error', function (error) {
      console.log(error);
  })
  done()
});

module.exports = agenda;