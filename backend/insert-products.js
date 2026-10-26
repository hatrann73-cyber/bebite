const db = require("./db");

const sql = `
INSERT INTO products
(name, category, price, image, description, age, stock)
VALUES ?
`;

const products = [

    [
        "Dầu olive ăn dặm",
        "Dầu ăn dặm",
        89000,
        "images/products/olive-oil.png",
        "Dầu olive dành cho bé trong giai đoạn ăn dặm.",
        "6 tháng+",
        50
    ],

    [
        "Dầu cá hồi ăn dặm",
        "Dầu ăn dặm",
        99000,
        "images/products/salmon-oil.png",
        "Dầu cá hồi bổ sung vào bữa ăn dặm của bé.",
        "6 tháng+",
        50
    ],

    [
        "Dầu gấc ăn dặm",
        "Dầu ăn dặm",
        89000,
        "images/products/gac-oil.png",
        "Dầu gấc dành cho bé trong giai đoạn ăn dặm.",
        "6 tháng+",
        50
    ],

    [
        "Dầu hạt lanh ăn dặm",
        "Dầu ăn dặm",
        89000,
        "images/products/flaxseed-oil.png",
        "Dầu hạt lanh dành cho bé trong giai đoạn ăn dặm.",
        "6 tháng+",
        50
    ],

    [
        "Bánh ăn dặm vị táo",
        "Bánh ăn dặm",
        59000,
        "images/products/apple-snack.png",
        "Bánh ăn dặm vị táo dành cho bé.",
        "6 tháng+",
        40
    ],

    [
        "Bánh ăn dặm vị chuối",
        "Bánh ăn dặm",
        59000,
        "images/products/banana-snack.png",
        "Bánh ăn dặm vị chuối dành cho bé.",
        "6 tháng+",
        40
    ],

    [
        "Hạt yến mạch",
        "Ngũ cốc",
        79000,
        "images/products/oat.png",
        "Hạt yến mạch dành cho bé trong giai đoạn ăn dặm.",
        "6 tháng+",
        30
    ]

];

db.query(sql, [products], (err, result) => {

    if (err) {
        console.error("❌ Lỗi thêm sản phẩm:", err.message);
        db.end();
        return;
    }

    console.log(
        `✅ Đã thêm ${result.affectedRows} sản phẩm vào database!`
    );

    db.end();
});