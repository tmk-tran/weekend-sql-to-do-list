$(() => {
  console.log("JQ and JS ready!");

  refreshList();
  //   onClick();
});

// GET list data
function refreshList() {
  console.log("in refresh");
  $.ajax({
    type: "GET",
    url: "/list",
  })
    .then((response) => {
      renderBooks(response);
    })
    .catch((err) => console.log(err));
}

// Click handlers
function onClick() {
    $("#submitBtn").on("click", handleSubmit);
}