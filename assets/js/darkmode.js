$(document).ready(function () {
  // Check for saved user preference for dark mode
  if (localStorage.getItem("dark-mode") === "enabled") {
    $("body").addClass("dark-mode"); // Apply dark mode on page load
  }

  // Toggle dark mode on button click
  $(".darkModeToggle").on("click", function () {
    $("body").toggleClass("dark-mode"); // Toggle the dark mode class

    // Save user preference in local storage
    if ($("body").hasClass("dark-mode")) {
      localStorage.setItem("dark-mode", "enabled");
    } else {
      localStorage.setItem("dark-mode", "disabled");
    }
  });
});