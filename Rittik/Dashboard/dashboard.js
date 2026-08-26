const profileBtn = document.getElementById("profile-btn");
const profileDropdown = document.getElementById("profile-dropdown");

const notificationBtn = document.getElementById("notification-btn");
const notificationDropdown = document.getElementById("notification-dropdown");

const markAllReadBtn = document.getElementById("mark-all-read");
const notificationBadge = document.querySelector(".notification-badge");

/* ===============================
   PROFILE DROPDOWN
================================ */

profileBtn.addEventListener("click", (event) => {
  event.stopPropagation();

  profileDropdown.classList.toggle("active");

  notificationDropdown.classList.remove("active");
});

/* ===============================
   NOTIFICATION DROPDOWN
================================ */

notificationBtn.addEventListener("click", (event) => {
  event.stopPropagation();

  notificationDropdown.classList.toggle("active");

  profileDropdown.classList.remove("active");
});

/* ===============================
   MARK ALL AS READ
================================ */

markAllReadBtn.addEventListener("click", () => {
  const unreadNotifications = document.querySelectorAll(
    ".notification-item.unread",
  );

  unreadNotifications.forEach((notification) => {
    notification.classList.remove("unread");

    const dot = notification.querySelector(".notification-dot");

    if (dot) {
      dot.style.display = "none";
    }
  });

  notificationBadge.style.display = "none";
});

/* ===============================
   CLICK OUTSIDE
================================ */

document.addEventListener("click", (event) => {
  if (
    !profileBtn.contains(event.target) &&
    !profileDropdown.contains(event.target)
  ) {
    profileDropdown.classList.remove("active");
  }

  if (
    !notificationBtn.contains(event.target) &&
    !notificationDropdown.contains(event.target)
  ) {
    notificationDropdown.classList.remove("active");
  }
});

const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const sidebar = document.getElementById("sidebar");

mobileMenuBtn.addEventListener("click", (event) => {
  event.stopPropagation();

  sidebar.classList.toggle("active");
});

document.addEventListener("click", (event) => {
  if (
    window.innerWidth <= 768 &&
    !sidebar.contains(event.target) &&
    !mobileMenuBtn.contains(event.target)
  ) {
    sidebar.classList.remove("active");
  }
});

if (typeof lucide !== "undefined") {
  lucide.createIcons();
}

const chartElement = document.getElementById("feasibilityChart");

if (chartElement && typeof Chart !== "undefined") {
  new Chart(chartElement, {
    type: "radar",

    data: {
      labels: [
        "Market Demand",
        "Investment",
        "Profitability",
        "Competition",
        "Risk",
        "Govt. Support",
      ],

      datasets: [
        {
          label: "Business Score",
          data: [85, 72, 82, 65, 70, 88],

          borderColor: "#2e7d32",
          backgroundColor: "rgba(46, 125, 50, 0.15)",

          pointBackgroundColor: "#2e7d32",
          pointBorderColor: "#ffffff",

          pointRadius: 4,
          pointHoverRadius: 6,

          borderWidth: 2,
        },
      ],
    },

    options: {
      responsive: true,
      maintainAspectRatio: false,

      plugins: {
        legend: {
          display: false,
        },

        tooltip: {
          callbacks: {
            label: function (context) {
              return `${context.label}: ${context.raw}/100`;
            },
          },
        },
      },

      scales: {
        r: {
          min: 0,
          max: 100,

          beginAtZero: true,

          ticks: {
            stepSize: 20,
            backdropColor: "transparent",
            color: "#6b7280",
          },

          grid: {
            color: "#e5e7eb",
          },

          angleLines: {
            color: "#e5e7eb",
          },

          pointLabels: {
            color: "#4b5563",

            font: {
              size: 12,
              family: "Inter",
              weight: "500",
            },
          },
        },
      },
    },
  });
}

const dashboardData = {
  week: {
    feasibility: 72,
    projectCost: "₹ 8,50,000",
    loanAmount: "₹ 7,50,000",
    emi: "₹ 12,450",
    chart: [75, 68, 76, 62, 65, 80],
  },

  month: {
    feasibility: 78,
    projectCost: "₹ 10,00,000",
    loanAmount: "₹ 9,00,000",
    emi: "₹ 14,732",
    chart: [85, 72, 82, 65, 70, 88],
  },

  year: {
    feasibility: 84,
    projectCost: "₹ 12,00,000",
    loanAmount: "₹ 10,50,000",
    emi: "₹ 16,200",
    chart: [90, 78, 88, 72, 75, 92],
  },
};

//Logout Section

const logoutBtn = document.getElementById("logout-btn");
const sidebarLogout = document.getElementById("sidebar-logout");

function logoutUser() {
  // Remove login/session data
  localStorage.removeItem("user");
  localStorage.removeItem("token");

  sessionStorage.clear();

  // Redirect to login page
  window.location.href = "login.html";
}

if (logoutBtn) {
  logoutBtn.addEventListener("click", logoutUser);
}

if (sidebarLogout) {
  sidebarLogout.addEventListener("click", logoutUser);
}
