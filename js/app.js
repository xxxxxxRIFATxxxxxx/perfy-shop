// Define UI
const productDetails = document.getElementById("product-details");

// Fetch API
const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};

loadProducts();

// Create Single Product Card In UI
const singleProduct = product => {
  const div = document.createElement("div");
  div.setAttribute("class", "card h-100 border-primary shadow-box bg-secondary");
  div.innerHTML = `
  <img src="${product.image}" class="card-img-top w-50 m-auto p-2" alt="${product.title}">
  <div class="card-body text-white">
    <h5 class="card-title">${product.title}</h5>
    <p class="card-text">Category: ${product.category}</p>
    <h6 class="card-title">Rating: ${product.rating.rate}</h6>
    <h6 class="card-title">Total Rating: ${product.rating.count}</h6>
    <h3 class="card-title">Price $ ${product.price}</h3>
  </div>

  <div class="card-footer">
    <button onclick="addToCart(${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>

    <button id="details-btn" class="btn btn-danger" onclick="showDetails(${product.id})">Details</button>
  </div>
  `;
  return div;
};

// show all product in UI 
const showProducts = products => {
  const allProducts = products.map(pd => pd);
  for (const product of allProducts) {
    const div = singleProduct(product);
    document.getElementById("all-products").appendChild(div);
  };
};

// Update Cart
let count = 0;
const addToCart = (price) => {
  count = count + 1;
  updatePrice("price", price);
  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  updateTotal();
};

// Get Input Value
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};

// Show Product Details
const showDetails = id => {
  const url = `https://fakestoreapi.com/products/${id}`;
  fetch(url)
    .then(res => res.json())
    .then(data => {
      const div = singleProduct(data);
      productDetails.innerHTML = "";
      productDetails.appendChild(div);
    });
};
