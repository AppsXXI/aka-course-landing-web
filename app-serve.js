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
    text: `Requesting more info from ${req.body.fullname} ${req.body.email} ${req.body.phone}`,
    html: `
    <table with="100%">
      <tr>
        <td><h1>Curso de Programación y Desarrollo WEB</h1></td>
      </tr>
      <tr>
        <td>
          <p>Requesting more info from ${req.body.fullname}</p>
          <p><strong>Email</strong> ${req.body.email}</p>
          <p><strong>Telefono</strong> ${req.body.phone}</p>
        </td>
      </tr>
    </table>
    `
  };

  const userMsg = {
    to: req.body.fullname + ' <' + req.body.email + '>',
    from: 'Curso de Programación y Desarrollo WEB <contacto@appsxxi.com>',
    subject: 'RE: Solicitud de información',
    text: 'Hola ' + req.body.fullname + '.\nEste email fue autogenerado para informarte de tu pedido de más información.\n\nNos pondremos en contacto a la brevedar.\n\nGracias por contactarnos.',
    html: `
    <table with="100%">
      <tr>
        <td><h1>Curso de Programación y Desarrollo WEB</h1></td>
      </tr>
      <tr>
        <td>
          <p>Hola ${req.body.fullname}</p>
          <p>Este email fue autogenerado para informarte de tu pedido de más información.</p>
          <p>Nos pondremos en contacto a la brevedar.</p>
          <p>Gracias por contactarnos.</p>
        </td>
      </tr>
    </table>
    `
  };

  sgMail.send(adminMsg, false, (error, response) => {
    if (error) {
      res.status(500).send({ status: 'error', error });
    }
    
    if (response) {
      console.log(response);

      res.status(200).send({ status: 'ok' });
    }
  });

  sgMail.send(userMsg, false, (error, response) => {
    if (error) {
      res.status(500).send({ status: 'error', error });
    }
    
    if (response) {
      console.log(response);
      
      res.status(200).send({ status: 'ok' });
    }
  });
});

app.listen(process.env.PORT || 8080, () => {
  console.log("Server has started");
});