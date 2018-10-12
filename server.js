// REQUIREMENTS
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));


/************
 * DATABASE *
 ************/
// require models folder will import everythings from index.js which index.js centralize other models
const db = require('./models');


// ROUTES
// resource page route
app.get("/", (request, response) => {
    // response.send('Hello World');
    response.sendFile(__dirname + '/views/resource.html');
});

let totalRating = 0;
setTotalRating = (rating) => {
    totalRating = rating;
}
// query all resources content route
app.get("/resource", (request, response) => {
    db.Resource.find({})
    .populate('_type')
    .populate('_user')
    .sort({ totalRating: -1 })
    .exec(
        (err, foundResources) => {
            if (err) {console.log(err);}
            // response.json(foundResources);
            let arr = [];
            foundResources.forEach(resource => {
                let reso_id = resource._id;
                let _user = resource._user.email;
                let _type = resource._type.name;
                let body = resource.body;
                let location = resource.location;
                let url = resource.url;
                let totalRating = resource.totalRating;
                // db.Rating.find({_resource: reso_id})
                // .populate('_user')
                // .populate('_resource')
                // .exec(
                //     (err, foundRatings) => {
                //         if (err) {console.log(err);}
                //         var curRating = 0;
                //         foundRatings.forEach(rating => {
                //             if(rating.rating === true){
                //                 console.log('true');
                //                 curRating+=1;
                //             }else{
                //                 console.log('false');
                //                 curRating-=1;
                //             }
                //         })
                //         console.log(curRating);
                //         setTotalRating(curRating);
                //     }
                // );
                arr.push({totalRating:totalRating, reso_id:reso_id, _user:_user, _type:_type ,body:body, location:location, url:url});
            })
            response.json(arr);
        }
    );
});

// signup user route
app.post("/signup", (request, response) => {
    let email = request.body['email-signup'];
    let password = request.body['password-signup'];
    console.log(`signed up email: ${email}, password: ${password}`);
    response.json({email: email, password: password});
});

// login user route
app.post("/login", (request, response) => {
    let email = request.body['email-login'];
    let password = request.body['password-login'];
    console.log(`logged in email: ${email}, password: ${password}`);
    response.json({email: email, password: password});
});

// update user route
app.post("/userUpdate", (request, response) => {
    let email = request.body['email-update'];
    let password = request.body['password-update'];
    console.log(`updated user email: ${email}, password: ${password}`);
    response.json({email: email, password: password});
});

// post resource route
app.post("/postResource", (request, response) => {
    let type = request.body['resource-type'];
    let body = request.body['resource-body'];
    let location = request.body['resource-location'];
    let url = request.body['resource-url'];
    console.log(`posted resource type: ${type}, body: ${body}, location: ${location}, url: ${url}`);
    response.json({type: type, body: body, location: location, url: url});
});


// SERVER START
app.listen(3000, () => {
    console.log("HTTP server listening at localhost:3000");
});