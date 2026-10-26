const productTableBody = document.getElementById("productTableBody");
const pageMessage = document.getElementById("pageMessage");
const searchProduct = document.getElementById("searchProduct");
const categoryFilter = document.getElementById("categoryFilter");

const totalProducts = document.getElementById("totalProducts");
const inStockProducts = document.getElementById("inStockProducts");
const outOfStockProducts = document.getElementById("outOfStockProducts");
const productCount = document.getElementById("productCount");

const addProductBtn = document.getElementById("addProductBtn");
const refreshProducts = document.getElementById("refreshProducts");
const logoutBtn = document.getElementById("logoutBtn");

let products = [];
let editingProduct = null;
let selectedImageFile = null;
let previewObjectUrl = null;

function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[character]);
}

function formatPrice(price) {
    const amount = Number(price);
    return Number.isFinite(amount)
        ? amount.toLocaleString("vi-VN") + " ₫"
        : "Chưa cập nhật";
}

function getStock(product) {
    const stock = Number(product.stock);
    return Number.isFinite(stock) ? stock : 0;
}

function getImageUrl(image) {
    if (!image) return "";

    image = String(image).trim();

    if (/^(https?:\/\/|data:|blob:)/i.test(image)) {
        return image;
    }

    image = image
        .replace(/^\/+/, "")
        .replace(/^(\.\.\/)+/, "")
        .replace(/^assets\/images\/products\//, "")
        .replace(/^images\/products\//, "");

    return "/assets/images/products/" + image;
}

function getAuthHeaders() {
    const token = localStorage.getItem("bebiteToken");

    if (!token) {
        throw new Error("Phiên đăng nhập không tồn tại. Vui lòng đăng nhập lại.");
    }

    return { Authorization: "Bearer " + token };
}

async function readResponse(response) {
    const data = await response.json().catch(() => ({}));

    if (response.status === 401 || response.status === 403) {
        throw new Error(
            data.message || "Bạn không có quyền thực hiện thao tác này. Hãy đăng nhập lại bằng tài khoản Admin."
        );
    }

    if (!response.ok || data.success === false) {
        throw new Error(data.message || "Yêu cầu thất bại.");
    }

    return data;
}

function showMessage(message, isError = false) {
    if (!pageMessage) return;
    pageMessage.textContent = message;
    pageMessage.classList.toggle("is-error", isError);
}

function loadCategoryOptions() {
    if (!categoryFilter) return;
    const currentValue = categoryFilter.value;

    const categories = [
        ...new Set(
            products
                .map(product => String(product.category ?? "").trim())
                .filter(Boolean)
        )
    ].sort((a, b) => a.localeCompare(b, "vi"));

    categoryFilter.innerHTML =
        '<option value="">Tất cả danh mục</option>' +
        categories.map(category =>
            `<option value="${escapeHTML(category)}">${escapeHTML(category)}</option>`
        ).join("");

    if (categories.includes(currentValue)) {
        categoryFilter.value = currentValue;
    }
}

function updateStatistics() {
    if (totalProducts) totalProducts.textContent = products.length;
    if (inStockProducts) {
        inStockProducts.textContent =
            products.filter(product => getStock(product) > 0).length;
    }
    if (outOfStockProducts) {
        outOfStockProducts.textContent =
            products.filter(product => getStock(product) <= 0).length;
    }
}

function renderProducts() {
    if (!productTableBody || !searchProduct || !categoryFilter) return;

    const keyword = searchProduct.value.trim().toLocaleLowerCase("vi");
    const selectedCategory = categoryFilter.value;

    const filteredProducts = products.filter(product => {
        const name = String(product.name ?? "").toLocaleLowerCase("vi");
        const category = String(product.category ?? "");

        return name.includes(keyword) &&
            (!selectedCategory || category === selectedCategory);
    });

    if (productCount) {
        productCount.textContent =
            `Hiển thị ${filteredProducts.length} / ${products.length} sản phẩm`;
    }

    if (!filteredProducts.length) {
        productTableBody.innerHTML = `
            <tr>
                <td colspan="5" class="empty-cell">
                    Không tìm thấy sản phẩm phù hợp.
                </td>
            </tr>`;
        return;
    }

    productTableBody.innerHTML = filteredProducts.map(product => {
        const stock = getStock(product);
        const imageUrl = getImageUrl(product.image);

        const imageMarkup = imageUrl
            ? `<img src="${escapeHTML(imageUrl)}"
                    alt="${escapeHTML(product.name)}"
                    onerror="this.hidden=true;this.parentElement.classList.add('image-missing')">`
            : "";

        return `
            <tr>
                <td>
                    <div class="product-cell">
                        <div class="product-thumb ${imageUrl ? "" : "image-missing"}">
                            ${imageMarkup}
                            <span class="product-thumb-fallback">B</span>
                        </div>
                        <div>
                            <div class="product-name">
                                ${escapeHTML(product.name || "Chưa có tên")}
                            </div>
                            <div class="product-id">
                                SKU: ${escapeHTML(product.sku || "Chưa có SKU")}
                            </div>
                        </div>
                    </div>
                </td>
                <td>
                    <span class="category-pill">
                        ${escapeHTML(product.category || "Chưa phân loại")}
                    </span>
                </td>
                <td><strong>${formatPrice(product.price)}</strong></td>
                <td>
                    <span class="stock-pill ${stock <= 0 ? "out" : ""}">
                        ${stock <= 0 ? "Hết hàng" : stock + " sản phẩm"}
                    </span>
                </td>
                <td>
                    <div class="product-actions">
                        <button type="button"
                            class="product-action-btn edit"
                            data-action="edit"
                            data-id="${escapeHTML(product.id)}">Sửa</button>
                        <button type="button"
                            class="product-action-btn delete"
                            data-action="delete"
                            data-id="${escapeHTML(product.id)}">Xóa</button>
                    </div>
                </td>
            </tr>`;
    }).join("");
}

function createProductModal() {
    if (document.getElementById("productModal")) return;

    document.body.insertAdjacentHTML("beforeend", `
        <div id="productModal" class="product-modal"
             aria-hidden="true">
            <div class="product-modal-backdrop" data-close-modal></div>

            <section class="product-modal-dialog"
                     role="dialog" aria-modal="true"
                     aria-labelledby="productModalTitle">
                <div class="product-modal-header">
                    <div>
                        <h2 id="productModalTitle">Thêm sản phẩm</h2>
                        <p>Nhập thông tin sản phẩm cần quản lý.</p>
                    </div>
                    <button type="button" id="closeProductModal"
                            class="product-modal-close"
                            aria-label="Đóng">×</button>
                </div>

                <form id="productForm">
                    <div class="product-form-layout">
                        <div class="product-image-column">
                            <label class="form-label">Ảnh sản phẩm</label>
                            <div id="productImagePreview"
                                 class="product-image-preview">
                                <span>Chưa có ảnh</span>
                            </div>
                            <label for="productImage"
                                   class="product-upload-btn">
                                Chọn ảnh từ máy
                            </label>
                            <input id="productImage" type="file"
                                   accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                                   hidden>
                            <small>JPG, PNG hoặc WEBP · Tối đa 5 MB</small>
                        </div>

                        <div class="product-fields">
                            <label class="form-label" for="productName">
                                Tên sản phẩm *
                            </label>
                            <input id="productName" required maxlength="255"
                                   placeholder="Ví dụ: Dầu ô liu ăn dặm">

                            <div class="product-form-row">
                               <label class="form-label" for="productCategory">
                                   Danh mục *
                               </label>
                               <select id="productCategory" required>
                                   <option value="">Chọn danh mục</option>
                                   <option value="Sữa bột">Sữa bột</option>
                                   <option value="Các loại hạt">Các loại hạt</option>
                                   <option value="Bánh ăn dặm">Bánh ăn dặm</option>
                                   <option value="Bánh hũ">Bánh hũ</option>
                                   <option value="Bánh quy ăn dặm">Bánh quy ăn dặm</option>
                                   <option value="Dầu ăn dặm">Dầu ăn dặm</option>
                                   <option value="Trái cây nghiền">Trái cây nghiền</option>
                                   <option value="Sữa chua uống">Sữa chua uống</option>
                                   <option value="Bánh gạo">Bánh gạo</option>
                                   <option value="Cháo ăn dặm">Cháo ăn dặm</option>
                                   <option value="Dầu massage">Dầu massage</option>
                               </select>
                                <div>
                                    <label class="form-label" for="productAge">
                                        Độ tuổi phù hợp
                                    </label>
                                    <input id="productAge"
                                           placeholder="Ví dụ: 6 tháng+">
                                </div>
                            </div>

                            <div class="product-form-row">
                                <div>
                                    <label class="form-label" for="productPrice">
                                        Giá bán (₫) *
                                    </label>
                                    <input id="productPrice" type="number"
                                           min="0" step="1" required
                                           placeholder="89000">
                                </div>
                                <div>
                                    <label class="form-label" for="productStock">
                                        Tồn kho *
                                    </label>
                                    <input id="productStock" type="number"
                                           min="0" step="1" required
                                           value="0">
                                </div>
                            </div>

                            <label class="form-label" for="productDescription">
                                Mô tả sản phẩm
                            </label>
                            <textarea id="productDescription" rows="4"
                                      placeholder="Nhập thông tin sản phẩm..."></textarea>
                        </div>
                    </div>

                    <p id="productFormMessage" class="product-form-message"
                       role="status"></p>

                    <div class="product-modal-actions">
                        <button type="button" id="cancelProductModal"
                                class="secondary-btn">Hủy</button>
                        <button type="submit" id="saveProductBtn"
                                class="primary-btn">Lưu sản phẩm</button>
                    </div>
                </form>
            </section>
        </div>
    `);

    document.getElementById("closeProductModal")
        .addEventListener("click", closeProductModal);

    document.getElementById("cancelProductModal")
        .addEventListener("click", closeProductModal);

    document.querySelector("#productModal [data-close-modal]")
        .addEventListener("click", closeProductModal);

    document.getElementById("productImage")
        .addEventListener("change", handleImageSelection);

    document.getElementById("productForm")
        .addEventListener("submit", saveProduct);

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") closeProductModal();
    });
}

function updateImagePreview(imageUrl = "") {
    const preview = document.getElementById("productImagePreview");

    if (previewObjectUrl) {
        URL.revokeObjectURL(previewObjectUrl);
        previewObjectUrl = null;
    }

    if (selectedImageFile) {
        previewObjectUrl = URL.createObjectURL(selectedImageFile);
        preview.innerHTML =
            `<img src="${previewObjectUrl}" alt="Ảnh xem trước">`;
    } else if (imageUrl) {
        preview.innerHTML =
            `<img src="${escapeHTML(getImageUrl(imageUrl))}" alt="Ảnh sản phẩm"
             onerror="this.hidden=true;this.parentElement.insertAdjacentHTML('beforeend','<span>Không tải được ảnh</span>')">`;
    } else {
        preview.innerHTML = "<span>Chưa có ảnh</span>";
    }
}

function handleImageSelection(event) {
    const file = event.target.files[0];
    const message = document.getElementById("productFormMessage");

    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
        event.target.value = "";
        selectedImageFile = null;
        updateImagePreview(editingProduct?.image || "");
        message.textContent = "Chỉ chấp nhận ảnh JPG, PNG hoặc WEBP.";
        return;
    }

    if (file.size > 5 * 1024 * 1024) {
        event.target.value = "";
        selectedImageFile = null;
        updateImagePreview(editingProduct?.image || "");
        message.textContent = "Ảnh không được vượt quá 5 MB.";
        return;
    }

    selectedImageFile = file;
    message.textContent = "";
    updateImagePreview();
}

function openProductModal(product = null) {
    createProductModal();

    editingProduct = product;
    selectedImageFile = null;

    const modal = document.getElementById("productModal");
    const form = document.getElementById("productForm");

    form.reset();

    document.getElementById("productModalTitle").textContent =
        product ? "Cập nhật sản phẩm" : "Thêm sản phẩm";

    document.getElementById("saveProductBtn").textContent =
        product ? "Lưu thay đổi" : "Lưu sản phẩm";

    document.getElementById("productName").value = product?.name || "";
    document.getElementById("productCategory").value = product?.category || "";
    document.getElementById("productAge").value = product?.age || "";
    document.getElementById("productPrice").value = product?.price ?? "";
    document.getElementById("productStock").value = product?.stock ?? 0;
    document.getElementById("productDescription").value =
        product?.description || "";

    document.getElementById("productFormMessage").textContent = "";

    document.getElementById("productImage").value = "";
    updateImagePreview(product?.image || "");

    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("product-modal-open");

    document.getElementById("productName").focus();
}

function closeProductModal() {
    const modal = document.getElementById("productModal");
    if (!modal) return;

    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("product-modal-open");

    if (previewObjectUrl) {
        URL.revokeObjectURL(previewObjectUrl);
        previewObjectUrl = null;
    }

    selectedImageFile = null;
    editingProduct = null;
}

async function uploadSelectedImage() {
    if (!selectedImageFile) return null;

    const formData = new FormData();
    formData.append("image", selectedImageFile);

    const response = await fetch("/api/admin/products/upload-image", {
        method: "POST",
        headers: getAuthHeaders(),
        body: formData
    });

    const data = await readResponse(response);

    if (!data.image) {
        throw new Error("Máy chủ chưa trả về đường dẫn ảnh.");
    }

    return data.image;
}

async function saveProduct(event) {
    event.preventDefault();

    const saveButton = document.getElementById("saveProductBtn");
    const message = document.getElementById("productFormMessage");

    const payload = {
        name: document.getElementById("productName").value.trim(),
        category: document.getElementById("productCategory").value.trim(),
        price: Number(document.getElementById("productPrice").value),
        stock: Number(document.getElementById("productStock").value),
        age: document.getElementById("productAge").value.trim(),
        description: document.getElementById("productDescription").value.trim(),
        image: editingProduct?.image || ""
    };

    if (!payload.name || !payload.category) {
        message.textContent = "Vui lòng nhập tên sản phẩm và danh mục.";
        return;
    }

    if (!Number.isFinite(payload.price) || payload.price < 0 ||
        !Number.isInteger(payload.stock) || payload.stock < 0) {
        message.textContent = "Giá bán và tồn kho phải là số hợp lệ.";
        return;
    }

    saveButton.disabled = true;
    saveButton.textContent = "Đang lưu...";
    message.textContent = "";

    try {
        const uploadedImage = await uploadSelectedImage();
        if (uploadedImage) payload.image = uploadedImage;

        const isEditing = Boolean(editingProduct);
        const url = isEditing
            ? `/api/admin/products/${encodeURIComponent(editingProduct.id)}`
            : "/api/admin/products";

        const response = await fetch(url, {
            method: isEditing ? "PUT" : "POST",
            headers: {
                ...getAuthHeaders(),
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        await readResponse(response);

        closeProductModal();
        await loadProducts();

        showMessage(
            isEditing
                ? "Đã cập nhật sản phẩm thành công."
                : "Đã thêm sản phẩm thành công."
        );
    } catch (error) {
        console.error("Lỗi lưu sản phẩm:", error);
        message.textContent =
            "Không thể lưu sản phẩm: " +
            (error.message || "Lỗi không xác định.");
    } finally {
        saveButton.disabled = false;
        saveButton.textContent =
            editingProduct ? "Lưu thay đổi" : "Lưu sản phẩm";
    }
}

async function deleteProduct(product) {
    const confirmed = confirm(
        `Bạn có chắc muốn xóa sản phẩm "${product.name}" không?`
    );

    if (!confirmed) return;

    try {
        const response = await fetch(
            `/api/admin/products/${encodeURIComponent(product.id)}`,
            {
                method: "DELETE",
                headers: getAuthHeaders()
            }
        );

        await readResponse(response);
        await loadProducts();
        showMessage("Đã xóa sản phẩm thành công.");
    } catch (error) {
        showMessage(error.message, true);
    }
}

async function loadProducts() {
    showMessage("Đang tải danh sách sản phẩm...");

    try {
        const response = await fetch("/api/products");
        const data = await readResponse(response);

        if (!Array.isArray(data.products)) {
            throw new Error("Dữ liệu sản phẩm trả về không hợp lệ.");
        }

        products = data.products;
        loadCategoryOptions();
        updateStatistics();
        renderProducts();

        showMessage("Đã tải danh sách sản phẩm thành công.");
    } catch (error) {
        showMessage("Không thể tải sản phẩm: " + error.message, true);

        if (productTableBody) {
            productTableBody.innerHTML = `
                <tr><td colspan="5" class="empty-cell">
                    Tải dữ liệu thất bại. Hãy kiểm tra backend và API.
                </td></tr>`;
        }

        if (productCount) productCount.textContent = "Chưa tải được danh sách sản phẩm";
    }
}

if (searchProduct) searchProduct.addEventListener("input", renderProducts);
if (categoryFilter) categoryFilter.addEventListener("change", renderProducts);
if (refreshProducts) refreshProducts.addEventListener("click", loadProducts);

if (addProductBtn) addProductBtn.addEventListener("click", () => openProductModal());

if (productTableBody) {
    productTableBody.addEventListener("click", event => {
        const button = event.target.closest("[data-action]");
        if (!button) return;

        const product = products.find(
            item => String(item.id) === button.dataset.id
        );

        if (!product) {
            showMessage("Không tìm thấy sản phẩm cần thao tác.", true);
            return;
        }

        if (button.dataset.action === "edit") {
            openProductModal(product);
        } else if (button.dataset.action === "delete") {
            deleteProduct(product);
        }
    });
}

if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        if (!confirm("Bạn muốn đăng xuất khỏi tài khoản Bébite?")) return;

        localStorage.removeItem("bebiteToken");
        localStorage.removeItem("bebiteCurrentUser");
        window.location.href = "../index.html";
    });
}

createProductModal();
loadProducts();

/* =====================================================
   BÉBITE ADMIN — QUẢN LÝ ĐƠN HÀNG ĐA KÊNH
===================================================== */
const refreshOrdersBtn = document.getElementById("refreshOrders");
const searchOrderInput = document.getElementById("searchOrder");
const orderChannelFilter = document.getElementById("orderChannelFilter");
const orderStatusFilter = document.getElementById("orderStatusFilter");
const orderTableBody = document.getElementById("orderTableBody");
const orderPageMessage = document.getElementById("orderPageMessage");
const orderCount = document.getElementById("orderCount");

let adminOrders = [];

function formatOrderMoney(value) {
    return Number(value || 0).toLocaleString("vi-VN") + "đ";
}

function formatOrderDate(value) {
    if (!value) return "—";

    return new Date(value).toLocaleString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
}

function getOrderChannelName(channel) {
    const names = {
        website: "Website Bébite",
        shopee: "Shopee",
        tiktok_shop: "TikTok Shop"
    };

    return names[channel] || channel || "—";
}


function renderAdminOrders() {
    if (!orderTableBody) return;

    const keyword = (searchOrderInput?.value || "").trim().toLowerCase();
    const channel = orderChannelFilter?.value || "";
    const status = orderStatusFilter?.value || "";

    const filteredOrders = adminOrders.filter(order => {
        const matchesKeyword =
            String(order.order_code || "").toLowerCase().includes(keyword) ||
            String(order.email || "").toLowerCase().includes(keyword);

        const matchesChannel =
            !channel || order.order_channel === channel;

        const matchesStatus =
            !status || order.status === status;

        return matchesKeyword && matchesChannel && matchesStatus;
    });

    if (orderCount) {
        orderCount.textContent =
            `Hiển thị ${filteredOrders.length} / ${adminOrders.length} đơn hàng`;
    }

    if (!filteredOrders.length) {
        orderTableBody.innerHTML = `
            <tr>
                <td colspan="6" style="
                    padding:30px 16px;
                    text-align:center;
                    color:#7590AE;
                    font-size:12px;
                    font-weight:400;
                ">
                    Không tìm thấy đơn hàng phù hợp.
                </td>
            </tr>
        `;
        return;
    }

    const statuses = [
        "Đã đặt hàng",
        "Đang xử lý",
        "Đang giao",
        "Đã giao",
        "Đã hủy"
    ];

    orderTableBody.innerHTML = filteredOrders.map(order => {
        const orderId = escapeAdminOrderText(order.id);
        const orderCode = escapeAdminOrderText(order.order_code || "—");
        const email = escapeAdminOrderText(order.email || "—");
        const channelName = escapeAdminOrderText(
            getOrderChannelName(order.order_channel)
        );

        const currentStatus = statuses.includes(order.status)
            ? order.status
            : "Đã đặt hàng";

        const itemsHtml = (order.items || []).map(item => `
            <div style="
                display:flex;
                justify-content:space-between;
                gap:10px;
                color:#58718B;
                font-size:11px;
                font-weight:400;
                line-height:1.7;
            ">
                <span>${escapeAdminOrderText(item.name || "Sản phẩm")}</span>
                <span style="white-space:nowrap;">
                    × ${Number(item.quantity || 0)}
                </span>
            </div>
        `).join("");

        return `
            <tr style="border-bottom:1px solid #EDF1E7;">
                <td style="padding:15px 14px; min-width:135px; vertical-align:middle;">
                    <div style="
                        color:#365675;
                        font-size:12px;
                        font-weight:600;
                        overflow-wrap:anywhere;
                    ">${orderCode}</div>

                    <div style="
                        margin-top:5px;
                        color:#8AA0B8;
                        font-size:10px;
                        font-weight:400;
                        white-space:nowrap;
                    ">${escapeAdminOrderText(formatOrderDate(order.order_date))}</div>
                </td>

                <td style="
                    padding:15px 14px;
                    color:#58718B;
                    font-size:11px;
                    font-weight:400;
                    overflow-wrap:anywhere;
                    vertical-align:middle;
                ">${email}</td>

                <td style="padding:15px 14px; vertical-align:middle;">
                    <span class="admin-order-channel channel-${escapeAdminOrderText(order.order_channel)}"
                        style="
                            color:#58718B;
                            font-size:11px;
                            font-weight:400;
                            white-space:nowrap;
                        ">
                        ${channelName}
                    </span>
                </td>

                <td style="
                    padding:15px 14px;
                    min-width:150px;
                    max-width:230px;
                    vertical-align:middle;
                ">
                    ${itemsHtml || '<span style="color:#8AA0B8;">—</span>'}
                </td>

                <td style="
                    padding:15px 14px;
                    color:#365675;
                    font-size:11px;
                    font-weight:600;
                    white-space:nowrap;
                    vertical-align:middle;
                ">${formatOrderMoney(order.total_amount)}</td>

                <td style="padding:12px 14px; min-width:175px; vertical-align:middle;">
                    <div style="
                        display:flex;
                        align-items:center;
                        gap:5px;
                        white-space:nowrap;
                    ">
                        <select
                            class="admin-order-status-select"
                            data-order-id="${orderId}"
                            aria-label="Cập nhật trạng thái đơn ${orderCode}"
                            style="
                                width:122px;
                                height:32px;
                                padding:0 6px;
                                border:1px solid #DCE5D0;
                                border-radius:5px;
                                background:#FFFFFF;
                                color:#365675;
                                font-family:Montserrat,sans-serif;
                                font-size:10px;
                                font-weight:400;
                                outline:none;
                                cursor:pointer;
                            "
                        >
                            ${statuses.map(st => `
                                <option value="${st}" ${currentStatus === st ? "selected" : ""}>
                                    ${st}
                                </option>
                            `).join("")}
                        </select>

                        <button
                            type="button"
                            class="admin-order-save-btn"
                            data-order-id="${orderId}"
                            style="
                                height:32px;
                                padding:0 9px;
                                border:1px solid #E1E9D2;
                                border-radius:5px;
                                background:#F7F9E4;
                                color:#1C60B8;
                                font-family:Montserrat,sans-serif;
                                font-size:10px;
                                font-weight:500;
                                cursor:pointer;
                                flex-shrink:0;
                            "
                        >Lưu</button>
                    </div>
                </td>
            </tr>
        `;
    }).join("");
}

function escapeAdminOrderText(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}

async function loadAdminOrders() {
    if (!orderTableBody) return;

    if (orderPageMessage) orderPageMessage.textContent = "Đang tải đơn hàng...";
    orderTableBody.innerHTML = `
        <tr>
            <td colspan="6" class="empty-cell">Đang tải đơn hàng...</td>
        </tr>
    `;

    try {
        const token = localStorage.getItem("bebiteToken");

        const response = await fetch("/api/admin/orders", {
            headers: {
                Authorization: "Bearer " + token
            }
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
            throw new Error(data.message || "Không thể tải đơn hàng.");
        }

        adminOrders = data.orders || [];
        if (orderPageMessage) {
            orderPageMessage.textContent =
                `Đã tải ${adminOrders.length} đơn hàng từ hệ thống.`;
        }

        renderAdminOrders();
    } catch (error) {
        console.error("Lỗi tải đơn hàng Admin:", error);
        if (orderPageMessage) {
            orderPageMessage.textContent =
                "Không tải được đơn hàng. Vui lòng nhấn Làm mới để thử lại.";
        }
        orderTableBody.innerHTML = `
            <tr>
                <td colspan="6" class="empty-cell">
                    Có lỗi khi tải dữ liệu đơn hàng.
                </td>
            </tr>
        `;
        if (orderCount) orderCount.textContent = "Không tải được đơn hàng";
    }
}

if (refreshOrdersBtn) refreshOrdersBtn.addEventListener("click", loadAdminOrders);
if (searchOrderInput) searchOrderInput.addEventListener("input", renderAdminOrders);
if (orderChannelFilter) orderChannelFilter.addEventListener("change", renderAdminOrders);
if (orderStatusFilter) orderStatusFilter.addEventListener("change", renderAdminOrders);

if (orderTableBody) {
    orderTableBody.addEventListener("click", async event => {
        const saveButton = event.target.closest(".admin-order-save-btn");
        if (!saveButton) return;

        const orderId = saveButton.dataset.orderId;
        const statusSelect = orderTableBody.querySelector(
            `.admin-order-status-select[data-order-id="${orderId}"]`
        );

        if (!statusSelect) return;

        const newStatus = statusSelect.value;
        saveButton.disabled = true;
        saveButton.textContent = "Đang lưu...";

        try {
            const response = await fetch(
                `/api/admin/orders/${encodeURIComponent(orderId)}/status`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + localStorage.getItem("bebiteToken")
                    },
                    body: JSON.stringify({ status: newStatus })
                }
            );

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.message || "Không thể cập nhật trạng thái.");
            }

            const order = adminOrders.find(item => String(item.id) === String(orderId));
            if (order) order.status = newStatus;

            if (orderPageMessage) {
                orderPageMessage.textContent =
                    `Đã cập nhật đơn ${order?.order_code || orderId} thành "${newStatus}".`;
            }

            renderAdminOrders();
        } catch (error) {
            console.error("Lỗi lưu trạng thái:", error);
            if (orderPageMessage) {
                orderPageMessage.textContent =
                    error.message || "Lưu trạng thái thất bại.";
            }
            saveButton.disabled = false;
            saveButton.textContent = "Lưu";
        }
    });
}

/* =====================================================
   BÉBITE ADMIN — QUẢN LÝ KHÁCH HÀNG & CÁ NHÂN HÓA
===================================================== */
/* =====================================================
   BÉBITE ADMIN — QUẢN LÝ KHÁCH HÀNG
===================================================== */
let customersData = [];

function ensureCustomersPanel() {
    let panel = document.getElementById("customersPanel");

    if (panel) return;

    const mainContent =
        document.querySelector(".admin-content") ||
        document.querySelector("main") ||
        document.body;

    panel = document.createElement("div");
    panel.id = "customersPanel";
    panel.className = "products-panel";
    panel.hidden = true;

    panel.innerHTML = `
        <style>
            #customersPanel {
                color: #1C60B8;
                font-family: 'Montserrat', sans-serif;
                font-weight: 400;
            }

            #customersPanel * {
                box-sizing: border-box;
            }

            #customersPanel .customer-heading {
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 16px;
                margin-bottom: 24px;
            }

            #customersPanel .customer-heading h2 {
                margin: 0;
                color: #1C60B8;
                font-size: 21px;
                font-weight: 400;
            }

            #customersPanel .customer-heading p {
                margin: 7px 0 0;
                color: #1C60B8;
                font-size: 12px;
                font-weight: 400;
                line-height: 1.7;
            }

            #customersPanel .customer-btn {
                min-height: 36px;
                padding: 0 15px;
                border: 1px solid #DCE7CF;
                border-radius: 6px;
                background: #FFFFF1;
                color: #1C60B8;
                font-family: 'Montserrat', sans-serif;
                font-size: 12px;
                font-weight: 400;
                cursor: pointer;
                transition: background .2s ease;
            }

            #customersPanel .customer-btn:hover {
                background: #CBF55D;
            }

            #customersPanel .customer-stats {
                display: grid;
                grid-template-columns: repeat(2, minmax(0, 1fr));
                gap: 14px;
                margin-bottom: 22px;
            }

            #customersPanel .customer-stat-card {
                padding: 19px 20px;
                border: 1px solid #E1E9D2;
                border-radius: 8px;
                background: #FFFFF1;
            }

            #customersPanel .customer-stat-label {
                display: block;
                color: #1C60B8;
                font-size: 12px;
                font-weight: 400;
            }

            #customersPanel .customer-stat-value {
                margin: 10px 0 0;
                color: #1C60B8;
                font-size: 25px;
                font-weight: 500;
            }

            #customersPanel .customer-search {
                width: 100%;
                max-width: 390px;
                height: 39px;
                margin-bottom: 14px;
                padding: 0 13px;
                border: 1px solid #DCE5D0;
                border-radius: 6px;
                outline: none;
                background: #FFFFFF;
                color: #1C60B8;
                font-family: 'Montserrat', sans-serif;
                font-size: 12px;
                font-weight: 400;
            }

            #customersPanel .customer-search::placeholder {
                color: #1C60B8;
                font-weight: 400;
            }

            #customersPanel .customer-search:focus {
                border-color: #1C60B8;
            }

            #customersPanel #customerPageMessage {
                margin: 0 0 12px;
                color: #1C60B8;
                font-size: 11px;
                font-weight: 400;
            }

            #customersPanel .customer-table-wrap {
                overflow-x: auto;
                border: 1px solid #E1E9D2;
                border-radius: 8px;
                background: #Ffffff;
            }

            #customersPanel .customer-table {
                width: 100%;
                border-collapse: collapse;
                text-align: left;
                font-size: 12px;
            }

            #customersPanel .customer-table thead {
                background: #F7F9E4;
            }

            #customersPanel .customer-table th {
                padding: 14px 15px;
                border-bottom: 1px solid #E1E9D2;
                color: #1C60B8;
                font-size: 11px;
                font-weight: 500;
                white-space: nowrap;
            }

            #customersPanel .customer-table td {
                padding: 14px 15px;
                border-bottom: 1px solid #EDF1E7;
                color: #1C60B8;
                font-size: 12px;
                font-weight: 400;
                line-height: 1.7;
                vertical-align: middle;
            }

            #customersPanel .customer-table tbody tr:last-child td {
                border-bottom: none;
            }

            #customersPanel .customer-table tbody tr:hover {
                background: #F7FEDB;
            }

            /* POPUP HỒ SƠ KHÁCH HÀNG */
            #customerDetailModal {
                display: none;
                position: fixed;
                inset: 0;
                z-index: 9999;
                align-items: center;
                justify-content: center;
                padding: 20px;
                background: rgba(27, 55, 82, .32);
                backdrop-filter: blur(3px);
            }

            #customerDetailModal .customer-modal-box {
                width: 100%;
                max-width: 540px;
                max-height: 85vh;
                overflow-y: auto;
                padding: 26px;
                border: 1px solid #E1E9D2;
                border-radius: 12px;
                background: #FFFFF1;
                box-shadow: 0 12px 36px rgba(36, 70, 110, .12);
                color: #1C60B8;
                font-family: 'Montserrat', sans-serif;
                font-size: 12px;
                font-weight: 400;
            }

            #customerDetailModal .customer-modal-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 12px;
                padding-bottom: 17px;
                margin-bottom: 20px;
                border-bottom: 1px solid #E1E9D2;
            }

            #customerDetailModal .customer-modal-title {
                margin: 0;
                color: #1C60B8;
                font-size: 18px;
                font-weight: 500;
            }

            #customerDetailModal .customer-modal-close {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 32px;
                height: 32px;
                flex-shrink: 0;
                border: 1px solid #E1E9D2;
                border-radius: 50%;
                background: transparent;
                color: #1C60B8;
                font-family: inherit;
                font-size: 20px;
                font-weight: 400;
                cursor: pointer;
            }

            #customerDetailModal .customer-modal-close:hover {
                background: #F7FEDB;
                color: #1C60B8;
            }

            #customerDetailModal #customer-modal-content {
                color: #1C60B8;
                font-size: 12px;
                font-weight: 400;
                line-height: 1.8;
                overflow-wrap: anywhere;
            }

            #customerDetailModal #customer-modal-content strong,
            #customerDetailModal #customer-modal-content b {
                color: #1C60B8;
                font-weight: 500;
            }

            #customerDetailModal #customer-modal-content h1,
            #customerDetailModal #customer-modal-content h2,
            #customerDetailModal #customer-modal-content h3,
            #customerDetailModal #customer-modal-content h4 {
                color: #1C60B8;
                font-weight: 500;
            }

            #customerDetailModal #customer-modal-content p {
                margin: 7px 0;
                color: #1C60B8;
                font-size: 12px;
                font-weight: 400;
                line-height: 1.8;
            }

            #customerDetailModal #customer-modal-content span,
            #customerDetailModal #customer-modal-content label {
                font-weight: 400;
            }

            @media (max-width: 600px) {
                #customersPanel .customer-heading {
                    align-items: flex-start;
                }

                #customersPanel .customer-heading h2 {
                    font-size: 18px;
                }

                #customersPanel .customer-stats {
                    grid-template-columns: 1fr;
                }

                #customerDetailModal .customer-modal-box {
                    padding: 20px;
                }
            }
        </style>

        <div class="customer-heading">
            <div>
                <h2>Danh sách khách hàng</h2>
                <p>Quản lý thông tin mua sắm và hồ sơ bé cá nhân hóa.</p>
            </div>
            <button type="button" id="refreshCustomers" class="customer-btn">
                Làm mới
            </button>
        </div>

        <div class="customer-stats">
            <div class="customer-stat-card">
                <span class="customer-stat-label">Tổng khách hàng</span>
                <h3 id="stat-total-customers" class="customer-stat-value">0</h3>
            </div>

            <div class="customer-stat-card">
                <span class="customer-stat-label">Tổng đơn khách đặt</span>
                <h3 id="stat-total-orders" class="customer-stat-value">0</h3>
            </div>
        </div>

        <input
            id="customer-search-input"
            class="customer-search"
            type="search"
            placeholder="Tìm theo tên hoặc email khách hàng..."
        >

        <p id="customerPageMessage"></p>

        <div class="customer-table-wrap">
            <table class="customer-table">
                <thead>
                    <tr>
                        <th>Mã KH</th>
                        <th>Khách hàng</th>
                        <th>Số đơn</th>
                        <th>Tổng chi tiêu</th>
                        <th>Baby Profile</th>
                        <th style="text-align:right;">Thao tác</th>
                    </tr>
                </thead>
                <tbody id="customer-table-body">
                    <tr>
                        <td colspan="6" style="text-align:center;">
                            Đang tải dữ liệu...
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div id="customerDetailModal">
            <div class="customer-modal-box" role="dialog" aria-modal="true"
                 aria-labelledby="customerModalTitle">
                <div class="customer-modal-header">
                    <h3 id="customerModalTitle" class="customer-modal-title">
                        Hồ sơ khách hàng
                    </h3>
                    <button
                        type="button"
                        class="customer-modal-close"
                        onclick="closeCustomerModal()"
                        aria-label="Đóng hồ sơ"
                    >&times;</button>
                </div>

                <div id="customer-modal-content"></div>
            </div>
        </div>
    `;

    mainContent.appendChild(panel);

    document.getElementById("refreshCustomers")
        ?.addEventListener("click", loadCustomers);

    setupCustomerSearch();
}

async function loadCustomers() {
    ensureCustomersPanel();
    const tbody = document.getElementById("customer-table-body");
    const pageMsg = document.getElementById("customerPageMessage");

    if (tbody) {
        tbody.innerHTML = `<tr><td colspan="6" style="padding:24px; text-align:center; color:#666;">Đang tải khách hàng...</td></tr>`;
    }

    try {
        const token = localStorage.getItem("bebiteToken");
        if (!token) {
            throw new Error("Chưa có phiên đăng nhập Admin.");
        }

        const response = await fetch("/api/admin/customers", {
            headers: { Authorization: "Bearer " + token }
        });

        const data = await response.json();
        if (!response.ok || !data.success) {
            throw new Error(data.message || "Không thể tải danh sách khách hàng.");
        }

        customersData = data.customers || [];
        if (pageMsg) {
            pageMsg.textContent = `Đã tải ${customersData.length} khách hàng.`;
        }

        renderCustomerStats(customersData);
        renderCustomersTable(customersData);
    } catch (error) {
        console.error("Lỗi loadCustomers:", error);
        if (tbody) {
            tbody.innerHTML = `<tr><td colspan="6" style="padding:24px; text-align:center; color:#ef4444;">Lỗi: ${escapeHTML(error.message)}</td></tr>`;
        }
        if (pageMsg) {
            pageMsg.textContent = error.message;
        }
    }
}

function renderCustomerStats(customers) {
    const totalCustomersEl = document.getElementById("stat-total-customers");
    const totalOrdersEl = document.getElementById("stat-total-orders");

    if (totalCustomersEl) totalCustomersEl.textContent = customers.length;
    if (totalOrdersEl) {
        const total = customers.reduce((sum, c) => sum + (Number(c.total_orders) || 0), 0);
        totalOrdersEl.textContent = total;
    }
}

function renderCustomersTable(customers) {
    const tbody = document.getElementById("customer-table-body");
    if (!tbody) return;

    if (customers.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="padding:24px; text-align:center; color:#9ca3af;">Không tìm thấy khách hàng nào.</td></tr>`;
        return;
    }

    tbody.innerHTML = customers.map(c => {
        const totalSpentFormatted = Number(c.total_spent || 0).toLocaleString("vi-VN") + " ₫";
        const hasBaby = Boolean(c.baby_name || c.stage);
        const babyBadge = hasBaby
            ? `<span style="display:inline-block; padding:3px 8px; border-radius:12px; background:#e8f5e9; color:#2e7d32; font-size:12px; font-weight:600;">Đã có Baby Profile</span>`
            : `<span style="display:inline-block; padding:3px 8px; border-radius:12px; background:#f3f4f6; color:#9ca3af; font-size:12px;">Chưa tạo</span>`;

        return `
            <tr style="border-bottom:1px solid #f3f4f6;">
                <td style="padding:12px 16px;"><strong>#KH${c.id}</strong></td>
                <td style="padding:12px 16px;">
                    <div style="font-weight:600; color:#111827;">${escapeHTML(c.name || "Khách hàng")}</div>
                    <small style="color:#6b7280;">${escapeHTML(c.email || "—")}</small>
                </td>
                <td style="padding:12px 16px;"><span style="display:inline-block; padding:2px 8px; border-radius:10px; background:#dbeafe; color:#1e40af; font-weight:600; font-size:12px;">${c.total_orders || 0} đơn</span></td>
                <td style="padding:12px 16px; color:#2a7f62; font-weight:600;">${totalSpentFormatted}</td>
                <td style="padding:12px 16px;">${babyBadge}</td>
                <td style="padding:12px 16px; text-align:right;">
                    <button type="button" class="product-action-btn edit" onclick="openCustomerDetail(${c.id})" style="padding:5px 12px; cursor:pointer;">
                        Xem hồ sơ
                    </button>
                </td>
            </tr>
        `;
    }).join("");
}

function setupCustomerSearch() {
    const searchInput = document.getElementById("customer-search-input");
    if (!searchInput) return;

    searchInput.addEventListener("input", (e) => {
        const keyword = e.target.value.toLowerCase().trim();
        const filtered = customersData.filter(c => {
            const name = (c.name || "").toLowerCase();
            const email = (c.email || "").toLowerCase();
            return name.includes(keyword) || email.includes(keyword);
        });
        renderCustomersTable(filtered);
    });
}

window.openCustomerDetail = function(customerId) {
    const customer = customersData.find(c => c.id === customerId);
    if (!customer) return;

    const modalContainer = document.getElementById("customer-modal-content");
    const modalEl = document.getElementById("customerDetailModal");

    if (modalContainer && modalEl) {
        modalContainer.innerHTML = `
            <div style="line-height:1.6; font-size:14px;">
                <div style="margin-bottom:15px;">
                    <h4 style="margin:0 0 4px 0; font-size:16px; color:#111;">${escapeHTML(customer.name || "Khách hàng")} (#KH${customer.id})</h4>
                    <p style="margin:0; color:#666;">Email: <strong>${escapeHTML(customer.email)}</strong></p>
                    <p style="margin:4px 0 0 0;">Tổng đơn: <strong>${customer.total_orders || 0}</strong> &nbsp;|&nbsp; Chi tiêu: <strong style="color:#2a7f62;">${Number(customer.total_spent || 0).toLocaleString("vi-VN")} ₫</strong></p>
                </div>

                <div style="background:#f0fdf4; border:1px solid #bbf7d0; border-radius:8px; padding:14px; margin-top:12px;">
                    <h5 style="color:#166534; margin:0 0 10px 0; font-size:15px; display:flex; align-items:center; gap:6px;">
                        🍼 Hồ sơ cá nhân hóa (Baby Profile)
                    </h5>
                    <p style="margin:4px 0;">Tên bé: <strong>${escapeHTML(customer.baby_name || "Chưa tạo")}</strong></p>
                    <p style="margin:4px 0;">Giai đoạn ăn dặm: <strong>${escapeHTML(customer.stage || "Chưa chọn")}</strong></p>
                    <p style="margin:4px 0;">Sản phẩm quan tâm: <strong>${escapeHTML(customer.interest || "Chưa chọn")}</strong></p>
                    <p style="margin:4px 0; color:#b91c1c;">Cảnh báo dị ứng: <strong>${escapeHTML(customer.allergy || "Không có")}</strong></p>
                </div>
            </div>
        `;
        modalEl.style.display = "flex";
    } else {
        alert(
            `Khách hàng: ${customer.name || ""}\nEmail: ${customer.email}\n` +
            `Số đơn: ${customer.total_orders || 0} - Chi tiêu: ${Number(customer.total_spent || 0).toLocaleString("vi-VN")} ₫\n` +
            `Bé: ${customer.baby_name || "Chưa có"} | Giai đoạn: ${customer.stage || "Chưa có"} | Dị ứng: ${customer.allergy || "Không"}`
        );
    }
};

window.closeCustomerModal = function() {
    const modalEl = document.getElementById("customerDetailModal");
    if (modalEl) modalEl.style.display = "none";
};
/* =====================================================
   ĐIỀU HƯỚNG SIDEBAR
   SẢN PHẨM / ĐƠN HÀNG / KHÁCH HÀNG
===================================================== */

function switchAdminTab(activeTab) {
    const pageTitle = document.querySelector(".topbar h1");

    const productsPanel = document.getElementById("productsPanel");
    const ordersPanel = document.getElementById("ordersPanel");
    const customersPanel = document.getElementById("customersPanel");

    // Ẩn toàn bộ panel trước khi mở panel được chọn.
    if (productsPanel) productsPanel.hidden = true;
    if (ordersPanel) ordersPanel.hidden = true;
    if (customersPanel) customersPanel.hidden = true;

    // Xóa trạng thái active của tất cả nút sidebar.
    document.querySelectorAll(".sidebar .nav-item").forEach(button => {
        button.classList.remove("active");
    });

    // Hiển thị đúng panel tương ứng.
    if (activeTab === "products") {
        if (productsPanel) productsPanel.hidden = false;
        if (pageTitle) pageTitle.textContent = "Sản phẩm";

        const productsButton = document.getElementById("productsNavBtn");
        if (productsButton) productsButton.classList.add("active");

        loadProducts();

    } else if (activeTab === "orders") {
        if (ordersPanel) ordersPanel.hidden = false;
        if (pageTitle) pageTitle.textContent = "Đơn hàng";

        const ordersButton = document.getElementById("ordersNavBtn");
        if (ordersButton) ordersButton.classList.add("active");

        loadAdminOrders();

    } else if (activeTab === "customers") {
        if (customersPanel) customersPanel.hidden = false;
        if (pageTitle) pageTitle.textContent = "Khách hàng";

        const customersButton = document.getElementById("customersNavBtn");
        if (customersButton) customersButton.classList.add("active");

        loadCustomers();
    }
}

/* =====================================================
   KHỞI TẠO ĐIỀU HƯỚNG VÀ SỰ KIỆN
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
    const productsButton = document.getElementById("productsNavBtn");
    const ordersButton = document.getElementById("ordersNavBtn");
    const customersButton = document.getElementById("customersNavBtn");

    // Nút Sản phẩm.
    if (productsButton) {
        productsButton.addEventListener("click", () => {
            switchAdminTab("products");
        });
    }

    // Nút Đơn hàng.
    if (ordersButton) {
        ordersButton.addEventListener("click", () => {
            switchAdminTab("orders");
        });
    }

    // Nút Khách hàng.
    if (customersButton) {
        customersButton.addEventListener("click", () => {
            switchAdminTab("customers");
        });
    }

    // Làm mới danh sách khách hàng.
    const refreshCustomersButton =
        document.getElementById("refreshCustomers");

    if (refreshCustomersButton) {
        refreshCustomersButton.addEventListener("click", () => {
            loadCustomers();
        });
    }

    // Tìm kiếm khách hàng theo tên hoặc email.
    const customerSearchInput =
        document.getElementById("customer-search-input");

    if (customerSearchInput) {
        customerSearchInput.addEventListener("input", event => {
            const keyword = event.target.value
                .trim()
                .toLocaleLowerCase("vi");

            const filteredCustomers = customersData.filter(customer => {
                const name = String(customer.name || "")
                    .toLocaleLowerCase("vi");

                const email = String(customer.email || "")
                    .toLocaleLowerCase("vi");

                return name.includes(keyword) ||
                    email.includes(keyword);
            });

            renderCustomersTable(filteredCustomers);
        });
    }

    // Đóng modal khi bấm ra ngoài vùng nội dung.
    const customerModal =
        document.getElementById("customerDetailModal");

    if (customerModal) {
        customerModal.addEventListener("click", event => {
            if (event.target === customerModal) {
                closeCustomerModal();
            }
        });
    }
});