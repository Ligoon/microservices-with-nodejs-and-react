const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;
  // req.params.id is the id of the post
  const comments = commentsByPostId[req.params.id] || []; // if undefined then []
  comments.push({ id: commentId, content, status: 'pending' }); // create comment
  commentsByPostId[req.params.id] = comments;
  console.log("====== this is content =======");
  console.log({ commentId, content, status: 'pending' });
  await axios.post('http://event-bus-srv:4005/events', {
    type: 'CommentCreated',
    data: {
      id: commentId,
      content,
      postId: req.params.id,
      status: 'pending'
    }
  });
  res.status(201).send(comments);
});

// receive event from event bus
app.post('/events', async (req, res) => {
  console.log('Receive Event', req.body.type);
  const { type, data } = req.body;
  if(type === 'CommentModerated'){
    const { postId, id, status, content } = data;
    // update status
    const comments = commentsByPostId[postId];
    const comment = comments.find(comment => {
      return comment.id === id;
    });
    comment.status = status;

    await axios.post('http://event-bus-srv:4005/events', {
      type: 'CommentUpdated',
      data: {
        id,
        status,
        postId,
        content
      }
    });
  }
  res.send({});
});

app.listen(4001, () => {
  console.log("listening on 4001"); 
});