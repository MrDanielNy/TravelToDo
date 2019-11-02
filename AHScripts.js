//Hejsan
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

    
    //localStorage.setItem('testObject', JSON.stringify(testObject));

    if (date && time && number && activity) {
        console.log(setTime);
        localStorage.clear();
        localStorage.setItem("Activity", JSON.stringify(setActivity));
        localStorage.setItem("Time", JSON.stringify(setTime));
        localStorage.setItem("Date", JSON.stringify(setDate));
        localStorage.setItem("Price", JSON.stringify(setNumber));
        localStorage.setItem("Child", JSON.stringify(setChild));
        localStorage.setItem("Inside", JSON.stringify(setInside));

       
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

if (localStorage.length !=0) {

    var getActivity = localStorage.getItem('Activity');
    div1.innerHTML = "Activity: " + JSON.parse(getActivity);
    
    var getDate = localStorage.getItem('Date');
    div2.innerHTML = "Date of the activity: " + JSON.parse(getDate);
    
    var getTime = localStorage.getItem('Time');
    div3.innerHTML = "Time of the activity: " + JSON.parse(getTime);
    
    var getPrice = localStorage.getItem('Price');
    div4.innerHTML = "Price of the activity: " + JSON.parse(getPrice);
    
    var getChild = localStorage.getItem('Child');
    div5.innerHTML = "Is is a child or adult activity: " + JSON.parse(getChild);
    
    var getInside = localStorage.getItem('Inside');
    div6.innerHTML = "Is the activity inside or outside: " + JSON.parse(getInside);
    
}









