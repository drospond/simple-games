const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null) return res.sendStatus(401);

  jwt.verify(token, process.env.REACT_APP_SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

router.get("/", authenticateToken, (req, res) => {
  User.findOne({ _id: req.user.id }, "_id userName games dateCreated totalGames").then((user) => {
    res.json(user);
  });
});

router.post("/", async (req, res) => {
  const userName = req.body.userName.trim();
  let hashedPassword;
  if (req.body.password.length <= 7 || req.body.password.length > 64) {
    return res
      .json({
        errors: "Password needs to be 8 to 64 characters." 
      })
      .status(400);
  } else {
    hashedPassword = await bcrypt.hash(req.body.password, 10);
  }
  User.create({ userName, password: hashedPassword })
    .then((dbUser) => {
      res.json(dbUser).status(201);
    })
    .catch((err) => {
      let errorMessage = "";
      if(err.errors.userName){
        errorMessage = err.errors.userName.properties.message;
        err.errors = errorMessage;
        res.json(err).status(400);
      }
      if(err.errors.password){
        errorMessage = err.errors.password.properties.message;
        err.errors = errorMessage;
        res.json(err).status(400);
      }
      console.log(err.errors.userName.properties.message);
      res.json(err).status(400);
    });
});

router.post("/signin", (req, res) => {
  const password = req.body.password;
  User.findOne({ userName: req.body.userName })
    .then(async (dbUser) => {
      if (!dbUser) {
        return res
          .json({ errors: "Username or password are incorrect." })
          .status(401);
      }
      if (await bcrypt.compare(password, dbUser.password)) {
        const userJWT = { id: dbUser._id, userName: dbUser.userName };
        const accessToken = jwt.sign(
          userJWT,
          process.env.REACT_APP_SECRET_KEY,
          { expiresIn: "3h" }
        );
        res.json({ accessToken: accessToken });
      } else {
        res.json({ errors: "Username or password are incorrect." }).status(401);
      }
    })
    .catch((er) => {
      console.log(er);
      res
        .json({
          errors: "Something went wrong :/ Try again later.",
        })
        .status(500);
    });
});

router.get("/updateWins/:game/:user", (req, res)=>{
  const updateobject = {$inc:{}}
  updateobject.$inc[`games.${req.params.game}.wins`] = 1;
  User.findByIdAndUpdate(req.params.user, updateobject).then(()=>{
    res.json({status: "success"}).status(200);
  })
})

router.get("/updateLosses/:game/:user", (req, res)=>{
  const updateobject = {$inc:{}}
  updateobject.$inc[`games.${req.params.game}.losses`] = 1;
  User.findByIdAndUpdate(req.params.user, updateobject).then(()=>{
    res.json({status: "success"}).status(200);
  })
})

module.exports = router;
