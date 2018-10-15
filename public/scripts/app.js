localStorage.length > 0 ? console.log(localStorage) : console.log('no local storage');
let user;


oneResource = (resoId, totalRating, user, type, body, location, url) => {
    var resourceHTML =
        `
    <article class="article-flex">
        <div class="div-rating" data-id=${resoId}>
            <i id="thumbs-up" class="fa fa-thumbs-up"></i>
            <p class="p-rating">${totalRating}</p>
            <i id="thumbs-down" class="fa fa-thumbs-down"></i>
            <p>by: <span class="posted-by">${user}</span></p>
            <button type="button" id="updateBtn" class="btn btn-warning btn-sm pull-left">Update</button>
            <button type="button" id="deleteBtn" class="btn btn-danger btn-sm pull-left">Delete</button>
        </div>
        <div class="div-resource">
            <p>Type: <span class="rType">${type}</span></p>
            <p>Body: <span class="rBody">${body}</span></p>
            <p>Location: <span class="rLocation">${location}</span></p>
            <p>URL: <span class="rUrl">${url}</span></p>
        </div>
    </article>
    `;
    return resourceHTML;
}

checkForLogin = () => {
    if (localStorage.length > 0) {
        let jwt = localStorage.token
        $.ajax({
            type: "POST", //GET, POST, PUT
            url: '/verify',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", 'Bearer ' + localStorage.token);
            }
        }).done(function (response) {
            console.log('check For Login: ', response)
            // when signup this will log undefined, because the response object has differ structure
            // verified:  { createdUser:
            //     { _id: '5bc4d29939813073053f3875',
            //       email: 'h@h.com',
            //       password:
            //        '$2b$10$EutaDIehVW0PJFzqaUKSYO9I26Ghp7o.MIBo52aueztbYzZxqQ2QK',
            //       __v: 0 },
            //    iat: 1539625625 }
            //  LOGIN CALLED { 'email-login': 'h@h.com', 'password-login': 'h' }
            //  foundUsers:  [ { _id: 5bc4d29939813073053f3875,
            //      email: 'h@h.com',
            //      password:
            //       '$2b$10$EutaDIehVW0PJFzqaUKSYO9I26Ghp7o.MIBo52aueztbYzZxqQ2QK',
            //      __v: 0 } ]
            //  body { 'email-login': 'h@h.com', 'password-login': 'h' }
            //  hash $2b$10$EutaDIehVW0PJFzqaUKSYO9I26Ghp7o.MIBo52aueztbYzZxqQ2QK
            //  true
            //  MATCH:  true
            //  NEW TOKEN:  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhAaC5jb20iLCJfaWQiOiI1YmM0ZDI5OTM5ODEzMDczMDUzZjM4NzUiLCJpYXQiOjE1Mzk2MjU4NTMsImV4cCI6MTUzOTYyOTQ1M30.42klvNxRnAWQxgM9z5ETVRYHxes7SzQtzZPAaFoDH88
            //  in verify...
            //  Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhAaC5jb20iLCJfaWQiOiI1YmM0ZDI5OTM5ODEzMDczMDUzZjM4NzUiLCJpYXQiOjE1Mzk2MjU4NTMsImV4cCI6MTUzOTYyOTQ1M30.42klvNxRnAWQxgM9z5ETVRYHxes7SzQtzZPAaFoDH88
            //  verified:  { email: 'h@h.com',
            //    _id: '5bc4d29939813073053f3875',
            //    iat: 1539625853,
            //    exp: 1539629453 }
            user = { email: response.email, _id: response._id }
            console.log("you can access variable user: ", user)
        }).fail(function (err) {
            console.log('error: ', err);
        });
    }
}
// need to check login early when page load so when refresh page you get the user and token again
checkForLogin();

handleLogout = (e) => {
    e.preventDefault();
    console.log("LOGGED OUT")
    delete localStorage.token;
    $('#yesToken').toggleClass('show');
    $('#message').text('Goodbye!')
    user = null;
    checkForLogin();
}

$.ajax({
    method: 'GET',
    url: '/resource',
    success: function (json) {
        json.forEach(resource => {
            console.log('loaded resource content status', resource);
            let reso_id = resource.reso_id;
            let _user = resource._user.email;
            let _type = resource._type;
            let body = resource.body;
            let location = resource.location;
            let url = resource.url;
            let totalRating = resource.totalRating;
            // oneResource = (resoId, totalRating, user, type, body, location, url)
            $('main').append(oneResource(reso_id, totalRating, _user, _type, body, location, url));
        });
    },
    error: function (e1, e2, e3) { console.log('ERROR ', e2) }
});

$('main').on('click', '#thumbs-up', function (event) {
    event.preventDefault();
    // console.log('clicked thumbs-up, resource id is: ', $(this).parent().attr('data-id'));
    // console.log('clicked thumbs-up, rating is: ', $('.p-rating').text());
    $.ajax({
        method: "POST",
        url: "/ratingUp",
        data: { dataId: $(this).parent().attr('data-id') },
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", 'Bearer ' + localStorage.token);
        },
        error: function (e1, e2, e3) { console.log('ERROR ', e1.responseJSON) },
        success: function (json) {
            // console.log('thumbs up status', json);
            $('.p-rating').text(json.totalRating);
        }
    });
});

$('main').on('click', '#thumbs-down', function (event) {
    event.preventDefault();
    // console.log('clicked thumbs-down, resource id is: ', $(this).parent().attr('data-id'));
    // console.log('clicked thumbs-down, rating is: ', $('.p-rating').text());
    $.ajax({
        method: "POST",
        url: "/ratingDown",
        data: { dataId: $(this).parent().attr('data-id') },
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", 'Bearer ' + localStorage.token);
        },
        error: function (e1, e2, e3) { console.log('ERROR ', e1.responseJSON) },
        success: function (json) {
            // console.log('thumbs down status', json);
            $('.p-rating').text(json.totalRating);
        }
    });
});

$('main').on('click', '#deleteBtn', function (event) {
    event.preventDefault();
    console.log('clicked deleteBtn, resource id is: ', $(this).parent().attr('data-id'));
    $.ajax({
        method: "POST",
        url: "/deleteResource",
        data: { dataId: $(this).parent().attr('data-id') },
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", 'Bearer ' + localStorage.token);
        },
        error: function (e1, e2, e3) { console.log('ERROR ', e1, e2, e3) },
        success: function (json) {
            console.log('deleted resource: ', json);
            window.location.reload()
        }
    });
});

$('main').on('click', '#updateBtn', function (event) {
    event.preventDefault();
    var reso_id = $(this).parent().attr('data-id');
    console.log('clicked updateBtn, resource id is: ', reso_id);
    // console.log('testing: ',$('#updateResourceModal #resource-type').val());
    // console.log($(this).parent().siblings('.div-resource').find('.rType').text());
    $('#updateResourceModal').modal('show');
    $('#updateResourceModal #update-resource-type')
        .val($(this).parent().siblings('.div-resource').find('.rType').text());
    $('#updateResourceModal #update-resource-body')
        .val($(this).parent().siblings('.div-resource').find('.rBody').text());
    $('#updateResourceModal #update-resource-location')
        .val($(this).parent().siblings('.div-resource').find('.rLocation').text());
    $('#updateResourceModal #update-resource-url')
        .val($(this).parent().siblings('.div-resource').find('.rUrl').text());

    $('#update-resource-form-close').on('click', function (event) {

        // console.log(user._id);

        let serializedData = $('#update-resource-form').serialize();
        console.log(serializedData);
        console.log(serializedData + "&resource-id=" + reso_id);

        $.ajax({
            method: "POST",
            url: "/updateResource",
            data: serializedData + "&resource-id=" + reso_id,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", 'Bearer ' + localStorage.token);
            },
            error: function (e1, e2, e3) { console.log('ERROR ', e2) },
            success: function (json) {
                console.log('updated resource status', json);
                window.location.reload()
            }
        });
    });
});

///////////////////////////////////////////////////////////////////////////
// https://www.youtube.com/watch?v=8zTL1LMxBqc
// https://getbootstrap.com/docs/4.1/components/modal/

let deserialize = (serializedString) => {
    serializedString = serializedString.replace(/\%20/g, ' ');
    return serializedString.split("&");
}

$('#signup-form-close').on('click', function (event) {
    let serializedData = $('#signup-form').serialize();
    $.ajax({
        method: "POST",
        url: "/signup",
        data: serializedData,
        error: function (e1, e2, e3) { console.log('ERROR ', e2) },
        success: function (json) {
            console.log('signed up status', json);
            user = { email: json.createdUser.email, _id: json.createdUser._id }
            localStorage.token = json.signedJwt;
            checkForLogin();
        }
    });
});

$('#login-form-close').on('click', function (event) {
    let serializedData = $('#login-form').serialize();
    $.ajax({
        method: "POST",
        url: "/login",
        data: serializedData,
        error: function (e1, e2, e3) { console.log('ERROR ', e2) },
        success: function (json) {
            console.log('logged in status', json);
            localStorage.token = json.token;
            checkForLogin();
        }
    });
});

$('#update-form-close').on('click', function (event) {
    let serializedData = $('#update-form').serialize();
    $.ajax({
        method: "POST",
        url: "/userUpdate",
        data: serializedData,
        error: function (e1, e2, e3) { console.log('ERROR ', e2) },
        success: function (json) { console.log('updated user status', json); }
    });
});

$('#resource-form-close').on('click', function (event) {

    console.log(user);
    console.log(user._id);

    let serializedData = $('#resource-form').serialize();
    console.log(serializedData);

    $.ajax({
        method: "POST",
        url: "/postResource",
        data: serializedData,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", 'Bearer ' + localStorage.token);
        },
        error: function (e1, e2, e3) { console.log('ERROR ', e2) },
        success: function (json) {
            console.log('posted resource status', json);
            $('main').append(oneResource(json._id, json.totalRating, user.email, json._type.name, json.body, json.location, json.url));
            window.location.reload()
        }
    });
});

$('#aLogout').on('click', function handleLogout(event) {
    event.preventDefault();
    console.log("LOGGED OUT")
    delete localStorage.token;
    user = null;
    checkForLogin();
});