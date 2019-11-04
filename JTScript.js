var j = 0;
var dateTime = new Date;
//var travelLocation = [{Place: "", Datum: ""}];
//var travelLocation = [];
///var travelLocation = JSON.parse(localStorage.getItem("reason")) || [];

//var travelLocations = JSON.parse(localStorage.getItem('itemsArray')) || [];
var datum = dateTime.toLocaleDateString();

function myFunction() {
  //Skriv ut varje gång knappen klickas
  var usersList = document.getElementById("travel-list");
  var input = document.getElementById("input").value;
  usersList.innerHTML += "<p>" + input + " " + datum + "</p>";
  //Lagra varje klick i en objekt-lista
  TODOStorage.saveTodo(input, datum);


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
  var a = usersList.getElementsByTagName('p');
  //console.log(a);
  for (var i = 0; i < a.length; i++) {
    a[i].onclick = function () {
      alert(this.innerHTML);
    }
  }

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
///
function skriv() {
  var j=0;
  for (const i in todos) {
    j++;
    document.getElementById("travel-list").innerHTML += "<p>" +  TODOStorage.getTodoById(j).done + " " + TODOStorage.getTodoById(j).description + "</p>";
  }
}
///
  
  function saveTodos() {
    const lsTodos = JSON.stringify(todos);
    localStorage.setItem("TODOS", lsTodos);
  }

  return { init, saveTodo, getTodoById, skriv }

})();

document.addEventListener("DOMContentLoaded", function name() {
  TODOStorage.init();
  TODOStorage.skriv();
});