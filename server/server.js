// Express server setup for Student Attendance System
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

// Swagger documentation
require('./swagger')(app);


require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB error:', err));

const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
app.use(logger);
app.use('/api', require('./routes/index'));
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
