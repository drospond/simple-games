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
  },
  games:[{
    tictactoe:{
      title: {
        type: String,
        default: "Tic-Tac-Toe"
      },
      wins:{
        type: Number,
        default: 0
      },
      losses:{
        type: Number,
        default: 0
      }
    },
    hangMan:{
      title: {
        type: String,
        default: "Hang Man"
      },
      wins:{
        type: Number,
        default: 0
      },
      losses:{
        type: Number,
        default: 0
      }
    }
  }],
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

userSchema.plugin(uniqueValidator);

const User = mongoose.model("User", userSchema);

module.exports = User;