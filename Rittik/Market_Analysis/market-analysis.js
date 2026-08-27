/* Login check */

// const loggedInUser = localStorage.getItem("user");

// if (!loggedInUser) {
//   window.location.href = "../Login/login.html";
// }


/* Navbar elements */

const profileBtn = document.getElementById("profile-btn");
const profileDropdown = document.getElementById("profile-dropdown");

const notificationBtn = document.getElementById("notification-btn");
const notificationDropdown = document.getElementById(
  "notification-dropdown"
);

const markAllReadBtn = document.getElementById("mark-all-read");
const notificationBadge = document.querySelector(
  ".notification-badge"
);

const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const sidebar = document.getElementById("sidebar");

const logoutBtn = document.getElementById("logout-btn");
const sidebarLogout = document.getElementById("sidebar-logout");

const reanalyzeBtn = document.getElementById("reanalyze-btn");


/* Profile dropdown */

if (profileBtn && profileDropdown) {
  profileBtn.addEventListener("click", (event) => {
    event.stopPropagation();

    profileDropdown.classList.toggle("active");

    if (notificationDropdown) {
      notificationDropdown.classList.remove("active");
    }

    if (sidebar && window.innerWidth <= 768) {
      sidebar.classList.remove("active");
    }
  });
}


/* Notification dropdown */

if (notificationBtn && notificationDropdown) {
  notificationBtn.addEventListener("click", (event) => {
    event.stopPropagation();

    notificationDropdown.classList.toggle("active");

    if (profileDropdown) {
      profileDropdown.classList.remove("active");
    }

    if (sidebar && window.innerWidth <= 768) {
      sidebar.classList.remove("active");
    }
  });
}


/* Mark all notifications as read */

if (markAllReadBtn) {
  markAllReadBtn.addEventListener("click", () => {
    const unreadNotifications = document.querySelectorAll(
      ".notification-item.unread"
    );

    unreadNotifications.forEach((notification) => {
      notification.classList.remove("unread");

      const dot = notification.querySelector(".notification-dot");

      if (dot) {
        dot.style.display = "none";
      }
    });

    if (notificationBadge) {
      notificationBadge.style.display = "none";
    }
  });
}


/* Mobile sidebar */

if (mobileMenuBtn && sidebar) {
  mobileMenuBtn.addEventListener("click", (event) => {
    event.stopPropagation();

    sidebar.classList.toggle("active");

    if (profileDropdown) {
      profileDropdown.classList.remove("active");
    }

    if (notificationDropdown) {
      notificationDropdown.classList.remove("active");
    }
  });
}


/* Close mobile sidebar after clicking a link */

if (sidebar) {
  const sidebarLinks = sidebar.querySelectorAll(".sidebar-link");

  sidebarLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        sidebar.classList.remove("active");
      }
    });
  });
}


/* Close dropdowns when clicking outside */

document.addEventListener("click", (event) => {
  if (
    profileBtn &&
    profileDropdown &&
    !profileBtn.contains(event.target) &&
    !profileDropdown.contains(event.target)
  ) {
    profileDropdown.classList.remove("active");
  }

  if (
    notificationBtn &&
    notificationDropdown &&
    !notificationBtn.contains(event.target) &&
    !notificationDropdown.contains(event.target)
  ) {
    notificationDropdown.classList.remove("active");
  }

  if (
    sidebar &&
    mobileMenuBtn &&
    window.innerWidth <= 768 &&
    !sidebar.contains(event.target) &&
    !mobileMenuBtn.contains(event.target)
  ) {
    sidebar.classList.remove("active");
  }
});


/* Market analysis elements */

const demandScore = document.getElementById("demand-score");
const competitionScore = document.getElementById(
  "competition-score"
);
const growthScore = document.getElementById("growth-score");
const marketScore = document.getElementById("market-score");

const analysisStatus = document.querySelector(".analysis-status");

const demandScoreText = document.querySelector(
  ".score-row strong"
);

const progressFill = document.querySelector(
  ".analysis-card .progress-fill"
);


/* Sample analysis data */

const marketAnalysisData = [
  {
    demand: 86,
    competition: 58,
    growth: 82,
    market: 81,
  },

  {
    demand: 89,
    competition: 55,
    growth: 85,
    market: 84,
  },

  {
    demand: 83,
    competition: 61,
    growth: 80,
    market: 79,
  },
];


/* Update market analysis */

function updateMarketData(data) {
  if (demandScore) {
    demandScore.textContent = data.demand;
  }

  if (competitionScore) {
    competitionScore.textContent = data.competition;
  }

  if (growthScore) {
    growthScore.textContent = data.growth;
  }

  if (marketScore) {
    marketScore.textContent = data.market;
  }

  if (demandScoreText) {
    demandScoreText.textContent = `${data.demand}/100`;
  }

  if (progressFill) {
    progressFill.style.width = `${data.demand}%`;
  }
}


/* Re-analyze button */

if (reanalyzeBtn) {
  reanalyzeBtn.addEventListener("click", () => {
    reanalyzeBtn.disabled = true;

    reanalyzeBtn.innerHTML = `
      <i data-lucide="loader-circle"></i>
      Analyzing...
    `;

    if (analysisStatus) {
      analysisStatus.textContent = "Analyzing";
    }

    if (typeof lucide !== "undefined") {
      lucide.createIcons();
    }


    setTimeout(() => {
      const randomIndex = Math.floor(
        Math.random() * marketAnalysisData.length
      );

      const newData = marketAnalysisData[randomIndex];

      updateMarketData(newData);

      if (analysisStatus) {
        analysisStatus.textContent = "Analysis Complete";
      }

      reanalyzeBtn.disabled = false;

      reanalyzeBtn.innerHTML = `
        <i data-lucide="refresh-cw"></i>
        Re-analyze Market
      `;

      if (typeof lucide !== "undefined") {
        lucide.createIcons();
      }
    }, 1500);
  });
}


/* Logout */

function logoutUser() {
  localStorage.removeItem("user");
  localStorage.removeItem("token");

  sessionStorage.clear();

  window.location.href = "../Login/login.html";
}


if (logoutBtn) {
  logoutBtn.addEventListener("click", logoutUser);
}

if (sidebarLogout) {
  sidebarLogout.addEventListener("click", logoutUser);
}


/* Load Lucide icons */

if (typeof lucide !== "undefined") {
  lucide.createIcons();
}