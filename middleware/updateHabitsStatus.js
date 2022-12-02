const jwt = require("jsonwebtoken");
const Count = require("../models/countModel");
const Habit = require("../models/habitModel");

const requireAuth = async (req, res, next) => {
  // verify authentication
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    req.user = await User.findOne({ _id }).select("_id"); // we are just assigning the object with "_id" property not the "email" or "name" or the "password"
    next();
  } catch (error) {
    console.log({ error_while_grabbing_id: error });
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = requireAuth;

const updateCountAndHabits = async (req) => {
  const time = new Date().getTime();
  const dayInMilliSeconds = 86400000;
  const todayCount = Math.floor(time / dayInMilliSeconds);
  console.log({ todayCount });
  const data = await Count.find({});
  console.log({ data });
  if (data) {
    if (data[0].count < time) {
      const habits = await Habit.findById(req.body.userId).sort({
        createdAt: -1,
      });
      for (let habit of habits) {
        // const
        const updatedHabit = await Habit.findOneAndUpdate(
          { _id: habit._id },
          {},
          { new: true }
        );
      }
    }
  } else {
    const createdData = await Count.create({ count: todayCount });
  }
};
