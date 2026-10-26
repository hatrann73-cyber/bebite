document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");

    const emailInput = document.getElementById("loginEmail");
    const passwordInput = document.getElementById("loginPassword");
    const error = document.getElementById("loginError");

    if (!form) return;

    function showError(message) {
        error.textContent = message;
        error.classList.add("show");
    }

    function clearError() {
        error.textContent = "";
        error.classList.remove("show");
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        clearError();

        const email = emailInput.value.trim().toLowerCase();
        const password = passwordInput.value;

        if (!email || !password) {
            showError("Vui lòng nhập email và mật khẩu.");
            return;
        }

        try {
            const response = await fetch(
                "http://localhost:3000/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                showError(
                    data.message || "Email hoặc mật khẩu không chính xác."
                );
                return;
            }

            // Lưu token đăng nhập
            localStorage.setItem(
                "bebiteToken",
                data.token
            );

            // Lưu thông tin người dùng hiện tại
            localStorage.setItem(
                "bebiteCurrentUser",
                JSON.stringify(data.user)
            );


            // Kiểm tra quyền tài khoản trước khi chuyển trang
            if (data.user.role === "admin") {
                window.location.href = "admin.html";
                return;
            }

            // Tài khoản khách hàng: giữ nguyên luồng cũ
            if (localStorage.getItem("bebiteSurvey")) {
                window.location.href = "baby-profile.html";
                return;
            }

            window.location.href = "../index.html";


        } catch (error) {
            console.error("Lỗi đăng nhập:", error);

            showError(
                "Không thể kết nối đến máy chủ. Vui lòng thử lại."
            );
        }
    });
});