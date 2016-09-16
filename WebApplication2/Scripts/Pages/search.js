$(document).ready(function () {
    SearchPlaceholder();
    LoadSearchCategories();

    $('#frm-main-search').on('submit', function (e) {
        e.preventDefault();
        objSearch = {};
        objSearch.Categories = "";
        objSearch.Param = "";

        $(this).find('input[type=checkbox]:checked').each(function () {
            objSearch.Categories += $(this).data('id') + ',';
        });
        objSearch.Param = $(this).find('#main-search').val();

        localStorage.setItem('sSearch', JSON.stringify(objSearch));

        window.location = '/Search/';
    });

    objSearch = JSON.parse(localStorage.getItem('sSearch'));

    $.ajax({
        url: '/api/events/search?s=' + objSearch.Param + '&categories=' + objSearch.Categories,
        method: "GET"
    }).done(function (data) {
        //console.log(data);

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

            $('.search-holder').append(sAppend);
        })
        $('.search-holder').append('<div class="clr"></div>');
    });
});