//geting data from Products.js
let element = document.getElementsByClassName('cart-product');
if (element.innerHTML == null) {
  console.log('empty')
}
window.onscroll = function () {
  var header = document.querySelector("header");
  if (window.pageYOffset > 0) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
};

$("body").on("click", "#cart", toggleCart)


function toggleCart() {
  let cart = $("#cart-section")
  if (cart.css("right") === "20px") {
    cart.css("right", "-100%");

  } else {
    cart.css("right", "20px");

  }

}
function hideCart() {
  if (showCart) {
    $("#cart-section").css("right", "-100%")
  }


}

