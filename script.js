// Homepage Navigation
function navindex(){
    window.location.href = "index.html";
}

// Cart Navigation
function opencart(){
    window.location.href = "cart.html";
}

// Navigation to Gunters order control page
function navorders(){
    window.location.href = "gunter.html";
}

// Function recevies a product ID and navigates to the product page for that item
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

// products object that stores information like price and name for each product
// accessed in later functions to keep prices and products consistent 
// makes adding new items easier
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

// Gunters access password that acts as a gate to get into Gunters Controls
// No real security
// DEMO only
const GUNTER_ACCESS_PASSWORD = "forgekeeper";

// created with the help of git copilot
// all code reviewed and commented by the developer to ensure functionality and maintain good standing with competition rules
// Default inventory levels for each material
// Sets max capicity for each material in inventory
// Used when initializing or refreshing inventory
const forgeInventoryDefaults = {
    iron: { name: "Iron", stock: 160, capacity: 200 },
    leather: { name: "Leather", stock: 70, capacity: 100 },
    wood: { name: "Wood", stock: 65, capacity: 100 },
    jewels: { name: "Jewels", stock: 24, capacity: 40 },
    padding: { name: "Padding", stock: 45, capacity: 60 }
};
// created with the help of git copilot
// all code reviewed and commented by the developer to ensure functionality and maintain good standing with competition rules
// Sets the required materials to create 1 ofeach item
const forgingRecipes = {
    sword: { iron: 5, leather: 1, wood: 2, jewels: 1 },
    chainmail: { iron: 8, leather: 1, padding: 1 },
    platearmor: { iron: 12, leather: 2, padding: 3 },
    cookingpot: { iron: 4, wood: 1 }
};

// defines array with order statuses to track orders
const ORDER_STATUSES = ["Pending", "Forging", "Ready", "Completed"];

let quantity = 1;

// Gets the product ID from the HTML
const productID = document.body.dataset.product;

// Gets the product information from the object based the the ID
const product = products[productID];

// all code reviewed and commented by the developer to ensure functionality and maintain good standing with competition rules
// Updates the product price display based on the current quantity and object price
function updatePrice(){
    // Calcualtes the total price for each object
    const totalPrice = product.price * quantity;
    
    document.getElementById("quantity").textContent = quantity;

    document.getElementById("total-price").textContent = totalPrice;
}

// all code reviewed and commented by the developer to ensure functionality and maintain good standing with competition rules
// Quantity changes by requested amount
// prtects aginst edge case for falling below 1
function changeQuantity(amount){
    quantity = quantity + amount;
    if(quantity < 1){
        quantity = 1;
    }
    updatePrice();
}

// runs updatePrice if product exists
if (product) {
    updatePrice();
}

// all code reviewed and commented by the developer to ensure functionality and maintain good standing with competition rules
// Adds an item to the cart from product page
function addtocart(product){
    // gets the cart from local storage or if empty initalizes it as an array
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    // checks if product is already in cart
    let alreadyInCart = cart.some(function(item) {
        return item.product === product;
    });
    // if the product is already in the cart show an alert and end function
    if (alreadyInCart) {
        alert("That item is already in your cart");
        return;
    }
    let quantity = Number(document.getElementById("quantity").textContent);
    // Creates an item object with the product and quantity
    let item = {
        product: product,
        quantity: quantity,
    }
    // saves cart to local storage
    cart.push(item);
    localStorage.setItem("cart", JSON.stringify(cart));
    // navigates to cart page
    window.location.href = "cart.html";
}

// all code reviewed and commented by the developer to ensure functionality and maintain good standing with competition rules
function displaycart(){
    // retrieves cart from local storage 
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    document.querySelector(".item-list").innerHTML = "";
    // controls edge case for empty cart and displays cart empty messege
    if (cart.length === 0){
        let cartEmptyDiv = document.createElement("div");
        cartEmptyDiv.textContent = "Cart is empty add an item to start";
        document.querySelector(".item-list").appendChild(cartEmptyDiv);
    }
    else{
        // loop through each item in the cart
        // creates dynamic elements for each item in the cart
        for (let i = 0; i < cart.length; i++){
            let product = cart[i].product;
            let quantity = cart[i].quantity;
            let price = products[product].price;
            // price is calculatd by multiplying the price by the quantity
            let itemTotalPrice = price * quantity;
            let itemDiv = document.createElement("div");
            // sets up the info div to create an html cascade
            let infoDiv = document.createElement("div");
            infoDiv.textContent = product;
            let itemTotalPriceDiv = document.createElement("span");
            itemTotalPriceDiv.textContent = itemTotalPrice + " gold";
            let productImage = document.createElement("img");
            // sets the image based on the product
            if (product === "sword"){
                productImage.src = "assets/products/swordproduct.PNG";
            }else{
                if (product === "chainmail"){
                productImage.src = "assets/products/chainmailproduct.PNG"; 
                }else{
                    if (product === "platearmor"){
                        productImage.src = "assets/products/platearmorproduct.PNG";
                    }else{
                        if (product === "cookingpot"){
                            productImage.src = "assets/products/cookingpotproduct.PNG";
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
            // sets up the control div to change quantity
            let quantityDisplay = document.createElement("span");
            quantityDisplay.textContent = quantity;
            let subQuantitySelector = document.createElement("button");
            subQuantitySelector.textContent = "-";
            // adds an event listenter to the subtract button
            subQuantitySelector.addEventListener("click", function() {
                // when button is clicked this function runs with the parameters provided
                decreaseCartQuantity(i, quantityDisplay, itemTotalPriceDiv);
            });
            controlDiv.appendChild(subQuantitySelector);
            controlDiv.appendChild(quantityDisplay);
            let addQuantitySelector = document.createElement("button");
            addQuantitySelector.textContent = "+";
            // repeaded code format from the subtract button
            addQuantitySelector.addEventListener("click", function() {
                increaseCartQuantity(i, quantityDisplay, itemTotalPriceDiv);
            });
            controlDiv.appendChild(addQuantitySelector);
            // sets up remove item button and refrences an external function 
            let removeItemButton = document.createElement("button");
            removeItemButton.textContent = "Remove";
            removeItemButton.addEventListener("click", function() {
                // parameter i passes the index of the item to remove
                removeCartItem(i);
            });
            controlDiv.appendChild(removeItemButton);
            // sets up the pricing div to display price information
            let pricingDiv = document.createElement("div");
            pricingDiv.className = "cart-pricing";
            let individualPrice = document.createElement("span");
            individualPrice.textContent = price + " gold each";
            pricingDiv.appendChild(individualPrice);
            pricingDiv.appendChild(itemTotalPriceDiv);
            infoDiv.appendChild(pricingDiv);
            // refrences function to calulate and display the total
            calculateCartTotal();
        }
    }
}

// all code reviewed and commented by the developer to ensure functionality and maintain good standing with competition rules
function decreaseCartQuantity(i, quantityDisplay, itemTotalPriceDiv){
    // gets cart from local storage
    let cart = JSON.parse(localStorage.getItem("cart"));
    // prevents edge case where quantity goes below 1
    if (cart[i].quantity <= 1) {
        return;
    }
    // decreases the quantity by 1
    cart[i].quantity--;
    // recalculates the total price for the item
    let product = cart[i].product;
    let price = products[product].price;
    let itemTotalPrice = price * cart[i].quantity;
    // updated the display with new values
    itemTotalPriceDiv.textContent = itemTotalPrice + " gold";
    // sets new values back to local storage
    localStorage.setItem("cart", JSON.stringify(cart));
    quantityDisplay.textContent = cart[i].quantity;
    // recalculates the total price of the cart
    calculateCartTotal();
}

// all code reviewed and commented by the developer to ensure functionality and maintain good standing with competition rules
// uses the same format as the decrease function without the edge case protection
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

// all code reviewed and commented by the developer to ensure functionality and maintain good standing with competition rules
// removes an item stored at index i from cart
function removeCartItem(i) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.splice(i,1);
    localStorage.setItem("cart", JSON.stringify(cart));
    // reruns the display function to update the cart display
    displaycart();
}

// all code reviewed and commented by the developer to ensure functionality and maintain good standing with competition rules
// calculates the total price of all items in the cart
function calculateCartTotal(){
    let cart = JSON.parse(localStorage.getItem("cart"));
    // starts the total price at 0
    let totalPrice = 0;
    // loops through each item in the cart
    for(let i = 0; i < cart.length; i++){
        let quantity = cart[i].quantity;
        let product = cart[i].product;
        // calculates the subtotal for each item
        let price = products[product].price;
        let itemTotalPrice = price * quantity;
        // adds the item's subtotal to the total price
        totalPrice += itemTotalPrice;
    }
    // updates the display with the new total price
    document.getElementById("total-price").textContent = totalPrice;
    // gives the total price back to the function that called it
    return totalPrice;
}

// all code reviewed and commented by the developer to ensure functionality and maintain good standing with competition rules
function checkout(){
    let cart = JSON.parse(localStorage.getItem("cart"));
    // protects against empty cart edge case by sending an alert and ending function
    if(cart.length === 0){
       alert("You must first add an item to the cart to checkout");
       return;
    }else{
        // navigates to the checkout page
        window.location.href = "checkout.html";
    }
}

// all code reviewed and commented by the developer to ensure functionality and maintain good standing with competition rules
function displayCheckout(){
    //reads the cart from local storage
    let cart = JSON.parse(localStorage.getItem("cart"));
    // loops through each item in the cart
    // creates checkout view dynamically
    for(let i = 0; i < cart.length; i++){
        // uses the same information as the cart function
        let product = cart[i].product;
        let quantity = cart[i].quantity;
        let price = products[product].price;
        let itemTotalPrice = price * quantity;
        // sets div for html cascade and css formating
        let checkoutItemDiv = document.createElement("div");
        // adds a class to the div for css
        checkoutItemDiv.classList.add("checkout-item");
        let infoDiv = document.createElement("div");
        infoDiv.textContent = product + " x " + quantity;
        let itemTotalPriceDiv = document.createElement("span");
        itemTotalPriceDiv.textContent = itemTotalPrice + " gold";
        infoDiv.appendChild(itemTotalPriceDiv);
        let productImage = document.createElement("img");
        // sets the product image based on the product name
            if (product === "sword"){
                productImage.src = "assets/products/swordproduct.PNG";
            }else{
                if (product === "chainmail"){
                productImage.src = "assets/products/chainmailproduct.PNG"; 
                }else{
                   if (product === "platearmor"){
                        productImage.src = "assets/products/platearmorproduct.PNG";
                    }else{
                        if (product === "cookingpot"){
                            productImage.src = "assets/products/cookingpotproduct.PNG";
                        }
                    }
                }
            }
        checkoutItemDiv.appendChild(productImage);
        checkoutItemDiv.appendChild(infoDiv);
        // adds the created element to the DOM
        document.querySelector(".checkout-review").appendChild(checkoutItemDiv);
        // calculates the checkout total
        calculateCartTotal();
    }
}

// Written with the help of git copilot 
// all code reviewed and commented by the developer to ensure functionality and maintain good standing with competition rules
// function is run and event is passed when html form is submitted
function placeOrder(event) {
    // prevents the default form submission behavior
    event.preventDefault();
    // gets the customer name from the element, trims white space
    let customerName = document.getElementById("customer-name").value.trim();
    // validates that the customer name is provided
    if (!customerName) {
        return;
    }
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    // runs the getMaterialShortages function to check for material shortages in the order
    // cart is passed into function as item parameter
    // loadForgeInventory() gets the forge inventory
    let shortages = getMaterialShortages({ items: cart }, loadForgeInventory());
    // Warn customers about shortages and let them choose whether to continue.
    let checkoutForm = document.getElementById("checkout-form");
    let shortageConfirmed = checkoutForm.dataset.materialShortageConfirmed === "true";
    delete checkoutForm.dataset.materialShortageConfirmed;
    if (shortages.length > 0 && !shortageConfirmed) {
        document.getElementById("material-shortage-dialog").showModal();
        return;
    }
    // gets last order number from localStorage or sets it to 1000
    let lastOrderNumber = Number(localStorage.getItem("lastOrderNumber")) || 1000;
    // sets new order number
    let orderNumber = ++lastOrderNumber;
    // resets the last order number to the new order number
    localStorage.setItem("lastOrderNumber", JSON.stringify(orderNumber));
    let totalPrice = calculateCartTotal();
    // creates the order object from the cart and provided data
    let order = {
        orderNumber: orderNumber,
        customerName: customerName,
        items: cart,
        totalPrice: totalPrice,
        status: "Pending"
    };
    // saves the order to localStorage in orders array
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));
    // clears the cart for next order
    localStorage.setItem("cart", JSON.stringify([]));
    // navigates to the order confirmation page
    window.location.href = "orderconfirmation.html";
}

function setupMaterialShortageConfirmation() {
    let dialog = document.getElementById("material-shortage-dialog");
    let checkoutForm = document.getElementById("checkout-form");
    if (!dialog || !checkoutForm) {
        return;
    }

    dialog.addEventListener("close", function() {
        if (dialog.returnValue !== "continue") {
            return;
        }
        checkoutForm.dataset.materialShortageConfirmed = "true";
        checkoutForm.requestSubmit();
    });
}

// created with the help of git copilot
// all code reviewed and commented by the developer to ensure functionality and maintain good standing with competition rules
// displays the order confirmation page with customer and order details
function displayOrderConfirmation() {
    // gets the order data from localStorage
    let orderNumber = localStorage.getItem("lastOrderNumber");
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    // finds the order in the orders array using the order number
    let order = orders.find(function(order) {
        return order.orderNumber === Number(orderNumber);
    });
    document.getElementById("order-number").textContent = orderNumber;
    let customerName = document.getElementById("order-customer-name");
    // if there is a customer name in the object display it if not leave blank
    if (customerName) {
        customerName.textContent = order.customerName || "";
    }
    let orderItems = document.getElementById("order-items");
    // loops through each item in the order and creates a list item for it
    for (let i = 0; i < order.items.length; i++) {
        let item = order.items[i];
        let listItem = document.createElement("li");
        listItem.textContent = item.product + " x " + item.quantity + " - " + products[item.product].price * item.quantity + " gold";
        orderItems.appendChild(listItem);
    }
    document.getElementById("order-total").textContent = order.totalPrice;
}

// created with the help of git copilot
// all code reviewed and commented by the developer to ensure functionality and maintain good standing with competition rules
// displays all orders in the system for Gunters access
function displayOrders() {
    // gets all orders from localStorage
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    // sets active orders to all orders that are not completed
    let activeOrders = orders.filter(function(order) {
        return order.status !== "Completed";
    });
    let ordersList = document.querySelector(".orders-list");
    ordersList.innerHTML = "";
    // protects against empty active orders edge case
    if (activeOrders.length === 0) {
        ordersList.innerHTML = "<p>No active orders.</p>";
        return;
    }else {
        // if there are active orders loop through them and make a div for each
        for (let i = 0; i < activeOrders.length; i++) {
            let order = activeOrders[i];
            // gets the queue position from the function 
            let queuePosition = getQueuePosition(order.orderNumber);
            let itemsHTML = "";
            // loops through each item in the order 
            for (let j = 0; j < order.items.length; j++) {
                let item = order.items[j];
                // creates the HTML for each item in the order
                itemsHTML += `<p>${item.product} x ${item.quantity}</p>`;
            }
            let orderDiv = document.createElement("div");
            // creates the content for the order div
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
            let customerName = document.createElement("p");
            // adds the customer name to the order div or shows not provided
            customerName.textContent = "Customer: " + (order.customerName || "Not provided");
            // moves the customer name to after order number
            orderDiv.insertBefore(customerName, orderDiv.children[1]);
            let statusSelect = orderDiv.querySelector(".order-status");
            statusSelect.value = order.status;
            // disables options that are not valid for the current order status
            // finds the index of the current order status in the array of statuses
            let currentStatusIndex = ORDER_STATUSES.indexOf(order.status);
            // creates an array of the status options and gives them an index
            Array.from(statusSelect.options).forEach(function(option, index) {
                // disables options that are not the next option in the sequence
                option.disabled = index < currentStatusIndex || index > currentStatusIndex + 1;
            });
            // when the status is changed run function to update order status
            statusSelect.addEventListener("change", function() {
                // runs the updateOrderStatus function with the order number and new status
                let result = updateOrderStatus(order.orderNumber, statusSelect.value);
                // if the update was not successful show an alert from the function
                if (!result.success) {
                    // displays message returned by updateOrderStatus
                    alert(result.message);
                }
                // refreshes the order list
                displayOrders();
            });
            ordersList.appendChild(orderDiv);
        }
    }
}

// created with the help of git copilot
// all code reviewed and commented by the developer to ensure functionality and maintain good standing with competition rules
// finds position in the queue using the order number
function getQueuePosition(orderNumber) {
    // gets the list of orders from local storage
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    // filters the orders to only include pending and forging orders
    let activeOrders = orders.filter(function(order) {
        // returns true to the filter if the order is pending or forging
        return order.status === "Pending" || order.status === "Forging";
    });
    // finds the index of the order in the filtered list
    let position = activeOrders.findIndex(function(order) {
        return order.orderNumber === orderNumber;
    });
    return position + 1;
}

// created with the help of git copilot
// all code reviewed and commented by the developer to ensure functionality and maintain good standing with competition rules
// loads the saved forge inventory and checks that the values are valid
// fills any missing values with defaults
function loadForgeInventory() {
    // gets the forge inventory from local storage or uses defaults
    let savedInventory = JSON.parse(localStorage.getItem("forgeInventory")) || {};
    // creates an object to hold the inventory
    let inventory = {};
    // gets the default materials array and loops through each name 
    // passes material name to the function
    Object.keys(forgeInventoryDefaults).forEach(function(material) {
        // gets the default material from object established earlier
        let defaultMaterial = forgeInventoryDefaults[material];
        // gets the saved material from local storage or uses defaults
        let savedMaterial = savedInventory[material] || {};
        // gets the stock value and converts it to a number
        let stock = Number(savedMaterial.stock);
        // builds the inventory object for each material
        inventory[material] = {
            name: defaultMaterial.name,
            capacity: defaultMaterial.capacity,
            // checks if the stock value is a finite number
            stock: Number.isFinite(stock)
                // Math.min picks the smaller value between the default capacity and the saved stock
                // ensures stock doesnt exceed max capacity
                // Math.max ensures the stock is never negative which prevents edge case
                ? Math.max(0, Math.min(defaultMaterial.capacity, stock))
                // if the stock is not a finite number, use the default stock value
                : defaultMaterial.stock
        };
    });
    // returns the loaded inventory to the function that requested it
    return inventory;
}

// created with the help of git copilot
// all code reviewed and commented by the developer to ensure functionality and maintain good standing with competition rules
// calculates the amount of materials needed to fulfill an order based on quantity and recipes
/*let order = {
        orderNumber: orderNumber,
        customerName: customerName,
        items: cart,
        totalPrice: totalPrice,
        status: "Pending"
    };*/
function getOrderMaterialNeeds(order) {
    // initializes an object to hold the materials needed for the order
    let requiredMaterials = {};
    // initiallizes all materials in defult inventory to 0 so that we can track the required amount for each material
    Object.keys(forgeInventoryDefaults).forEach(function(material) {
        requiredMaterials[material] = 0;
    });
    // uses order items array or empty array if it doesn't exist to avoid errors when iterating
    // goes through each item in the order and calculates the required materials based on the recipe
    (order.items || []).forEach(function(item) {
        // retrives the recipe for the item from the forging recipes object
        let recipe = forgingRecipes[item.product] || {};
        // goes through each material in the required materials object and adds the materials that are needed
        Object.keys(requiredMaterials).forEach(function(material) {
            // multiplies the required amount of the material by the quantity of the item
            // adds it to the total required materials
            requiredMaterials[material] += (recipe[material] || 0) * Number(item.quantity || 0);
        });
    });
    // gives required materials for the order back to the parent function
    return requiredMaterials;
}


// created with the help of git copilot
// all code reviewed and commented by the developer to ensure functionality and maintain good standing with competition rules
// calculates the shortages of materials based on the order requirments and current inventory
// returns array representing the shortages contains the material name needed amount and available amount
function getMaterialShortages(order, inventory) {
    // gets the material needs for the order from the getOrderMaterialNeeds function
    let materialNeeds = getOrderMaterialNeeds(order);
    // loops through all materials needed for the order 
    // gives name to materials using keys
    return Object.keys(materialNeeds).filter(function(material) {
        // returns true for the materials where the current stock is less than the required amount
        return inventory[material].stock < materialNeeds[material];
        // loops through each material shortage and creates a messege that is returned to the parent function
    }).map(function(material) {
        return {
            name: inventory[material].name,
            needed: materialNeeds[material],
            available: inventory[material].stock
        };
    });
}

// created with the help of git copilot
// all code reviewed and commented by the developer to ensure functionality and maintain good standing with competition rules
// updates the status of an order when Gunter changes the status of the order
// order number and new status are required parameters
function updateOrderStatus(orderNumber, newStatus) {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    // finds the order based on the order number
    let order = orders.find(function(savedOrder) {
        return savedOrder.orderNumber === orderNumber;
    });
    // if the order is not found a failure message is returned
    if (!order) {
        return { success: false, message: "Order could not be found." };
    }

    // gets the current status index and the new status index
    let currentStatusIndex = ORDER_STATUSES.indexOf(order.status);
    let newStatusIndex = ORDER_STATUSES.indexOf(newStatus);
    // checks if the new status is the next status in the order progression
    if (currentStatusIndex < 0 || newStatusIndex !== currentStatusIndex + 1) {
        return { success: false, message: "Orders must advance one phase at a time." };
    }

    // if the new status is "Forging" and the materials have not been consumed yet
    // checks if the order has enough materials to proceed to forging
    if (newStatus === "Forging" && !order.materialsConsumed) {
        // gets inventory and material needs for the order
        let inventory = loadForgeInventory();
        let materialNeeds = getOrderMaterialNeeds(order);
        let shortages = getMaterialShortages(order, inventory);
        // if there are shortages return a failure message 
        if (shortages.length > 0) {
            let shortageDetails = shortages.map(function(shortage) {
                let gatherAmount = shortage.needed - shortage.available;
                return shortage.name + ": gather " + gatherAmount + " more (need " +
                    shortage.needed + ", have " + shortage.available + ")";
            }).join(", ");
            return {
                success: false,
                message: "This order cannot move to Forging yet. Gather these materials first: " + shortageDetails + "."
            };
        }
        // takes the materials from the inventory
        Object.keys(materialNeeds).forEach(function(material) {
            inventory[material].stock -= materialNeeds[material];
        });
        // saves updated inventory to local storage
        localStorage.setItem("forgeInventory", JSON.stringify(inventory));
        order.materialsConsumed = true;
    }

    // updates the order status and saves the orders to local storage
    order.status = newStatus;
    localStorage.setItem("orders", JSON.stringify(orders));
    // returns success message to parent function if function executes completely
    return { success: true };
}

// created with the help of git copilot
// all code reviewed and commented by the developer to ensure functionality and maintain good standing with competition rules
// creates the forge inventory display in the HTML document
function renderForgeInventory() {
    //gets the inventory and recipe list elements from HTML
    let inventoryList = document.getElementById("inventory-list");
    let recipeList = document.getElementById("inventory-recipes");
    if (!inventoryList || !recipeList) {
        return;
    }
    // rerives the current inventory data 
    let inventory = loadForgeInventory();
    // clears inventory HTML content
    inventoryList.replaceChildren();
    // iterates over each material in the inventory and creates an HTML element 
    Object.keys(inventory).forEach(function(material) {
        // gets inventory data for the material
        let stock = inventory[material];
        // calculates the percentage of stock in the inventory
        let percent = stock.stock / stock.capacity * 100;
        // creates the HTML element to store each inventory row
        let row = document.createElement("article");
        row.className = "inventory-material";

        // creates the heading for the inventory row and adds it to the row
        let heading = document.createElement("div");
        heading.className = "inventory-material-heading";
        let name = document.createElement("h3");
        name.textContent = stock.name;
        let count = document.createElement("span");
        count.textContent = stock.stock + " / " + stock.capacity + " units";
        heading.append(name, count);
        row.appendChild(heading);

        // creates the progress bar for the inventory row and adds it to the row
        let bar = document.createElement("progress");
        bar.max = stock.capacity;
        bar.value = stock.stock;
        bar.setAttribute("aria-label", stock.name + " stock level");
        row.appendChild(bar);

        // creates the label and input for setting stock units and adds them to the row
        let label = document.createElement("label");
        let inputId = "stock-" + material;
        label.htmlFor = inputId;
        label.textContent = "Set stock units";
        let input = document.createElement("input");
        input.id = inputId;
        input.name = material;
        input.type = "number";
        input.min = "0";
        input.max = String(stock.capacity);
        input.step = "1";
        input.value = String(stock.stock);
        row.append(label, input);

        // adds a warning if the stock is below 20% of the capacity
        if (percent < 20) {
            let warning = document.createElement("p");
            warning.className = "material-reorder-warning";
            warning.textContent = "Order " + stock.name.toLowerCase() + " soon";
            row.appendChild(warning);
        }
        // adds the entire inventory row to the inventory list
        inventoryList.appendChild(row);
    });

    // clears any existing recipe cards from the HTML 
    recipeList.replaceChildren();
    // iterates over each forging recipe and creates a recipe listing for it
    Object.keys(forgingRecipes).forEach(function(productId) {
        let recipe = forgingRecipes[productId];
        // creates the recipe card and adds it to the recipe list
        let recipeCard = document.createElement("article");
        recipeCard.className = "inventory-recipe";
        let recipeTitle = document.createElement("h3");
        // adds the name of the recipe to the card
        recipeTitle.textContent = products[productId].name;
        let recipeDetails = document.createElement("p");
        // iterates over each material in the recipe and creates a string for it
        recipeDetails.textContent = Object.keys(recipe).map(function(material) {
            return recipe[material] + " " + forgeInventoryDefaults[material].name;
        }).join(" / ");
        // adds the recipe info to the card
        recipeCard.append(recipeTitle, recipeDetails);
        // adds the card to the recipe list
        recipeList.appendChild(recipeCard);
    });
}

// created with the help of git copilot
// all code reviewed and commented by the developer to ensure functionality and maintain good standing with competition rules
function setupForgeInventory() {
    let inventoryForm = document.getElementById("inventory-form");
    if (!inventoryForm) {
        return;
    }
    renderForgeInventory();
    inventoryForm.addEventListener("submit", function(event) {
        event.preventDefault();
        let inventory = loadForgeInventory();
        Object.keys(inventory).forEach(function(material) {
            let input = inventoryForm.elements.namedItem(material);
            let value = Number(input.value);
            inventory[material].stock = Number.isFinite(value)
                ? Math.max(0, Math.min(inventory[material].capacity, value))
                : 0;
        });
        localStorage.setItem("forgeInventory", JSON.stringify(inventory));
        document.getElementById("inventory-message").textContent = "Stock levels saved.";
        renderForgeInventory();
    });
}

// created with the help of git copilot
// all code reviewed and commented by the developer to ensure functionality and maintain good standing with competition rules
function requireGunterAccess() {
    if (!document.body.hasAttribute("data-gunter-protected")) {
        return true;
    }
    if (sessionStorage.getItem("gunterAccess") === "granted") {
        return true;
    }
    window.location.replace("gunter.html");
    return false;
}

// created with the help of git copilot
// all code reviewed and commented by the developer to ensure functionality and maintain good standing with competition rules
function setupGunterLogin() {
    let loginForm = document.getElementById("gunter-login-form");
    if (!loginForm) {
        return;
    }
    let dashboard = document.getElementById("gunter-dashboard");
    let message = document.getElementById("gunter-login-message");
    let showDashboard = function() {
        loginForm.hidden = true;
        dashboard.hidden = false;
    };
    if (sessionStorage.getItem("gunterAccess") === "granted") {
        showDashboard();
    }
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();
        let password = document.getElementById("gunter-password").value;
        if (password !== GUNTER_ACCESS_PASSWORD) {
            message.textContent = "That password was not recognized.";
            return;
        }
        sessionStorage.setItem("gunterAccess", "granted");
        message.textContent = "Access granted.";
        showDashboard();
    });
}

// created with the help of git copilot
// all code reviewed and commented by the developer to ensure functionality and maintain good standing with competition rules
function logoutGunter() {
    sessionStorage.removeItem("gunterAccess");
    window.location.href = "gunter.html";
}

// created with the help of git copilot
// all code reviewed and commented by the developer to ensure functionality and maintain good standing with competition rules
function setupOrderTracking() {
    let trackingForm = document.getElementById("tracking-form");
    if (!trackingForm) {
        return;
    }

    trackingForm.addEventListener("submit", function(event) {
        event.preventDefault();
        let customerName = document.getElementById("tracking-customer-name").value.trim().toLocaleLowerCase();
        let orderNumber = document.getElementById("tracking-order-number").value.trim().replace(/^#/, "");
        let result = document.getElementById("tracking-result");
        let message = document.getElementById("tracking-message");
        result.replaceChildren();

        if (!customerName) {
            result.hidden = true;
            message.textContent = "Enter a customer name to find orders. You can also add an order number to narrow the search.";
            return;
        }

        let orders = JSON.parse(localStorage.getItem("orders")) || [];
        let matchingOrders = orders.filter(function(savedOrder) {
            let orderNumberMatches = !orderNumber || String(savedOrder.orderNumber) === orderNumber;
            let customerNameMatches =
                String(savedOrder.customerName || "").trim().toLocaleLowerCase() === customerName;
            return orderNumberMatches && customerNameMatches;
        });

        if (matchingOrders.length === 0) {
            result.hidden = true;
            message.textContent = "We couldn't find an order matching that name or number. Check your details and try again.";
            return;
        }

        matchingOrders.forEach(function(order) {
            let orderResult = document.createElement("article");
            orderResult.className = "customer-tracking-order";

            let orderHeading = document.createElement("h2");
            orderHeading.textContent = "Order #" + order.orderNumber;
            orderResult.appendChild(orderHeading);

            let customer = document.createElement("p");
            customer.textContent = "Customer: " + (order.customerName || "");
            orderResult.appendChild(customer);

            let status = document.createElement("p");
            status.textContent = "Status: ";
            let statusValue = document.createElement("strong");
            statusValue.textContent = order.status;
            status.appendChild(statusValue);
            orderResult.appendChild(status);

            let queuePosition = getQueuePosition(order.orderNumber);
            let queueMessage = document.createElement("p");
            if (queuePosition > 0) {
                queueMessage.textContent = "Queue position: " + queuePosition;
            } else if (order.status === "Ready") {
                queueMessage.textContent = "Your order is ready for pickup.";
            } else if (order.status === "Completed") {
                queueMessage.textContent = "This order has been completed.";
            } else {
                queueMessage.textContent = "This order is not currently in the active queue.";
            }
            orderResult.appendChild(queueMessage);

            let itemsHeading = document.createElement("h3");
            itemsHeading.textContent = "Items";
            orderResult.appendChild(itemsHeading);

            let itemsList = document.createElement("div");
            itemsList.className = "order-items";
            (order.items || []).forEach(function(item) {
                let itemDescription = document.createElement("p");
                let productName = products[item.product] ? products[item.product].name : item.product;
                itemDescription.textContent = productName + " x " + item.quantity;
                itemsList.appendChild(itemDescription);
            });
            if (itemsList.childElementCount === 0) {
                let noItems = document.createElement("p");
                noItems.textContent = "No item details available.";
                itemsList.appendChild(noItems);
            }
            orderResult.appendChild(itemsList);
            result.appendChild(orderResult);
        });

        message.textContent = matchingOrders.length === 1
            ? "Order found."
            : "Found " + matchingOrders.length + " orders.";
        result.hidden = false;
    });
}

// created with the help of git copilot
// all code reviewed and commented by the developer to ensure functionality and maintain good standing with competition rules
let hasGunterAccess = requireGunterAccess();

if (hasGunterAccess && document.querySelector(".orders-list")) {
    displayOrders();
}

if (document.querySelector(".item-list")) {
    displaycart();
}

window.addEventListener("pageshow", function() {
    if (document.querySelector(".item-list")) {
        displaycart();
    }
});

if (document.querySelector(".order-details")) {
    displayOrderConfirmation();
}
        
if (document.querySelector(".checkout-review")) {
    displayCheckout();
}

if (hasGunterAccess) {
    setupForgeInventory();
}
setupGunterLogin();
setupOrderTracking();
setupMaterialShortageConfirmation();
