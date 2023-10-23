const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());

app.use(express.static('public')); // To serve static files

app.get('/api/postcode', async (req, res) => {
  try {
    const postcode = req.query.postcode;
    const response = await axios.get(`http://api.postcodes.io/postcodes/${postcode}`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching postcode data', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/api/crime', async (req, res) => {
    try {
      const { date, lat, lng } = req.query;
      const response = await axios.get(`https://data.police.uk/api/crimes-at-location?date=${date}&lat=${lat}&lng=${lng}`);
      res.json(response.data);
    } catch (error) {
      console.error('Error fetching crime data', error);
      res.status(500).send('Internal Server Error');
    }
  });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


















// const express = require('express');
// const axios = require('axios');
// const app = express();

// app.use(express.static('public'));

// app.get('/postcode', async (req, res) => {
//     try {
//         const postcode = req.query.postcode;
//         if (!postcode) {
//           return res.status(400).send('Postcode is required');
//     }

//     const response = await axios.get(`http://api.postcodes.io/postcodes/${postcode}`);
//     res.json(response.data);
//   } catch (error) {
//     res.status(500).send('Internal Server Error');
//   }
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
