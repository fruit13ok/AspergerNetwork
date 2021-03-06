// REQUIREMENTS
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// jwt is secure way to store and transmit encrupted authentication data
const jwt = require('jsonwebtoken');
// bcrypt is use for encryption and decryption
const bcrypt = require('bcrypt');

const SECRETKEY = "waffles";

// MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

/************
 * DATABASE *
 ************/
// require models folder will import everythings from index.js which index.js centralize other models
const db = require('./models');

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>
// Verify Token
verifyToken = (req, res, next) => {
    console.log("in verify...");
    // Get auth header value
    // when we send our token, we want to send it in our header
    const bearerHeader = req.headers['authorization'];
    console.log(bearerHeader)
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined'){
      const bearer = bearerHeader.split(' ');
      // Get token from array
      const bearerToken = bearer[1];
      // Set the token
      req.token = bearerToken;
      // Next middleware
      next();
    } else {
      // Forbidden
      res.sendStatus(403);
    }
  }

// ROUTES
// resource page route
app.get("/", (req, res) => {
    // res.send('Hello World');
    res.sendFile(__dirname + '/views/resource.html');
});

// let totalRating = 0;
// setTotalRating = (rating) => {
//     totalRating = rating;
// }

// query all resources content route
app.get("/resource", (req, res) => {
    db.Resource.find({})
        .populate('_type')
        .populate('_user')
        .sort({ totalRating: -1 })
        .exec(
            (err, foundResources) => {
                if (err) { console.log(err); }
                // res.json(foundResources);
                let arr = [];
                foundResources.forEach(resource => {
                    console.log(resource);
                    
                    let reso_id = resource._id;
                    // let _user = resource._user.email;
                    let _user = resource._user;
                    let _type = resource._type.name;
                    let body = resource.body;
                    let location = resource.location;
                    let url = resource.url;
                    let totalRating = resource.totalRating;
                    arr.push({ totalRating: totalRating, reso_id: reso_id, _user: _user, _type: _type, body: body, location: location, url: url });
                })
                res.json(arr);
            }
        );
});

// signup user route
app.post("/signup", (req, res) => {
    // let email = req.body['email-signup'];
    // let password = req.body['password-signup'];
    // console.log(`signed up email: ${email}, password: ${password}`);
    // res.json({email: email, password: password});

    // check user exists in DB
    db.User.find({ email: req.body['email-signup'] })
        .exec()
        .then(user => {
            // if a user is found with that email
            if (user.length >= 1) {
                // send an error and let the user know that the email already exists
                return res.status(409).json({
                    message: "email already exists"
                })

                // we don't have this user's email in our db, lets get them set up!
            } else {
                // lets hash our plaintext password
                bcrypt.hash(req.body['password-signup'], 10, (err, hash) => {
                    if (err) {
                        console.log("hashing error:", err);

                        res.status(200).json({ error: err })
                        // we now have a successful hashed password
                    } else {
                        // we are creating a User object with their email address and OUR hashed password

                        // both version work

                        // db.User.create({
                        //     email: req.body['email-signup'],
                        //     password: hash
                        // }, (err, createdUser) => {
                        //     console.log('createdUser: ',createdUser)
                        //     // we send our new data back to user or whatever you want to do.
                        //     // payload need to be the same
                        //     console.log(createdUser._id)
                        //     let token = jwt.sign(
                        //         {
                        //             email: createdUser.email,
                        //             _id: createdUser._id
                        //         },
                        //         SECRETKEY)
                        //     let decoded = jwt.verify(token, SECRETKEY);
                        //     console.log("DECODED JWT: ", decoded )
                        //         res.status(200).json({
                        //             message: 'User Created',
                        //             createdUser: createdUser,
                        //             signedJwt: token
                        //         })
                        //     // send success back to user, along with a token.
                        // })

                        // { password: 0 } will make createdUser into array
                        db.User.create({
                            email: req.body['email-signup'],
                            password: hash
                        }, { password: 0 }, (err, createdUser) => {
                            console.log('createdUser: ',createdUser)
                            // we send our new data back to user or whatever you want to do.
                            createdUser = createdUser[0]
                            // payload need to be the same
                            jwt.sign(
                                { _id: createdUser._id,
                                  email: createdUser.email},
                                SECRETKEY,
                                (err, signedJwt) => {
                                    res.status(200).json({
                                        message: 'User Created',
                                        createdUser: createdUser,
                                        signedJwt: signedJwt
                                    })
                                });
                            // send success back to user, along with a token.
                        })

                    }
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ err })
        })
});

// login user route
app.post("/login", (req, res) => {
    // let email = req.body['email-login'];
    // let password = req.body['password-login'];
    // console.log(`logged in email: ${email}, password: ${password}`);
    // res.json({email: email, password: password});
    // find the user in our user db
    console.log("LOGIN CALLED", req.body)
    db.User.find({ email: req.body['email-login'] })
        .select('+password')
        .exec()
        // if we have found a user
        .then(foundUsers => {
            // if there is not email in our db
            console.log("foundUsers: ", foundUsers);
            if (foundUsers.length < 1) {
                return res.status(401).json({
                    message: "Email/Password incorrect"
                })
            }
            // we have an email in our db that matches what they gave us
            // now we have to compare their hashed password to what we have in our db
            console.log("body", req.body);
            console.log("hash", foundUsers[0].password);
            bcrypt.compare(req.body['password-login'], foundUsers[0].password, (err, match) => {
                console.log(match)
                // If the compare function breaks, let them know
                if (err) {
                    console.log('error bcrypt: ',err); 
                    return res.status(500).json({ err });
                }
                // If match is true (their password matches our db password)
                if (match) {
                    console.log("MATCH: ", match)
                    // create a json web token
                    const token = jwt.sign(
                        {
                            // add some identifying information
                            email: foundUsers[0].email,
                            _id: foundUsers[0]._id
                        },
                        // add our super secret key (which should be hidden, not plaintext like this)
                        SECRETKEY,
                        // these are options, not necessary
                        {
                            // its good practice to have an expiration amount for jwt tokens.
                            expiresIn: "1h"
                        },
                    );
                    console.log("NEW TOKEN: ", token)
                    // send success back to user, along with a token.
                    return res.status(200).json(
                        {
                            message: 'Auth successful',
                            token: token
                        }
                    )
                    // the password provided does not match the password on file.
                } else {
                    console.log("NOT A MATCH")
                    res.status(401).json({ message: "Email/Password incorrect" })
                }
            })
        })
        .catch(err => {
            console.log("OUTSIDE ERROR_")
            console.log(err);
            res.status(500).json({ err })
        })
});

// post resource route
app.post("/postResource", verifyToken, (req, res) => {
    let verified= jwt.verify(req.token, SECRETKEY)
    console.log('verified user id: ',verified._id);
    db.Type.findOne({name: req.body['resource-type']})
    .populate('_type')
    .populate('_user')
    .exec(
        (err, foundType) => {
            if (err) {console.log(err);}
            console.log('foundType: ',foundType._id);
            db.Resource.create({
                body: req.body['resource-body'],
                location: req.body['resource-location'],
                url: req.body['resource-url'],
                _type: foundType._id,
                _user: verified._id,
                totalRating: 0
            },
            (err, createdResource) => {
                if (err) {console.log(err);}
                console.log('createdResource: ', createdResource);
                res.json(createdResource);
            });
        }
    );
});

// delete resource route
// it work, only owner can delete resource
// ask why my deleteOne filter not triger error message, how to make better frontend feed back message

// /resource/:id/delete
app.post("/deleteResource", verifyToken, (req, res) => {
    let verified= jwt.verify(req.token, SECRETKEY)
    db.Resource.deleteOne(
        { _id: req.body.dataId, _user: verified._id},
        (err, deletedResource) => {
            if (err) { return res.status(400).json({ err: "error has occured" }) }
            console.log('deletedResource', deletedResource);
            res.json(deletedResource);
        }
    );
});

// update resource route
app.post("/updateResource", verifyToken, (req, res) => {
    let verified= jwt.verify(req.token, SECRETKEY)
    db.User.findById(verified._id)
    .exec(
        (err, foundUser) => {
            if (err) {console.log(err);}
            console.log('myUser: ',foundUser);
            db.Type.findOne({name: req.body['update-resource-type']})
            .exec(
                (err, foundType) => {
                    if (err) {console.log(err);}
                    console.log('mytype: ',foundType);
                    db.Resource.findOneAndUpdate(
                        { _id: req.body['resource-id'], _user: verified._id}, // search condition
                        {
                            body: req.body['update-resource-body'],
                            location: req.body['update-resource-location'],
                            url: req.body['update-resource-url'],
                            _type: foundType._id,
                            _user: foundUser._id
                        }, // new content you want to update
                        {new:true}, // you want to receive the new object
                        (err, updatedResource) => { // callback
                        if(err) { return console.log(err) }
                        res.json(updatedResource);
                    });
                }
            );
        }
    );
});

// check for login
app.post('/verify', verifyToken, (req, res) => {
    let verified= jwt.verify(req.token, SECRETKEY);
    console.log("verified: ", verified);
    res.json(verified);
  })

// rating thumbs up route
app.post("/ratingUp", verifyToken, (req, res) => {
    let verified= jwt.verify(req.token, SECRETKEY);
    db.Rating.find({_user: verified._id, _resource: req.body.dataId})
    .exec(
        (err, foundRating) => {
            if (err) {console.log(err);}
            console.log('foundRating: ', foundRating);
            console.log(verified._id, req.body.dataId);
            // if foundRating empty array
            // then create new rating with up / down
            // update resouce totalrating, by find and update, and save
            // else message already rated
            if (foundRating.length === 0){
                db.Rating.create( {
                    rating: true,
                    _user: verified._id,
                    _resource: req.body.dataId
                }, (err, newRating) => {
                    if(err) { return console.log(err) }
                    console.log("saved new rating: ", newRating);
                    db.Resource.findOneAndUpdate(
                        { _id: req.body.dataId }, // search condition
                        { $inc: { totalRating: 1 } }, // new content you want to update
                        {new:true}, // you want to receive the new object
                        (err, updatedResource) => { // callback
                        if(err) { return console.log(err) }
                        console.log('updatedResource: ',updatedResource);
                        res.json(updatedResource);
                    });
                });
            }else{
                res.status(409).json("You already rated this resource");
            }
        }
    );
});

// rating thumbs down route
app.post("/ratingDown", verifyToken, (req, res) => {
    let verified= jwt.verify(req.token, SECRETKEY);
    db.Rating.find({_user: verified._id, _resource: req.body.dataId})
    .exec(
        (err, foundRating) => {
            if (err) {console.log(err);}
            console.log('foundRating: ', foundRating);
            console.log(verified._id, req.body.dataId);
            // if foundRating empty array
            // then create new rating with up / down
            // update resouce totalrating, by find and update, and save
            // else message already rated
            if (foundRating.length === 0){
                db.Rating.create( {
                    rating: true,
                    _user: verified._id,
                    _resource: req.body.dataId
                }, (err, newRating) => {
                    if(err) { return console.log(err) }
                    console.log("saved new rating: ", newRating);
                    db.Resource.findOneAndUpdate(
                        { _id: req.body.dataId }, // search condition
                        { $inc: { totalRating: -1 } }, // new content you want to update
                        {new:true}, // you want to receive the new object
                        (err, updatedResource) => { // callback
                        if(err) { return console.log(err) }
                        console.log('updatedResource: ',updatedResource);
                        res.json(updatedResource);
                    });
                });
            }else{
                res.status(409).json("You already rated this resource");
            }
        }
    );
});

// query match resources content route
app.post("/findResource", (req, res) => {
    // db.Resource.find({body: /5/i})
    db.Resource.find({body: new RegExp('.*'+req.body.searchKey+'.*', "i")})
    .populate('_type')
    .populate('_user')
    .sort({ totalRating: -1 })
    .exec(
        (err, foundResources) => {
            if (err) { console.log(err); }
            let arr = [];
            foundResources.forEach(resource => {
                console.log(resource);
                let reso_id = resource._id;
                let _user = resource._user;
                let _type = resource._type.name;
                let body = resource.body;
                let location = resource.location;
                let url = resource.url;
                let totalRating = resource.totalRating;
                arr.push({ totalRating: totalRating, reso_id: reso_id, _user: _user, _type: _type, body: body, location: location, url: url });
            })
            res.json(arr);
        }
    );
});

// SERVER START
app.listen(process.env.PORT || 3000, () => {
    console.log("HTTP server listening at localhost:3000");
});