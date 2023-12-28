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
