import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    phone: string;
    dateOfBirth: Date;
    gender: 'male' | 'female' | 'other';
    bloodGroup?: string;
    address?: string;
    emergencyContact?: {
        name: string;
        phone: string;
        relation: string;
    };
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, enum: ['male', 'female', 'other'], required: true },
    bloodGroup: { type: String },
    address: { type: String },
    emergencyContact: {
        name: String,
        phone: String,
        relation: String
    }
}, {
    timestamps: true
});

export default mongoose.model<IUser>('User', UserSchema);
