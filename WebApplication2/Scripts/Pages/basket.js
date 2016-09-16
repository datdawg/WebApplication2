$(document).ready(function () {
    createBasket();
    updateBasket();
    sBasketHTML = '';

    if (basketObject.products.length == 0) {
        $('.basket-holder').html('Der er ingen produkter i indkøbskurven.');
        return false;
    } else {
        $('.basket-holder').show();
    }

    $.each(basketObject.products, function (key, item) {
        sBasketHTML = sBasketHTML + '<tr class="row">';
        sBasketHTML = sBasketHTML + '<td>' + item.id + '</td>';
        sBasketHTML = sBasketHTML + '<td class="maximize"><a href="/Event/Index?iEventID=' + item.id + '">' + item.name + '</td>';
        sBasketHTML = sBasketHTML + '<td class="price">' + item.price + ' DKK</td>';
        sBasketHTML = sBasketHTML + '<td class="qty">' + item.qty + '</td>';
        sBasketHTML = sBasketHTML + '<td>' + item.price * item.qty + ' DKK</td>';
        sBasketHTML = sBasketHTML + '</tr>';

        subTotal += item.qty * item.price;
    });
    $('.tbl-basket thead').after(sBasketHTML);
    $('tr.total td').html(subTotal + ' DKK');

    $('#frm-basket').on('submit', function (e) {
        e.preventDefault();
        window.location = "/Checkout/";
    });
});