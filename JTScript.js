<<<<<<< Updated upstream
var i = 0;
var dateTime = new Date;
//var travelLocation = [{Place: "", Datum: ""}];
//var travelLocation = [];
var travelLocation = JSON.parse(localStorage.getItem("reason")) || [];


//var travelLocations = JSON.parse(localStorage.getItem('itemsArray')) || [];
var datum=dateTime.toLocaleDateString();

function myFunction() {
    //Skriv ut varje gång knappen klickas
    var usersList = document.getElementById("travel-list");
    
    usersList.innerHTML += "<p>" + "Resa" + i++ + " " + datum + "</p>";
    //Lagra varje klick i en objekt-lista (heter det så??)
    //for (let index = 0; index < localStorage.length; index++) {
        //const element = array[index];
      //  if (JSON.parse(window.localStorage.getItem('itemsArray').Place) != ("Resa" + i)) {
        //    travelLocation.push({Place: "Resa"+i});
          //  travelLocation.push({Datum: datum});
       // }
        travelLocation.push({Place: "Resa"+i});
        travelLocation.push({Datum: datum});
        localStorage.setItem('reason', JSON.stringify(travelLocation));
    //}
        
   // localStorage.setItem('itemsArray', JSON.stringify(travelLocation)
    
    //travelLocations.push(travelLocation);
    
    
=======
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
  usersList.innerHTML += "<p>" + "Resa" + j++ + " " + datum + "</p>";
  //Lagra varje klick i en objekt-lista
  TODOStorage.saveTodo("Resa" + j, datum);
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
  console.log(a);
  for (var i = 0; i < a.length; i++) {
    a[i].onclick = function () {
      alert(this.innerHTML);
    }
  }

>>>>>>> Stashed changes
}


//travelLocations;
///////////////////////////////////////////////
// Konsol kommandon:
// window.localStorage.getItem("itemsArray");
// window.localStorage.clear();
/////////////////////////////////////////////
<<<<<<< Updated upstream
//var list = function(travelLocations) {
    
  //  for (var location in travelLocations) {
    //    window.localStorage.setItem('user', JSON.stringify(location));
      
   // }
   
 // }
  //list(travelLocations);
//alert(travelLocations);
//localStorage.setItem("user", JSON.stringify(travelLocations));
//function addUser(name) {
  //  const usersList = document.getElementById("users-list");
    //usersList.innerHTML += "<li>" + name + " - " + email + "</li>"
//}
//return { addUser }
//alert("Hello");
=======

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

  function saveTodos() {
    const lsTodos = JSON.stringify(todos);
    localStorage.setItem("TODOS", lsTodos);
  }

  return { init, saveTodo }

})();

document.addEventListener("DOMContentLoaded", function name() {
  TODOStorage.init();
});
>>>>>>> Stashed changes
