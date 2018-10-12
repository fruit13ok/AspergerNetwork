let db = require('./models');

let typeList = [
    {name: 'education'},
    {name: 'social event'},
    {name: 'career'},
    {name: 'activity'},
    {name: 'food'},
    {name: 'multiple type'}
]

// db.Type.create(typeList, 
//     (err, createdTypes) => {
//         if (err) {console.log(err);}
//         console.log('createdTypes: ', createdTypes);
//         // 
//         db.User.create({
//                 email: 'yi@gmail.com', 
//                 password: 'a'
//             }, 
//             (err, createdUser) => {
//                 if (err) {console.log(err);}
//                 console.log('createdUser: ', createdUser);
//                 // 
//                 db.Resource.create({
//                         body: 'Just practice talking for 4 hours none stop.', 
//                         location: 'CCSF', 
//                         url: 'www.ccsf.edu/asperger101', 
//                         _type: createdTypes[0]._id, 
//                         _user: createdUser._id,
//                         totalRating: 0
//                     }, 
//                     (err, createdResource) => {
//                         if (err) {console.log(err);}
//                         console.log('createdResource: ', createdResource);
//                         // 
//                         db.Rating.create({
//                                 rating: true, 
//                                 _user: createdUser._id,
//                                 _resource: createdResource._id
//                             }, 
//                             (err, createdRating) => {
//                                 if (err) {console.log(err);}
//                                 console.log('createdRating: ', createdRating);
//                             }
//                         );
//                     }
//                 );
//             }
//         );
//         //
//         db.User.create({
//                 email: 'gino@gmail.com', 
//                 password: 'a'
//             }, 
//             (err, createdUser) => {
//                 if (err) {console.log(err);}
//                 console.log('createdUser: ', createdUser);
//                 // 
//                 db.Resource.create({
//                         body: 'Full stack web developer with asperger job fair.', 
//                         location: 'moscone center', 
//                         url: 'www.moscone.com/aspergerdevjob', 
//                         _type: createdTypes[1]._id, 
//                         _user: createdUser._id,
//                         totalRating: 0
//                     }, 
//                     (err, createdResource) => {
//                         if (err) {console.log(err);}
//                         console.log('createdResource: ', createdResource);
//                         // 
//                         db.Rating.create({
//                                 rating: false, 
//                                 _user: createdUser._id,
//                                 _resource: createdResource._id
//                             }, 
//                             (err, createdRating) => {
//                                 if (err) {console.log(err);}
//                                 console.log('createdRating: ', createdRating);
//                                 process.exit();
//                             }
//                         );
//                     }
//                 );
//             }
//         );
//         //
//         db.User.create({
//                 email: 'luke@gmail.com', 
//                 password: 'a'
//             }, 
//             (err, createdUser) => {
//                 if (err) {console.log(err);}
//                 console.log('createdUser: ', createdUser);
//             }
//         );
//         //
//         db.User.create({
//                 email: 'francisco@gmail.com', 
//                 password: 'a'
//             }, 
//             (err, createdUser) => {
//                 if (err) {console.log(err);}
//                 console.log('createdUser: ', createdUser);
//             }
//         );
//         //
//         db.User.create({
//                 email: 'raj@gmail.com', 
//                 password: 'a'
//             }, 
//             (err, createdUser) => {
//                 if (err) {console.log(err);}
//                 console.log('createdUser: ', createdUser);
//             }
//         );
//     }
// );

/////////////////////////////////////////////////////////////////////////////

// db.Rating.create({
//         rating: true, 
//         _user: '5bc00727e2a3f91b14d2b031',
//         _resource: '5bc00727e2a3f91b14d2b034'
//     }, 
//     (err, createdRating) => {
//         if (err) {console.log(err);}
//         console.log('createdRating: ', createdRating);
//     }
// );
// db.Rating.create({
//         rating: true, 
//         _user: '5bc00727e2a3f91b14d2b032',
//         _resource: '5bc00727e2a3f91b14d2b034'
//     }, 
//     (err, createdRating) => {
//         if (err) {console.log(err);}
//         console.log('createdRating: ', createdRating);
//     }
// );
// db.Rating.create({
//         rating: true, 
//         _user: '5bc00727e2a3f91b14d2b033',
//         _resource: '5bc00727e2a3f91b14d2b034'
//     }, 
//     (err, createdRating) => {
//         if (err) {console.log(err);}
//         console.log('createdRating: ', createdRating);
//     }
// );


//////////////////////////////////////////////////////////////////////////////////////////

db.Resource.find({})
.populate('_type')
.populate('_user')
.sort({ totalRating: -1 })
.exec(
    (err, foundResources) => {
        if (err) {console.log(err);}
        let arr = [];
        foundResources.forEach(resource => {
            let reso_id = resource._id;
            let _user = resource._user.email;
            let _type = resource._type.name;
            let body = resource.body;
            let location = resource.location;
            let url = resource.url;
            let totalRating = resource.totalRating;
            arr.push({totalRating:totalRating, reso_id:reso_id, _user:_user, _type:_type ,body:body, location:location, url:url});
        })
        console.log(arr);
        process.exit();
    }
);

// let totalRatingOut = 
// db.Rating.find({_resource: '5bc00727e2a3f91b14d2b034'})
// .populate('_user')
// .populate('_resource')
// .exec(
//     (err, foundRatings) => {
//         if (err) {console.log(err);}
//         let totalRatingIn = 0;
//         foundRatings.forEach(rating => {
//             if(rating.rating === true){
//                 console.log('true');
//                 totalRatingIn+=1;   
//             }else{
//                 console.log('false');
//                 totalRatingIn-=1;
//             }
//         })
//         console.log(totalRatingIn);
//         process.exit();
//         return totalRatingIn;
//     }
// );
// console.log(totalRatingOut);