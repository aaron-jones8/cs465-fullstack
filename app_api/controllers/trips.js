const mongoose = require('mongoose');
const Trip = require('../models/travel');

// GET /api/trips - return all trips
const tripsList = async (req, res) => {
    try {
        const trips = await Trip.find({});
        if (!trips.length) {
            return res.status(404).json({ message: 'No trips found' });
        }
        return res.status(200).json(trips);
    } catch (err) {
        return res.status(500).json({ message: 'Error retrieving trips', error: err.message });
    }
};

// GET /api/trips/:tripCode - return a single trip by code
const tripsFindByCode = async (req, res) => {
    try {
        const trip = await Trip.findOne({ code: req.params.tripCode });
        if (!trip) {
            return res.status(404).json({ message: 'Trip not found' });
        }
        return res.status(200).json(trip);
    } catch (err) {
        return res.status(500).json({ message: 'Error retrieving trip', error: err.message });
    }
};

module.exports = {
    tripsList,
    tripsFindByCode
};