$(document).ready(function () {
    console.log('checkout.js');

    $('#confirm-order').on('click', function () {
        if ($('#accept').is(':checked')) {
            alert('yes');
        }
        else {
            alert('no');
        }
    });
});