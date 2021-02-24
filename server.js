'use strict';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
let mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const Agenda = require('./agenda');

dotenv.config();

const PORT = process.env.PORT || 3000;

const MONGO_URI = process.env.MONGO_URI;

app.use(cors())

const router = express.Router();

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(bodyParser.json());
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/monitor", require("./routes/funtionRoutes"));

mongoose.connect(MONGO_URI,
  {useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  }, 
  (err) => {
      if (!err) {
          console.log('Successfully Established Connection with MongoDB')
      }
      else {
          console.log('Failed to Establish Connection with MongoDB with Error: '+ err)
      }
  }
);

async function graceful() {
  await agenda.stop();
  process.exit(0);
}

process.on("SIGTERM", graceful);
process.on("SIGINT", graceful);

(async function() {
  console.log("Scheduler restarted")
  await Agenda.start();
})();

module.exports = app;

app.listen(PORT, function () {
  console.log(`started on ${PORT}`)
}); 