let nav_bottom = document.getElementById("bottom-nav-bar");
let cart_message = Array.from(document.querySelectorAll(".cart-message"));
let cartitem = document.getElementById("cartitem");
// let cartBtn = document.querySelectorAll(".total-cart-btn");
let cartBtn = Array.from(document.getElementsByClassName("total-cart-btn"));

// Products
const products = [
  {
    Id: 0,
    image: "./images/1.png",
    title: " DELL Laptop",
    price: 50,
  },
  {
    Id: 1,
    image: "./images/2.png",
    title: "HP Laptop",
    price: 45,
  },
  {
    Id: 2,
    image: "./images/3.png",
    title: "TOSHIBA Laptop",
    price: 65,
  },
  {
    Id: 3,
    image: "./images/4.png",
    title: "LENEVO Laptop",
    price: 40,
  },
];

function menutoggle() {
  if (nav_bottom.style.height == "0px") {
    nav_bottom.style.height = "320px";
  } else {
    nav_bottom.style.height = "0px";
  }
}

function getProductHtml(box) {
  const productHtml = products.map((item, index) => {
    const { image, title, price } = item;
    return `<div class="${box}">
            <div class="img-box">
                <img class="images" src="${image}" alt="">
            </div>
            <div class="bottom">
                <h3>${title}</h3>
                <h2>$${price}</h2>
                </div>
                <button class="item-btn" onclick="addtocart(${index})"> <i class="fa-solid fa-bag-shopping"></i> Add to Cart
                </button>
               
        </div>`;
  });
  return productHtml.join("");
}

document.getElementById("root").innerHTML = getProductHtml("box");
document.getElementById("root1").innerHTML = getProductHtml("box");
document.getElementById("root2").innerHTML = getProductHtml("box");
document.getElementById("root3").innerHTML = getProductHtml("box");

// to show items in cart

var cart = [];
function addtocart(index) {
  cart.push({ ...products[index] });
  displaycart();
  const message = `${products[index].title} has been added to your cart...`;
  cart_message.forEach((btn) => {
    btn.innerHTML = message;
  });
  setTimeout(() => {
    cart_message.forEach((btn) => {
      btn.innerHTML = "";
    });
  }, 2000);
  updateTotalCartBtn();
}
function updateTotalCartBtn() {
  const cartItemCount = cart.length;
  cartBtn.forEach((btn) => {
    btn.innerText = `${cartItemCount}`;
  });
}
function displaycart() {
  total = 0;
  if (cart.length === 0) {
    cartitem.innerHTML = "Your cart is empty";
    document.getElementById("totalcount").innerHTML = "$ 0.00";
  } else {
    cartitem.innerHTML = cart
      .map((item) => {
        const { image, title, price } = item;
        total = total + price;
        document.getElementById("totalcount").innerHTML = "$" + total + ".00";
        return `
          
            <div class="cart-items">
              <strong>${title}</strong>
              <h3>${price}</h3>
              <button class="item-btn" onclick="removefromcart(${cart.indexOf(
                item
              )})"><i class="fa fa-trash"></i></button>
            </div>
        `;
      })
      .join("");
  }
}

function removefromcart(index) {
  cart.splice(index, 1);
  displaycart();
  updateTotalCartBtn();
}
