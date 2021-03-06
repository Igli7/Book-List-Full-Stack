const express = require('express');
const connectDB = require('./config/db');
const app = express();
const path = require('path');
const cors = require('cors');
var http = require('http');

// Connect DB
connectDB();

app.use(cors());

// Init Middleware
app.use(express.json({ extended: false }));

//Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/confirmation', require('./routes/confirmation'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/books', require('./routes/books'));
app.use('/api/resend', require('./routes/resend'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

const PORT = process.env.PORT || 3500;
app.get('/', function (req, res) {
  res.send('Hello World');
});

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = app;
