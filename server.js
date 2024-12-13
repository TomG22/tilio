const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const { start } = require('repl');

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

/*
 * NOTE: I created this schema for representing 
 * game boards in the DB for attacking purposes
 *
 * - Eddie
 */

const winnersSchema = new mongoose.Schema ({
  username: String,
  score: String
})

const gameSchema = new mongoose.Schema({
  username: String,
  score: String,
  startTime: Date,
  lastMove: Date,
  endTime: Date,
  winTime: Date,
  pendingAttack: { type: Boolean, default: false },
});

const gameOverSchema = new mongoose.Schema({
  username: String,
  score: String,
  winTime: Number 
});

const GameLive = mongoose.model('GameLive', gameSchema);

const GameStatic = mongoose.model('GameStatic', gameOverSchema);

const GameWinners = mongoose.model('GameWinners', winnersSchema);

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

/*
 * Allows client to get static leaderboard
 */
app.get("/leaderboard/static", async (req, res) => {
  try {
    console.log("Got the static get")
    const leaderboard = await GameStatic.find().sort({ score: 1});
    res.json(leaderboard);
  } catch (error){
    console.error(error);
  }
});

/*
  * Allows client to get live leaderboard
  */
app.get("/leaderboard/live", async (req, res) => {
  try {
    const leaderboard = await GameLive.find().sort({ score: 1});
    res.json(leaderboard);
  } catch (error){

  }
});

/*
  * Allows client to get Winners leaderboard
  */
app.get("/leaderboard/winners", async (req, res) => {
  try {
    const leaderboard = await GameWinners.find().sort({ score: 1});
    res.json(leaderboard);
  } catch (error){

  }
});

/*
  * Allows client to update their score in the leaderboard
  */
app.post("/leaderboard/live/update", async (req, res) => {
  const  { username,
            score,
            board,
            startTime,
            lastMove,
            endTime,
            winTime
          } = req.body;

  try {
    const result = await GameLive.findOneAndUpdate(
      { username },
      { score, updatedAt: Date.now() },
      { board },
      { startTime },
      { lastMove },
      { endTime },
      { winTime },
      { new: true, upsert: false }
    );

    /*
      * if game is over, update the static leaderboard
      *
      * game over is denoted by an nonzero endTime
      */
    if (endTime != 0) {
      await GameStatic.findOneAndUpdate(
        { username },
        {
            score,
            winTime
        },
        { new: true, upsert: true }
      );

      if (winTime != '') {
        await GameLive.findOneAndUpdate(
          { username },
          {
              score,
              winTime
          },
          { new: true, upsert: true }
        );
      }

      await GameLive.deleteOne({ username });

      res.status(200).json({
        message: 'Removed from live leaderboard.',
        data: result
      });
      return;
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


// check if the player is under attack
app.get('/checkAttack', async (req, res) => {
  const {username } = req.query;
  try {
    const player = await GameLive.findOne({ username });
    if (!player) {
      return res.status(404).json({ message: 'Player not found'});
    }
    if (player.pendingAttack) {
      player.pendingAttack = false;
      await player.save()

      return res.status(200).json({ isAttacked: true });
    }
    return res.status(200).json({ isAttacked: false });
  } catch (error) {
    console.error("Error checking for attack: ", error);
    res.status(500).json({ message: 'Internal Server Error'});
  }
});


// attempt to send an attack
app.post('/attack', async (req, res) => {
  const { username, score } = req.body;

  // console.log("Received attack request:", { username, score }); // Log input

  try {
    const leaderboard = await GameLive.find().sort({ score: -1 });
    console.log("Leaderboard:", leaderboard); // Log leaderboard
    const attackerIndex = leaderboard.findIndex(player => player.username === username);
    console.log("Attacker Index:", attackerIndex); // Log attacker index


    if (attackerIndex === - 1 || attackerIndex === 0) {
      return res.status(400).json({ message: 'Cannot attack; no valid target above you.'});
    }
    const target = leaderboard[attackerIndex - 1];
    target.pendingAttack = true;
    await target.save();

    return res.status(200).json({ message: 'Attack sent to next user' });
  } catch (error) {
    console.error("Error initiating attack: " + error);
    res.status(500).json({ message: 'MEOW'});
  }
});



// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
