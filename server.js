var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.listen(port);


app.use('/api/diseniovotacion', require('./api/routes/routes'));

console.log('todo list RESTful API server started on: ' + port);
