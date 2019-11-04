var EventHandlers = (function () {
    function init() {
        $("#sign-in-button").click(SignInModul.signInPop);
        $("#close-signin").click(SignInModul.signInClose);
        $("#make-users").click(TestModule.createRandomUserObjects);
        $("#submit-password").click(SignInModul.checkPassword);
        $("#reg-new-user-button").click(NewUserModul.newUserPop);
        $("#close-new-user").click(NewUserModul.newUserClose);
        $("#new-user-request-button").click(NewUserModul.makeNewUser);
        $("#go-to-traveltodo").click(goToTravelTodo);
        $("#signout-button").click(signOut);
        $("#forgot-password").click(SignInModul.forgotPasswordPop);
        $("#close-forgot-password").click(SignInModul.forgotPasswordClose);
        $("#forgot-password-send").click(SignInModul.getPassword);
        $("#make-changes-button").click(UserManager.changeUserInfo);
        $("#change-password-button").click(UserManager.changePasswordPop);
        $("#close-change-password").click(UserManager.changePasswordClose);
        $("#make-change-request").click(UserManager.changeUserPassword);
    }


    return { init }
})();

//if there is userKey go to user manager



function goToTravelTodo(){
    console.log("TravelTODO");
    //Apply code to continue to travels
    //Make connection with Jonas page
}

function signOut(){
    console.log("SIgnOut");
    //hide user manager popup and delete userKey
}

var TestModule = (function () {

    function randomNr() {
        let rnd = Math.floor(Math.random() * 8);
        return rnd;
    }
    function createRandomUserObjects() {
        $("#make-users").hide();
        var randFirstNames = ["Erika", "Niklas", "Anna", "Maria", "Ludde", "Alex", "Stina", "Ture"];
        var randLastNames = ["Hallberg", "Olsson", "Johansson", "Svensson", "Franzén", "Blixt", "Dunder", "Nyqvist"];
        var randMails = ["sendme@hotmail.com", "", "min@mail.com", "", "testar@mail.com", "", "", "snigel@mail.com"];

        for (let i = 1; i < 5; i++) {
            UserStorage.saveNewUser("test" + i, "pass", randFirstNames[randomNr()], randLastNames[randomNr()], randMails[randomNr()])
        }
    }
    return {
        createRandomUserObjects,
    }
})();


var SignInModul = (function () {
    function forgotPasswordPop(){
        event.preventDefault();
        $("#sign-in-pop").hide();
        $("#forgot-password-popup").show();
    }
    function forgotPasswordClose(){
        event.preventDefault();
        $("#forgot-password-popup").hide();
        $("#sign-in-pop").show();
    }
    function signInClose() {
        event.preventDefault();
        $("#first-page-modal").hide();
        $("#sign-in-pop").hide()
    }
    function signInPop() {
        event.preventDefault();
        $("#first-page-modal").show();
        $("#sign-in-pop").show();
    }
    function checkPassword() {
        event.preventDefault();
        let index = -1;
        let userInput = document.getElementById("username-input").value;
        let passwordInput = document.getElementById("password-input").value;
        travelUsers = JSON.parse(localStorage.getItem("travelUsers"));
        if (travelUsers === null) { travelUsers = [] };

        for (let i in travelUsers) {
            if (travelUsers[i].userName === userInput && travelUsers[i].password === passwordInput) {
                index = i;
                break;
            }
        }
        if (index === -1) {
            alert("felaktigt användarnamn eller lösenord!");
            return;
        }

        localStorage.setItem("userKey", JSON.stringify(travelUsers[index].ID))

        $("#password-input").val("");

        goToTravelTodo();
        
    }

    function getPassword(){
        event.preventDefault();
        console.log("get password!!")
        //check username input and see if user has email then send alert..
    }
    return {
        signInPop,
        signInClose,
        checkPassword,
        getPassword,
        forgotPasswordClose,
        forgotPasswordPop,
    }
})();

var NewUserModul = (function () {
    function newUserPop() {
        event.preventDefault();
        $("#first-page-modal").show();
        $("#new-user-pop").show();
    }
    function newUserClose() {
        event.preventDefault();
        $("#first-page-modal").hide();
        $("#new-user-pop").hide();
    }

    function makeNewUser() {
        event.preventDefault();
        travelUsers = JSON.parse(localStorage.getItem("travelUsers"));
        if (travelUsers === null) { travelUsers = [] };

        var newUserName = $("#new-firstname-input").val()
        var newPassword = $("#new-password-input").val()
        var repeatPassword = $("#repeat-password-input").val()

        for (let user of travelUsers) {
            if (user.userName === newUserName) {
                alert("username already exicts");
                return;
            }
        }
        if (newPassword !== repeatPassword) {
            alert("password doesnt match");
            return;
        }
        UserStorage.saveNewUser(newUserName, newPassword, "", "", "");

        UserManager.userInfoManager()

    }
    return {
        newUserPop,
        newUserClose,
        makeNewUser,

    }
})();

var UserManager = (function () {
    function changePasswordPop(){
        event.preventDefault();
        $("#change-user-popup").hide();
        $("#change-password-popup").show();
    }
    function changePasswordClose(){
        event.preventDefault();
        $("#change-password-popup").hide();
        $("#change-user-popup").show();
    }



    function userInfoManager() {
        $("#first-page-modal").show();
        $("#new-user-pop").hide();
        $("#sign-in-pop").hide();
        $("#forgot-password-popup").hide();
        $("#change-password-popup").hide();
        $("#change-user-popup").show();

        userkey = JSON.parse(localStorage.getItem("userKey"))
        travelUsers = JSON.parse(localStorage.getItem("travelUsers"))
        for(let user of travelUsers){
            if(userKey === user.ID){
                $("#change-username-input").val(user.userName);
                $("#change-firstname-input").val(user.firstName);
                $("#change-lastname-input").val(user.lastName);
                $("#change-email-input").val(user.userMail);
            }
        }

    }
    function changeUserInfo(){
        event.preventDefault();
        console.log("change user input")
        //check info from input and make changes..

    }
    function changeUserPassword(){
        event.preventDefault();
        console.log("change user password")
        //check password input and make changes..
    }

    return {
        userInfoManager,
        changeUserInfo,
        changeUserPassword,
        changePasswordPop,
        changePasswordClose,
    }

})();

var UserStorage = (function () {

    var travelUsers = [];

    function init() {
        //maybe take this away, doesn't seem to receive localStorage every time..
        var travelUsers = JSON.parse(localStorage.getItem("travelUsers"));
        if (travelUsers === null) {
            travelUsers = [];
            $("#make-users").show();
        }
    }

    function saveNewUser(newUserName, newPassword, newFirstName, newLastName, newUserMail) {
        var maxId = 0;
        travelUsers = JSON.parse(localStorage.getItem("travelUsers"));
        if (travelUsers === null) { travelUsers = [] };

        for (let i in travelUsers) {
            if (travelUsers[i].ID > maxId) { maxId = travelUsers[i].ID }
        }

        var newUserObject =
        {
            ID: maxId + 1,
            userName: newUserName,
            password: newPassword,
            firstName: newFirstName,
            lastName: newLastName,
            userMail: newUserMail,
            travels: []
        };

        userKey = newUserObject.ID;
        localStorage.setItem("userKey", JSON.stringify(userKey));
        travelUsers.push(newUserObject);
        saveChanges();
    }

    function saveChanges() {
        localStorage.setItem("travelUsers", JSON.stringify(travelUsers));
    }
    function listUsers() {
        //This function doesn't work
        //sends empty array when page has reloaded        
        return travelUsers;
    }

    return {
        init,
        saveNewUser,
        saveChanges,
        listUsers
    }

})();

$(document).ready(function () {
    UserStorage.init();
    EventHandlers.init();
});