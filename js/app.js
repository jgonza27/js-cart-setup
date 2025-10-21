(function () {

    // ==========================
    // 🛒 Mostrar / ocultar carrito
    // ==========================
    const cartInfo = document.querySelector('#cart-info');
    const cart = document.querySelector('#cart');

    cartInfo.addEventListener("click", () => cart.classList.toggle("show-cart"));

    // ==========================
    // 🧁 Añadir ítem al carrito
    // ==========================
    const carritos = document.querySelectorAll(".store-item-icon");

    carritos.forEach((botoncito) => {
        botoncito.addEventListener("click", (event) => {

            let spanClicked = event.target;
            if (!spanClicked.classList.contains("store-item-icon")) {
                spanClicked = event.target.parentNode;
            }

            // Extraer info del producto
            let urlFoto = spanClicked.previousElementSibling.src;
            const abueloCart = spanClicked.parentNode.parentNode;
            const h5s = abueloCart.querySelectorAll("h5");

            const nombre = h5s[0].textContent;
            const precio = h5s[1].textContent.split(" ")[1];
            urlFoto = urlFoto.replace("img", "img-cart");

            addCakeToCartFromScratch(urlFoto, nombre, precio);
            updateTotal();
        });
    });

    // ==========================
    // 🧩 Añadir item al carrito desde cero
    // ==========================
    function addCakeToCartFromScratch(urlFoto, nombre, precio) {
        const newItem = document.createElement('div');
        newItem.className = 'cart-item d-flex justify-content-between text-capitalize my-3';
        newItem.innerHTML = `
          <img src="${urlFoto}" class="img-fluid rounded-circle" alt="">
          <div class="item-text">
              <p class="font-weight-bold mb-0">${nombre}</p>
              <span>$</span>
              <span class="cart-item-price mb-0">${precio}</span>
          </div>
          <a href="#" class="cart-item-remove">
              <i class="fas fa-trash"></i>
          </a>
      `;
        cart.insertBefore(newItem, cart.querySelector('.cart-total-container'));
    }

    // ==========================
    // 🧮 Recalcular total
    // ==========================
    function updateTotal() {
        const totalElement = document.getElementById('cart-total');
        const itemCountElement = document.getElementById('item-count');
        const prices = cart.querySelectorAll('.cart-item-price');

        let total = 0;
        prices.forEach(price => total += parseFloat(price.textContent));
        totalElement.textContent = total.toFixed(2);
        itemCountElement.textContent = prices.length;
    }

    // ==========================
    // 🗑️ Eliminar un solo ítem
    // ==========================
    cart.addEventListener('click', function (e) {
        if (e.target.classList.contains('fa-trash')) {
            const item = e.target.closest('.cart-item');
            if (item) {
                item.remove();
                updateTotal();
            }
        }
    });

    // ==========================
    // 🧹 Vaciar carrito completo
    // ==========================
    const clearCartBtn = document.getElementById('clear-cart');
    clearCartBtn.addEventListener('click', function (e) {
        e.preventDefault();
        const items = cart.querySelectorAll('.cart-item');
        items.forEach(item => item.remove());
        updateTotal();
    });

    // Inicializar totales al cargar
    updateTotal();

})();
