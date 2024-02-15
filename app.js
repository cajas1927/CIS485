const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const multer = require('multer'); // Import multer middleware
const app = express();
const port = 3001;

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Configure multer for file uploads
const upload = multer(); // Initialize multer

app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.json()); // for parsing application/json

// Import routes
const indexRouter = require('./routes/index');
app.use('/', indexRouter); // Using the router for all routes

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
