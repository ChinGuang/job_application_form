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

function generateDropHandler(dropZoneElement, inputElement, preview) {
  const fileTypeAllowed = inputElement.getAttribute("accept");
  return function dropHandler(ev) {
    ev.preventDefault();
    const files = [...ev.dataTransfer.items]
      .map((item) => item.getAsFile())
      .filter((file) => file);
    switch (fileTypeAllowed) {
      case "image/*":
        displayImage(dropZoneElement, files[0], preview);
        break;
      default:
        displayFile(dropZoneElement, files[0], preview);
        break;
    }
  };
}

function displayFile(element, file, preview) {
  const li = document.createElement("li");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(file);
  a.download = file.name;
  a.textContent = file.name;
  li.appendChild(a);
  preview.appendChild(li);
  element.style.display = "none";
}

function displayImage(element, file, preview) {
  if (file.type.startsWith("image/")) {
    const li = document.createElement("li");
    const img = document.createElement("img");
    img.src = URL.createObjectURL(file);
    img.alt = file.name;
    li.appendChild(img);
    li.appendChild(document.createTextNode(file.name));
    preview.appendChild(li);
    element.style.display = "none";
  }
}

const profileDropZone = document.getElementById("drop-zone-profile");
const profilePreview = document.getElementById("preview-profile");
const profileInput = document.getElementById("profilephoto");
const profileClearBtn = document.getElementById("clear-btn-profile");
profileDropZone.addEventListener("drop", generateDropHandler(profileDropZone, profileInput, profilePreview));

window.addEventListener("drop", (e) => {
  if ([...e.dataTransfer.items].some((item) => item.kind === "file")) {
    e.preventDefault();
  }
});

profileDropZone.addEventListener("dragover", (e) => {
  const fileItems = [...e.dataTransfer.items].filter(
    (item) => item.kind === "file",
  );
  if (fileItems.length > 0) {
    e.preventDefault();
    if (fileItems.some((item) => item.type.startsWith("image/"))) {
      e.dataTransfer.dropEffect = "copy";
    } else {
      e.dataTransfer.dropEffect = "none";
    }
  }
});

window.addEventListener("dragover", (e) => {
  const fileItems = [...e.dataTransfer.items].filter(
    (item) => item.kind === "file",
  );
  if (fileItems.length > 0) {
    e.preventDefault();
    if (!dropZone.contains(e.target)) {
      e.dataTransfer.dropEffect = "none";
    }
  }
});

profileInput.addEventListener("change", (e) => {
  displayImage(profileDropZone, e.target.files[0], profilePreview);
});

profileClearBtn.addEventListener("click", () => {
  for (const img of profilePreview.querySelectorAll("img")) {
    URL.revokeObjectURL(img.src);
  }
  profilePreview.textContent = "";
  profileDropZone.style.display = "flex";
});

const resumeDropZone = document.getElementById("drop-zone-resume");
const resumePreview = document.getElementById("preview-resume");
const resumeInput = document.getElementById("resume");
const resumeClearBtn = document.getElementById("clear-btn-resume");
resumeDropZone.addEventListener("drop", generateDropHandler(resumeDropZone, resumeInput, resumePreview));

resumeDropZone.addEventListener("dragover", (e) => {
  const fileItems = [...e.dataTransfer.items].filter(
    (item) => item.kind === "file",
  );
  if (fileItems.length > 0) {
    e.preventDefault();
    if (fileItems.some((item) => item.type.startsWith(".pdf"))) {
      e.dataTransfer.dropEffect = "copy";
    } else {
      e.dataTransfer.dropEffect = "none";
    }
  }
});

resumeInput.addEventListener("change", (e) => {
  displayFile(resumeDropZone, e.target.files[0], resumePreview);
});

resumeClearBtn.addEventListener("click", () => {
  for (const link of resumePreview.querySelectorAll("a")) {
    URL.revokeObjectURL(link.href);
  }
  resumePreview.textContent = "";
  resumeDropZone.style.display = "flex";
});

const allInputs = document.querySelectorAll("input");
allInputs.forEach((input) => {
  input.addEventListener("blur", () => {
    const errorSpan = input.nextElementSibling;
    if (input.validity.valid) {
      errorSpan.removeAttribute("data-error");
    } else {
      console.log("invalid input")
      console.log(input.validationMessage);
      errorSpan.setAttribute("data-error", input.validationMessage);
    }
  });
});
