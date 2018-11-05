let mongoose = require('mongoose');

let BookSchema = new mongoose.Schema({
        name: String,
        author: String,
        publisher: String,
        category: String,
        likes: {type: Number, default: 0}
    },
    { collection: 'booksdb' });

module.exports = mongoose.model('Book', BookSchema);