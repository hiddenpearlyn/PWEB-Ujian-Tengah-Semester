document.addEventListener("DOMContentLoaded", function() {
  const submitBtn = document.getElementById("submitBtn");
  const errorBox = document.getElementById("errorBox");

  submitBtn.addEventListener("click", function() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (validateForm(email, password)) {
      loginUser(email, password);
    }
  });

  function validateForm(email, password) {
    if (!email || !password) {
      showError("Both fields are required.");
      return false;
    }

    if (!validateEmail(email)) {
      showError("Please enter a valid email address.");
      return false;
    }

    return true;
  }

  function validateEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(String(email).toLowerCase());
  }

  function showError(message) {
    errorBox.textContent = message;
    errorBox.style.display = "block";
  }

  function hideError() {
    errorBox.style.display = "none";
  }

  function loginUser(email, password) {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const user = storedUsers.find(user => user.email === email && user.password === password);

    if (user) {
      alert("Login successful!");
      window.location.href = "../index.html"; // Redirect to homepage
    } else {
      showError("Invalid email or password.");
    }
  }
});
