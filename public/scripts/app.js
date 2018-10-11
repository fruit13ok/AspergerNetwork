let totalRating = 0;
// totalRating=parseInt($('.span-rating').text());

$('main').on('click', '#thumbs-up', function(event){
    event.preventDefault();
    // let totalRating=parseInt($('.span-rating').text());
    totalRating+=1;
    console.log(totalRating);
    // $('.span-rating').text(totalRating);
});

$('main').on('click', '#thumbs-down', function(event){
    event.preventDefault();
    // let totalRating=parseInt($('.span-rating').text());
    totalRating-=1;
    console.log(totalRating);
    // $('.span-rating').text(totalRating);
});

///////////////////////////////////////////////////////////////////////////
// https://www.youtube.com/watch?v=8zTL1LMxBqc
// https://getbootstrap.com/docs/4.1/components/modal/

let deserialize = (serializedString) =>{
    serializedString = serializedString.replace(/\%20/g, ' ');
    return serializedString.split("&");
}

$('#signup-form-close').on('click', function(event){
    // let email = $('#signupModal #email-signup').val().trim();
    // let password = $('#signupModal #password-signup').val().trim();
    // console.log(`email: ${email}, password: ${password}`);
    let serializedData = $('#signup-form').serialize();
    $.ajax({
        method: "POST",
        url: "/signup",
        data: serializedData,
        success: function (json) { console.log('signed up status', json) },
        error: function (e1, e2, e3) { console.log('ERROR ', e2) },
      });
});

$('#login-form-close').on('click', function(event){
    // let email = $('#loginModal #email-login').val().trim();
    // let password = $('#loginModal #password-login').val().trim();
    // console.log(`email: ${email}, password: ${password}`);
    let serializedData = $('#login-form').serialize();
    $.ajax({
        method: "POST",
        url: "/login",
        data: serializedData,
        success: function (json) { console.log('logged in status', json) },
        error: function (e1, e2, e3) { console.log('ERROR ', e2) },
      });
});
$('#update-form-close').on('click', function(event){
    // let email = $('#updateModal #email-update').val().trim();
    // let password = $('#updateModal #password-update').val().trim();
    // console.log(`email: ${email}, password: ${password}`);
    let serializedData = $('#update-form').serialize();
    $.ajax({
        method: "POST",
        url: "/userUpdate",
        data: serializedData,
        success: function (json) { console.log('updated user status', json) },
        error: function (e1, e2, e3) { console.log('ERROR ', e2) },
      });
});
$('#resource-form-close').on('click', function(event){
    // let type = $('#resourceModal #resource-type').val().trim();
    // let body = $('#resourceModal #resource-body').val().trim();
    // let location = $('#resourceModal #resource-location').val().trim();
    // let url = $('#resourceModal #resource-url').val().trim();
    // console.log(`type: ${type}, body: ${body}, location: ${location}, url: ${url}`);
    let serializedData = $('#resource-form').serialize();
    $.ajax({
        method: "POST",
        url: "/postResource",
        data: serializedData,
        success: function (json) { console.log('posted resource status', json) },
        error: function (e1, e2, e3) { console.log('ERROR ', e2) },
      });
});


