import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import courseRoutes from './routes/courseRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();  // Load environment variables

const app = express();

// Middleware
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/uploads', express.static('uploads'));
app.use('/api/courses', courseRoutes);
app.use('/api/users', userRoutes);
// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
