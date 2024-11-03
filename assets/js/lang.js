$(document).ready(function () {
    const translations = {
      en: "assets/json/en.json",
      ar: "assets/json/ar.json",
      ku: "assets/json/ku.json",
    };
    function loadLanguage(lang) {
      $.getJSON(translations[lang], function (data) {
        $("[data-translate]").each(function () {
          const key = $(this).data("translate");
          if ($(this).is("input, textarea")) {
            $(this).attr("placeholder", data[key] || key);
          } else {
            $(this).text(data[key] || key);
          }
        });
        localStorage.setItem("language", lang);
        if (lang === "ar") {
          $('.navbar-brand p').html('<span>عقارات&#8201;</span> <span class="text-warning">ایلین</span>');
          $('.navbar-brand-2 p').html('<span class="text-white">عقارات&#8201</span> <span class="text-warning">ایلین</span>');
          $('.navbar-brand').css('font-family', 'myFont, cursive, sans-serif');
          $('.navbar-items, .navbar-content, .circle-row, .about-container, form').attr('dir', 'rtl');
        } else if (lang === "ku") {
            $('.navbar-brand p').html('<span>نڤیسینگەها</span><span class="mx-1 text-warning">ئایلین</span>');
            $('.navbar-brand-2 p').html('<span class="text-white">نڤیسینگەها</span><span class="mx-1 text-warning">ئایلین</span>');
            $('.navbar-brand').css('font-family', 'myFont, cursive, sans-serif');
            $('.navbar-items, .navbar-content, .circle-row, .about-container, form').attr('dir', 'rtl');
        } else {
            $('.navbar-brand p').html('<span class="text-warning">Ailin</span><span class="mx-1">Realestate</span>');
            $('.navbar-brand-2 p').html('<span class="text-warning">Ailin</span><span class="mx-1 text-white">Realestate</span>');
            $('.navbar-brand').css('font-family', 'cursive, myFont, sans-serif');
            $('.navbar-items, .navbar-content, .circle-row, .about-container, form').attr('dir', 'ltr');
        }            
      }); //.fail(function() {
      //     console.error('Failed to load language file.');
      // });
    }
    $("button").click(function () {
      const lang = $(this).data("lang");
      loadLanguage(lang);
    });
    function init() {
      // Check if a language preference is already saved
      let savedLang = localStorage.getItem("language");
      // If there's no saved preference, set the default to Kurdish
      if (!savedLang) {
          savedLang = "ku";
          localStorage.setItem("language", "ku"); // Save the default preference
      }
      loadLanguage(savedLang); // Load the selected or default language
      }
      init();
});