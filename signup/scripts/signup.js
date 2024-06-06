document.addEventListener("DOMContentLoaded", function() {
  const signupForm = document.getElementById("signupForm");

  signupForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (validateForm(email, password, confirmPassword)) {
      storeUser(email, password);
      alert("Signup successful! Please log in.");
      window.location.href = "../login/login.html"; // Redirect to login page
    }
  });

  function validateForm(email, password, confirmPassword) {
    if (!email || !password || !confirmPassword) {
      showError("All fields are required.");
      return false;
    }

    if (!validateEmail(email)) {
      showError("Please enter a valid email address.");
      return false;
    }

    if (password !== confirmPassword) {
      showError("Passwords do not match.");
      return false;
    }

    return true;
  }

  function validateEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(String(email).toLowerCase());
  }

  function showError(message) {
    const errorBox = document.getElementById("errorBox");
    errorBox.textContent = message;
    errorBox.style.display = "block";
  }

  function storeUser(email, password) {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    storedUsers.push({ email, password });
    localStorage.setItem("users", JSON.stringify(storedUsers));
  }
});
