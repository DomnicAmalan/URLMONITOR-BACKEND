'use strict';
const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
let mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(cors())

const router = express.Router();

router.post('/', router);
app.get('*', function(req, res){
  res.send('what???', 404);
});

app.use(bodyParser.json());
app.use("/api/users", require("./routes/userRoutes"));

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


module.exports = app;

app.listen(PORT, function () {
  console.log("started")
}); 