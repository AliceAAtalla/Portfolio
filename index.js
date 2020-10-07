const express = require('express');
const path = require('path');
const sendEmail = require('./services/mail.js');

const app = express();

const PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.post('/', (req, res) => {
  const { name, email, text } = req.body;
  sendEmail(name, email, text, (err, data) => {
    err ? res.status(500).json({ message: 'Internal Error' }) : res.redirect('/');
  });
});

app.listen(PORT, () => {
  console.log('Server is starting on PORT: ', 8080);
});
