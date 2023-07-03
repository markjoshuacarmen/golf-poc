import mongoose from 'mongoose'
import validator from 'validator'

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide username']
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        validate: {
            validator: validator.isEmail,
            message: 'Please provide valid email'
        },
        unique: [true, 'Email already exists'],
    },
    password: {
        type: String,
        required: [true, 'Please provide password']
    }
})

export default mongoose.model('User', UserSchema);