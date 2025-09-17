const converterForm = document.getElementById("converter-form");
const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const amountInput = document.getElementById("amount");
const resultDiv = document.getElementById("result");

window.addEventListener("load", fetchCurrencies);

converterForm.addEventListener("submit", convertCurrency);

async function fetchCurrencies() {
  // https://api.exchangerate-api.com/v4/latest/USD
  const response = await fetch(
    "https://api.exchangerate-api.com/v4/latest/USD"
  );
  const data = await response.json();

  console.log(data);
  const currencyOptions = Object.keys(data.rates);

  currencyOptions.forEach((currency) => {
    const option1 = document.createElement("option");
    option1.value = currency;
    option1.textContent = currency;
    fromCurrency.appendChild(option1);

    const option2 = document.createElement("option");
    option2.value = currency;
    option2.textContent = currency;
    toCurrency.appendChild(option2);
  });
}

function convertCurrency() {}
