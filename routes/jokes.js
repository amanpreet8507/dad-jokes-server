
const express = require('express')
const router = express.Router();
const jokesData = require("../data/jokes.json");

router.get('/jokes', (req, res) => {
    res.json(jokesData);
  });
router.get('/', (req, res) => {
    let NumAllJokes = jokesData.length;
    const randomNum = Math.floor(Math.random() * NumAllJokes + 1);
    console.log(randomNum);
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