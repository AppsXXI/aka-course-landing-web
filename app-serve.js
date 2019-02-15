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

app.listen(process.env.PORT || 8080, () => {
  console.log("Server has started");
});