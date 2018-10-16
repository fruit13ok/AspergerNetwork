let db = require('./models');

let typeList = [
    {name: 'education'},
    {name: 'social event'},
    {name: 'career'},
    {name: 'activity'},
    {name: 'food'},
    {name: 'multiple type'}
]
db.Type.create(typeList, 
    (err, createdTypes) => {
        if (err) {console.log(err);}
        console.log('createdTypes: ', createdTypes);
    }
);

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

// db.Resource.find({})
// .populate('_type')
// .populate('_user')
// .sort({ totalRating: -1 })
// .exec(
//     (err, foundResources) => {
//         if (err) {console.log(err);}
//         let arr = [];
//         foundResources.forEach(resource => {
//             let reso_id = resource._id;
//             let _user = resource._user.email;
//             let _type = resource._type.name;
//             let body = resource.body;
//             let location = resource.location;
//             let url = resource.url;
//             let totalRating = resource.totalRating;
//             arr.push({totalRating:totalRating, reso_id:reso_id, _user:_user, _type:_type ,body:body, location:location, url:url});
//         })
//         console.log(arr);
//         process.exit();
//     }
// );

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

/////////////////////////////////// other seed data /////////////////////////////////////

// Full stack web developer with asperger job fair.
// career
// moscone center
// www.moscone.com/aspergerdevjob


// Just practice talking for 4 hours none stop.
// education
// CCSF
// www.ccsf.edu/asperger101


// 5 miles dog walk.
// social event
// Ferry Building to Golden Gate bridge
// www.facebook.com/5mdogwalk


// Autism Society San Francisco Bay Area (SFASA) is a grassroots, volunteer-run nonprofit organization of parents, family members, friends and professionals striving to build a stronger, more connected and influential Bay Area autism community. We began in 1967 and cover the six major San Francisco Bay Area counties: Alameda, Contra Costa, Marin, San Francisco, San Mateo and Santa Clara. We are an affiliate of the Autism Society of America.
// multiple type
// Autism Society San Francisco Bay Area PO Box 249 San Mateo, CA 94401
// https://www.sfautismsociety.org/for-higher-functioning-adults.html


// The adult Asperger self-help revolution is on! We meet to share experiences, support each other, find resources, interact in a safe environment, network with fellow Aspies, and take responsibility for our growth. One aim of this group is to connect people who are in the early stages of their AS realization journeys with those who have known they had AS for much of their lives. We have a lot to learn from each other about how to thrive in wider society as well as how to live in less conventional ways that are attuned to our uniqueness.
// social event
// San Francisco
// https://www.meetup.com/asperger/


// disABLEDperson, Inc. is a 501(c)(3) charitable organization whose mission is to reduce the high unemployment rate of individuals and veterans with disabilities.
// career
// disABLEDperson, Inc. PO Box 230636 Encinitas, Ca. 92023-0636
// https://www.disabledperson.com/our-mission


// Choosing the Right Job for People with Autism or Asperger's Syndrome
// education
// n/a
// https://www.iidc.indiana.edu/pages/Choosing-the-Right-Job-for-People-with-Autism-or-Aspergers-Syndrome


// Asperger’s syndrome is one of the autism spectrum disorders. Affected individuals display considerably impaired capacity for social interaction, unusual special interests, and a tendency towards ritualized behavior.
// education
// n/a
// https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2695286/


// alan@gmail.com
// andrea@gmail.com
// dalton@gmail.com
// francisco@gmail.com
// gino@gmail.com
// justin@gmail.com
// luke@gmail.com
// natalie@gmail.com
// raj@gmail.com
// sofia@gmail.com
// waika@gmail.com
// yi@gmail.com