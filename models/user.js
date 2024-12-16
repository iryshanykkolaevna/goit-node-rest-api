import { Schema, model } from 'mongoose';

const user = new Schema({
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    avatarURL: {
        type: String,
        default: null,
    },
    token: {
        type: String,
        default: null,
    },
},{
    versionKey: false
});

export const User = model('users', user);