<<<<<<< Updated upstream
var j = 0;
=======
>>>>>>> Stashed changes
var dateTime = new Date;
//var travelLocation = [{Place: "", Datum: ""}];
//var travelLocation = [];
///var travelLocation = JSON.parse(localStorage.getItem("reason")) || [];

//var travelLocations = JSON.parse(localStorage.getItem('itemsArray')) || [];
var datum = dateTime.toLocaleDateString();
<<<<<<< Updated upstream

=======
userkey = 1;
>>>>>>> Stashed changes
function myFunction() {
  //Skriv ut varje gång knappen klickas
  var usersList = document.getElementById("travel-list");
  var input = document.getElementById("input").value;
<<<<<<< Updated upstream
  usersList.innerHTML += "<p>" + input + " " + datum + "</p>";
  //Lagra varje klick i en objekt-lista
  TODOStorage.saveTodo(input, datum);
=======

  //Om user input är tom läggs inget till listan
  if (input != "") {
    TODOStorage.saveTodo(input, datum);
    usersList.innerHTML += "<p>" + input + " " + datum + "</p>";
  }

  
  //Lagra varje klick i en objekt-lista
  //debugger;
>>>>>>> Stashed changes


  //Lagra varje klick i en objekt-lista (heter det så??)
  //for (let index = 0; index < localStorage.length; index++) {
  //const element = array[index];
  //  if (JSON.parse(window.localStorage.getItem('itemsArray').Place) != ("Resa" + i)) {
  //    travelLocation.push({Place: "Resa"+i});
  //  travelLocation.push({Datum: datum});
  // }
  ///travelLocation.push({ Place: "Resa" + j });
  ///travelLocation.push({ Datum: datum });
  ///localStorage.setItem('reason', JSON.stringify(travelLocation));
  //}

  // localStorage.setItem('itemsArray', JSON.stringify(travelLocation)

  //travelLocations.push(travelLocation);
  //Alert popup när resmål klickas
<<<<<<< Updated upstream
  var a = usersList.getElementsByTagName('p');
  //console.log(a);
  for (var i = 0; i < a.length; i++) {
    a[i].onclick = function () {
      alert(this.innerHTML);
    }
  }

=======
  ///var a = usersList.getElementsByTagName('p');
  //console.log(a);
  ///for (var i = 0; i < a.length; i++) {
  ///  a[i].onclick = function () {
  ///    alert(this.innerHTML);
  ///    console.log(TODOStorage.getTodoById(i));
  //TODOStorage.getTodoById(i);

  ///  }
  ///}

}

function signout() {
    window.document.location = "user-index.html"
>>>>>>> Stashed changes
}

//travelLocations;
///////////////////////////////////////////////
// Konsol kommandon:
// window.localStorage.getItem("itemsArray");
// window.localStorage.clear();
/////////////////////////////////////////////

var TODOStorage = (function () {
  var todos = [];

  function init() {
    //console.log("init");
    const lsTodos = localStorage.getItem("TODOS");
    todos = JSON.parse(lsTodos);

    if (todos === null) {
      todos = [];
    }
    //console.log("test");
  }
  ///
<<<<<<< Updated upstream
  
=======

>>>>>>> Stashed changes
  ///
  function saveTodo(done, description) {
    let maxId = 0;
    for (const i in todos) {
      const todo = todos[i];
      if (todo.id > maxId) {
        maxId = todo.id;

      }
    }
    //Create TODO object
    const todo = {
      id: maxId + 1,
<<<<<<< Updated upstream
=======
      userKey: userkey, 
>>>>>>> Stashed changes
      done: done,
      description: description
    }

    //Save new TODO to list
    todos.push(todo);
    //Save list to local storage
    saveTodos();
  }

  function getTodoById(id) {
    //var temp = document.getElementById("utskrift");
    for (const i in todos) {
      const todo = todos[i];
      if (todo.id === id) {
        return todo;
      }
      //temp.innerHTML += "<p>" +  TODOStorage.getTodoById(i).done + TODOStorage.getTodoById(i).description + "</p>";
    }
    return null;

  }
<<<<<<< Updated upstream
///
function skriv() {
  var j=0;
  for (const i in todos) {
    j++;
    document.getElementById("travel-list").innerHTML += "<p>" +  TODOStorage.getTodoById(j).done + " " + TODOStorage.getTodoById(j).description + "</p>";
  }
}
///
  
=======
  ///
  function skriv() {
    var j = 0;
    for (const i in todos) {
      j++;
      document.getElementById("travel-list").innerHTML += "<p>" + TODOStorage.getTodoById(j).done + " " + TODOStorage.getTodoById(j).description + "</p>";
    }
  }
  ///
  function skicka() {
    var a = document.getElementById("travel-list").getElementsByTagName('p');
    //console.log(a);
    for (const i in todos) {
      a[i].onclick = function () {
        //alert(this.innerHTML);
        TODOStorage.getTodoById(Number(i));
        //debugger;
        //j++;
        //TODOStorage.getTodoById(i);

      }
    }
  }
  ///
  function user() {
    document.getElementById("userName").innerHTML="jskdjfh";
  }
///
>>>>>>> Stashed changes
  function saveTodos() {
    const lsTodos = JSON.stringify(todos);
    localStorage.setItem("TODOS", lsTodos);
  }

<<<<<<< Updated upstream
  return { init, saveTodo, getTodoById, skriv }
=======
  return { init, saveTodo, getTodoById, skriv, skicka, user }
>>>>>>> Stashed changes

})();

document.addEventListener("DOMContentLoaded", function name() {
  TODOStorage.init();
  TODOStorage.skriv();
<<<<<<< Updated upstream
=======
  TODOStorage.skicka();
  TODOStorage.user();
>>>>>>> Stashed changes
});