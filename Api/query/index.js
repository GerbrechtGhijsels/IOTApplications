const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const weatherstations = {};

const handleEvent = (type, data) => {
  if (type === 'WeatherstationCreated') {
    const { id, title } = data;

    weatherstations[id] = { id, title, measurements: [] };
  }

  if (type === 'MeasurementCreated') {
    const { id, content, weatherstationId, status } = data;

    const weatherstation = weatherstations[weatherstationId];
    weatherstation.measurements.push({ id, content, status });
  }
};

app.get('/weatherstations', (req, res) => {
  res.send(weatherstations);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;

  handleEvent(type, data);

  res.send({});
});

app.listen(4002, async () => {
  console.log('Listening on 4002');

  const res = await axios.get('http://event-bus-srv:4005/events');

  for (let event of res.data) {
    console.log('Processing event:', event.type);

    handleEvent(event.type, event.data);
  }
});
