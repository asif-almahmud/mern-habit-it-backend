const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  // verify authentication
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    const targetUser = await User.findOne({ _id });
    console.log({ targetUser });
    console.log({ targetUserID: targetUser._id });
    req.user = await User.findOne({ _id }).select("_id"); // we are assigning an object with "_id" property not the "email" or "name" or the "password"
    console.log({ userId: req.user._id });

    next();
  } catch (error) {
    console.log({ error_while_grabbing_id: error });
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = requireAuth;
