/* =========================================
   Get HTML Elements
========================================= */

const loginForm = document.getElementById("loginForm");

const loginInput = document.getElementById("email");
const loginError = document.getElementById("emailError");

const passwordInput = document.getElementById("password");
const passwordError = document.getElementById("passwordError");

const showPassword = document.getElementById("showPassword");

const remember = document.getElementById("remember");

const message = document.getElementById("message");


/* =========================================
   Show / Hide Password
========================================= */

showPassword.addEventListener("click", function () {

    if (passwordInput.type === "password") {

        passwordInput.type = "text";

        showPassword.textContent = "Hide";

    } else {

        passwordInput.type = "password";

        showPassword.textContent = "Show";

    }

});


/* =========================================
   Detect Email or Phone
========================================= */

function isEmail(value) {

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(value);

}


function isPhone(value) {

    const phonePattern =
        /^[6-9]\d{9}$/;

    return phonePattern.test(value);

}


/* =========================================
   Login Form Submit
========================================= */

loginForm.addEventListener("submit", function (event) {

    // Prevent page reload
    event.preventDefault();


    /* Get Values */

    const loginValue =
        loginInput.value.trim();

    const password =
        passwordInput.value.trim();


    /* Clear Previous Errors */

    loginError.textContent = "";

    passwordError.textContent = "";

    message.textContent = "";


    /* =====================================
       Validate Email / Phone
    ===================================== */

    if (loginValue === "") {

        loginError.textContent =
            "Please enter your email or phone number.";

        return;

    }


    if (!isEmail(loginValue) && !isPhone(loginValue)) {

        loginError.textContent =
            "Please enter a valid email or 10-digit phone number.";

        return;

    }


    /* =====================================
       Validate Password
    ===================================== */

    if (password === "") {

        passwordError.textContent =
            "Please enter your password.";

        return;

    }


    if (password.length < 6) {

        passwordError.textContent =
            "Password must be at least 6 characters.";

        return;

    }


    /* =====================================
       Remember Me
    ===================================== */

    if (remember.checked) {

        localStorage.setItem(
            "rememberLogin",
            loginValue
        );

    } else {

        localStorage.removeItem(
            "rememberLogin"
        );

    }


    /* =====================================
       Login Data
    ===================================== */

    const loginData = {

        login: loginValue,

        password: password,

        remember: remember.checked

    };


    console.log("Login Data:", loginData);


    /* =====================================
       Success Message
    ===================================== */

    message.textContent =
        "Login information is valid!";

    message.style.color = "green";


    /*
       এখানে পরে Backend API call করবে।
       
       Example:

       fetch("/api/login", {
           method: "POST",
           headers: {
               "Content-Type": "application/json"
           },
           body: JSON.stringify(loginData)
       })
    */


});


/* =========================================
   Load Remembered Login
========================================= */

const savedLogin =
    localStorage.getItem("rememberLogin");


if (savedLogin) {

    loginInput.value = savedLogin;

    remember.checked = true;

}