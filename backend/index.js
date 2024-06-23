import express from "express";
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from "cookie-parser";
import tourRoute from './routes/tours.js';
import userRoute from './routes/users.js';
import authRoute from './routes/auth.js';
import reviewRoute from './routes/reviews.js';
import bookingRoute from './routes/bookings.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
const corsOptions = {
   origin: true,
   credentials: true
};

// Set the strictQuery option
mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/TravelBooking', {
   useNewUrlParser: true,
   useUnifiedTopology: true
})
   .then(() => {
      console.log("MongoDB connection open!");
   })
   .catch(err => {
      console.log("MongoDB connection error:");
      console.error(err);
   });

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/tours", tourRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/review", reviewRoute);
app.use("/api/v1/booking", bookingRoute);

app.listen(port, () => {
   console.log(`Server listening on port ${port}`);
});
