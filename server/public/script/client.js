$(() => {
  console.log("JQ and JS ready!");

//   refreshList();
//   onClick();
});

// GET list data
function refreshList() {
    $.ajax({
      type: "GET",
      url: "/list",
    })
      .then((response) => {
        renderBooks(response);
      })
      .catch((err) => console.log(err));
  }