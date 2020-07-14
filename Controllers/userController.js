const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

router.post("/", async (req, res) => {
  const userName = req.body.userName.trim();
  let hashedPassword;
  if (req.body.password.length <= 7 || req.body.password.length > 64) {
    return res
      .json({
        errors: {
          password: {
            properties: { message: "Password needs to be 8 to 64 characters." },
          },
        },
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
          succes: false,
          error: "Something went wrong :/ Try again later.",
        })
        .status(500);
    });
});

module.exports = router;
