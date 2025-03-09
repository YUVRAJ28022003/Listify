/* we used dom content loaded because if there is server delay or issue
then when the dom content is loaded then if will grab input and id
*/
let styles = `
body {
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
    font-family: "Lato", sans-serif;
    font-weight: 400;
    font-style: normal;
    background-color: #F1F1F2;
    color: #1995AD;

}
`;

let styleSheet = document.createElement("style");
styleSheet.textContent = styles;
document.body.appendChild(styleSheet);

document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todo-input");
  const addTaskButton = document.getElementById("add-task-btn");
  const todoList = document.getElementById("todo-list");

  /*
  we are doing or '||' operation to get nothing if there is nothing inside the localStorage

  The JSON.parse() static method parses a JSON string, constructing the JavaScript value or object described by the string.
  JSON.parse(text)

*/

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => renderTask(task));

  /*
The Object.values() method returns an array of the property values of an object.
The Object.values() method does not change the original object.

trim() removes whitespace from both sides of a string
The trim() method does not change the original string.

const d = new Date(); By default, JavaScript will use the browser's time zone and display a date as a full text string:
Date.now() will time according to time zone .
*/

  addTaskButton.addEventListener("click", () => {
    // input value is taken in task test
    const taskTest = todoInput.value.trim();
    // if task test is empty it return
    if (taskTest === "") return;

    // create new task
    const newTask = {
      Id: Date.now(),
      text: taskTest,
      completed: false,
    };

    tasks.push(newTask);

    saveTask();

    renderTask(newTask);

    todoInput.value = "";

    console.log(tasks);
  });

  function renderTask(task) {
    // console.log(task.text);

    // creating an list element
    const li = document.createElement("li");

    // now setting the id of the list
    li.setAttribute("data-id", task.id);

    // if (task.completed) li.classList.add("completed");
    li.innerHTML = `<span>${task.text}</span>
    <button>delete</button>`;

    // li.addEventListener("click", (e) => {
    //   if (e.target.tagName === "button") return;
    //   task.completed = !task.completed;
    //   li.classList.toggle("completed");
    //   saveTask();
    // });

    //removing task when button is clicked

    li.querySelector("button").addEventListener("click", (e) => {
      // e.stopPropagation(); //prevent toggle from firing
      tasks = tasks.filter((t) => t.id !== task.id);
      li.remove();
      saveTask();
    });

    // adding li in ul
    todoList.appendChild(li);
  }

  function saveTask() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  /*
  The setItem() method of the Storage interface,
  when passed a key name and value, will add that key to the given Storage object,
  or update that key's value if it already exists.

  The JSON.stringify() static method converts a JavaScript value to a JSON string
  JSON.stringify(value);
*/
});

/*
localStorage:
------------
-The localStorage read-only property of the window interface
 allows you to access a Storage object for the Document's origin; 
 the stored data is saved across browser sessions.
-localStorage is similar to sessionStorage, 
 except that while localStorage data has no expiration time, 
 sessionStorage data gets cleared when the page session ends
 — that is, when the page is closed. 
 (localStorage data for a document loaded in a "private browsing"
  or "incognito" session is cleared when the last "private" tab is closed.)

local Storage object and adds a data item to it using Storage.setItem().
localStorage.setItem("myCat", "Tom");

The syntax for reading the localStorage item is as follows:
const cat = localStorage.getItem("myCat");

The syntax for removing the localStorage item is as follows:
localStorage.removeItem("myCat");
*/

/*
 JSON:
 -----
JSON is a format for storing and transporting data.
JSON is often used when data is sent from a server to a web page.
JSON stands for JavaScript Object Notation
JSON is a lightweight data interchange format
JSON is language independent *
JSON is "self-describing" and easy to understand

JSON Syntax Rules :
Data is in name/value pairs
Data is separated by commas
Curly braces hold objects
Square brackets hold arrays


JSON data is written as name/value pairs, just like JavaScript object properties.
A name/value pair consists of a field name (in double quotes), followed by a colon, followed by a value:
"firstName":"John"


JSON Objects:
-------------
JSON objects are written inside curly braces.
Just like in JavaScript, objects can contain multiple name/value pairs:

{"firstName":"John", "lastName":"Doe"}


JSON Arrays:
-----------
JSON arrays are written inside square brackets.
Just like in JavaScript, an array can contain objects:
"employees":[
  {"firstName":"John", "lastName":"Doe"},
  {"firstName":"Anna", "lastName":"Smith"},
  {"firstName":"Peter", "lastName":"Jones"}
]

stringify():
----------
  The JSON.stringify() static method converts a JavaScript value to a JSON string
  JSON.stringify(value);


parse():
-------
  The JSON.parse() static method parses a JSON string, constructing the JavaScript value or object described by the string.
  JSON.parse(text)

*/
