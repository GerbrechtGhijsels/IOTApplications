import express from 'express';
import {currentUser, NotFoundError} from '../common';
import { User } from '../models/user';

const router = express.Router();

router.get('/api/users/currentuser', currentUser, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});




router.get('/api/users/user/cities', currentUser, (req, res) => {
  res.send({ currentUser: req.currentUser!.cities || null });
});

router.get('/api/users/user/stations', currentUser, (req, res) => {
  res.send({ currentUser: req.currentUser!.stations || null });
});

router.put('/api/users/user/cities', currentUser, async (req, res) => {
  const user = await User.findById(req.currentUser!.id);
  if (!user) {
    throw new NotFoundError();
  }
  user.stations.push(req.body.city);
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
