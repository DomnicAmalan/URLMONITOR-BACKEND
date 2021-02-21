// let express = require('express');
// const router = express.Router();

// let bodyParser = require('body-parser');
// let mongoose = require('mongoose');
// const cors = require('cors');
// const serverless = require('serverless-http');

// let app = express();

// var port = process.env.PORT || 3000;

// app.use(cors())

// app.use(bodyParser.urlencoded({
//   extended: true
// }));

// app.use(bodyParser.json());

// router.get('/', (req, res) => {
//   res.writeHead(200, { 'Content-Type': 'text/html' });
//   res.write('<h1>Hello from Express.js!</h1>');
//   res.end();
// });
// router.get('/another', (req, res) => res.json({ route: req.originalUrl }));
// router.post('/', (req, res) => res.json({ postBody: req.body }));

// app.use(bodyParser.json());
// app.use('/.netlify/functions/server', router);  // path must route to lambda
// app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

// mongoose.connect('mongodb+srv://domnic:0308SDAssa@cluster0.wptgp.mongodb.net/surveysp?retryWrites=true&w=majority', 
//   {useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
//     useCreateIndex: true
//   }, 
//   (err) => {
//       if (!err) {
//           console.log('Successfully Established Connection with MongoDB')
//       }
//       else {
//           console.log('Failed to Establish Connection with MongoDB with Error: '+ err)
//       }
//   }
// );

// var db = mongoose.connection;

// module.exports = app;
// module.exports.handler = serverless(app);

'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
let mongoose = require('mongoose');
const cors = require('cors');

const router = express.Router();
router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Welcome to survey ping backend</h1>');
  res.end();
});
router.get('/another', (req, res) => res.json({ route: req.originalUrl }));
router.post('/', (req, res) => res.json({ postBody: req.body }));

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

app.use("/api/users", require("./routes/userRoutes"));

// mongoose.connect('mongodb+srv://domnic:0308SDAssa@cluster0.wptgp.mongodb.net/surveysp?retryWrites=true&w=majority', 
//   {useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
//     useCreateIndex: true
//   }, 
//   (err) => {
//       if (!err) {
//           console.log('Successfully Established Connection with MongoDB')
//       }
//       else {
//           console.log('Failed to Establish Connection with MongoDB with Error: '+ err)
//       }
//   }
// );


module.exports = app;
module.exports.handler = serverless(app);