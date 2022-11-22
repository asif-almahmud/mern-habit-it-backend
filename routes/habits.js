const express = require("express");
// controller functions
const {
  getAllHabits,
  getSingleHabit,
  createNewHabit,
  deleteAHabit,
  updateAHabit,
} = require("../controllers/habitController");

const router = express.Router();

//-> GET all habits
router.get("/", getAllHabits);

//-> GET a single habit
router.get("/:id", getSingleHabit);

//-> POST/add/create a new habit
router.post("/", createNewHabit);

//-> DELETE/remove a habit
router.delete("/:id", deleteAHabit);

//-> UPDATE/edit a habit
router.patch("/:id", updateAHabit);

module.exports = router;
