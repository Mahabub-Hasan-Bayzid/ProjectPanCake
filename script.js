const pancakeForm = document.querySelector("#pancakeForm");
const totalPriceDisplay = document.querySelector("#totalPriceDisplay");
const totalPriceBanner = document.querySelector("#totalPrice");
const seeOrderBtn = document.querySelector("#seeOrder");
const summaryText = document.querySelector("#summaryText");
const placeOrderBtn = document.querySelector("#placeOrder");
const showOrdersBtn = document.querySelector("#showOrders");
const ordersModal = document.querySelector("#ordersModal");
const closeBtn = document.querySelector(".closeBtn");
const ordersTableBody = document.querySelector("#ordersTable tbody");








let selectedToppings = [];
let selectedExtras = [];
let orders = JSON.parse(localStorage.getItem("orders")) || [];


const changeHandler = () => {
  const pancakeType = document.querySelector("#type");
  const basePrice = parseFloat(pancakeType.selectedOptions[0].dataset.price);


  selectedToppings = Array.from(
    document.querySelectorAll(".topping:checked")
  ).map((el) => el.parentElement.textContent.trim());

  selectedExtras = Array.from(document.querySelectorAll(".extra:checked")).map(
    (el) => {
      return {
        name: el.parentElement.textContent.trim(),
        price: parseFloat(el.dataset.price),
      };
    }
  );



  let toppingsPrice = selectedToppings.length * 1;
  let extrasPrice = selectedExtras.reduce((sum, item) => sum + item.price, 0);
  const deliveryOption = document.querySelector(".delivery:checked");
  const deliveryPrice = parseFloat(deliveryOption.dataset.price);

  const total = basePrice + toppingsPrice + extrasPrice + deliveryPrice;


  totalPriceDisplay.textContent = total + "€";
  totalPriceBanner.textContent = total + "€";
};



// Order Details
const showOrder = () => {
  const customerName = document.querySelector("#customerName").value || "Customer";
  const pancakeType = document.querySelector("#type");
  const selectedPancake = pancakeType.options[pancakeType.selectedIndex].text;
  const deliveryMethod = document.querySelector(".delivery:checked").parentElement.textContent.trim();



  let orderSummary = `
    <strong>Name:</strong> ${customerName}<br>
    <strong>Pancake:</strong> ${selectedPancake}<br>
    <strong>Toppings:</strong> ${selectedToppings.length > 0 ? selectedToppings.join(", ") : "None"}<br>
    <strong>Extras:</strong> ${
      selectedExtras.length > 0
        ? selectedExtras.map((ex) => ex.name).join(", ")
        : "None"
    }<br>
    <strong>Delivery:</strong> ${deliveryMethod}<br>
    <strong>Total:</strong> ${totalPriceDisplay.textContent}
  `;

  summaryText.innerHTML = orderSummary;
};


// Inserting orderd datcLocal storage
const placeOrder = () => {
  const customerName = document.querySelector("#customerName").value || "Customer";
  const pancakeType = document.querySelector("#type");
  const selectedPancake = pancakeType.options[pancakeType.selectedIndex].text;
  const deliveryMethod = document.querySelector(".delivery:checked").parentElement.textContent.trim();
  const totalPrice = parseFloat(totalPriceDisplay.textContent);



  const newOrder = {
    id: Date.now(),
    customerName: customerName,
    selectedPancake: selectedPancake,
    toppings: selectedToppings,
    extras: selectedExtras.map((e) => e.name),
    deliveryMethod: deliveryMethod,
    totalPrice: totalPrice,
    status: "waiting"
  };

  orders.push(newOrder);
  localStorage.setItem("orders", JSON.stringify(orders));
  Swal.fire({
    title: 'Order Placed! 🥞',
    text: 'Thank you for your order. We’re on it!',
    icon: 'success',
    confirmButtonColor: 'rgb(33 70 75)',
    confirmButtonText: 'Awesome!'
  })
};

// Ordered list
const showOrders = () => {
  ordersTableBody.innerHTML = "";
  orders.forEach((order) => {
    let tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${order.id}</td>
      <td>${order.customerName}</td>
      <td>${order.selectedPancake}</td>
      <td>${order.toppings.join(", ") || "None"}</td>
      <td>${order.extras.join(", ") || "None"}</td>
      <td>${order.deliveryMethod}</td>
      <td>${order.totalPrice}€</td>
      <td>
        <select data-id="${order.id}" class="statusSelect">
          <option value="waiting" ${order.status === "waiting" ? "selected" : ""}>Waiting</option>
          <option value="ready" ${order.status === "ready" ? "selected" : ""}>Ready</option>
          <option value="delivered" ${order.status === "delivered" ? "selected" : ""}>Delivered</option>
        </select>
      </td>
    `;

    
    tr.className = getStatusClass(order.status);
    ordersTableBody.appendChild(tr);
  });




// Updating status
  document.querySelectorAll(".statusSelect").forEach((select) => {
    select.addEventListener("change", (e) => {
      const id = parseInt(e.target.dataset.id);
      const newStatus = e.target.value;
      const order = orders.find((o) => o.id === id);
      order.status = newStatus;
      localStorage.setItem("orders", JSON.stringify(orders));
      showOrders();
    });
  });
};

// I've taken some help from ai for status change in ordered lists!

const getStatusClass = (status) => {
  if (status === "waiting") return "status-waiting";
  if (status === "ready") return "status-ready";
  if (status === "delivered") return "status-delivered";
  return "";
};




// event listeners
pancakeForm.addEventListener("change", changeHandler);
seeOrderBtn.addEventListener("click", showOrder);
placeOrderBtn.addEventListener("click", placeOrder);

showOrdersBtn.addEventListener("click", () => {
  orders = JSON.parse(localStorage.getItem("orders")) || [];
  showOrders();
  ordersModal.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  ordersModal.style.display = "none";
});
