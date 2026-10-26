const db = require("./db");

const createOrdersTable = `
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,

    order_code VARCHAR(50) NOT NULL UNIQUE,

    order_channel ENUM(
        'website',
        'shopee',
        'tiktok_shop'
    ) NOT NULL,

    external_order_id VARCHAR(100) NULL,

    order_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    total_amount DECIMAL(10,2) NOT NULL DEFAULT 0,

    status VARCHAR(50) NOT NULL DEFAULT 'Đang xử lý',

    external_url VARCHAR(500) NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);
`;

const createOrderItemsTable = `
CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,

    order_id INT NOT NULL,

    product_id INT NULL,

    product_name VARCHAR(255) NOT NULL,

    quantity INT NOT NULL DEFAULT 1,

    unit_price DECIMAL(10,2) NOT NULL,

    subtotal DECIMAL(10,2) NOT NULL,

    FOREIGN KEY (order_id)
        REFERENCES orders(id)
        ON DELETE CASCADE,

    FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE SET NULL
);
`;

db.query(createOrdersTable, (err) => {
    if (err) {
        console.error("❌ Lỗi tạo bảng orders:", err);
        db.end();
        return;
    }

    console.log("✅ Đã tạo bảng orders");

    db.query(createOrderItemsTable, (err) => {
        if (err) {
            console.error("❌ Lỗi tạo bảng order_items:", err);
            db.end();
            return;
        }

        console.log("✅ Đã tạo bảng order_items");
        console.log("🎉 Database đơn hàng đa kênh đã sẵn sàng!");

        db.end();
    });
});