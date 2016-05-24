const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const bandRouter = require(__dirname + '/routes/bandRoutes');
const songRouter = require(__dirname + '/routes/songRoutes');
const queryRouter = require(__dirname + '/routes/bandQuery');

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/db');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5000');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

app.use('/api', bandRouter);
app.use('/api', songRouter);
app.use('/api', queryRouter);

app.listen(PORT, () => console.log('Server listening on port:' + PORT));
