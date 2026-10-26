document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("contactForm");
    const successMessage = document.getElementById("contactSuccess");

    if (!form) {
        return;
    }


    form.addEventListener("submit", function (event) {

        event.preventDefault();


        const name =
            document.getElementById("contactName").value.trim();

        const phone =
            document.getElementById("contactPhone").value.trim();

        const email =
            document.getElementById("contactEmail").value.trim();

        const subject =
            document.getElementById("contactSubject").value;

        const message =
            document.getElementById("contactMessage").value.trim();


        /* ==============================
           CHECK HỌ TÊN
           ============================== */

        if (!name) {

            alert("Vui lòng nhập họ và tên.");

            document.getElementById("contactName").focus();

            return;
        }


        /* ==============================
           CHECK PHONE
           ============================== */

        const phoneRegex = /^[0-9+\s().-]{8,15}$/;

        if (!phoneRegex.test(phone)) {

            alert("Vui lòng nhập số điện thoại hợp lệ.");

            document.getElementById("contactPhone").focus();

            return;
        }


        /* ==============================
           CHECK EMAIL
           ============================== */

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {

            alert("Vui lòng nhập email hợp lệ.");

            document.getElementById("contactEmail").focus();

            return;
        }


        /* ==============================
           CHECK SUBJECT
           ============================== */

        if (!subject) {

            alert("Vui lòng chọn nội dung cần hỗ trợ.");

            document.getElementById("contactSubject").focus();

            return;
        }


        /* ==============================
           CHECK MESSAGE
           ============================== */

        if (!message) {

            alert("Vui lòng nhập nội dung cần hỗ trợ.");

            document.getElementById("contactMessage").focus();

            return;
        }


        /* ==============================
           SAVE CONTACT
           ============================== */

        const contactData = {

            name: name,

            phone: phone,

            email: email,

            subject: subject,

            message: message,

            createdAt: new Date().toISOString()

        };


        let contactMessages = [];

        try {

            const saved =
                localStorage.getItem("bebite_contact_messages");

            if (saved) {

                contactMessages =
                    JSON.parse(saved);

                if (!Array.isArray(contactMessages)) {
                    contactMessages = [];
                }
            }

        } catch (error) {

            console.error(
                "Không thể đọc dữ liệu liên hệ:",
                error
            );

            contactMessages = [];
        }


        contactMessages.push(contactData);


        try {

            localStorage.setItem(
                "bebite_contact_messages",
                JSON.stringify(contactMessages)
            );

        } catch (error) {

            console.error(
                "Không thể lưu thông tin liên hệ:",
                error
            );
        }


        /* ==============================
           SHOW SUCCESS
           ============================== */

        successMessage.classList.add("show");

        form.reset();


        /* ==============================
           SCROLL TO MESSAGE
           ============================== */

        successMessage.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });


        /* ==============================
           HIDE AFTER 6 SECONDS
           ============================== */

        setTimeout(function () {

            successMessage.classList.remove("show");

        }, 6000);

    });

});