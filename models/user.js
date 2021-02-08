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
  games:{
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
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
},
{
  toObject: {
  virtuals: true
  },
  toJSON: {
  virtuals: true 
  }
});

userSchema.virtual('totalGames').get(function(){
  let totalGames = 0;
  const games = Object.keys(this.games);
  games.splice(games.indexOf("$init"), 1);
  games.forEach(game=>{
    totalGames += this.games[game].wins + this.games[game].losses;
    console.log("game: ", this.games[game]);
  })
  return totalGames;
})

userSchema.plugin(uniqueValidator);

const User = mongoose.model("User", userSchema);

module.exports = User;