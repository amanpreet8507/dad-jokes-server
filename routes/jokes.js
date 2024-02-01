
const express = require('express')
const router = express.Router();
const jokesData = require("../data/jokes.json");

router.get('/', (req, res) => {
  res.json(jokesData);
});

router.get('/random', (req, res) => {
  // Get the length of array storing all jokes
  let numAllJokes = jokesData.length;
  // Get a random number between 1 and numAllJokes
  const randomNum = Math.floor(Math.random() * (numAllJokes-1) + 1);
  // Return the random joke that has same id as randomNum
  const joke = jokesData.find(j => j.id === randomNum);

  if (!joke) {
    res.status(404).json({ message: 'Joke not found' });
  } else {
    res.json(joke);
  }

});

router.get('/:id', (req, res) => {
  const jokeId = parseInt(req.params.id);
  const joke = jokesData.find(j => j.id === jokeId);

  if (!joke) {
    res.status(404).json({ message: 'Joke not found' });
  } else {
    res.json(joke);
  }
});

module.exports=router;