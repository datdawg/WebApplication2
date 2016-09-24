$(document).ready(function () {
    CreateBasket();
    UpdateBasket();

    CountBasketItems();
});

function SmartCheckboxInit() {
    $('.smart-check').each(function () {
        iId = $(this).data('id');
        sTxt = $(this).data('txt');
        sIcon = '<i class="fa fa-check-circle"></i>';
        $(this).wrap('<label data-id="' + iId + '" class="smart-lbl noselect">' + sTxt + sIcon + '</label>');
    });
    $(document).delegate('.smart-lbl', 'click', function () {
        $('.smart-lbl').on('click', function () {
            $(this).toggleClass('checked');
        });
    });
}
function NiceTime(sDateTime) {
    arrDateTime = sDateTime.split('T');
    sTime = arrDateTime[1];
    arrTime = sTime.split(':');
    sTime = arrTime[0] + ':' + arrTime[1];
    return sTime;
}
function NiceDate(sDateTime) {
    arrDateTime = sDateTime.split('T');
    sDate = arrDateTime[0];
    arrDate = sDate.split('-');

    iYear = arrDate[0];
    iMonth = arrDate[1];
    iDay = arrDate[2];

    sReturn = iDay + '. ';

    if (iMonth == 1) {
        sReturn = sReturn + 'Januar';
    } else if (iMonth == 2) {
        sReturn = sReturn + 'Februar';
    } else if (iMonth == 3) {
        sReturn = sReturn + 'Marts';
    } else if (iMonth == 4) {
        sReturn = sReturn + 'April';
    } else if (iMonth == 5) {
        sReturn = sReturn + 'Maj';
    } else if (iMonth == 6) {
        sReturn = sReturn + 'Juni';
    } else if (iMonth == 7) {
        sReturn = sReturn + 'Juli';
    } else if (iMonth == 8) {
        sReturn = sReturn + 'August';
    } else if (iMonth == 9) {
        sReturn = sReturn + 'September';
    } else if (iMonth == 10) {
        sReturn = sReturn + 'Oktober';
    } else if (iMonth == 11) {
        sReturn = sReturn + 'November';
    } else if (iMonth == 12) {
        sReturn = sReturn + 'December';
    } else {
        return false;
    }

    sReturn = sReturn + ' ' + iYear;
    return sReturn;
}