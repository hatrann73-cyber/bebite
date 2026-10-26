document.addEventListener("DOMContentLoaded", function () {

    /*
     * About Us hiện tại chủ yếu là trang giới thiệu.
     * Header và Footer được xử lý bởi components.js.
     */

    const aboutPage = document.querySelector(".about-page");

    if (!aboutPage) {
        return;
    }


    /* ==============================
       SMOOTH IMAGE LOADING
       ============================== */

    const images =
        aboutPage.querySelectorAll("img");

    images.forEach(function (image) {

        image.addEventListener("load", function () {

            image.classList.add("image-loaded");

        });

    });


    /* ==============================
       FALLBACK KHI ẢNH CHƯA CÓ
       ============================== */

    images.forEach(function (image) {

        image.addEventListener("error", function () {

            image.classList.add("image-error");

            console.warn(
                "Không tìm thấy ảnh About Us:",
                image.src
            );

        });

    });

});