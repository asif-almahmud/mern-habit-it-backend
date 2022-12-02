const express = require("express");
// controller functions
const {
  getAllHabits,
  getSingleHabit,
  createNewHabit,
  deleteAHabit,
  updateAHabit,
} = require("../controllers/habitController");
const requireAuth = require("../middleware/requireAuth");

// require authentication for all habitit routes
const router = express.Router();

router.use(requireAuth);

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
