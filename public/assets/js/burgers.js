// Wait until DOM is fully loaded to attach handlers
$(function() {
  $(".create-form").on("submit", (event) => {
    event.preventDefault();

    const newBurger = {
      burger_name: $("#burger").val().trim(),
      devoured: $("[name=devoured]:checked").val().trim()
    };

    // Send the POST request.
    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger
    }).then(() => {
        console.log("created new burger");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });
});
