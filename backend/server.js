const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');
const userRouter = require('./routers/user')
const serviceRouter = require('./routers/service')
const itemRouter = require('./routers/laundry')
const complaintRouter = require('./routers/complaint')
const feedbackRouter = require('./routers/feedback')

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

app.use(userRouter)
app.use(serviceRouter)
app.use(itemRouter)
app.use(complaintRouter)
app.use(feedbackRouter)

// app.use(errorHandler);

const PORT = process.env.PORT || 3000

const server = app.listen(
  PORT, 
  console.log(`Server running on port ${PORT}`.yellow.bold)
  );

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server and exit process
  server.close(() => process.exit(1));
});