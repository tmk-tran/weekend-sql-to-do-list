## The To-Do App

This weekend challenge required the creation of a 'TO DO' application

## Description

**The specific components for the challenge:**

- Create a front end experience that allows a user to create a Task.
- When the Task is created, it should be stored inside of a database (SQL)
- Whenever a Task is created the front end should refresh to show all tasks that need to be completed.
- Each Task should have an option to 'Complete' or 'Delete'.
- When a Task is complete, its visual representation should change on the front end. For example, the background of the task container could change from gray to green. The complete option should be 'checked off'. Each of these are accomplished in CSS, but will need to hook into logic to know whether or not the task is complete.
- Whether or not a Task is complete should also be stored in the database.
- Deleting a Task should remove it both from the front end as well as the Database.

## Screen Shot

Refer to img.png for a visual representation of the application.

## Prerequisites

Link to software that is required to install the app (e.g. node):

Node.js
Postico 2
Express

## Installation

    - Use database.sql file 'database' to create a table in Postico

            Create a database named 'weekend-to-do-app.',
            The queries in the tables.sql file are set up to create all the necessary tables and populate the needed data to allow the application to run correctly. The project is built on Postgres, so you will need to make sure to have that installed. We recommend using Postico to run those queries as that was used to create the queries,
            Open up your editor of choice and run an npm install
            Run npm run server in your terminal
            Run npm run client in your terminal
            The npm run client command will open up a new browser tab for you!

    - Boot up local server and navigate to localhost:5000/list

## Usage

1. Here, you will find the app on page load. Upon load, there should be some table data on the center of the screen that shows a few items on a list. The user has the ability to add tasks through the input fields on the left. Click the 'ADD' button to create new tasks.

2. Required input fields are 'Task' and 'Priority', the rest are optional.

3. The user has the ability to mark tasks off that are complete. Use the buttons on the left of the table to toggle tasks complete or incomplete. By default, all tasks are marked 'incomplete'. When a user clicks on the complete button, the app also logs a timestamp and prints the date in mm/dd/yyyy format to the table.

4. Additionally, the user has the ability to reverse the order of the items on the list by pressing the 'reverse' button located on the top left of the list data. This button alters the order the tasks are listed in , Descending, or Ascending.

5. The app also has the ability to delete tasks from the list by utilizing the small trash icons on the right of the table. Clicking one of these will delete the corresponding task from the list

## Built With

Postico2, Node, Javascript, CSS, HTML, jQuery, and SQL
