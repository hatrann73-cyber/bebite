document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       CẤU HÌNH
    ========================================= */

    const CART_KEY = "bebite_cart";

    const IMAGE_BASE = "../assets/images/products/";

    const LOCATION_API =
        "https://provinces.open-api.vn/api";


    /* =========================================
       ẢNH SẢN PHẨM
    ========================================= */

    const PRODUCT_IMAGES = {

        SBMILK6MONTH: ["SBMILK6MONTH_01"],

        SBMILK1YEAR: ["SBMILK1YEAR_01"],

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
    'TRAICAYNGHIENVICHUOIBO_01',
    'TRAICAYNGHIENVICHUOIBO_02'
  ],

  TCNXOAI90G: [
    'TRAICAYNGHIENVIXOAI_01',
    'TRAICAYNGHIENVIXOAI_02'
  ],

  SCU200ML: [
    'SUACHUAUONG_01',
    'SUACHUAUONG_02'
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
    'CHAOCAHOI_01'
  ],

  CADYENMACH170G: [
    'CHAOYENMACH_01',
    'CHAOYENMACH_02'
  ],

  DMASSAGE148ML: [
    'DAUMASSAGE_01',
    'DAUMASSAGE_02'
  ]

};

    /* =========================================
       FORMAT TIỀN
    ========================================= */

    function formatPrice(price) {
        return new Intl.NumberFormat("vi-VN").format(price) + "đ";
    }


    /* =========================================
       LẤY GIỎ HÀNG
    ========================================= */

    function getCart() {
        const savedCart = localStorage.getItem(CART_KEY);

        if (!savedCart) {
            return [];
        }

        try {
            const cart = JSON.parse(savedCart);
            if (Array.isArray(cart)) {
                return cart;
            }
            return [];
        } catch (error) {
            console.error("Lỗi đọc giỏ hàng:", error);
            return [];
        }
    }


    /* =========================================
       LẤY SỐ LƯỢNG
    ========================================= */

    function getQuantity(item) {
        return Number(
            item.quantity ??
            item.qty ??
            1
        ) || 1;
    }


    /* =========================================
       LẤY GIÁ
    ========================================= */

    function getPrice(item) {
        return Number(
            item.price ??
            item.salePrice ??
            item.productPrice ??
            0
        ) || 0;
    }


    /* =========================================
       LẤY ẢNH
    ========================================= */

    function getProductImage(item) {
        if (item.image) {
            return item.image;
        }

        if (item.imageUrl) {
            return item.imageUrl;
        }

        if (
            item.sku &&
            PRODUCT_IMAGES[item.sku]
        ) {
            return (
                IMAGE_BASE +
                PRODUCT_IMAGES[item.sku][0] +
                ".png"
            );
        }

        return "";
    }


    /* =========================================
       MÃ GIẢM GIÁ BEBITE5
    ========================================= */

    window.bebiteDiscount = 0;

    const applyDiscountButton =
        document.getElementById("applyDiscount");

    const discountInput =
        document.getElementById("discountCode");

    const discountMessage =
        document.getElementById("discountMessage");

    if (applyDiscountButton && discountInput && discountMessage) {
        applyDiscountButton.addEventListener("click", function () {
            const code = discountInput.value.trim().toUpperCase();
            const token = localStorage.getItem("bebiteToken");

            if (code !== "BEBITE5") {
                window.bebiteDiscount = 0;
                discountMessage.textContent = "Mã giảm giá không hợp lệ.";
                discountMessage.style.color = "#c62828";
                updateTotal();
                return;
            }

            if (!token) {
                discountMessage.textContent =
                    "Vui lòng đăng nhập để sử dụng mã giảm giá.";
                discountMessage.style.color = "#c62828";
                return;
            }

            const cart = getCart();

            const subtotal = cart.reduce(function (sum, item) {
                return sum + getPrice(item) * getQuantity(item);
            }, 0);

            window.bebiteDiscount = Math.round(subtotal * 0.05);

            discountMessage.textContent =
                "Áp dụng mã thành công! Bạn được giảm 5%.";
            discountMessage.style.color = "#278348";

            updateTotal();
        });
    }

    /* =========================================
       RENDER SẢN PHẨM
    ========================================= */

    function renderCheckoutItems() {
        const container =
            document.getElementById("checkoutItems");

        const subtotalElement =
            document.getElementById("checkoutSubtotal");

        if (!container) {
            return;
        }

        const cart = getCart();

        if (cart.length === 0) {
            container.innerHTML = `
                <div class="checkout-empty">
                    <i class="fa-solid fa-basket-shopping"></i>
                    <p>Giỏ hàng của bạn đang trống.</p>
                </div>
            `;

            if (subtotalElement) {
                subtotalElement.textContent = "0đ";
            }

            updateTotal();
            return;
        }

        let subtotal = 0;

        container.innerHTML =
            cart.map(function (item) {
                const quantity = getQuantity(item);
                const price = getPrice(item);
                const itemTotal = price * quantity;
                subtotal += itemTotal;

                const image = getProductImage(item);

                return `
                    <div class="checkout-item">
                        <div class="checkout-item-image">
                            ${
                                image
                                    ? `<img src="${image}" alt="${item.name || "Sản phẩm"}">`
                                    : `<i class="fa-solid fa-image"></i>`
                            }
                        </div>
                        <div class="checkout-item-info">
                            <span class="checkout-item-name">
                                ${item.name || "Sản phẩm"}
                            </span>
                            <span class="checkout-item-quantity">
                                Số lượng: ${quantity}
                            </span>
                        </div>
                        <span class="checkout-item-price">
                            ${formatPrice(itemTotal)}
                        </span>
                    </div>
                `;
            }).join("");

        if (subtotalElement) {
            subtotalElement.textContent = formatPrice(subtotal);
        }

        updateTotal();
    }


    /* =========================================
       LẤY PHÍ SHIP
    ========================================= */

    function getShippingFee() {
        const selectedShipping =
            document.querySelector('input[name="shipping"]:checked');

        if (!selectedShipping) {
            return 0;
        }

        return Number(selectedShipping.dataset.price) || 0;
    }


    /* =========================================
       CẬP NHẬT TỔNG TIỀN
    ========================================= */

    function updateTotal() {
        const cart = getCart();
        let subtotal = 0;

        cart.forEach(function (item) {
            const quantity = getQuantity(item);
            const price = getPrice(item);
            subtotal += price * quantity;
        });

        const shipping = getShippingFee();
        const discount = window.bebiteDiscount || 0;
        const total = Math.max(0, subtotal + shipping - discount);

        const discountElement = document.getElementById("checkoutDiscount");
        if (discountElement) {
            discountElement.textContent = formatPrice(discount);
        }

        const subtotalElement = document.getElementById("checkoutSubtotal");
        const shippingElement = document.getElementById("checkoutShipping");
        const totalElement = document.getElementById("checkoutTotal");

        if (subtotalElement) {
            subtotalElement.textContent = formatPrice(subtotal);
        }

        if (shippingElement) {
            shippingElement.textContent = formatPrice(shipping);
        }

        if (totalElement) {
            totalElement.textContent = formatPrice(total);
        }
    }


    /* =========================================
       LOAD TỈNH / THÀNH PHỐ
    ========================================= */

    async function loadCities() {
        const citySelect = document.getElementById("city");
        if (!citySelect) return;

        try {
            citySelect.innerHTML = `<option value="">Đang tải tỉnh / thành phố...</option>`;

            const response = await fetch(`${LOCATION_API}/p/`);
            if (!response.ok) {
                throw new Error("Không thể tải danh sách tỉnh.");
            }

            const cities = await response.json();
            citySelect.innerHTML = `<option value="">Chọn tỉnh / thành phố</option>`;

            cities.forEach(function (city) {
                const option = document.createElement("option");
                option.value = city.code;
                option.textContent = city.name;
                citySelect.appendChild(option);
            });
        } catch (error) {
            console.error("Lỗi tải tỉnh/thành:", error);
            citySelect.innerHTML = `<option value="">Không tải được dữ liệu</option>`;
        }
    }


    /* =========================================
       LOAD QUẬN / HUYỆN
    ========================================= */

    async function loadDistricts(cityCode) {
        const districtSelect = document.getElementById("district");
        const wardSelect = document.getElementById("ward");

        if (!districtSelect) return;

        districtSelect.innerHTML = `<option value="">Đang tải quận / huyện...</option>`;
        districtSelect.disabled = true;

        if (wardSelect) {
            wardSelect.innerHTML = `<option value="">Chọn phường / xã</option>`;
            wardSelect.disabled = true;
        }

        if (!cityCode) {
            districtSelect.innerHTML = `<option value="">Chọn quận / huyện</option>`;
            return;
        }

        try {
            const response = await fetch(`${LOCATION_API}/p/${cityCode}?depth=2`);
            if (!response.ok) {
                throw new Error("Không thể tải quận huyện.");
            }

            const city = await response.json();
            districtSelect.innerHTML = `<option value="">Chọn quận / huyện</option>`;

            city.districts.forEach(function (district) {
                const option = document.createElement("option");
                option.value = district.code;
                option.textContent = district.name;
                districtSelect.appendChild(option);
            });

            districtSelect.disabled = false;
        } catch (error) {
            console.error("Lỗi tải quận/huyện:", error);
            districtSelect.innerHTML = `<option value="">Không tải được dữ liệu</option>`;
        }
    }


    /* =========================================
       LOAD PHƯỜNG / XÃ
    ========================================= */

    async function loadWards(districtCode) {
        const wardSelect = document.getElementById("ward");
        if (!wardSelect) return;

        wardSelect.innerHTML = `<option value="">Đang tải phường / xã...</option>`;
        wardSelect.disabled = true;

        if (!districtCode) {
            wardSelect.innerHTML = `<option value="">Chọn phường / xã</option>`;
            return;
        }

        try {
            const response = await fetch(`${LOCATION_API}/d/${districtCode}?depth=2`);
            if (!response.ok) {
                throw new Error("Không thể tải phường xã.");
            }

            const district = await response.json();
            wardSelect.innerHTML = `<option value="">Chọn phường / xã</option>`;

            district.wards.forEach(function (ward) {
                const option = document.createElement("option");
                option.value = ward.code;
                option.textContent = ward.name;
                wardSelect.appendChild(option);
            });

            wardSelect.disabled = false;
        } catch (error) {
            console.error("Lỗi tải phường/xã:", error);
            wardSelect.innerHTML = `<option value="">Không tải được dữ liệu</option>`;
        }
    }


    /* =========================================
       SETUP ĐỊA CHỈ
    ========================================= */

    function setupLocation() {
        const citySelect = document.getElementById("city");
        const districtSelect = document.getElementById("district");
        const wardSelect = document.getElementById("ward");

        if (citySelect) {
            citySelect.addEventListener("change", function () {
                loadDistricts(this.value);
            });
        }

        if (districtSelect) {
            districtSelect.addEventListener("change", function () {
                loadWards(this.value);
            });
        }

        loadCities().then(async function () {
            let savedAddress;
            try {
                savedAddress = JSON.parse(
                    localStorage.getItem("bebite_delivery_address") || "null"
                );
            } catch (error) {
                console.warn("Không đọc được địa chỉ đã lưu:", error);
                return;
            }

            if (
                !savedAddress ||
                typeof savedAddress !== "object" ||
                !savedAddress.provinceCode
            ) {
                return;
            }

            if (!citySelect || !districtSelect || !wardSelect) {
                return;
            }

            citySelect.value = String(savedAddress.provinceCode);
            if (!citySelect.value) return;

            await loadDistricts(citySelect.value);
            districtSelect.value = String(savedAddress.districtCode || "");
            if (!districtSelect.value) return;

            await loadWards(districtSelect.value);
            wardSelect.value = String(savedAddress.wardCode || "");

            console.log("Đã khôi phục địa chỉ giao hàng:", savedAddress);
        }).catch(function (error) {
            console.error("Lỗi tải địa chỉ Checkout:", error);
        });
    }


    /* =========================================
       PAYMENT / SHIPPING
    ========================================= */

    function setupOptions() {
        const options = document.querySelectorAll(".checkout-option");

        options.forEach(function (option) {
            option.addEventListener("click", function () {
                const input = option.querySelector("input");
                if (!input) return;

                const name = input.name;

                document.querySelectorAll(`.checkout-option input[name="${name}"]`).forEach(function (otherInput) {
                    const parent = otherInput.closest(".checkout-option");
                    if (parent) {
                        parent.classList.remove("active");
                    }
                });

                input.checked = true;
                option.classList.add("active");

                if (name === "shipping") {
                    updateTotal();
                }

                if (name === "payment") {
                    updatePaymentUI(input.value);
                }
            });
        });

        const selectedPayment = document.querySelector('input[name="payment"]:checked');
        if (selectedPayment) {
            updatePaymentUI(selectedPayment.value);
        }
    }


    /* =========================================
       PAYMENT UI
    ========================================= */

    function updatePaymentUI(payment) {
        const bankInfo = document.getElementById("bankPaymentInfo");
        if (!bankInfo) return;

        if (payment === "bank") {
            bankInfo.hidden = false;
        } else {
            bankInfo.hidden = true;
        }
    }


    /* =========================================
       FORM SUBMIT XỬ LÝ ĐẶT HÀNG
    ========================================= */

    function setupForm() {
        const form = document.getElementById("checkoutForm");
        if (!form) return;

        form.addEventListener("submit", async function (event) {
            event.preventDefault();

            // 1. Kiểm tra giỏ hàng
            const cart = getCart();
            if (cart.length === 0) {
                alert("Giỏ hàng của bạn đang trống.");
                window.location.href = "products.html";
                return;
            }

            // 2. Kiểm tra form hợp lệ
            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }

            // 3. Kiểm tra số điện thoại
            const phone = document.getElementById("phone").value.trim();
            const phoneRegex = /^(0|\+84)[0-9]{9,10}$/;
            if (!phoneRegex.test(phone)) {
                alert("Vui lòng nhập số điện thoại hợp lệ.");
                document.getElementById("phone").focus();
                return;
            }

            const city = document.getElementById("city");
            const district = document.getElementById("district");
            const ward = document.getElementById("ward");

            const checkoutInfo = {
                fullName: document.getElementById("fullName").value.trim(),
                phone: phone,
                email: document.getElementById("email").value.trim(),
                address: document.getElementById("address").value.trim(),
                city: city.options[city.selectedIndex]?.text || "",
                cityCode: city.value,
                district: district.options[district.selectedIndex]?.text || "",
                districtCode: district.value,
                ward: ward.options[ward.selectedIndex]?.text || "",
                wardCode: ward.value,
                note: document.getElementById("note").value.trim(),
                shipping: document.querySelector('input[name="shipping"]:checked')?.value || "standard",
                shippingFee: getShippingFee(),
                payment: document.querySelector('input[name="payment"]:checked')?.value || "cod",
                createdAt: new Date().toISOString()
            };

            let subtotal = 0;
            cart.forEach(function (item) {
                subtotal += getPrice(item) * getQuantity(item);
            });

            const shippingFee = Number(checkoutInfo.shippingFee) || 0;
            const discount = window.bebiteDiscount || 0;
            const totalPrice = Math.max(0, subtotal + shippingFee - discount);

            let currentUser = null;
            try {
                const savedUser = localStorage.getItem("bebiteCurrentUser");
                if (savedUser) {
                    currentUser = JSON.parse(savedUser);
                }
            } catch (error) {
                console.error("Lỗi đọc tài khoản:", error);
            }

            const order = {
                id: "BB-" + Date.now(),
                userId: currentUser?.id || null,
                items: cart.map(function (item) {
                    return {
                        sku: String(item.sku || "").trim(),
                        product_id: Number(item.id || item.productId || item.product_id) || null,
                        name: item.name || "Sản phẩm",
                        price: getPrice(item),
                        quantity: getQuantity(item)
                    };
                }),
                subtotal: subtotal,
                shippingFee: shippingFee,
                totalPrice: totalPrice,
                total: totalPrice,
                customer: checkoutInfo,
                shipping: checkoutInfo.shipping,
                payment: checkoutInfo.payment,
                status: "Đã đặt hàng",
                createdAt: checkoutInfo.createdAt,
                bookingDate: checkoutInfo.createdAt
            };

            /* =====================
               LƯU ĐƠN VÀO MYSQL
            ====================== */
            const token = localStorage.getItem("bebiteToken");
            if (!token) {
                alert("Phiên đăng nhập đã hết hạn hoặc chưa đăng nhập. Vui lòng đăng nhập lại.");
                return;
            }

            // Khai báo biến result ở ngoài để khối bên dưới có thể truy cập được
            let result = null;

            try {
                const response = await fetch("https://bebite-backend.onrender.com/api/orders", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        order_code: order.id,
                        order_channel: "website",
                        customer_name: checkoutInfo.fullName,
                        customer_email: checkoutInfo.email,
                        total_amount: totalPrice,
                        status: "Đang xử lý",
                        items: order.items.map(function (item) {
                            return {
                                sku: String(item.sku || "").trim(),
                                product_id: Number(item.product_id) || null,
                                name: item.name || "Sản phẩm",
                                price: Number(item.price) || 0,
                                quantity: Number(item.quantity) || 1
                            };
                        })
                    })
                });

                result = await response.json();
                console.log("📦 Kết quả lưu đơn MySQL:", result);

                if (!response.ok || !result.success) {
                    console.error("❌ Không thể lưu đơn:", result);
                    alert(result.message || "Không thể lưu đơn hàng. Vui lòng thử lại.");
                    return;
                }

                console.log("✅ Đơn đã được lưu vào MySQL:", result.orderCode);

            } catch (error) {
                console.error("❌ Lỗi kết nối API tạo đơn:", error);
                alert("Không thể kết nối đến máy chủ backend. Vui lòng kiểm tra lại server node.");
                return;
            }

            /* =====================
               LƯU LỊCH SỬ VÀO LOCALSTORAGE
            ====================== */
            let orders = [];
            try {
                const savedOrders = localStorage.getItem("bebiteOrders");
                if (savedOrders) {
                    const parsedOrders = JSON.parse(savedOrders);
                    if (Array.isArray(parsedOrders)) {
                        orders = parsedOrders;
                    }
                }
            } catch (error) {
                console.error("Lỗi đọc lịch sử đơn hàng:", error);
                orders = [];
            }

            orders.push(order);
            localStorage.setItem("bebiteOrders", JSON.stringify(orders));
            localStorage.setItem("bebiteCheckoutInfo", JSON.stringify(checkoutInfo));

            // Dọn sạch giỏ hàng sau khi đặt thành công
            localStorage.removeItem(CART_KEY);

            /* =====================
               THÔNG BÁO HOÀN TẤT
            ====================== */
            const finalOrderCode = (result && result.orderCode) ? result.orderCode : order.id;
            const paymentMethod = checkoutInfo.payment;

            if (paymentMethod === "bank") {
                alert(
                    "ĐẶT HÀNG THÀNH CÔNG!\n\n" +
                    "Mã đơn hàng: " + finalOrderCode + "\n\n" +
                    "Vui lòng chuyển khoản theo thông tin ngân hàng để hoàn tất đơn hàng.\n\n" +
                    "Thông tin xác nhận đơn hàng sẽ được gửi đến: " + checkoutInfo.email
                );
            } else {
                alert(
                    "ĐẶT HÀNG THÀNH CÔNG!\n\n" +
                    "Mã đơn hàng: " + finalOrderCode + "\n\n" +
                    "BéBite sẽ liên hệ với bạn để xác nhận đơn hàng.\n\n" +
                    "Email nhận xác nhận: " + checkoutInfo.email
                );
            }

            // Chuyển hướng về trang chủ hoặc trang sản phẩm
            window.location.href = "/";
        });
    }


    /* =========================================
       KHỞI CHẠY
    ========================================= */

    renderCheckoutItems();
    setupOptions();
    setupLocation();
    setupForm();

});