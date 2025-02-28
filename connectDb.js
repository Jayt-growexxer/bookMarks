const { MongoClient, ObjectId } = require("mongodb");
const uri = require("./mongoDb");

console.log(uri);

const connectDB = async () => {
  try {
    const client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
    return client.db("test");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    process.exit(1);
  }
};
module.exports = connectDB;
