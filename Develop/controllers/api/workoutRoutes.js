const router = require("express").Router();
const db = require("../../models");

// gets all seeded workouts
router.get("/", async (req, res) => {
  try {
    const workouts = await db.Workout.find({});
    res.status(200).json(workouts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// lets user post a new workout
router.post("/", async ({ body }, res) => {
  try {
    const newWorkout = await db.Workout.create(body);
    res.status(newWorkout);
  } catch (err) {
    res.status(500).json(err);
  }
});

// lets user update a workout
router.put("/:id", async (req, res) => {
  try {
    const updateWorkout = await db.Workout.findByIdAndUpdate(
      req.params.id,
      { $push: { exercises: req.body } },
      { new: true }
    );
    res.status(200).json(updateWorkout);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
