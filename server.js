'use strict';
const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
let mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
var cron = require('node-cron');
const Monitor = require('ping-monitor');

dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(cors())

const router = express.Router();

router.post('/', router);


app.use(bodyParser.json());
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/monitor", require("./routes/funtionRoutes"));

const MONGO_URI = process.env.MONGO_URI

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

cron.schedule('* * * * *', function() {
  const myApi = new Monitor({
    website: 'https://reqres.in/api/users?page=2',
    title: 'Raging Flame',
    interval: 2,

    confing: {
      intervalUnits: 'seconds' // seconds, milliseconds, minutes {default}, hours
    },

    expect: {
      statusCode: 200
    }
});
myApi.on('up', function(response, state) {
  console.log(response.responseTime, state.interval)
});
});


module.exports = app;

app.listen(PORT, function () {
  console.log(`started on ${PORT}`)
}); 