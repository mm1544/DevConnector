const express = require('express');
const connectDB = require('./config/db');
// For deployment
const path = require('path');
// Initialising app variable for express
const app = express();
// Connect to the database
connectDB();

// Init Middleware
// To be able to use eg. "req.body" need to initialise a middleware for the body parser. Parser is included with Express.
app.use(express.json({ extended: false }));

// endpoint for testing (commenting-out for deployment)
// app.get('/', (req, res) => res.send('API Running'));

// Define Routes
// It will pertain "/api/users" to '/'. I.e. if we get API request to "/api/users", it will get users.js
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

// Serve static assets in production (for deployment)
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  // To serve index.html file
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Setting Port to be an environmental variable. If there is no env var, it will use port 5000
const PORT = process.env.PORT || 5000;
// setting to listen port with callback fn which will execute once app will connect
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
