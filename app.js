const BASE_URL = "https://v6.exchangerate-api.com/v6/43d396fb788f32d70af44da8/latest/USD";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector(".container button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        }
        if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateExchangeRate = async () => {
    let amount = parseFloat(document.querySelector(".amount input").value);
    if (isNaN(amount) || amount < 1) {
        amount = 1;
        document.querySelector(".amount input").value = "1";
    }

    const URL = `${BASE_URL}`;
    try {
        let response = await fetch(URL);
        let data = await response.json();
        let rate = data.conversion_rates[toCurr.value.toUpperCase()];

        let finalAmount = amount * rate;
        msg.innerText = `${amount} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
    } catch (error) {
        console.error("Error fetching exchange rate:", error);
    }
};

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load", () => {
    updateExchangeRate();
});
