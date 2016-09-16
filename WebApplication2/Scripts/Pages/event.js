$(document).ready(function () {
    iEventId = $('.single-event').data('id');
    GetEvent(iEventId);

    $('#btn-add-to-basket').on('click', function (e) {
        $('.basket-link i').addClass('pulsate');
        var buyObj = {};

        buyObj.id = $('#product').val();
        buyObj.name = $('#product').data('name');
        buyObj.price = $('#product').data('price');
        buyObj.qty = $('#qty').val();

        if (buyObj.qty < 1 || buyObj.qty == "") {
            $.notify("Vælg antal billetter!", "error");
            return false;
        }

        AddToBasket(buyObj);

        $.notify("Produkt lagt i kurv", "success");
        updateBasket();
        CountBasketItems();

        setTimeout(function () {
            $('.basket-link i').removeClass('pulsate');
        }, 500);

        e.preventDefault();
    });
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
        iPrice = data.Price;

        if (iPrice == 0) {
            sPrice = "GRATIS";
        }
        else {
            sPrice = iPrice + " DKK"
        }

        sHTML = '';
        sHTML = sHTML + '<div class="img-holder"><img src="' + sImg + '" /></div>';
        sHTML = sHTML + '<h1>' + sName + '</h1>';
        sHTML = sHTML + '<h2 class="location">' + sLocation + '</h2>';
        sHTML = sHTML + '<h5 class="datetime">Starter: ' + sEventStart + ' - Slutter: ' + sEventEnd + '</h5>'
        sHTML = sHTML + '<h4>' + sCategory + '</h4>';
        sHTML = sHTML + '<p>' + sDescription + '</p>';
        sHTML = sHTML + '<br/><p style="text-align: right; font-size: 24px;">Stykpris: ' + sPrice + '</p>'

        $('#product').attr('data-name', sName);
        $('#product').attr('data-price', iPrice);

        //sHTML = sHTML + '';

        $('.event-page').html(sHTML);
    });
}