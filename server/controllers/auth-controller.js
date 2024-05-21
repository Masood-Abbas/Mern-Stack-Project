const User = require(`../models/user`);
const bcrypt = require(`bcrypt`);
// Registration

const registration = async (req, res, next) => {
  try {
    const { username, email, phone, password } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
      const status = 422;
      const message = `email are already exist`;
      const error = {
        status,
        message,
      };
      next(error);
    }
    const user = await User.create({
      username,
      email,
      phone,
      password,
    });
    res.status(201).json({
      msg: "user is registered",
      token: await user.generateToken(),
      userID: user._id.toString(),
    });
  } catch (error) {
    res.status(500).json({ message: "server error", error: error });
    console.log(error);
  }
};

// login page

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (!userExist) {
      res.status(400).json({ msg: "invalid credinationl" });
      const status = 422;
      const message = `user exist`;
      const error = {
        status,
        message,
      };
      next(error);
    }
    // const user=await bcrypt.compare(password,userExist.password)
    const user = await userExist.comparePassword(password);
    if (user) {
      res.status(201).json({
        msg: "user is registered",
        token: await userExist.generateToken(),
        userID: userExist._id.toString(),
      });
    } else {
      res.status(400).json({ message: "invalid email and password" });
    }
  } catch (error) {
    // res.status(500).json({ message: "server error", error: error });
    next(error);
    console.log(error);
  }
};

// *-------------------
// User Logic
// *-------------------
const user = async (req, res) => {
  try {
    const userData = req.user;
    
    return res.status(201).json({userData });
  } catch (error) {
    console.log(`error in user router ${error}`);
  }
};

module.exports = { user , registration, login };
