const registerForm = document.getElementById("registerForm");

const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const terms = document.getElementById("terms");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const phoneError = document.getElementById("phoneError");
const passwordError = document.getElementById("passwordError");
const confirmPasswordError = document.getElementById("confirmPasswordError");
const termsError = document.getElementById("termsError");

const message = document.getElementById("message");


// ===============================
// SHOW / HIDE PASSWORD
// ===============================

document.getElementById("showPassword").addEventListener("click", function () {

    if (password.type === "password") {
        password.type = "text";
        this.textContent = "Hide";
    } else {
        password.type = "password";
        this.textContent = "Show";
    }

});


document.getElementById("showConfirmPassword").addEventListener("click", function () {

    if (confirmPassword.type === "password") {
        confirmPassword.type = "text";
        this.textContent = "Hide";
    } else {
        confirmPassword.type = "password";
        this.textContent = "Show";
    }

});


// ===============================
// FORM SUBMIT
// ===============================

registerForm.addEventListener("submit", function (e) {

    e.preventDefault();

    let valid = true;

    // Clear old messages
    nameError.textContent = "";
    emailError.textContent = "";
    phoneError.textContent = "";
    passwordError.textContent = "";
    confirmPasswordError.textContent = "";
    termsError.textContent = "";
    message.textContent = "";


    // ===============================
    // FULL NAME
    // ===============================

    const nameValue = fullName.value.trim();

    if (nameValue === "") {

        nameError.textContent = "❌ Full name is required";
        nameError.style.color = "red";
        valid = false;

    } else if (nameValue.length < 3) {

        nameError.textContent = "❌ Name must contain at least 3 characters";
        nameError.style.color = "red";
        valid = false;

    } else {

        nameError.textContent = "✓ Valid name";
        nameError.style.color = "green";
    }


    // ===============================
    // EMAIL
    // ===============================

    const emailValue = email.value.trim();

    const emailPattern =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (emailValue === "") {

        emailError.textContent = "❌ Email is required";
        emailError.style.color = "red";
        valid = false;

    } else if (!emailPattern.test(emailValue)) {

        emailError.textContent = "❌ Enter a valid email address";
        emailError.style.color = "red";
        valid = false;

    } else {

        emailError.textContent = "✓ Valid email";
        emailError.style.color = "green";
    }


    // ===============================
    // PHONE NUMBER
    // ===============================

    const phoneValue = phone.value.trim();

    const phonePattern = /^[6-9][0-9]{9}$/;

    if (phoneValue === "") {

        phoneError.textContent = "❌ Phone number is required";
        phoneError.style.color = "red";
        valid = false;

    } else if (!phonePattern.test(phoneValue)) {

        phoneError.textContent =
            "❌ Enter a valid 10-digit Indian phone number";

        phoneError.style.color = "red";
        valid = false;

    } else {

        phoneError.textContent = "✓ Valid phone number";
        phoneError.style.color = "green";
    }


    // ===============================
    // PASSWORD
    // ===============================

    const passwordValue = password.value;

    if (passwordValue === "") {

        passwordError.textContent = "❌ Password is required";
        passwordError.style.color = "red";
        valid = false;

    } else if (passwordValue.length < 8) {

        passwordError.textContent =
            "❌ Password must be at least 8 characters";

        passwordError.style.color = "red";
        valid = false;

    } else if (!/[A-Z]/.test(passwordValue)) {

        passwordError.textContent =
            "❌ Password must contain an uppercase letter";

        passwordError.style.color = "red";
        valid = false;

    } else if (!/[a-z]/.test(passwordValue)) {

        passwordError.textContent =
            "❌ Password must contain a lowercase letter";

        passwordError.style.color = "red";
        valid = false;

    } else if (!/[0-9]/.test(passwordValue)) {

        passwordError.textContent =
            "❌ Password must contain a number";

        passwordError.style.color = "red";
        valid = false;

    } else if (!/[!@#$%^&*]/.test(passwordValue)) {

        passwordError.textContent =
            "❌ Password must contain a special character";

        passwordError.style.color = "red";
        valid = false;

    } else {

        passwordError.textContent = "✓ Strong password";
        passwordError.style.color = "green";
    }


    // ===============================
    // CONFIRM PASSWORD
    // ===============================

    const confirmPasswordValue = confirmPassword.value;

    if (confirmPasswordValue === "") {

        confirmPasswordError.textContent =
            "❌ Please confirm your password";

        confirmPasswordError.style.color = "red";
        valid = false;

    } else if (confirmPasswordValue !== passwordValue) {

        confirmPasswordError.textContent =
            "❌ Passwords do not match";

        confirmPasswordError.style.color = "red";
        valid = false;

    } else {

        confirmPasswordError.textContent =
            "✓ Passwords match";

        confirmPasswordError.style.color = "green";
    }


    // ===============================
    // TERMS & CONDITIONS
    // ===============================

    if (!terms.checked) {

        termsError.textContent =
            "❌ Please accept Terms & Conditions";

        termsError.style.color = "red";
        valid = false;

    } else {

        termsError.textContent = "✓ Accepted";
        termsError.style.color = "green";
    }


    // ===============================
    // FINAL RESULT
    // ===============================

    if (valid) {

        message.textContent =
            "✅ Account created successfully!";

        message.style.color = "green";

        // পরে এখানে backend/database connection করবে

    } else {

        message.textContent =
            "❌ Please fix the errors above.";

        message.style.color = "red";
    }

});