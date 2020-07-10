const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/", ({ body }, res) => {
    User.create(body)
      .then(dbUser => {
        res.json(dbUser);
      })
      .catch(err => {
        res.json(err);
      });
  });

  module.exports = router;