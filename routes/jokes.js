const express = require("express");
const router = express.Router();
const jokesData = require("../data/jokes.json");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

router.get("/", (req, res) => {
  res.json(jokesData);
});

// To Get random joke
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

// Endpoint to handle GET, POST comments
router
  .route("/:id/comments")
  .get((req, res) => {
    const jokeId = parseInt(req.params.id);
    const joke = jokesData.find((j) => j.id === jokeId);

    if (!joke) {
      res.status(404).json({ message: "Joke not found" });
    } else {
      res.json(joke.comments || []);
    }
  })
  .post((req, res) => {
    // Access the JSON data sent by the client
    const { name, comment } = req.body;
    const jokeId = parseInt(req.params.id);

    if (!name || !comment)
      return res.status(400).json("Please input name and comment");

    // read file
    const newCommentsList = JSON.parse(fs.readFileSync("./data/jokes.json"));

    // Find the joke
    const jokeIndex = newCommentsList.findIndex((joke) => joke.id === jokeId); // Changed variable name to avoid confusion
    console.log(jokeIndex , 'jokeIndex')
    if (jokeIndex == -1) {
      return res.status(404).json("Joke not found");
    }

    const joke = newCommentsList[jokeIndex];
    if (!joke.comments) {
      joke.comments = []; // Create comments array if it doesn't exist
    }

    const newComment = {
      id: uuidv4(),
      name,
      comment,
      likes: 0,
      timestamp: Date.now(),
    };
    joke.comments.push(newComment);

    newCommentsList[jokeIndex] = joke;

    fs.writeFileSync("./data/jokes.json", JSON.stringify(newCommentsList));
    res.status(201).json(joke);
  });

module.exports = router;
