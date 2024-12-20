const db = require('./config/connection');
const express = require('express');
const logger = require('./middleware/logger');

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('MongoDB connected successfully!');
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(logger);

  app.get('/', (req, res) => {
    res.send('Welcome to the MongoDB Express server!');
  });
  app.use('/api', require('./routes')); // Will look for an index.js file in the routes folder

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});