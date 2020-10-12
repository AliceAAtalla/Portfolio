const express = require('express');
const sendEmail = require('./services/mail.js');
require('dotenv/config');

const isValid = require('./services/validation');

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', './public/views');

app.use(express.static('public'));

app.get('/', (_req, res) => res.render('index', { message: null }));

app.post(
  '/',
  (req, res, next) => {
    const valid = isValid(req.body);

    if (valid.status === 'Not Valid') {
      return res.status(500).render('index', { message: valid.message });
    }
    return next();
  },
  (req, res) => {
    const { name, email, text } = req.body;

    sendEmail(name, email, text, (err, data) => {
      err
        ? res.status(500).json({ error: 'Erro interno no envio da mensagem' })
        : res.redirect('/');
    });
  }
);

app.listen(PORT, () => {
  console.log('Server is starting on PORT: ', 8080);
});
