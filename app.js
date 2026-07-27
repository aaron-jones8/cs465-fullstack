const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');

require('./app_api/models/db');

const app = express();

// View engine setup
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'app_server/views'));

// Routes (checked first)
const indexRouter = require('./app_server/routes/index');
app.use('/', indexRouter);

// Static assets (css, images) — checked only if no route matched
app.use(express.static(path.join(__dirname, 'public')));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Travlr Getaways server running at http://localhost:${port}`);
});