$(document).ready(function () {
  // Show or hide the arrow up icon based on scroll position
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      // Change 100 to adjust when it appears
      $("#arrow-up").fadeIn();
    } else {
      $("#arrow-up").fadeOut(200);
    }
  });
  // Smooth scroll to top when the icon is clicked
  $("#arrow-up a").click(function (e) {
    e.preventDefault(); // Prevent default anchor click behavior
    $("html, body").animate({ scrollTop: 0 }, 100); // Scroll to top smoothly
  });
});