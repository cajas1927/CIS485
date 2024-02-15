const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Route to open JSON file
router.get('/open-json', (req, res) => {
    const filePath = path.join(__dirname, '../public/data/patient-weather-data.json'); // Adjust the file path as needed
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.status(404).send('JSON file not found');
        } else {
            res.json(JSON.parse(data));
        }
    });
});

// Route for home page
router.get('/', (req, res) => {
    res.render('home');
});

// Route to display images
router.get('/images', (req, res) => {
    const imageDir = path.join(__dirname, '../public/images');
    fs.readdir(imageDir, (err, files) => {
        if (err) throw err;
        res.render('images', { images: files });
    });
});

// Route to display data based on query
router.get('/data', (req, res) => {
    // Your existing data route code...
});

// Route to render the form
router.get('/submit-form', (req, res) => {
    res.render('form');
});

module.exports = router;
