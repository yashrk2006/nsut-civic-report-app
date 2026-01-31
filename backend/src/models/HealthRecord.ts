import mongoose, { Schema, Document } from 'mongoose';

export interface IHealthRecord extends Document {
    userId: mongoose.Types.ObjectId;
    type: 'vital' | 'symptom' | 'diagnosis' | 'test' | 'general';
    date: Date;
    vitals?: {
        bloodPressure?: { systolic: number; diastolic: number };
        heartRate?: number;
        temperature?: number;
        weight?: number;
        height?: number;
        glucose?: number;
        oxygen?: number;
    };
    symptoms?: string[];
    diagnosis?: string;
    notes?: string;
    attachments?: string[];
    doctorId?: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const HealthRecordSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: {
        type: String,
        enum: ['vital', 'symptom', 'diagnosis', 'test', 'general'],
        required: true
    },
    date: { type: Date, default: Date.now },
    vitals: {
        bloodPressure: {
            systolic: Number,
            diastolic: Number
        },
        heartRate: Number,
        temperature: Number,
        weight: Number,
        height: Number,
        glucose: Number,
        oxygen: Number
    },
    symptoms: [String],
    diagnosis: String,
    notes: String,
    attachments: [String],
    doctorId: { type: Schema.Types.ObjectId, ref: 'Doctor' }
}, {
    timestamps: true
});

export default mongoose.model<IHealthRecord>('HealthRecord', HealthRecordSchema);
