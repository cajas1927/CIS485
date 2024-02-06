const express = require('express');
const path = require('path');
const ascii = require('ascii-art');

const app = express();
const port = 3000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'lab-03/public')));

// Hard-coded route for JSON data
app.get('/data', (req, res) => {
  res.json({ message: "Hello, this is JSON data!" });
});

// Route for ASCII image
app.get('/ascii-image', async (req, res) => {
  const imagePath = path.join(__dirname, 'lab-03/public/img/flower.jpg');
  console.log('Image Path:', imagePath);

  try {
    const image = await ascii.image({
      filepath: imagePath,
      width: 50,
      format: 'img',
    });
    res.send(image);
  } catch (err) {
    console.error('Error generating ASCII image:', err.message);
    res.status(500).send("Failed to convert image.");
  }
});

// Starting the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}/`);
});
