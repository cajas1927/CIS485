const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const Mayor = require('./Mayor');
const City = require('./City');

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/weatherData', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Create a mayor
app.post('/mayors', async (req, res) => {
  const { firstname, lastname, birthdate, political_party, terms_served } = req.body;
  try {
    const mayor = new Mayor({ firstname, lastname, birthdate, political_party, terms_served });
    await mayor.save();
    res.status(201).send(mayor);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Read all mayors
app.get('/mayors', async (req, res) => {
  try {
    const mayors = await Mayor.find();
    res.status(200).send(mayors);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a mayor
app.put('/mayors/:id', async (req, res) => {
  const { id } = req.params;
  const { firstname, lastname, birthdate, political_party, terms_served } = req.body;
  try {
    const updatedMayor = await Mayor.findByIdAndUpdate(id, { firstname, lastname, birthdate, political_party, terms_served }, { new: true });
    res.status(200).send(updatedMayor);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a mayor
app.delete('/mayors/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Mayor.findByIdAndDelete(id);
    res.status(200).send({ message: "Mayor deleted successfully" });
  } catch (error) {
    res.status(400).send(error);
  }
});

// Add an insert route for cities
app.post('/cities', async (req, res) => {
  const { name, years } = req.body;
  try {
    const city = new City({ name, years });
    await city.save();
    res.status(201).send(city);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Add an update route for cities
app.put('/cities/:id', async (req, res) => {
  const { id } = req.params;
  const { name, years } = req.body;
  try {
    const updatedCity = await City.findByIdAndUpdate(id, { name, years }, { new: true });
    res.status(200).send(updatedCity);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Add a delete route for cities
app.delete('/cities/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await City.findByIdAndDelete(id);
    res.status(200).send({ message: "City deleted successfully" });
  } catch (error) {
    res.status(400).send(error);
  }
});

// Add a read route for cities
app.get('/cities', async (req, res) => {
  try {
    const cities = await City.find().populate('years.mayor'); // Optionally populate the mayor details
    res.status(200).send(cities);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
