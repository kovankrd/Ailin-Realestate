$(document).ready(function() {
    // Toggle rotation on click
    $('.dropdown').on('show.bs.dropdown', function() {
        $('.arrow-icon').addClass('rotate'); // Rotate down when menu opens
    }).on('hide.bs.dropdown', function() {
        $('.arrow-icon').removeClass('rotate'); // Rotate up when menu closes
    });
});