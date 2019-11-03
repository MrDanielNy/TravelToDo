function openForm() {
    document.getElementById("createActivity").style.display = "block";
}

function closeForm() {
    document.getElementById("createActivity").style.display = "none";
}



const inputActivity = document.getElementById("inputActivity");
const inputDate = document.getElementById("inputDate");
const inputTime = document.getElementById("inputTime");
const inputNumber = document.getElementById("inputNumber");
const inputChild = document.getElementById("inputChild");
const inputInside = document.getElementById("inputInside");

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

    const activity = inputActivity.value;
    const date = inputDate.value;
    const time = inputTime.value;
    const number = inputNumber.value;
    let inside = "";
    let child = "";

    if (inputChild.checked == true) {
        child = "Child";
    }
    else {
        child = "Adult"
    }

    if (inputInside.checked == true) {
        inside = "Inside";
    }
    else {
        inside = "Outside"
    }



    setActivity = activity;
    setTime = time;
    setDate = date;
    setNumber = number;
    setChild = child;
    setInside = inside;


    if (date && time && number && activity) {
        
        TODOStorage.deleteTodoById(1)
        TODOStorage.saveTodo(setActivity, setTime, setDate, setNumber, setChild, setInside);
    }



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


function callLog() {

    console.log(setTime);
    localStorage.setItem("Time:", setTime)
    localStorage.setItem("Date:", setDate)
}

if (localStorage.length != 0) {



}


var TODOStorage = (function () {
    var todos = [];

    function init() {
        const lsTodos = localStorage.getItem('TODOS');
        todos = JSON.parse(lsTodos)

        if (todos === null) {
            todos = [];
        }
        console.log("funkar")
        if ( getTodoById(1)) {

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
            inside: inside
        }

        todos.push(todo);

        saveChanges();
    }

    function listTodos() {
        return todos;
    }

    function updateTodo() {
        for (const i in todos === id) {
            if (todos[i].id === id) {
                todos[i].done = done;
                todos[i].description = description;
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

            if (todo.id === id) {
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


document.addEventListener('DOMContentLoaded', function () {
    TODOStorage.init();

})