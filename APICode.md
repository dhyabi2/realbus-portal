# API Code for سكني Application

This Node.js API replaces the localStorage functionality with server-side storage using a JSON file and includes password validation for each endpoint.

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
const port = 443;
const ADMIN_PASSWORD = 'hakima234'; // Define the admin password

app.use(cors());
app.use(bodyParser.json());

const DATA_FILE = 'data.json';

// Middleware for password validation
const validatePassword = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const password = authHeader.split(' ')[1];
    if (password === ADMIN_PASSWORD) {
      next();
    } else {
      res.status(401).json({ error: 'Unauthorized' });
    }
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

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
app.get('/api/realEstateListings', validatePassword, async (req, res) => {
  const data = await readData();
  res.json(data.realEstateListings);
});

// POST /api/realEstateListings
app.post('/api/realEstateListings', validatePassword, async (req, res) => {
  const data = await readData();
  const newListing = { ...req.body, id: Date.now() };
  data.realEstateListings.push(newListing);
  await writeData(data);
  res.status(201).json(newListing);
});

// GET /api/busListings
app.get('/api/busListings', validatePassword, async (req, res) => {
  const data = await readData();
  res.json(data.busListings);
});

// POST /api/busListings
app.post('/api/busListings', validatePassword, async (req, res) => {
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

The API will be available at `https://sakni-api.replit.app:443`.

## API Endpoints

- GET /api/realEstateListings: Fetch all real estate listings
- POST /api/realEstateListings: Add a new real estate listing
- GET /api/busListings: Fetch all bus listings
- POST /api/busListings: Add a new bus listing

All endpoints require password authentication using the Bearer token in the Authorization header.

## Integrating with Frontend

Update the frontend code to include the password in the Authorization header for all API requests. The `localStorage.js` utility should be updated to include this functionality.

Example of how to use the API in the frontend:

```javascript
const API_BASE_URL = 'https://sakni-api.replit.app:443/api';
const ADMIN_PASSWORD = 'hakima234';

async function fetchData(endpoint) {
  const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
    headers: {
      'Authorization': `Bearer ${ADMIN_PASSWORD}`
    }
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
}

async function postData(endpoint, data) {
  const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ADMIN_PASSWORD}`
    },
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
}
```

Make sure to use these functions when interacting with the API in your React components.