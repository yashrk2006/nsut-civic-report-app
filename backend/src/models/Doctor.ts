import mongoose, { Schema, Document } from 'mongoose';

export interface IDoctor extends Document {
    name: string;
    specialty: string;
    qualification: string;
    experience: number;
    phone: string;
    email: string;
    hospital: string;
    address: string;
    consultationFee: number;
    rating: number;
    availableSlots: {
        day: string;
        times: string[];
    }[];
    createdAt: Date;
    updatedAt: Date;
}

const DoctorSchema: Schema = new Schema({
    name: { type: String, required: true },
    specialty: { type: String, required: true },
    qualification: { type: String, required: true },
    experience: { type: Number, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    hospital: { type: String, required: true },
    address: { type: String, required: true },
    consultationFee: { type: Number, required: true },
    rating: { type: Number, default: 4.5, min: 0, max: 5 },
    availableSlots: [{
        day: String,
        times: [String]
    }]
}, {
    timestamps: true
});

export default mongoose.model<IDoctor>('Doctor', DoctorSchema);
