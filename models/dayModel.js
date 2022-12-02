const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const daySchema = new Schema({
  day: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
});

const model = mongoose.model("Day", daySchema);

module.exports = model;
