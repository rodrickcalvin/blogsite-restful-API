var mongoose = require('mongoose');

var blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    body: String
});

module.exports = mongoose.model('blog', blogSchema);