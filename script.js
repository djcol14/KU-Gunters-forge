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
    let quantity = document.getElementById("quantity").textContent;
    let item = {
        product: product,
        quantity: quantity
    }
    console.log(cart);
    console.log(Array.isArray(cart));
    cart.push(item);
    console.log(item);
    localStorage.setItem("cart", JSON.stringify(cart));
}

function displaycart(){
    console.log("displaycart function is running");
    let cart = JSON.parse(localStorage.getItem("cart"));
    console.log(cart);
    for (let i = 0; i < cart.length; i++) {
        let product = cart[i].product;
        let quantity = cart[i].quantity;
        console.log(product);
        document.querySelector(".item-list").textContent += "\n" + product + " x " + quantity;
        let itemDiv = document.createElement("div");
    }
}
if (document.querySelector(".item-list")) {
    displaycart();
}
console.log("SCRIPT IS RUNNING");