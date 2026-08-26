// =========================
// GET HTML ELEMENTS
// =========================

const loginForm = document.getElementById("loginForm");

const loginInput = document.getElementById("email");
const password = document.getElementById("password");

const loginError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");

const message = document.getElementById("message");


// =========================
// SHOW / HIDE PASSWORD
// =========================

const showPassword =
    document.getElementById("showPassword");

showPassword.addEventListener("click", function () {

    if (password.type === "password") {

        password.type = "text";
        this.textContent = "Hide";

    } else {

        password.type = "password";
        this.textContent = "Show";

    }

});


// =========================
// LOGIN
// =========================

loginForm.addEventListener("submit", function (e) {

    e.preventDefault();


    // Clear previous messages
    loginError.textContent = "";
    passwordError.textContent = "";
    message.textContent = "";


    // Get login input
    const loginEmail =
        loginInput.value.trim().toLowerCase();

    const loginPassword =
        password.value;


    // =========================
    // EMPTY EMAIL
    // =========================

    if (loginEmail === "") {

        loginError.textContent =
            "❌ Email is required";

        loginError.style.color = "red";

        return;
    }


    // =========================
    // EMPTY PASSWORD
    // =========================

    if (loginPassword === "") {

        passwordError.textContent =
            "❌ Password is required";

        passwordError.style.color = "red";

        return;
    }


    // =========================
    // GET CREATED ACCOUNT
    // =========================

    const savedUser =
        JSON.parse(
            localStorage.getItem("gramNitiUser")
        );


    // =========================
    // ACCOUNT NOT FOUND
    // =========================

    if (!savedUser) {

        loginError.textContent =
            "❌ Invalid email or password";

        loginError.style.color = "red";

        passwordError.textContent =
            "❌ Invalid email or password";

        passwordError.style.color = "red";

        message.textContent =
            "❌ Invalid email or password";

        message.style.color = "red";

        return;
    }


    // =========================
    // MATCH EMAIL
    // =========================

    const emailMatch =
        loginEmail === savedUser.email;


    // =========================
    // MATCH PASSWORD
    // =========================

    const passwordMatch =
        loginPassword === savedUser.password;


    // =========================
    // SUCCESS
    // =========================

    if (emailMatch && passwordMatch) {

        loginError.textContent =
            "✓ Email matched";

        loginError.style.color = "green";


        passwordError.textContent =
            "✓ Password matched";

        passwordError.style.color = "green";


        message.textContent =
            "✅ Login successful!";

        message.style.color = "green";


        // যদি dashboard থাকে তাহলে এখানে যাবে
        // setTimeout(function () {
        //     window.location.href = "dashboard.html";
        // }, 1000);

    }


    // =========================
    // INVALID
    // =========================

    else {

        loginError.textContent =
            "❌ Invalid email or password";

        loginError.style.color = "red";


        passwordError.textContent =
            "❌ Invalid email or password";

        passwordError.style.color = "red";


        message.textContent =
            "❌ Invalid email or password";

        message.style.color = "red";

    }

});