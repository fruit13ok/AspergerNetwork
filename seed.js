var db = require('./models');

var typeList = [
    {name: 'education'},
    {name: 'social event'},
    {name: 'career'},
    {name: 'activity'},
    {name: 'food'},
    {name: 'multiple type'}
]

// remove collections in DB
// db.User.remove( {} , (err,res) => {
//     if (err) {console.log('error', err);return;}
//     else {console.log('All user removed!',res);}
// });
// db.Type.remove( {} , (err,res) => {
//     if (err) {console.log('error', err);return;}
//     else {console.log('All type removed!',res);}
// });
// db.Resource.remove( {} , (err,res) => {
//     if (err) {console.log('error', err);return;}
//     else {console.log('All resource removed!',res);}
// });
// db.Rating.remove( {} , (err,res) => {
//     if (err) {console.log('error', err);return;}
//     else {console.log('All rating removed!',res);}
// });

// 
// db.Type.create(typeList, 
//     (err, createdTypes) => {
//         if (err) {console.log(err);}
//         console.log('createdTypes: ', createdTypes);
//     }
// );

// // 
// db.User.create({
//         email: 'fruit13ok@gmail.com', 
//         password: 'a'
//     }, 
//     (err, createdUser) => {
//         if (err) {console.log(err);}
//         console.log('createdUser: ', createdUser);
//         // 
//         db.Resource.create({
//                 body: 'Just practice talking for 4 hours none stop.', 
//                 location: 'CCSF', 
//                 url: 'www.ccsf.edu/asperger101', 
//                 _type: '5bbfb89aea366007976f4b4a', 
//                 total_rating: 14
//             }, 
//             (err, createdResource) => {
//                 if (err) {console.log(err);}
//                 console.log('createdResource: ', createdResource);
//                 // 
//                 db.Rating.create({
//                         rating: true, 
//                         _user: createdUser._id,
//                         _resource: createdResource._id
//                     }, 
//                     (err, createdRating) => {
//                         if (err) {console.log(err);}
//                         console.log('createdRating: ', createdRating);
//                         process.exit();
//                     }
//                 );
//             }
//         );
//     }
// );
