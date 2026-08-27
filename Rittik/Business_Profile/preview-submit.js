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


/* navbar dropdowns */

if (profileBtn) {
  profileBtn.addEventListener("click", function (event) {
    event.stopPropagation();

    profileDropdown.classList.toggle("active");
    notificationDropdown.classList.remove("active");
  });
}

if (notificationBtn) {
  notificationBtn.addEventListener("click", function (event) {
    event.stopPropagation();

    notificationDropdown.classList.toggle("active");
    profileDropdown.classList.remove("active");
  });
}


document.addEventListener("click", function (event) {
  if (
    profileDropdown &&
    !profileBtn.contains(event.target) &&
    !profileDropdown.contains(event.target)
  ) {
    profileDropdown.classList.remove("active");
  }

  if (
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


/* notifications */

if (markAllReadBtn) {
  markAllReadBtn.addEventListener("click", function () {
    const unreadItems = document.querySelectorAll(
      ".notification-item.unread",
    );

    unreadItems.forEach(function (item) {
      item.classList.remove("unread");

      const dot = item.querySelector(".notification-dot");

      if (dot) {
        dot.style.display = "none";
      }
    });

    if (notificationBadge) {
      notificationBadge.style.display = "none";
    }
  });
}


/* mobile sidebar */

if (mobileMenuBtn && sidebar) {
  mobileMenuBtn.addEventListener("click", function (event) {
    event.stopPropagation();

    sidebar.classList.toggle("active");

    profileDropdown.classList.remove("active");
    notificationDropdown.classList.remove("active");
  });
}


/* display helpers */

function showValue(id, value) {
  const element = document.getElementById(id);

  if (!element) {
    return;
  }

  if (value === undefined || value === null || value === "") {
    element.textContent = "Not provided";
    return;
  }

  element.textContent = value;
}


function formatMoney(value) {
  if (value === undefined || value === null || value === "") {
    return "Not provided";
  }

  const amount = Number(value);

  if (Number.isNaN(amount)) {
    return value;
  }

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}


function formatOption(value, options) {
  if (!value) {
    return "Not provided";
  }

  return options[value] || value;
}


/* readable select values */

const businessTypes = {
  manufacturing: "Manufacturing",
  service: "Service",
  trading: "Trading",
  agriculture: "Agriculture / Allied",
  other: "Other",
};

const sectors = {
  agriculture: "Agriculture",
  "food-processing": "Food Processing",
  textile: "Textile & Handicraft",
  retail: "Retail",
  services: "Services",
  technology: "Technology",
  other: "Other",
};

const businessStages = {
  idea: "Idea Stage",
  planning: "Planning",
  startup: "Recently Started",
  existing: "Existing Business",
  expansion: "Expansion",
};

const states = {
  "west-bengal": "West Bengal",
  odisha: "Odisha",
  bihar: "Bihar",
  jharkhand: "Jharkhand",
  assam: "Assam",
};

const experienceLevels = {
  none: "No previous experience",
  "less-than-1": "Less than 1 year",
  "1-3": "1 - 3 years",
  "3-5": "3 - 5 years",
  "5-plus": "More than 5 years",
};

const educationLevels = {
  school: "School Education",
  "higher-secondary": "Higher Secondary",
  iti: "ITI / Vocational Training",
  graduate: "Graduate",
  postgraduate: "Postgraduate",
};

const targetMarkets = {
  village: "Village",
  district: "District",
  state: "State",
  national: "National",
  online: "Online / Digital",
};


/* load profile */

function loadPreview() {
  const savedData = localStorage.getItem(
    "gramnitiBusinessProfilePreview",
  );

  if (!savedData) {
    alert(
      "No business profile was found. Please complete your business profile first.",
    );

    window.location.href = "business-profile.html";
    return;
  }

  let data;

  try {
    data = JSON.parse(savedData);
  } catch (error) {
    console.error("Could not read business profile:", error);

    alert(
      "There was a problem loading your business profile.",
    );

    window.location.href = "business-profile.html";
    return;
  }


  /* business information */

  showValue(
    "preview-business-name",
    data.businessName,
  );

  showValue(
    "preview-business-type",
    formatOption(data.businessType, businessTypes),
  );

  showValue(
    "preview-business-sector",
    formatOption(data.businessSector, sectors),
  );

  showValue(
    "preview-business-stage",
    formatOption(data.businessStage, businessStages),
  );

  showValue(
    "preview-business-description",
    data.businessDescription,
  );


  /* location */

  showValue(
    "preview-state",
    formatOption(data.state, states),
  );

  showValue(
    "preview-district",
    data.district,
  );

  showValue(
    "preview-village",
    data.village,
  );

  showValue(
    "preview-pin-code",
    data.pinCode,
  );


  /* investment */

  showValue(
    "preview-investment",
    formatMoney(data.investment),
  );

  showValue(
    "preview-own-contribution",
    formatMoney(data.ownContribution),
  );

  showValue(
    "preview-loan-required",
    formatMoney(data.loanRequired),
  );

  showValue(
    "preview-employees",
    data.employees,
  );


  /* entrepreneur */

  showValue(
    "preview-experience",
    formatOption(data.experience, experienceLevels),
  );

  showValue(
    "preview-education",
    formatOption(data.education, educationLevels),
  );

  showValue(
    "preview-skills",
    data.skills,
  );


  /* business goals */

  showValue(
    "preview-monthly-revenue",
    formatMoney(data.monthlyRevenue),
  );

  showValue(
    "preview-target-market",
    formatOption(data.targetMarket, targetMarkets),
  );

  showValue(
    "preview-business-goal",
    data.businessGoal,
  );
}


loadPreview();


/* confirmation */

const confirmDetails = document.getElementById(
  "confirm-details",
);

const submitProfileBtn = document.getElementById(
  "submit-profile-btn",
);


if (confirmDetails && submitProfileBtn) {
  confirmDetails.addEventListener("change", function () {
    submitProfileBtn.disabled = !confirmDetails.checked;
  });
}


/* final submission */

if (submitProfileBtn) {
  submitProfileBtn.addEventListener("click", function () {
    if (!confirmDetails.checked) {
      return;
    }

    const previewData = localStorage.getItem(
      "gramnitiBusinessProfilePreview",
    );

    if (!previewData) {
      alert(
        "Business profile data could not be found.",
      );

      window.location.href = "business-profile.html";
      return;
    }

    let businessData;

    try {
      businessData = JSON.parse(previewData);
    } catch (error) {
      console.error("Invalid business profile data:", error);
      return;
    }


    /*
      This is temporary frontend storage.
      Later the backend API will save this
      profile in the database.
    */

    businessData.submittedAt =
      new Date().toISOString();

    localStorage.setItem(
      "gramnitiBusinessProfile",
      JSON.stringify(businessData),
    );

    localStorage.setItem(
      "gramnitiProfileCompleted",
      "true",
    );


    /* draft is no longer needed */

    localStorage.removeItem(
      "gramnitiBusinessProfileDraft",
    );

    localStorage.removeItem(
      "gramnitiBusinessProfilePreview",
    );


    /*
      Later we can show a proper success
      message instead of using alert().
    */

    alert(
      "Business profile submitted successfully.",
    );


    window.location.href =
      "../Market_Analysis/market-analysis.html";
  });
}


/* logout */

const logoutBtn = document.getElementById("logout-btn");
const sidebarLogout = document.getElementById(
  "sidebar-logout",
);


function logoutUser() {
  localStorage.removeItem("user");
  localStorage.removeItem("token");

  sessionStorage.clear();

  /*
    Change this to the login page
    after the login files are created.
  */

  window.location.href =
    "../Dashboard/dashboard.html";
}


if (logoutBtn) {
  logoutBtn.addEventListener("click", logoutUser);
}

if (sidebarLogout) {
  sidebarLogout.addEventListener("click", logoutUser);
}


/* icons */

if (typeof lucide !== "undefined") {
  lucide.createIcons();
}