localStorage.length > 0 ? console.log(localStorage) : console.log('no local storage');
let user;

function validateEmail(Email) {
    var pattern = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return $.trim(Email).match(pattern) ? true : false;
}


oneResource = (resoId, totalRating, user, type, body, location, url, curUser) => {
    // if no user login or current user don't have post resource, hide edit/delete buttons
    // console.log('user post this: ',user);
    // console.log('current user: ',curUser);
    var buttonHTML;
    if(curUser === undefined || user._id !== curUser._id){
        buttonHTML = `<button type="button" id="updateBtn" class="btn btn-warning btn-sm pull-left hideIcon" hideIcon><i class="fas fa-edit"></i></button>
        <button type="button" id="deleteBtn" class="btn btn-danger btn-sm pull-left hideIcon"><i class="fas fa-trash-alt"></i></button>`
    }else{
        buttonHTML = `<button type="button" id="updateBtn" class="btn btn-warning btn-sm pull-left"><i class="fas fa-edit"></i></button>
        <button type="button" id="deleteBtn" class="btn btn-danger btn-sm pull-left"><i class="fas fa-trash-alt"></i></button>`
    }
    // change this because I pass in whole user object ${user.substring(0, user.lastIndexOf("@"))}
    var resourceHTML =
    `
    <article class="article-flex" data-userid=${user._id}>
        <div class="div-rating" data-id=${resoId}>
            <p id="p-rating">Rating: ${totalRating}</p>
            <i id="thumbs-up" class="fa fa-thumbs-up"></i>
            <i id="thumbs-down" class="fa fa-thumbs-down"></i>
            <p><i class="fas fa-user"></i> <span class="posted-by">${user.email.substring(0, user.email.lastIndexOf("@"))}</span></p>
        </div>
        <div class="div-resource">
            <p>Description: </p>
            <span class="rBody">${body}</span>
            <p>Type: </p>
            <span class="rType">${type}</span>
            <p>Location: </p>
            <span class="rLocation">${location}</span>
            <p>Web site: </p>
            <span class="rUrl">${url}</span>
        </div>
        <div class="div-editDelete" data-id=${resoId}>
            `
            + buttonHTML +
            `
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
            user = { email: response.email, _id: response._id }
            console.log("you can access variable user: ", user)
            console.log('my user', user);
            // start by hide resource / logout icon, after someone login, show it
            // start by show signup / login icon, after someone login, hide it
            if(user !== undefined){
                $('#logoutLink').removeClass('hideIcon');
                $('#resourceLink').removeClass('hideIcon');
                $('#signupLink').addClass('hideIcon');
                $('#loginLink').addClass('hideIcon');
            }
        }).fail(function (err) {
            console.log('error: ', err);
        });
    }
}
// need to check login early when page load so when refresh page you get the user and token again
console.log('initial checkForLogin');
checkForLogin();

handleLogout = (e) => {
    e.preventDefault();
    console.log("LOGGED OUT")
    delete localStorage.token;
    $('#yesToken').toggleClass('show');
    $('#message').text('Goodbye!')
    user = null;
    console.log('handleLogout checkForLogin');
    checkForLogin();
}

$.ajax({
    method: 'GET',
    url: '/resource',
    success: function (json) {
        json.forEach(resource => {
            console.log('loaded resource content status', resource._user);
            let reso_id = resource.reso_id;
            // let _user = resource._user.email;
            let _user = resource._user;
            let _type = resource._type;
            let body = resource.body;
            let location = resource.location;
            let url = resource.url;
            let totalRating = resource.totalRating;
            // oneResource = (resoId, totalRating, user, type, body, location, url)
            $('main').append(oneResource(reso_id, totalRating, _user, _type, body, location, url, user));
        });
    },
    error: function (e1, e2, e3) { console.log('ERROR ', e2) }
});

$('main').on('click', '#thumbs-up', function (event) {
    event.preventDefault();
    console.log('clicked thumbs-up, resource id is: ', $(this).parent().attr('data-id'));
    // console.log('clicked thumbs-up, rating is: ', $('#p-rating').text());
    $.ajax({
        method: "POST",
        url: "/ratingUp",
        data: { dataId: $(this).parent().attr('data-id') },
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", 'Bearer ' + localStorage.token);
        },
        error: function (e1, e2, e3) { console.log('ERROR ', e1.responseJSON) },
        success: function (json) {
            console.log('thumbs up status', json);
            window.location.reload();
        }
    });
});

$('main').on('click', '#thumbs-down', function (event) {
    event.preventDefault();
    // console.log('clicked thumbs-down, resource id is: ', $(this).parent().attr('data-id'));
    // console.log('clicked thumbs-down, rating is: ', $('#p-rating').text());
    $.ajax({
        method: "POST",
        url: "/ratingDown",
        data: { dataId: $(this).parent().attr('data-id') },
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", 'Bearer ' + localStorage.token);
        },
        error: function (e1, e2, e3) { console.log('ERROR ', e1.responseJSON) },
        success: function (json) {
            console.log('thumbs down status', json);
            window.location.reload();
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
    console.log('testType: ',$(this).parent().siblings('.div-resource').find('.rType').text());
    $('#updateResourceModal').modal('show');
    $('#updateResourceModal #update-resource-type')
        .val($(this).parent().siblings('.div-resource').find('.rType').text());
    $('#updateResourceModal #update-resource-body')
        .val($(this).parent().siblings('.div-resource').find('.rBody').text());
    $('#updateResourceModal #update-resource-location')
        .val($(this).parent().siblings('.div-resource').find('.rLocation').text());
    $('#updateResourceModal #update-resource-url')
        .val($(this).parent().siblings('.div-resource').find('.rUrl').text());

    $('#update-resource-form-validate-close').on('click', function (event) {
        event.preventDefault();
        let allowAjax = new Array( $('#update-resource-form input, #update-resource-form textarea').length );
        $('#update-resource-form input, #update-resource-form textarea').each(function(index, event){
            if($(this).val() === ''){
                if($(this).attr('type') === 'email'){
                    $(this).siblings().text("Please enter an email address.");
                    $(this).addClass('error');
                    $(this).siblings().fadeIn();
                }else{
                    $(this).addClass('error');
                    $(this).siblings().fadeIn();
                }
                allowAjax[index] = false;
            }else{
                if(!validateEmail($(this).val()) && $(this).attr('type') === 'email'){
                    $(this).addClass('error');
                    $(this).siblings().text("Please enter a valid email address.");
                    $(this).siblings().fadeIn();
                    allowAjax[index] = false;
                }else{
                    $(this).removeClass('error');
                    $(this).siblings('.error-message').hide();
                    allowAjax[index] = true;
                }
            }
        }); 
        if(allowAjax.every(x => x === true)){
            // button start without data-dismiss="modal", if validated add attribute in
            $('#update-resource-form-validate-close').attr('data-dismiss', 'modal');
            let serializedData = $('#update-resource-form').serialize();
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
        }  
    });
});

///////////////////////////////////////////////////////////////////////////
// https://www.youtube.com/watch?v=8zTL1LMxBqc
// https://getbootstrap.com/docs/4.1/components/modal/

$('#signup-form-validate-close').on('click', function (event) {
    event.preventDefault();
    let allowAjax = new Array( $('#signup-form input, #signup-form textarea').length );
    $('#signup-form input, #signup-form textarea').each(function(index, event){
        if($(this).val() === ''){
            if($(this).attr('type') === 'email'){
                $(this).siblings().text("Please enter an email address.");
                $(this).addClass('error');
                $(this).siblings().fadeIn();
            }else{
                $(this).addClass('error');
                $(this).siblings().fadeIn();
            }
            allowAjax[index] = false;
        }else{
            if(!validateEmail($(this).val()) && $(this).attr('type') === 'email'){
                $(this).addClass('error');
                $(this).siblings().text("Please enter a valid email address.");
                $(this).siblings().fadeIn();
                allowAjax[index] = false;
            }else{
                $(this).removeClass('error');
                $(this).siblings('.error-message').hide();
                allowAjax[index] = true;
            }
        }
    });   
    if(allowAjax.every(x => x === true)){
        // button start without data-dismiss="modal", if validated add attribute in
        $('#signup-form-validate-close').attr('data-dismiss', 'modal');
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
                console.log('signup checkForLogin');
                checkForLogin();
            }
        });
    }
});

$('#login-form-validate-close').on('click', function (event) {
    event.preventDefault();
    let allowAjax = new Array( $('#login-form input, #login-form textarea').length );
    $('#login-form input, #login-form textarea').each(function(index, event){
        if($(this).val() === ''){
            if($(this).attr('type') === 'email'){
                $(this).siblings().text("Please enter an email address.");
                $(this).addClass('error');
                $(this).siblings().fadeIn();
            }else{
                $(this).addClass('error');
                $(this).siblings().fadeIn();
            }
            allowAjax[index] = false;
        }else{
            if(!validateEmail($(this).val()) && $(this).attr('type') === 'email'){
                $(this).addClass('error');
                $(this).siblings().text("Please enter a valid email address.");
                $(this).siblings().fadeIn();
                allowAjax[index] = false;
            }else{
                $(this).removeClass('error');
                $(this).siblings('.error-message').hide();
                allowAjax[index] = true;
            }
        }
    }); 
    if(allowAjax.every(x => x === true)){
        // button start without data-dismiss="modal", if validated add attribute in
        $('#login-form-validate-close').attr('data-dismiss', 'modal');
        let serializedData = $('#login-form').serialize();
        $.ajax({
            method: "POST",
            url: "/login",
            data: serializedData,
            error: function (e1, e2, e3) {
                console.log('ERROR ', e2);
                $('#checkUserModal').modal('show');
            },
            success: function (json) {
                console.log('logged in status', json);
                localStorage.token = json.token;
                console.log('login checkForLogin');
                checkForLogin();
                window.location.reload()
            }
        });
    }
});

$('#resource-form-validate-close').on('click', function (event) {
    event.preventDefault();
    let allowAjax = new Array( $('#resource-form input, #resource-form textarea').length );
    $('#resource-form input, #resource-form textarea').each(function(index, event){
        if($(this).val() === ''){
            if($(this).attr('type') === 'email'){
                $(this).siblings().text("Please enter an email address.");
                $(this).addClass('error');
                $(this).siblings().fadeIn();
            }else{
                $(this).addClass('error');
                $(this).siblings().fadeIn();
            }
            allowAjax[index] = false;
        }else{
            if(!validateEmail($(this).val()) && $(this).attr('type') === 'email'){
                $(this).addClass('error');
                $(this).siblings().text("Please enter a valid email address.");
                $(this).siblings().fadeIn();
                allowAjax[index] = false;
            }else{
                $(this).removeClass('error');
                $(this).siblings('.error-message').hide();
                allowAjax[index] = true;
            }
        }
    });
    if(allowAjax.every(x => x === true)){
        // button start without data-dismiss="modal", if validated add attribute in
        $('#resource-form-validate-close').attr('data-dismiss', 'modal');
        let serializedData = $('#resource-form').serialize();
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
                // $('main').append(oneResource(json._id, json.totalRating, user.email, json._type.name, json.body, json.location, json.url));
                $('main').append(oneResource(json._id, json.totalRating, user, json._type.name, json.body, json.location, json.url, user));
                window.location.reload()
            }
        });
    }
});

$('#logoutLink').on('click', function handleLogout(event) {
    event.preventDefault();
    console.log("LOGGED OUT")
    delete localStorage.token;
    user = null;
    console.log('logout checkForLogin');
    checkForLogin();
    window.location.reload()
});