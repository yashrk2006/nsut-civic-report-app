import express from 'express';
import HealthRecord from '../models/HealthRecord';

const router = express.Router();

// Create health record
router.post('/', async (req, res) => {
    try {
        const record = new HealthRecord(req.body);
        await record.save();
        res.status(201).json({ message: 'Health record created', record });
    } catch (error: any) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get all records for a user
router.get('/user/:userId', async (req, res) => {
    try {
        const records = await HealthRecord.find({ userId: req.params.userId })
            .sort({ date: -1 });
        res.json(records);
    } catch (error: any) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get vitals history
router.get('/vitals/:userId', async (req, res) => {
    try {
        const records = await HealthRecord.find({
            userId: req.params.userId,
            type: 'vital'
        }).sort({ date: -1 }).limit(30);
        res.json(records);
    } catch (error: any) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Update health record
router.put('/:id', async (req, res) => {
    try {
        const record = await HealthRecord.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json({ message: 'Health record updated', record });
    } catch (error: any) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Delete health record
router.delete('/:id', async (req, res) => {
    try {
        await HealthRecord.findByIdAndDelete(req.params.id);
        res.json({ message: 'Health record deleted' });
    } catch (error: any) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

export default router;
