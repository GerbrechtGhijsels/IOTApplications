import express from 'express';
import {currentUser, NotFoundError} from '../common';
import { User } from '../models/user';

import cors from 'cors';

const router = express.Router();


router.use(cors());
router.get('/api/users/currentuser', currentUser, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

router.get('/api/users/user/cities', currentUser, async (req, res) => {
  const user = await User.findById(req.currentUser!.id);
  if (!user) {
    throw new NotFoundError();
  }
  res.send({cities: user.cities|| null });
});

router.get('/api/users/user/stations', currentUser, async (req, res) => {
  const user = await User.findById(req.currentUser!.id);
  if (!user) {
    throw new NotFoundError();
  }
  res.send({stations: user.stations|| null });
});

router.put('/api/users/user/cities', currentUser, async (req, res) => {
  const user = await User.findById(req.currentUser!.id);
  if (!user) {
    throw new NotFoundError();
  }
  const { city} = req.body;
  user.cities.push(req.body.city);
  console.log(req.body);
  console.log(req.body.city);
  console.log(city);
  await user.save();
  res.send({ currentUser: req.currentUser || null });
});

router.put('/api/users/user/stations', currentUser, async (req, res) => {
  const user = await User.findById(req.currentUser!.id);
  if (!user) {
    throw new NotFoundError();
  }
  user.stations.push(req.body.station);
  await user.save();
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
