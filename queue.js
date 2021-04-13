const Queue = require('bull');
const Monitors = require("./models/monitor");
const Monitor = require('ping-monitor');
const MonitorLogs = require("./models/monitorlogs");
const dotenv = require('dotenv');
const {SendMail} = require('./controllers/mail')

const path = require("path");
const ejs = require('ejs');

dotenv.config();

const {
  REDIS_HOST,
  REDIS_PORT,
  REDIS_HOST_PWD
} = process.env

exports.MonitorQueue = new Queue('jobs',{
  redis: {
    host: REDIS_HOST,
    password: REDIS_HOST_PWD,
    port: REDIS_PORT
  }
});

const monitorCOnstructor = (data) => {
  const config = {
    [data.type]: data.address,
    title: data.name,
    expect: {
      statusCode: data.expectedCode
    },
    ignoreSSL: data.ignoreSSL
  };
  if(data.portneeded && data.port){
    config.port = data.port
  }
  if(data.apioptions && data.httpOptions){
    config.httpOptions = data.httpOptions
  }
  return config
}

const mailData = {
  from: 'amalandomnic@gmail.com', 
  subject: 'URL monitor status message',
};

this.MonitorQueue.process('jobs', 5,  async (job, done) => {
  const PingData = await Monitors.findById(job.data.job_id)
  const config = monitorCOnstructor(PingData.config)
  mailData.to = PingData.id
  const myMonitor = await new Monitor(config)
  await myMonitor.on('up', async(res, state) => {
    if(res.responseTime > 50){
      mailData.html =  await ejs.renderFile(path.join(__dirname, 'templates/error.ejs'),{status_code: res.statusCode, message: res.statusMessage})
      JobCreate(job.data.job_id, res.statusMessage, res.responseTime)
    }
    else{
      JobCreate(job.data.job_id, res.statusMessage, res.responseTime)
    }
  });
  await myMonitor.on('down', async(res) => {
    mailData.html =  await ejs.renderFile(path.join(__dirname, 'templates/error.ejs'),{status_code: res.statusCode, message: res.statusMessage})
    JobCreate(job.data.job_id, res.statusMessage, -1)
  });
  await myMonitor.on('stop', async(website) => {
    mailData.html =  await ejs.renderFile(path.join(__dirname, 'templates/error.ejs'),{status_code: res.statusCode, message: website})
    JobCreate(job.data.job_id, website, -1)
  });
  await myMonitor.on('error', async(error) => {
    mailData.html =  await ejs.renderFile(path.join(__dirname, 'templates/error.ejs'),{status_code: res.statusCode, message: error})
    JobCreate(job.data.job_id, error, -1)
  });
  // TODO
  // if(mailData.html && PingData.sendmail){
  //   console.log("YYY")
  //   SendMail(mailData)
  // }
  done();
});

const JobCreate = (id, message, responsetime) => {
  MonitorLogs.create({
    jobid: id,
    responseTime: responsetime,
    message: message
  })
}