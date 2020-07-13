const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

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

module.exports = router;
