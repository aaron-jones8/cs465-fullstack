const fs = require('fs');
const path = require('path');

module.exports.homelist = (req, res) => {
    res.render('index', {
        title: 'Travlr Getaways',
        message: 'This content is rendered dynamically via Handlebars!'
    });
};

module.exports.about = (req, res) => {
    res.render('about', {
        title: 'Learn more about who we are',
        message: 'This page is also rendered dynamically through the same MVC structure.'
    });
};

module.exports.travel = (req, res) => {
    const tripsPath = path.join(__dirname, '../../data/trips.json');
    fs.readFile(tripsPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading trip data');
        }
        const trips = JSON.parse(data);
        res.render('travel', {
            title: 'Explore Our Trips',
            trips: trips
        });
    });
};