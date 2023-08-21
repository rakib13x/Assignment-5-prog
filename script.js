//1.Apply Coupon:
function applyCoupon() {
  var couponInput = document.getElementById("couponInput");
  couponInput.value = "SELL200";
}

// Function to update selected product and calculate total price
function updateSelectedProduct(productIndex) {
  const productCards = document.querySelectorAll(".product-card");
  const makePurchaseButton = document.querySelector(
    ".w-full.bg-pink-500.rounded.mt-5.text-white"
  );
  const applyButton = document.querySelector(
    ".h-11.w-20.bg-pink-500.rounded-r.text-white"
  );
  const couponInput = document.getElementById("couponInput");
  const discountDisplay = document.getElementById("discountDisplay");
  const discountedTotalDisplay = document.getElementById(
    "discountedTotalDisplay"
  );
  const modal = document.getElementById("my_modal_1");

  // Initialize Make Purchase button state
  makePurchaseButton.disabled = true;
  makePurchaseButton.style.backgroundColor = "#ccc"; // Gray color

  // Initialize Apply button state
  applyButton.disabled = true;
  applyButton.style.backgroundColor = "#ccc"; // Gray color

  productCards.forEach(function (productCard) {
    productCard.addEventListener("click", function () {
      const productName = productCard.getAttribute("data-product-name");
      const productPrice = parseFloat(
        productCard.getAttribute("data-product-price")
      );

      // Calculate and update total price
      const totalPriceDisplay = document.getElementById("totalPriceDisplay");
      const currentTotal = parseFloat(totalPriceDisplay.textContent);
      const newTotal = currentTotal + productPrice;
      totalPriceDisplay.textContent = newTotal.toFixed(2) + " TK";

      // Call the functions to update buttons and displays
      updateMakePurchaseButton(newTotal);
      updateApplyButton(newTotal);
    });
  });

  // Function to enable/disable Make Purchase button
  function updateMakePurchaseButton(totalPrice) {
    if (totalPrice > 0) {
      makePurchaseButton.disabled = false;
      makePurchaseButton.style.backgroundColor = "#f472b6"; // Pink color
    } else {
      makePurchaseButton.disabled = true;
      makePurchaseButton.style.backgroundColor = "#ccc"; // Gray color
    }
  }

  // Function to enable/disable Apply button and input
  function updateApplyButton(totalPrice) {
    if (totalPrice >= 200) {
      applyButton.disabled = false;
      applyButton.style.backgroundColor = "#f472b6"; // Pink color
    } else {
      applyButton.disabled = true;
      applyButton.style.backgroundColor = "#ccc"; // Gray color
    }
  }

  // Function to apply the coupon
  function applyCoupon() {
    const totalPriceDisplay = document.getElementById("totalPriceDisplay");
    const currentTotal = parseFloat(totalPriceDisplay.textContent);

    if (currentTotal >= 200) {
      couponInput.value = "SELL200";

      // Calculate discount and update displays
      const discountPercentage = 20;
      const discount = (currentTotal * discountPercentage) / 100;
      const discountedTotal = currentTotal - discount;

      discountDisplay.textContent = `${discount.toFixed(2)} TK`;
      discountedTotalDisplay.textContent = `${discountedTotal.toFixed(2)} TK`;
    }
  }

  // JavaScript function to reset calculations and reload the current page
  function goHome() {
    // Reset selected products
    const selectedProductsList = document.getElementById(
      "selectedProductsList"
    );
    selectedProductsList.innerHTML = "";

    // Reset total price
    const totalPriceDisplay = document.getElementById("totalPriceDisplay");
    totalPriceDisplay.textContent = "0.00 TK";

    // Reset discount and total displays
    document.getElementById("discountDisplay").textContent = "0.00 TK";
    document.getElementById("discountedTotalDisplay").textContent = "0.00 TK";

    // Reset coupon input
    const couponInput = document.getElementById("couponInput");
    couponInput.value = "";

    // Disable Make Purchase and Apply buttons
    const makePurchaseButton = document.querySelector(".btn.mt-5");
    makePurchaseButton.disabled = true;
    makePurchaseButton.style.backgroundColor = "#ccc"; // Gray color

    const applyButton = document.querySelector(
      ".h-11.w-20.bg-pink-500.rounded-r.text-white"
    );
    applyButton.disabled = true;
    applyButton.style.backgroundColor = "#ccc"; // Gray color

    // Close the modal
    const modal = document.getElementById("my_modal_1");
    modal.close();

    // Reload the current page
    window.location.reload();
  }

  var selectedProductCard = document.querySelector(
    '[data-product-index="' + productIndex + '"]'
  );
  var selectedProductName =
    selectedProductCard.getAttribute("data-product-name");
  var selectedProductPrice = parseFloat(
    selectedProductCard.getAttribute("data-product-price")
  );

  var selectedProductNameElement = document.getElementById(
    "selectedProductName"
  );
  var selectedProductPriceElement = document.getElementById(
    "selectedProductPrice"
  );

  selectedProductNameElement.textContent = selectedProductName;
  selectedProductPriceElement.textContent =
    selectedProductPrice.toFixed(2) + " TK";

  calculateTotal();
}

// Function to calculate total price
function calculateTotal() {
  var selectedProductPrices = [];

  for (var i = 0; i < selectedProducts.length; i++) {
    var index = selectedProducts[i];
    selectedProductPrices.push(productPrices[index]);
  }

  var totalPrice = 0;
  for (var j = 0; j < selectedProductPrices.length; j++) {
    totalPrice += selectedProductPrices[j];
  }

  var discount = 0.2; // 20% discount
  var discountedTotal = totalPrice * (1 - discount);

  var totalPriceElement = document.getElementById("totalPrice");
  totalPriceElement.textContent = discountedTotal.toFixed(2) + " TK";
}

// Array to keep track of selected product indices
var selectedProducts = [];

// Event listener for product card clicks
var productCards = document.querySelectorAll(".product-card");
for (var k = 0; k < productCards.length; k++) {
  productCards[k].addEventListener("click", function () {
    var productIndex = parseInt(this.getAttribute("data-product-index"));

    if (selectedProducts.indexOf(productIndex) === -1) {
      selectedProducts.push(productIndex);
    }

    updateSelectedProduct(productIndex);
  });
}
