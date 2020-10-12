const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

const auth = {
  auth: {
    api_key: process.env.API_KEY,
    domain: process.env.DOMAIN,
  },
};

const transporter = nodemailer.createTransport(mailGun(auth));

const sendEmail = (name, email, message, call) => {
  const mailOptions = {
    from: email,
    to: 'aliceatalla36@gmail.com',
    subject: `Portfólio - Contato de ${name}`,
    text: message,
  };
  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      call(err, null);
    } else {
      call(null, data);
    }
  });
};

module.exports = sendEmail;
