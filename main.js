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

$('#signup-form-close').on('click', function(event){
    var email = $('#signupModal #email-signup').val().trim();
    var password = $('#signupModal #password-signup').val().trim();
    console.log(`email: ${email}, password: ${password}`);
});
$('#login-form-close').on('click', function(event){
    var email = $('#loginModal #email-login').val().trim();
    var password = $('#loginModal #password-login').val().trim();
    console.log(`email: ${email}, password: ${password}`);
});
$('#update-form-close').on('click', function(event){
    var email = $('#updateModal #email-update').val().trim();
    var password = $('#updateModal #password-update').val().trim();
    console.log(`email: ${email}, password: ${password}`);
});
$('#resource-form-close').on('click', function(event){
    var type = $('#resourceModal #resource-type').val().trim();
    var body = $('#resourceModal #resource-body').val().trim();
    var location = $('#resourceModal #resource-location').val().trim();
    var url = $('#resourceModal #resource-url').val().trim();
    console.log(`type: ${type}, body: ${body}, location: ${location}, url: ${url}`);
});