const express = require("express");
const zod = require("zod");
const mongoose = require("mongoose");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");
const { User,Account } = require("../db");

router.get("/balance", authMiddleware, async (req, res) => {
  try {
    const account = await Account.findOne({
      userId: req.userId,
    });

    res.json({
      balance: account.balance,
    });
  } catch (error) {
    console.log("Error fetching the balance for" + userId);
    res.status(500).json({ msg: "Internal server error" });
  }
});

const transferSchema = zod.object({
    amount : zod.number(),
    to : zod.string()
})

router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const {success,data} = transferSchema.safeParse(req.body)
    if (!success) {
        session.abortTransaction()
        return res.status(400).json({msg : "Invalid inputs"})
    }
    const { amount, to } = data;
    
    // fetching the accounts while in the transaction session
    const account = await Account.findOne({ userId: req.userId }).session(
      session
    );

    if (!account || account.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({ msg: "Insufficient balance" });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);

    if (!toAccount) {
      await session.abortTransaction();
      return res.status(400).json({ msg: "Invalid account" });
    }

    // if every check is complete then complete the transaction
    await Account.updateOne(
      { userId: req.userId },
      { $inc: { balance: -amount } }
    ).session(session);

    await Account.updateOne(
      { userId: to },
      { $inc: { balance: amount } }
    ).session(session);

    // transaction complete and then commit it

    await session.commitTransaction();
    res.status(200).json({
      msg: "Transfer succesful, balances updated",
    });
  } catch (error) {
    await session.abortTransaction();
    console.log("Error transfering the funds: ", error);
    res.status(500).json({ msg: "Internal Server error" });
  } finally {
    session.endSession();
  }
});


module.exports = router;