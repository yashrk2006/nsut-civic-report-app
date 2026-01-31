import express from 'express';
import Medicine from '../models/Medicine';

const router = express.Router();

// Add medicine
router.post('/', async (req, res) => {
    try {
        const medicine = new Medicine(req.body);
        await medicine.save();
        res.status(201).json({ message: 'Medicine added', medicine });
    } catch (error: any) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get user medicines
router.get('/user/:userId', async (req, res) => {
    try {
        const medicines = await Medicine.find({ userId: req.params.userId })
            .sort({ startDate: -1 });
        res.json(medicines);
    } catch (error: any) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get active medicines
router.get('/active/:userId', async (req, res) => {
    try {
        const today = new Date();
        const medicines = await Medicine.find({
            userId: req.params.userId,
            startDate: { $lte: today },
            $or: [
                { endDate: { $gte: today } },
                { endDate: null }
            ]
        });
        res.json(medicines);
    } catch (error: any) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Mark medicine as taken
router.post('/:id/taken', async (req, res) => {
    try {
        const { date, time, status } = req.body;
        const medicine = await Medicine.findByIdAndUpdate(
            req.params.id,
            {
                $push: {
                    taken: { date, time, status }
                }
            },
            { new: true }
        );
        res.json({ message: 'Status updated', medicine });
    } catch (error: any) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Update medicine
router.put('/:id', async (req, res) => {
    try {
        const medicine = await Medicine.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json({ message: 'Medicine updated', medicine });
    } catch (error: any) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Delete medicine
router.delete('/:id', async (req, res) => {
    try {
        await Medicine.findByIdAndDelete(req.params.id);
        res.json({ message: 'Medicine deleted' });
    } catch (error: any) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

export default router;
