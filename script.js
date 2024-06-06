// Get elements
const cartButton = document.querySelector(".cart-button");
const cartBadge = document.querySelector(".cart-badge");
const modal = document.querySelector(".modal");
const modalClose = document.querySelector(".close");
const buyButton = document.querySelector(".buy-btn");
const cartItemsList = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const itemsGrid = document.querySelector(".items-grid");
const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");

let items = [
  {
    id: 1,
    name: "Apple",
    price: 0.99,
    image: "images/apple.png",
  },
  {
    id: 2,
    name: "Banana",
    price: 10,
    image: "images/banana.png",
  },
  {
    id: 3,
    name: "Orange",
    price: 1.99,
    image: "images/orange.png",
  },
  {
    id: 4,
    name: "Mango",
    price: 2.99,
    image: "images/mango.png",
  },
  {
    id: 5,
    name: "Pineapple",
    price: 3.99,
    image: "images/pineapple.png",
  },
  {
    id: 6,
    name: "Grapes",
    price: 4.99,
    image: "images/grapes.png",
  },
  {
    id: 7,
    name: "Strawberry",
    price: 5.99,
    image: "images/strawberry.png",
  },
];

let cart = [];

function fillItemsGrid() {
  for (const item of items) {
    let itemElement = document.createElement("div");
    itemElement.classList.add("item");
    itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h2>${item.name}</h2>
            <p>$${item.price}</p>
            <button class="add-to-cart-btn" data-id="${item.id}">Add to cart</button>
        `;
    itemsGrid.appendChild(itemElement);
  }
}

function toggleModal() {
  modal.classList.toggle("show-modal");
}

fillItemsGrid();

cartButton.addEventListener("click", toggleModal);
modalClose.addEventListener("click", toggleModal);

itemsGrid.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart-btn")) {
    let itemId = parseInt(e.target.getAttribute("data-id"));
    let item = items.find((item) => item.id === itemId);

    let cartItem = cart.find((cartItem) => cartItem.id === itemId);
    if (cartItem) {
      cartItem.quantity++;
    } else {
      item.quantity = 1;
      cart.push(item);
    }

    updateCart();
  }
});

function updateCart() {
  cartItemsList.innerHTML = "";
  let total = 0;
  for (const item of cart) {
    let cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
        <h3>${item.name}</h3>
        <p>Quantity: ${item.quantity}</p>
        <p>Price per item: $${item.price}</p>
        <p>Total for this item: $${(item.price * item.quantity).toFixed(2)}</p>
        <button class="reduce-quantity-btn" data-id="${
          item.id
        }">Reduce Quantity</button>
      `;
    cartItemsList.appendChild(cartItem);
    total += item.price * item.quantity;
  }
  cartTotal.textContent = `$${total.toFixed(2)}`;
  cartBadge.textContent = cart.length;
}

cartItemsList.addEventListener("click", (e) => {
  if (e.target.classList.contains("reduce-quantity-btn")) {
    let itemId = parseInt(e.target.getAttribute("data-id"));
    let cartItem = cart.find((cartItem) => cartItem.id === itemId);
    if (cartItem.quantity > 1) {
      cartItem.quantity--;
    } else {
      cart = cart.filter((cartItem) => cartItem.id !== itemId);
    }
    updateCart();
  }
});

function showMessage(message) {
  // Create the outer modal div
  let modal = document.createElement("div");
  modal.style.position = "fixed";
  modal.style.top = "0";
  modal.style.left = "0";
  modal.style.width = "100%";
  modal.style.height = "100%";
  modal.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  modal.style.display = "flex";
  modal.style.justifyContent = "center";
  modal.style.alignItems = "center";
  modal.style.zIndex = "1000";

  let messageDiv = document.createElement("div");
  messageDiv.style.backgroundColor = "white";
  messageDiv.style.padding = "20px";
  messageDiv.style.borderRadius = "10px";
  messageDiv.textContent = message;

  modal.appendChild(messageDiv);

  document.body.appendChild(modal);

  setTimeout(() => {
    document.body.removeChild(modal);
  }, 2000);
}

buyButton.addEventListener("click", () => {
  if (cart.length === 0) {
    toggleModal();
    showMessage("Ne možete kupiti artikle jer je vaša košarica prazna.");
  } else {
    cart = [];
    updateCart();
    toggleModal();
    showMessage("Kupovina je uspješna. Hvala na kupovini!");
  }
});
