const mongoose = require(`mongoose`);
const bcrypt = require(`bcrypt`);
const jwt = require(`jsonwebtoken`);

const userScheema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});
// hash password
userScheema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    console.log(salt);
    const hashPassword = await bcrypt.hash(user.password, salt);
    user.password = hashPassword;
  } catch (error) {
    next(error)
  }
});

// compare password

userScheema.methods.comparePassword= async function(password){
  return  bcrypt.compare(password,this.password)
}

// jwt token

userScheema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "30d",
      }
    );
  } catch (error) {
    next(error)
  }
};

// model
const User = mongoose.model("User", userScheema);
module.exports = User;
