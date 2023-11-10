// Import necessary modules
const express = require('express'); // Express framework to handle HTTP requests
const axios = require('axios'); // Axios for making HTTP requests to external APIs
const cors = require('cors'); // CORS middleware to enable cross-origin requests
const app = express(); // Create an instance of an express application

// Middleware to enable CORS for all routes
app.use(cors());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Logging middleware to log all incoming requests to the server
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next(); // Call next to continue processing the request
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error(error.stack); // Logs stack trace
  res.status(500).send('Something broke!');
});

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] Request from ${req.ip}: ${req.method} ${req.path}`);
  console.log(`User-Agent: ${req.headers['user-agent']}`);
  next();
});

// Route to handle requests for postcode data
app.get('/api/postcode', async (req, res) => {
  try {
    const postcode = req.query.postcode; // Extract postcode from query parameters
    // Make a request to the postcode API to retrieve data
    const response = await axios.get(`http://api.postcodes.io/postcodes/${postcode}`);
    console.log(response.data); // Log the data received from the postcode API
    res.json(response.data); // Send the data back to the client as JSON
  } catch (error) {
    // Log any errors that occur during the request to the postcode API
    console.error('Error fetching postcode data', error);
    res.status(500).send('Internal Server Error'); // Send a 500 error response
  }
});

// Route to handle requests for crime data based on location and date
app.get('/api/crime', async (req, res) => {
  try {
    const date = req.query.date; // Extract date from query parameters
    const lat = req.query.lat; // Extract latitude from query parameters
    const lng = req.query.lng; // Extract longitude from query parameters

    // Build the URL for the crime data API request
    const url = `https://data.police.uk/api/crimes-at-location?date=${date}&lat=${lat}&lng=${lng}`;
    console.log(`Requesting crime data from URL: ${url}`);
    // Make a request to the crime data API to retrieve data
    const response = await axios.get(url);
    console.log('Crime data response:', response.data); // Log the data received from the crime data API

    res.json(response.data); // Send the crime data back to the client as JSON
  } catch (error) {
    // Log any errors that occur during the request to the crime data API
    console.error('Error fetching crime data', error.message);
    if (error.response) {
      // Log the error response from the API if available
      console.error('Error response:', error.response.data);
    }
    res.status(500).send('Internal Server Error'); // Send a 500 error response
  }
});

// Set the port for the server to listen on
const PORT = process.env.PORT || 3000; // Use the environment variable PORT or default to 3000

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});










