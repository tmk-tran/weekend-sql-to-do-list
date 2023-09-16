$(() => {
  console.log("JQ and JS ready!");

  getList();
  onClick();
});

// Click handlers
function onClick() {
  $( '#viewList' ).on( "click", ".completeButton", updateList);
  $( '#viewList' ).on( "click", ".deleteButton", deleteTask);

  $("#addBtn").on( 'click', function(){
    let task = $("#taskIn").val();
    let description = $("#descriptionIn").val();
    let priority = $("#priorityIn").val();
    let notes = $("#notesIn").val();

    console.log( 'clicked add button' );

    let itemSend = {
      task: task,
      description: description,
      priority: priority,
      notes: notes,
    };
    // validation
    if (!task || !priority){
      alert("Please fill in all of the fields and try again!")
      return
    };

    $("#taskIn").val('');
    $("#descriptionIn").val('');
    $("#priorityIn").val('');
    $("#notesIn").val('');
    // call saveTask with the new obejct
    saveTask(itemSend);
  })
}

function appendList(list) {
  console.log('in appendList');

  $("#viewList").empty();
  for (let i = 0; i < list.length; i += 1) {
    let item = list[i];

    // Check if any of the fields are null or undefined
    if (item.description === null || item.description === undefined) { // can rewrite to item.description = item.description || 'N/A';
      item.description = "N/A";
    }

    if (item.notes === null || item.notes === undefined) {
      item.notes = "N/A";
    }

    // For each item, append a new row
    $("#viewList").append(`
      <tr>
        <td>${item.task}</td>
        <td>${item.description}</td>
        <td>${item.priority}</td>
        <td>${item.notes}</td>
        <td><button class="completeButton" data-id=${item.id}  data-ready=${item.complete} >${item.complete ? "Incomplete": "Complete"}</button></td>
        <td><button class="deleteButton" data-id=${item.id}>Delete</button></td>
      </tr>
    `);
  }
};

// GET list data
function getList() {
  console.log("in getList");
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
function saveTask(itemSend){
  console.log('in saveTask', itemSend);

  // ajax call to server to post task
 $.ajax({
  method: "POST",
  url: "/list",
  data: itemSend,
 }).then(() => getList())
 .catch((err) => console.log(err));
};

// ajax PUT
function updateList(event){
  const id = $(event.target).data("id");
  const complete = $(event.target).data("ready");
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

const deleteTask = (event) => {
  console.log('in deleteTask');
  const id = $(event.target).data("id");
  $.ajax({
    method: "DELETE",
    url: `/list/${id}`,
  }).then(() => getList()).catch((err) => console.log(err));
};