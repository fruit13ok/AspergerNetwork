const mongoose = require('mongoose');

mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/AspergerNetwork",  { useMongoClient: true });

module.exports.User = require('./user.js');
module.exports.Type = require('./type.js');
module.exports.Rating = require('./rating.js');
module.exports.Resource = require('./resource.js');