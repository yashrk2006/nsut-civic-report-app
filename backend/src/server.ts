import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory store for demo purposes (resets on server restart)
const mockReports: any[] = [
    {
        id: 'DEMO-123',
        category: 'waste',
        status: 'pending',
        location: { latitude: 28.6139, longitude: 77.2090 },
        timestamp: new Date().toISOString()
    }
];

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'Delhi Civic Assistant API is running 🚀 (Mock Mode)' });
});

app.get('/api/test', (req, res) => {
    res.json({
        status: 'success',
        message: 'Backend is connected!',
        timestamp: new Date().toISOString()
    });
});

// Mock Report Submission
app.post('/api/reports', (req, res) => {
    const report = {
        id: `R-${Math.floor(Math.random() * 10000)}`,
        ...req.body,
        status: 'pending',
        timestamp: new Date().toISOString()
    };
    mockReports.push(report);
    console.log('New Report Received:', report);

    // Simulate processing delay
    setTimeout(() => {
        res.status(201).json({
            success: true,
            message: 'Report submitted successfully',
            report
        });
    }, 1000);
});

// Get Reports
app.get('/api/reports', (req, res) => {
    res.json({ success: true, count: mockReports.length, reports: mockReports });
});

// Start Server (Only if not in Vercel environment)
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

export default app;
