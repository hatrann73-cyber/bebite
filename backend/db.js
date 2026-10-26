
require("dotenv").config();

const fs = require("fs");
const mysql = require("mysql2");

// Cấu hình SSL khi kết nối database online trên Aiven
const sslConfig = process.env.DB_SSL_CA_PATH
    ? {
        ca: fs.readFileSync(process.env.DB_SSL_CA_PATH, "utf8"),
        rejectUnauthorized: true
    }
    : undefined;

const db = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "bebite_db",
    port: Number(process.env.DB_PORT) || 3306,

    // Chỉ bật SSL khi đã cấu hình đường dẫn chứng chỉ CA
    ...(sslConfig ? { ssl: sslConfig } : {}),

    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0,
    connectTimeout: 20000
});

db.getConnection((err, connection) => {
    if (err) {
        console.error("❌ Kết nối MySQL thất bại:", err.message);
        return;
    }

    console.log("✅ Kết nối MySQL thành công!");
    connection.release();
});

module.exports = db;
