const express = require('express');
const path = require('path');
const sendEmail = require('./services/mail.js');

const isValid = require('./services/validation');

const app = express();

const PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'views', 'index.html'));
});

app.post(
  '/',
  (req, res, next) => {
    const valid = isValid(req.body);

    if (valid.status === 'Not Valid') {
      return res.status(500).send(`<h1>${valid.message}<h1>`);
    }
    return next();
  },
  (req, res) => {
    const { name, email, text } = req.body;

    sendEmail(name, email, text, (err, data) => {
      err ? res.status(500).json({ message: 'Internal Error' }) : res.redirect('/');
    });
  }
);

app.listen(PORT, () => {
  console.log('Server is starting on PORT: ', 8080);
});
