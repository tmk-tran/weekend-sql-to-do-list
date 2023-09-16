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
      appendList(response);
    })
    .catch((err) => console.log(err));
}

// Click handlers
function onClick() {
    $("#submitBtn").on("click", handleSubmit);
}

function appendList(list) {
  console.log('in appendList');

  $("#viewList").empty();
  for (let i = 0; i < list.length; i += 1) {
    let item = list[i];
    // For each item, append a new row
    $("#viewList").append(`
      <tr>
        <td>${item.task}</td>
        <td>${item.description}</td>
        <td>${item.due}</td>
        <td>${item.priority}</td>
        <td>${item.notes}</td>
        <td>${item.status}</td>
        <td><button class="readyButton" data-id=${item.id}  data-ready=${item.ready} >${item.ready ? "Incomplete": "Complete"}</button></td>
        <td><button class="deleteButton" data-id=${item.id}>Delete</button></td>
      </tr>
    `);
  }
};