import mongoose from 'mongoose';


// Define the MongoDB connection URL
const mongoURL =  'mongodb://127.0.0.1:27017/hotels' //'mongodb://localhost:127.0.0.1:27017/hotels' // Replace 'mydatabase' with your database name.

// Setup MongoDB connection

/* mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
 */

// Modern way syntax setup.

//mongoose.connect(mongoURL);


// Get the default connection 
// Mongoose maintans a default connection object representing the MongoDB connection.

const db = mongoose.connection;

// Define Event listners for database connection. in v5

/* db.on('connected', () => {
  console.log('Connected to MongoDB Server');
});

db.on('error', (err) => {
  console.log('MongoDB connection error', err);
});

db.on('disconnected', () => {
  console.log('MongoDB disconnected');
});
 */

// But in version 9+ we use this below style syntax.

 mongoose.connect(mongoURL)
.then(() => {
  console.log("MongoDB database connected successfully");
})
.catch((err) => {
  console.log('Connection Error: ', err);
}); 


// Export the database connection

//module.exports = db;

export default mongoose.connection;




