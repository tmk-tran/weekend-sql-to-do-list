$(() => {
  console.log("JQ and JS ready!");

  refreshList();
  onClick();
});

// Click handlers
function onClick() {
  $("#addBtn").on( 'click', function(){
    // let itemTask = $("#taskIn").val();
    // let itemDescription = $("#descriptionIn").val();
    // let itemDue = $("#dueIn").val();
    // let itemPriority = $("#priorityIn").val();
    // let itemNotes = $("#notesIn").val();

    console.log( 'clicked add button' );
  })
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

//ajax POST
function saveTask( newTask ){
  console.log( 'in saveTask', newTask );

  // ajax call to server to post task
 $.ajax({
  method: "POST",
  url: "/list",
  data: newTask,
 }).then(() => getList())
 .catch((err) => console.log(err));
};

// ajax PUT
function updateList(event){
  const id = $(event.target).data("id");
  const complete = $(event.target).data("complete");
  console.log(id, complete);

  $.ajax({
    method: "PUT",
    url: `/list/${id}`,
    data: {complete: !complete},
  })
  .then(() => getList())
  .catch((err) => {console.log("Error with PUT ajax", err)
})
}

