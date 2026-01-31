import mongoose, { Schema, Document } from 'mongoose';

export interface IAppointment extends Document {
    userId: mongoose.Types.ObjectId;
    doctorId: mongoose.Types.ObjectId;
    date: Date;
    time: string;
    type: 'consultation' | 'checkup' | 'followup' | 'emergency';
    status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
    reason: string;
    notes?: string;
    prescription?: string;
    createdAt: Date;
    updatedAt: Date;
}

const AppointmentSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    doctorId: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    type: {
        type: String,
        enum: ['consultation', 'checkup', 'followup', 'emergency'],
        default: 'consultation'
    },
    status: {
        type: String,
        enum: ['scheduled', 'confirmed', 'completed', 'cancelled'],
        default: 'scheduled'
    },
    reason: { type: String, required: true },
    notes: String,
    prescription: String
}, {
    timestamps: true
});

export default mongoose.model<IAppointment>('Appointment', AppointmentSchema);
