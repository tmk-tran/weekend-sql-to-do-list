/* Copy and paste the following to create a small data table for the to-do list app */

CREATE TABLE list (
	"id" serial primary key,
	"task" varchar(80) not null,
	"description" varchar(120),
	"priority" varchar(1),
	"notes" varchar(120),
	"complete" boolean default false,
	"completed_date" timestamp
);

INSERT INTO list
	("task", "priority")
VALUES
	('Dishes', 'L'),
	('Laundry', 'M'),
	('Brush dog','H'), 
	('Vacuum house', 'M'),
	('HW', 'H'),
	('Trash', 'M'),
	('Shower', 'H'),
	('Organize garage', 'M');

SELECT * FROM list;