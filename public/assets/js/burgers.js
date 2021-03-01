// Wait until DOM is fully loaded to attach handlers
$(function() {
  // Event handler for 'TIME TO EAT' & 'EAT AGAIN' buttons
  $(".change-devour").on("click", function(event) {
    let id = $(this).data("id");
    let newDevour = $(this).data("newdevour");

    let newDevourState = {
      devoured: newDevour
    };

    // PUT request
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: newDevourState
    }).then(() => {
        // console.log("changed devour to", newDevour);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  // Event handler for adding burgers
  $(".create-form").on("submit", (event) => {
    event.preventDefault();

    const newBurger = {
      burger_name: $("#burger").val().trim(),
      devoured: $("[name=devoured]:checked").val().trim()
    };

    // POST request
    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger
    }).then(() => {
        // console.log("created new burger");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  // Event handler to delete burger from database
  $(".delete-burger").on("click", function(event) {
    let id = $(this).data("id");

    // DELETE request
    $.ajax("/api/burgers/" + id, {
      type: "DELETE"
    }).then(() => {
      // console.log("deleted burger", id);
      // Reload the page to get the updated list
      location.reload();
    });
  });
});
