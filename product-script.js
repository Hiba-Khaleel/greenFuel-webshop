let totalCartPrice = 0;
function handleDiscount(itemPrice) {
    let priceBeforeDiscount = itemPrice;
    let discountAmount = priceBeforeDiscount * 0.25;
    let handleSalePrice = priceBeforeDiscount - discountAmount;
    return parseFloat(handleSalePrice.toFixed(2));
}

for (let product of products) {
    let productPrice = 0;
    if (product.isDiscount) {
        productPrice += handleDiscount(product.price);
    } else {
        productPrice = Number(product.price);
    }
    document.querySelector('.total-price').innerHTML = ('Total Price: ' + totalCartPrice.toFixed(2) + ' kr');

    $(".product-list").append(
        $("<li/>").append(
            $("<img/>").attr("src", product.image)
        ).append(
            $("<h3/>").text(product.title)
        ).append(
            $("<div/>").addClass('lower-product-part').append(
                $("<h4/>").text(`${productPrice.toFixed(2)}kr`).css("background-color", product.isDiscount ? "#FF9100" : "")
            ).append(
                $("<button/>").text("Add to cart")
            )
        )
    );
}


$('body').on('click', '.lower-product-part button', addToCart);
$("body").on("click", " .cart-product .removeItem", remove_from_cart);
$("body").on("click", " .cart-product .addMore", add_more);
$("body").on("click", " .cart-product .removeOne", removeOneItem);

const btnContainer = `<div class='cart-btn-container'><button class="removeItem"><i class="fa fa-trash"></i></button>
        <button class="addMore">+</button> <button class="removeOne">-</button></div>`


///// -------ADD TO CART----- /////////

function addToCart() {
    let priceText = $(this).closest('li').find('h4').text();
    let price = parseFloat(priceText);
    let title = $(this).closest('li').find('h3').text();

    let existingItem = $(".cart-product .title").filter(function () {
        return $(this).text() === title;
    }).closest('li');

    if (existingItem.length > 0) {
        let currentPriceText = existingItem.find('#price').text();
        let currentPrice = parseFloat(currentPriceText.replace(' kr', ''));

        const matchedProduct = products.find(product => product.title === title);
        let matchedPrice = parseFloat(matchedProduct.price);
        let addedPrice = 0;
        if (matchedProduct.isDiscount) {
            let addedDisscountPrice = currentPrice + handleDiscount(matchedPrice);
            addedPrice += addedDisscountPrice
        }
        else {
            addedPrice += (currentPrice + matchedPrice);

        }
        existingItem.find('#price').text(addedPrice.toFixed(2) + ' kr');

    } else {
        $(".cart-product").append(`
                    <li>
                    <div class='product-info'>
                        <h4 class='title'>${title}</h4>
                <p id="price">${price.toFixed(2)} kr</p>
                             </div>

                        ${btnContainer}
                    </li>

                `)
            ;
    }
    totalPrice = parseFloat(price);
    totalCartPrice += totalPrice;
    document.querySelector('.total-price').innerHTML = ('total Price= ' + totalCartPrice.toFixed(2) + ' kr');


}



////// -------ADD MORE CART----- //////////


function add_more() {
    let itemTitle = $(this).closest('li').find('.title').text();
    let itemPriceText = $(this).closest('li').find('#price').text();
    let currentPrice = parseFloat(itemPriceText.replace(' kr', ''));

    const matchedProduct = products.find(product => product.title === itemTitle);
    if (matchedProduct) {
        let matchedPrice = parseFloat(matchedProduct.price);
        let addedPrice = 0;

        if (matchedProduct.isDiscount) {
            addedPrice = currentPrice + handleDiscount(matchedPrice);
        } else {
            addedPrice = currentPrice + matchedPrice;
        }

        $(this).closest('li').find('#price').text(addedPrice.toFixed(2) + ' kr');

        totalCartPrice += matchedProduct.isDiscount ? handleDiscount(matchedPrice) : matchedPrice;
        console.log('Total cart price: ' + totalCartPrice.toFixed(2));

        document.querySelector('.total-price').innerHTML = 'total Price= ' + totalCartPrice.toFixed(2) + ' kr';
    }
}


////// -------MINUS ITEM IN THE CART CART----- //////////

function removeOneItem() {
    let itemTitle = $(this).closest('li').find('.title').text();
    let itemPriceText = $(this).closest('li').find('#price').text();
    let currentPrice = parseFloat(itemPriceText.replace(' kr', ''));

    const matchedProduct = products.find(product => product.title === itemTitle);
    if (matchedProduct) {
        let matchedPrice = parseFloat(matchedProduct.price);
        let priceToRemove = matchedProduct.isDiscount ? handleDiscount(matchedPrice) : matchedPrice;

        if (Math.abs(currentPrice - priceToRemove) < 0.01) {
            let item = $(this).closest('li');
            item.remove();
        } else {
            let updatedPrice = currentPrice - priceToRemove;
            $(this).closest('li').find('#price').text(updatedPrice.toFixed(2) + ' kr');
        }

        totalCartPrice -= priceToRemove;
        document.querySelector('.total-price').innerHTML = 'total Price= ' + totalCartPrice.toFixed(2) + ' kr';
    }
}





////// -------REMOVE ITEM FROM THE CART----- //////////


function remove_from_cart() {
    let itemPriceText = $(this).closest('li').find('#price').text();
    let price = parseFloat(itemPriceText);
    let item = $(this).closest('li')
    item.remove();
    totalCartPrice -= price;
    document.querySelector('.total-price').innerHTML = 'total Price= ' + totalCartPrice.toFixed(2);


}

