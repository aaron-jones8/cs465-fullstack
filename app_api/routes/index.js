const express = require('express');
const router = express.Router();
const tripsController = require('../controllers/trips');
const authController = require('../controllers/authentication');
const passport = require('../config/passport');

const requireAuth = passport.authenticate('jwt', { session: false });

router.post('/register', authController.register);
router.post('/login', authController.login);

router.get('/trips', tripsController.tripsList);
router.get('/trips/:tripCode', tripsController.tripsFindByCode);

router.post('/trips', requireAuth, tripsController.tripsAddTrip);
router.put('/trips/:tripCode', requireAuth, tripsController.tripsUpdateTrip);
router.delete('/trips/:tripCode', requireAuth, tripsController.tripsDeleteTrip);

module.exports = router;