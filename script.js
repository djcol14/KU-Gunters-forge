function navindex(){
    window.location.href = "index.html";
}

function opencart(){
    window.location.href = "cart.html";
}

function navorders(){
    window.location.href = "orders.html";
}

function openProduct(product){
    if(product === 'sword'){
        window.location.href = 'sword.html';   
    }else{
        if(product === "chainmail"){
            window.location.href = "chainmail.html";
        }else{
            if(product === "platearmor"){
                window.location.href = "platearmor.html";
            }else{
                if(product === "cookingpot"){
                    window.location.href = "cookingpot.html";
                }
            }
        }
    }
}


const products = {
    sword: {
        name: "Sword",
        price: 75
    },
    chainmail: {
        name: "Chainmail",
        price: 100
    },
    platearmor: {
        name: "Plate Armor",
        price: 200
    },
    cookingpot: {
        name: "Cooking Pot",
        price: 25
    }
};
let quantity = 1;

const productID = document.body.dataset.product;

const product = products[productID];

function updatePrice(){
    const totalPrice = product.price * quantity;
    
    document.getElementById("quantity").textContent = quantity;

    document.getElementById("total-price").textContent = totalPrice;
}

function changeQuantity(amount){
    quantity = quantity + amount;

    if(quantity < 1){
        quantity = 1;
    }
    updatePrice();
}

if (product) {
    updatePrice();
}

function addtocart(product){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let alreadyInCart = cart.some(function(item) {
        return item.product === product;
    });
    if (alreadyInCart) {
        alert("That item is already in your cart");
        return;
    }
    let quantity = Number(document.getElementById("quantity").textContent);
    let item = {
        product: product,
        quantity: quantity,
    }
    console.log(Array.isArray(cart));
    cart.push(item);
    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.href = "cart.html";
}

function displaycart(){
    console.log("displaycart function is running");
    let cart = JSON.parse(localStorage.getItem("cart"));
    console.log(cart);
    document.querySelector(".item-list").innerHTML = "";
    if (cart.length === 0){
        let cartEmptyDiv = document.createElement("div");
        cartEmptyDiv.textContent = "Cart is empty add an item to start";
        document.querySelector(".item-list").appendChild(cartEmptyDiv);
    }
    else{
        for (let i = 0; i < cart.length; i++){
            console.log("loop is running");
            let product = cart[i].product;
            let quantity = cart[i].quantity;
            let price = products[product].price;
            let itemTotalPrice = price * quantity;
            let itemDiv = document.createElement("div");
            let infoDiv = document.createElement("div");
            infoDiv.textContent = product + " x ";
            let itemTotalPriceDiv = document.createElement("span");
            itemTotalPriceDiv.textContent = itemTotalPrice + " gold";
            let productImage = document.createElement("img");
            if (product === "sword"){
                productImage.src = "assets/products/swordproduct.PNG";
            }else{
                if (product === "chainmail"){
                productImage.src = "assets/products/chainmailproduct.PNG"; 
                }else{
                    if (product === "platearmor"){
                        
                    }else{
                        if (product === "cookingpot"){
                        
                        }
                    }
                }
            }
            itemDiv.appendChild(productImage);
            document.querySelector(".item-list").appendChild(itemDiv);
            console.log("itemDiv appended");
            itemDiv.appendChild(infoDiv);
            let controlDiv = document.createElement("div");
            infoDiv.appendChild(controlDiv);
            let quantityDisplay = document.createElement("span");
            quantityDisplay.textContent = quantity;
            let subQuantitySelector = document.createElement("button");
            subQuantitySelector.textContent = "-";
            subQuantitySelector.addEventListener("click", function() {
                decreaseCartQuantity(i, quantityDisplay, itemTotalPriceDiv);
            });
            controlDiv.appendChild(subQuantitySelector);
            controlDiv.appendChild(quantityDisplay);
            let addQuantitySelector = document.createElement("button");
            addQuantitySelector.textContent = "+";
            addQuantitySelector.addEventListener("click", function() {
                increaseCartQuantity(i, quantityDisplay, itemTotalPriceDiv);
            });
            controlDiv.appendChild(addQuantitySelector);
            let removeItemButton = document.createElement("button");
            removeItemButton.textContent = "Remove";
            removeItemButton.addEventListener("click", function() {
                removeCartItem(i);
            });
            controlDiv.appendChild(removeItemButton);
            let pricingDiv = document.createElement("div");
            let individualPrice = document.createElement("span");
            individualPrice.textContent = price + " gold each ";
            pricingDiv.appendChild(individualPrice);
            pricingDiv.appendChild(itemTotalPriceDiv);
            infoDiv.appendChild(pricingDiv);
            calculateCartTotal();
        }
    }
}

function decreaseCartQuantity(i, quantityDisplay, itemTotalPriceDiv){
    console.log("DECREASE FUNCTION RAN");
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart[i].quantity--;
    let product = cart[i].product;
    let price = products[product].price;
    let itemTotalPrice = price * cart[i].quantity;
    itemTotalPriceDiv.textContent = itemTotalPrice + " gold";
    localStorage.setItem("cart", JSON.stringify(cart));
    quantityDisplay.textContent = cart[i].quantity;
    calculateCartTotal();
}

function increaseCartQuantity(i, quantityDisplay, itemTotalPriceDiv){
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart[i].quantity++;
    let product = cart[i].product;
    let price = products[product].price;
    let itemTotalPrice = price * cart[i].quantity;
    itemTotalPriceDiv.textContent = itemTotalPrice + " gold";
    localStorage.setItem("cart", JSON.stringify(cart));
    quantityDisplay.textContent = cart[i].quantity;
    calculateCartTotal();
}

function removeCartItem(i) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.splice(i,1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displaycart();
}

function calculateCartTotal(){
    let cart = JSON.parse(localStorage.getItem("cart"));
    let totalPrice = 0;
    for(let i = 0; i < cart.length; i++){
        let quantity = cart[i].quantity;
        let product = cart[i].product;
        let price = products[product].price;
        let itemTotalPrice = price * quantity;
        totalPrice += itemTotalPrice;
    }
    document.getElementById("total-price").textContent = totalPrice;
    return totalPrice;
}

function checkout(){
    console.log("Checkout is running")
    let cart = JSON.parse(localStorage.getItem("cart"));
    if(cart.length === 0){
       alert("You must first add an item to the cart to checkout");
       return;
    }else{
        window.location.href = "checkout.html";
    }
}

function displayCheckout(){
    let cart = JSON.parse(localStorage.getItem("cart"));
    for(let i = 0; i < cart.length; i++){
        let product = cart[i].product;
        let quantity = cart[i].quantity;
        let price = products[product].price;
        let itemTotalPrice = price * quantity;
        let checkoutItemDiv = document.createElement("div");
        checkoutItemDiv.classList.add("checkout-item");
        let infoDiv = document.createElement("div");
        infoDiv.textContent = product + " x " + quantity;
        let itemTotalPriceDiv = document.createElement("span");
        itemTotalPriceDiv.textContent = itemTotalPrice + " gold";
        infoDiv.appendChild(itemTotalPriceDiv);
        let productImage = document.createElement("img");
            if (product === "sword"){
                productImage.src = "assets/products/swordproduct.PNG";
            }else{
                if (product === "chainmail"){
                productImage.src = "assets/products/chainmailproduct.PNG"; 
                }else{
                    if (product === "platearmor"){
                        
                    }else{
                        if (product === "cookingpot"){
                        
                        }
                    }
                }
            }
        checkoutItemDiv.appendChild(productImage);
        checkoutItemDiv.appendChild(infoDiv);
        document.querySelector(".checkout-review").appendChild(checkoutItemDiv);
        calculateCartTotal();
    }
}

function placeOrder() {
    console.log("Order Placed");
    let lastOrderNumber = Number(localStorage.getItem("lastOrderNumber")) || 1000;
    let orderNumber = ++lastOrderNumber;
    localStorage.setItem("lastOrderNumber", JSON.stringify(orderNumber));
    let totalPrice = calculateCartTotal();
    let cart = JSON.parse(localStorage.getItem("cart"));
    let order = {
        orderNumber: orderNumber,
        items: cart,
        totalPrice: totalPrice,
        status: "Pending"
    };
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));
    localStorage.setItem("cart", JSON.stringify([]));
    localStorage.setItem("lastOrderNumber", JSON.stringify(orderNumber));
    window.location.href = "orderconfirmation.html";
}

function displayOrderConfirmation() {
    let orderNumber = localStorage.getItem("lastOrderNumber");
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    let order = orders.find(function(order) {
        return order.orderNumber === Number(orderNumber);
    });
    document.getElementById("order-number").textContent = orderNumber;
    let orderItems = document.getElementById("order-items");
    for (let i = 0; i < order.items.length; i++) {
        let item = order.items[i];
        let listItem = document.createElement("li");
        listItem.textContent = item.product + " x " + item.quantity + " - " + products[item.product].price * item.quantity + " gold";
        orderItems.appendChild(listItem);
    }
    document.getElementById("order-total").textContent = order.totalPrice;
}

function displayOrders() {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    let ordersList = document.querySelector(".orders-list");
    ordersList.innerHTML = "";
    if (orders.length === 0) {
        ordersList.innerHTML = "<p>You have no orders.</p>";
        return;
    }else {
        for (let i = 0; i < orders.length; i++) {
            let order = orders[i];
            let queuePosition = getQueuePosition(order.orderNumber);
            let itemsHTML = "";
            for (let j = 0; j < order.items.length; j++) {
                let item = order.items[j];
                itemsHTML += `<p>${item.product} x ${item.quantity}</p>`;
            }
            let orderDiv = document.createElement("div");
            orderDiv.innerHTML = `
                <h3>Order #${order.orderNumber}</h3>
                <div class="order-items">
                    ${itemsHTML}
                </div>
                <p>Total: ${order.totalPrice} gold</p>
                <p>Status:</p>
                <select class="order-status">
                    <option>Pending</option>
                    <option>Forging</option>
                    <option>Ready</option>
                    <option>Completed</option>
                </select>
                <p>${queuePosition === 0 ? (order.status === "Ready" ? "Order is ready" : "Completed") : `Queue position: ${queuePosition}`}</p>
            `;
            let statusSelect = orderDiv.querySelector(".order-status");
            statusSelect.value = order.status;
            statusSelect.addEventListener("change", function() {
                order.status = statusSelect.value;
                localStorage.setItem("orders", JSON.stringify(orders));
            });
            ordersList.appendChild(orderDiv);
        }
    }
}

function getQueuePosition(orderNumber) {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    let activeOrders = orders.filter(function(order) {
        return order.status === "Pending" || order.status === "Forging";
    });
    let position = activeOrders.findIndex(function(order) {
        return order.orderNumber === orderNumber;
    });
    return position + 1;
}

if (document.querySelector(".orders-list")) {
    displayOrders();
}

if (document.querySelector(".item-list")) {
    displaycart();
}

window.addEventListener("pageshow", displaycart);

if (document.querySelector(".order-details")) {
    displayOrderConfirmation();
}
        
if (document.querySelector(".checkout-review")) {
    displayCheckout();
}

console.log("SCRIPT IS RUNNING");