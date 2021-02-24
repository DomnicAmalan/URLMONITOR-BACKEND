const dotenv = require('dotenv');
const Agenda = require('agenda');
const {MonitorQueue} = require("./queue")

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
  try{
    await MonitorQueue.add('jobs', { job_id: job.attrs.job_id });
  }
  catch(err){
    console.log(err)
  }
  done()
});

module.exports = agenda;