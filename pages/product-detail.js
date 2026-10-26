function renderProductRating(rating, reviews) {
    const value = Number(rating) || 0;
    const reviewCount = Number(reviews) || 0;

    const fullStars = Math.floor(value);
    const fraction = value - fullStars;

    let starsHTML = "";

    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            starsHTML += `<span class="rating-star">★</span>`;
        } else if (i === fullStars && fraction > 0) {
            const opacity = 0.15 + (fraction * 0.85);
            starsHTML += `<span class="rating-star" style="opacity: ${opacity};">★</span>`;
        } else {
            starsHTML += `<span class="rating-star empty">★</span>`;
        }
    }

    return `
        <span class="product-rating-stars">${starsHTML}</span>
        <span class="product-rating-number">${value.toFixed(1)}</span>
        <span class="product-review-count">(${reviewCount} đánh giá)</span>
    `;
}

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       LẤY SKU TỪ URL
    ===================================================== */
    const params = new URLSearchParams(window.location.search);
    const sku = params.get("sku");

    if (typeof PRODUCTS === "undefined" || !Array.isArray(PRODUCTS)) {
        console.error("Không tìm thấy PRODUCTS. Hãy kiểm tra products.js.");
        return;
    }

    const product = PRODUCTS.find(function (item) {
        return String(item.sku) === String(sku);
    });

    if (!product) {
        document.body.innerHTML = `
            <div class="product-not-found">
                <h2>Không tìm thấy sản phẩm</h2>
                <p>Sản phẩm bạn đang tìm kiếm không tồn tại.</p>
                <a href="products.html">Quay lại trang sản phẩm</a>
            </div>
        `;
        return;
    }

    /* =====================================================
       TIỆN ÍCH
    ===================================================== */
    function formatPrice(price) {
        if (typeof price === "number" && !isNaN(price)) {
            return price.toLocaleString("vi-VN") + "₫";
        }
        if (price !== undefined && price !== null && String(price).trim() !== "") {
            return String(price);
        }
        return "Liên hệ";
    }

    function escapeSvgText(text) {
        return String(text || "Bébite")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&apos;");
    }

    function fallbackImageData(label) {
        const text = escapeSvgText(label || "Ảnh sản phẩm");
        return (
            "data:image/svg+xml;charset=UTF-8," +
            encodeURIComponent(`
                <svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
                    <rect width="600" height="600" fill="#fffdf8"/>
                    <rect x="35" y="35" width="530" height="530" rx="18" fill="none" stroke="#e4e8c9" stroke-width="3"/>
                    <text x="300" y="285" text-anchor="middle" font-family="Arial, sans-serif" font-size="30" font-weight="700" fill="#1c60b8">BÉBITE</text>
                    <text x="300" y="330" text-anchor="middle" font-family="Arial, sans-serif" font-size="19" fill="#789cba">${text}</text>
                </svg>
            `)
        );
    }

    /* =====================================================
       THÔNG TIN SẢN PHẨM
    ===================================================== */
    const productTitle = document.getElementById("productTitle");
    const productCategory = document.getElementById("productCategory");
    const productPrice = document.getElementById("productPrice");
    const productAge = document.getElementById("productAge");
    const productSize = document.getElementById("productSize");
    const productSizeMeta = document.getElementById("productSizeMeta");
    const productSku = document.getElementById("productSku");
    const productDescription = document.getElementById("productDescription");
    const descriptionContent = document.getElementById("descriptionContent");
    const breadcrumbProduct = document.getElementById("breadcrumbProduct");
    const productIngredients = document.getElementById("productIngredients");
    const productUsage = document.getElementById("productUsage");

    const featureCategory = document.getElementById("featureCategory");
    const featureFlavor = document.getElementById("featureFlavor");
    const featureNutrition = document.getElementById("featureNutrition");
    const featureSize = document.getElementById("featureSize");
    const featureOrigin = document.getElementById("featureOrigin");

    if (productTitle) productTitle.textContent = product.name || "";
    if (productCategory) productCategory.textContent = product.category || "";
    if (productPrice) productPrice.textContent = formatPrice(product.price);
    if (productAge) productAge.textContent = product.age || "—";
    if (productSize) productSize.textContent = product.size || "—";
    if (productSizeMeta) productSizeMeta.textContent = product.size || "—";
    if (productSku) productSku.textContent = product.sku || "—";

    if (featureCategory) featureCategory.textContent = product.category || "—";
    if (featureSize) featureSize.textContent = product.size || "—";
    if (featureFlavor) featureFlavor.textContent = product.flavor || "—";
    if (featureNutrition) featureNutrition.textContent = product.nutrition || "—";
    if (featureOrigin) featureOrigin.textContent = product.origin || "—";

    const productRatingStars = document.getElementById("productRatingStars");
    const productRatingValue = document.getElementById("productRatingValue");
    const productReviewCount = document.getElementById("productReviewCount");

    if (productRatingStars) {
        const value = Number(product.rating) || 0;
        const fullStars = Math.floor(value);
        const fraction = value - fullStars;
        let starsHTML = "";

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                starsHTML += "★";
            } else if (i === fullStars && fraction > 0) {
                const opacity = 0.15 + (fraction * 0.85);
                starsHTML += `<span style="opacity: ${opacity};">★</span>`;
            } else {
                starsHTML += `<span style="opacity: 0.15;">★</span>`;
            }
        }
        productRatingStars.innerHTML = starsHTML;
    }

    if (productRatingValue) {
        productRatingValue.textContent = Number(product.rating || 0).toFixed(1);
    }
    if (productReviewCount) {
        productReviewCount.textContent = `${Number(product.reviews || 0)} đánh giá`;
    }

    const description = product.description || "Thông tin sản phẩm đang được cập nhật.";
    if (productDescription) productDescription.textContent = description;
    if (descriptionContent) descriptionContent.textContent = description;
    if (breadcrumbProduct) breadcrumbProduct.textContent = product.name || "";
    if (productIngredients) productIngredients.textContent = product.ingredients || "Thông tin thành phần đang được cập nhật.";
    if (productUsage) productUsage.innerHTML = product.usage || "Thông tin hướng dẫn sử dụng đang được cập nhật.";

    document.title = `${product.name || "Chi tiết sản phẩm"} - Bébite`;

    /* =====================================================
       HỆ THỐNG ẢNH
    ===================================================== */
    const IMAGE_EXTENSIONS = ["png", "jpg", "jpeg", "webp"];
    const mainImage = document.getElementById("mainProductImage");
    const thumbList = document.getElementById("thumbList");
    const prevImage = document.getElementById("prevImage");
    const nextImage = document.getElementById("nextImage");

    let images = [];
    let currentImageIndex = 0;

    function getProductImageList(item) {
        let result = [];
        if (typeof PRODUCT_IMAGES !== "undefined" && PRODUCT_IMAGES && PRODUCT_IMAGES[item.sku]) {
            const source = PRODUCT_IMAGES[item.sku];
            if (Array.isArray(source)) {
                result = source.slice();
            } else if (typeof source === "string") {
                result = [source];
            }
        }
        if (result.length === 0 && item.image) {
            result = [item.image];
        }
        return result.filter(v => v !== undefined && v !== null && String(v).trim() !== "");
    }

    images = getProductImageList(product);

    function getImageBase() {
        return typeof IMAGE_BASE !== "undefined" && IMAGE_BASE ? IMAGE_BASE : "../assets/images/products/";
    }

    function hasExtension(value) {
        return /\.[a-zA-Z0-9]{2,5}(?:[?#].*)?$/.test(value);
    }

    function getImageCandidates(source) {
        if (!source) return [];
        let value = String(source).trim();
        if (!value) return [];

        if (value.startsWith("http://") || value.startsWith("https://") || value.startsWith("data:") || value.startsWith("blob:")) {
            return [value];
        }

        if (hasExtension(value)) {
            if (value.startsWith("/") || value.startsWith("../") || value.startsWith("./")) {
                return [value];
            }
            return [getImageBase() + value];
        }

        const cleanValue = value.replace(/^\.\/+/, "");
        const base = cleanValue.startsWith("../") || cleanValue.startsWith("/") ? "" : getImageBase();
        const pathValue = base + cleanValue;

        return IMAGE_EXTENSIONS.map(ext => pathValue + "." + ext);
    }

    function setSafeImage(img, source, alt, onFinalFail) {
        if (!img) return;
        const candidates = getImageCandidates(source);
        let currentCandidate = 0;
        let finished = false;

        img.alt = alt || product.name || "Sản phẩm Bébite";
        img.classList.remove("image-fallback");

        if (candidates.length === 0) {
            finished = true;
            img.src = fallbackImageData(alt || product.name || "Ảnh sản phẩm");
            img.classList.add("image-fallback");
            return;
        }

        function tryNextImage() {
            if (finished) return;
            if (currentCandidate >= candidates.length) {
                finished = true;
                img.onerror = null;
                img.src = fallbackImageData(alt || product.name || "Ảnh sản phẩm");
                img.classList.add("image-fallback");
                if (typeof onFinalFail === "function") onFinalFail(img);
                return;
            }
            const nextSrc = candidates[currentCandidate++];
            img.src = nextSrc;
        }

        img.onerror = tryNextImage;
        tryNextImage();
    }

    function showImage(index) {
        if (!mainImage || images.length === 0) return;
        if (index < 0) index = images.length - 1;
        if (index >= images.length) index = 0;

        currentImageIndex = index;
        setSafeImage(mainImage, images[index], product.name || "Sản phẩm Bébite");

        if (thumbList) {
            thumbList.querySelectorAll(".product-thumbnail").forEach((thumb, i) => {
                thumb.classList.toggle("active", i === currentImageIndex);
            });
        }
    }

    function renderThumbnails() {
        if (!thumbList) return;
        thumbList.innerHTML = "";

        images.forEach((image, index) => {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "product-thumbnail";
            if (index === 0) button.classList.add("active");

            const img = document.createElement("img");
            img.alt = `${product.name || "Sản phẩm"} - ảnh ${index + 1}`;
            img.loading = "lazy";
            setSafeImage(img, image, img.alt);

            button.appendChild(img);
            button.addEventListener("click", () => showImage(index));
            thumbList.appendChild(button);
        });
    }

    if (images.length === 0) images = [""];
    renderThumbnails();
    showImage(0);

    if (prevImage) prevImage.addEventListener("click", () => showImage(currentImageIndex - 1));
    if (nextImage) nextImage.addEventListener("click", () => showImage(currentImageIndex + 1));

    if (images.length <= 1) {
        if (prevImage) prevImage.style.display = "none";
        if (nextImage) nextImage.style.display = "none";
    }

    /* =====================================================
       HỆ THỐNG BIẾN THỂ TỰ ĐỘNG (VARIANTS)
    ===================================================== */
    const variantBox = document.getElementById("productVariants") || document.querySelector(".product-variants");

    if (variantBox) {
        const variants = product.groupId
            ? PRODUCTS.filter(item => item.groupId === product.groupId)
            : [];

        if (variants.length > 1) {
            variantBox.style.display = "flex";
            variantBox.innerHTML = variants.map(v => {
                const isActive = (v.sku === product.sku) ? "active" : "";
                const label = v.variantLabel || v.age || v.size || v.name;
                const vImages = getProductImageList(v);
                const vImgSrc = vImages.length ? vImages[0] : "";

                return `
                    <button type="button" class="variant ${isActive}" data-sku="${v.sku}">
                        <img src="" alt="${label}" data-variant-img="${vImgSrc}">
                        <span>${label}</span>
                    </button>
                `;
            }).join("");

            variantBox.querySelectorAll("[data-variant-img]").forEach(img => {
                setSafeImage(img, img.dataset.variantImg, img.alt);
            });

            variantBox.querySelectorAll(".variant").forEach(btn => {
                btn.addEventListener("click", () => {
                    const targetSku = btn.dataset.sku;
                    if (targetSku && targetSku !== product.sku) {
                        window.location.href = `product-detail.html?sku=${encodeURIComponent(targetSku)}`;
                    }
                });
            });
        } else {
            variantBox.style.display = "none";
        }
    }

    /* =====================================================
       SỐ LƯỢNG & TÍNH GIÁ
    ===================================================== */
    const quantityInput = document.getElementById("quantityInput");
    const minusBtn = document.getElementById("minusBtn");
    const plusBtn = document.getElementById("plusBtn");

    function getQuantity() {
        if (!quantityInput) return 1;
        let quantity = parseInt(quantityInput.value, 10);
        if (isNaN(quantity)) quantity = 1;
        quantity = Math.max(1, Math.min(99, quantity));
        quantityInput.value = quantity;
        return quantity;
    }

    function updateQuantityPrice() {
        if (!productPrice || !product) return;
        const quantity = getQuantity();
        const unitPrice = Number(product.price);
        if (isNaN(unitPrice)) {
            productPrice.textContent = formatPrice(product.price);
            return;
        }
        productPrice.textContent = formatPrice(unitPrice * quantity);
    }

    if (minusBtn) {
        minusBtn.addEventListener("click", () => {
            const quantity = getQuantity();
            quantityInput.value = Math.max(1, quantity - 1);
            updateQuantityPrice();
        });
    }

    if (plusBtn) {
        plusBtn.addEventListener("click", () => {
            const quantity = getQuantity();
            quantityInput.value = Math.min(99, quantity + 1);
            updateQuantityPrice();
        });
    }

    updateQuantityPrice();

    /* =====================================================
       GIỎ HÀNG
    ===================================================== */
    const addCartBtn = document.getElementById("addCartBtn");
    const toast = document.getElementById("toast");
    const CART_KEY = "bebite_cart";

    function getCart() {
        try {
            const saved = localStorage.getItem(CART_KEY);
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            return [];
        }
    }

    function saveCart(cart) {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
    }

    function showToast(message) {
        if (!toast) {
            alert(message);
            return;
        }
        toast.textContent = message;
        toast.classList.add("show");
        clearTimeout(window.bebiteToastTimer);
        window.bebiteToastTimer = setTimeout(() => toast.classList.remove("show"), 1800);
    }

    function addToCart(productData, quantity) {
        const cart = getCart();
        const existing = cart.find(item => item.sku === productData.sku);
        if (existing) {
            existing.quantity = Math.min(99, Number(existing.quantity || 0) + quantity);
        } else {
            cart.push({
                sku: productData.sku,
                name: productData.name,
                price: Number(productData.price) || 0,
                quantity: quantity
            });
        }
        saveCart(cart);
        showToast(`Đã thêm ${quantity} sản phẩm vào giỏ hàng!`);
    }

    if (addCartBtn) {
        addCartBtn.addEventListener("click", () => {
            addToCart(product, getQuantity());
        });
    }

    /* =====================================================
       ACCORDION
    ===================================================== */
    document.querySelectorAll(".product-accordion").forEach(accordion => {
        const title = accordion.querySelector(".accordion-title");
        const content = accordion.querySelector(".accordion-content");
        if (!title || !content) return;

        title.addEventListener("click", () => {
            const isOpen = accordion.classList.contains("open");
            accordion.classList.toggle("open", !isOpen);
            title.setAttribute("aria-expanded", String(!isOpen));
            const icon = title.querySelector("span:last-child");
            if (icon) icon.textContent = isOpen ? "+" : "−";
        });
    });

    /* =====================================================
       SẢN PHẨM DÀNH RIÊNG CHO BẠN (CÁ NHÂN HÓA HOẶC RANDOM)
    ===================================================== */
    const relatedGrid = document.getElementById("relatedGrid") || document.getElementById("relatedProducts");

    function getPersonalizedForDetail(currentSku, count = 4) {
        const profile = typeof getBabyProfile === "function" ? getBabyProfile() : null;
        const otherProducts = PRODUCTS.filter(item => item.sku !== currentSku);

        if (profile && typeof getPersonalizedScore === "function") {
            const scored = otherProducts
                .map(item => ({
                    product: item,
                    score: getPersonalizedScore(item, profile)
                }))
                .filter(entry => entry.score > -999)
                .sort((a, b) => b.score - a.score);

            if (scored.length >= count) {
                return scored.slice(0, count).map(entry => entry.product);
            }
        }

        return otherProducts
            .sort(() => 0.5 - Math.random())
            .slice(0, count);
    }

    function renderRelatedProducts() {
        if (!relatedGrid) return;
        const relatedProducts = getPersonalizedForDetail(product.sku, 4);

        relatedGrid.innerHTML = relatedProducts.map(item => {
            const displayName = item.name || `Tên sản phẩm — ${item.sku}`;
            const imageList = getProductImageList(item);
            const imageSource = imageList.length ? imageList[0] : "";

            return `
                <article class="product-card related-card" data-category="${item.category}" data-price="${item.price ?? 999999999}">
                    <div class="product-badge">${item.age || ""}</div>
                    <a class="product-image related-image" href="product-detail.html?sku=${encodeURIComponent(item.sku)}" aria-label="${displayName}">
                        <img src="" alt="${displayName}" data-related-image="${imageSource}">
                    </a>
                    <div class="product-category">${item.category} · ${item.sku}</div>
                    <h3 class="product-name">${displayName}</h3>
                    <p class="product-description">${item.description || ""}</p>
                    <div class="product-bottom">
                        <span class="product-age">${item.size || ""}</span>
                        <span class="product-price">${formatPrice(item.price)}</span>
                    </div>
                    <button class="add-cart-btn related-cart" type="button" data-sku="${item.sku}">
                        <i class="fa-solid fa-cart-plus"></i> Thêm vào giỏ
                    </button>
                </article>
            `;
        }).join("");

        relatedGrid.querySelectorAll("[data-related-image]").forEach(img => {
            setSafeImage(img, img.dataset.relatedImage, img.alt);
        });

        relatedGrid.querySelectorAll(".related-cart").forEach(button => {
            button.addEventListener("click", e => {
                e.preventDefault();
                e.stopPropagation();
                const targetProduct = PRODUCTS.find(item => item.sku === button.dataset.sku);
                if (targetProduct) addToCart(targetProduct, 1);
            });
        });
    }

    renderRelatedProducts();

    /* =====================================================
       LOCATION MODAL
    ===================================================== */
    const locationButton = document.getElementById("locationButton");
    const locationModal = document.getElementById("locationModal");
    const locationOverlay = document.getElementById("locationOverlay");
    const closeLocation = document.getElementById("closeLocation");

    if (locationButton && locationModal) {
        locationButton.addEventListener("click", () => {
            locationModal.classList.add("active", "open");
        });
    }

    function closeLocationModal() {
        if (!locationModal) return;
        locationModal.classList.remove("active", "open");
    }

    if (locationOverlay) locationOverlay.addEventListener("click", closeLocationModal);
    if (closeLocation) closeLocation.addEventListener("click", closeLocationModal);

});