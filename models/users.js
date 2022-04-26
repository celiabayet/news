const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    token: String,
    language: String,
    wishlist: [{type: mongoose.Schema.Types.ObjectId, ref: 'articles'}]
})

const userModel = mongoose.model('users', userSchema)

module.exports = userModel