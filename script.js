console.log("script.js loaded");

const dobField = document.getElementById("dob");
const maxDob = new Date();
maxDob.setFullYear(maxDob.getFullYear() - 18);
dobField.setAttribute("max", maxDob.toLocaleDateString());

const availableDate = document.getElementById("availabledate");
const minAvailableDate = new Date();
availableDate.setAttribute("min", minAvailableDate.toLocaleDateString());
