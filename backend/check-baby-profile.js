const db = require("./db");

const sql = `
    SELECT *
    FROM baby_profiles
`;

db.query(sql, (err, results) => {
    if (err) {
        console.error("❌ Lỗi:", err.message);
        db.end();
        return;
    }

    console.table(results);

    db.end();
});