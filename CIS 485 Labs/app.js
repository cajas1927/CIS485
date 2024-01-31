
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello from Node.js!');
});

app.get('/api/courses', (req, res) => {
    res.send([1, 2, 3]);
});
const port = 3000;
app.listen(port, () => {
  console.log(`http://localhost:${port}/`);
});
