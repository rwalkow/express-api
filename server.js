const express = require('express');
const cors = require('cors');
const path = require('path');
const socket = require('socket.io');
const mongoose = require('mongoose');
const helmet = require('helmet');

const app = express();

app.use(helmet());

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(express.static(path.join(__dirname, '/client/build')));

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server, {cors: {origin: "http://localhost:3000"} });

io.on('connection', (socket) => {
  console.log('ConnectNew socket!');
});

const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

const corsOptions = {
  "origin": "http://localhost:3000/",
  "methods": "GET,POST",
}

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});


app.use((req, res) => {
  if (res.status(404)) res.json({ message: '404: Page not found!' });
})

const NODE_ENV = process.env.NODE_ENV;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
let dbURI = '';

if (NODE_ENV === 'production') dbURI = 'mongodb+srv://DB_USER:DB_PASSWORD@cluster0.w7n5ciu.mongodb.net/?retryWrites=true&w=majority';
 else if (NODE_ENV === 'test') dbURI = 'mongodb://localhost:27017/NewWaveDBtest';
  else dbURI = 'mongodb://localhost:27017/NewWaveDB';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));

io.on('connection', (socket) => {
  console.log('Connect - new socket!');
});

module.exports = server;
