# Travel Logger App

Welcome to the Travel Logger App! This is a simple React application that allows users to log their travel experiences by entering the place and date.
## Overview

The Travel Logger App consists of the following components:

- **App**: The main component that renders the header, log form, and log history.
- **LogForm**: A form component for users to input the place and date for their travel logs.
- **LogHistory**: Displays the history of travel logs submitted by the user.


This guide will walk you through setting up a basic full stack application using Node.js for the backend and React for the frontend.

Usage
-Enter the place and date in the provided fields.
-Click the "Upload" button to submit a new travel log.
-Click the "History" button to view the history of submitted travel logs.

Technologies Used
-React
-Node.js
-Express
-MongoDB (or your preferred database)

To run the Travel Logger App locally, follow these steps:

## Step 1: Create Project Directory

First, create a main project directory and navigate into it:

```sh
mkdir travel2
cd travel2
```

## Step 2: Set Up Backend and Frontend Directories

Within the main project directory, create two separate directories for the frontend and backend parts of the application:

```sh
mkdir frontend backend
```

## Step 3: Initialize the Backend

Navigate to the backend directory and initialize a new Node.js project:

```sh
cd backend
npm init -y
```

Then, install the necessary packages:

```sh
npm install express
npm install cors --save
```

## Step 4: Backend Code

Create a file named `server.js` in the backend directory and add the following code:

```jsx
// server.js

// Import express and cors
const express = require('express');
const cors = require('cors');
const { connectDB, getDB } = require('./database.js');

const app = express();
app.use(cors());
app.use(express.json());

connectDB().catch(console.error);

app.get('/api/logs', async (req, res) => {
  try {
    const db = getDB();
    const collection = db.collection('travelLogs');
    const logs = await collection.find({}).toArray();
    res.json(logs);
  } catch (error) {
    res.status(500).json({ "error": error.message });
  }
});

app.post('/api/logs', async (req, res) => {
  try {
    const db = getDB();
    const collection = db.collection('travelLogs');
    const newLog = req.body;
    const result = await collection.insertOne(newLog);
    res.json(result.ops[0]);
  } catch (error) {
    console.error('Error processing POST request:', error);
    res.status(500).json({ "error": error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


To run your server, execute:

```sh
node server.js
```

Your server should start, and you'll see a message indicating it's running on port 3001.

### Prepare the Frontend

```
cd frontend
npx create-react-app
```

In the `frontend/src` directory, edit the `App.js` file to include the following React code:

```jsx
// App.js

import React, { useState, useEffect } from 'react';

function App() {
  const [travelLogs, setTravelLogs] = useState([]);
  const [newLog, setNewLog] = useState({ place: '', date: '' });
  const [error, setError] = useState('');
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    if (showHistory) {
      fetch('http://localhost:3001/api/logs')
        .then(response => {
          if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.status}`);
          }
          return response.json();
        })
        .then(setTravelLogs)
        .catch(error => {
          console.error('Error fetching travel logs:', error);
          setError(error.message);
        });
    }
  }, [showHistory]);

  const handleInputChange = (e) => {
    setNewLog({ ...newLog, [e.target.name]: e.target.value });
  };

  const handleUpload = () => {
    fetch('http://localhost:3001/api/logs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newLog),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to upload: ${response.status}`);
        }
        return response.json();
      })
      .then(newLog => {
        setTravelLogs(prevLogs => [...prevLogs, newLog]);
        setNewLog({ place: '', date: '' });
        setError('');
      })
      .catch(error => {
        console.error('Error uploading travel log:', error);
        setError(error.message);
      });
  };

  const handleHistoryClick = () => {
    setShowHistory(true);
  };

  return (
    <div>
      <h1>Travel Logger</h1>
      <div>
        <label>Place: </label>
        <input type="text" name="place" value={newLog.place} onChange={handleInputChange} />
      </div>
      <div>
        <label>Date: </label>
        <input type="text" name="date" value={newLog.date} onChange={handleInputChange} />
      </div>
      <button onClick={handleUpload}>Upload</button>
      <button onClick={handleHistoryClick}>History</button>
      {showHistory && (
        <div>
          {travelLogs.length ? (
            travelLogs.map((log, index) => (
              <div key={index}>
                <p>Place: {log.place}</p>
                <p>Date: {log.date}</p>
              </div>
            ))
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;

to run the frontend, execute:
```
cd frontend
npx create-react-app
```

