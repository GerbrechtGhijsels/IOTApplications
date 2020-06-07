const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const weatherstations = {};

app.get('/weatherstations', (req, res) => {
  res.send(weatherstations);
});

app.post('/weatherstations/create', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;

  weatherstations[id] = {
    id,
    title
  };

  await axios.post('http://event-bus-srv:4005/events', {
    type: 'WeatherstationCreated',
    data: {
      id,
      title
    }
  });

  res.status(201).send(weatherstations[id]);
});

app.post('/events', (req, res) => {
  console.log('Received Event', req.body.type);

  res.send({});
});

app.listen(4000, () => {
  console.log('v55');
  console.log('Listening on 4000');
});
