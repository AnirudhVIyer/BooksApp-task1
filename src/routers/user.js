const express = require("express");

const router = express.Router();
const User = require("../models/UserModel");

// Creating a new Uset
router.post("/create/user", async (req, res) => {
  try {
    const U1 = new User(req.body);

    await U1.save();
    console.log("user saved");
    res.send(U1);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// API
router.post("/payment/new", async (req, res) => {
  try {
    const id = req.body["userId"];
    const user = await User.findById(id);
    user.isPaymentMade = true;
    await user.save();
    console.log(user);
    if (!user) {
      // if no user found
      return res.status(400).send("Can't Find User");
    }

    // adding referral earning only if referrer was specified during creation.
    if (user.ReferredUser != null) {
      const refUser = await User.findById(user.ReferredUser);
      console.log(refUser);
      refUser.totalEarnings += 10;
      console.log(refUser.totalEarnings);
      await refUser.save();
    } else {
      console.log("has no ref");
    }
    // referred user updated

    res.send("payment made");
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
