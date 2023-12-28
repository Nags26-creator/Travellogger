const { MongoClient } = require('mongodb');

// Connection URL and database name
const url = 'mongodb://localhost:27017'; // Replace with your MongoDB server URL
const dbName = 'new'; // Replace with your database name

// Data to be inserted
const dataToInsert = {
  place: 'John Doe',
  date: 30,
};

// Use async/await to handle asynchronous operations
async function insertData() {
  // Create a new MongoClient
  const client = new MongoClient(url, { useUnifiedTopology: true });

  try {
    // Connect to the MongoDB server
    await client.connect();

    // Select the database
    const db = client.db(dbName);

    // Select the collection
    const collection = db.collection('new1'); // Replace with your collection name

    // Insert the data
    const result = await collection.insertOne(dataToInsert);
    console.log(`Inserted ${result.insertedCount} document into the collection.`);
  } catch (err) {
    console.error('Error inserting data:', err);
  } finally {
    // Close the client
    client.close();
  }
}

// Call the insertData function to insert data
insertData();