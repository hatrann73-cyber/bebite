const mysql = require("mysql2");
const fs = require("fs");
const path = require("path");

const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "bebite@2026", 
    database: "bebite_db"
});
db.query(
    "SELECT @@hostname AS hostname, @@port AS port, DATABASE() AS db_name",
    (err, results) => {
        if (err) {
            console.error("Lỗi kiểm tra DB:", err);
        } else {
            console.log("Backend đang kết nối tới:", results);
        }
    }
);
const filePath = path.join(__dirname, "product.json");

if (!fs.existsSync(filePath)) {
    console.error("Chưa có backend/products.json.");
    console.log("Cần xuất mảng PRODUCTS từ products.js sang JSON trước.");
    process.exit(1);
}

const products = JSON.parse(fs.readFileSync(filePath, "utf8"));

db.connect(err => {
    if (err) {
        console.error("Không kết nối được MySQL:", err.message);
        process.exit(1);
    }

    let imported = 0;
    let skipped = 0;
    let index = 0;

    function next() {
        if (index >= products.length) {
            console.log(`Hoàn tất: thêm ${imported}, bỏ qua ${skipped} sản phẩm.`);
            db.end();
            return;
        }

        const p = products[index++];

        if (!p.name || !p.category || p.price == null) {
            skipped++;
            return next();
        }

const imageName = p.image || null;

        db.query(
            "SELECT id FROM products WHERE name = ? LIMIT 1",
            [p.name],
            (err, rows) => {
                if (err) {
                    console.error("Lỗi kiểm tra:", err.message);
                    db.end();
                    return;
                }

                if (rows.length) {
                    skipped++;
                    return next();
                }

                db.query(
                    `INSERT INTO products
                    (name, category, price, image, description, age, stock)
                    VALUES (?, ?, ?, ?, ?, ?, ?)`,
                  [
    p.name,
    p.category,
    Number(p.price),
    imageName,
    p.description || null,
    p.age || null,
    Number(p.stock ?? 0)
],
                    err => {
                        if (err) {
                            console.error(`Lỗi nhập "${p.name}":`, err.message);
                            db.end();
                            return;
                        }

                        imported++;
                        next();
                    }
                );
            }
        );
    }

    next();
});