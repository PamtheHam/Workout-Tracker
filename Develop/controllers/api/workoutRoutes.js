const router = require("express").Router();
const db = require("../../models");

// gets all seeded workouts
router.get("/api/workouts", async (req, res) => {
  try {
    const getWorkouts = await db.Workout.find({});
    res.status(200).json(getWorkouts);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/api/workouts", async ({ body }, res) => {
  try {
    const newWorkout = await db.Workout.create(body);
    res.status(newWorkout);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/api/workouts/:id", async (req, res) => {
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

router.get("/api/workouts/range", async ({ res }) => {
  try {
    const workouts = await db.Workout.aggregate([
      { $addfields: { totalDuration: { $sum: "$exercises.duration" } } },
    ]);
    res.status(200).json(workouts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
