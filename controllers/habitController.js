const Habit = require("../models/habitModel");
const Day = require("../models/dayModel");
const mongoose = require("mongoose");

const updateHabitItsOnNewDay = () => {};

//# get
//-> get all habits
const getAllHabits = async (req, res) => {
  const user_id = req.user._id;
  const habits = await Habit.find({ user_id }).sort({ createdAt: -1 });
  //
  const dayFromFrontend = req.query.day;
  if (dayFromFrontend) {
    console.log({ dayFromFrontend });
    let dayFromDatabase = await Day.find({});
    console.log({ dayFromDatabase });
    if (dayFromDatabase[0]?.day) {
      if (dayFromDatabase[0].day !== dayFromFrontend) {
        for (let habit of habits) {
          // console.log({ notupdatedHabit: habit });
          const updatedHabit = await Habit.findOneAndUpdate(
            { _id: habit._id },
            {
              title: habit.title,
              reps: habit.reps,
              isDone: false,
              user_id: habit.user_id,
            },
            { new: true }
          );
          // console.log({ updatedHabit });
        }
        const updatedDay = await Day.findOneAndUpdate(
          { _id: dayFromDatabase[0]._id },
          {
            day: dayFromFrontend,
            user_id,
          },
          { new: true }
        );
        console.log({ updatedDay });
      }
    }
    if (dayFromDatabase.length < 1) {
      const updatedDay = await Day.create({
        day: dayFromFrontend,
        user_id,
      });
      console.log({ updatedDay });
    }
  }

  // habits = await Habit.find({ user_id }).sort({ createdAt: -1 });
  res.status(200).json(habits);
};

//-> get a single habit
const getSingleHabit = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such habit" });
  }

  const singleHabit = await Habit.findById(id);

  if (!singleHabit) {
    return res.status(404).json({ error: "No such habit" });
  }

  res.status(200).json(singleHabit);
};

//# post
//-> create a new habit
const createNewHabit = async (req, res) => {
  const { title, reps } = req.body;
  const emptyFields = [];
  if (!title) emptyFields.push("title");
  if (!reps) emptyFields.push("reps");
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  // add new document(habit in our case) to db under the collection "Habit"
  try {
    const user_id = req.user._id;
    console.log({ user_id });
    const habit = await Habit.create({ title, reps, isDone: false, user_id }); // once a new document is created then in response we get that created document
    console.log({ habit });
    res.status(200).json(habit);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

//# delete
//-> delete a habit
const deleteAHabit = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such habit" });
  }

  const deletedHabit = await Habit.findOneAndDelete({ _id: id });

  if (!deletedHabit) {
    return res.status(400).json({ error: "No such habit" });
  }

  res.status(200).json(deletedHabit);
};

//# put, patch
//-> update a habit
const updateAHabit = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such habit" });
  }

  const updatedHabit = await Habit.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    },
    { new: true }
  );

  if (!updatedHabit) {
    return res.status(400).json({ error: "No such habit" });
  }

  res.status(200).json(updatedHabit);
};

module.exports = {
  getAllHabits,
  getSingleHabit,
  createNewHabit,
  deleteAHabit,
  updateAHabit,
};
