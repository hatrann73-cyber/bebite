/* =========================================================
   CART JS
   BéBite
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       CART KEY
    ====================================================== */

    const CART_KEY = "bebite_cart";


    /* =====================================================
       IMAGE PATH
    ====================================================== */

    const IMAGE_BASE =
        "../assets/images/products/";


    /* =====================================================
       PRODUCT IMAGES
    ====================================================== */

    const PRODUCT_IMAGES = {

        SBMILK6MONTH: [
            "SBMILK6MONTH_01"
        ],

        SBMILK1YEAR: [
            "SBMILK1YEAR_01"
        ],

        HYENMACH70G: [
            "HYENMACH70G_01",
            "HYENMACH70G_02"
        ],

        DHALAN70G: [
            "HDAUHALAN70G_01",
            "HDAUHALAN70G_02"
        ],

        HKENEP70G: [
            "HKETNEP70G_01",
            "HKETNEP70G_02"
        ],

        HDIEMMACH70G: [
            "HDIEMMACH70G_01",
            "HDIEMMACH70G_02"
        ],

        BADQUEDAU40G: [
            "BADDAU_01",
            "BADDAU_02"
        ],

        BADVXOAI40G: [
            "BADXOAI_01",
            "BADXOAI_02"
        ],

        BADVTRAICAY40G: [
            "BADCHUOI_01",
            "BADCHUOI_02"
        ],

        BHADVVQ50G: [
            "BANHHUVIETQUAT_01"
        ],

        BHADVC50G: [
            "BANHHUCHUOI_01"
        ],

        BQVVQ50G: [
            "BANHQUYVIETQUAT_01",
            "BANHQUYVIETQUAT_02"
        ],

        BQVKL50G: [
            "BANHQUYKHOAILANG_01"
        ],

        BQVKIWI35G: [
            "BQKIWI35G_01",
            "BQKIWI35G_02"
        ],

        DADOLIVE150ML: [
            "DADOLIVE150ML_01",
            "DADOLIVE150ML_02"
        ],

        DADCAHOI150ML: [
            "DADCAHOI150_01",
            "DADCAHOI150_02"
        ],

        DADGAC150ML: [
            "DADGAC150_01",
            "DADGAC150_02"
        ],

        DADOLIVE50ML: [
            "DADOLIVE50_01",
            "DADOLIVE50_03",
            "DADOLIVE50_04"
        ],

  DADCAHOI50ML: [
    'DADCAHOI50_01',
    'DADCAHOI50_03',
  ],

  DADGAC50ML: [
    'DADGAC50_01',
    'DADGAC50_03'
  ],

        TCNAVOBANA90G: [
            "TRAICAYNGHIENVICHUOIBO_01",
            "TRAICAYNGHIENVICHUOIBO_02"
        ],

        TCNXOAI90G: [
            "TRAICAYNGHIENVIXOAI_01",
            "TRAICAYNGHIENVIXOAI_02"
        ],

        SCU200ML: [
            "SUACHUAUONG_01",
            "SUACHUAUONG_02"
        ],

  BGPMNGO50G: [
    'BANHGAONGOPM_01',
    'BANHGAONGOPM_02'
  ],

  BGPMVQ50G: [
    'BANHGAOVIETQUAT_01',
    'BANHGAOVIETQUAT_02'
  ],

        CADCAHOI170G: [
            "CHAOCAHOI_01"
        ],

        CADYENMACH170G: [
            "CHAOYENMACH_01",
            "CHAOYENMACH_02"
        ],

        DMASSAGE148ML: [
            "DAUMASSAGE_01",
            "DAUMASSAGE_02"
        ]

    };


    /* =====================================================
       ELEMENTS
    ====================================================== */

    const cartItems =
        document.getElementById("cartItems");

    const emptyCart =
        document.getElementById("emptyCart");

    const cartSubtotal =
        document.getElementById("cartSubtotal");

    const cartTotal =
        document.getElementById("cartTotal");

    const clearCartBtn =
        document.getElementById("clearCartBtn");

    const checkoutBtn =
        document.getElementById("checkoutBtn");


    /* =====================================================
       GET CART
    ====================================================== */

    function getCart() {

        try {

            const saved =
                localStorage.getItem(CART_KEY);

            if (!saved) {
                return [];
            }

            const cart =
                JSON.parse(saved);

            return Array.isArray(cart)
                ? cart
                : [];

        } catch (error) {

            console.error(
                "Không thể đọc giỏ hàng:",
                error
            );

            return [];

        }

    }


    /* =====================================================
       SAVE CART
    ====================================================== */

    function saveCart(cart) {

        localStorage.setItem(
            CART_KEY,
            JSON.stringify(cart)
        );

    }


    /* =====================================================
       FORMAT PRICE
    ====================================================== */

    function formatPrice(price) {

        const number =
            Number(price) || 0;

        return number.toLocaleString(
            "vi-VN"
        ) + "đ";

    }


    /* =====================================================
       GET IMAGE
    ====================================================== */

    function getProductImage(sku) {

        const images =
            PRODUCT_IMAGES[sku];

        if (
            !images ||
            !images.length
        ) {

            return "";

        }

        return (
            IMAGE_BASE +
            images[0] +
            ".png"
        );

    }


    /* =====================================================
       UPDATE SUMMARY
    ====================================================== */

    function updateSummary(cart) {

        let subtotal = 0;

        cart.forEach(function (item) {

            const price =
                Number(item.price) || 0;

            const quantity =
                Number(item.quantity) || 0;

            subtotal +=
                price * quantity;

        });

        if (cartSubtotal) {

            cartSubtotal.textContent =
                formatPrice(subtotal);

        }

        if (cartTotal) {

            cartTotal.textContent =
                formatPrice(subtotal);

        }

    }


    /* =====================================================
       CHANGE QUANTITY
    ====================================================== */

    function changeQuantity(
        sku,
        amount
    ) {

        const cart =
            getCart();

        const item =
            cart.find(function (product) {

                return product.sku === sku;

            });

        if (!item) {
            return;
        }

        let quantity =
            Number(item.quantity) || 1;

        quantity += amount;

        quantity =
            Math.max(
                1,
                Math.min(99, quantity)
            );

        item.quantity =
            quantity;

        saveCart(cart);

        renderCart();

    }


    /* =====================================================
       REMOVE ITEM
    ====================================================== */

    function removeItem(sku) {

        let cart =
            getCart();

        cart =
            cart.filter(function (item) {

                return item.sku !== sku;

            });

        saveCart(cart);

        renderCart();

    }


    /* =====================================================
       RENDER CART
    ====================================================== */

    function renderCart() {

        const cart =
            getCart();


        /* ================================================
           EMPTY
        ================================================= */

        if (!cart.length) {

            if (cartItems) {

                cartItems.innerHTML =
                    "";

            }

            if (emptyCart) {

                emptyCart.hidden =
                    false;

            }

            updateSummary([]);

            return;

        }


        /* ================================================
           HAS PRODUCTS
        ================================================= */

        if (emptyCart) {

            emptyCart.hidden =
                true;

        }


        if (!cartItems) {
            return;
        }


  cartItems.innerHTML =
    cart.map(function (item, index) {

                const price =
                    Number(item.price) || 0;

                const quantity =
                    Number(item.quantity) || 1;

                const total =
                    price * quantity;

                const image =
                    getProductImage(
                        item.sku
                    );


                return `

                    <article
                        class="cart-item"
                        data-sku="${item.sku}"
                    >

                        <div class="cart-product-info">

                            <div class="cart-product-image">

                                ${
                                    image
                                        ? `
                                            <img
                                                src="${image}"
                                                alt="${item.name || ""}"
                                            >
                                          `
                                        : `
                                            <i class="fa-solid fa-image"></i>
                                          `
                                }

                            </div>


                       <div class="cart-product-details">

    <div class="cart-product-number">
        SẢN PHẨM ${index + 1}
    </div>

    <a
        href="product-detail.html?sku=${encodeURIComponent(item.sku)}"
        class="cart-product-name"
    >
        ${item.name}
    </a>

    <div class="cart-product-price">
        ${formatPrice(price)}
    </div>

</div>

                        </div>


                        <div class="cart-quantity">

                            <div class="cart-quantity-box">

                                <button
                                    type="button"
                                    class="cart-quantity-btn"
                                    data-action="minus"
                                    data-sku="${item.sku}"
                                    aria-label="Giảm số lượng"
                                >
                                    −
                                </button>


                                <input
                                    type="number"
                                    class="cart-quantity-input"
                                    value="${quantity}"
                                    min="1"
                                    max="99"
                                    data-action="input"
                                    data-sku="${item.sku}"
                                    aria-label="Số lượng"
                                >


                                <button
                                    type="button"
                                    class="cart-quantity-btn"
                                    data-action="plus"
                                    data-sku="${item.sku}"
                                    aria-label="Tăng số lượng"
                                >
                                    +
                                </button>

                            </div>

                        </div>


                        <div class="cart-item-total">

                            <strong>
                                ${formatPrice(total)}
                            </strong>


                            <button
                                type="button"
                                class="cart-remove-btn"
                                data-action="remove"
                                data-sku="${item.sku}"
                            >
                                XÓA
                            </button>

                        </div>

                    </article>

                `;

            }).join("");


        updateSummary(cart);

    }


    /* =====================================================
       CART EVENTS
    ====================================================== */

    if (cartItems) {

        cartItems.addEventListener(
            "click",
            function (event) {

                const button =
                    event.target.closest(
                        "[data-action]"
                    );

                if (!button) {
                    return;
                }

                const action =
                    button.dataset.action;

                const sku =
                    button.dataset.sku;

                if (action === "minus") {

                    changeQuantity(
                        sku,
                        -1
                    );

                }

                if (action === "plus") {

                    changeQuantity(
                        sku,
                        1
                    );

                }

                if (action === "remove") {

                    removeItem(
                        sku
                    );

                }

            }
        );


        cartItems.addEventListener(
            "change",
            function (event) {

                const input =
                    event.target.closest(
                        ".cart-quantity-input"
                    );

                if (!input) {
                    return;
                }

                const sku =
                    input.dataset.sku;

                let quantity =
                    parseInt(
                        input.value,
                        10
                    );

                if (isNaN(quantity)) {
                    quantity = 1;
                }

                quantity =
                    Math.max(
                        1,
                        Math.min(99, quantity)
                    );


                const cart =
                    getCart();

                const item =
                    cart.find(function (product) {

                        return product.sku === sku;

                    });

                if (!item) {
                    return;
                }

                item.quantity =
                    quantity;

                saveCart(cart);

                renderCart();

            }
        );

    }


    /* =====================================================
       CLEAR CART
    ====================================================== */

    if (clearCartBtn) {

        clearCartBtn.addEventListener(
            "click",
            function () {

                const cart =
                    getCart();

                if (!cart.length) {
                    return;
                }

                const confirmed =
                    confirm(
                        "Bạn có chắc muốn xóa toàn bộ giỏ hàng?"
                    );

                if (!confirmed) {
                    return;
                }

                localStorage.removeItem(
                    CART_KEY
                );

                renderCart();

            }
        );

    }


    /* =====================================================
       CHECKOUT
    ====================================================== */

checkoutBtn.addEventListener("click", function () {

    const cart = getCart();

    if (!cart.length) {
        alert("Giỏ hàng đang trống.");
        return;
    }

    window.location.href = "checkout.html";
});


    /* =====================================================
       INIT
    ====================================================== */

    renderCart();

});