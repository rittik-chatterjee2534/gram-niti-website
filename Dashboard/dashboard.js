const profileBtn = document.getElementById("profile-btn");
const profileDropdown = document.getElementById("profile-dropdown");

const notificationBtn = document.getElementById("notification-btn");
const notificationDropdown = document.getElementById(
  "notification-dropdown",
);

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
  const unreadNotifications =
    document.querySelectorAll(".notification-item.unread");

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