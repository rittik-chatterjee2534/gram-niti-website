const loginForm = document.getElementById("loginForm");

const loginInput = document.getElementById("email");
const loginError = document.getElementById("emailError");

const passwordInput = document.getElementById("password");
const passwordError = document.getElementById("passwordError");

const showPassword = document.getElementById("showPassword");
const remember = document.getElementById("remember");

const message = document.getElementById("message");


/* Show / hide password */

showPassword.addEventListener("click", () => {
  const passwordVisible = passwordInput.type === "text";

  passwordInput.type = passwordVisible ? "password" : "text";
  showPassword.textContent = passwordVisible ? "Show" : "Hide";
});


/* Validation helpers */

function isEmail(value) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return pattern.test(value);
}

function isPhone(value) {
  const pattern = /^[6-9]\d{9}$/;

  return pattern.test(value);
}


/* Login */

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const loginValue = loginInput.value.trim();
  const password = passwordInput.value.trim();

  loginError.textContent = "";
  passwordError.textContent = "";
  message.textContent = "";


  // Email / phone validation

  if (!loginValue) {
    loginError.textContent =
      "Please enter your email or phone number.";

    return;
  }

  if (!isEmail(loginValue) && !isPhone(loginValue)) {
    loginError.textContent =
      "Please enter a valid email or 10-digit phone number.";

    return;
  }


  // Password validation

  if (!password) {
    passwordError.textContent =
      "Please enter your password.";

    return;
  }

  if (password.length < 6) {
    passwordError.textContent =
      "Password must be at least 6 characters.";

    return;
  }


  // Remember login value

  if (remember.checked) {
    localStorage.setItem("rememberLogin", loginValue);
  } else {
    localStorage.removeItem("rememberLogin");
  }


  // Temporary frontend login state
  // Replace this later with data returned by your backend.

  const loggedInUser = {
    login: loginValue,
    role: "entrepreneur",
  };

  localStorage.setItem(
    "user",
    JSON.stringify(loggedInUser),
  );


  /*
    Later this part should happen only after
    the backend confirms the email/phone and password.

    Example:

    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        login: loginValue,
        password: password
      })
    });
  */


  message.textContent = "Login successful.";
  message.style.color = "green";


  // Decide where the user should go next

  const profileCompleted = localStorage.getItem(
    "gramnitiProfileCompleted",
  );

  setTimeout(() => {
    if (profileCompleted === "true") {
      window.location.href =
        "../Dashboard/dashboard.html";
    } else {
      window.location.href =
        "../Onboarding/onboarding.html";
    }
  }, 500);
});


/* Restore remembered email / phone */

const savedLogin = localStorage.getItem("rememberLogin");

if (savedLogin) {
  loginInput.value = savedLogin;
  remember.checked = true;
}