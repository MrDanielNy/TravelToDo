var LocalStorageUser = (function () {
    //holam8
    function init() {
        const button = document.getElementById("create-travel");
        button.addEventListener("click", createUser);
    }

    function createUser(user) {
        const firstName = document.getElementById("first-name");
        const lastName = document.getElementById("last-name");
        const userName = "(Name: " + firstName.value + " " + lastName.value + ")";

        const cityInput = document.getElementById("city-input");
        const city = " (Destination: " + cityInput.value + ")";

        const fromDateInput = document.getElementById("from-date");
        const toDateInput = document.getElementById("to-date");
        const date = " (Date of travel: " + fromDateInput.value + " - " + toDateInput.value + ")";

        const adultsInput = document.getElementById("number-of-adults");
        const adults = " (Adults: " + adultsInput.value + ")";

        const minors = document.getElementById("minors").checked;
        let kids = " "; 
        
        if(minors === true){
            kids = " (Minors: Yes) ";
        }

        else {
            kids = " (Minors: No) ";
        }

        const currencyS = document.getElementById("currency-s");
        const currencyE = document.getElementById("currency-e");
        const currencyU = document.getElementById("currency-u");
        let currency = " "

        if(currencyS.checked === true){
            currency = currencyS.value
        }
        else if(currencyE.checked === true){
            currency = currencyE.value
        }
        else if(currencyU.checked === true){
            currency = currencyU.value
        }

        money = document.getElementById("spending-money");
        const spendingMoney = " (Spendings: " + money.value + currency + ")";

        user = userName + city + date + adults + kids + spendingMoney;
        const userString = JSON.stringify(user);
        localStorage.setItem("profile", userString);
    }
    
    return { init }
})();

window.addEventListener("DOMContentLoaded", LocalStorageUser.init);