const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true, 
    minlength: [6],
  },
});

module.exports = mongoose.model("users", userSchema);