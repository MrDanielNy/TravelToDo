//Hejsan
function openForm() {
    document.getElementById("createActivity").style.display = "block";
}

function closeForm() {
    document.getElementById("createActivity").style.display = "none";
}



const inputActivityFromForm = document.getElementById("inputActivity");
const inputDateFromForm = document.getElementById("inputDate");
const inputTimeFromForm = document.getElementById("inputTime");
const inputPriceFromForm = document.getElementById("inputNumber");
const inputChild = document.getElementById("inputChild");
const inputInside = document.getElementById("inputInside");

var APopupHandler = (function () {


    function check() {
        document.getElementById("inputChild").checked = true;
    }

    function uncheck() {
        document.getElementById("inputChild").checked = false;
    }

    function test() {
        if (date && time && number && activity) {
            console.log("nice")
            document.getElementById("createActivity").reset();
            document.getElementById("createActivity").style.display = "none";
        }

    }

    let setActivity;
    let setTime;
    let setDate;
    let setNumber;
    let setChild;
    let setInside;

    let showList = 0;

    function addActivity() {

        const activity = inputActivityFromForm.value;
        const date = inputDateFromForm.value;
        const time = inputTimeFromForm.value;
        const number = inputPriceFromForm.value;
        let inside = false; //Changed by DN
        let child = false; //Changed by DN

        console.log(activity);
        if (inputChild.checked == true) {
            child = true;
        }
        else {
            child = false;
        }

        if (inputInside.checked == true) {
            inside = true;;
        }
        else {
            inside = false;
        }

        setActivity = activity;
        setTime = time;
        setDate = date;
        setNumber = number;
        setChild = child;
        setInside = inside;

        //localStorage.setItem('testObject', JSON.stringify(testObject));

        if (date && time && number && activity) {
            /*
            console.log(setTime);
            localStorage.clear();
            localStorage.setItem("Activity", JSON.stringify(setActivity));
            localStorage.setItem("Time", JSON.stringify(setTime));
            localStorage.setItem("Date", JSON.stringify(setDate));
            localStorage.setItem("Price", JSON.stringify(setNumber));
            localStorage.setItem("Child", JSON.stringify(setChild));
            localStorage.setItem("Inside", JSON.stringify(setInside));*/

            TODOStorage.saveTodo(setActivity, setTime, setDate, setNumber, setChild, setInside);
        }
    }

    return {
        addActivity,
        check,
        uncheck
    };
})();

/* TO BE REMOVED!
function getTodoById(id) {
    for (const i in todos) {
        const todo = todos[i];

        if (todo.id === id) {
            return todo;
        }

    }
    return null;
}


function callLog() {

    console.log(setTime);
    localStorage.setItem("Time:", setTime)
    localStorage.setItem("Date:", setDate)
}
*/

var TODOStorage = (function () {
    var todos = [];

    function init() {
        const lsTodos = localStorage.getItem('TODOS');
        todos = JSON.parse(lsTodos)
        debugVariable1 = todos;
        if (todos === null) {
            todos = [];
        }
        /*
        if (getTodoById(1)) {

            var getActivity = getTodoById(1).activity;
            div1.innerHTML = "Activity: " + getActivity;

            var getTime = getTodoById(1).time;
            div2.innerHTML = "Date of the activity: " + getTime;

            var getDate = getTodoById(1).date;
            div3.innerHTML = "Time of the activity: " + getDate;

            var getPrice = getTodoById(1).price;
            div4.innerHTML = "Price of the activity: " + getPrice;

            var getChild = getTodoById(1).child;
            div5.innerHTML = "Is is a child or adult activity: " + getChild;

            var getInside = getTodoById(1).inside;
            div6.innerHTML = "Is the activity inside or outside: " + getInside;


        }
        */
        //New DN code to add objects to list
        console.log("todos is " + todos.length);
        for (let i = 0; i < todos.length; i++) {
            var newId = todos[i].id;
            var newAName = todos[i].activity;
            var newADate = todos[i].date;
            var newATime = todos[i].time;
            var newAPrice = todos[i].price;
            var newAChild = todos[i].child;
            var newAInside = todos[i].inside;
            var newADone = todos[i].done;
            let listObject = new ActivityObject(newId, newAName, newADate, newATime, newAPrice, newAChild, newAInside, newADone);
            allActivities.push(listObject);
            DocumentHandler.addToList(listObject);

        }
        /* for(let i=0;i<todos.length;i++) {
             if(getTodoById(i+2)){
                 var newAName = getTodoById(i+2).activity;
                 var newADate = getTodoById(i+2).date;
                 var newATime = getTodoById(i+2).time;
                 var newAPrice = getTodoById(i+2).price;
                 var newAChild = getTodoById(i+2).child;
                 var newAInside = getTodoById(i+2).inside;
     
                 let listObject = new ActivityObject(newAName, newADate, newATime, newAPrice, newAChild, newAInside);
                 allActivities.push(listObject);
                 DocumentHandler.addToList(listObject);
             }
         } */

    }

    function saveTodo(activity, time, date, price, child, inside) {

        let maxId = 0
        for (const i in todos) {
            const todo = todos[i];
            if (todo.id > maxId) {
                maxId = todo.id;
            }

        }
        const todo = {
            id: maxId + 1,
            activity: activity,
            time: time,
            date: date,
            price: price,
            child: child,
            inside: inside,
            done: false
        }

        todos.push(todo);

        saveChanges();
    }

    function listTodos() {
        return todos;
    }

    function updateTodo(newId) {
        console.log("1");
       // for (let i in todos == newId) {
           for(let i=0;i<todos.length;i++) {
            if (todos[i].id == newId) {
                console.log("Trying to change to true");
                todos[i].done = true;
                //todos[i].description = description;
            }

        }
        saveChanges();
    }

    function getTodoById(id) {
        for (const i in todos) {
            const todo = todos[i];

            if (todo.id === id) {
                return todo;
            }

        }
        return null;
    }

    function deleteTodoById(id) {
        for (const i in todos) {
            const todo = todos[i];

            if (todo.id == id) {
                todos.splice(i, 1);
                break;
            }
        }

        saveChanges();
    }

    function saveChanges() {
        const lsTodos = JSON.stringify(todos)
        localStorage.setItem('TODOS', lsTodos);
    }



    return { init, saveTodo, listTodos, getTodoById, updateTodo, deleteTodoById };
})();






