let cart = [];
let cartTotal = 0;

// Actualizar carrito de compras
function addToCart(item, price) {
    cart.push({ item, price });
    cartTotal += price;
    updateCart();
}

function updateCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    cartItemsContainer.innerHTML = ""; // Limpiar carrito

    cart.forEach((cartItem, index) => {
        const div = document.createElement("div");
        div.textContent = `${cartItem.item} - ${cartItem.price} monedas`;
        cartItemsContainer.appendChild(div);
    });

    document.getElementById("cart-total").textContent = cartTotal;
}

// Comprar todo
function purchase() {
    const userName = localStorage.getItem("currentUser");
    let userCoins = parseInt(localStorage.getItem(`${userName}-coins`) || 0);

    if (userCoins < cartTotal) {
        alert("No tienes suficientes monedas para realizar la compra.");
        return;
    }

    // Restar monedas
    userCoins -= cartTotal;
    localStorage.setItem(`${userName}-coins`, userCoins);

    // Actualizar datos del usuario
    cart.forEach(cartItem => {
        if (cartItem.item === "vidas") {
            const currentLives = parseInt(localStorage.getItem(`${userName}-lives`) || 0);
            localStorage.setItem(`${userName}-lives`, currentLives + 3);
        } else if (cartItem.item === "puntos") {
            const currentPoints = parseInt(localStorage.getItem(`${userName}-points`) || 0);
            localStorage.setItem(`${userName}-points`, currentPoints + 100);
        } else if (cartItem.item === "nivel") {
            const currentLevel = parseInt(localStorage.getItem(`${userName}-level`) || 1);
            localStorage.setItem(`${userName}-level`, currentLevel + 1);
        }
    });

    // Vaciar carrito
    cart = [];
    cartTotal = 0;
    updateCart();

    alert("¡Compra realizada exitosamente!");
}

// Volver a la página principal
function goBack() {
    window.location.href = "principal.html";
}
