$(document).ready(function () {
    console.log('home.js');

    SearchPlaceholder();
    LoadSearchCategories();
    LoadUpcomingEvents();
});

function LoadSearchCategories() {
    $.ajax({
        url: "api/categories",
        method: "GET"
    }).done(function (data) {
        $.each(data, function (key, item) {
            iId = item.Id;
            sName = item.Name;

            $('.tags-container').append('<input type="checkbox" data-id="' + iId + '" data-txt="' + sName + '" class="smart-check" />');
        });
        SmartCheckboxInit();
    });
}
function SearchPlaceholder() {
    sPlaceholder = $('.main-search').attr('placeholder');
    $('.main-search').focus(function () { $(this).attr('placeholder', ''); }).blur(function () { $(this).attr('placeholder', sPlaceholder); });
}
function LoadUpcomingEvents() {
    $.ajax({
        url: "api/events",
        method: "GET"
    }).done(function (data) {
        $.each(data, function (key, item) {
            iId = item.Id;
            sName = item.Name;
            sImage = item.Media[0].Url;
            sLocation = item.Location.City;
            sDate = NiceDate(item.EventStart);
            sCategory = item.Categories.Name;

            sAppend = '';
            sAppend = sAppend + '<a href="/Event/Index?iEventId=' + iId + '" class="event">';
            sAppend = sAppend + '<div class="event-title"><h3 title="' + sName + '">' + sName + '</h3></div>';
            sAppend = sAppend + '<div class="event-image-location"><img src="' + sImage + '"><div class="event-location">' + sLocation + '</div></div>';
            sAppend = sAppend + '<div class="event-info">';
            sAppend = sAppend + '<div class="event-date">' + sDate + '</div>';
            sAppend = sAppend + '<div class="event-category">' + sCategory + '</div>';
            sAppend = sAppend + '</div>';
            sAppend = sAppend + '</a>';

            $('.events-holder').append(sAppend);
        })
        $('.events-holder').append('<div class="clr"></div>');
    });
}