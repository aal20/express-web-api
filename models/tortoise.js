var mongoose = require('mongoose');

var tortoiseSchema = mongoose.Schema({
    name: String,
    age: Number,
    type: String
});

module.exports = mongoose.model('Tortoise', tortoiseSchema);