# API Code for سكني Application

This Node.js API replaces the localStorage functionality with server-side storage using a JSON file.

## Setup

1. Install dependencies:
   ```
   npm install express body-parser cors fs
   ```

2. Create a file named `server.js` with the following content:

```javascript
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs').promises;

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const DATA_FILE = 'data.json';

// Initialize data file if it doesn't exist
async function initializeDataFile() {
  try {
    await fs.access(DATA_FILE);
  } catch (error) {
    await fs.writeFile(DATA_FILE, JSON.stringify({
      realEstateListings: [],
      busListings: []
    }));
  }
}

// Read data from file
async function readData() {
  const data = await fs.readFile(DATA_FILE, 'utf8');
  return JSON.parse(data);
}

// Write data to file
async function writeData(data) {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

// GET /api/realEstateListings
app.get('/api/realEstateListings', async (req, res) => {
  const data = await readData();
  res.json(data.realEstateListings);
});

// POST /api/realEstateListings
app.post('/api/realEstateListings', async (req, res) => {
  const data = await readData();
  const newListing = { ...req.body, id: Date.now() };
  data.realEstateListings.push(newListing);
  await writeData(data);
  res.status(201).json(newListing);
});

// GET /api/busListings
app.get('/api/busListings', async (req, res) => {
  const data = await readData();
  res.json(data.busListings);
});

// POST /api/busListings
app.post('/api/busListings', async (req, res) => {
  const data = await readData();
  const newBus = { ...req.body, id: Date.now() };
  data.busListings.push(newBus);
  await writeData(data);
  res.status(201).json(newBus);
});

// Start the server
initializeDataFile().then(() => {
  app.listen(port, () => {
    console.log(`API server running on http://localhost:${port}`);
  });
});
```

## Running the API

1. Save the above code in a file named `server.js`.
2. Run the server using Node.js:
   ```
   node server.js
   ```

The API will be available at `http://localhost:3001`.

## API Endpoints

- GET /api/realEstateListings: Fetch all real estate listings
- POST /api/realEstateListings: Add a new real estate listing
- GET /api/busListings: Fetch all bus listings
- POST /api/busListings: Add a new bus listing

## Integrating with Frontend

Update the frontend code to use these API endpoints instead of localStorage. Replace the localStorage utility functions with API calls using fetch or axios.