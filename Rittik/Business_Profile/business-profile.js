/* Login check */

// const loggedInUser = localStorage.getItem("user");

// if (!loggedInUser) {
//   window.location.href = "../Login/login.html";
// }

/* Navbar */

const profileBtn = document.getElementById("profile-btn");
const profileDropdown = document.getElementById("profile-dropdown");

const notificationBtn = document.getElementById("notification-btn");
const notificationDropdown = document.getElementById("notification-dropdown");

const markAllReadBtn = document.getElementById("mark-all-read");
const notificationBadge = document.querySelector(".notification-badge");

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

/* Mark all notifications as read */

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

/* Form */

const businessForm = document.getElementById("business-profile-form");

const saveDraftBtn = document.getElementById("save-draft-btn");

const businessDescription = document.getElementById("business-description");

const descriptionCount = document.getElementById("description-count");

const progressPercentage = document.getElementById("progress-percentage");

const progressFill = document.getElementById("progress-fill");

/* Character counter */

function updateDescriptionCount() {
  if (!businessDescription || !descriptionCount) {
    return;
  }

  const currentLength = businessDescription.value.length;

  descriptionCount.textContent = `${currentLength} / 500`;
}

if (businessDescription) {
  businessDescription.addEventListener("input", updateDescriptionCount);
}

/* Fields used for profile completion */

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

/* Update profile completion */

function updateProgress() {
  let completed = 0;
  let availableFields = 0;

  fieldsToTrack.forEach((fieldId) => {
    const field = document.getElementById(fieldId);

    if (!field) {
      return;
    }

    availableFields++;

    if (field.value.trim() !== "") {
      completed++;
    }
  });

  let percentage = 0;

  if (availableFields > 0) {
    percentage = Math.round((completed / availableFields) * 100);
  }

  if (progressPercentage) {
    progressPercentage.textContent = `${percentage}%`;
  }

  if (progressFill) {
    progressFill.style.width = `${percentage}%`;
  }
}

/* Watch form fields */

fieldsToTrack.forEach((fieldId) => {
  const field = document.getElementById(fieldId);

  if (!field) {
    return;
  }

  field.addEventListener("input", updateProgress);
  field.addEventListener("change", updateProgress);
});

/* Convert form to normal object */

function getBusinessFormData() {
  if (!businessForm) {
    return {};
  }

  const formData = new FormData(businessForm);
  const businessData = {};

  formData.forEach((value, key) => {
    businessData[key] = value;
  });

  return businessData;
}

/* Save draft */

if (saveDraftBtn && businessForm) {
  saveDraftBtn.addEventListener("click", () => {
    const businessData = getBusinessFormData();

    localStorage.setItem(
      "gramnitiBusinessProfileDraft",
      JSON.stringify(businessData),
    );

    alert("Draft saved successfully.");
  });
}

/* Restore draft */

function loadSavedDraft() {
  if (!businessForm) {
    return;
  }

  const savedDraft = localStorage.getItem("gramnitiBusinessProfileDraft");

  if (!savedDraft) {
    return;
  }

  try {
    const businessData = JSON.parse(savedDraft);

    Object.keys(businessData).forEach((fieldName) => {
      const field = businessForm.elements[fieldName];

      if (field) {
        field.value = businessData[fieldName];
      }
    });

    updateDescriptionCount();
    updateProgress();
  } catch (error) {
    console.error("Could not load saved draft:", error);
  }
}

/* Load already completed profile */

function loadSavedProfile() {
  if (!businessForm) {
    return false;
  }

  const savedProfile = localStorage.getItem("gramnitiBusinessProfile");

  if (!savedProfile) {
    return false;
  }

  try {
    const businessData = JSON.parse(savedProfile);

    Object.keys(businessData).forEach((fieldName) => {
      const field = businessForm.elements[fieldName];

      if (field) {
        field.value = businessData[fieldName];
      }
    });

    updateDescriptionCount();
    updateProgress();

    return true;
  } catch (error) {
    console.error("Could not load business profile:", error);

    return false;
  }
}

/*
  If a completed profile exists, show that.
  Otherwise restore an unfinished draft.
*/

const profileLoaded = loadSavedProfile();

if (!profileLoaded) {
  loadSavedDraft();
}

updateDescriptionCount();
updateProgress();

/* Save and continue */

if (businessForm) {
  businessForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!businessForm.checkValidity()) {
      businessForm.reportValidity();

      return;
    }

    const businessData = getBusinessFormData();

    localStorage.setItem(
      "gramnitiBusinessProfile",
      JSON.stringify(businessData),
    );

    localStorage.setItem("gramnitiProfileCompleted", "true");

    localStorage.removeItem("gramnitiBusinessProfileDraft");

    window.location.href = "../Dashboard/dashboard.html";
  });
}

/* Logout */

const logoutBtn = document.getElementById("logout-btn");

const sidebarLogout = document.getElementById("sidebar-logout");

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

/* Lucide icons */

if (typeof lucide !== "undefined") {
  lucide.createIcons();
}
