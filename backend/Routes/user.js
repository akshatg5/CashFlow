const express = require("express");
const zod = require("zod"); // using the zod library for input validation
const { User, Account } = require("../db");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

//hashing the passwords before storing them into the db
const bcrypt = require("bcrypt");
const { authMiddleware } = require("../middleware");

// all the user related routes and defined in detail here:

// utility functions to generate jwt token and hash the password
function generateToken(userId) {
  return jwt.sign(
    {
      userId,
    },
    JWT_SECRET
  );
}

async function hashPassword(password) {
  return await bcrypt.hash(password, 6);
}

// a zod schema used for input validation while passing inputs to the signup form
const signupSchema = zod.object({
  username: zod.string(),
  email: zod.string().email(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
});

router.post("/signup", async (req, res) => {
  try {
    const { success, data } = signupSchema.safeParse(req.body);
    if (!success) {
      return res.status(400).json({
        msg: "Incorrect inputs",
      });
    }

    const { username, email, password, firstName, lastName } = data;
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.json({
        msg: "Email/Username already taken",
      });
    }

    // hashing the password before passing it into the db
    const hashedPassword = await hashPassword(password);

    // create a user in the db
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    const userId = newUser._id;

    await Account.create({
      userId,
      balance: 1 + Math.random() * 1000,
    });

    // find out the token using the sign function from jwt library
    const token = generateToken(newUser._id);
    res.status(200).json({ msg: "User created", token });
  } catch (error) {
    console.log("Error during the signup", error);
    res.status(500).json({ error: "Internal Server error" });
  }
});

const signinSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
});

router.post("/signin", async (req, res) => {
  try {
    const { success, data } = signinSchema.safeParse(req.body);
    if (!success) {
      res.status(400).json({ msg: "Invalid Inputs" });
    }

    const { username, password } = data;
    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Incorrect username or password" });
    }

    const token = generateToken(user._id);
    res.json({ token });
  } catch (error) {
    console.log("Error during sign in", error);
    res.status(500).json({ error: "Internal Server error" });
  }
});

const updateInfoSchema = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

router.put("/update-info", authMiddleware, async (req, res) => {
  try {
    const { success, data } = updateInfoSchema.safeParse(req.body);

    if (!success) {
      return res.status(400).json({ msg: "Error in update Igo" });
    }

    const updatedFields = {};
    if (data.password) updatedFields.password = data.password;
    if (data.firstName) updatedFields.firstName = data.firstName;
    if (data.lastName) updatedFields.firstName = data.lastName;

    await User.updateOne({ _id: req.userId }, updatedFields);
  } catch (error) {
    console.log("Error updating the information", error);
    return res.status(402).json({ msg: "Server error while updating" });
  }
});

// the route that will get all the users available in the app
router.get("/all-users", authMiddleware, async (req, res) => {
  try {
    let filter = req.query.filter || "";
    // filter = new RegExp(filter, "i");

    if (typeof filter !== "string") {
      return res
        .status(400)
        .json({ msg: "Invalid filter parameter enter a string" });
    }

    // little difficult, do it again to understand better
    // adding pagination to limit the number of users returned per request, might decrease load on db

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const users = await User.find({
      $or: [
        {
          firstName: {
            $regex: filter,
          },
        },
        {
          lastName: {
            $regex: filter,
          },
        },
      ],
    })
      .skip(skip)
      .limit(limit);

    res.json({
      user: users.map((user) => ({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id,
      })),
      pageInfo: {
        currentPage: page,
        pageSize: limit,
        totalUsers: await User.countDocuments(),
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      msg: "Error while getting the user list",
    });
  }
});

module.exports = router;
