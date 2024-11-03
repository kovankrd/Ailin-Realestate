$(window).on("load", function () {
  // Add the no-scroll class to the body to prevent scrolling
  $("body").addClass("no-scroll");

  // Fade out the loader after the page is fully loaded
  $("#loader").fadeOut(500, function () {
    // Remove the no-scroll class from the body after the loader disappears
    $("body").removeClass("no-scroll");
  });
});