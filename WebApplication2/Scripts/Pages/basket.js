$(document).ready(function () {
    console.log('basket.js');

    iEventId = $('.single-event').data('id');
    GetEvent(iEventId);
});

function GetEvent(id) {
    $.ajax({
        url: '/api/events/' + id,
        method: "GET"
    }).done(function (data) {
        sImg = data.Media[0].Url;
        sName = data.Name;
        sLocation = data.Location.Adress + ', ' + data.Location.Zipcode + ' ' + data.Location.City;
        sEventStart = NiceDate(data.EventStart) + ' ' + NiceTime(data.EventStart);
        sEventEnd = NiceDate(data.EventEnd) + ' ' + NiceTime(data.EventEnd);
        sCategory = data.Categories.Name;
        sDescription = data.Description;

        sHTML = '';
        sHTML = sHTML + '<div class="img-holder"><img src="' + sImg + '" /></div>';
        sHTML = sHTML + '<h1>' + sName + '</h1>';
        sHTML = sHTML + '<h2 class="location">' + sLocation + '</h2>';
        sHTML = sHTML + '<h5 class="datetime">Starter: ' + sEventStart + ' - Slutter: ' + sEventEnd + '</h5>'
        sHTML = sHTML + '<h4>' + sCategory + '</h4>';
        sHTML = sHTML + '<p>' + sDescription + '</p>';

        $('.event-page').html(sHTML);
    });
}