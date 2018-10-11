// REQUIREMENTS
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));





// ROUTES
// resource page route
app.get("/", (request, response) => {
    // response.send('Hello World');
    response.sendFile(__dirname + '/views/resource.html');
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