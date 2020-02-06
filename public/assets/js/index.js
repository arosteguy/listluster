$(document).ready(function(){ 
    function showSignIn() {
        $("#signInInfo").show();
        $("#signUpInfo").hide();
    }
    
    function showCreateAccount() {
        $("#signUpInfo").show();
        $("#signInInfo").hide();
    }
    
    $("#signIn").click(function(event) {
        event.preventDefault();
        showSignIn();
    });

    $("#createAccount").click(function(event) {
        event.preventDefault();
        showCreateAccount();
    });

    $("#signUpInfo").on("submit", function(event) {
        event.preventDefault();

        const userInfo = {
            email: $("#signUpEmail").val().trim(),
            password: $("#signUpPassword").val().trim()
        }

        $.post("/api/signup", userInfo, function(response) {
            alert(`Signed up user ${userInfo.email}!`)
            location.href = "/members";
        });
    });

    $("#signInInfo").on("submit", function(event) {
        event.preventDefault();

        const userInfo = {
            email: $("#signInEmail").val().trim(),
            password: $("#signInPassword").val().trim()
        }

        $.post("/api/login", userInfo, function(response) {
            alert(`Signed in user ${userInfo.email}!`)
            location.href = "/members";
        });
    });
});

