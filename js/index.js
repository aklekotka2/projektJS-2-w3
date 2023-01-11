const button = document.querySelector("#getCurrencies");
const input = document.querySelector("#amount");
const select = document.querySelector('#currency');
let selectedCurrency;
let exchangeValue;
const resultArea = document.querySelector('#result span');
const errArea = document.querySelector('.err');
const apiErrArea = document.querySelector('.api-err');

function validate(val){
    if(val < 0){
        errArea.innerText = 'Wartość musi być dodatnia.';
        return false;
    }
    errArea.innerText = '';
    return true;
}

function exchange(currencies){
    if( validate(input.value)){
        exchangeValue = currencies * input.value;
        resultArea.innerText = exchangeValue.toFixed(2);
    }
    else{
        resultArea.innerText = 0;
    }  
}
function getCurrencyList(e){
    e.preventDefault();
    selectedCurrency = select.options[select.selectedIndex].value;
    const urlAddress = `https://api.nbp.pl/api/exchangerates/rates/a/${selectedCurrency}/`;

    document.querySelector('.loader').classList.remove('invisible');
    fetch(urlAddress)
    .then((response) => response.json())
    .then((data) => exchange(data.rates[0].mid))
    .catch(error => apiErrArea.innerText = `Nastąpił błąd: ${error}`)
    .finally(document.querySelector('.loader').classList.add('invisible')); 
}

button.addEventListener('click', (e) => getCurrencyList(e));
