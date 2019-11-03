var LocalStorageUser = (function () {
    var userData = [];

    function init() {
        const button = document.getElementById("create-travel");
        button.addEventListener("click", createUser);
    }

    function saveTodo(locationName, location, datefrom, dateto, adults, minors, money) {
        let maxId = 0;
        for (const i in userData) {
            const todo = userData[i];
            if (todo.id > maxId) {
                maxId = todo.id;
            }
        }

        const todo = {
            id: maxId + 1,
            locationName: locationName,
            location: location,
            datefrom: datefrom,
            dateto: dateto,
            adults: adults,
            minors: minors,
            money:money
        }

        userData.push(todo);
        saveData();
    }

    function createUser() {

        const locationName = document.getElementById("travel-name").value;

        const location = document.getElementById("location-input").value;

        const fromDateInput = document.getElementById("from-date").value;
        const toDateInput = document.getElementById("to-date").value;

        const adultsInput = document.getElementById("number-of-adults").value;

        const minorsinput = document.getElementById("minors").value;

        money = document.getElementById("spending-money").value;

        if (localStorage.getItem("user") === null) {
            userData = [];
            saveTodo(locationName, location, fromDateInput, toDateInput, adultsInput, minorsinput, money);
        }

        else {
            userData = JSON.parse(localStorage.getItem("user"));
            saveTodo(locationName, location, fromDateInput, toDateInput, adultsInput, minorsinput, money);
        }
        saveData();

    }

    function saveData() {
        localStorage.setItem("user", JSON.stringify(userData));
    }

    return { init, saveTodo }
})();

window.addEventListener("DOMContentLoaded", LocalStorageUser.init);