
// storing tasks input by user in local storage

let tasks;

let taskinput = document.getElementById("task-input");
let addbtn = document.getElementById("add-task");
let taskbox = document.getElementById("task-box");

if (localStorage.getItem("tasks")) {
    let savedTask = localStorage.getItem("tasks");
    tasks = JSON.parse(savedTask);

    tasks.forEach(function (task) {
        createTask(task);
    });

} else {
    tasks = [];
}

// Create Task Function

function createTask(taskObj) {

    let newTask = document.createElement("p");
    let taskdiv = document.createElement("div");
    let emptymsg = document.getElementById("empty-msg");
    let delbtn = document.createElement("button");
    newTask.textContent = taskObj.text;
    if (taskObj.completed) {
        taskdiv.classList.add("completed")
    }

    delbtn.textContent = "❌";
    delbtn.classList.add("delbtn");

    taskdiv.classList.add("task-item");



    // Hide empty state
    emptymsg.style.display = "none";


    // Append Elements
    taskdiv.appendChild(newTask);
    taskdiv.appendChild(delbtn);
    taskbox.appendChild(taskdiv);


    // Delete Task
    delbtn.addEventListener("click", function () {

        taskdiv.remove();

        tasks = tasks.filter(function (task) {
            return task.text != taskObj.text;
        });

        updateCounter();
        updateProgress();

        localStorage.setItem("tasks", JSON.stringify(tasks));

        if (document.querySelectorAll(".task-item").length == 0) {
            emptymsg.style.display = "block";
            updateCounter();
            updateProgress();
        }

    });


    // Complete Task
    newTask.addEventListener("click", function () {
        taskObj.completed = !taskObj.completed;
        taskdiv.classList.toggle("completed");
        localStorage.setItem("tasks", JSON.stringify(tasks));
        updateProgress();
    });
    updateCounter();
    
}
//Counter update
function updateCounter() {
    let counter = document.getElementById("tskcounter");
    let tasklen = tasks.length + " Task remaining !"
    counter.textContent = tasklen;
}


// Add task
function addTask(){
    let text = taskinput.value;
    let taskObj = {
        text: text,
        completed: false
    };
    
        if (text == "") {
            window.alert("type something you stoopid!");
        }

        else {

            tasks.push(taskObj);

            localStorage.setItem("tasks", JSON.stringify(tasks));

            createTask(taskObj);
            updateProgress();
            taskinput.value = "";

        }
    }

taskinput.addEventListener("keydown", function (event) {
    if (event.key == "Enter") {
        addTask();
    }
});

addbtn.addEventListener("click", function () {
    addTask();
});



// Clock and greeting

let hour = new Date().getHours();

let name = "Hemant";

let heading = document.getElementById("hero-head");

if (hour >= 5 && hour < 12) {
    heading.textContent = "Good Morning🌞, " + name + " !";
}
else if (hour >= 12 && hour < 17) {
    heading.textContent = "Good Afternoon☀️, " + name + " !";
}
else {
    heading.textContent = "Good Night🌙, " + name + " !";
}

function updateClock() {

    let liveclock = document.getElementById("liveclock");

    let time = new Date();

    let hrs = time.getHours();

    let min = time.getMinutes();

    let sec = time.getSeconds();

    min = min.toString().padStart(2, "0");

    sec = sec.toString().padStart(2, "0");

    if (hrs > 12) {
        hrs = hrs - 12;
    }

    else if (hrs == 0) {
        hrs = 12;
    }

    liveclock.textContent = hrs + ":" + min + ":" + sec;
}

setInterval(updateClock, 1000);

// Filter Buttons
let allbtn = document.getElementById("all-btn");
let completedbtn = document.getElementById("completed-btn");
let pendingbtn = document.getElementById("pending-btn");

allbtn.addEventListener("click", function () {
    let alltasks = document.querySelectorAll(".task-item");
    alltasks.forEach(function (task) {
        task.style.display = "flex";
    });


});

completedbtn.addEventListener("click", function () {
    let alltasks = document.querySelectorAll(".task-item");
    alltasks.forEach(function (task) {
        if (task.classList.contains("completed")) {
            task.style.display = "flex";
        }
        else {
            task.style.display = "none";
        }


    });
})


pendingbtn.addEventListener("click", function () {
    let alltasks = document.querySelectorAll(".task-item");
    alltasks.forEach(function (task) {
        if (!task.classList.contains("completed")) {
            task.style.display = "flex";
        }
        else {
            task.style.display = "none";
        }
    });


});

// Light/dark mode switch

let themebtn = document.getElementById("theme-btn");
let body = document.body;
themebtn.addEventListener("click", function () {
    body.classList.toggle("lightmode");
    if (body.classList.contains("lightmode")) {
        themebtn.textContent = "☀️";
        localStorage.setItem("theme", "light");
    }
    else {
        themebtn.textContent = "🌙";
        localStorage.setItem("theme", "dark");
    }
});

if (localStorage.getItem("theme") == "light") {
    body.classList.add("lightmode");
    themebtn.textContent = "☀️";
}

// Progress bar
function updateProgress(){
    let progresstxt = document.getElementById("progresstxt")
    let progressfill = document.getElementById("progress-fill")
    let completedTasks = tasks.filter(function(task){
        return task.completed;
    })
    let progressPercent = (completedTasks.length)/(tasks.length)*100;
    if (tasks.length == 0){
        progressPercent = 0;
    }
    progresstxt.textContent = Math.round(progressPercent) + "% Completed";
    progressfill.style.width = progressPercent + "%";
}