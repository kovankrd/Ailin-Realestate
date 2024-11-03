$(document).ready(function () {
  $(".toggler").on("click", function () {
    $(".d-nav-page").removeClass("d-none").animate({ right: "0" }, 300);
    $("body").addClass("no-scroll");
  });
  // Hide the navigation when the close icon is clicked
  $(".toggler-close").on("click", function () {
    $(".d-nav-page").animate({ right: "-100%" }, 300, function () {
      $(this).addClass("d-none");
      $("body").removeClass("no-scroll");
    });
  });
  // Close the navigation automatically on larger screens
  function checkScreenSize() {
    if (window.matchMedia("(min-width: 992px)").matches) {
      // If screen size is medium or larger (992px and up), hide the d-nav-page
      $(".d-nav-page").addClass("d-none");
      $("body").removeClass("no-scroll");
    }
  }
  // Run the function once when the page loads to handle initial screen size
  checkScreenSize();
  // Listen for window resize and run the function whenever the window is resized
  $(window).resize(checkScreenSize);

  // Close the navigation when a section link is clicked
  $("#about, #contact, #office").on("click", function (e) {
    e.preventDefault();
    const targetSection = $(this).attr("href"); // Get target section ID from href attribute
    // Animate closing the sidebar
    $(".d-nav-page").animate({ right: "-100%" }, 300, function () {
      $(this).addClass("d-none");
      $("body").removeClass("no-scroll");
      // Scroll to the target section
      $("html, body").animate(
        {
          scrollTop: $(targetSection).offset().top,
        },
        100
      );
    });
  });
});