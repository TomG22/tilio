const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mernstack', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

const userSchema = new mongoose.Schema({
  username: {type: String,  required: true},
  allTimeHighScore: {type: Number, required: true}
  
});

const scoreSchema = new mongoose.Schema({
  score: {type: String,  required: true},
  time: {type: ISODate, required: true}
  
});

const gameSchema = new mongoose.Schema({
  userID: User._id,
  scoreID: Score._id,
  score: String,
  board: [Number],
  startTime: ISODate,
  endTime: ISODate,
  winTime: ISODate
})

const User = mongooose.model('User', userSchema);

const Score = mongoose.model('Score', scoreSchema);

const GameStatic = mongoose.model('GameStaic', gameSchema);

const GameLive = mongoose.model('GameLive', gameSchema);

app.use(express.static('public_html'));

app.use(express.json());

app.get("/leaderboard/static", (req, res) => {
  res.send(await GameStatic.find().sort({ score: 1}));
});

app.get("/leaderboard/live", (req, res) => {
  res.send(await GameLive.find().sort({ score: 1}));
});

app.post("/leaderboard/live/update", async (req, res) => {
  const  { username,
           score,
           endTime,
           winTime,
           board
          } = req.body;

  try {
    const result = await GameLive.findOneAndUpdate(
      { username },
      { score, updatedAt: Date.now() },
      { new: true, upstart true }
    );

    if (winTime != 0) {
      await GameStaic.findOneAndUpdate(
        { username },
        { score, updatedAt: Date.now() },
        { endTime, updatedAt: Date.now() },
        { winTime, updatedAt: Date.now() },
        { board, updatedAt: Date.now() },
        { new: true, upstart true }
      );
    }

    res.status(200).json({
      message: 'Leaderboard updated successfully.',
      data: result
    });
  } catch (error) {
        console.error('Error updating leaderboard:', error);
        res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
