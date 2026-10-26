const db = require("./db");

const sql = `
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(255) NOT NULL,

    category VARCHAR(100) NOT NULL,

    price DECIMAL(10,2) NOT NULL,

    image VARCHAR(500),

    description TEXT,

    age VARCHAR(100),

    stock INT DEFAULT 0,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
`;

db.query(sql, (err) => {

    if (err) {
        console.error("❌ Lỗi tạo bảng products:", err.message);
        db.end();
        return;
    }

    console.log("✅ Tạo bảng products thành công!");

    db.end();
});