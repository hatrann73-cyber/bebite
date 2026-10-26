const db = require("./db");

const sql = `
CREATE TABLE IF NOT EXISTS baby_profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL UNIQUE,
    baby_name VARCHAR(100) NOT NULL,
    birthday DATE NOT NULL,
    gender VARCHAR(20) NOT NULL,
    age VARCHAR(50),
    stage VARCHAR(100),
    interest VARCHAR(100),
    allergy VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
)
`;

db.query(sql, (err) => {
    if (err) {
        console.error("❌ Lỗi tạo bảng:", err.message);
        db.end();
        return;
    }

    console.log("✅ Tạo bảng baby_profiles thành công!");
    db.end();
});