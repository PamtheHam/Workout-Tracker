const router = require("express").Router();
const Workout = require("../../models/Workout");

// gets all seeded workouts
router.get("/", async (req, res) => {
  try {
    const getWorkouts = await Workout.aggregate([
      { $addfields: { totalDuration: { $sum: "$exercises.duration" } } },
    ]);
    res.status(200).json(getWorkouts);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async ({ body }, res) => {
  try {
    const newWorkout = await Workout.create(body);
    res.status(200).json(newWorkout);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async ({ params, body }, res) => {
  try {
    const updateWorkout = await Workout.findByIdAndUpdate(
      params.id,
      { $push: { exercises: body } },
      { new: true }
    );
    res.status(200).json(updateWorkout);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const workouts = await Workout.aggregate([
      { $addfields: { totalDuration: { $sum: "$exercises.duration" } } },
    ]);
    res.status(200).json(workouts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
