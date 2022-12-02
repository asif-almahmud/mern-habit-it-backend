const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//# static method for signup
userSchema.statics.signup = async function (name, email, password) {
  //-> validation
  if (!name || !email || !password) {
    // first check every field is filled
    throw Error("All fields must be filled");
  }

  if (!validator.isEmail(email)) {
    // then check if the email is a valid email
    throw Error("Email is not valid");
  }

  // if (!validator.isStrongPassword(password)) { // check if the password is strong
  //   throw Error("Password not strong enough");
  // }

  const exists = await this.findOne({ email }); // check whether the email is already in use
  if (exists) {
    throw Error("Email already in use");
  }

  //-> create and use a salt for creating more strong hash
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  //-> create the user in the database
  const user = await this.create({ name, email, password: hash });

  return user;
};

//# static method for login
userSchema.statics.login = async function (email, password) {
  //-> validation
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  //-> check the email
  const user = await this.findOne({ email }); // get the user if already signed up using the email
  if (!user) {
    throw Error("Incorrect email"); // let the user know he did not sign up with this email
  }

  //-> check the password
  const match = await bcrypt.compare(password, user.password); // compare the provided password with the saved hash password using bcrypt
  if (!match) {
    throw Error("Incorrect password"); // let the user know he did not sign up with this password
  }

  return user;
};

const model = mongoose.model("User", userSchema);

module.exports = model;
