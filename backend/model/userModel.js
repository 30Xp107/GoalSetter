const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        requrie: [true, 'Please add a name']
    },
    email: {
        type: String,
        requrie: [true, 'Please add a email'],
        unique: true
    },
    password: {
        type: String,
        requrie: [true, 'Please add a password']
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)