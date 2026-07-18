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