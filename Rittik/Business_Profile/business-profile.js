const profileBtn = document.getElementById("profile-btn");
const profileDropdown = document.getElementById("profile-dropdown");

const notificationBtn = document.getElementById("notification-btn");
const notificationDropdown = document.getElementById(
  "notification-dropdown",
);

const markAllReadBtn = document.getElementById("mark-all-read");
const notificationBadge = document.querySelector(".notification-badge");

const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const sidebar = document.getElementById("sidebar");

const businessForm = document.getElementById("business-profile-form");

const description = document.getElementById("business-description");
const descriptionCount = document.getElementById("description-count");

const progressPercentage = document.getElementById(
  "progress-percentage",
);

const progressFill = document.getElementById("progress-fill");

const saveDraftBtn = document.getElementById("save-draft-btn");

const logoutBtn = document.getElementById("logout-btn");
const sidebarLogout = document.getElementById("sidebar-logout");


/* Profile menu */

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


/* Notifications */

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


/* Close menus when clicking outside */

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


/* Business description character count */

if (description && descriptionCount) {
  description.addEventListener("input", () => {
    const length = description.value.length;

    descriptionCount.textContent = `${length} / 500`;
  });
}


/* Profile completion */

const fieldsToTrack = [
  "business-name",
  "business-type",
  "business-sector",
  "business-stage",
  "business-description",
  "state",
  "district",
  "village",
  "pin-code",
  "investment",
  "own-contribution",
  "loan-required",
  "employees",
  "experience",
  "education",
  "skills",
  "monthly-revenue",
  "target-market",
  "business-goal",
];

function updateProgress() {
  let completedFields = 0;

  fieldsToTrack.forEach((fieldId) => {
    const field = document.getElementById(fieldId);

    if (field && field.value.trim() !== "") {
      completedFields++;
    }
  });

  const percentage = Math.round(
    (completedFields / fieldsToTrack.length) * 100,
  );

  if (progressPercentage) {
    progressPercentage.textContent = `${percentage}%`;
  }

  if (progressFill) {
    progressFill.style.width = `${percentage}%`;
  }
}


/* Listen for field changes */

fieldsToTrack.forEach((fieldId) => {
  const field = document.getElementById(fieldId);

  if (field) {
    field.addEventListener("input", updateProgress);
    field.addEventListener("change", updateProgress);
  }
});


/* Save draft */

if (saveDraftBtn && businessForm) {
  saveDraftBtn.addEventListener("click", () => {
    const formData = new FormData(businessForm);

    const businessData = {};

    formData.forEach((value, key) => {
      businessData[key] = value;
    });

    localStorage.setItem(
      "gramnitiBusinessProfileDraft",
      JSON.stringify(businessData),
    );

    alert("Draft saved successfully.");
  });
}


/* Restore saved draft */

function loadSavedDraft() {
  const savedDraft = localStorage.getItem(
    "gramnitiBusinessProfileDraft",
  );

  if (!savedDraft || !businessForm) {
    return;
  }

  const businessData = JSON.parse(savedDraft);

  Object.keys(businessData).forEach((key) => {
    const field = businessForm.elements[key];

    if (field) {
      field.value = businessData[key];
    }
  });

  if (description && descriptionCount) {
    descriptionCount.textContent =
      `${description.value.length} / 500`;
  }

  updateProgress();
}

loadSavedDraft();


/* Save and continue */

if (businessForm) {
  businessForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!businessForm.checkValidity()) {
      businessForm.reportValidity();
      return;
    }

    const formData = new FormData(businessForm);

    const businessData = {};

    formData.forEach((value, key) => {
      businessData[key] = value;
    });

    localStorage.setItem(
      "gramnitiBusinessProfile",
      JSON.stringify(businessData),
    );

    localStorage.removeItem(
      "gramnitiBusinessProfileDraft",
    );

    alert("Business profile saved successfully.");

    // Later replace this with the real Market Analysis page
    // window.location.href = "../Market_Analysis/market-analysis.html";
  });
}


/* Logout */

function logoutUser() {
  localStorage.removeItem("user");
  localStorage.removeItem("token");

  sessionStorage.clear();

  // Update this path when your login page is created
  // window.location.href = "../Login/login.html";
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