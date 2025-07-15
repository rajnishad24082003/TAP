const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

async function connectDB() {
  try {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    let db = client.db("tap");
    console.log("MongoDB connected");
    return db;
  } catch (error) {
    console.log("unable to connect to database");
  }
}

module.exports = connectDB;
