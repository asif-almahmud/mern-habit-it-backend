const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const habitSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    reps: {
      type: [String],
      validate: (v) => Array.isArray(v) && v.length > 0,
    },
    isDone: {
      type: Boolean,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const model = mongoose.model("Habit", habitSchema); // Here "Habit" is going to be the name of the collection which will be actually lowercased and then added with a "s", like - "habits". And "habitSchema" is the structure of the documents that we are going to store in the "Habit" collection

module.exports = model;
