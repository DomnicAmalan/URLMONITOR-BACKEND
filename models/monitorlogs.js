const mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const MonitorLogs = new Schema(
  {jobid: ObjectId, responseTime: String},
  {
    versionKey: false,
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" }
  }
)

module.exports = mongoose.model('MonitorLogs', MonitorLogs)
