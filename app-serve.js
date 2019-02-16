const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const app = express();

app.use(express.static(__dirname + '/dist/'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  return res.sendFile(path.join(__dirname + '/dist/index.html'));
});

app.post('/process-more-info-form', function (req, res) {
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  console.log(process.env.SENDGRID_API_KEY);
  console.log(req.body);
  
  const adminMsg = {
    to: 'miguel.sosa@appsxxi.com',
    from: req.body.fullname + ' <' + req.body.email + '>',
    subject: '[CDPW - More Info] - ' + req.body.fullname,
    text: 'Requesting more info',
    html: '<strong>Requesting more info</strong>',
  };

  const userMsg = {};

  sgMail.send(msg);
  res.status(200).send({ status: 'ok' });
});

app.listen(process.env.PORT || 8080, () => {
  console.log("Server has started");
});