/* ===============================
   INITIALIZE LUCIDE ICONS
================================ */

if (typeof lucide !== "undefined") {
  lucide.createIcons();
}


/* ===============================
   GET STARTED
================================ */

const getStartedBtn = document.getElementById("get-started-btn");

if (getStartedBtn) {
  getStartedBtn.addEventListener("click", () => {
    // Remember that the user has started onboarding
    localStorage.setItem(
      "gramnitiOnboardingStarted",
      "true"
    );
  });
}


/* ===============================
   LOGOUT
================================ */

const logoutBtn = document.getElementById("logout-btn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {

    // Remove authentication-related information
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    // Clear temporary session data
    sessionStorage.clear();

    // Send user back to login page
    window.location.href = "../Login/login.html";
  });
}