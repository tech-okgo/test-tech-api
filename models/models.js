const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        email: { type: String },
        name: { type: String },
        firstname: { type: String },
        password: { type: String },
        address: {
            line: { type: String },
            zipcode: { type: String },
            city: { type: String },
            country: { type: String }
        }
    },
    { timestamps: true }
)

module.exports = {
    User: mongoose.model('User', userSchema)
}