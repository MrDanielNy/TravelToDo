var EventHandlers = (function () {

    function init() {

        //Button for signing in to travelsite
        const signInButton = document.getElementById("sign-in-button");
        signInButton.addEventListener("click", onClickSignInButton)
        //Button for register new user
        const registerButton = document.getElementById("register-button");
        registerButton.addEventListener("click", onClickRegisterButton)
        //Button for go to new user register
        const regNewUserButton = document.getElementById("new-reg-button");
        regNewUserButton.addEventListener("click", onClickNewUserButton);
        //Button to go back to sign in user from register user
        const abortRegButton = document.getElementById("abort-reg-button");
        abortRegButton.addEventListener("click", onClickAbortRegButton);
        //Button if user forgot password and can receive new one
        const forgotPasswordButton = document.getElementById("forgot-password-button");
        forgotPasswordButton.addEventListener("click", onClickForgotPasswordButton);
        //Button to send username and receive password
        const sendPasswordButton = document.getElementById("send-password-button")
        sendPasswordButton.addEventListener("click", onClickSendPasswordButton);
        //Button for testing
        const createUserButton = document.getElementById("create-user-button");
        createUserButton.addEventListener("click", onClickCreateUserButton);
        //Button to return to sign-in from forgot
        const backFromForgotButton = document.getElementById("back-from-forgot-button");
        backFromForgotButton.addEventListener("click", onClickBackFromForgotButton);
        //Button to sign out from site
        const signOutButton = document.getElementById("sign-out-button");
        signOutButton.addEventListener("click", onClickSignOutButton);
        //Button to return to traveltodo from user manager
        const backFromManagerButton = document.getElementById("back-from-manager-button");
        backFromManagerButton.addEventListener("click", onClickBackFromManagerButton);
        //Button to go to user manager from traveltodo
        const gotoUserManagerButton = document.getElementById("goto-user-manager-button");
        gotoUserManagerButton.addEventListener("click", onClickGotoUserManagerButton);

    }

    function onClickGotoUserManagerButton() {
        document.getElementById("test-div").style.display = "none";
        document.getElementById("user-manager-id").style.display = "block";
        UserManager.showUserData();
    }

    function onClickBackFromManagerButton() {
        //might put code to reset manager input first here..
        document.getElementById("user-manager-id").style.display = "none";
        document.getElementById("test-div").style.display = "block";
    }

    function onClickSignOutButton() {
        //reset the userID
        userID = 0;
        document.getElementById("test-div").style.display = "none";
        document.getElementById("sign-in").style.display = "block";
    }

    function onClickBackFromForgotButton() {
        for (let element of document.getElementsByClassName("login-site")) element.style.display = "none";
        document.getElementById("sign-in").style.display = "block";
    }

    function onClickCreateUserButton() {
        //this function will be deleted later
        TestModule.createRandomUserObject();
    }

    function onClickSendPasswordButton() {
        //send password with alert
        UserSignIn.receivePassword();
    }

    function onClickForgotPasswordButton() {
        //go to forgot password and show userInput value if any
        document.getElementById("forgetfull-user").value = document.getElementById("user-name").value;
        //for...of reads the value in every key
        for (let element of document.getElementsByClassName("login-site")) element.style.display = "none";
        document.getElementById("forgot-password").style.display = "block";
    }

    function onClickAbortRegButton() {
        //go back to sign in
        for (let element of document.getElementsByClassName("login-site")) element.style.display = "none";
        document.getElementById("sign-in").style.display = "block";
    }

    function onClickNewUserButton() {
        //go to register new user
        for (let element of document.getElementsByClassName("login-site")) element.style.display = "none";
        document.getElementById("register").style.display = "block";
    }

    function onClickRegisterButton() {
        //if data is correct we will later go to traveltodo
        UserSignIn.checkRegister()
    }

    function onClickSignInButton() {
        //check if user name and password fit and if so later go to travelsite
        UserSignIn.checkSignIn();
    }

    return { init }

})();

//create an array if local storage is empty
//experementing with 'this' to make a global typeof
if (localStorage.getItem("users") === null) {
    this.users = [];
}
else {
    this.users = JSON.parse(localStorage.getItem("users"));
}

//create a variable to store userID when successfully sign in to traveltodo
//var userID = 0;

//console.log("show userID in window modul =>  " + userID)
//testing
//Module only for createing new users to the program..
//This is not necessary later on
var TestModule = (function () {

    var testFirstNames = ["Erik", "Mikael", "Anna", "Maria", "Ludde", "Alex", "Stina", "Ture"];
    var testLastNames = ["Sundqvist", "Olsson", "Johansson", "Svensson", "Franzén", "Blixt", "Dunder", "Nyqvist"];
    var testMails = ["sendme@hotmail.com", "", "min@mail.com", "", "testar@mail.com", "", "", "snigel@mail.com"];

    function randomNr() {
        let rnd = Math.floor(Math.random() * 8);
        return rnd;
    }

    function createRandomUserObject() {


        let idNr = users.length + 1;
        let newFirstName = testFirstNames[randomNr()];
        let newLastName = testLastNames[randomNr()];
        let newUserMail = testMails[randomNr()];
        let newUserObject =
        {
            ID: idNr,
            firstName: newFirstName,
            lastName: newLastName,
            userName: String(idNr),
            userMail: newUserMail,
            password: "password",
        };

        users.push(newUserObject);

        localStorage.setItem("users", JSON.stringify(users));
    }

    return { createRandomUserObject, }

})();

//console.log("show userID in TestModule before handling =>  " + userID);

//Module for managing sign in
var UserSignIn = (function () {

    //var userID = 0;

    //console.log("show userID in UserModule before handling  =>  " + userID);



    function receivePassword() {
        let forgetfullUser = document.getElementById("forgetfull-user").value;
        for (let i in users) {
            if (users[i].userName === forgetfullUser && users[i].userMail !== "") {
                alert("Hej " + users[i].firstName + " " + users[i].lastName + "!\n"
                    + "Ditt lösenord är: " + users[i].password)
                break;
            }
        }
        document.getElementById("forgetfull-user").value = "";
    }

    function checkRegister() {

        let newFirstName = document.getElementById("add-first-name").value;
        let newLastName = document.getElementById("add-last-name").value;
        let newEmail = document.getElementById("add-email").value;
        let newUser = document.getElementById("add-user-name").value;
        let newPassword = document.getElementById("add-password").value;
        let repeatPassword = document.getElementById("repeat-password").value;

        let newUserArray = [newFirstName, newLastName, newEmail, newUser, newPassword, repeatPassword];
        let register = true;

        //if user haven't filled in all necessary input
        for (let i in newUserArray) {

            if (newUserArray[i] !== "") {
                document.getElementById("fail-" + i).innerText = "";
            }
            else if (newUserArray[i] === "" && i !== "2") {
                document.getElementById("fail-" + i).innerText = "Du har missat att fylla i denna post..";
                register = false;
            }
        }
        //if there is already a user with the same username
        for (let i in users) {
            if (users[i].userName === newUser) {
                register = false;
                document.getElementById("fail-3").innerText = "Det finns redan en användare med detta namn";
                break;
            }
        }
        //if users passwords isn't the same
        if (newUserArray[4] !== newUserArray[5] && newUserArray[4] !== "") {
            register = false;
            document.getElementById("fail-5").innerText = "Ditt lösenord matchar inte";
        }
        //if all input is correct create new user with parameters from input and store
        if (register) {
            //no reason to add user ID exept try objects with different types of var
            //or maybe for creating advanced keys in future (in my dreams...)

            let newUserObject = {

                ID: users.length + 1,
                firstName: newFirstName,
                lastName: newLastName,
                userName: newUser,
                userMail: newEmail,
                password: newPassword,

            }

            users.push(newUserObject)
            localStorage.setItem("users", JSON.stringify(users));

            //hide login-site and
            //later we will go to traveltodo
            for (let element of document.getElementsByClassName("login-site")) element.style.display = "none";
            document.getElementById("test-div").style.display = "block";
            //reset reg-inputbuttons
            for (let element of document.getElementsByClassName("reg-input")) element.value = "";

            let index = users.length - 1;

            //console.log("index in reg   =>  " + index);

            //alertbutton might remove...
            alert("Välkommen " + users[index].firstName + " " + users[index].lastName + "!\n"
                + "Ditt användarnamn är: " + users[index].userName + "\n"
                + "Ditt lösenord är: " + users[index].password)

            //set userID
            let userIDkeyhtml = document.getElementById("user-id-key")
            userIDkeyhtml.innerText = String(users[index].ID)


            //this is just testing.. I got stuck here
            /*
            userIdtest = users[index].ID;
            console.log("user[index].ID in reg =>  " + users[index].ID);
            console.log("userID in register    =>  " + userIDtest);
            */
            TestarLite.loginSuccessFull();

        }
        //maybe put code if register fails here...
    }


    function checkSignIn() {
        //index for users, -1 if no users or user not found/match
        let index = -1;

        let userInput = document.getElementById("user-name").value;
        let passwordInput = document.getElementById("password").value;
        //remove password from input
        document.getElementById("password").value = "";

        for (let i in users) {
            if (users[i].userName === userInput && users[i].password === passwordInput) {
                index = i;
                break;
            }
        }

        //some cool code I might use later...
        //index = users.findIndex(function (user) {return user.userName === userInput});

        if (index === -1) {
            alert("felaktigt användarnamn eller lösenord!");
        }
        else {
            //hide sign-in and
            //later we will go to traveltodo
            document.getElementById("sign-in").style.display = "none";
            document.getElementById("test-div").style.display = "block";

            //set userID
            let userIDkeyhtml = document.getElementById("user-id-key")
            userIDkeyhtml.innerText = String(users[index].ID)

            userIDtest = users[index].ID;
            console.log("userID in sign in   =>   " + userIDtest);
            TestarLite.loginSuccessFull();
        }
        //maybe write code to change page if sign in is unsuccessful here
    }

//testar git

    return {
        checkRegister,
        checkSignIn,
        receivePassword,
    }


})();

//modul for handle users
var UserManager = (function () {

    //some variables...
    var showUserFirstname = document.getElementById("show-user-firstname");
    var showUserLastname = document.getElementById("show-user-lastname");
    var showUserEmail = document.getElementById("show-user-email");
    var showUserUsername = document.getElementById("show-user-username");


    function showUserData() {
        let userIDkeyhtml = document.getElementById("user-id-key")
        userIDkey = Number(userIDkeyhtml.innerText)

        var index = users.findIndex(function (user) { return user.ID === userIDkey });

        for (let element of document.getElementsByClassName("changing-data")) element.style.display = "none";
        document.getElementById("change-user-data").style.display = "block";

        showUserFirstname.value = users[index].firstName;
        showUserLastname.value = users[index].lastName;
        showUserEmail.value = users[index].userMail;
        showUserUsername.value = users[index].userName;

    }

    return {
        showUserData,
    }
})();

//this is my traveltodo-site just for fun....
var TestarLite = (function () {

    var signInSuccess = document.getElementById("sign-in-success");

    function loginSuccessFull() {

        console.log("userID in TestarLite  =>   " + userIDtest);
        let userIDkeyhtml = document.getElementById("user-id-key")
        userIDkey = Number(userIDkeyhtml.innerText)


        let index = users.findIndex(function (user) { return user.ID === userIDkey });

        signInSuccess.innerText = "Välkommen "
            + users[index].firstName + " "
            + users[index].lastName + "!";

    }
    return { loginSuccessFull, }

})();


window.addEventListener("DOMContentLoaded", EventHandlers.init);