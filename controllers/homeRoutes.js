const router = require("express").Router();
const path = require("path");

router.get("/", ({ res }) => {
  res.sendFile(path.join(__dirname, "../public/html/index.html"));
});
router.get("/exercise", ({ res }) => {
  res.sendFile(path.join(__dirname, "../public/html/exercise.html"));
});
router.get("/stats", ({ res }) => {
  res.sendFile(path.join(__dirname, "../public/html/stats.html"));
});

module.exports = router;
