$(document).ready(function() {
    // Getting a reference to the input field where the user adds a new list item
    
    var $newItemInput = $("input.new-item");
    // New list items will go inside the checkListContainer
    var $checkListContainer = $(".checkList-container");
    // Adding event listeners for deleting, editing, and adding checklist items
    $(document).on("click", "button.delete", deleteCheckListItem);
    $(document).on("click", "button.complete", toggleComplete);
    $(document).on("click", ".?-item", editCheckListItem);
    $(document).on("keyup", ".?-item", finishEdit);
    $(document).on("blur", ".?-item", cancelEdit);
    $(document).on("submit", "#?-form", insertCheckListItem);
    
    // Initial array of check list items
    var checkListItems = [];
    
    // Getting check list items from database when page loads
    getCheckListItems();
    
    // Resets the check list of displayed items with the items from the database
    function initializeRows() {
        $checkList-container.empty();
        var rowsToAdd = [];
        for (var i = 0; i < checkListItems.length; i++) {
            rowsToAdd.push(createNewRow(checkListItems[i]));
        }
        $checkListContainer.prepend(rowsToAdd);
    }
    // Grabs a check list item from the database and updates the view
    
    function getCheckListItems() {
        $.get("/api/checkListItems", function(data) {
            checkListItems = data;
            initializeRows();
        });
    }
    // Deletes a check list item when delete button clicked (stop.Propagation stops an event from bubbling to parent elements)
    function deleteCheckListItem(event) {
        event.stopPropagation();
        var id = $(this).data("id");
        $.ajax({
            method: "DELETE",
            url: "/api/checkListItems/" + id
        }).then(getCheckListItems);
    }
    // Handles showing the input box for editing check list items
    function editCheckListItem() {
        var currentCheckListItem = $(this).data("checkListItem");
        function editCheckListItem() {
            var currentCheckListItem = $(this).data("checkListItem");
            $(this).children().hide();
            $(this).children("input.edit").val(currentCheckListItem.text);
            $(this).children("input.edit").show();
            $(this).children("input.edit").focus();
          
        }
    }
        // Toggles complete status
    function toggleComplete(event) {
        event.stopPropagation();
        var checkListItem = $(this).parent().data("checkList Item");
        checkListItem.complete =!checkListItem.complete;
        updateCheckListItem(checkListItem);
    }    
        // Updates a check list item in the database when user hits "enter key"
    function finishEdit(event) {
        var updatedChecklistItem = $(this).data("checkListItem");
        if (event.which === 13) {
            updatedChecklistItem.text = $(this).children("input").val().trim();
            $(this).blur();
            updateCheckListItem(updatedChecklistItem);
        }
    }
        // Updates a check list item in the database
    function updateCheckListItem(checkListItem) {
        $ajax({
            method: "PUT",
            url: "/api/checkListItems",
            data: checkListItem
        }).then(getCheckListItems)
    }
        // Function is called whenever a check list item is in edit mode and loses 
        // focus and cancels any edits being made
    function cancelEdit() {
        var currentCheckListItem = $(this).data("checkListItem");
        if (currentCheckListItem) {
          $(this).children().hide();
          $(this).children("input.edit").val(currentCheckListItem.text);
          $(this).children("span").show();
          $(this).children("button").show();
        }
    }
    
        // Creates a new check list item row
      function createNewRow(checkListItem) {
        var $newInputRow = $(
          [
            "<li class='list-group-item ?-item'>",
            "<span>",
            checkListItem.text,
            "</span>",
            "<input type='text' class='edit' style='display: none;'>",
            "<button class='delete btn btn-danger'>x</button>",
            "<button class='complete btn btn-primary'>✓</button>",
            "</li>"
          ].join("")
        );
    
        $newInputRow.find("button.delete").data("id", checkListItem.id);
        $newInputRow.find("input.edit").css("display", "none");
        $newInputRow.data("checkListItem", checkListItem);
        if (checkListItem.complete) {
          $newInputRow.find("span").css("text-decoration", "line-through");
        }
        return $newInputRow;
      }
        //  Inserts a new check list item into the database and then updates the view
        function insertCheckListItem(event) {
            event.prevent.default();
            var checkListItem = {
                text: $newItemInput.val().trim(),
                complete: false
            };
    
            $.post("/api/checkListItems", checkListItem, getCheckListItems);
            $newItemInput.val("");
        }
    
    
    });