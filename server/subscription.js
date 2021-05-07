var express = require("express");
var router = express.Router();
require("dotenv").config();
const crypto = require("crypto");
const instance = require("./payment");
router.get("/order/:planId", async (req, res) => {
  try {
    const { planId } = req.params;
    const options = {
      plan_id: planId,
      total_count: 12, //if 12 then for 1 year in one month gap or 1 for one month
      quantity: 1,
    };
    await instance.subscriptions.create(options, (err, order) => {
      if (err) {
        return res.status(500).json({
          message: "Something Went Wrong",
        });
      }
      return res.status(200).json(order);
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Something Went Wrong",
    });
  }
});

router.post("/verify", async (req, res) => {
  try {
    const { paymentDetails } = req.body;
    console.log(paymentDetails);
    let text =
      paymentDetails.subscription_id + "|" + paymentDetails.razorpay_payment_id;
    let secret = process.env.RAZORPAY_KEY_SECRET;
    let algorithm = "sha256";
    let hash, hmac;
    hmac = crypto.createHmac(algorithm, secret);
    hmac.update(text);
    hash = hmac.digest("hex");
    console.log(hash, paymentDetails.razorpay_signature);
    if (hash == paymentDetails.razorpay_signature) {
      paymentDetails.payment = "yes";
      res.json({ message: "Successfull" });
    }
    res.json({ message: "unsuccessfull" });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: `Something went wrong`,
    });
  }
});

router.get("/cancel/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    await instance.subscriptions.cancel(req.params.id, false, (err, res) => {
      console.log(err, res);
    });
    // instance.subscriptions.fetch(req.params.id, (err, res) => {
    //   console.log(err, res);
    // });
  } catch (err) {
    console.log(err);
  }

  res.send("Hitted");
});

router.get("/get/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    await instance.subscriptions.fetch(req.params.id, (err, response) => {
      return res.send(response);
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
