$(document).ready(function () {


    // reach into the html, grab the button, assign to a var
    // var addButton = $('');
    // add a click event to that button .on .click
    // that click event should
    // reach into the html, grab the value of the add input box, assign it to variable
    // use concat todostring = todostring + 'input box variable' + ||
    // sanity checkou
    // Getting a reference to the input field where user adds a new todo

    var $newItemInput = $("input.new-item");
    // Our new todos will go inside the todoContainer
    var $todoContainer = $(".todo-container");
    // Adding event listeners for deleting, editing, and adding todos

    $(document).on("click", "#addButt", insertTodo);


    // create a click event for the save button
    // grabe the list name from the html
    // create and object that has 2 properties
    // list_name = the name of the list
    // list_items = todolist
    // sanity check
    // call the api route that you have set up to update the database and pass it that obj

    // This function inserts a new todo into our database and then updates the view


    getTodos();

    //     // This function resets the todos displayed with new todos from the database
    //     function initializeRows() {
    //       $todoContainer.empty();
    //       var rowsToAdd = [];
    //       for (var i = 0; i < todos.length; i++) {
    //         rowsToAdd.push(createNewRow(todos[i]));
    //       }
    //       $todoContainer.prepend(rowsToAdd);
    //     }

    //     // This function grabs todos from the database and updates the view
    function getTodos() {
        $.get("/api/lists", function (data) {
            todos = data;
            initializeRows();
        });
    }

    function initializeRows() {
        $todoContainer.empty();
        var rowsToAdd = [];
        for (var i = 0; i < todos.length; i++) {
            rowsToAdd.push(createNewRow(todos[i]));
        }
        $todoContainer.prepend(rowsToAdd);
    }

// This function constructs a todo-item row
    function createNewRow(todo) {
      var $newInputRow = $(
        [
          "<li class='list-group-item todo-item'>",
          "<span>",
          todo.text,
          "</span>",
          "<input type='text' class='edit' style='display: none;'>",
          "<button class='delete btn btn-danger'>x</button>",
          "<button class='complete btn btn-primary'>✓</button>",
          "</li>"
        ].join("")
      );

      $newInputRow.find("button.delete").data("id", todo.id);
      $newInputRow.find("input.edit").css("display", "none");
      $newInputRow.data("todo", todo);
      if (todo.complete) {
        $newInputRow.find("span").css("text-decoration", "line-through");
      }
      return $newInputRow;
    }





    function insertTodo(event) {
        event.preventDefault();
        var todo = {
            text: $newItemInput.val().trim(),
            complete: false
        };

        $.post("/api/lists", todo, getTodos);
        $newItemInput.val("");
    }




    function showSignIn() {
        $("#signInInfo").show();
        $("#signUpInfo").hide();
    }

    function showCreateAccount() {
        $("#signUpInfo").show();
        $("#signInInfo").hide();
    }

    $("#signIn").click(function (event) {
        event.preventDefault();
        showSignIn();
    });

    $("#createAccount").click(function (event) {
        event.preventDefault();
        showCreateAccount();
    });

    $("#signUpInfo").on("submit", function (event) {
        event.preventDefault();

        const userInfo = {
            email: $("#signUpEmail").val().trim(),
            password: $("#signUpPassword").val().trim()
        }

        $.post("/api/signup", userInfo, function (response) {
            alert(`Signed up user ${userInfo.email}!`)
            location.href = "/members";
        });
    });

    $("#signInInfo").on("submit", function (event) {
        event.preventDefault();

        const userInfo = {
            email: $("#signInEmail").val().trim(),
            password: $("#signInPassword").val().trim()
        }

        $.post("/api/login", userInfo, function (response) {
            alert(`Signed in user ${userInfo.email}!`)
            location.href = "/members";
        });
    });
});

// This function constructs a todo-item row
//     function createNewRow(todo) {
//       var $newInputRow = $(
//         [
//           "<li class='list-group-item todo-item'>",
//           "<span>",
//           todo.text,
//           "</span>",
//           "<input type='text' class='edit' style='display: none;'>",
//           "<button class='delete btn btn-danger'>x</button>",
//           "<button class='complete btn btn-primary'>✓</button>",
//           "</li>"
//         ].join("")
//       );

//       $newInputRow.find("button.delete").data("id", todo.id);
//       $newInputRow.find("input.edit").css("display", "none");
//       $newInputRow.data("todo", todo);
//       if (todo.complete) {
//         $newInputRow.find("span").css("text-decoration", "line-through");
//       }
//       return $newInputRow;
//     }





// $(document).ready(function() {
//     // Getting a reference to the input field where user adds a new todo
//     var $newItemInput = $("input.new-item");
//     // Our new todos will go inside the todoContainer
//     var $todoContainer = $(".todo-container");
//     // Adding event listeners for deleting, editing, and adding todos
//     $(document).on("click", "button.delete", deleteTodo);
//     $(document).on("click", "button.complete", toggleComplete);
//     $(document).on("click", ".todo-item", editTodo);
//     $(document).on("keyup", ".todo-item", finishEdit);
//     $(document).on("blur", ".todo-item", cancelEdit);
//     $(document).on("submit", "#todo-form", insertTodo);

//     // Our initial todos array
//     var todos = [];

//     // Getting todos from database when page loads
//     getTodos();

//     // This function resets the todos displayed with new todos from the database
//     function initializeRows() {
//       $todoContainer.empty();
//       var rowsToAdd = [];
//       for (var i = 0; i < todos.length; i++) {
//         rowsToAdd.push(createNewRow(todos[i]));
//       }
//       $todoContainer.prepend(rowsToAdd);
//     }

//     // This function grabs todos from the database and updates the view
//     function getTodos() {
//       $.get("/api/todos", function(data) {
//         todos = data;
//         initializeRows();
//       });
//     }

//     // This function deletes a todo when the user clicks the delete button
//     function deleteTodo(event) {
//       event.stopPropagation();
//       var id = $(this).data("id");
//       $.ajax({
//         method: "DELETE",
//         url: "/api/todos/" + id
//       }).then(getTodos);
//     }

//     // This function handles showing the input box for a user to edit a todo
//     function editTodo() {
//       var currentTodo = $(this).data("todo");
//       $(this).children().hide();
//       $(this).children("input.edit").val(currentTodo.text);
//       $(this).children("input.edit").show();
//       $(this).children("input.edit").focus();
//     }

//     // Toggles complete status
//     function toggleComplete(event) {
//       event.stopPropagation();
//       var todo = $(this).parent().data("todo");
//       todo.complete = !todo.complete;
//       updateTodo(todo);
//     }

//     // This function starts updating a todo in the database if a user hits the "Enter Key"
//     // While in edit mode
//     function finishEdit(event) {
//       var updatedTodo = $(this).data("todo");
//       if (event.which === 13) {
//         updatedTodo.text = $(this).children("input").val().trim();
//         $(this).blur();
//         updateTodo(updatedTodo);
//       }
//     }

//     // This function updates a todo in our database
//     function updateTodo(todo) {
//       $.ajax({
//         method: "PUT",
//         url: "/api/todos",
//         data: todo
//       }).then(getTodos);
//     }

//     // This function is called whenever a todo item is in edit mode and loses focus
//     // This cancels any edits being made
//     function cancelEdit() {
//       var currentTodo = $(this).data("todo");
//       if (currentTodo) {
//         $(this).children().hide();
//         $(this).children("input.edit").val(currentTodo.text);
//         $(this).children("span").show();
//         $(this).children("button").show();
//       }
//     }

//     // This function constructs a todo-item row
//     function createNewRow(todo) {
//       var $newInputRow = $(
//         [
//           "<li class='list-group-item todo-item'>",
//           "<span>",
//           todo.text,
//           "</span>",
//           "<input type='text' class='edit' style='display: none;'>",
//           "<button class='delete btn btn-danger'>x</button>",
//           "<button class='complete btn btn-primary'>✓</button>",
//           "</li>"
//         ].join("")
//       );

//       $newInputRow.find("button.delete").data("id", todo.id);
//       $newInputRow.find("input.edit").css("display", "none");
//       $newInputRow.data("todo", todo);
//       if (todo.complete) {
//         $newInputRow.find("span").css("text-decoration", "line-through");
//       }
//       return $newInputRow;
//     }

//     // This function inserts a new todo into our database and then updates the view
//     function insertTodo(event) {
//       event.preventDefault();
//       var todo = {
//         text: $newItemInput.val().trim(),
//         complete: false
//       };

//       $.post("/api/todos", todo, getTodos);
//       $newItemInput.val("");
//     }
//   });
