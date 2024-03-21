const express = require("express");
const router = express.Router();
const jokesData = require("../data/jokes.json");
const { v4: uuidv4 } = require('uuid');
const fs = require("fs");

router.get("/", (req, res) => {
  res.json(jokesData);
});

router.get("/random", (req, res) => {
  // Get the length of array storing all jokes
  let numAllJokes = jokesData.length;
  // Get a random number between 1 and numAllJokes
  const randomNum = Math.floor(Math.random() * (numAllJokes - 1) + 1);
  // Return the random joke that has same id as randomNum
  const joke = jokesData.find((j) => j.id === randomNum);

  if (!joke) {
    res.status(404).json({ message: "Joke not found" });
  } else {
    res.json(joke);
  }
});

router.get("/:id", (req, res) => {
  const jokeId = parseInt(req.params.id);
  const joke = jokesData.find((j) => j.id === jokeId);

  if (!joke) {
    res.status(404).json({ message: "Joke not found" });
  } else {
    res.json(joke);
  }
});

// Endpoint to handle POST requests
router.post("/:id/comments", (req, res) => {
  // Access the JSON data sent by the client
  const { name, comment } = req.body;

  if (!name || !comment)
    return res.status(400).json("Please input name and comment");
  const jokeId = req.params.id;

  // read file
  const newCommentsList = JSON.parse(fs.readFileSync("./data/jokes.json"));

  //Find the joke
  const joke = newCommentsList.find((joke) => jokeId === jokeId);
  if (!joke) {
    return res.status(404).json("joke not found");
  }

  const newComment = {
    id: uuidv4(),
    name,
    comment,
    likes:0,
    timestamp: Date.now(),
  };
  joke.comments.push(newComment);

  fs.writeFileSync("./data/jokes.json", JSON.stringify(newCommentsList));
  res.status(201).json(joke);
});

module.exports = router;
