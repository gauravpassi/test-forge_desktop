const form = document.getElementById("contactForm");
const toast = document.getElementById("toast");

const rules = {
  name: (v) => v.trim().length >= 2 || "Please enter your full name.",
  email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || "Enter a valid email address.",
  phone: (v) => v.trim() === "" || /^[+\d\s()-]{7,}$/.test(v.trim()) || "Enter a valid phone number.",
  subject: (v) => v.trim().length >= 3 || "Subject is too short.",
  message: (v) => v.trim().length >= 10 || "Message must be at least 10 characters.",
};

function validateField(id) {
  const input = document.getElementById(id);
  const field = input.closest(".field");
  const errorEl = field.querySelector(".error");
  const rule = rules[id];
  if (!rule) return true;
  const result = rule(input.value);
  if (result === true) {
    field.classList.remove("invalid");
    errorEl.textContent = "";
    return true;
  }
  field.classList.add("invalid");
  errorEl.textContent = result;
  return false;
}

Object.keys(rules).forEach((id) => {
  const el = document.getElementById(id);
  el.addEventListener("blur", () => validateField(id));
  el.addEventListener("input", () => {
    if (el.closest(".field").classList.contains("invalid")) validateField(id);
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const allValid = Object.keys(rules).map(validateField).every(Boolean);
  const consent = document.getElementById("consent");
  if (!consent.checked) {
    consent.focus();
    return;
  }
  if (!allValid) return;

  const btn = form.querySelector(".submit-btn");
  const btnText = btn.querySelector(".btn-text");
  btn.disabled = true;
  btnText.textContent = "Sending…";

  setTimeout(() => {
    toast.classList.add("show");
    btn.disabled = false;
    btnText.textContent = "Send Message";
    form.reset();
    document.querySelectorAll(".field").forEach((f) => f.classList.remove("invalid"));
    setTimeout(() => toast.classList.remove("show"), 4000);
  }, 900);
});
