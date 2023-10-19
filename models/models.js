const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        firstname: { type: String, required: true },
        password: { type: String, required: true },
        address: {
            line: { type: String, required: true },
            zipcode: { type: String, required: true },
            city: { type: String, required: true },
            country: { type: String, required: true }
        },
        role: { type: String, enum: ['admin', 'user'], default: 'user' },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
)

module.exports = {
    User: mongoose.model('User', userSchema)
}