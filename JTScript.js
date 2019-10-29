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
    
    
}


//travelLocations;
///////////////////////////////////////////////
// Konsol kommandon:
// window.localStorage.getItem("itemsArray");
// window.localStorage.clear();
/////////////////////////////////////////////
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