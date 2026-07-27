const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const dbURI = 'mongodb://localhost:27017/travlr';
mongoose.connect(dbURI);

const Trip = require('./app_api/models/travel');

const tripsPath = path.join(__dirname, 'data/trips.json');
const trips = JSON.parse(fs.readFileSync(tripsPath, 'utf8'));

async function seedDatabase() {
    try {
        await Trip.deleteMany({});
        console.log('Existing trips cleared.');

        const inserted = await Trip.insertMany(trips);
        console.log(`${inserted.length} trips inserted successfully.`);
    } catch (err) {
        console.error('Error seeding database:', err);
    } finally {
        mongoose.connection.close();
    }
}

seedDatabase();