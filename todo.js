/**
 * Created by Magda on 2017-09-06.
 */
var allTasks = [];

var id = 1;
var isSub = false;
var subT = [];

var Task = function(title){
    this.id = id;
    id = id + 1;
    this.title = title;
    this.finished = false;
};

var DeadlineTask = function(title, deadline) {
    Task.call(this, title);
    this.deadline = deadline;
};

var SubtaskTask = function (title, tasksArray) {
    Task.call(this, title);
    var array = [];
    this.array = tasksArray;
};


DeadlineTask.prototype = Object.create(Task.prototype);
SubtaskTask.prototype = Object.create(Task.prototype);

Task.prototype.draw = function (){
    var x = document.createElement("DIV");
    x.setAttribute("id", this.id);
    if (this.finished) {
        x.setAttribute("class", "taskItem finishedTask row justify-content-between align-items-center");
        document.getElementById("taskList").appendChild(x);
    }
    else {
        x.setAttribute("class", "taskItem row justify-content-between align-items-center");
        var list = document.getElementById("taskList");
        list.insertBefore(x, list.childNodes[0]);
    }

    var z = document.createElement("SPAN");
    z.setAttribute("class", "col-7");
    var t = document.createTextNode(this.title);
    z.appendChild(t);
    x.appendChild(z);

    var y = document.createElement("INPUT");
    y.setAttribute("type", "checkbox");
    y.setAttribute("class", "checkbox col-1");
    y.setAttribute("data-id", this.id);
    y.setAttribute("onclick", "onToggle(this)");
    if (this.finished) {
        y.checked = true;
    }
    var yt = document.createTextNode("Gotowe");
    var yl = document.createElement("LABEL");
    yl.appendChild(yt);
    x.appendChild(yl);
    x.appendChild(y);

    var b = document.createElement("BUTTON");
    b.setAttribute("class", "deleteButton col-2 btn btn-danger");
    b.setAttribute("type", "button");
    b.setAttribute("data-id", this.id);
    b.setAttribute("onclick", "deleteTask(this)");
    var tt = document.createTextNode("DELETE");
    b.appendChild(tt);
    x.appendChild(b);
};

Task.prototype.delete = function(){
    if( this.finished == true) {
        var i =0;
        for(i=0; i<allTasks.length; i++){
            if(allTasks[i].id == this.id){
                allTasks.splice(i, 1);
            }
        }
        showAllTasks();
        console.log(allTasks);
    }
    else{
        alert("you cannot delete unfinished task")
    }
};

DeadlineTask.prototype.draw = function() {
    Task.prototype.draw.call(this);

    if(this.finished==false){
        var z = document.createElement("SPAN");
        z.setAttribute("class", "col-12 text-right");
        var t = document.createTextNode("Deadline: " + this.deadline);
        z.appendChild(t);
        document.querySelector(".taskItem").appendChild(z);
    }
};

SubtaskTask.prototype.draw = function() {
    Task.prototype.draw.call(this);
    console.log(this);
    drawSubtask(this);
};

function drawSubtask (parent){
    console.log(parent);
    var temp = parent.id;

    x = document.getElementById(temp);
    console.log(x);
    var i = 0;
    for (i=0; i<parent.array.length; i++){
        console.log([parent.array[i]]);

        var z = document.createElement("SPAN");
        z.setAttribute("class", "col-6 text-center");
        var t = document.createTextNode("Title: " + parent.array[i].title);
        z.appendChild(t);
        x.appendChild(z);

        var y = document.createElement("INPUT");
        y.setAttribute("type", "checkbox");
        y.setAttribute("class", "checkbox col-1");
        y.setAttribute("data-id", this.id);
      //  y.setAttribute("onclick", "onChange(this)");
        y.addEventListener("click", function () {
            parent.array[i].finished = true;
        });
        if (parent.array[i].finished) {
            y.checked = true;
        }
        var yt = document.createTextNode("Gotowe");
        var yl = document.createElement("LABEL");
        yl.appendChild(yt);
        x.appendChild(yl);
        x.appendChild(y);

    }
}

document.querySelector(".buttonAdd").addEventListener("click", addTask);
document.querySelector(".buttonAddMore").addEventListener("click", addSubTask);

function addSubTask(){
    x = document.getElementById("myForm");

    var y = document.createElement("INPUT");
    y.setAttribute("type", "text");
    y.setAttribute("class", "col-10");
    y.setAttribute("id", "sTitle");

    var yt = document.createTextNode("Title");
    var yl = document.createElement("LABEL");
    yl.appendChild(yt);
    x.appendChild(y);
    x.appendChild(yl);

/*    var yy = document.createElement("INPUT");
    yy.setAttribute("id", "sdeadline");
    yy.setAttribute("type", "text");
    yy.setAttribute("class", "col-10");

    var yyt = document.createTextNode("Deadline");
    var yyl = document.createElement("LABEL");
    yyl.appendChild(yyt);
    x.appendChild(yy);
    x.appendChild(yyl);*/
    isSub= true;

    var button = document.createElement("BUTTON");
    button.setAttribute("class", "col-2 btn btn-danger");
    button.addEventListener("click", function () {
        var titleValue = document.querySelector("#sTitle").value;
        var newTask = new Task(titleValue);
        subT.push(newTask);
        event.preventDefault();
    });

    x.appendChild(button);

    //if(document.querySelector("#sdeadline").value === ""){

   // }
   /* else{
        var title = document.querySelector("#sTitle").value;
        var deadline = document.querySelector("#sdeadline").value;
        var newTaskDeadline = new DeadlineTask(title, deadline);
        subT.push(newTaskDeadline);
    }*/

}

function addTask(){

    if(isSub){
        var stitleValue = document.querySelector("#inputNewTask").value;
        var newTaskSub = SubtaskTask(stitleValue, subT);
        allTasks.push(newTaskSub);
        newTaskSub.draw();
    }
    else{
        if(document.querySelector("#deadline").value === ""){
            var titleValue = document.querySelector("#inputNewTask").value;
            var newTask = new Task(titleValue);
            allTasks.push(newTask);
            newTask.draw();
        }
        else{
            var title = document.querySelector("#inputNewTask").value;
            var deadline = document.querySelector("#deadline").value;
            var newTaskDeadline = new DeadlineTask(title, deadline);
            allTasks.push(newTaskDeadline);
            newTaskDeadline.draw();
        }
    }

    document.querySelector("#inputNewTask").value = "";
    document.querySelector("#deadline").value = "";

}

function deleteTask(e) {
    var whatRemove = e.getAttribute('data-id');
    for(var i=0; i<allTasks.length; i++){
        if(allTasks[i].id == whatRemove){
            allTasks[i].delete();
          // e.parentElement.remove();
        }
    }
}

function showAllTasks(){
    var element = document.getElementById("taskList");
    element.parentNode.removeChild(element);
    var xxx = document.createElement("DIV");
    xxx.setAttribute("id", "taskList");
    document.getElementById("toDoList").appendChild(xxx);

    var i = 0;
    for(i = 0; i < allTasks.length; i++){
        console.log(allTasks[i]);
        allTasks[i].draw();

    }
}

function onToggle(e) {
    var whatRemove = e.getAttribute('data-id');
            if (e.checked) {
                for(var i=0; i<allTasks.length; i++){
                    if(allTasks[i].id == whatRemove){
                        allTasks[i].finished = true;
                        e.parentElement.remove();
                        allTasks[i].draw();
                    }
                }
            }
            else {
                console.log('unchecked');
                for(i=0; i<allTasks.length; i++){
                    if(allTasks[i].id == whatRemove){
                        allTasks[i].finished = false;
                        e.parentElement.remove();
                        allTasks[i].draw();
                    }
                }
            }
}




function init(){
    var task1 = new Task("helo ele elo");
    var task2 = new Task("no elo");
    var b = new DeadlineTask("12", 12);
    var b1 = new DeadlineTask("2", 2);
    task2.finished = true;
    var tasksArray = [];
    tasksArray.push(task1);
    tasksArray.push(task2);

    var c1 = new SubtaskTask("ww", tasksArray);

    allTasks.push(b);
    allTasks.push(b1);
    allTasks.push(c1);

    showAllTasks();
}

init();

/*function showTask(newTask) {
 var x = document.createElement("DIV");
 if(newTask.finished){
 x.setAttribute("class", "taskItem finishedTask row justify-content-between align-items-center");
 document.getElementById("taskList").appendChild(x);
 }
 else{
 x.setAttribute("class", "taskItem row justify-content-between align-items-center");
 var list = document.getElementById("taskList");
 list.insertBefore(x, list.childNodes[0]);
 }

 var z = document.createElement("SPAN");
 z.setAttribute("class", "col-7");
 var t = document.createTextNode(newTask.title);
 z.appendChild(t);
 x.appendChild(z);

 var y = document.createElement("INPUT");
 y.setAttribute("type", "checkbox");
 y.setAttribute("class", "checkbox col-1");
 y.setAttribute("data-id", newTask.id);
 y.setAttribute("onclick", "onToggle(this)");
 if(newTask.finished){
 y.checked = true;
 }
 var yt = document.createTextNode("Gotowe");
 var yl = document.createElement("LABEL");
 yl.appendChild(yt);
 x.appendChild(yl);
 x.appendChild(y);

 var b = document.createElement("BUTTON");
 b.setAttribute("class", "deleteButton col-2 btn btn-danger");
 b.setAttribute("type", "button");
 b.setAttribute("data-id", newTask.id);
 b.setAttribute("onclick", "deleteTask(this)");
 var tt = document.createTextNode("DELETE");
 b.appendChild(tt);
 x.appendChild(b);
 }*/




