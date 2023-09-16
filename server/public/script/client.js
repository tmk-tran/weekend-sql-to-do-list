$(() => {
  console.log("JQ and JS ready!");

  getList();
  onClick();
});

// Click handlers
function onClick() {
  $("#addBtn").on( 'click', function(){
    let task = $("#taskIn").val();
    let description = $("#descriptionIn").val();
    let due = $("#dueIn").val();
    let priority = $("#priorityIn").val();
    let notes = $("#notesIn").val();

    console.log( 'clicked add button' );

    let itemSend = {
      task: task,
      description: description,
      due: due,
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
    $("#dueIn").val('');
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
    if (item.task === null || item.task === undefined) {
      item.task = "N/A";
    }

    if (item.description === null || item.description === undefined) {
      item.description = "N/A";
    }

    if (item.priority === null || item.priority === undefined) {
      item.priority = "N/A";
    }

    if (item.notes === null || item.notes === undefined) {
      item.notes = "N/A";
    }

    if (item.status === null || item.status === undefined) {
      item.status = "N/A";
    }
    // For each item, append a new row
    $("#viewList").append(`
      <tr>
        <td>${item.task}</td>
        <td>${item.description}</td>
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

