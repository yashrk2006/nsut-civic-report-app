import mongoose, { Schema, Document } from 'mongoose';

export interface IMedicine extends Document {
    userId: mongoose.Types.ObjectId;
    name: string;
    dosage: string;
    frequency: string;
    timing: string[];
    startDate: Date;
    endDate?: Date;
    purpose: string;
    sideEffects?: string[];
    instructions?: string;
    reminderEnabled: boolean;
    taken: { date: Date; time: string; status: 'taken' | 'missed' | 'skipped' }[];
    createdAt: Date;
    updatedAt: Date;
}

const MedicineSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    dosage: { type: String, required: true },
    frequency: { type: String, required: true },
    timing: [String],
    startDate: { type: Date, required: true },
    endDate: Date,
    purpose: { type: String, required: true },
    sideEffects: [String],
    instructions: String,
    reminderEnabled: { type: Boolean, default: true },
    taken: [{
        date: Date,
        time: String,
        status: { type: String, enum: ['taken', 'missed', 'skipped'] }
    }]
}, {
    timestamps: true
});

export default mongoose.model<IMedicine>('Medicine', MedicineSchema);
