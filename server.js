const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/tilio', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));


const boardSchema = new mongoose.Schema ({
  name:  String,
  score: Number,
  time:  ISODate
});

const LeaderboardScore = mongoose.model('LeaderboardScore', boardSchema);
const LeaderboardScore = mongoose.model('LeaderboardTime', boardSchema);

// Route for client to recieve updated leaderboard Score information
app.get('/leaderboardScore', async (req, res) => {
  try {
    // if score is the same, then we shoudl sort by time
    const leaderboard = await LeaderboardScore.find().sort({ score:1 });
    res.json({ success; true, tilio });
  } catch (error) {
    res.status(500);
  }
});

// Route for client to recieve updated leaderboard by Time information
app.get('/leaderboardTime', async (req, res) => {
  try {
    // if score is the same, then we shoudl sort by time
    const leaderboard = await LeaderboardTime.find().sort({ score:1 });
    res.json({ success; true, tilio });
  } catch (error) {
    res.status(500);
  }
});

// Express Staiic route for client
app.use(expres.static('public_html'));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
