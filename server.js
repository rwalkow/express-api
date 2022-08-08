const express = require('express');
const cors = require('cors');

const app = express();

const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

const corsOptions = {
  "origin": "http://localhost:8000/",
  "methods": "GET,POST",
}

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);

app.use((req, res) => {
  if (res.status(404)) res.json({ message: '404: Page not found!' });
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
