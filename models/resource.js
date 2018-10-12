const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResourceSchema = new Schema({
    body: { type: String, required: true},
    location: { type: String},
    url: { type: String},
    _type: {
        type: Schema.Types.ObjectId,
        ref: 'Type'
    },
    _user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    totalRating: Number
})

const Resource = mongoose.model('Resource', ResourceSchema);

module.exports = Resource;