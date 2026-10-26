const db = require("./db");

async function fixOrders() {
    try {
        // Tìm user đang dùng tài khoản hatranh73@gmail.com
        const [users] = await db.promise().query(`
            SELECT id, name, email
            FROM users
            WHERE email = 'hatrann73@gmail.com'
            LIMIT 1
        `);

        if (users.length === 0) {
            console.log("❌ Không tìm thấy tài khoản hatranh73@gmail.com");
            db.end();
            return;
        }

        const user = users[0];

        console.log(
            `👤 Tài khoản đích: ${user.name} | ${user.email} | userId = ${user.id}`
        );

        // Chuyển 3 đơn mẫu sang tài khoản này
        const [result] = await db.promise().query(`
            UPDATE orders
            SET user_id = ?
            WHERE order_code IN ('BB1025', 'SP9832', 'TT7219')
        `, [user.id]);

        console.log(`✅ Đã chuyển ${result.affectedRows} đơn hàng sang userId = ${user.id}`);

        // Kiểm tra lại
        const [orders] = await db.promise().query(`
            SELECT
                id,
                user_id,
                order_code,
                order_channel,
                total_amount,
                status
            FROM orders
            WHERE user_id = ?
            ORDER BY id DESC
        `, [user.id]);

        console.log("📦 Đơn hàng của tài khoản:");
        console.table(orders);

        db.end();

    } catch (error) {
        console.error("❌ Lỗi:", error);
        db.end();
    }
}

fixOrders();