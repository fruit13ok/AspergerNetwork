# AspergerNetwork
##### by Yi Liu
Build an social network app for people with Asperger (Aspie).

## Presentation

### Motivation to build this project.
- Asperger and their love one can find and share resources on this website.
- People with asperger has impaired social interaction.
- There are gap between normal people and people with asperger, so as normal social network.
- AspergerNetwork can prove an asperger friendly place to share resource such as understand more about asperger, where to find local service, asperger group, local events

### Demo of your project's core functionality.

### Code snippet.
Learn more about Mongodb/Mongoose improve the site.
When doing rating, it reference both user and resource, so I can find rating with user id and resource id.
Mongoose has property $inc to increase value.
Mongoose can use RegExp to find data.
```
db.Rating.find({_user: verified._id, _resource: req.body.dataId})
.exec(
    (err, foundRating) => {
        if (err) {console.log(err);}
        if (foundRating.length === 0){
            db.Rating.create( {
                rating: true,
                _user: verified._id,
                _resource: req.body.dataId
            }, (err, newRating) => {
                if(err) { return console.log(err) }
                db.Resource.findOneAndUpdate(
                    { _id: req.body.dataId }, // search condition
                    { $inc: { totalRating: -1 } }, // new content you want to update
                    {new:true}, // you want to receive the new object
                    (err, updatedResource) => { // callback
                    if(err) { return console.log(err) }
                    res.json(updatedResource);
                });
            });
        }else{
            res.status(409).json("You already rated this resource");
        }
    }
);
db.Resource.find({body: new RegExp('.*'+req.body.searchKey+'.*', "i")})
.populate('_type')
.populate('_user')
.sort({ totalRating: -1 })
.exec(
    (err, foundResources) => {
        if (err) { console.log(err); }
        let arr = [];
        foundResources.forEach(resource => {
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
```

### Shout-outs for your fellow classmates (WDI47)!
This final project only have a week, seeing and asking other classmates project to get idea and how do certian thing is important. Teacher and TA are always there helping. It does look like a work envirnment. Thank you all.
- Justin (teacher)
- Dalton (TA)
- Alan
- Andrea
- Francisco
- Gino
- Luke
- Natalie
- Raj
- Sofia
- Waika
- Yi

## Technologies Used
- __Express__ routes.
- __AJAX__ make request.
- __jQuery__ change frontend.
- __MongoDB mLab__ sotre data.
- __Git Github__ version control.
- __CSS__ styple.
- __Bootstrap__ navbar, modal.
- __Heroku__ host the site. [Heroku link](https://powerful-escarpment-97107.herokuapp.com/).

## Existing Features
- single page, use modal to get user input
- Signup.
- Login.
![login landing page](/public/images/signupLogin.png)
- Logout.
- Verify jsonwebtoken (secret key is hidden in dotenv environment).
- Authentication.
- bcrypt password.
- Use token store in browser header to check current user or no user.
- Full CRUD on resources: show all when page load, show some on search, logged in user can create, update, and delete therir own.
![fetch stock data display log](/public/images/postLogout.png)
- Form vaildation.
- Responsive dynamic web page.

## Planned Features
- Lack of asperger resource, find api, such as meetup api, google api, donation api, etc ...
- Add image and other media.
- Upgrade to use React.

## Work flows
0)
planing, https://docs.google.com/document/d/1FC-5kbA2ChUUb7J6VsRa8AhoqXEUNegl9qEVm6Cn0O0/edit?usp=sharing
trello (ERD, suer story, wireframe, research), https://trello.com/b/ZmbRJn6L/aspergernetwork
wireframe, https://docs.google.com/drawings/d/1CeF7tJ7yBKo9SupFYX0f3L9XDM6quFUkV9Fc_5jlwsk/edit?usp=sharing

1)
Created single basic static frontend resource page with navbar luanch modal forms, and main content area. modal forms are for signup, login, update user, post resource. main content area is for list of resource and click rating buttons.

2)
npm init, entry point server.js.
npm install express body-parser mongoose jsonwebtoken bcrypt --save
create server.jsfile, add starter code.
root route.
create public folder, change html file css and js file path.
create public/images, public/scripts, public/styles folder.
rename main.js to app.js, put into public/scripts.
put main.css, normalize.css into public/styles.
create views folder.
put resource.html into views.
create models folder.

3)
start to do model.
seed file.
seeded.
start basic route between frontend app.js and backend server.js.
replace static site with app.js jquery.

4)
start to query each seeded data to frontend.
found out model cause problem, change model.
resource contents query correctly.
seeded data, type, user can work with resource.
not using seed data anymore, only type data.

5)
create user.
create resource.
create rating.

6)
owner can create resource, delete resource, update resource.
fixed CRUD, auth, model ref just need id, auth payload should be the same for signup and login.
want a better error handling.
work on frontend, change app.js will also need to change how to jquery, careful.
remove seeded data, entered data using the site.

7)
form vaildation
heroku
seed, add user, add resource to heroku
add search feature
media query

8)
small fix,
change heroku url




### Online resource going to be seeds for database:
- definition of adult Asperger
https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2695286/
https://www.kennethrobersonphd.com/what-are-the-main-characteristics-of-aspergers-syndrome-in-adults/
- about the right job
https://www.iidc.indiana.edu/pages/Choosing-the-Right-Job-for-People-with-Autism-or-Aspergers-Syndrome
- find job
https://www.disabledperson.com/our-mission
- Asperger organization
http://aascend-preview.dreamhosters.com/
https://www.meetup.com/asperger/
- a resource site
https://www.sfautismsociety.org/for-higher-functioning-adults.html


### some seeds I use, some are real data

Full stack web developer with asperger job fair.
career
moscone center
www.moscone.com/aspergerdevjob


Just practice talking for 4 hours none stop.
education
CCSF
www.ccsf.edu/asperger101


5 miles dog walk.
social event
Ferry Building to Golden Gate bridge
www.facebook.com/5mdogwalk


Autism Society San Francisco Bay Area (SFASA) is a grassroots, volunteer-run nonprofit organization of parents, family members, friends and professionals striving to build a stronger, more connected and influential Bay Area autism community. We began in 1967 and cover the six major San Francisco Bay Area counties: Alameda, Contra Costa, Marin, San Francisco, San Mateo and Santa Clara. We are an affiliate of the Autism Society of America.
multiple type
Autism Society San Francisco Bay Area PO Box 249 San Mateo, CA 94401
https://www.sfautismsociety.org/for-higher-functioning-adults.html


The adult Asperger self-help revolution is on! We meet to share experiences, support each other, find resources, interact in a safe environment, network with fellow Aspies, and take responsibility for our growth. One aim of this group is to connect people who are in the early stages of their AS realization journeys with those who have known they had AS for much of their lives. We have a lot to learn from each other about how to thrive in wider society as well as how to live in less conventional ways that are attuned to our uniqueness.
social event
San Francisco
https://www.meetup.com/asperger/


disABLEDperson, Inc. is a 501(c)(3) charitable organization whose mission is to reduce the high unemployment rate of individuals and veterans with disabilities.
career
disABLEDperson, Inc. PO Box 230636 Encinitas, Ca. 92023-0636
https://www.disabledperson.com/our-mission


Choosing the Right Job for People with Autism or Asperger's Syndrome
education
n/a
https://www.iidc.indiana.edu/pages/Choosing-the-Right-Job-for-People-with-Autism-or-Aspergers-Syndrome


Asperger’s syndrome is one of the autism spectrum disorders. Affected individuals display considerably impaired capacity for social interaction, unusual special interests, and a tendency towards ritualized behavior.
education
n/a
https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2695286/


Sunday, October 21, 2018 San Francisco Adult Asperger Self Help Meetup (AASHM) Monthly Library Meetup
social event
Main San Francisco Public Library, Sycip 4th floor meeting room 100 Larkin St · San Francisco, CA
https://www.meetup.com/asperger/events/255571849/


In the Spotlight: Autism and the Media
October 20, 2018
AASCEND—the Autism Asperger Spectrum Coalition for Education Networking & Development—in partnership with SFSU's Autism Spectrum Studies Program presents its 10th conference on adult autism. Join us for a day of exploring the adult autistic world, with artists and presenters on and off the spectrum.
social event
Seven Hills Conference Center 800 Font Blvd San Francisco State University SF, CA 94132
https://www.eventbrite.com/e/in-the-spotlight-tickets-48597499429?aff=ebdssbdestsearch


Autism FAQ: “I think I have Aspergers. Where can I go for a diagnosis and support?
education
Autism Clinic at UCSF
https://blog.sfgate.com/lshumaker/2012/06/24/autism-faq-i-think-i-have-aspergers-where-can-i-go-for-a-diagnose-and-support/

27 Companies Who Hire Adults With Autism
career
n/a
https://workology.com/companies-hiring-adults-with-autism/

alan@gmail.com
andrea@gmail.com
dalton@gmail.com
francisco@gmail.com
gino@gmail.com
justin@gmail.com
luke@gmail.com
natalie@gmail.com
raj@gmail.com
sofia@gmail.com
waika@gmail.com
yi@gmail.com



aspergernetwork