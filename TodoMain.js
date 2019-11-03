/* From AH code
function openForm() {
    document.getElementById("createActivity").style.display = "block";
}

function closeForm() {
    document.getElementById("createActivity").style.display = "none";
} */
/*
    To be fixed:
    * Skapa ett objekt som innehåller alla datatyper vi ska ha OK
    * Skapa en lista som visar delar av denna info OK
    * Gör den klickbar för att visa mer info i en popup samt ändra info OK
    * Gör den klickbar, dvs. man kan klarmarkera activities OK
    * Klickruta för att visa/dölja färdiga activities OK
    * Spara ner i LocalStorage 
    * Ladda från LS när man öppnar sidan 
    * 
    * DEBUG: Skapa en funktion som skapar exempelobjekt
    * 
    * Extra:
    * Väderfunktionaliteten
*/

var masterID = 0;

function MasterIDHandler(shouldAdd) {
    if(shouldAdd === true) {
        masterID += 1;
        return masterID;
    } else {
        return masterID;
    }
}

function ActivityObject(newName, newDate, newTime, newPrice, isChildActivity, isInside) {
    this.id = MasterIDHandler(true);
    this.activityName = 'Activity ' + this.id;
    this.date = newDate;
    this.time = newTime;
    this.price = newPrice;
    this.childActivity = isChildActivity;
    this.insideActivity = isInside;
    this.done = false;

    DocumentHandler.removeFromSpendingMoney(newPrice);
}

var allActivities = [];
var spendingMoney = 15000;
var debugVariable1;
var debugVariable2;

//Debug functionality to be removed!
var Debug = (function() {
    //Create a new activity for debug purpose
    function debugCreateActivity() {
        //Create a new name starting from 1
        let newName = "";

        const date = new Date();
        const month = date.getMonth() + 1;
        let newDate = date.getDate() + "/" + month + "/" + date.getFullYear();
        let newTime = date.getHours() + ":" + date.getMinutes();
        let price = 1000;
        let childActivity = false;
        let insideActivity = false;
        let newId = 0;

        const newActivity = new ActivityObject(newName, newDate, newTime, price, childActivity, insideActivity);
        allActivities.push(newActivity);
        DocumentHandler.addToList(newActivity);
    }

    return { debugCreateActivity }
})();

//Everything related to showing the activities
var DocumentHandler = (function() {

    //The first function to be run with all the initialazing code
    function init() {
        const addDebugButton = document.getElementById("create-debug-data");
        addDebugButton.addEventListener("click", Debug.debugCreateActivity);

        //Show all checkbox
        const showHiddenListItems = document.getElementById("show-all");
        showHiddenListItems.addEventListener("click", function() {
            if(showHiddenListItems.checked === true) {
                for(let i=0;i<allActivities.length;i++) {
                    if(allActivities[i].done == true) {
                        n = Number(i + 1);
                        let liToShow = document.getElementById("activity"+(n));
                        console.log(liToShow);
                        $(liToShow).show();
                    }
                }
            } else {
                for(let i=0;i<allActivities.length;i++) {
                    if(allActivities[i].done === true) {
                        let liToShow = document.getElementById("activity"+(i+1));
                        $(liToShow).hide();
                    }
                }
            }
        });

        const spendingMoneyLbl = document.getElementById("spending-money");
        spendingMoneyLbl.innerHTML = spendingMoney;
    }

    //add to list of activities
    function addToList(newActivity) {
        const listOfActivities = document.getElementById("list-of-activities");
        let buttonId = "remove" + (allActivities[allActivities.length-1].id);
        console.log(buttonId);
        let stringToShow = newActivity.activityName + " " + newActivity.date + " " + newActivity.price + ",-";
        var container = document.createElement('div');
        container.innerHTML += ("<li id='activity" + (allActivities[allActivities.length-1].id) + "'><input type='checkbox' id='checkIsDone" + (allActivities[allActivities.length-1].id) + "'>" + stringToShow + "<button id=" + buttonId + ">Remove Item</button></li");
        listOfActivities.appendChild(container);
        $("li").click(function() {
            alert("Populate Alexanders popup for changes!"); //Bugs out but should instead populate
        }).children().click(function(e) {
            return false; 
        })

        $("#checkIsDone" + (allActivities[allActivities.length-1].id)).click(function() {          
            let activityNumber = String($(this)[0].id).replace(/[^0-9]/g, '');
            console.log("click " + String($(this)[0].id).replace(/[^0-9]/g, ''));
            $("#activity"+activityNumber).hide("slow");
            //allActivities[activityNumber-1].done = true;
            for(let i=0;i<allActivities.length;i++) {
                if(allActivities[i].id == activityNumber) {
                    allActivities[i].done = true;
                    break;
                }
            }  
        })

        $("#"+buttonId).click(function() {
            let activityNumber = String($(this)[0].id).replace(/[^0-9]/g, '');
            $("#activity"+activityNumber).hide("slow");
            let activityToBeRemoved;
            for(let i=0;i<allActivities.length;i++) {
                if(allActivities[i].id == activityNumber) {
                    addToSpendingMoney(allActivities[i].price);
                    allActivities.splice(i, 1);
                    break;
                }
            }  

        })
    }

    //Remove from spending money
    function removeFromSpendingMoney(sumToRemove) {
        spendingMoney -= sumToRemove;
        const spendingMoneyLbl = document.getElementById("spending-money");
        spendingMoneyLbl.innerHTML = spendingMoney;
    }

    //Add to spending money
    function addToSpendingMoney(sumToBeAdded) {
        spendingMoney += sumToBeAdded;
        const spendingMoneyLbl = document.getElementById("spending-money");
        spendingMoneyLbl.innerHTML = spendingMoney;        
    }


    return { 
        init,
        addToList,
        removeFromSpendingMoney
    }
})();

//ORM - Object Resource Manager


//Run code when the DOM has loaded.
window.addEventListener("DOMContentLoaded", DocumentHandler.init);

