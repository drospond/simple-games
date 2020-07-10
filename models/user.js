const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: {
    type: String,
    unique: true,
    trim: true,
    required: "Username is required.",
    validate: [({ length }) => length >= 3, "Username should be atleast 3 characters."]
  },
  password: {
    type: String,
    required: "Password is required.",
    validate: [({ length }) => length >= 8, "Password should be atleast eight characters."]
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

userSchema.plugin(uniqueValidator);

const User = mongoose.model("User", userSchema);

module.exports = User;