const fs = require("fs");
const multer = require("multer");
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");

require("dotenv").config();
const nodemailer = require("nodemailer");

const db = require("./db");

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || "bebite_secret_2026";

// =====================================================
// CẤU HÌNH GỬI EMAIL XÁC NHẬN ĐƠN HÀNG
// =====================================================
const mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_APP_PASSWORD
    }
});

// =========================
// XÁC THỰC JWT
// =========================
function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: "Chưa đăng nhập."
        });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Token không hợp lệ."
        });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({
                success: false,
                message: "Phiên đăng nhập đã hết hạn."
            });
        }

        req.user = decoded;
        next();
    });
}

// =========================
// KIỂM TRA QUYỀN ADMIN
// =========================
function requireAdmin(req, res, next) {
    const userId = req.user && req.user.userId;

    if (!userId) {
        return res.status(401).json({
            success: false,
            message: "Vui lòng đăng nhập."
        });
    }

    db.query(
        "SELECT role FROM users WHERE id = ?",
        [userId],
        (err, results) => {
            if (err) {
                console.error("Lỗi kiểm tra quyền Admin:", err);
                return res.status(500).json({
                    success: false,
                    message: "Không thể kiểm tra quyền truy cập."
                });
            }

            if (results.length === 0 || results[0].role !== "admin") {
                return res.status(403).json({
                    success: false,
                    message: "Bạn không có quyền truy cập chức năng này."
                });
            }

            next();
        }
    );
}

app.use(cors());
app.use(express.json());

// =========================
// SERVE FRONTEND
// =========================
const FRONTEND_PATH = path.join(__dirname, "..");

app.use("/assets", express.static(path.join(FRONTEND_PATH, "assets")));
app.use("/components", express.static(path.join(FRONTEND_PATH, "components")));
app.use("/pages", express.static(path.join(FRONTEND_PATH, "pages")));
app.use(express.static(FRONTEND_PATH));

/* =====================================================
   ADMIN - TẢI ẢNH SẢN PHẨM
===================================================== */
const PRODUCT_IMAGE_DIR = path.join(
    FRONTEND_PATH,
    "assets",
    "images",
    "products"
);

fs.mkdirSync(PRODUCT_IMAGE_DIR, { recursive: true });

const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, PRODUCT_IMAGE_DIR);
    },
    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname).toLowerCase();
        const filename =
            "bebite-" + Date.now() + "-" +
            Math.round(Math.random() * 1e9) + extension;
        cb(null, filename);
    }
});

const imageUpload = multer({
    storage: imageStorage,
    limits: {
        fileSize: 5 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp"
        ];

        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new Error("Chỉ chấp nhận ảnh JPG, PNG hoặc WEBP."));
        }
        cb(null, true);
    }
});

app.post(
    "/api/admin/products/upload-image",
    (req, res, next) => {
        imageUpload.single("image")(req, res, err => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: err.message || "Không thể tải ảnh lên máy chủ."
                });
            }
            next();
        });
    },
    (req, res) => {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Bạn chưa chọn ảnh sản phẩm."
            });
        }

        const imagePath = "/assets/images/products/" + req.file.filename;

        return res.status(201).json({
            success: true,
            message: "Tải ảnh sản phẩm thành công.",
            image: imagePath
        });
    }
);

// =========================
// TEST BACKEND
// =========================
app.get("/", (req, res) => {
    res.sendFile(path.join(FRONTEND_PATH, "index.html"));
});

// =========================
// ĐĂNG KÝ
// =========================
app.post("/api/auth/register", async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "Vui lòng nhập đầy đủ thông tin."
        });
    }

    if (password.length < 6) {
        return res.status(400).json({
            success: false,
            message: "Mật khẩu phải có ít nhất 6 ký tự."
        });
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    try {
        const checkSql = `SELECT id FROM users WHERE email = ?`;

        db.query(checkSql, [cleanEmail], async (err, results) => {
            if (err) {
                console.error("Lỗi kiểm tra email:", err);
                return res.status(500).json({
                    success: false,
                    message: "Lỗi máy chủ."
                });
            }

            if (results.length > 0) {
                return res.status(409).json({
                    success: false,
                    message: "Email này đã được đăng ký."
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const insertSql = `
                INSERT INTO users (name, email, password)
                VALUES (?, ?, ?)
            `;

            db.query(
                insertSql,
                [cleanName, cleanEmail, hashedPassword],
                (err, result) => {
                    if (err) {
                        console.error("Lỗi tạo tài khoản:", err);
                        return res.status(500).json({
                            success: false,
                            message: "Không thể tạo tài khoản."
                        });
                    }

                    return res.status(201).json({
                        success: true,
                        message: "Đăng ký tài khoản thành công!",
                        userId: result.insertId
                    });
                }
            );
        });
    } catch (err) {
        console.error("Lỗi đăng ký:", err);
        return res.status(500).json({
            success: false,
            message: "Lỗi máy chủ."
        });
    }
});

// =========================
// ĐĂNG NHẬP
// =========================
app.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Vui lòng nhập email và mật khẩu."
        });
    }

    const cleanEmail = email.trim().toLowerCase();
    const sql = `
        SELECT id, name, email, password, role
        FROM users
        WHERE email = ?
    `;

    db.query(sql, [cleanEmail], async (err, results) => {
        if (err) {
            console.error("Lỗi đăng nhập:", err);
            return res.status(500).json({
                success: false,
                message: "Lỗi máy chủ."
            });
        }

        if (results.length === 0) {
            return res.status(401).json({
                success: false,
                message: "Email hoặc mật khẩu không chính xác."
            });
        }

        const user = results[0];
        const passwordCorrect = await bcrypt.compare(password, user.password);

        if (!passwordCorrect) {
            return res.status(401).json({
                success: false,
                message: "Email hoặc mật khẩu không chính xác."
            });
        }

        const token = jwt.sign(
            {
                userId: user.id,
                email: user.email,
                role: user.role
            },
            JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({
            success: true,
            message: "Đăng nhập thành công!",
            token: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    });
});

// =====================================================
// API LƯU / CẬP NHẬT HỒ SƠ BÉ
// =====================================================
app.post("/api/baby-profile", (req, res) => {
    const {
        userId,
        babyName,
        birthday,
        gender,
        age,
        stage,
        interest,
        allergy
    } = req.body;

    const cleanBirthday = birthday
    ? String(birthday).split("T")[0]
    : null;

    if (!userId) {
        return res.status(400).json({
            success: false,
            message: "Không xác định được tài khoản."
        });
    }

    const checkSql = `SELECT id FROM baby_profiles WHERE user_id = ?`;

    db.query(checkSql, [userId], (err, results) => {
        if (err) {
            console.error("❌ Lỗi kiểm tra hồ sơ:", err);
            return res.status(500).json({
                success: false,
                message: "Không thể kiểm tra hồ sơ bé."
            });
        }

        if (results.length > 0) {
            const profileId = results[0].id;
            const updateSql = `
                UPDATE baby_profiles
                SET
                    baby_name = COALESCE(NULLIF(?, ''), baby_name),
                    birthday = COALESCE(?, birthday),
                    gender = COALESCE(NULLIF(?, ''), gender),
                    age = COALESCE(NULLIF(?, ''), age),
                    stage = COALESCE(NULLIF(?, ''), stage),
                    interest = COALESCE(NULLIF(?, ''), interest),
                    allergy = COALESCE(NULLIF(?, ''), allergy)
                WHERE id = ?
            `;

            const values = [
                babyName || "",
                cleanBirthday,
                gender || "",
                age || "",
                stage || "",
                interest || "",
                allergy || "",
                profileId
            ];

            db.query(updateSql, values, (err) => {
                if (err) {
                    console.error("❌ Lỗi cập nhật hồ sơ:", err);
                    return res.status(500).json({
                        success: false,
                        message: "Không thể cập nhật hồ sơ bé.",
                        error: err.message
                    });
                }

                return res.json({
                    success: true,
                    message: "Cập nhật hồ sơ bé thành công!",
                    profileId: profileId
                });
            });
            return;
        }

        const insertSql = `
            INSERT INTO baby_profiles
            (
                user_id,
                baby_name,
                birthday,
                gender,
                age,
                stage,
                interest,
                allergy
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

const values = [
    userId,
    babyName || "",
    cleanBirthday,
    gender || "",
    age || null,
    stage || null,
    interest || null,
    allergy || null
];

        db.query(insertSql, values, (err, result) => {
            if (err) {
                console.error("❌ Lỗi lưu hồ sơ bé:", err);
                return res.status(500).json({
                    success: false,
                    message: "Không thể lưu hồ sơ bé."
                });
            }

            return res.status(201).json({
                success: true,
                message: "Lưu hồ sơ bé thành công!",
                profileId: result.insertId
            });
        });
    });
});

// =====================================================
// API LẤY HỒ SƠ BÉ
// =====================================================
app.get("/api/baby-profile/:userId", (req, res) => {
    const userId = req.params.userId;
    const sql = `
        SELECT
            id,
            user_id,
            baby_name,
            birthday,
            gender,
            age,
            stage,
            interest,
            allergy,
            created_at,
            updated_at
        FROM baby_profiles
        WHERE user_id = ?
    `;

    db.query(sql, [userId], (err, results) => {
        if (err) {
            console.error("❌ Lỗi lấy hồ sơ bé:", err);
            return res.status(500).json({
                success: false,
                message: "Không thể lấy hồ sơ bé."
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Chưa có hồ sơ bé."
            });
        }

        res.json({
            success: true,
            profile: results[0]
        });
    });
});

// =====================================================
// API KIỂM TRA MÃ GIẢM GIÁ BEBITE5
// =====================================================
app.get("/api/discount/validate", authenticateToken, (req, res) => {
    const userId = req.user.userId;

    const sql = `
        SELECT id
        FROM orders
        WHERE user_id = ?
          AND order_channel = 'website'
        LIMIT 1
    `;

    db.query(sql, [userId], (err, results) => {
        if (err) {
            console.error("Lỗi kiểm tra mã giảm giá:", err);
            return res.status(500).json({
                success: false,
                message: "Không thể kiểm tra mã giảm giá."
            });
        }

        if (results.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Mã BEBITE5 chỉ dành cho đơn hàng website đầu tiên."
            });
        }

        return res.json({
            success: true,
            discountPercent: 5
        });
    });
});

/* =====================================================
   API LẤY LỊCH SỬ ĐƠN HÀNG CỦA TÀI KHOẢN
===================================================== */
app.get("/api/orders", authenticateToken, (req, res) => {
    const userId = req.user.userId;

    const sql = `
        SELECT
            o.id,
            o.order_code,
            o.order_channel,
            o.order_date,
            o.total_amount,
            o.status,
            oi.product_id,
            oi.product_name,
            oi.quantity,
            oi.unit_price,
            oi.subtotal
        FROM orders o
        LEFT JOIN order_items oi ON o.id = oi.order_id
        WHERE o.user_id = ?
        ORDER BY o.order_date DESC, o.id DESC
    `;

    db.query(sql, [userId], (err, rows) => {
        if (err) {
            console.error("Lỗi lấy lịch sử đơn hàng:", err);
            return res.status(500).json({
                success: false,
                message: "Không thể tải lịch sử đơn hàng."
            });
        }

        const ordersMap = new Map();

        for (const row of rows) {
            if (!ordersMap.has(row.id)) {
                ordersMap.set(row.id, {
                    id: row.id,
                    order_code: row.order_code,
                    order_channel: row.order_channel,
                    order_date: row.order_date,
                    total_amount: row.total_amount,
                    status: row.status,
                    items: []
                });
            }

            if (row.product_name !== null) {
                ordersMap.get(row.id).items.push({
                    product_id: row.product_id,
                    name: row.product_name,
                    quantity: row.quantity,
                    price: row.unit_price,
                    subtotal: row.subtotal
                });
            }
        }

        return res.json({
            success: true,
            orders: Array.from(ordersMap.values())
        });
    });
});

/* =====================================================
   ADMIN - LẤY DANH SÁCH KHÁCH HÀNG & BABY PROFILE
===================================================== */
app.get(
    "/api/admin/customers",
    authenticateToken,
    requireAdmin,
    (req, res) => {
        const sql = `
            SELECT
                u.id,
                u.name,
                u.email,
                COUNT(DISTINCT o.id) AS total_orders,
                COALESCE(SUM(o.total_amount), 0) AS total_spent,
                MAX(o.order_date) AS last_order_date,
                bp.baby_name,
                bp.stage,
                bp.interest,
                bp.allergy
            FROM users u
            LEFT JOIN orders o ON o.user_id = u.id
            LEFT JOIN baby_profiles bp ON bp.user_id = u.id
            WHERE u.role IS NULL OR u.role <> 'admin'
            GROUP BY
                u.id,
                u.name,
                u.email,
                bp.baby_name,
                bp.stage,
                bp.interest,
                bp.allergy
            ORDER BY u.id DESC
        `;

        db.query(sql, (err, rows) => {
            if (err) {
                console.error("Lỗi lấy danh sách khách hàng:", err);
                return res.status(500).json({
                    success: false,
                    message: "Không thể tải danh sách khách hàng."
                });
            }

            return res.json({
                success: true,
                customers: rows
            });
        });
    }
);

/* =====================================================
   ADMIN - LẤY DANH SÁCH ĐƠN HÀNG ĐA KÊNH
===================================================== */
app.get(
    "/api/admin/orders",
    authenticateToken,
    requireAdmin,
    (req, res) => {
        const sql = `
            SELECT
                o.id,
                o.user_id,
                u.email,
                o.order_code,
                o.order_channel,
                o.external_order_id,
                o.external_url,
                o.order_date,
                o.total_amount,
                o.status,
                oi.product_id,
                oi.product_name,
                oi.quantity,
                oi.unit_price,
                oi.subtotal
            FROM orders o
            LEFT JOIN users u ON o.user_id = u.id
            LEFT JOIN order_items oi ON o.id = oi.order_id
            ORDER BY o.order_date DESC, o.id DESC
        `;

        db.query(sql, (err, rows) => {
            if (err) {
                console.error("Lỗi lấy đơn hàng Admin:", err);
                return res.status(500).json({
                    success: false,
                    message: "Không thể tải danh sách đơn hàng."
                });
            }

            const ordersMap = new Map();

            for (const row of rows) {
                if (!ordersMap.has(row.id)) {
                    ordersMap.set(row.id, {
                        id: row.id,
                        user_id: row.user_id,
                        email: row.email,
                        order_code: row.order_code,
                        order_channel: row.order_channel,
                        external_order_id: row.external_order_id,
                        external_url: row.external_url,
                        order_date: row.order_date,
                        total_amount: row.total_amount,
                        status: row.status,
                        items: []
                    });
                }

                if (row.product_name !== null) {
                    ordersMap.get(row.id).items.push({
                        product_id: row.product_id,
                        name: row.product_name,
                        quantity: row.quantity,
                        price: row.unit_price,
                        subtotal: row.subtotal
                    });
                }
            }

            return res.json({
                success: true,
                orders: Array.from(ordersMap.values())
            });
        });
    }
);

/* =====================================================
   ADMIN - CẬP NHẬT TRẠNG THÁI ĐƠN HÀNG
===================================================== */
app.patch(
    "/api/admin/orders/:id/status",
    authenticateToken,
    requireAdmin,
    (req, res) => {
        const orderId = Number(req.params.id);
        const { status } = req.body;

        const allowedStatuses = [
            "Đã đặt hàng",
            "Đang xử lý",
            "Đang giao",
            "Đã giao",
            "Đã hủy"
        ];

        if (!Number.isInteger(orderId) || orderId <= 0) {
            return res.status(400).json({
                success: false,
                message: "Mã đơn hàng không hợp lệ."
            });
        }

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Trạng thái đơn hàng không hợp lệ."
            });
        }

        const sql = "UPDATE orders SET status = ? WHERE id = ?";

        db.query(sql, [status, orderId], (err, result) => {
            if (err) {
                console.error("Lỗi cập nhật trạng thái đơn hàng:", err);
                return res.status(500).json({
                    success: false,
                    message: "Không thể cập nhật trạng thái đơn hàng."
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Không tìm thấy đơn hàng."
                });
            }

            return res.json({
                success: true,
                message: "Đã cập nhật trạng thái đơn hàng."
            });
        });
    }
);

/* =====================================================
   API TẠO ĐƠN HÀNG - KIỂM TRA VÀ TRỪ TỒN KHO
===================================================== */
app.post("/api/orders", authenticateToken, (req, res) => {
    const userId = req.user.userId;

    const {
        order_code,
        order_channel,
        items
    } = req.body;

    if (!order_code) {
        return res.status(400).json({
            success: false,
            message: "Thiếu mã đơn hàng."
        });
    }

    if (!Array.isArray(items) || items.length === 0) {
        return res.status(400).json({
            success: false,
            message: "Đơn hàng chưa có sản phẩm."
        });
    }

    const quantities = new Map();

    for (const item of items) {
        const sku = String(item.sku || "").trim();
        const productId = Number(item.product_id || item.productId || item.id) || null;
        const quantity = Number(item.quantity);

        if ((!sku && !productId) || !Number.isSafeInteger(quantity) || quantity <= 0) {
            return res.status(400).json({
                success: false,
                message: "Sản phẩm hoặc số lượng không hợp lệ."
            });
        }

        const key = sku ? `sku:${sku}` : `id:${productId}`;
        const existingItem = quantities.get(key);
        const newQuantity = (existingItem?.quantity || 0) + quantity;

        quantities.set(key, {
            sku,
            productId,
            quantity: newQuantity
        });
    }

    db.getConnection((connectionErr, connection) => {
        if (connectionErr) {
            console.error("Lỗi kết nối DB:", connectionErr);
            return res.status(500).json({
                success: false,
                message: "Không thể xử lý đơn hàng."
            });
        }

        const query = (sql, params = []) =>
            new Promise((resolve, reject) => {
                connection.query(sql, params, (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });

        connection.beginTransaction(async (transactionErr) => {
            if (transactionErr) {
                connection.release();
                return res.status(500).json({
                    success: false,
                    message: "Không thể bắt đầu giao dịch."
                });
            }

            try {
                const orderItems = [];
                let totalAmount = 0;

                for (const entry of quantities.values()) {
                    const sql = entry.sku
                        ? `SELECT id, sku, name, price, stock FROM products WHERE sku = ? FOR UPDATE`
                        : `SELECT id, sku, name, price, stock FROM products WHERE id = ? FOR UPDATE`;

                    const identifier = entry.sku ? entry.sku : entry.productId;
                    const products = await query(sql, [identifier]);

                    if (products.length !== 1) {
                        throw {
                            status: 400,
                            message: `Không tìm thấy sản phẩm hoặc SKU không hợp lệ: ${identifier}`
                        };
                    }

                    const product = products[0];
                    const stock = Number(product.stock);
                    const price = Number(product.price);

                    if (stock < entry.quantity) {
                        throw {
                            status: 409,
                            message: `Sản phẩm "${product.name}" chỉ còn ${stock} sản phẩm.`
                        };
                    }

                    const subtotal = price * entry.quantity;
                    totalAmount += subtotal;

                    orderItems.push({
                        productId: product.id,
                        name: product.name,
                        price,
                        quantity: entry.quantity,
                        subtotal
                    });
                }

                const orderResult = await query(
                    `INSERT INTO orders
                     (user_id, order_code, order_channel, order_date, total_amount, status)
                     VALUES (?, ?, ?, NOW(), ?, ?)`,
                    [
                        userId,
                        order_code,
                        order_channel || "website",
                        totalAmount,
                        "Đang xử lý"
                    ]
                );

                const orderId = orderResult.insertId;

                const itemValues = orderItems.map(item => [
                    orderId,
                    item.productId,
                    item.name,
                    item.quantity,
                    item.price,
                    item.subtotal
                ]);

                await query(
                    `INSERT INTO order_items
                     (order_id, product_id, product_name, quantity, unit_price, subtotal)
                     VALUES ?`,
                    [itemValues]
                );

                for (const item of orderItems) {
                    const updateResult = await query(
                        `UPDATE products
                         SET stock = stock - ?
                         WHERE id = ? AND stock >= ?`,
                        [item.quantity, item.productId, item.quantity]
                    );

                    if (updateResult.affectedRows !== 1) {
                        throw {
                            status: 409,
                            message: `Tồn kho sản phẩm "${item.name}" vừa thay đổi. Vui lòng thử lại.`
                        };
                    }
                }

                await new Promise((resolve, reject) => {
                    connection.commit(err => {
                        if (err) return reject(err);
                        resolve();
                    });
                });

                connection.release();
                console.log(`✅ Đã tạo đơn ${order_code} cho user ${userId}`);

                return res.status(201).json({
                    success: true,
                    message: "Đặt hàng thành công.",
                    orderId,
                    orderCode: order_code,
                    totalAmount
                });

            } catch (error) {
                connection.rollback(() => {
                    connection.release();
                });

                console.error("Lỗi tạo đơn hàng:", error.message || error);

                if (error.status) {
                    return res.status(error.status).json({
                        success: false,
                        message: error.message
                    });
                }

                return res.status(500).json({
                    success: false,
                    message: "Không thể tạo đơn hàng."
                });
            }
        });
    });
});

// =====================================================
// API LẤY DANH SÁCH SẢN PHẨM
// =====================================================
app.get("/api/products", (req, res) => {
    const sql = `
        SELECT
            id,
            sku,
            name,
            category,
            price,
            image,
            description,
            age,
            stock,
            created_at
        FROM products
        ORDER BY id DESC
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error("❌ Lỗi lấy sản phẩm:", err);
            return res.status(500).json({
                success: false,
                message: "Không thể lấy danh sách sản phẩm."
            });
        }

        res.json({
            success: true,
            products: results
        });
    });
});

/* =====================================================
   ADMIN - THÊM SẢN PHẨM
===================================================== */
app.post("/api/admin/products", authenticateToken, requireAdmin, (req, res) => {
    const {
        name,
        category,
        price,
        image,
        description,
        age,
        stock
    } = req.body;

    if (!name || !category || price == null) {
        return res.status(400).json({
            success: false,
            message: "Vui lòng nhập tên, danh mục và giá sản phẩm."
        });
    }

    const productPrice = Number(price);
    const productStock = Number(stock ?? 0);

    if (
        !Number.isFinite(productPrice) ||
        productPrice < 0 ||
        !Number.isInteger(productStock) ||
        productStock < 0
    ) {
        return res.status(400).json({
            success: false,
            message: "Giá hoặc số lượng tồn kho không hợp lệ."
        });
    }

    const sql = `
        INSERT INTO products
        (name, category, price, image, description, age, stock)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            name.trim(),
            category,
            productPrice,
            image || null,
            description || null,
            age || null,
            productStock
        ],
        (err, result) => {
            if (err) {
                console.error("Lỗi thêm sản phẩm:", err);
                return res.status(500).json({
                    success: false,
                    message: "Không thể thêm sản phẩm."
                });
            }

            res.status(201).json({
                success: true,
                message: "Thêm sản phẩm thành công.",
                productId: result.insertId
            });
        }
    );
});

/* =====================================================
   ADMIN - CẬP NHẬT SẢN PHẨM
===================================================== */
app.put("/api/admin/products/:id", authenticateToken, requireAdmin, (req, res) => {
    const {
        name,
        category,
        price,
        image,
        description,
        age,
        stock
    } = req.body;

    const productId = Number(req.params.id);
    const productPrice = Number(price);
    const productStock = Number(stock);

    if (
        !Number.isInteger(productId) ||
        productId <= 0 ||
        !name?.trim() ||
        !category ||
        price == null ||
        stock == null ||
        !Number.isFinite(productPrice) ||
        productPrice < 0 ||
        !Number.isInteger(productStock) ||
        productStock < 0
    ) {
        return res.status(400).json({
            success: false,
            message: "Thông tin sản phẩm không hợp lệ."
        });
    }

    const sql = `
        UPDATE products
        SET name = ?,
            category = ?,
            price = ?,
            image = ?,
            description = ?,
            age = ?,
            stock = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [
            name.trim(),
            category,
            productPrice,
            image || null,
            description || null,
            age || null,
            productStock,
            productId
        ],
        (err, result) => {
            if (err) {
                console.error("Lỗi cập nhật sản phẩm:", err);
                return res.status(500).json({
                    success: false,
                    message: "Không thể cập nhật sản phẩm."
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Không tìm thấy sản phẩm."
                });
            }

            res.json({
                success: true,
                message: "Cập nhật sản phẩm thành công."
            });
        }
    );
});

/* =====================================================
   ADMIN - XÓA SẢN PHẨM
===================================================== */
app.delete("/api/admin/products/:id", authenticateToken, requireAdmin, (req, res) => {
    const productId = Number(req.params.id);

    if (!Number.isInteger(productId) || productId <= 0) {
        return res.status(400).json({
            success: false,
            message: "ID sản phẩm không hợp lệ."
        });
    }

    const sql = "DELETE FROM products WHERE id = ?";

    db.query(sql, [productId], (err, result) => {
        if (err) {
            console.error("Lỗi xóa sản phẩm:", err);
            return res.status(500).json({
                success: false,
                message: "Không thể xóa sản phẩm. Sản phẩm có thể đang được sử dụng trong đơn hàng."
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy sản phẩm."
            });
        }

        res.json({
            success: true,
            message: "Xóa sản phẩm thành công."
        });
    });
});
app.listen(PORT, () => {
    console.log(`🚀 BéBite Backend đang chạy trên cổng ${PORT}`);
});