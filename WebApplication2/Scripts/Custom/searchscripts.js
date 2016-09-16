function LoadSearchCategories() {
    $.ajax({
        url: "/api/categories",
        method: "GET"
    }).done(function (data) {
        if ($('.hero').hasClass('searchpage')) { bSearchpage = true; }

        $.each(data, function (key, item) {
            iId = item.Id;
            sName = item.Name;

            $('.tags-container').append('<input value="' + iId + '" name="cat[' + key + ']" type="checkbox" data-id="' + iId + '" data-txt="' + sName + '" class="smart-check" />');
        });
        SmartCheckboxInit();
        if (bSearchpage) { CheckSearch(); }
    });
}
function SearchPlaceholder() {
    sPlaceholder = $('.main-search').attr('placeholder');
    $('.main-search').focus(function () { $(this).attr('placeholder', ''); }).blur(function () { $(this).attr('placeholder', sPlaceholder); });
}
function CheckSearch() {
    objSearch = JSON.parse(localStorage.getItem('sSearch'));

    array = objSearch.Categories.trim(',').split(',');
    array.splice(-1, 1);
    sSearch = objSearch.Param;

    $('.smart-lbl').each(function () {
        oThis = $(this);

        iDataId = $(this).data('id');

        $.each(array, function (key, value) {
            if (iDataId == value) {
                oThis.addClass('checked');
                oThis.find('input').prop('checked', true);
            }
        });
    });

    $('#main-search').val(sSearch);
}