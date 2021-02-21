const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

function setPassword(value) {
  return bcrypt.hashSync(value, 10);
}

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String, 
      unique: true,
      required: true
    }
  },
  {
    strict: true,
    versionKey: false,
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" }
  }
);

module.exports = mongoose.model('Users', UserSchema)