document.addEventListener("DOMContentLoaded", function () {

    const currentUser = JSON.parse(
        localStorage.getItem("bebiteCurrentUser") || "null"
    );

    if (currentUser) {

        const shouldLogout = confirm(
            "Bạn đã có tài khoản đang đăng nhập.\n\n" +
            "Bạn có muốn đăng xuất trước khi đăng ký tài khoản mới không?"
        );

        if (shouldLogout) {

            localStorage.removeItem("bebiteCurrentUser");

            window.location.href = "register.html";

        } else {

            window.location.href = "baby-profile.html";

        }

        return;
    }

});
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registerForm");

    const nameInput = document.getElementById("registerName");
    const emailInput = document.getElementById("registerEmail");
    const passwordInput = document.getElementById("registerPassword");
    const confirmPasswordInput = document.getElementById("registerConfirmPassword");

    const message = document.getElementById("registerMessage");

    if (!form) return;

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        message.textContent = "";
        message.classList.remove("show");

        const name = nameInput.value.trim();
        const email = emailInput.value.trim().toLowerCase();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        // Kiểm tra dữ liệu
        if (!name || !email || !password || !confirmPassword) {
            message.textContent = "Vui lòng nhập đầy đủ thông tin.";
            message.classList.add("show");
            return;
        }

        if (password.length < 6) {
            message.textContent = "Mật khẩu phải có ít nhất 6 ký tự.";
            message.classList.add("show");
            return;
        }

        if (password !== confirmPassword) {
            message.textContent = "Mật khẩu xác nhận không khớp.";
            message.classList.add("show");
            return;
        }

        try {
            const response = await fetch(
                "http://localhost:3000/api/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        password: password
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                message.textContent = data.message || "Đăng ký thất bại.";
                message.classList.add("show");
                return;
            }

            alert("Đăng ký tài khoản thành công!");

            // Chuyển sang trang đăng nhập
            window.location.href = "login.html";

        } catch (error) {
            console.error("Lỗi đăng ký:", error);

            message.textContent =
                "Không thể kết nối đến máy chủ. Vui lòng thử lại.";

            message.classList.add("show");
        }
    });
});
// HIỆN / ẨN MẬT KHẨU
document.addEventListener("click", function (e) {
    const button = e.target.closest(".show-password");
    if (!button) return;

    const targetId = button.dataset.target;
    const passwordInput = document.getElementById(targetId);

    if (!passwordInput) return;

    const isHidden = passwordInput.type === "password";

    passwordInput.type = isHidden ? "text" : "password";
    button.textContent = isHidden ? "Ẩn" : "Hiện";
});