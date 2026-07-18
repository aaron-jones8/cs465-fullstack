const express = require('express');
const router = express.Router();
const travelController = require('../controllers/travel');

router.get('/', travelController.homelist);
router.get('/about', travelController.about);

module.exports = router;