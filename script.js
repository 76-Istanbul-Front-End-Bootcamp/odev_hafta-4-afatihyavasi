const data = {
    USD: {EUR: 0.82, GBP: 0.74, TR: 7.63},
    EUR: {USD: 1.23, GBP: 0.91, TR: 9.35},
    GBP: {USD: 1.35, EUR: 1.10, TR: 10.32},
    TR: {USD: 0.13, EUR: 0.11, GBP: 0.097}
};

const currencyKeys = Object.keys(data);

function showError() {
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function () {
        x.className = x.className.replace("show", "");
    }, 1400);
}

function createCurrencyElements(elements, root, inputName) {
    for (let i = 0; i < elements.length; i++) {
        const currencyKeyDiv = document.createElement("div");
        const currencyKeyInput = document.createElement("input");
        currencyKeyInput.setAttribute("type", "radio");
        currencyKeyInput.setAttribute("name", inputName);
        currencyKeyInput.setAttribute("id", inputName + elements[i]);
        currencyKeyInput.setAttribute("value", elements[i]);
        const currencyKeyLabel = document.createElement("label");
        currencyKeyLabel.setAttribute("for", inputName + elements[i]);
        currencyKeyLabel.textContent = elements[i];
        currencyKeyLabel.style.cursor = "pointer";
        currencyKeyDiv.appendChild(currencyKeyInput);
        currencyKeyDiv.appendChild(currencyKeyLabel);
        root.appendChild(currencyKeyDiv);
    }
}

//from
const parentEl = document.querySelector("#currency-box-from");
const fromInputName = "currency_from";
createCurrencyElements(currencyKeys, parentEl, fromInputName);

// to
const parentToEl = document.querySelector("#currency-box-to");
const toInputName = "currency_to";
createCurrencyElements(currencyKeys, parentToEl, toInputName);

const calculateButton = document.querySelector("#calculate-button");
const inputText = document.querySelector("#input-text");

inputText.addEventListener("keyup", function (e) {
    if (e.key === "Enter")  {
        e.preventDefault();
        calculateButton.click();
    }
});

calculateButton.addEventListener("click", clickButton);
function clickButton() {
    // kimden ceviriyourz
    const checkFrom = document.querySelector("input[name='currency_from']:checked");
    const checkTo = document.querySelector("input[name='currency_to']:checked");

    const fadeAnimation = document.querySelector(".list-last");
    const resultList = document.querySelector(".list-last-value");

    //radio buton secimi kontrolunu yapar
    if (!checkFrom) {
        //birinci buton secim yapilmadiysa yazdirir
        errorFrom = document.getElementById("snackbar");
        errorFrom.textContent = 'First choice not selected'
        showError();
    }
    if (!checkTo) {
        //ikinci buton secim yapilmadiysa yazdirir
        errorTo = document.getElementById("snackbar");
        errorTo.textContent = 'Second choice not selected'
        showError();
    }
    if (!checkFrom && !checkTo) {
        //ikiside secim yapmadiysa yazdirir
        errorBoth = document.getElementById("snackbar");
        errorBoth.textContent = 'Any choice not selected'
        showError();
    }
    const fromTarget = checkFrom.value;
    const toTarget = checkTo.value;
    const amount = document.querySelector("input[name='amount']").value;
    const currentCurrencyObject = data[fromTarget];
    const resultForOne = currentCurrencyObject[toTarget];
    const result = amount * resultForOne;
    //amount check block
    if (amount == "") {
        errorFill = document.getElementById("snackbar");
        errorFill.textContent = " Fill the amount. "
        showError();
    } else if (isNaN(amount)) {
        // Number kontrolu yapildi
        errorNaN = document.getElementById("snackbar");
        errorNaN.textContent = " Amount not a number. "
        showError();
    } else if (fromTarget === toTarget) {
        //Secimlerin benzerligi kontrol edildi
        errorSame = document.getElementById("snackbar");
        errorSame.textContent = "You should'nt make same choice"
        showError();
    } else {
        fadeAnimation.classList.add("fadein");
        // Fadein class i ekledikten sonra bir sonraki click te yine aynisini yapmak icin
        // kaldiridi
        fadeAnimation.addEventListener('animationend', function (e) {
            fadeAnimation.classList.remove('fadein');
        })
        const listElement = document.createElement("li");
        listElement.textContent = amount + " " + fromTarget + " = " + result.toFixed(2) + " " + toTarget;
        resultList.insertBefore(listElement, resultList.firstChild);
    }
    //Secim yapildiktan sonra radio buttonlarin secimlerini sfirilar
    checkFrom.checked = false;
    checkTo.checked = false;
    document.querySelector("input[type='text']").value = "";
}




