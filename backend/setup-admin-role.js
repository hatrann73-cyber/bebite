
const db = require("./db");

db.query("SHOW COLUMNS FROM users LIKE 'role'", (err, rows) => {
    if (err) {
        console.error("Lỗi kiểm tra database:", err.message);
        db.end();
        return;
    }

    if (rows.length > 0) {
        console.log("Cột role đã tồn tại, không cần thêm.");
        db.end();
        return;
    }

    const sql = `
        ALTER TABLE users
        ADD COLUMN role VARCHAR(20) NOT NULL DEFAULT 'customer'
    `;

    db.query(sql, (error) => {
        if (error) {
            console.error("Không thể thêm cột role:", error.message);
        } else {
            console.log("Đã thêm cột role thành công.");
            console.log("Tài khoản hiện tại mặc định là customer.");
        }

        db.end();
    });
});
