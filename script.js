console.log("script.js loaded");

const dobField = document.getElementById("dob");
const maxDob = new Date();
maxDob.setFullYear(maxDob.getFullYear() - 18);
dobField.setAttribute("max", maxDob.toLocaleDateString());

const availableDate = document.getElementById("availabledate");
const minAvailableDate = new Date();
availableDate.setAttribute("min", minAvailableDate.toLocaleDateString());

const requiredFields = document.querySelectorAll('[required]');
for (const field of requiredFields) {
  const label = field.previousElementSibling;
  if (label && label.tagName === "LABEL") {
    label.innerHTML += "<span style='color:red;'>*</span>";
  }
}
