
// 01. NOTIFICATIONS
// =========================

document.addEventListener("DOMContentLoaded", function () {

    const popup = document.getElementById("welcomePopup");

    // Trang không có popup
    if (!popup) return;
    // =========================
    // ELEMENTS
    // =========================

    const closeButton =
        document.getElementById("welcomeClose");

    const startSurvey =
        document.getElementById("startSurvey");

    const surveyLater =
        document.getElementById("surveyLater");

    const surveyIntro =
        document.getElementById("surveyIntro");

    const surveyQuestions =
        document.getElementById("surveyQuestions");

    const surveyResult =
        document.getElementById("surveyResult");

    const questionTitle =
        document.getElementById("questionTitle");

    const questionDescription =
        document.getElementById("questionDescription");

    const questionOptions =
        document.getElementById("questionOptions");
        const surveyBack =
    document.getElementById("surveyBack");

    const surveyStep =
        document.getElementById("surveyStep");

    const exploreButton =
        document.getElementById("exploreButton");

    const profileAgree =
        document.getElementById("profileAgree");


    // =========================
    // QUESTIONS
    // =========================

    const questions = [

        {
            title: "BÉ ĐANG BAO NHIÊU THÁNG TUỔI?",
            description:
                "Hãy chọn độ tuổi hiện tại của bé.",

            options: [
                "0 - 6 tháng",
                "6 - 8 tháng",
                "9 - 12 tháng",
                "12 - 24 tháng",
                "Trên 24 tháng"
            ]
        },

        {
            title: "BÉ ĐANG Ở GIAI ĐOẠN ĂN DẶM NÀO?",
            description:
                "Chọn giai đoạn phù hợp nhất với bé.",

            options: [
                "Mới bắt đầu ăn dặm",
                "Đang làm quen với ăn dặm",
                "Ăn dặm ổn định"
            ]
        },

        {
            title: "BẠN QUAN TÂM TỚI SẢN PHẨM NÀO?",
            description:
                "Bạn có thể chọn sản phẩm mình quan tâm nhất.",

            options: [
                "Bánh ăn dặm",
                "Đồ ăn dặm",
                "Trái cây & rau củ nghiền",
                "Dầu ăn dặm",
                "Sữa & sản phẩm từ sữa",
                "Đồ uống cho bé",
                "Khác"
            ]
        },

        {
            title: "BÉ CÓ DỊ ỨNG THÀNH PHẦN NÀO KHÔNG?",
            description:
                "Thông tin này giúp Bébite đưa ra gợi ý phù hợp hơn.",

            options: [
                "Không có",
                "Đạm sữa",
                "Hải sản",
                "Khác"
            ]
        }

    ];
    let currentQuestion = 0;
    const answers = [];
    // =========================
    // SHOW / HIDE
    // =========================

    function showPopup() {
        popup.classList.remove("is-hidden");
    }
    function closePopup() {
        popup.classList.add("is-hidden");
    }
    function showScreen(screen) {

        surveyIntro.classList.add("is-hidden");
        surveyQuestions.classList.add("is-hidden");
        surveyResult.classList.add("is-hidden");

        screen.classList.remove("is-hidden");
    }


    // =========================
    // START SURVEY
    // =========================

    startSurvey.addEventListener("click", function () {

        currentQuestion = 0;
        answers.length = 0;

        showScreen(surveyQuestions);

        renderQuestion();

    });


function renderQuestion() {

    const question =
        questions[currentQuestion];


    surveyStep.textContent =
        String(currentQuestion + 1).padStart(2, "0");


    questionTitle.textContent =
        question.title;


    questionDescription.textContent =
        question.description;


    questionOptions.innerHTML = "";


    question.options.forEach(function (option) {

        const button =
            document.createElement("button");


        button.type = "button";

        button.className =
            "question-option";


        button.textContent =
            option;


        /*
         * Nếu câu này đã được chọn
         * trước đó thì giữ trạng thái selected
         */

        if (
            answers[currentQuestion] ===
            option
        ) {

            button.classList.add(
                "selected"
            );

        }


        button.addEventListener(
            "click",
            function () {

                answers[currentQuestion] =
                    option;


                button.classList.add(
                    "selected"
                );


                setTimeout(function () {

                    currentQuestion++;


                    if (
                        currentQuestion <
                        questions.length
                    ) {

                        renderQuestion();

                    } else {

                        showSurveyResult();

                    }

                }, 250);

            }
        );
        questionOptions.appendChild(
            button
        );

    });

    /*
     * CÂU 1 thì ẩn nút quay lại
     */

    if (surveyBack) {

        if (currentQuestion === 0) {

            surveyBack.style.display =
                "none";

        } else {

            surveyBack.style.display =
                "block";

        }

    }

}
// =========================
// CÂU TRƯỚC
// =========================

if (surveyBack) {

    surveyBack.addEventListener(
        "click",
        function () {

            if (currentQuestion > 0) {

                currentQuestion--;

                renderQuestion();

            }

        }
    );

}
    // =========================
    // FINAL RESULT
    // =========================

    function showSurveyResult() {

        showScreen(surveyResult);

        console.log(
            "Bébite survey answers:",
            answers
        );

        // Lưu kết quả khảo sát
        localStorage.setItem(
            "bebiteSurvey",
            JSON.stringify(answers)
        );

    }


    // =========================
    // ĐỂ SAU
    // =========================

    surveyLater.addEventListener("click", function () {

        closePopup();

    });


    // =========================
    // NÚT X
    // =========================

    closeButton.addEventListener("click", function () {

        closePopup();

    });


    // =========================
    // BẮT ĐẦU KHÁM PHÁ
    // =========================
exploreButton.addEventListener("click", function () {

    popup.classList.add("is-hidden");

});

profileAgree.addEventListener("click", async function () {
    try {
        // Lấy user đang đăng nhập
        const currentUser = JSON.parse(
            localStorage.getItem("bebiteCurrentUser")
        );

        if (!currentUser || !currentUser.id) {
            alert("Vui lòng đăng nhập để lưu hồ sơ bé.");
            return;
        }

        // Lấy kết quả khảo sát
        const surveyData = JSON.parse(
            localStorage.getItem("bebiteSurvey")
        );

        if (!surveyData || surveyData.length < 4) {
            alert("Chưa có đầy đủ kết quả khảo sát.");
            return;
        }

        // Lấy hồ sơ hiện tại để giữ lại tên, ngày sinh, giới tính
        const oldProfile = currentUser.babyProfile || {};

        const response = await fetch(
            "http://localhost:3000/api/baby-profile",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId: currentUser.id,

                    // Giữ thông tin hồ sơ cũ
                    babyName: oldProfile.name || "",
                    birthday: oldProfile.birthday || "",
                    gender: oldProfile.gender || "",

                    // Cập nhật từ khảo sát
                    age: surveyData[0],
                    stage: surveyData[1],
                    interest: surveyData[2],
                    allergy: surveyData[3]
                })
            }
        );

        const data = await response.json();

        console.log("Kết quả cập nhật hồ sơ:", data);

if (!response.ok || data.success === false) {
    console.error("Lỗi lưu hồ sơ:", {
        status: response.status,
        data: data
    });

    alert(
        "Lỗi lưu hồ sơ (" + response.status + "): " +
        (data.message || JSON.stringify(data))
    );

    return;
}

// Lưu trạng thái đồng ý tạo hồ sơ bé
localStorage.setItem(
    "bebiteBabyProfileConsentUserId",
    String(currentUser.id)
);

// Chỉ ghi nhận đồng ý sau khi API lưu hồ sơ thành công
currentUser.babyProfile = {
    ...oldProfile,
    age: surveyData[0],
    stage: surveyData[1],
    interest: surveyData[2],
    allergy: surveyData[3]
};

localStorage.setItem(
    "bebiteCurrentUser",
    JSON.stringify(currentUser)
);

// Đánh dấu tài khoản này đã đồng ý tạo Baby Profile
localStorage.setItem(
    "bebiteBabyProfileConsentUserId",
    String(currentUser.id)
);

        localStorage.setItem(
            "bebiteCurrentUser",
            JSON.stringify(currentUser)
        );

        // Chuyển sang trang hồ sơ
        window.location.href = "pages/baby-profile.html";

    } catch (error) {
        console.error("❌ Lỗi cập nhật hồ sơ từ khảo sát:", error);
        alert("Có lỗi xảy ra khi lưu hồ sơ bé.");
    }
});
    // =========================
    // HIỆN POPUP
    // =========================

    showPopup();

});
// =========================
// 03. PRODUCT - DRAG TO SCROLL
// =========================
document.addEventListener("DOMContentLoaded", () => {
    const showcase = document.getElementById("productShowcase");
    const track = document.getElementById("scrollTrack");
    const thumb = document.getElementById("scrollThumb");

    if (!showcase || !track || !thumb) {
        console.warn("Không tìm thấy khu vực kéo sản phẩm.");
        return;
    }

    let isDragging = false;
    let startX = 0;
    let startScrollLeft = 0;
    let dragged = false;

    function updateThumbPosition() {
        const maxScroll = showcase.scrollWidth - showcase.clientWidth;
        const maxMove = track.clientWidth - thumb.clientWidth;

        if (maxScroll <= 0 || maxMove <= 0) {
            thumb.style.left = "0px";
            return;
        }

        thumb.style.left =
            `${(showcase.scrollLeft / maxScroll) * maxMove}px`;
    }

    // Kéo trực tiếp danh sách sản phẩm
    showcase.addEventListener("mousedown", (e) => {
        if (e.button !== 0) return;

        isDragging = true;
        dragged = false;
        startX = e.clientX;
        startScrollLeft = showcase.scrollLeft;

        showcase.style.cursor = "grabbing";
    });

    window.addEventListener("mousemove", (e) => {
        if (!isDragging) return;

        const deltaX = e.clientX - startX;

        if (Math.abs(deltaX) > 3) {
            dragged = true;
        }

        if (dragged) {
            e.preventDefault();
            showcase.scrollLeft = startScrollLeft - deltaX;
        }
    });

    window.addEventListener("mouseup", () => {
        if (!isDragging) return;

        isDragging = false;
        showcase.style.cursor = "";
    });

    // Tránh mở nhầm sản phẩm sau khi vừa kéo
    showcase.addEventListener("click", (e) => {
        if (dragged) {
            e.preventDefault();
            e.stopPropagation();
            dragged = false;
        }
    }, true);

    // Kéo thanh trượt
    let isThumbDragging = false;
    let thumbStartX = 0;
    let thumbStartLeft = 0;

    thumb.addEventListener("mousedown", (e) => {
        e.preventDefault();
        e.stopPropagation();

        isThumbDragging = true;
        thumbStartX = e.clientX;
        thumbStartLeft = thumb.offsetLeft;
    });

    window.addEventListener("mousemove", (e) => {
        if (!isThumbDragging) return;

        const maxMove = track.clientWidth - thumb.clientWidth;
        const maxScroll = showcase.scrollWidth - showcase.clientWidth;

        if (maxMove <= 0 || maxScroll <= 0) return;

        const newLeft = Math.max(
            0,
            Math.min(maxMove, thumbStartLeft + e.clientX - thumbStartX)
        );

        showcase.scrollLeft = (newLeft / maxMove) * maxScroll;
    });

    window.addEventListener("mouseup", () => {
        isThumbDragging = false;
    });

    showcase.addEventListener("scroll", updateThumbPosition);
    window.addEventListener("resize", updateThumbPosition);
    window.addEventListener("load", updateThumbPosition); // <-- Thêm dòng này để cập nhật chuẩn sau khi ảnh tải xong

    updateThumbPosition();
});

//----RELAVENT QUESTIONS-----//
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;

        faqItem.classList.toggle('active');
    });
});
