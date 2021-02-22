const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const MonitotSchema = new mongoose.Schema(
  {config: Object}
)

module.exports = mongoose.model('Monitors', MonitotSchema)