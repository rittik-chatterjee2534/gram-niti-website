/* Login check */

// const loggedInUser = localStorage.getItem("user");

// if (!loggedInUser) {
//   window.location.href = "../Login/login.html";
// }


/* Navbar */

const profileBtn = document.getElementById("profile-btn");
const profileDropdown = document.getElementById("profile-dropdown");

const notificationBtn = document.getElementById("notification-btn");
const notificationDropdown = document.getElementById(
  "notification-dropdown",
);

const markAllReadBtn = document.getElementById("mark-all-read");
const notificationBadge = document.querySelector(
  ".notification-badge",
);

const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const sidebar = document.getElementById("sidebar");


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


/* Mark notifications as read */

if (markAllReadBtn) {
  markAllReadBtn.addEventListener("click", () => {
    const unreadNotifications = document.querySelectorAll(
      ".notification-item.unread",
    );

    unreadNotifications.forEach((notification) => {
      notification.classList.remove("unread");

      const dot = notification.querySelector(
        ".notification-dot",
      );

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


/* Close mobile menu after clicking a sidebar link */

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


/* Close open menus when clicking outside */

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


/* Dashboard data */

const dashboardData = {
  week: {
    feasibility: 72,
    status: "Moderate Opportunity",
    projectCost: "₹ 8,50,000",
    loanAmount: "₹ 7,50,000",
    emi: "₹ 12,450",

    chart: [75, 68, 76, 62, 65, 80],
  },

  month: {
    feasibility: 78,
    status: "Good Opportunity",
    projectCost: "₹ 10,00,000",
    loanAmount: "₹ 9,00,000",
    emi: "₹ 14,732",

    chart: [85, 72, 82, 65, 70, 88],
  },

  year: {
    feasibility: 84,
    status: "Strong Opportunity",
    projectCost: "₹ 12,00,000",
    loanAmount: "₹ 10,50,000",
    emi: "₹ 16,200",

    chart: [90, 78, 88, 72, 75, 92],
  },
};


/* Dashboard elements */

const periodSelect = document.getElementById("period-select");

const feasibilityScore = document.getElementById(
  "feasibility-score",
);

const feasibilityStatus = document.getElementById(
  "feasibility-status",
);

const projectCost = document.getElementById("project-cost");

const loanAmount = document.getElementById("loan-amount");

const monthlyEmi = document.getElementById("monthly-emi");


/* Feasibility chart */

const chartElement = document.getElementById(
  "feasibilityChart",
);

let feasibilityChart = null;

if (chartElement && typeof Chart !== "undefined") {
  feasibilityChart = new Chart(chartElement, {
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

          data: dashboardData.month.chart,

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
            label(context) {
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
              family: "Inter",

              size: 12,

              weight: "500",
            },
          },
        },
      },
    },
  });
}


/* Change dashboard period */

function updateDashboard(period) {
  const data = dashboardData[period];

  if (!data) {
    return;
  }

  if (feasibilityScore) {
    feasibilityScore.textContent = data.feasibility;
  }

  if (feasibilityStatus) {
    feasibilityStatus.textContent = data.status;
  }

  if (projectCost) {
    projectCost.textContent = data.projectCost;
  }

  if (loanAmount) {
    loanAmount.textContent = data.loanAmount;
  }

  if (monthlyEmi) {
    monthlyEmi.textContent = data.emi;
  }

  if (feasibilityChart) {
    feasibilityChart.data.datasets[0].data = data.chart;

    feasibilityChart.update();
  }
}


if (periodSelect) {
  periodSelect.addEventListener("change", () => {
    updateDashboard(periodSelect.value);
  });
}


/* Logout */

const logoutBtn = document.getElementById("logout-btn");

const sidebarLogout = document.getElementById(
  "sidebar-logout",
);


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
  sidebarLogout.addEventListener(
    "click",
    logoutUser,
  );
}


/* Lucide icons */

if (typeof lucide !== "undefined") {
  lucide.createIcons();
}