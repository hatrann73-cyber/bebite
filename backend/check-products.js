
const db = require("./db");

const updates = [
    ["BQVVQ50G", "BQVVQ40G"],
    ["BQVKL50G", "BQVKL40G"]
];

let index = 0;

function updateNext() {
    if (index >= updates.length) {
        console.log("Đã xử lý xong!");
        return db.end();
    }

    const [newSku, oldSku] = updates[index++];

    db.query(
        "UPDATE products SET sku = ? WHERE sku = ?",
        [newSku, oldSku],
        (err, result) => {
            if (err) {
                console.error("Lỗi cập nhật:", err.message);
                return db.end();
            }

            if (result.affectedRows === 0) {
                console.log("Không tìm thấy SKU:", oldSku);
            } else {
                console.log(`Đã đổi ${oldSku} → ${newSku}`);
            }

            updateNext();
        }
    );
}

updateNext();
