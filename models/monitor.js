const mongoose = require('mongoose');

const MonitotSchema = new mongoose.Schema(
  {config: Object, id: String},
  {
    strict: true,
    versionKey: false,
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" }
  }
)

module.exports = mongoose.model('Monitors', MonitotSchema)