document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const email = document.querySelector("#email");
    const password = document.querySelector("#password");
    const toggle = document.querySelector(".toggle-password");
  

    const emailError = document.createElement("small");
    emailError.classList.add("error-message");
    emailError.setAttribute("aria-live", "polite");
    email.insertAdjacentElement("afterend", emailError);
  
    const passwordError = document.createElement("small");
    passwordError.classList.add("error-message");
    passwordError.setAttribute("aria-live", "polite");
    password.insertAdjacentElement("afterend", passwordError);
  
  
   const passwordRules = {
      length: /.{8,}/,
      capital: /^[A-Z]/,
      number: /[0-9]/,
      symbol: /[!@#$%^&*(),.?":{}|<>]/
    };
  
    function validateEmail(value) {
      if (!value) return "Email is required.";
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(value) ? "" : "Please enter a valid email address.";
    }
  
    function validatePassword(value) {
      if (!value) return "Password is required.";
      if (!passwordRules.length.test(value)) return "Password must be at least 8 characters.";
      if (!passwordRules.capital.test(value)) return "Password must start with a capital letter.";
      if (!passwordRules.number.test(value)) return "Password must contain at least one number.";
      if (!passwordRules.symbol.test(value)) return "Password must contain at least one symbol.";
      return "";
    }
  
    
    toggle.addEventListener("click", () => {
      const type = password.type === "password" ? "text" : "password";
      password.type = type;
      toggle.src = type === "password" ? "assets/Show.png" : "assets/Hide.png";
    });
  

    email.addEventListener("input", () => {
      const error = validateEmail(email.value.trim());
      emailError.textContent = error;
      email.classList.toggle("error", !!error);
    });
  
    password.addEventListener("input", () => {
      const error = validatePassword(password.value.trim());
      passwordError.textContent = error;
      password.classList.toggle("error", !!error);
    });
  
    form.addEventListener("submit", (e) => {
      const emailValidation = validateEmail(email.value.trim());
      const passwordValidation = validatePassword(password.value.trim());
  
      emailError.textContent = emailValidation;
      passwordError.textContent = passwordValidation;
  
      email.classList.toggle("error", !!emailValidation);
      password.classList.toggle("error", !!passwordValidation);
  


      if (emailValidation || passwordValidation) {
        e.preventDefault();
      }
    });
  });
  