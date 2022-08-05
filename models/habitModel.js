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
   },
   { timestamps: true }
);

module.exports = mongoose.model("Habit", habitSchema); // here "Habit" is the name of the collection and "habitSchema" is the structure of the documents that we are going to store in the "Habit" collection
