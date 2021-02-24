// const Queue = require('bull');
// const Monitors = require("./models/monitor");
// const Monitor = require('ping-monitor');
// const MonitorLogs = require("./models/monitorlogs");

// exports.MonitorQueue = new Queue('jobs',{
//   redis: {
//     port: 6379
//   }
// });

// this.MonitorQueue.process('jobs', 5,  async (job, done) => {
//   const PingData = await Monitors.findById(job.data.job_id) 
//   const myMonitor = await new Monitor(PingData.config)
//   await myMonitor.on('up', function (res, state) {
//     if(res.responseTime > 50){
//       MonitorLogs.create({
//         jobid: job.data.job_id,
//         responseTime: res.responseTime,
//         message: "website took greater than 50ms"
//       })
//     }
//   });
//   await myMonitor.on('down', function (res) {
//     MonitorLogs.create({
//       jobid: job.attrs.job_id,
//       responseTime: -1,
//       message: "Website Down"
//     })
//   });
//   await myMonitor.on('stop', function (website) {
//       console.log(website + ' monitor has stopped.');
//   });
//   await myMonitor.on('error', function (error) {
//     MonitorLogs.create({
//       jobid: job.attrs.job_id,
//       responseTime: -1,
//       message: error
//     })
//   });
//   done();
// });