document.addEventListener("DOMContentLoaded", function () {
    const articles = {
        "banh-pancake": {
            category: "Công Thức Riêng Cho Mẹ",
            section: "Công thức riêng cho mẹ",
            title: "CÔNG THỨC PANCAKE YẾN MẠCH CHUỐI XỐP MỀM CHO BÉ TẬP NHAI (7M+)",
            short: "Pancake yến mạch chuối mềm xốp, thơm ngọt tự nhiên, phù hợp cho bé tập nhai từ 7 tháng.",
            image: "../assets/images/blog/pancake.png",
            date: "30/10/2025"
        },
        "mon-an-dam": {
            category: "Công Thức Riêng Cho Mẹ",
            section: "Công thức riêng cho mẹ",
            title: "GỢI Ý KHAY ĂN DẶM CẦM TAY 7M+: CƠM VIÊN CÁ HỒI RONG BIỂN & CÁ HỒI SỐT CAM NGỌT LÀNH",
            short: "Một khay ăn dặm nhiều màu sắc với cá hồi, cơm viên rong biển, rau củ và trái cây.",
            image: "../assets/images/blog/blog congthuc.jpg",
            date: "30/10/2025"
        },
        "chao-rau-cu": {
            category: "Công Thức Riêng Cho Mẹ",
            section: "Công thức riêng cho mẹ",
            title: "BỮA ĂN XANH NGỌT LÀNH: CHÁO YẾN MẠCH BÓ XÔI KHOAI LANG ÊM BỤNG CHO BÉ TỪ 7 THÁNG",
            short: "Cháo yến mạch, bó xôi và khoai lang mềm mịn, dễ ăn cho bé.",
            image: "../assets/images/blog/cháoym-bx-kl.jpg",
            date: "30/10/2025"
        },
        "dinh-duong-cho-be": {
            category: "Góc Chuyên Gia",
            section: "Góc chuyên gia",
            title: "KHI NÀO BÉ SẴN SÀNG TĂNG ĐỘ THÔ? LỘ TRÌNH CHUẨN TỪ CHÁO RÂY SANG BÁNH TẬP NHAI",
            short: "Nhận biết tín hiệu sẵn sàng và từng bước tăng độ thô trong hành trình ăn dặm.",
            image: "../assets/images/blog/6month.png",
            date: "30/10/2025"
        },
        "phat-trien-cua-be": {
            category: "Góc Chuyên Gia",
            section: "Góc chuyên gia",
            title: "DẦU ĂN DẶM: VÌ SAO KHÔNG THỂ THIẾU TRONG BÁT CHÁO CỦA CON?",
            short: "Vai trò của chất béo trong khẩu phần ăn dặm và cách sử dụng dầu ăn dặm.",
            image: "../assets/images/blog/blogolive.jpg",
            date: "30/10/2025"
        },
        "hanh-trinh-an-dam": {
            category: "Góc Chuyên Gia",
            section: "Góc chuyên gia",
            title: "DỊ ỨNG ĐẠM SỮA BÒ (CMPA) Ở TRẺ: DẤU HIỆU NHẬN BIẾT & NGUYÊN TẮC LÊN THỰC ĐƠN ĂN DẶM AN TOÀN",
            short: "Những dấu hiệu cần lưu ý và nguyên tắc xây dựng thực đơn khi bé dị ứng đạm sữa bò.",
            image: "../assets/images/blog/DIUNGDAMBO.png",
            date: "30/10/2025"
        },
        "nhom-chat": {
            category: "Thông Tin Dinh Dưỡng",
            section: "Thông tin dinh dưỡng",
            title: "BỘ TỨ “HẠT VÀNG” YẾN MẠCH, KÊ NẾP, QUINOA & ĐẬU HÀ LAN: DINH DƯỠNG VƯỢT TRỘI CHO CHIẾC BỤNG NHỎ",
            short: "Khám phá bốn nhóm hạt và đậu đa dạng để làm phong phú thực đơn ăn dặm.",
            image: "../assets/images/blog/BLOG4LOAIHAT.png",
            date: "30/10/2025"
        },
        "thuc-pham-cho-be": {
            category: "Thông Tin Dinh Dưỡng",
            section: "Thông tin dinh dưỡng",
            title: "HIỂU ĐÚNG VỀ TIÊU CHUẨN “3 KHÔNG” TRONG SẢN PHẨM ĂN DẶM CỦA BÉBITE",
            short: "Giải thích tiêu chuẩn “3 không” được sử dụng trong các sản phẩm ăn dặm của Bébite.",
            image: "../assets/images/blog/massage.jpg",
            date: "30/10/2025"
        },
        "omega-3": {
            category: "Thông Tin Dinh Dưỡng",
            section: "Thông tin dinh dưỡng",
            title: "DẦU MASSAGE BÉBITE: LIỆU PHÁP CHĂM SÓC LÀN DA NON NỚT & VỖ VỀ GIẤC NGỦ NGOAN",
            short: "Gợi ý cách sử dụng dầu massage để chăm sóc làn da non nớt của bé.",
            image: "../assets/images/blog/baby.jpg",
            date: "30/10/2025"
        }
    };

    Object.entries(articles).forEach(function ([id, article]) {
        const links = document.querySelectorAll(
            'a[href="blog-detail.html?article=' + id + '"]'
        );

        links.forEach(function (link) {
            const card = link.closest(".blog-card");
            if (!card) return;

            const title = card.querySelector(".blog-title");
            const category = card.querySelector(".blog-category-name");
            const date = card.querySelector(".blog-date");
            const image = card.querySelector(".blog-image img");

            if (title) title.textContent = article.title;
            if (category) category.textContent = article.category;
            if (date) date.textContent = article.date;
            if (image) {
                image.src = article.image;
                image.alt = article.title;
            }
        });
    });

    const backToTop = document.getElementById("backToTop");
    if (backToTop) {
        backToTop.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    const navLinks = document.querySelectorAll(".blog-nav a");
    navLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            navLinks.forEach(function (item) {
                item.classList.remove("active");
            });
            link.classList.add("active");
        });
    });

    const sections = [
        {
            id: "cong-thuc",
            link: document.querySelector('.blog-nav a[href="#cong-thuc"]')
        },
        {
            id: "chuyen-gia",
            link: document.querySelector('.blog-nav a[href="#chuyen-gia"]')
        },
        {
            id: "dinh-duong",
            link: document.querySelector('.blog-nav a[href="#dinh-duong"]')
        }
    ];

    window.addEventListener("scroll", function () {
        let currentSection = null;

        sections.forEach(function (section) {
            const element = document.getElementById(section.id);
            if (!element) return;

            if (element.getBoundingClientRect().top <= 180) {
                currentSection = section;
            }
        });

        if (currentSection) {
            navLinks.forEach(function (link) {
                link.classList.remove("active");
            });

            if (currentSection.link) {
                currentSection.link.classList.add("active");
            }
        }
    });
});
