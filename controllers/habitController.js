const Habit = require("../models/habitModel");
const mongoose = require("mongoose");

//# get
//-> get all habits
const getAllHabits = async (req, res) => {
  const habits = await Habit.find({}).sort({ createdAt: -1 });
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
  const { title, reps, isDone } = req.body;

  // add new document(habit in our case) to db under the collection "Habit"
  try {
    const habit = await Habit.create({ title, reps, isDone }); // once a new document is created then in response we get that created document
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
