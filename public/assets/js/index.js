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
});