//variables for localStorage
var prefix = "Tickit-";
var basketName = prefix + "basket";
var total = prefix + "Total";
var storage = localStorage;
var basketObject;
var subTotal = 0;

function createBasket() {
    if (storage.getItem(basketName) == null) {
        var basket = {}
        basket.products = [];

        storage.setItem(basketName, JSON.stringify(basket));
        storage.setItem(total, "0");
    }
}
function AddToBasket(product) {

    var basket = storage.getItem(basketName);
    var basketObject = JSON.parse(basket)
    var products = basketObject.products;

    var duplicates = $.grep(products, function (ele) {
        return ele.id == product.id
    });

    if (duplicates.length > 0) {
        //produkt eksisterer allerede i kurv
        var index = products.findIndex(function (obj) {
            return obj.id == product.id;
        });

        products[index].qty = parseInt(products[index].qty) + parseInt(product.qty);
    } else {
        products.push(product);
    }

    storage.setItem(basketName, JSON.stringify(basketObject));

    createBasket();
    //updatebasket();
}
function updateBasket() {
    var basket = storage.getItem(basketName);
    basketObject = JSON.parse(basket);

}
function CountBasketItems() {
    iItemsInBasket = 0;
    sHTML = '';

    $.each(basketObject.products, function (key, item) {
        iItemsInBasket = iItemsInBasket + parseInt(item.qty);
    });

    if (iItemsInBasket == 0) {
        sHTML = 'Ingen produkter i kurven';
    }
    else if (iItemsInBasket == 1) {
        sHTML = '1 produkt i kurven';
    } else {
        sHTML = iItemsInBasket + ' produkter i kurven';
    }

    $('.counter').html(sHTML);
}