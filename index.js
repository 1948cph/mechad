const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

let leaderboard = [];

app.get("/leaderboard", (req, res) => {
  res.json(leaderboard);
});

app.post("/leaderboard", (req, res) => {
  const { name, score } = req.body;
  if (typeof name === "string" && typeof score === "number") {
    leaderboard.push({ name, score });
    leaderboard.sort((a, b) => b.score - a.score);
    leaderboard = leaderboard.slice(0, 20);
    res.json({ success: true });
  } else {
    res.status(400).json({ success: false, message: "Invalid data" });
  }
});

// Use Render's PORT environment variable or 3000 as fallback
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Leaderboard server running on port ${PORT}`);
});
