const express = require('express');
const cors = require('cors');
const app = express();
const jokesRoute = require('./routes/jokes');

app.use(express.json());
app.use(cors());

app.use('/jokes', jokesRoute);

require('dotenv').config();
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/', (req, res) => {
  res.json('Hi! You are approaching to get to jokes API!!');
});
