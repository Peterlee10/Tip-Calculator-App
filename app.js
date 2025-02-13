"use strict";

// The Tip Calculator Uses the Following Formulae:
// Total Tip = Bill Amount × (Tip Percentage / 100)
// Total Amount = Bill Amount + Tip Amount
// Tip Per Person = Total Tip / Number of People
// Total Per Person = Total Amount / Number of People

const billInput = document.querySelector(".bill");
const numOfPersonInput = document.querySelector(".num-of-per");
const tipBtn = document.querySelectorAll('input[type="button"]');
const customBtn = document.querySelector(".custom-tip");
const total = document.querySelector(".total");
const tipAmountPerPerson = document.querySelector(".tip-amount-per");
const resetBtn = document.querySelector(".reset");
const peopleInput = document.querySelector(".ppl-input");
const inputError = document.querySelector(".input-error");
const tipValues = document.querySelector(".tip--value");

const calcTip = function (tip) {
  const bill = +billInput.value;
  const numPersonInput = +numOfPersonInput.value;

  const totalTip = bill * (tip / 100);
  const totalAmount = bill + totalTip;
  const tipPerPerson = parseFloat(totalTip / numPersonInput).toFixed(2);
  const totalPerPerson = parseFloat(totalAmount / numPersonInput).toFixed(2);

  total.textContent = `$${totalPerPerson}`;
  tipAmountPerPerson.textContent = `$${tipPerPerson}`;
  resetBtn.style.opacity = 1;
};

tipValues.addEventListener("click", function (e) {
  if (e.target.classList.contains("value--btn")) {
    // Remove active tip
    tipBtn.forEach((t) => {
      t.style.backgroundColor = "hsl(183, 100%, 15%)";
      t.style.color = "hsl(0, 0%, 100%)";
    });

    // Active tip
    e.target.style.backgroundColor = "hsl(172, 67%, 45%)";
    e.target.style.color = "hsl(183, 100%, 15%)";

    const tip = +e.target.value.slice(0, -1);

    if (numOfPersonInput.value === "0" || numOfPersonInput.value === "") {
      peopleInput.style.border = "1px solid red";
      inputError.textContent = "can't be zero";
    } else if (numOfPersonInput.value > "0") {
      peopleInput.style.borderColor = "none";
      inputError.textContent = "";
      calcTip(tip);
    }
  }
});

const alertUser = function () {
  alert("Please Click Enter btn after inputing tip");
};

customBtn.addEventListener("input", alertUser, { once: true });
window.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const userCustomValue = +customBtn.value;
    const tip = userCustomValue;
    calcTip(tip);
  }
});

resetBtn.addEventListener("click", () => {
  total.textContent = `$0.00`;
  tipAmountPerPerson.textContent = `$0.00`;
  billInput.value = numOfPersonInput.value = customBtn.value = "";
  tipBtn.forEach((btn) => {
    btn.style.backgroundColor = "hsl(183, 100%, 15%)";
    btn.style.color = "#fff";
  });
  resetBtn.style.opacity = "0.3";
  peopleInput.style.border = "none";
});