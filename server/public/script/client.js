$(() => {
  console.log("JQ and JS ready!, Let's make a to-do list!");

  getList();
  onClick();
});

// Click handlers
function onClick() {
  $("#viewList").on("click", ".completeButton", updateList);
  // $( '#viewList' ).on( "click", ".deleteButton", deleteTask); // Originally had, modified for delete modal
  $("#viewList").on("click", ".deleteButton", function (event) {
    const id = $(event.target).data("id");

    // Store the ID of the item to be deleted
    $("#confirmDeleteButton").data("id", id);

    // Open the modal
    $("#deleteConfirmationModal").modal("show");
  });

  $("#confirmDeleteButton").on("click", function (event) {
    const id = $(event.target).data("id"); // get the ID of the item to be deleted

    // Perform the delete usig ajax
    $.ajax({
      method: "DELETE",
      url: `/list/${id}`,
    })
      .then(() => {
        $("#deleteConfirmationModal").modal("hide"); // close the modal
        alert("Removed from list!");
        getList(); // update the list after deletion
      })
      .catch((err) => {
        console.log(err);
      });
  });

  $("#addBtn").on("click", function () {
    let task = $("#taskIn").val();
    let description = $("#descriptionIn").val();
    let priority = $("#priorityIn").val();
    let notes = $("#notesIn").val();

    console.log("clicked add button");

    let itemSend = {
      task: task,
      description: description,
      priority: priority,
      notes: notes,
      complete: false, // initializing to false (task incomplete)
    };
    // validation
    if (!task || !priority) {
      alert("Please fill in all of the fields and try again!");
      return;
    }

    $("#taskIn").val("");
    $("#descriptionIn").val("");
    $("#priorityIn").val(); // set this to empty so it resets, with a letter
    $("#notesIn").val("");
    // call saveTask with the new obejct
    saveTask(itemSend);
  });
}

// Append function 
function appendList(list) {
  console.log("in appendList");

  $("#viewList").empty();
  for (let i = 0; i < list.length; i += 1) {
    let item = list[i];

    // Check if any of the fields are null or undefined
    if (item.description === null || item.description === undefined) {
      // can rewrite to item.description = item.description || 'N/A';
      item.description = "N/A";
    }

    if (item.notes === null || item.notes === undefined) {
      item.notes = "N/A";
    }

    // Define CSS classes for completed and incomplete tasks
    const completedClass = item.complete ? "completed-task" : "incomplete-task"; // add 'completedClass' to <td> line with ${item.description}

    // For each item, append a new row. Added class="task-row" to target w CSS later
    $("#viewList").append(`
      <tr class="list-row">
      <td class="${completedClass}"><button class="completeButton" id="completeBtn" data-id=${item.id}  data-ready=${item.complete}>
      ${item.complete ? "Complete" : "Incomplete"}</button></td>
        <td>${item.task}</td>
        <td>${item.description}</td>
        <td>${item.priority}</td>
        <td>${item.notes}</td>
        <td><button class="deleteButton small-button" id="deleteBtn" data-toggle="modal" data-target="#deleteConfirmationModal" data-id=${
          item.id}>X</button>
        </td>
      </tr>
    `); // added class 'small-button'  ^^^ to target w CSS 
  }
}

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

// Ajax POST
function saveTask(itemSend) {
  console.log("in saveTask", itemSend);

  // ajax call to server to post task
  $.ajax({
    method: "POST",
    url: "/list",
    data: itemSend,
  })
    .then(() => getList())
    .catch((err) => console.log(err));
}

// Ajax PUT
function updateList(event) {
  const id = $(event.target).data("id");
  const complete = $(event.target).data("ready");
  console.log(id, complete);

  $.ajax({
    method: "PUT",
    url: `/list/${id}`,
    data: { complete: !complete },
  })
    .then(() => getList())
    .catch((err) => {
      console.log("Error with PUT ajax", err);
    });
}

// Original DELETE function, unneeded after modal added
// const deleteTask = (event) => {
//   console.log("in deleteTask");
//   const id = $(event.target).data("id");
//   $.ajax({
//     method: "DELETE",
//     url: `/list/${id}`,
//   })
//     .then(() => getList())
//     .catch((err) => console.log(err));
// };
