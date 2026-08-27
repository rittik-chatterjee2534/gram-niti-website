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

const logoutBtn = document.getElementById("logout-btn");
const sidebarLogout = document.getElementById("sidebar-logout");

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

/* Mark all as read */

if (markAllReadBtn) {
  markAllReadBtn.addEventListener("click", () => {
    const unreadItems = document.querySelectorAll(".notification-item.unread");

    unreadItems.forEach((item) => {
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

/* Close dropdowns */

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

/* Financial fields */

const landCost = document.getElementById("land-cost");
const machineryCost = document.getElementById("machinery-cost");
const rawMaterialCost = document.getElementById("raw-material-cost");
const setupCost = document.getElementById("setup-cost");
const marketingCost = document.getElementById("marketing-cost");
const otherCost = document.getElementById("other-cost");

const ownContribution = document.getElementById("own-contribution");

const loanAmount = document.getElementById("loan-amount");
const interestRate = document.getElementById("interest-rate");
const loanTenure = document.getElementById("loan-tenure");

const monthlyRevenue = document.getElementById("monthly-revenue");

const monthlyExpenses = document.getElementById("monthly-expenses");

/* Summary fields */

const totalProjectCostText = document.getElementById("total-project-cost");

const summaryLoanAmount = document.getElementById("summary-loan-amount");

const estimatedEmi = document.getElementById("estimated-emi");

const monthlyProfitText = document.getElementById("monthly-profit");

const annualRevenueText = document.getElementById("annual-revenue");

const annualExpensesText = document.getElementById("annual-expenses");

const annualProfitText = document.getElementById("annual-profit");

const profitMarginText = document.getElementById("profit-margin");

/* Buttons */

const resetPlanBtn = document.getElementById("reset-plan-btn");
const savePlanBtn = document.getElementById("save-plan-btn");

/* Helper */

function getNumber(input) {
  if (!input) {
    return 0;
  }

  const value = Number(input.value);

  return Number.isNaN(value) ? 0 : value;
}

function formatMoney(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

/* EMI */

function calculateEmi(principal, annualRate, years) {
  if (principal <= 0 || years <= 0) {
    return 0;
  }

  const months = years * 12;

  if (annualRate <= 0) {
    return principal / months;
  }

  const monthlyRate = annualRate / 12 / 100;

  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1);

  return emi;
}

/* Main calculation */

function calculateFinancialPlan() {
  const totalProjectCost =
    getNumber(landCost) +
    getNumber(machineryCost) +
    getNumber(rawMaterialCost) +
    getNumber(setupCost) +
    getNumber(marketingCost) +
    getNumber(otherCost);

  const contribution = getNumber(ownContribution);

  let requiredLoan = totalProjectCost - contribution;

  if (requiredLoan < 0) {
    requiredLoan = 0;
  }

  const rate = getNumber(interestRate);
  const tenure = getNumber(loanTenure);

  const emi = calculateEmi(requiredLoan, rate, tenure);

  const revenue = getNumber(monthlyRevenue);
  const expenses = getNumber(monthlyExpenses);

  const monthlyProfit = revenue - expenses;

  const annualRevenue = revenue * 12;
  const annualExpenses = expenses * 12;
  const annualProfit = monthlyProfit * 12;

  let profitMargin = 0;

  if (revenue > 0) {
    profitMargin = (monthlyProfit / revenue) * 100;
  }

  /* Update loan input */

  if (loanAmount) {
    loanAmount.value = Math.round(requiredLoan);
  }

  /* Update summary */

  if (totalProjectCostText) {
    totalProjectCostText.textContent = formatMoney(totalProjectCost);
  }

  if (summaryLoanAmount) {
    summaryLoanAmount.textContent = formatMoney(requiredLoan);
  }

  if (estimatedEmi) {
    estimatedEmi.textContent = formatMoney(Math.round(emi));
  }

  if (monthlyProfitText) {
    monthlyProfitText.textContent = formatMoney(monthlyProfit);
  }

  if (annualRevenueText) {
    annualRevenueText.textContent = formatMoney(annualRevenue);
  }

  if (annualExpensesText) {
    annualExpensesText.textContent = formatMoney(annualExpenses);
  }

  if (annualProfitText) {
    annualProfitText.textContent = formatMoney(annualProfit);
  }

  if (profitMarginText) {
    profitMarginText.textContent = `${Math.round(profitMargin)}%`;
  }
}

/* Watch financial inputs */

const financialInputs = [
  landCost,
  machineryCost,
  rawMaterialCost,
  setupCost,
  marketingCost,
  otherCost,
  ownContribution,
  interestRate,
  loanTenure,
  monthlyRevenue,
  monthlyExpenses,
];

financialInputs.forEach((input) => {
  if (!input) {
    return;
  }

  input.addEventListener("input", calculateFinancialPlan);

  input.addEventListener("change", calculateFinancialPlan);
});

/* Save plan */

if (savePlanBtn) {
  savePlanBtn.addEventListener("click", () => {
    const planData = {
      landCost: getNumber(landCost),
      machineryCost: getNumber(machineryCost),
      rawMaterialCost: getNumber(rawMaterialCost),
      setupCost: getNumber(setupCost),
      marketingCost: getNumber(marketingCost),
      otherCost: getNumber(otherCost),

      ownContribution: getNumber(ownContribution),

      loanAmount: getNumber(loanAmount),
      interestRate: getNumber(interestRate),
      loanTenure: getNumber(loanTenure),

      monthlyRevenue: getNumber(monthlyRevenue),
      monthlyExpenses: getNumber(monthlyExpenses),
    };

    localStorage.setItem("gramnitiFinancialPlan", JSON.stringify(planData));

    const planStatus = document.querySelector(".plan-status");

    if (planStatus) {
      planStatus.textContent = "Saved";
    }

    alert("Financial plan saved.");
  });
}

/* Load saved plan */

function loadSavedPlan() {
  const savedPlan = localStorage.getItem("gramnitiFinancialPlan");

  if (!savedPlan) {
    return;
  }

  try {
    const plan = JSON.parse(savedPlan);

    if (landCost) {
      landCost.value = plan.landCost ?? 0;
    }

    if (machineryCost) {
      machineryCost.value = plan.machineryCost ?? 0;
    }

    if (rawMaterialCost) {
      rawMaterialCost.value = plan.rawMaterialCost ?? 0;
    }

    if (setupCost) {
      setupCost.value = plan.setupCost ?? 0;
    }

    if (marketingCost) {
      marketingCost.value = plan.marketingCost ?? 0;
    }

    if (otherCost) {
      otherCost.value = plan.otherCost ?? 0;
    }

    if (ownContribution) {
      ownContribution.value = plan.ownContribution ?? 0;
    }

    if (interestRate) {
      interestRate.value = plan.interestRate ?? 8;
    }

    if (loanTenure) {
      loanTenure.value = plan.loanTenure ?? 7;
    }

    if (monthlyRevenue) {
      monthlyRevenue.value = plan.monthlyRevenue ?? 0;
    }

    if (monthlyExpenses) {
      monthlyExpenses.value = plan.monthlyExpenses ?? 0;
    }

    const planStatus = document.querySelector(".plan-status");

    if (planStatus) {
      planStatus.textContent = "Saved";
    }

    calculateFinancialPlan();
  } catch (error) {
    console.error("Could not load financial plan:", error);
  }
}

loadSavedPlan();

/* Reset plan */

if (resetPlanBtn) {
  resetPlanBtn.addEventListener("click", () => {
    const shouldReset = confirm("Do you want to reset the financial plan?");

    if (!shouldReset) {
      return;
    }

    if (landCost) {
      landCost.value = 100000;
    }

    if (machineryCost) {
      machineryCost.value = 400000;
    }

    if (rawMaterialCost) {
      rawMaterialCost.value = 150000;
    }

    if (setupCost) {
      setupCost.value = 200000;
    }

    if (marketingCost) {
      marketingCost.value = 50000;
    }

    if (otherCost) {
      otherCost.value = 100000;
    }

    if (ownContribution) {
      ownContribution.value = 100000;
    }

    if (interestRate) {
      interestRate.value = 8;
    }

    if (loanTenure) {
      loanTenure.value = 7;
    }

    if (monthlyRevenue) {
      monthlyRevenue.value = 150000;
    }

    if (monthlyExpenses) {
      monthlyExpenses.value = 85000;
    }

    localStorage.removeItem("gramnitiFinancialPlan");

    const planStatus = document.querySelector(".plan-status");

    if (planStatus) {
      planStatus.textContent = "Draft";
    }

    calculateFinancialPlan();
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

/* First calculation */

calculateFinancialPlan();

/* Lucide icons */

if (typeof lucide !== "undefined") {
  lucide.createIcons();
}
