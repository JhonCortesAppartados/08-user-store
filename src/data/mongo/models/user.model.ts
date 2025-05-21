import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Name is required'],
        unique: true,
    },
    emailvalidated: {
        type: Boolean,
        default: false,
    },
    password: {
        type: String,
        required: [true, 'Name is required']
    },
    img: {
        type: String,
    },
    role:{
        type: [String],
        default: ['USER_ROLE'],
        enum: ['USER_ROLE', 'ADMIN_ROLE'],
    }
});

export const UserModel = mongoose.model('User', userSchema);