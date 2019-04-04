const express = require('express');
const axios = require('axios');
const path = require('path');
const bodyparser = require('body-parser');
const app = express();
// const cors = require('cors');

app.use(express.static(__dirname + '/dist/'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
// app.use(cors());

function sendFormToSpreadsheet(sheetname, data) {
  const spreadUrl = 'https://script.google.com/macros/s/AKfycbxlchUlPv4XLRHKP_9vhDKcKsZ0YZAtQ65jdEHyCNbkGR_-l44J/exec';
  const requestData = [`sheetname=${sheetname}`];

  for (const field in data) {
    requestData.push(`${field}=${data[field]}`);
  }
  
  console.log("Sending data to google spreadsheet... ");
  return axios.get(`${spreadUrl}?${requestData.join('&')}`);
}

app.get('/', (req, res) => {
  return res.sendFile(path.join(__dirname + '/dist/index.html'));
});

app.post('/process-more-info-form', function (req, res) {
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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
          <p>Este email fue autogenerado para notificar de tu pedido de más información.</p>
          <p>Nos pondremos en contacto a la brevedar.</p>
          <p>Gracias por contactarnos.</p>
        </td>
      </tr>
    </table>
    `
  };

  sendFormToSpreadsheet('Suscripciones', req.body)
    .then(googleres => {
      console.log('Google responded successfuly');

      sgMail.send(adminMsg, false, (error, response) => {
        if (error) {
          res.status(500).send({ status: 'error', error: error.body ? error.body.errors : error });
        }
        
        if (response) {
          res.status(200).send({ status: 'ok' });
        }
      });
    
      sgMail.send(userMsg, false, (error, response) => {
        if (error) {
          res.status(500).send({ status: 'error', error: error.body ? error.body.errors : error });
        }
        
        if (response) {
          res.status(200).send({ status: 'ok' });
        }
      });
    })
    .catch(err => {
      res.status(500).send({ status: 'error', error: err });
    });
});

app.post('/process-subscribe-form', function (req, res) {
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const adminMsg = {
    to: 'miguel.sosa@appsxxi.com',
    from: req.body.email,
    subject: '[CDPW - Subscription] - ' + req.body.email,
    text: `New subscription from ${req.body.email}`,
    html: `
    <table with="100%">
      <tr>
        <td><h1>Curso de Programación y Desarrollo WEB</h1></td>
      </tr>
      <tr>
        <td>
          <p>New subscription from</p>
          <p><strong>Email</strong> ${req.body.email}</p>
        </td>
      </tr>
    </table>
    `
  };

  const userMsg = {
    to: req.body.fullname + ' <' + req.body.email + '>',
    from: 'Curso de Programación y Desarrollo WEB <contacto@appsxxi.com>',
    subject: 'RE: Suscripción exitosa',
    text: 'Hola.\nEste email fue autogenerado para informarte que tu suscripción ha sido exitosa.\n\nRecibirás novedades de nosotros a la brevedad.\n\nGracias por suscribirte.',
    html: `
    <table with="100%">
      <tr>
        <td><h1>Curso de Programación y Desarrollo WEB</h1></td>
      </tr>
      <tr>
        <td>
          <p>Hola.</p>
          <p>Este email fue autogenerado para informarte que tu suscripción ha sido exitosa.</p>
          <p>Recibirás novedades de nosotros a la brevedad.</p>
          <p>Gracias por suscribirte.</p>
        </td>
      </tr>
    </table>
    `
  };

  sendFormToSpreadsheet('Suscripciones', req.body)
    .then(googleres => {
      sgMail.send(adminMsg, false, (error, response) => {
        if (error) {
          res.status(500).send({ status: 'error', error: error.body ? error.body.errors : error });
        }
        
        if (response) {
          res.status(200).send({ status: 'ok' });
        }
      });
    
      sgMail.send(userMsg, false, (error, response) => {
        if (error) {
          res.status(500).send({ status: 'error', error: error.body ? error.body.errors : error });
        }
        
        if (response) {
          res.status(200).send({ status: 'ok' });
        }
      });
    })
    .catch(err => {
      res.status(500).send({ status: 'error', error: err });
    });
});

app.post('/process-inscription-form', function (req, res) {
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const adminMsg = {
    to: 'miguel.sosa@appsxxi.com',
    from: req.body.email,
    subject: '[CDPW - Pre Inscripción] - ' + req.body.name + ' ' + req.body.lastname,
    text: `New enrollment from ${req.body.name} ${req.body.lastname}\nDocument: ${req.body.document}\nEmail: ${req.body.email}\nPhone: ${req.body.phone}\nGroup: ${req.body.group}\nPayment method: ${req.body.payment}`,
    html: `
    <table with="100%">
      <tr>
        <td><h1>Curso de Programación y Desarrollo WEB</h1></td>
      </tr>
      <tr>
        <td>
          <p>New enrollment from ${req.body.name} ${req.body.lastname}</p>
          <p><strong>Document</strong> ${req.body.document}</p>
          <p><strong>Phone</strong> ${req.body.phone}</p>
          <p><strong>Email</strong> ${req.body.email}</p>
          <p><strong>Group</strong> ${req.body.group}</p>
          <p><strong>Payment Method</strong> ${req.body.payment}</p>
        </td>
      </tr>
    </table>
    `
  };

  const userMsg = {
    to: req.body.name + req.body.lastname + ' <' + req.body.email + '>',
    from: 'Curso de Programación y Desarrollo WEB <contacto@appsxxi.com>',
    subject: 'RE: Pre inscripción exitosa',
    text: 'Hola ' + req.name + '.\nEste email fue autogenerado para informarte que tu pre inscripción ha sido exitosa.\n\nRecibirás novedades de nosotros a la brevedad.\n\nGracias por pre inscribirte.',
    html: `
    <table with="100%">
      <tr>
        <td><h1>Curso de Programación y Desarrollo WEB</h1></td>
      </tr>
      <tr>
        <td>
          <p>Hola ${req.body.name}.</p>
          <p>Este email fue autogenerado para informarte que tu pre inscripción ha sido exitosa.</p>
          <p>Recibirás novedades de nosotros a la brevedad.</p>
          <p>Gracias por pre inscribirte.</p>
        </td>
      </tr>
    </table>
    `
  };

  sendFormToSpreadsheet(req.body.group, req.body)
  .then(googleres => {
    sgMail.send(adminMsg, false, (error, response) => {
      if (error) {
        res.status(500).send({ status: 'error', error: error.body ? error.body.errors : error });
      }
      
      if (response) {
        res.status(200).send({ status: 'ok' });
      }
    });
  
    sgMail.send(userMsg, false, (error, response) => {
      if (error) {
        res.status(500).send({ status: 'error', error: error.body ? error.body.errors : error });
      }
      
      if (response) {
        res.status(200).send({ status: 'ok' });
      }
    });
  })
  .catch(err => {
    res.status(500).send({ status: 'error', error: err });
  });
});

app.listen(process.env.PORT || 8080, () => {
  console.log("Server has started");
});