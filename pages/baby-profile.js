document.addEventListener("DOMContentLoaded", function () {

    /* =============================================
       KIỂM TRA ĐĂNG NHẬP
    ============================================== */

    const currentUserData =
        localStorage.getItem("bebiteCurrentUser");

    if (!currentUserData) {
        window.location.href = "login.html";
        return;
    }

    let currentUser =
        JSON.parse(currentUserData);


    /* =============================================
       ELEMENTS
    ============================================== */

    const form =
        document.getElementById("babyProfileForm");

    const createSection =
        document.getElementById("profileCreate");

    const dashboard =
        document.getElementById("profileDashboard");

    const surveySummary =
        document.getElementById("surveySummary");

    const babyNameInput =
        document.getElementById("babyName");

    const babyBirthdayInput =
        document.getElementById("babyBirthday");

    const summaryAge =
        document.getElementById("summaryAge");

    const summaryStage =
        document.getElementById("summaryStage");

    const summaryInterest =
        document.getElementById("summaryInterest");

    const summaryAllergy =
        document.getElementById("summaryAllergy");

    let isEditingProfile = false;


    /* =============================================
       ĐỌC SURVEY TẠM THỜI
    ============================================== */

    let surveyData = [];

    try {

        surveyData =
            JSON.parse(
                localStorage.getItem("bebiteSurvey")
            ) || [];

    } catch (error) {

        surveyData = [];

    }


    const hasSurvey =
        Array.isArray(surveyData) &&
        surveyData.length >= 4;


    let savedProfile = null;


    /* =============================================
       LOAD BABY PROFILE
    ============================================== */

    async function loadBabyProfile() {

        try {

            const response = await fetch(
                `http://localhost:3000/api/baby-profile/${currentUser.id}`
            );

            const data =
                await response.json();

if (response.status === 404) {
    console.log("Chưa có Baby Profile trên database.");

    // Chưa tạo hồ sơ: ẩn thông tin khảo sát tạm
    if (surveySummary) {
        surveySummary.classList.add("is-hidden");
    }

    // Hiện form tạo hồ sơ, ẩn dashboard
    if (createSection) {
        createSection.classList.remove("is-hidden");
    }

    if (dashboard) {
        dashboard.classList.add("is-hidden");
    }

    return;
}
            if (!response.ok) {

                console.error(
                    "❌ Lỗi lấy hồ sơ:",
                    data.message
                );

                renderSurveySummary();

                return;
            }


            const p =
                data.profile;


            savedProfile = {

                name: p.baby_name,

                birthday: p.birthday,

                gender: p.gender,

                age: p.age,

                stage: p.stage,

                interest: p.interest,

                allergy: p.allergy

            };


            currentUser.babyProfile =
                savedProfile;


            localStorage.setItem(
                "bebiteCurrentUser",
                JSON.stringify(currentUser)
            );


            console.log(
                "✅ Đã lấy hồ sơ từ MySQL:",
                savedProfile
            );


            showDashboard(
                savedProfile
            );


        } catch (error) {
console.error("Không thể kết nối API:", error);

// Không dùng dữ liệu khảo sát tạm để tự hiển thị hồ sơ
if (surveySummary) {
    surveySummary.classList.add("is-hidden");
}

if (createSection) {
    createSection.classList.remove("is-hidden");
}

if (dashboard) {
    dashboard.classList.add("is-hidden");
}
        }

    }
    /* =============================================
       HIỂN THỊ SURVEY
    ============================================== */
function renderSurveySummary(profile = null) {

    const consentUserId = localStorage.getItem(
        "bebiteBabyProfileConsentUserId"
    );

    const hasConsent =
        consentUserId === String(currentUser.id);

    if (!hasConsent) {
        if (surveySummary) {
            surveySummary.classList.add("is-hidden");
        }
        return;
    }

    if (
        !surveyData.length &&
        !profile?.age
    ) {
            if (surveySummary) {

                surveySummary.classList.add(
                    "is-hidden"
                );

            }

            return;
        }


        if (surveySummary) {

            surveySummary.classList.remove(
                "is-hidden"
            );

        }


        const age =
            profile?.age ||
            surveyData[0] ||
            "Chưa cập nhật";


        const stage =
            profile?.stage ||
            surveyData[1] ||
            "Chưa cập nhật";


        const interest =
            profile?.interest ||
            surveyData[2] ||
            "Chưa cập nhật";


        const allergy =
            profile?.allergy ||
            surveyData[3] ||
            "Chưa cập nhật";


        if (summaryAge) {

            summaryAge.textContent =
                age;

        }


        if (summaryStage) {

            summaryStage.textContent =
                stage;

        }


        if (summaryInterest) {

            summaryInterest.textContent =
                interest;

        }


        if (summaryAllergy) {

            summaryAllergy.textContent =
                allergy;

        }

    }


    /* =============================================
       HIỂN THỊ DASHBOARD
    ============================================== */

    function showDashboard(profile) {

        if (!profile) return;


        if (createSection) {

            createSection.classList.add(
                "is-hidden"
            );

        }


        if (dashboard) {

            dashboard.classList.remove(
                "is-hidden"
            );

        }


        /* TÊN */

        const profileBabyName =
            document.getElementById(
                "profileBabyName"
            );

        const dashboardName =
            document.getElementById(
                "dashboardName"
            );


        if (profileBabyName) {

            profileBabyName.textContent =
                profile.name || "BÉ";

        }


        if (dashboardName) {

            dashboardName.textContent =
                profile.name ||
                "Chưa cập nhật";

        }


        /* NGÀY SINH */

        const dashboardBirthday =
            document.getElementById(
                "dashboardBirthday"
            );


        if (dashboardBirthday) {

            dashboardBirthday.textContent =
                formatDate(
                    profile.birthday
                );

        }


        /* GIỚI TÍNH */

        const dashboardGender =
            document.getElementById(
                "dashboardGender"
            );


        if (dashboardGender) {

            dashboardGender.textContent =
                profile.gender ||
                "Chưa cập nhật";

        }


        /* GIAI ĐOẠN */

        const dashboardStage =
            document.getElementById(
                "dashboardStage"
            );


        if (dashboardStage) {

            dashboardStage.textContent =
                profile.stage ||
                "Chưa cập nhật";

        }


        /* ĐỘ TUỔI */

        const dashboardAge =
            document.getElementById(
                "dashboardAge"
            );


        if (dashboardAge) {

            dashboardAge.textContent =
                profile.age ||
                "Chưa cập nhật";

        }


        /* SẢN PHẨM QUAN TÂM */

        const dashboardInterest =
            document.getElementById(
                "dashboardInterest"
            );


        if (dashboardInterest) {

            dashboardInterest.textContent =
                profile.interest ||
                "Chưa cập nhật";

        }


        /* DỊ ỨNG */

        const dashboardAllergy =
            document.getElementById(
                "dashboardAllergy"
            );


        if (dashboardAllergy) {

            dashboardAllergy.textContent =
                profile.allergy ||
                "Chưa cập nhật";

        }

/* CÁ NHÂN HÓA */

console.log("🔍 PROFILE KHI LOAD LẠI:", profile);

renderPersonalization(profile);
renderStageProgress(profile);

        /* ĐƠN HÀNG ĐA KÊNH */
        renderPurchaseHistory();
    }


    /* =============================================
       LOAD PROFILE
    ============================================== */

    loadBabyProfile();


    /* =============================================
       SUBMIT PROFILE
    ============================================== */

    if (form) {

        form.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();


                const name =
                    babyNameInput.value.trim();


                const birthday =
                    babyBirthdayInput.value;


                const selectedGender =
                    document.querySelector(
                        'input[name="gender"]:checked'
                    );


                const gender =
                    selectedGender
                        ? selectedGender.value
                        : "";


                const existingProfile =
                    currentUser.babyProfile ||
                    {};


                const profile = {

                    name: name,

                    birthday: birthday,

                    gender: gender,

                    age:
                        surveyData[0] ||
                        existingProfile.age ||
                        "Chưa cập nhật",

                    stage:
                        surveyData[1] ||
                        existingProfile.stage ||
                        "Chưa cập nhật",

                    interest:
                        surveyData[2] ||
                        existingProfile.interest ||
                        "Chưa cập nhật",

                    allergy:
                        surveyData[3] ||
                        existingProfile.allergy ||
                        "Chưa cập nhật"

                };


                /* =================================
                   LƯU DATABASE
                ================================= */

                const userId =
                    currentUser.id;


                try {

                    const response =
                        await fetch(
                            "http://localhost:3000/api/baby-profile",
                            {

                                method: "POST",

                                headers: {
                                    "Content-Type":
                                        "application/json"
                                },

                                body:
                                    JSON.stringify({

                                        userId:
                                            userId,

                                        babyName:
                                            profile.name,

                                        birthday:
                                            profile.birthday,

                                        gender:
                                            profile.gender,

                                        age:
                                            profile.age,

                                        stage:
                                            profile.stage,

                                        interest:
                                            profile.interest,

                                        allergy:
                                            profile.allergy

                                    })

                            }
                        );


                    const data =
                        await response.json();


                    if (!response.ok) {

                        alert(
                            data.message ||
                            "Không thể lưu hồ sơ bé."
                        );

                        return;
                    }


                    console.log(
                        "✅ Hồ sơ bé đã lưu:",
                        data
                    );


                    currentUser.babyProfile =
                        profile;


                    localStorage.setItem(
                        "bebiteCurrentUser",
                        JSON.stringify(
                            currentUser
                        )
                    );


                } catch (error) {

                    console.error(
                        "❌ Lỗi kết nối API:",
                        error
                    );


                    alert(
                        "Không thể kết nối đến server. Vui lòng kiểm tra backend."
                    );

                    return;

                }


                if (!isEditingProfile) {

                    localStorage.removeItem(
                        "bebiteSurvey"
                    );

                }


                isEditingProfile = false;


                const createTitle =
                    createSection.querySelector(
                        "h1"
                    );


                if (createTitle) {

                    createTitle.innerHTML =
                        "CÙNG BÉBITE<br>HIỂU BÉ HƠN";

                }


                const submitButton =
                    form.querySelector(
                        ".profile-submit"
                    );


                if (submitButton) {

                    submitButton.textContent =
                        "LƯU HỒ SƠ CỦA BÉ";

                }


                showDashboard(
                    profile
                );

            }
        );

    }
/* =============================================
   CẬP NHẬT HỒ SƠ BÉ
============================================== */

const editProfileButton =
    document.getElementById("editProfileButton");

if (editProfileButton) {
    editProfileButton.addEventListener("click", function () {
   const profile = {
    ...(savedProfile || {}),
    ...(currentUser?.babyProfile || {})
};
        // Mở đúng popup khảo sát hiện có
        renderSurveyOptions(
            editSurveyAge,
            surveyOptions.age,
            "editAge",
            profile.age
        );

        renderSurveyOptions(
            editSurveyStage,
            surveyOptions.stage,
            "editStage",
            profile.stage
        );

        renderSurveyOptions(
            editSurveyInterest,
            surveyOptions.interest,
            "editInterest",
            profile.interest
        );

        renderSurveyOptions(
            editSurveyAllergy,
            surveyOptions.allergy,
            "editAllergy",
            profile.allergy
        );

        // Không mở form tạo hồ sơ
        if (createSection) {
            createSection.classList.add("is-hidden");
        }

        // Hiện dashboard
        if (dashboard) {
            dashboard.classList.remove("is-hidden");
        }

        // Hiện popup khảo sát
        if (surveyEditOverlay) {
            surveyEditOverlay.classList.remove("is-hidden");
        }
    });
}


    /* =============================================
       POPUP CẬP NHẬT SURVEY
    ============================================== */

    const editSurveyButton =
        document.getElementById(
            "editSurveyButton"
        );

    const surveyEditOverlay =
        document.getElementById(
            "surveyEditOverlay"
        );

    const closeSurveyEdit =
        document.getElementById(
            "closeSurveyEdit"
        );

    const saveSurveyEdit =
        document.getElementById(
            "saveSurveyEdit"
        );


    /* =============================================
       SURVEY OPTIONS
    ============================================== */

    const surveyOptions = {

    age: [
        "0–6 tháng",
        "6–8 tháng",
        "9–12 tháng",
        "12–24 tháng",
        "Trên 24 tháng"
    ],

        stage: [
            "Mới bắt đầu ăn dặm",
            "Đang làm quen với ăn dặm",
            "Ăn dặm ổn định"
        ],

        interest: [
              "Bánh ăn dặm",
                "Đồ ăn dặm",
                "Trái cây & rau củ nghiền",
                "Dầu ăn dặm",
                "Sữa & sản phẩm từ sữa",
                "Đồ uống cho bé",
                "Khác"
        ],

        allergy: [
                "Không có",
                "Đạm sữa",
                "Hải sản",
                "Khác"
            ]

    };


    const editSurveyAge =
        document.getElementById(
            "editSurveyAge"
        );

    const editSurveyStage =
        document.getElementById(
            "editSurveyStage"
        );

    const editSurveyInterest =
        document.getElementById(
            "editSurveyInterest"
        );

    const editSurveyAllergy =
        document.getElementById(
            "editSurveyAllergy"
        );


    /* =============================================
       TẠO OPTION
    ============================================== */

    function renderSurveyOptions(
        container,
        options,
        name,
        selectedValue
    ) {

        if (!container) return;


        container.innerHTML = "";


        options.forEach(
            function (option) {

                const label =
                    document.createElement(
                        "label"
                    );


                label.className =
                    "survey-choice";


                const input =
                    document.createElement(
                        "input"
                    );


                input.type =
                    "radio";


                input.name =
                    name;


                input.value =
                    option;


                input.checked =
                    String(option).trim() ===
                    String(
                        selectedValue || ""
                    ).trim();


                const text =
                    document.createElement(
                        "span"
                    );


                text.textContent =
                    option;


                label.appendChild(
                    input
                );


                label.appendChild(
                    text
                );


                container.appendChild(
                    label
                );

            }
        );

    }


    /* =============================================
       LẤY OPTION
    ============================================== */

    function getSelectedValue(
        container
    ) {

        if (!container) return "";


        const selected =
            container.querySelector(
                'input[type="radio"]:checked'
            );


        return selected
            ? selected.value
            : "";

    }


    /* =============================================
       MỞ POPUP
    ============================================== */

    if (editSurveyButton) {

        editSurveyButton.addEventListener(
            "click",
            function () {

    const profile = {
    ...(savedProfile || {}),
    ...(currentUser?.babyProfile || {})
};
                renderSurveyOptions(
                    editSurveyAge,
                    surveyOptions.age,
                    "editAge",
                    profile.age
                );

                renderSurveyOptions(
                    editSurveyStage,
                    surveyOptions.stage,
                    "editStage",
                    profile.stage
                );


                renderSurveyOptions(
                    editSurveyInterest,
                    surveyOptions.interest,
                    "editInterest",
                    profile.interest
                );


                renderSurveyOptions(
                    editSurveyAllergy,
                    surveyOptions.allergy,
                    "editAllergy",
                    profile.allergy
                );


                if (surveyEditOverlay) {

                    surveyEditOverlay.classList.remove(
                        "is-hidden"
                    );

                }

            }
        );

    }


    /* =============================================
       ĐÓNG POPUP
    ============================================== */

    function closeSurveyModal() {

        if (!surveyEditOverlay) return;


        surveyEditOverlay.classList.add(
            "is-hidden"
        );

    }


    if (closeSurveyEdit) {

        closeSurveyEdit.addEventListener(
            "click",
            closeSurveyModal
        );

    }


    if (surveyEditOverlay) {

        surveyEditOverlay.addEventListener(
            "click",
            function (event) {

                if (
                    event.target ===
                    surveyEditOverlay
                ) {

                    closeSurveyModal();

                }

            }
        );

    }

/* =============================================
   LƯU SURVEY - CẬP NHẬT MYSQL
============================================= */

if (saveSurveyEdit) {
    saveSurveyEdit.addEventListener("click", async function () {

        const userId = currentUser?.id;

        if (!userId) {
            alert("Vui lòng đăng nhập lại.");
            return;
        }

        // Lấy hồ sơ hiện tại, giữ nguyên thông tin cơ bản
        const profile = {
            ...(savedProfile || {}),
            ...(currentUser.babyProfile || {})
        };

        // Lấy dữ liệu khảo sát mới
        const age = getSelectedValue(editSurveyAge);
        const stage = getSelectedValue(editSurveyStage);
        const interest = getSelectedValue(editSurveyInterest);
        const allergy = getSelectedValue(editSurveyAllergy);

        // Giữ giá trị cũ nếu người dùng chưa chọn lại
        profile.age = age || profile.age || "Chưa cập nhật";
        profile.stage = stage || profile.stage || "Chưa cập nhật";
        profile.interest = interest || profile.interest || "Chưa cập nhật";
        profile.allergy = allergy || profile.allergy || "Chưa cập nhật";

        // Chống bấm lưu nhiều lần
        saveSurveyEdit.disabled = true;

        try {
            const response = await fetch(
                "http://localhost:3000/api/baby-profile",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        userId: userId,
                        babyName: profile.name || profile.babyName || "",
                        birthday: profile.birthday || "",
                        gender: profile.gender || "",
                        age: profile.age,
                        stage: profile.stage,
                        interest: profile.interest,
                        allergy: profile.allergy
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(
                    data.message ||
                    "Không thể cập nhật khảo sát. Vui lòng thử lại."
                );
                return;
            }

            // Chỉ cập nhật giao diện sau khi API lưu thành công
currentUser.babyProfile = profile;
savedProfile = profile;

localStorage.setItem(
    "bebiteCurrentUser",
    JSON.stringify(currentUser)
);

closeSurveyModal();

showDashboard(profile);

            alert("Cập nhật thông tin khảo sát thành công!");

        } catch (error) {
            console.error("Lỗi cập nhật khảo sát:", error);

            alert(
                "Không thể kết nối đến server. Hãy kiểm tra backend."
            );

        } finally {
            saveSurveyEdit.disabled = false;
        }
    });
}

    /* =============================================
       CÁ NHÂN HÓA
    ============================================== */

    function renderPersonalization(profile) {
        if (!profile) return;

        const personalAge = document.getElementById("personalAge");
        const personalStage = document.getElementById("personalStage");
        const personalInterest = document.getElementById("personalInterest");
        const personalAllergy = document.getElementById("personalAllergy");

        if (personalAge) personalAge.textContent = profile.age || "Chưa cập nhật";
        if (personalStage) personalStage.textContent = profile.stage || "Chưa cập nhật";
        if (personalInterest) personalInterest.textContent = profile.interest || "Chưa cập nhật";
        if (personalAllergy) personalAllergy.textContent = profile.allergy || "Chưa cập nhật";

        renderPersonalizationAnalysis(profile);
    }


    /* =============================================
       PHÂN TÍCH CÁ NHÂN HÓA
    ============================================== */

    function renderPersonalizationAnalysis(profile) {
        if (!profile) return;

        const chart = document.getElementById("personalizationChart");
        const fitScore = document.getElementById("personalFitScore");
        const fitLabel = document.getElementById("personalFitLabel");
        const stageTitle = document.getElementById("personalStageTitle");
        const stageDescription = document.getElementById("personalStageDescription");
        const insightContainer = document.getElementById("personalizationInsights");

        const babyName = profile.name || "bé";
        const age = String(profile.age || "").trim();
        const stage = String(profile.stage || "").trim();
        const interest = String(profile.interest || "").trim();
        const allergy = String(profile.allergy || "").trim();

        /* TIẾN TRÌNH ĂN DẶM */
        let stageIndex = 1;

        if (stage.includes("Đang làm quen")) stageIndex = 2;
        if (stage.toLowerCase().includes("ổn định")) stageIndex = 3;

        document.querySelectorAll(".stage-point").forEach(point => {
            const pointStage = Number(point.dataset.stage);
            point.classList.toggle("is-active", pointStage <= stageIndex);
        });


        /* TRƯỜNG HỢP BÉ 0–6 THÁNG */
        const isUnderSixMonths =
            /0\s*[-–—]\s*6\s*tháng/i.test(String(age || "").trim());

        if (isUnderSixMonths) {
            if (chart) {
                chart.innerHTML = `
                    <div class="personalization-notice">
                        <div class="notice-icon">
                            <span>6+</span>
                        </div>

                        <div class="notice-content">
                            <div class="notice-label">
                                THÔNG TIN QUAN TRỌNG
                            </div>

                            <h3>BÉ CHƯA ĐỦ 6 THÁNG</h3>

                            <p>
                                Bé hiện đang ở nhóm
                                <strong>0–6 tháng</strong>.
                                Bébite khuyến nghị mẹ chờ bé đủ 6 tháng
                                trước khi bắt đầu ăn dặm.
                            </p>

                            <div class="notice-note">
                                <span>✓</span>
                                Khi bé đủ 6 tháng, mẹ có thể cập nhật lại
                                hồ sơ để nhận gợi ý sản phẩm phù hợp.
                            </div>
                        </div>
                    </div>
                `;

                chart.style.display = "block";
            }

            // Ẩn chỉ số tỷ lệ cá nhân hóa
            if (fitScore) {
                fitScore.textContent = "--";
                fitScore.style.display = "none";
            }

            if (fitLabel) {
                fitLabel.textContent = "CHƯA PHÂN TÍCH";
                fitLabel.style.display = "none";
            }

            // Xóa các gợi ý sản phẩm
            if (insightContainer) {
                insightContainer.innerHTML = "";
                insightContainer.style.display = "none";
            }

            // Cập nhật nội dung tiến trình
            if (stageTitle) {
                stageTitle.textContent =
                    "BÉBITE SẼ ĐỒNG HÀNH CÙNG BÉ TỪ 6 THÁNG";
            }

            if (stageDescription) {
                stageDescription.textContent =
                    "Hệ thống cá nhân hóa sản phẩm sẽ được kích hoạt khi bé đủ 6 tháng.";
            }

            return;
        }

        // Bé trên 6 tháng: hiện lại các chỉ số
        if (fitScore) fitScore.style.display = "";
        if (fitLabel) fitLabel.style.display = "";
        if (insightContainer) insightContainer.style.display = "";

        /* CÁC NHÓM SẢN PHẨM */
        const products = [
            {
                name: "Sữa bột", key: "sua-bot",
                age: { "6–8": 34, "9–12": 32, "12–24": 27, "Trên 24": 25 },
                stage: { "Mới bắt đầu": 7, "Đang làm quen": 5, "ổn định": 3 }
            },
            {
                name: "Bánh ăn dặm", key: "banh-an-dam",
                age: { "6–8": 45, "9–12": 37, "12–24": 42, "Trên 24": 40 },
                stage: { "Mới bắt đầu": 10, "Đang làm quen": 8, "ổn định": 10 }
            },
            {
                name: "Bánh gạo", key: "banh-gao",
                age: { "6–8": 12, "9–12": 29, "12–24": 37, "Trên 24": 42 },
                stage: { "Mới bắt đầu": -7, "Đang làm quen": 1, "ổn định": 8 }
            },
            {
                name: "Bánh quy ăn dặm", key: "banh-quy",
                age: { "6–8": 5, "9–12": 17, "12–24": 28, "Trên 24": 38 },
                stage: { "Mới bắt đầu": -10, "Đang làm quen": -3, "ổn định": 6 }
            },
            {
                name: "Cháo ăn dặm", key: "chao",
                age: { "6–8": 50, "9–12": 42, "12–24": 31, "Trên 24": 22 },
                stage: { "Mới bắt đầu": 15, "Đang làm quen": 10, "ổn định": 5 }
            },
            {
                name: "Các loại hạt", key: "hat",
                age: { "6–8": 25, "9–12": 22, "12–24": 35, "Trên 24": 42 },
                stage: { "Mới bắt đầu": -5, "Đang làm quen": -2, "ổn định": 8 }
            },
            {
                name: "Dầu ăn dặm", key: "dau",
                age: { "6–8": 34, "9–12": 34, "12–24": 36, "Trên 24": 35 },
                stage: { "Mới bắt đầu": 9, "Đang làm quen": 8, "ổn định": 6 }
            },
            {
                name: "Sữa chua uống", key: "sua-chua",
                age: { "6–8": 8, "9–12": 23, "12–24": 32, "Trên 24": 38 },
                stage: { "Mới bắt đầu": -5, "Đang làm quen": 2, "ổn định": 7 }
            },
            {
                name: "Trái cây nghiền", key: "trai-cay",
                age: { "6–8": 45, "9–12": 40, "12–24": 30, "Trên 24": 22 },
                stage: { "Mới bắt đầu": 12, "Đang làm quen": 9, "ổn định": 4 }
            }
        ];

        products.forEach(product => product.score = 20);

        /* ĐỘ TUỔI */
        let ageKey = "";

        if (age.includes("6–8") || age.includes("6-8")) ageKey = "6–8";
        else if (age.includes("9–12") || age.includes("9-12")) ageKey = "9–12";
        else if (age.includes("12–24") || age.includes("12-24")) ageKey = "12–24";
        else if (age.includes("Trên 24")) ageKey = "Trên 24";

        if (ageKey) {
            products.forEach(product => {
                product.score += product.age[ageKey] || 0;
            });
        }

        /* GIAI ĐOẠN ĂN DẶM */
        let stageKey = "";

        if (stage.includes("Mới bắt đầu")) stageKey = "Mới bắt đầu";
        else if (stage.includes("Đang làm quen")) stageKey = "Đang làm quen";
        else if (stage.toLowerCase().includes("ổn định")) stageKey = "ổn định";

        if (stageKey) {
            products.forEach(product => {
                product.score += product.stage[stageKey] || 0;
            });
        }

        /* SẢN PHẨM QUAN TÂM */
        const interestItems = interest
            .split(/[,;\n|]+/)
            .map(item => item.trim().toLowerCase())
            .filter(Boolean);

        function hasInterest(...keywords) {
            return interestItems.some(item =>
                keywords.some(keyword => item.includes(keyword))
            );
        }

        const interestRules = [
            { key: "sua-bot", words: ["sữa bột"] },
            { key: "banh-an-dam", words: ["bánh ăn dặm"] },
            { key: "banh-gao", words: ["bánh gạo"] },
            { key: "banh-quy", words: ["bánh quy"] },
            { key: "chao", words: ["cháo"] },
            { key: "hat", words: ["hạt"] },
            { key: "dau", words: ["dầu"] },
            { key: "sua-chua", words: ["sữa chua"] },
            { key: "trai-cay", words: ["trái cây", "rau củ", "nghiền"] }
        ];

        interestRules.forEach(rule => {
            if (hasInterest(...rule.words)) {
                const product = products.find(item => item.key === rule.key);
                if (product) product.score += 35;
            }
        });

        /* ĐIỀU CHỈNH THEO TUỔI */
        if (ageKey === "6–8") {
            products.find(p => p.key === "banh-quy").score -= 25;
            products.find(p => p.key === "banh-gao").score -= 18;
            products.find(p => p.key === "hat").score -= 15;
            products.find(p => p.key === "sua-chua").score -= 10;
        }

        if (ageKey === "9–12") {
            products.find(p => p.key === "banh-quy").score -= 8;
            products.find(p => p.key === "hat").score -= 5;
        }

        /* DỊ ỨNG ĐẠM SỮA */
        const allergyText = allergy.toLowerCase();
        const milkAllergy =
            allergyText.includes("đạm sữa") ||
            allergyText.includes("sữa bò");

        if (milkAllergy) {
            products.find(p => p.key === "sua-bot").score -= 60;
            products.find(p => p.key === "sua-chua").score -= 60;
        }
        
/* ƯU TIÊN SỮA / ĐỒ UỐNG KHI KHÔNG DỊ ỨNG ĐẠM SỮA */
const normalizedInterest = interest.toLowerCase();

const wantsMilkDrink =
    normalizedInterest.includes("sữa") ||
    normalizedInterest.includes("đồ uống") ||
    normalizedInterest.includes("thức uống") ||
    normalizedInterest.includes("dinh dưỡng");

if (wantsMilkDrink && !milkAllergy) {
    const milkPowder = products.find(p => p.key === "sua-bot");
    const yogurt = products.find(p => p.key === "sua-chua");
    const fruit = products.find(p => p.key === "trai-cay");

    if (milkPowder) milkPowder.score = 100;
    if (yogurt) yogurt.score = Math.max(yogurt.score, 90);
    if (fruit) fruit.score = Math.max(fruit.score, 80);
}

        /* GIỚI HẠN ĐIỂM */
        products.forEach(product => {
            product.score = Math.max(0, Math.min(100, Math.round(product.score)));
        });

        products.sort((a, b) => b.score - a.score);

        /* HIỂN THỊ BIỂU ĐỒ */
        if (chart) {
            chart.innerHTML = products.map(product => `
                <div class="personalization-bar-row">
                    <span class="personalization-bar-label">${product.name}</span>
                    <div class="personalization-bar-track">
                        <div class="personalization-bar-fill" style="width:${product.score}%"></div>
                    </div>
                    <span class="personalization-bar-value">${product.score}%</span>
                </div>
            `).join("");
        }

        /* ĐIỂM TỔNG QUAN */
        const topScores = products.slice(0, 3);
        const score = Math.round(
            topScores.reduce((sum, product) => sum + product.score, 0) /
            topScores.length
        );

        if (fitScore) fitScore.textContent = `${score}%`;

        if (fitLabel) {
            fitLabel.textContent =
                score >= 85 ? "RẤT PHÙ HỢP" :
                score >= 70 ? "PHÙ HỢP" :
                "CẦN XEM THÊM";
        }

        /* TIÊU ĐỀ PHÂN TÍCH */
        if (stageTitle) stageTitle.textContent = "GỢI Ý DÀNH RIÊNG CHO BÉ";

        if (stageDescription) {
            stageDescription.textContent =
                "Phân tích được xây dựng từ độ tuổi, giai đoạn ăn dặm, nhóm sản phẩm bé quan tâm và thông tin dị ứng trong hồ sơ.";
        }

        /* INSIGHTS */
        const insightList = [];

        if (age) {
            insightList.push({
                title: "ĐỘ TUỔI",
                text: `${babyName} đang ở nhóm ${age}, vì vậy hệ thống điều chỉnh mức ưu tiên theo khả năng phù hợp của từng nhóm sản phẩm.`,
                number: "01"
            });
        }

        if (stage) {
            insightList.push({
                title: "GIAI ĐOẠN",
                text: `${stage}. Giai đoạn ăn dặm tiếp tục điều chỉnh thứ tự gợi ý để phù hợp hơn với hành trình của bé.`,
                number: "02"
            });
        }

        if (interest && interest !== "Chưa cập nhật") {
            insightList.push({
                title: "NHU CẦU QUAN TÂM",
                text: `Bé đang quan tâm ${interest.toLowerCase()}, nên nhóm được chọn có trọng số ưu tiên cao hơn trong phân tích.`,
                number: "03"
            });
        }

        if (allergy && allergy !== "Không có" && allergy !== "Chưa cập nhật") {
            insightList.push({
                title: "DỊ ỨNG",
                text: "Hệ thống đã điều chỉnh các nhóm sản phẩm có liên quan đến thông tin dị ứng trong hồ sơ.",
                number: "04"
            });
        }

        if (insightContainer) {
            insightContainer.innerHTML = insightList.map(item => `
                <div class="personalization-insight">
                    <div class="personalization-insight-number">${item.number}</div>
                    <div class="personalization-insight-content">
                        <strong>${item.title}</strong>
                        <p>${item.text}</p>
                    </div>
                </div>
            `).join("");
        }
    }


    /* =============================================
       TIẾN TRÌNH ĂN DẶM
    ============================================== */

    function renderStageProgress(profile) {
        const stage = String(profile?.stage || "").trim();

        const stageTitle = document.getElementById("personalStageTitle");
        const stageDescription = document.getElementById("personalStageDescription");

        let stageIndex = 1;

        if (stage.includes("Đang làm quen")) {
            stageIndex = 2;
        }

        if (stage.includes("ổn định")) {
            stageIndex = 3;
        }

        const stageTitleText = stage || "Chưa cập nhật";

        const stageDescriptionText =
            stage.includes("Mới bắt đầu")
                ? "Ưu tiên những nhóm sản phẩm đơn giản để bé làm quen từng bước."
                : stage.includes("Đang làm quen")
                    ? "Bébite mở rộng gợi ý theo nhu cầu và sở thích đang hình thành của bé."
                    : stage.includes("ổn định")
                        ? "Hồ sơ cho phép hệ thống mở rộng nhóm sản phẩm phù hợp hơn với bé."
                        : "Cập nhật giai đoạn ăn dặm để Bébite cá nhân hóa tốt hơn.";

        if (stageTitle) {
            stageTitle.textContent = stageTitleText;
        }

        if (stageDescription) {
            stageDescription.textContent = stageDescriptionText;
        }

        document.querySelectorAll(".stage-point").forEach(point => {
            const pointStage = Number(point.dataset.stage);

            point.classList.toggle(
                "is-active",
                pointStage <= stageIndex
            );
        });
    }


    /* =============================================
       ĐƠN HÀNG ĐA KÊNH
    ============================================== */

    async function renderPurchaseHistory() {

        console.log(
            "🔥 renderPurchaseHistory ĐÃ CHẠY"
        );


        const ordersList =
            document.getElementById(
                "ordersList"
            );


        const ordersFilter =
            document.getElementById(
                "ordersFilter"
            );


        if (!ordersList) {

            console.log(
                "❌ Không tìm thấy #ordersList"
            );

            return;

        }


        /* TOKEN */

        const token =
            localStorage.getItem(
                "bebiteToken"
            );


        if (!token) {

            ordersList.innerHTML = `
                <div class="order-empty">
                    Vui lòng đăng nhập để xem đơn hàng.
                </div>
            `;

            return;

        }


        try {

            /* API */

            const response =
                await fetch(
                    "http://localhost:3000/api/orders",
                    {

                        method: "GET",

                        headers: {

                            "Authorization":
                                `Bearer ${token}`

                        }

                    }
                );


            const data =
                await response.json();
            /* TOKEN HẾT HẠN */
            if (
                response.status === 401 ||
                response.status === 403
            ) {

                ordersList.innerHTML = `
                    <div class="order-empty">
                        Phiên đăng nhập đã hết hạn.
                        Vui lòng đăng nhập lại.
                    </div>
                `;
                return;
            }
            /* API LỖI */

            if (!response.ok) {
                console.error(
                    "❌ API orders lỗi:",
                    data
                );
                ordersList.innerHTML = `
                    <div class="order-empty">
                        Không thể tải đơn hàng.
                    </div>
                `;
                return;
            }
            if (data.success === false) {
                ordersList.innerHTML = `
                    <div class="order-empty">
                        ${
                            data.message ||
                            "Không thể tải đơn hàng."
                        }
                    </div>
                `;
                return;
            }
            const orders =
                Array.isArray(data.orders)
                    ? data.orders
                    : [];
            /* KHÔNG CÓ ĐƠN */
            if (orders.length === 0) {
                ordersList.innerHTML = `
                    <div class="order-empty">
                        Chưa có đơn hàng nào.
                    </div>
                `;
                return;
            }
            /* SẮP XẾP */
            const sortedOrders =
                orders
                    .slice()
                    .sort(
                        function (a, b) {
                            const dateA =
                                new Date(
                                    a.order_date || 0
                                ).getTime();
                            const dateB =
                                new Date(
                                    b.order_date || 0
                                ).getTime();
                            return dateB - dateA;
                        }
                    );
            /* =====================================
               RENDER ORDERS
            ====================================== */
            function renderOrders(
                channel = "all"
            ) {
                let filteredOrders =
                    sortedOrders;
                /* FILTER */
                if (channel !== "all") {
                    filteredOrders =
                        sortedOrders.filter(
                            function (order) {
                                return (
                                    order.order_channel ||
                                    "website"
                                )
                                    .toLowerCase() ===
                                    channel.toLowerCase();
                            }
                        );
                }
                /* KHÔNG CÓ ĐƠN SAU FILTER */
                if (
                    filteredOrders.length === 0
                ) {
                    ordersList.innerHTML = `
                        <div class="order-empty">
                            Chưa có đơn hàng ở kênh này.
                        </div>
                    `;

                    return;

                }
                /* =================================
                   TẠO HTML
                ================================== */

                ordersList.innerHTML =
                    filteredOrders
                        .map(
                            function (order) {

                                /* NGÀY */

                                const orderDate =
                                    order.order_date
                                        ? new Date(
                                            order.order_date
                                        ).toLocaleDateString(
                                            "vi-VN"
                                        )
                                        : "Chưa cập nhật";


                                /* TIỀN */

                                const total =
                                    Number(
                                        order.total_amount ||
                                        0
                                    ).toLocaleString(
                                        "vi-VN"
                                    );


                                /* KÊNH */

                                const channelName =
                                    (
                                        order.order_channel ||
                                        "website"
                                    ).toLowerCase();


                                let channelText =
                                    "Website";


                                if (
                                    channelName ===
                                    "shopee"
                                ) {

                                    channelText =
                                        "Shopee";

                                }


                                if (
                                    channelName ===
                                    "tiktok_shop"
                                ) {

                                    channelText =
                                        "TikTok Shop";

                                }


                                /* TRẠNG THÁI */

                                const status =
                                    order.status ||
                                    "Đang xử lý";


                                return `

                                    <div
                                        class="order-item"
                                        data-order-id="${order.id || ""}"
                                    >

                                        <div class="order-summary-row">


                                            <!-- MÃ ĐƠN -->

                                            <div class="order-info">

                                                <span class="order-code">
                                                    Đơn #${
                                                        order.id ||
                                                        "N/A"
                                                    }
                                                </span>

                                                <span class="order-date">
                                                    ${orderDate}
                                                </span>

                                            </div>


                                            <!-- KÊNH -->

                                            <div class="order-products">
                                                ${channelText}
                                            </div>


                                            <!-- TIỀN + TRẠNG THÁI -->

                                            <div class="order-price">

                                                <strong>
                                                    ${total}đ
                                                </strong>

                                                <span class="order-status">
                                                    ${status}
                                                </span>

                                            </div>


                                            <!-- XEM CHI TIẾT -->

                                            <button
                                                type="button"
                                                class="order-detail-button"
                                                data-order-id="${
                                                    order.id || ""
                                                }"
                                            >
                                                Xem chi tiết
                                            </button>

                                        </div>


                                        <!-- CHI TIẾT -->

                                        <div
                                            class="order-detail"
                                            hidden
                                        >

                                            <div class="order-detail-title">
                                                CHI TIẾT ĐƠN HÀNG
                                            </div>


                                            <div class="order-detail-channel">

                                                Kênh mua hàng:

                                                <strong>
                                                    ${channelText}
                                                </strong>

                                            </div>


                                            <div class="order-detail-products">

                                                ${
                                                    Array.isArray(
                                                        order.items
                                                    ) &&
                                                    order.items.length > 0

                                                    ?

order.items
    .map(function (item) {
        const price = Number(
            item.price ?? item.unit_price ?? 0
        );

        const quantity = Number(item.quantity) || 1;

        const itemPrice = price.toLocaleString("vi-VN");

        const itemTotal = Number(
            item.subtotal ?? price * quantity
        ).toLocaleString("vi-VN");

        const itemName =
            item.name ||
            item.product_name ||
            "Sản phẩm";

        return `
            <div class="order-product-row">
                <div class="order-product-info">
                    <strong>${itemName}</strong>
                    <span>${itemPrice}đ × ${quantity}</span>
                </div>

                <div class="order-product-price">
                    ${itemTotal}đ
                </div>
            </div>
        `;
    })
    .join("")

                                                    :

                                                    `
                                                        <div class="order-detail-empty">
                                                            Chưa có thông tin sản phẩm của đơn hàng.
                                                        </div>
                                                    `
                                                }

                                            </div>


                                            <div class="order-detail-footer">

                                                <strong>
                                                    TỔNG CỘNG
                                                </strong>

                                                <strong>
                                                    ${total}đ
                                                </strong>

                                            </div>

                                        </div>

                                    </div>

                                `;

                            }
                        )
                        .join("");


                /* =================================
                   XEM / ĐÓNG CHI TIẾT
                ================================== */

                ordersList.onclick =
                    function (event) {

                        const button =
                            event.target.closest(
                                ".order-detail-button"
                            );


                        if (!button) {
                            return;
                        }


                        const orderItem =
                            button.closest(
                                ".order-item"
                            );


                        if (!orderItem) {
                            return;
                        }


                        const detail =
                            orderItem.querySelector(
                                ".order-detail"
                            );


                        if (!detail) {
                            return;
                        }


                        const isOpening =
                            detail.hidden;


                        /* ĐÓNG TẤT CẢ */

                        ordersList
                            .querySelectorAll(
                                ".order-detail"
                            )
                            .forEach(
                                function (item) {

                                    item.hidden =
                                        true;

                                }
                            );


                        /* RESET BUTTON */

                        ordersList
                            .querySelectorAll(
                                ".order-detail-button"
                            )
                            .forEach(
                                function (btn) {

                                    btn.textContent =
                                        "Xem chi tiết";

                                }
                            );


                        /* MỞ */

                        if (isOpening) {

                            detail.hidden =
                                false;

                            button.textContent =
                                "Thu gọn ↑";

                        }

                    };


                console.log(
                    "✅ Đã render:",
                    filteredOrders.length,
                    "đơn hàng"
                );

            }


            /* =====================================
               HIỂN THỊ MẶC ĐỊNH
            ====================================== */

            renderOrders(
                "all"
            );


            /* =====================================
               FILTER BUTTON
            ====================================== */

            if (ordersFilter) {

                ordersFilter
                    .querySelectorAll(
                        "[data-channel]"
                    )
                    .forEach(
                        function (button) {

                            button.addEventListener(
                                "click",
                                function () {

                                    ordersFilter
                                        .querySelectorAll(
                                            "[data-channel]"
                                        )
                                        .forEach(
                                            function (btn) {

                                                btn.classList.remove(
                                                    "active"
                                                );

                                            }
                                        );


                                    this.classList.add(
                                        "active"
                                    );


                                    const channel =
                                        this.dataset.channel ||
                                        "all";


                                    renderOrders(
                                        channel
                                    );

                                }
                            );

                        }
                    );

            }


        } catch (error) {

            console.error(
                "❌ Lỗi renderPurchaseHistory:",
                error
            );


            ordersList.innerHTML = `
                <div class="order-empty">
                    Không thể kết nối đến server.
                    Vui lòng kiểm tra backend.
                </div>
            `;

        }

    }


    /* =============================================
       FORMAT NGÀY
    ============================================== */

    function formatDate(
        dateString
    ) {

        if (!dateString) {

            return "Chưa cập nhật";

        }


        const date =
            new Date(
                dateString
            );


        if (
            Number.isNaN(
                date.getTime()
            )
        ) {

            return dateString;

        }


        const day =
            String(
                date.getDate()
            ).padStart(
                2,
                "0"
            );


        const month =
            String(
                date.getMonth() + 1
            ).padStart(
                2,
                "0"
            );


        const year =
            date.getFullYear();


        return `${day}/${month}/${year}`;

    }


    /* =============================================
       FORMAT TIỀN
    ============================================== */

    function formatPrice(
        price
    ) {

        return Number(
            price || 0
        )
            .toLocaleString(
                "vi-VN"
            )
            + "đ";

    }


    /* =============================================
       ESCAPE HTML
    ============================================== */

    function escapeHtml(
        value
    ) {

        return String(
            value ?? ""
        )
            .replace(
                /&/g,
                "&amp;"
            )
            .replace(
                /</g,
                "&lt;"
            )
            .replace(
                />/g,
                "&gt;"
            )
            .replace(
                /"/g,
                "&quot;"
            )
            .replace(
                /'/g,
                "&#039;"
            );

    }


    /* =============================================
       LOGOUT
    ============================================== */

    const logoutBtn =
        document.getElementById(
            "logoutBtn"
        );


    if (logoutBtn) {

        logoutBtn.addEventListener(
            "click",
            function () {

                const confirmLogout =
                    confirm(
                        "Bạn có chắc muốn đăng xuất không?"
                    );


                if (!confirmLogout) {
                    return;
                }


                localStorage.removeItem(
                    "bebiteCurrentUser"
                );


                localStorage.removeItem(
                    "bebiteToken"
                );


                window.location.href =
                    "../index.html";

            }
        );

    }

});

/* CUỘN ĐẾN PHẦN PHÂN TÍCH SẢN PHẨM */
document.addEventListener("click", function (event) {
    const button = event.target.closest("#viewProductAnalysis");

    if (!button) return;

    // Đổi selector này nếu biểu đồ của bạn dùng ID khác
    const analysisSection =
        document.getElementById("personalizationAnalysis") ||
        document.getElementById("personalizationChart") ||
        document.querySelector(".personalization-analysis");

    if (analysisSection) {
        analysisSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    } else {
        console.warn(
            "Chưa tìm thấy phần biểu đồ phân tích sản phẩm."
        );
    }
});
