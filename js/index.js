const button = document.querySelector("#getCurrencies");
const input = document.querySelector("#amount");
const select = document.querySelector('#currency');
let selectedCurrency = select.options[select.selectedIndex].value;
let exchangeValue;
const resultArea = document.querySelector('#result span');


function exchange(currencies){
    exchangeValue = currencies * input.value;
    resultArea.innerText = Number(Math.round(exchangeValue + 'e+2') + 'e-2');;
}
function getCurrencyList(e){
    e.preventDefault();
    const urlAddress = `https://api.nbp.pl/api/exchangerates/rates/a/${selectedCurrency}/`;

    document.querySelector('.loader').classList.remove('invisible');
    fetch(urlAddress)
    .then((response) => response.json())
    .then((data) => exchange(data.rates[0].mid));
    setTimeout(()=>{ document.querySelector('.loader').classList.add('invisible'); }, 3000 );
}

button.addEventListener('click', (e) => getCurrencyList(e));
