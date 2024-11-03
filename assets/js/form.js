$(document).ready(function () {
  var messages = {
    ku: {
      nameRequired: "پێتڤیە ناڤێ خو بنڤیسی",
      nameMinLength: "پێتڤیە ناڤ ژ ٣ پیتان کێمتر نەبیت",
      emailRequired: "پێتڤیە ئیمەیڵێ خو بنڤیسی",
      emailInvalid: "ئەڤ ئیمەیڵە نەیێ گونجایە",
      numberRequired: "پێتڤیە ژمارا خو بنڤیسی",
      numberLength: "نابیت ژ 7 ژماران کێمتر بنڤیسی",
      messageRequired: "پێتڤیە ڤێ خانێ پڕ بکەی",
    },
    ar: {
      nameRequired: "الأسم مطلوب",
      nameMinLength: "يجب أن يكون الاسم مكونًا من ٣ أحرف على الأقل",
      emailRequired: "البريد الإلكتروني مطلوب",
      emailInvalid: "يرجى إدخال عنوان بريد إلكتروني صالح",
      numberRequired: "رقم الهاتف مطلوب",
      numberLength: "يجب أن يكون رقم الهاتف ٧ أرقام على الأقل",
      messageRequired: "املأ هذا الحقل",
    },
    en: {
      nameRequired: "Name is required",
      nameMinLength: "Name must be at least 3 characters long",
      emailRequired: "Email address is required",
      emailInvalid: "Please enter a valid email address",
      numberRequired: "Phone number is required",
      numberLength: "Phone number must be at least 7 digits",
      messageRequired: "Fill in this field",
    },
  };

  var successMessages = {
    ku: "!داخازیا تە بسەرکەفتیانە هاتە تومارکرن",
    ar: "!تم إرسال النموذج بنجاح",
    en: "Form submitted successfully!",
  };
  var successIcons = {
    ku: "✓",
    ar: "✓",
    en: "✓",
  };
  var loadingMessage = {
    ku: "چاڤەرێبە...",
    ar: "انتظر...",
    en: "Loading...",
  };

  var selectedLanguage = localStorage.getItem("language") || "ku";
  let formSubmitted = false; // Track form submission

  // Language selection
  $("button[data-lang]").on("click", function () {
    selectedLanguage = $(this).data("lang");
    localStorage.setItem("language", selectedLanguage); // Save language selection
    if (formSubmitted) {
      updateErrors(); // Only update errors if the form was submitted
    }
  });

  // Form submission
  $("#myForm").on("submit", function (event) {
    event.preventDefault();
    validateForm();
    formSubmitted = true;
  });

  // Clear form fields and errors
  $("#btn-reset").on("click", function () {
    clearErrors();
  });

  // Phone number input filtering
  $("#number").on("input", function () {
    var value = $(this).val();
    $(this).val(value.replace(/[^0-9+ ٠-٩]/g, ""));
  });

  // Email validation
  function isValidEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // Clear all form fields and error messages
  function clearErrors() {
    $("#name").val("");
    $("#email").val("");
    $("#number").val("");
    $("#message").val("");

    $("#nameError").text("");
    $("#emailError").text("");
    $("#numberError").text("");
    $("#messageError").text("");

    formSubmitted = false; // Reset the flag so that form is treated as not submitted
  }

  // Form validation
  function validateForm() {
    var isValid = true;

    var name = $("#name").val().trim();
    if (name === "") {
      $("#nameError").text(messages[selectedLanguage].nameRequired);
      isValid = false;
    } else if (name.length < 3) {
      $("#nameError").text(messages[selectedLanguage].nameMinLength);
      isValid = false;
    }

    var email = $("#email").val().trim();
    if (email === "") {
      $("#emailError").text(messages[selectedLanguage].emailRequired);
      isValid = false;
    } else if (!isValidEmail(email)) {
      $("#emailError").text(messages[selectedLanguage].emailInvalid);
      isValid = false;
    }

    var number = $("#number").val().trim();
    if (number === "") {
      $("#numberError").text(messages[selectedLanguage].numberRequired);
      isValid = false;
    } else if (number.length < 7) {
      $("#numberError").text(messages[selectedLanguage].numberLength);
      isValid = false;
    }

    var message = $("#message").val().trim();
    if (message === "") {
      $("#messageError").text(messages[selectedLanguage].messageRequired);
      isValid = false;
    }

    if (isValid) {
      submitForm();
    }
  }

  // Update error messages on language change
  function updateErrors() {
    if (!formSubmitted) return; // Do not display errors if the form wasn't submitted

    $("#nameError").text(function () {
      var name = $("#name").val().trim();
      if (name === "") {
        return messages[selectedLanguage].nameRequired;
      } else if (name.length < 3) {
        return messages[selectedLanguage].nameMinLength;
      }
      return "";
    });

    $("#emailError").text(function () {
      var email = $("#email").val().trim();
      if (email === "") {
        return messages[selectedLanguage].emailRequired;
      } else if (!isValidEmail(email)) {
        return messages[selectedLanguage].emailInvalid;
      }
      return "";
    });

    $("#numberError").text(function () {
      var number = $("#number").val().trim();
      if (number === "") {
        return messages[selectedLanguage].numberRequired;
      } else if (number.length < 7) {
        return messages[selectedLanguage].numberLength;
      }
      return "";
    });

    $("#messageError").text(function () {
      var message = $("#message").val().trim();
      if (message === "") {
        return messages[selectedLanguage].messageRequired;
      }
      return "";
    });
  }

  // Field-level validation on input
  $("#name, #email, #number, #message").on("input", function () {
    validateField($(this));
  });

  // Validate a single field
  function validateField($field) {
    var id = $field.attr("id");
    var value = $field.val().trim();
    var errorId = "#" + id + "Error";
    $(errorId).text("");

    switch (id) {
      case "name":
        if (value === "") {
          $(errorId).text(messages[selectedLanguage].nameRequired);
        } else if (value.length < 3) {
          $(errorId).text(messages[selectedLanguage].nameMinLength);
        }
        break;
      case "email":
        if (value === "") {
          $(errorId).text(messages[selectedLanguage].emailRequired);
        } else if (!isValidEmail(value)) {
          $(errorId).text(messages[selectedLanguage].emailInvalid);
        }
        break;
      case "number":
        if (value === "") {
          $(errorId).text(messages[selectedLanguage].numberRequired);
        } else if (value.length < 7) {
          $(errorId).text(messages[selectedLanguage].numberLength);
        }
        break;
      case "message":
        if (value === "") {
          $(errorId).text(messages[selectedLanguage].messageRequired);
        }
        break;
    }
  }

  function showSuccessPopup() {
    $("#successIcon")
      .text(successIcons[selectedLanguage])
      .css("display", "block");
    $("#successMessage").text(successMessages[selectedLanguage]);
    $("#successPopup").addClass("show");
    setTimeout(function () {
      $("#successPopup").removeClass("show");
    }, 3000);
  }

  function submitForm() {
    // Show loading indicator
    $("#successPopup").addClass("show");
    $("#successIcon").css("display", "none");
    $("#successMessage").text(loadingMessage[selectedLanguage]);

    $.ajax({
      url: "https://formspree.io/f/mrbgpyjo",
      method: "POST",
      data: {
        name: $("#name").val(),
        email: $("#email").val(),
        number: $("#number").val(),
        message: $("#message").val(),
      },
      success: function () {
        showSuccessPopup();
        clearErrors();
      },
      error: function () {
        showSuccessPopup();
        clearErrors();
      },
    });
  }
});