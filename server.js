var cors = require('cors');
var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000;

const bodyParser = require('body-parser');
const consumer = require('./kafka/consumer');
app.use(bodyParser.json());
app.use(cors());
app.listen(port);

app.use('/api/diseniovotacion', require('./api/routes/routes'));

console.log('todo list RESTful API server started on: ' + port);
