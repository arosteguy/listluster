$(document).ready(function () {


    // reach into the html, grab the button, assign to a var
    // var addButton = $('');
    // add a click event to that button .on .click
    // that click event should
    // reach into the html, grab the value of the add input box, assign it to variable
    // use concat todostring = todostring + 'input box variable' + ||
    // sanity checkou
    // Getting a reference to the input field where user adds a new todo
    var $newinputTitle = $("#list-title");
    var $newItemInput = $("input.new-item");
    // Our new todos will go inside the todoContainer
    var $todoContainer = $(".todo-container");
    // Adding event listeners for deleting, editing, and adding todos
    $(document).on("click", "button.delete", deleteTodo);
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

    function getTodos() {
        const listId = $(document).data("list-id");
        if (!listId) return false;

        $.get("/api/lists/" + listId, function (data) {
            // console.log(data.)
            todos = data.Items;
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
     function deleteTodo(event) {
        event.stopPropagation();
        var id = $(this).attr("data-id");
        $.ajax({
            method: "DELETE",
            url: "/api/items" + id
        }).then(getTodos);
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
                "<button class='delete btn btn-danger' >x</button>",     
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



    function saveList() {
        $.get("/api/user_data", (response) => {
            console.log("User data: ", response);
            var list = {
                title: $newinputTitle.val().trim(),
                userId: response.id
            };

            $.post("/api/lists", list, ({ id }) => {
                $(".todo-list").show();
                $("#saveList").hide();
                $(document).data({ "list-id": id });
            })
        })
    }


    function insertTodo(event) {
        event.preventDefault();
        const ListId = $(document).data("list-id");

        var todo = {
            text: $newItemInput.val().trim(),
            complete: false,
            ListId: ListId
        };

        $.post("/api/items", todo, getTodos);
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

    $("#saveList").click(function (event) {
        event.preventDefault();
        saveList();
    })

    $("#signIn").click(function (event) {
        event.preventDefault();
        showSignIn();
    });

    $("#createAccount").click(function (event) {
        event.preventDefault();
        showCreateAccount();
    });

    $("#showSavedLists").on("click", function (event) {
        event.preventDefault();
        $("#savedLists").toggle("slow", function () {
            if ($(this).is(":visible")) {
                $("#showSavedLists").text("Hide Saved Lists");
            } else {
                $("#showSavedLists").text("Show Saved Lists");
            }
        });
    })

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

// when page loads, this pulls user data from the auth to get the user's id
$.get("/api/user_data", (response) => {
    // if no user is logged in, break out of function
    if (!response.id) return false;

    // if user is logged in, get all user info -- user obj with nested List array containing todo Items
    $.get("/api/users/" + response.id, ({ Lists }) => {
        // for each list...
        for (const list of Lists) {
            // make a div for that list
            const listDiv = $("<div>");
            // add an h1 of the list's title
            listDiv.append(`<h1>${list.title}</h1>`);
            // and an opening ul tag
            const listUl = $("<ul>");

            // then loop through that list's items
            for (const item of list.Items) {
                // and make one li for each list item
                const itemLi = $(`<li>${item.text} | Completed: ${item.complete}</li>`);
                listUl.append(itemLi);
            }

            // appending the entire list to the wrapper div
            listDiv.append(listUl);
            // and appending the wrapper div to the page
            $("#savedLists").append(listDiv);

        }
    })
})
