let express = require('express');
const router = express.Router();

let bodyParser = require('body-parser');
let mongoose = require('mongoose');
const cors = require('cors');
const serverless = require('serverless-http');

let app = express();

var port = process.env.PORT || 3000;

app.use(cors())

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello from Express.js!</h1>');
  res.end();
});

app.use('/.netlify/functions/server', router);
app.use("/api/users", require("./routes/userRoutes"));

mongoose.connect('mongodb+srv://domnic:0308SDAssa@cluster0.wptgp.mongodb.net/surveysp?retryWrites=true&w=majority', 
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

var db = mongoose.connection;

module.exports = app;
module.exports.handler = serverless(app);