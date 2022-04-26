var mongoose = require('mongoose')

const articleSchema = mongoose.Schema({
    img: String,
    title: String,
    description: String,
    language: String,
})

const articleModel = mongoose.model('articles', articleSchema)

module.exports = articleModel;

