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

function opencart(){
    window.location.href = "cart.html";
}

function navindex(){
    window.location.href = "index.html";
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
        quantity: quantity
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
    document.querySelector(".item-list").textContent = "";
    for (let i = 0; i < cart.length; i++){
        console.log("loop is running");
        let product = cart[i].product;
        let quantity = cart[i].quantity;
        let price = products[product].price;
        let itemTotalprice = price * quantity;
        let itemDiv = document.createElement("div");
        let infoDiv = document.createElement("div");
        infoDiv.textContent = product + " x ";
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
            decreaseCartQuantity(i, quantityDisplay);
        });
        controlDiv.appendChild(subQuantitySelector);
        controlDiv.appendChild(quantityDisplay);
        let addQuantitySelector = document.createElement("button");
        addQuantitySelector.textContent = "+";
        addQuantitySelector.addEventListener("click", function() {
            increaseCartQuantity(i, quantityDisplay);
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
        individualPrice.textContent = price + " gold each";
        pricingDiv.appendChild(individualPrice);
        let itemTotalPriceDiv = document.createElement("span");
        itemTotalPriceDiv.textContent = itemTotalprice + " gold";
        pricingDiv.appendChild(itemTotalPriceDiv);
        infoDiv.appendChild(pricingDiv);
        calculateCartTotal();
    }
}

function decreaseCartQuantity(i, quantityDisplay){
    console.log("DECREASE FUNCTION RAN");
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart[i].quantity--;
    localStorage.setItem("cart", JSON.stringify(cart));
    quantityDisplay.textContent = cart[i].quantity;
    calculateCartTotal();
}

function increaseCartQuantity(i, quantityDisplay){
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart[i].quantity++;
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
}

if (document.querySelector(".item-list")) {
    displaycart();
}
console.log("SCRIPT IS RUNNING");