const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

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
  time: {type: Date, required: true}
  
});

const User = mongoose.model('User', userSchema);

const Score = mongoose.model('Score', scoreSchema);

/*
 * NOTE: I created this schema for representing 
 * game boards in the DB for attacking purposes
 *
 * - Eddie
 */
const tileSchema = new mongoose.Schema({
  value: { type: Number },
  frozen: { type: Boolean, default: false }
});

const Boards = mongoose.model('Boards', tileSchema);
const gameSchema = new mongoose.Schema({
  userID: mongoose.Schema.Types.ObjectId,
  scoreID: mongoose.Schema.Types.ObjectId,
  username: String,
  score: String,
  board: [tileSchema],
  startTime: Date,
  endTime: Date,
  winTime: Date
})


const GameStatic = mongoose.model('GameStatic', gameSchema);

const GameLive = mongoose.model('GameLive', gameSchema);

app.use(express.static(path.join(__dirname, 'client/build')));

// Handle any requests that don't match static files
app.use(express.json());

app.use(express.static(path.join(__dirname, "build")));

app.post("/createuser", async (req, res) => {
  const {
    username
  } = req.body;

  try {
    const result = await GameLive.findOneAndUpdate(
      { username },
      {},
      { new: true, upsert: true }
    );

    res.status(200).json({
      message: 'Leaderboard updated successfully.',
      data: result._id
    });
  } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
  }
});

/*
  * NOTE: I was going to use this to attack the other player but didnt 
  * complete it all the way
  *
  * - Eddie
  */
app.get("/getUpdatedBoard", async (req, res) => {
  const {
    username
  } = req.body;

  try {
    const result = await GameLive.findOne(
      { username }
    );

    res.status(200).json({
      message: 'Leaderboard updated successfully.',
      data: result.board
    });
  } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get("/leaderboard/static", async (req, res) => {
  try {
    console.log("Got the static get")
    const leaderboard = await GameStatic.find().sort({ score: 1});
    res.json(leaderboard);
  } catch (error){
    console.error(error);
  }
});

app.get("/leaderboard/live", async (req, res) => {
  try {
    const leaderboard = await GameLive.find().sort({ score: 1});
    res.json(leaderboard);
  } catch (error){

  }
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
      { new: true, upsert: true }
    );

    if (winTime != 0) {
      await GameStatic.findOneAndUpdate(
        { username },
        {
            score,
            endTime,
            winTime,
            board,
            updatedAt: Date.now(),
        },
        { new: true, upsert: true }
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
