document.addEventListener("DOMContentLoaded", async function () {

    /* =====================================================
       XÁC ĐỊNH TRANG HIỆN TẠI
    ===================================================== */

    const isPages =
        window.location.pathname.includes("/pages/");

    const ROOT = isPages ? "../" : "./";


    /* =====================================================
       LOAD HEADER
       XÓA LUÔN WRAPPER #bebite-header
       ĐỂ .main-header HOẠT ĐỘNG STICKY ĐÚNG
    ===================================================== */

    const headerContainer =
        document.getElementById("bebite-header");

    if (headerContainer) {

        try {

            const response =
                await fetch(
                    `${ROOT}components/header.html`
                );

            if (!response.ok) {
                throw new Error(
                    "Không thể tải header.html"
                );
            }

            const headerHTML =
                await response.text();

            // QUAN TRỌNG:
            // Thay luôn div #bebite-header
            // thay vì nhét header vào bên trong div đó
            headerContainer.outerHTML =
                headerHTML;

        } catch (error) {

            console.error(
                "Lỗi Header:",
                error
            );

        }

    }


    /* =====================================================
       LOAD FOOTER
    ===================================================== */

    const footerContainer =
        document.getElementById("bebite-footer");

    if (footerContainer) {

        try {

            const response =
                await fetch(
                    `${ROOT}components/footer.html`
                );

            if (!response.ok) {
                throw new Error(
                    "Không thể tải footer.html"
                );
            }

            footerContainer.innerHTML =
                await response.text();

        } catch (error) {

            console.error(
                "Lỗi Footer:",
                error
            );

        }

    }


    /* =====================================================
       TRANG CHỦ
    ===================================================== */

    document
        .querySelectorAll("[data-bebite-home]")
        .forEach(function (link) {

            link.href =
                `${ROOT}index.html`;

        });


    /* =====================================================
       SẢN PHẨM
    ===================================================== */

    document
        .querySelectorAll("[data-bebite-products]")
        .forEach(function (link) {

            link.href =
                `${ROOT}pages/products.html`;

        });


    /* =====================================================
       VỀ BÉBITE
    ===================================================== */

    document
        .querySelectorAll("[data-bebite-about]")
        .forEach(function (link) {

            link.href =
                `${ROOT}pages/aboutus.html`;

        });


    /* =====================================================
       TIN TỨC
    ===================================================== */

    document
        .querySelectorAll("[data-bebite-blog]")
        .forEach(function (link) {

            link.href =
                `${ROOT}pages/blog.html`;

        });


    /* =====================================================
       LIÊN HỆ
    ===================================================== */

    document
        .querySelectorAll("[data-bebite-contact]")
        .forEach(function (link) {

            link.href =
                `${ROOT}pages/contact.html`;

        });


    /* =====================================================
       GIỎ HÀNG
    ===================================================== */

    document
        .querySelectorAll("[data-bebite-cart]")
        .forEach(function (link) {

            link.href =
                `${ROOT}pages/cart.html`;

        });


    /* =====================================================
       CHÍNH SÁCH
    ===================================================== */

    document
        .querySelectorAll("[data-bebite-policy]")
        .forEach(function (link) {

            link.href =
                `${ROOT}pages/policies.html`;

        });


    /* =====================================================
       BẢO MẬT
    ===================================================== */

    document
        .querySelectorAll("[data-bebite-security]")
        .forEach(function (link) {

            link.href =
                `${ROOT}pages/secure.html`;

        });


    /* =====================================================
       FAQ
    ===================================================== */

    document
        .querySelectorAll("[data-bebite-faq]")
        .forEach(function (link) {

            link.href =
                `${ROOT}pages/faqs.html`;

        });

    /* =====================================================
       TRANSPORT
    ===================================================== */

    document
        .querySelectorAll("[data-bebite-transport]")
        .forEach(function (link) {

            link.href =
                `${ROOT}pages/transport.html`;

        });

   /* =====================================================
   HỒ SƠ CỦA BÉ / ĐĂNG NHẬP
===================================================== */

function updateProfileLink() {

    const currentUser =
        localStorage.getItem("bebiteCurrentUser");

    const profileLinks =
        document.querySelectorAll(
            "[data-bebite-profile]"
        );

    profileLinks.forEach(function (link) {

        if (currentUser) {

            link.textContent =
                "HỒ SƠ CỦA BÉ";

            link.href =
                `${ROOT}pages/baby-profile.html`;

        } else {

            link.textContent =
                "ĐĂNG NHẬP";

            link.href =
                `${ROOT}pages/login.html`;

        }

    });
}

updateProfileLink();


    /* =====================================================
       LOGO
    ===================================================== */

    document
        .querySelectorAll("[data-bebite-logo]")
        .forEach(function (img) {

            img.src =
                `${ROOT}assets/images/logo/logomau.png`;

        });


    /* =====================================================
       LOGO FOOTER
    ===================================================== */

    document
        .querySelectorAll("[data-bebite-footer-logo]")
        .forEach(function (img) {

            img.src =
                `${ROOT}assets/images/logo/logomau.png`;

        });


    /* =====================================================
       ẢNH TRANG TRÍ FOOTER
    ===================================================== */

    document
        .querySelectorAll(
            "[data-bebite-footer-decoration]"
        )
        .forEach(function (img) {

            img.src =
                `${ROOT}assets/images/banners/footer-vegetables.png`;

        });

});

/* =====================================================
   MOBILE MENU - HỖ TRỢ HEADER TẢI ĐỘNG
===================================================== */

document.addEventListener("click", function (event) {
    const menuButton = event.target.closest(".mobile-menu-toggle");

    // Nhấn nút menu: mở hoặc đóng
    if (menuButton) {
        const mainNav = document.getElementById("bebite-main-nav");

        if (!mainNav) {
            console.warn("Không tìm thấy #bebite-main-nav");
            return;
        }

        const isOpen = mainNav.classList.toggle("mobile-menu-open");

        menuButton.setAttribute("aria-expanded", String(isOpen));
        menuButton.setAttribute(
            "aria-label",
            isOpen ? "Đóng menu" : "Mở menu"
        );

        const icon = menuButton.querySelector("i");

        if (icon) {
            icon.classList.toggle("fa-bars", !isOpen);
            icon.classList.toggle("fa-xmark", isOpen);
        }

        return;
    }

    // Nhấn vào link trong menu: đóng menu
    const navLink = event.target.closest(
        "#bebite-main-nav a"
    );

    if (navLink) {
        const mainNav = document.getElementById("bebite-main-nav");
        const button = document.querySelector(".mobile-menu-toggle");

        if (mainNav) {
            mainNav.classList.remove("mobile-menu-open");
        }

        if (button) {
            button.setAttribute("aria-expanded", "false");
            button.setAttribute("aria-label", "Mở menu");

            const icon = button.querySelector("i");

            if (icon) {
                icon.classList.add("fa-bars");
                icon.classList.remove("fa-xmark");
            }
        }
    }
});
