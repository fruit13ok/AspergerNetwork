const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RatingSchema = new Schema({
    rating: { type: Boolean},
    _user: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    _resource: [{
        type: Schema.Types.ObjectId,
        ref: 'Resource'
    }]
})

const Rating = mongoose.model('Rating', RatingSchema);

module.exports = Rating;