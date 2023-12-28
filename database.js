// database.js
const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017'; // MongoDB URL
const dbName = 'new'; // Database Name

const client = new MongoClient(url);
let db;

async function connectDB() {
  await client.connect();
  console.log("Connected successfully to MongoDB server");
  db = client.db(dbName);
}

function getDB() {
  if (!db) {
    throw Error('Database not initialized');
  }
  return db;
}

module.exports = { connectDB, getDB };