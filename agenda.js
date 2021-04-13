const dotenv = require('dotenv');
const {Agenda} = require('agenda');
const {MonitorQueue} = require("./queue")
const mongoose = require('mongoose');

dotenv.config();
const MONGO_URI = process.env.MONGO_URI
console.log(typeof Agenda)
const agenda = new Agenda({
  db: 
    {
      address: MONGO_URI, 
      collection: 'jobs', 
      options: {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      }
    }
}); 

agenda
 .on('ready', () => {
   console.log('Agenda started!')})
 .on('error', () => console.log('Agenda connection error!'));

agenda.define('monitors', {priority: 'high', concurrency: 10}, async(job, done) => {
  try{
    await MonitorQueue.add('jobs', { job_id: job.attrs.job_id });
  }
  catch(err){
    console.log(err)
  }
  done()
});

module.exports = agenda;