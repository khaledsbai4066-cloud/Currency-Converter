
//DOM ELEMENTS
const converterForm = document.getElementById("converter-form");
const amountInput = document.getElementById("amount");
const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const resultDiv = document.getElementById("result-DIV");


window.addEventListener("load",fetchcurrencies)
converterForm.addEventListener("submit",convertCurrency)

async function fetchcurrencies(){
    const response = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
    const data = await response.json();
    console.log(data);
    const RATES=Object.keys(data.rates);
    console.log(RATES);
    RATES.forEach((rate)=>{
        const option1 = document.createElement("option");
        option1.value=rate;
        option1.textContent=rate;
        fromCurrency.appendChild(option1);

        const option2 = document.createElement("option");
        option2.value=rate;
        option2.textContent=rate;
        toCurrency.appendChild(option2);
    })
}
async function convertCurrency(e){
    e.preventDefault();
    const amount = amountInput.value;
    if(amount <=0){
        alert("Please enter a valid amount");
        return;
    }
    const from = fromCurrency.value;
    const to = toCurrency.value;
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
    const data = await response.json();
    const rate=data.rates[to];
    const convertedAmount = (amount * rate).toFixed(1);

    resultDiv.textContent = `${amount} ${from} = ${convertedAmount} ${to}`;
}