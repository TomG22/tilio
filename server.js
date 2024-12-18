const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const { start } = require('repl');

const app = express();
const PORT = 3000;
const db_port = 27017;
const hostname = '143.244.148.164';

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(`mongodb://${hostname}:${db_port}/mernstack`, {
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
  score: {type: Number, default: 0},
})

const gameSchema = new mongoose.Schema({
  username: String,
  score: { type: Number, default: 0 },
  startTime: Date,
  endTime: Date,
  winTime: Date,
  pendingAttack: { type: Boolean, default: false },
});

const gameOverSchema = new mongoose.Schema({
  username: String,
  score: {type: Number, default: 0},
  winTime: {type: Date},
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

    const test = await GameStatic.findOne({ username });
    console.log(test);
    res.status(200).json({
      message: 'User added successfully.',
      username: result.username
    });
  } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.post("/createStaticUser", async (req, res) => {
  const {
    username
  } = req.body;
  console.log('Received payload:', req.body); // Log the payload

  try {
    console.log("server creating static user " + username);
    const result = await GameStatic.findOneAndUpdate(
      { username },
      {},
      { new: true, upsert: true }
    );

    res.status(200).json({
      message: 'server successfully added static user.',
      data: result._id,
      username: result.username
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
    const leaderboard = await GameStatic.find().sort({ score: -1});
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
    const leaderboard = await GameLive.find().sort({ score: -1});
    res.json(leaderboard);
  } catch (error){

  }
});

/*
  * Allows client to get Winners leaderboard
  */
app.get("/leaderboard/winners", async (req, res) => {
  try {
    const leaderboard = await GameWinners.find().sort({ score: -1});
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
            endTime,
            winTime
          } = req.body;

  let scoreSaved = score;

  try {
    const result = await GameLive.findOneAndUpdate(
      { username },
      { score,
       board,
       startTime,
       endTime,
       winTime,},
      { new: true, upsert: false }
    );

    if (winTime != "") {
      await GameLive.findOneAndUpdate(
        { username },
        {
            score,
            winTime,
        },
        { new: true, upsert: true }
      );
      await GameWinners.findOneAndUpdate(
        { username },
        {
            score,
            winTime,
        },
        { new: true, upsert: true }
      );
    }
    /*
      * if game is over, update the static leaderboard
      *
      * game over is denoted by an nonzero endTime
      */
    // console.log("wintime: " + winTime);
    // console.log("entime: " + endTime);
    console.log("endTime: " + endTime);
    if (endTime != "") {
      await GameStatic.findOneAndUpdate(
        { username },
        {
            score,
            winTime,
        },
        { new: true, upsert: true }
      );


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
app.post('/checkAttack', async (req, res) => {
  try {
    const { username } = req.body;
    console.log("body check attack " + req.body);
    console.log("username in check attack" + username);
    const all = await GameLive.find({});
    console.log(all);
    const player = await GameLive.findOne({ username });
    if (!player) {
      console.log("Check attack player not found");
      return res.status(400).json({ message: 'Player not found'});
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
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ message: 'Username is required' });
  }

  try {
    const currentDoc = await GameLive.findOne({ username });

    if (!currentDoc) {
      return res.status(404).json({ message: 'Document not found' });
    }

    console.log(`Current user's score: ${currentDoc.score}`);
    // Find the document with the next higher score
    const target = await GameLive.findOne({ score: { $gt: currentDoc.score } })
      .sort({ score: 1 }) // Sort by score in ascending order
      .exec();

    if (!target) {
      return res.status(404).json({ message: 'No suitable target found' });
    }

    target.pendingAttack = true;
    await target.save();

    return res.status(200).json({ message: 'Attack sent to next user' });
  } catch (error) {
    console.error("Error initiating attack:", error);
    res.status(500).json({ message: 'An error occurred while processing the attack' });
  }
});



// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://${hostname}:${PORT}`);
});
