const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

// unused right now
app.get('/posts', (req, res) => {
  res.send(posts);
});

// gets executed every single time someone tries to create a new post
app.post('/posts/create', async (req, res) => {
  const id = randomBytes(4).toString('hex'); //kfeji5sjfie46he
  const { title } = req.body;

  posts[id] = {
    id, title
  };
  await axios.post('http://event-bus-srv:4005/events', { // emit a event to bus server
    type: 'PostCreated',
    data: {
      id, title
    }
  });
  res.status(201).send(posts[id]); // Sets the HTTP status for the response.
});
// receive event from event bus
app.post('/events', (req, res) => {
  console.log('Receive Event', req.body.type);
  res.send({});
});

app.listen(4000, () => {
  console.log('v55000');
  console.log('Listening on 4000');
});