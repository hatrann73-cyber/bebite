
const readline = require("readline");
const bcrypt = require("bcryptjs");
const db = require("./db");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const email = "thuhabrvt11@gmail.com";
const name = "thuha0046";

db.query(
    "SELECT id, role FROM users WHERE email = ?",
    [email],
    (err, rows) => {
        if (err) {
            console.error("Lỗi kiểm tra tài khoản:", err.message);
            db.end();
            rl.close();
            return;
        }

        if (rows.length > 0) {
            console.log("Email này đã tồn tại. Không tự động thay đổi tài khoản.");
            db.end();
            rl.close();
            return;
        }

        rl.question("Nhập mật khẩu mới cho Admin (tối thiểu 12 ký tự): ", async (password) => {
            if (password.length < 12) {
                console.log("Mật khẩu cần có ít nhất 12 ký tự.");
                db.end();
                rl.close();
                return;
            }

            try {
                const hashedPassword = await bcrypt.hash(password, 12);

                db.query(
                    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, 'admin')",
                    [name, email, hashedPassword],
                    (error, result) => {
                        if (error) {
                            console.error("Không thể tạo Admin:", error.message);
                        } else {
                            console.log("Đã tạo tài khoản Admin thành công!");
                            console.log("Email:", email);
                            console.log("ID:", result.insertId);
                        }

                        db.end();
                        rl.close();
                    }
                );
            } catch (error) {
                console.error("Lỗi xử lý mật khẩu:", error.message);
                db.end();
                rl.close();
            }
        });
    }
);
