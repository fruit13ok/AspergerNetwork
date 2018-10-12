$.ajax({
    method: 'GET',
    url: '/resource',
    success: function (json) {
        // console.log('loaded resource content status', json);
        json.forEach(resource => {
            console.log('loaded resource content status', resource);
            let reso_id = resource.reso_id;
            let _user = resource._user;
            let _type = resource._type;
            let body = resource.body;
            let location = resource.location;
            let url = resource.url;
            let totalRating = resource.totalRating;
            $('main').append(
                `
                <article class="article-flex">
                    <div class="div-rating">
                        <i id="thumbs-up" class="fa fa-thumbs-up"></i>
                        <p>totalRating: <span class="span-rating">${totalRating}</span></p>
                        <i id="thumbs-down" class="fa fa-thumbs-down"></i>
                    </div>
                    <div class="div-resource">
                        <p>Type: ${_type}</p>
                        <p>Body: ${body}</p>
                        <p>Location: ${location}</p>
                        <p>URL: ${url}</p>
                    </div>
                </article>
                `
            );
        });
        // // console.log('loaded resource content status', json);
        // json.forEach(resource => {
        //     let _id = resource._id;
        //     // $.ajax({
        //     //     method: 'GET',
        //     //     url: '/rating',
        //     //     success: function (json) {
        //     //         console.log('loaded rating status', json);
        //     //         // json.forEach(resource => {
        //     //     }
        //     // });
        //     let _user = resource._user.email;
        //     let _type = resource._type.name;
        //     let body = resource.body;
        //     let location = resource.location;
        //     let url = resource.url;
        //     $('main').append(
        //         `
        //         <article class="article-flex">
        //             <div class="div-rating">
        //                 <i id="thumbs-up" class="fa fa-thumbs-up"></i>
        //                 <p>User: <span class="span-rating">${_user}</span></p>
        //                 <i id="thumbs-down" class="fa fa-thumbs-down"></i>
        //             </div>
        //             <div class="div-resource">
        //                 <p>Type: ${_type}</p>
        //                 <p>Body: ${body}</p>
        //                 <p>Location: ${location}</p>
        //                 <p>URL: ${url}</p>
        //             </div>
        //         </article>
        //         `
        //     );
        // })
    },
    error: function (e1, e2, e3) { console.log('ERROR ', e2) },
});


// let totalRating = 0;
// // totalRating=parseInt($('.span-rating').text());

// $('main').on('click', '#thumbs-up', function(event){
//     event.preventDefault();
//     // let totalRating=parseInt($('.span-rating').text());
//     totalRating+=1;
//     console.log(totalRating);
//     // $('.span-rating').text(totalRating);
// });

// $('main').on('click', '#thumbs-down', function(event){
//     event.preventDefault();
//     // let totalRating=parseInt($('.span-rating').text());
//     totalRating-=1;
//     console.log(totalRating);
//     // $('.span-rating').text(totalRating);
// });

///////////////////////////////////////////////////////////////////////////
// https://www.youtube.com/watch?v=8zTL1LMxBqc
// https://getbootstrap.com/docs/4.1/components/modal/

let deserialize = (serializedString) =>{
    serializedString = serializedString.replace(/\%20/g, ' ');
    return serializedString.split("&");
}

$('#signup-form-close').on('click', function(event){
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
    let serializedData = $('#resource-form').serialize();
    $.ajax({
        method: "POST",
        url: "/postResource",
        data: serializedData,
        success: function (json) { console.log('posted resource status', json) },
        error: function (e1, e2, e3) { console.log('ERROR ', e2) },
      });
});


