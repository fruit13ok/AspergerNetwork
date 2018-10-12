let db = require('./models');

// remove collections in DB
db.Type.remove( {} , (err,res) => {
    if (err) {console.log('error', err);return;}
    else {console.log('All type removed!',res);}
});
db.User.remove( {} , (err,res) => {
    if (err) {console.log('error', err);return;}
    else {console.log('All user removed!',res);}
});
db.Resource.remove( {} , (err,res) => {
    if (err) {console.log('error', err);return;}
    else {console.log('All resource removed!',res);}
});
db.Rating.remove( {} , (err,res) => {
    if (err) {console.log('error', err);return;}
    else {console.log('All rating removed!',res);}
});