import express from 'express';
import Appointment from '../models/Appointment';
import Doctor from '../models/Doctor';

const router = express.Router();

// Create appointment
router.post('/', async (req, res) => {
    try {
        const appointment = new Appointment(req.body);
        await appointment.save();
        res.status(201).json({ message: 'Appointment scheduled', appointment });
    } catch (error: any) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get user appointments
router.get('/user/:userId', async (req, res) => {
    try {
        const appointments = await Appointment.find({ userId: req.params.userId })
            .populate('doctorId')
            .sort({ date: -1 });
        res.json(appointments);
    } catch (error: any) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get all doctors
router.get('/doctors', async (req, res) => {
    try {
        const doctors = await Doctor.find().sort({ rating: -1 });
        res.json(doctors);
    } catch (error: any) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Search doctors by specialty
router.get('/doctors/specialty/:specialty', async (req, res) => {
    try {
        const doctors = await Doctor.find({
            specialty: new RegExp(req.params.specialty, 'i')
        }).sort({ rating: -1 });
        res.json(doctors);
    } catch (error: any) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Update appointment status
router.put('/:id', async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json({ message: 'Appointment updated', appointment });
    } catch (error: any) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Cancel appointment
router.delete('/:id', async (req, res) => {
    try {
        await Appointment.findByIdAndUpdate(
            req.params.id,
            { status: 'cancelled' }
        );
        res.json({ message: 'Appointment cancelled' });
    } catch (error: any) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

export default router;
