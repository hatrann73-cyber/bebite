const db = require("./db");

async function run() {
    try {
        // 1. Lấy một tài khoản Bébite có sẵn
   const [users] = await db.promise().query(`
    SELECT id, name, email
    FROM users
    WHERE id = 5
    LIMIT 1
`);

        if (users.length === 0) {
            console.log("❌ Chưa có tài khoản nào trong bảng users.");
            db.end();
            return;
        }

        const user = users[0];

        console.log(`👤 Tạo đơn mẫu cho account: ${user.name} (${user.email})`);

        // 2. Lấy sản phẩm có sẵn
        const [products] = await db.promise().query(`
            SELECT id, name, price
            FROM products
            ORDER BY id ASC
            LIMIT 5
        `);

        if (products.length < 3) {
            console.log("❌ Cần ít nhất 3 sản phẩm trong bảng products.");
            db.end();
            return;
        }

        const product1 = products[0];
        const product2 = products[1];
        const product3 = products[2];

        // 3. Các đơn mẫu
        const orders = [
            {
                order_code: "BB1025",
                order_channel: "website",
                external_order_id: null,
                status: "Đã giao",
                product: product1,
                quantity: 1
            },
            {
                order_code: "SP9832",
                order_channel: "shopee",
                external_order_id: "SP9832",
                status: "Đang giao",
                product: product2,
                quantity: 2
            },
            {
                order_code: "TT7219",
                order_channel: "tiktok_shop",
                external_order_id: "TT7219",
                status: "Đang xử lý",
                product: product3,
                quantity: 1
            }
        ];

        for (const order of orders) {
            // Kiểm tra đơn đã tồn tại chưa
            const [existing] = await db.promise().query(
                `
                SELECT id
                FROM orders
                WHERE order_code = ?
                `,
                [order.order_code]
            );

            if (existing.length > 0) {
                console.log(`⚠️ ${order.order_code} đã tồn tại → bỏ qua`);
                continue;
            }

            const total = Number(order.product.price) * order.quantity;

            // 4. Tạo order
            const [orderResult] = await db.promise().query(
                `
                INSERT INTO orders (
                    user_id,
                    order_code,
                    order_channel,
                    external_order_id,
                    total_amount,
                    status
                )
                VALUES (?, ?, ?, ?, ?, ?)
                `,
                [
                    user.id,
                    order.order_code,
                    order.order_channel,
                    order.external_order_id,
                    total,
                    order.status
                ]
            );

            const orderId = orderResult.insertId;

            // 5. Tạo order item
            await db.promise().query(
                `
                INSERT INTO order_items (
                    order_id,
                    product_id,
                    product_name,
                    quantity,
                    unit_price,
                    subtotal
                )
                VALUES (?, ?, ?, ?, ?, ?)
                `,
                [
                    orderId,
                    order.product.id,
                    order.product.name,
                    order.quantity,
                    order.product.price,
                    total
                ]
            );

            console.log(
                `✅ ${order.order_code} | ${order.order_channel} | ${total.toLocaleString("vi-VN")}đ`
            );
        }

        console.log("");
        console.log("🎉 Đã tạo xong dữ liệu đơn hàng đa kênh mẫu!");
        console.log(`👤 Các đơn đều thuộc account: ${user.email}`);

        db.end();

    } catch (error) {
        console.error("❌ Lỗi:", error);
        db.end();
    }
}

run();