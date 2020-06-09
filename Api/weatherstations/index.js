const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

import mongoose from 'mongoose';

const app = express();
app.use(bodyParser.json());
app.use(cors());

const weatherstations = {};

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('Connected to MongoDb');
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000!!!!!!!!');
  });
};

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
