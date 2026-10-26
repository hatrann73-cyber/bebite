const db = require("./db");

const sql = "DESCRIBE users";

db.query(sql, (err, results) => {
    if (err) {
        console.error("❌ Lỗi:", err.message);
        return;
    }

    console.table(results);

    db.end();
});