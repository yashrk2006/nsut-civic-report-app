import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cron from 'node-cron';

// Import routes
import authRoutes from './routes/authRoutes';
import healthRoutes from './routes/healthRoutes';
import appointmentRoutes from './routes/appointmentRoutes';
import medicineRoutes from './routes/medicineRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/healthhub')
    .then(() => console.log('✅ MongoDB connected successfully'))
    .catch((err) => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/health', healthRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/medicines', medicineRoutes);

// Health check endpoint
app.get('/api/status', (req, res) => {
    res.json({
        status: 'running',
        message: 'HealthHub API is operational',
        timestamp: new Date().toISOString()
    });
});

// Medicine reminder cron job (runs every hour)
cron.schedule('0 * * * *', () => {
    console.log('🔔 Checking medicine reminders...');
    // Add reminder logic here
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 HealthHub Backend running on port ${PORT}`);
});

export default app;
