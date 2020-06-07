const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const measurementsByweatherstationId = {};

app.get('/weatherstations/:id/measurements', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/weatherstations/:id/measurements', async (req, res) => {
  const measurementId = randomBytes(4).toString('hex');
  const { content } = req.body;

  const measurements = measurementsByweatherstationId[req.params.id] || [];

  measurements.push({ id: measurementId, content, status: 'pending' });

  measurementsByweatherstationId[req.params.id] = measurements;

  await axios.post('http://event-bus-srv:4005/events', {
    type: 'MeasurementCreated',
    data: {
      id: commentId,
      content,
      postId: req.params.id,
      status: 'pending'
    }
  });

  res.status(201).send(comments);
});

app.listen(4001, () => {
  console.log('Listening on 4001');
});
