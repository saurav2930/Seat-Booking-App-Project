// import cart from "./iife.js"

import {addItem, getTotal,getCartContents} from "./iife.js"

addItem({ id: 1, name: "Product 1", price: 10 });
addItem({ id: 2, name: "Product 2", price: 20 });
addItem({ id: 3, name: "Product 3", price: 30 });

// Get the cart container element
const cartItemsElement = document.getElementById("cart-items");

// Display the cart contents
const cartContents = getCartContents();
cartContents.forEach((item) => {
  const listItem = document.createElement("li");
  listItem.textContent = `${item.name} - $${item.price}`;
  cartItemsElement.appendChild(listItem);
});

// Get the total price element
const totalPriceElement = document.getElementById("total-price");

// Display the total price
totalPriceElement.textContent = `Total: $${getTotal()}`;