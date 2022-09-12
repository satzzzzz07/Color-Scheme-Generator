"use strict";

const submitBTN = document.getElementById("submit");

// Get Colors
submitBTN.addEventListener("click", () => {
  const colorValue = document.getElementById("color-picker").value.slice(1, 8);
  const schemeValue = document.getElementById("scheme").value.toLowerCase();
  fetch(
    `https://www.thecolorapi.com/scheme?hex=${colorValue}&mode=${schemeValue}&count=6`
  )
    .then((res) => res.json())
    .then((data) => {
      // Display color
      for (let k = 1; k <= 6; k++) {
        document.getElementById(`c${k}`).style.backgroundColor = `${
          data.colors[k - 1].hex.value
        }`;
      }

      // Show Color Value
      for (let j = 1; j <= 6; j++) {
        document.getElementById(`cd${j}`).textContent =
          data.colors[j - 1].hex.value;
      }

      // click to copy feature
      function copyColorValues() {
        for (let i = 1; i <= 6; i++) {
          document
            .getElementById(`cd${i}`)
            .addEventListener("click", function () {
              navigator.clipboard
                .writeText(document.getElementById(`cd${i}`).textContent)
                .then(() => {
                  document.getElementById(`cd${i}`).textContent = "COPIED !";
                  setTimeout(() => {
                    document.getElementById(`cd${i}`).textContent =
                      data.colors[i - 1].hex.value;
                  }, 1500);
                });
            });
        }
      }
      copyColorValues();

      // Copy from color
      function copyFromColor() {
        for (let i = 1; i <= 6; i++) {
          document
            .getElementById(`c${i}`)
            .addEventListener("click", function () {
              navigator.clipboard
                .writeText(
                  document.getElementById(`c${i}`).style.backgroundColor
                )
                .then(() => {
                  document.getElementById(`cd${i}`).textContent = "COPIED !";
                  setTimeout(() => {
                    document.getElementById(`cd${i}`).textContent =
                      data.colors[i - 1].hex.value;
                  }, 1500);
                });
            });
        }
      }

      copyFromColor();
    });
});

// Dark Mode
document.getElementById("night-mode").addEventListener("click", () => {
  document.getElementById("night-mode").classList.add("hidden");
  document.getElementById("light-mode").classList.remove("hidden");
  document.body.style.backgroundColor = "#1F2937";
  submitBTN.style.backgroundColor = "#3D4B60";
  submitBTN.style.color = "#fff";
  submitBTN.style.border = "none";
  document.getElementById("scheme").style.backgroundColor = "#3D4B60";
  document.getElementById("scheme").style.color = "#fff";
  document.getElementById("nav").style.backgroundColor = "#1F2937";
  document.getElementById("nav-heading").style.color = "#fff";
  for (let i = 1; i <= 6; i++) {
    document.getElementById(`cd${i}`).style.color = "#D5D4D8";
  }
});

// Light Mode
document.getElementById("light-mode").addEventListener("click", () => {
  document.getElementById("night-mode").classList.remove("hidden");
  document.getElementById("light-mode").classList.add("hidden");
  document.body.style.backgroundColor = "#fff";
  submitBTN.style.backgroundColor = "#fff";
  submitBTN.style.color = "black";
  submitBTN.style.border = "1px solid grey";
  document.getElementById("scheme").style.backgroundColor = "#fff";
  document.getElementById("scheme").style.color = "black";
  document.getElementById("nav").style.backgroundColor = "#fff";
  document.getElementById("nav-heading").style.color = "black";
  for (let i = 1; i <= 6; i++) {
    document.getElementById(`cd${i}`).style.color = "black";
  }
});
