/**
 * Created by Magda on 2017-09-06.
 */
"use strict";
var allTasks = [];

var id = 1;
var ids = 0;
var isSub = false;
var subT = [];

/*myStorage = window.localStorage;
localStorage.setItem('myCat', 'Tom');
var cat = localStorage.getItem("myCat");*/


var Task = function(title, finished){
    this.id = id;
    id = id + 1;
    this.title = title;
    this.finished = finished || false;
    this.type = "task";
};

var DeadlineTask = function(title, deadline, finished) {
    Task.call(this, title);
    this.deadline = deadline;
    this.type = "deadline";
    this.finished = finished || false;
};

var SubtaskTask = function (title, tasksArray, finished) {
    Task.call(this, title);
    var array = [];
    this.array = tasksArray;
    this.type = "subtask";
    this.finished = finished || false;
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

Task.prototype.canBeRemoved = function(){
    return true;
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

SubtaskTask.prototype.canBeRemoved = function(){
    Task.prototype.canBeRemoved.call(this);
    for(var j = 0; j<this.array.length; j++){
        if(this.array[j].finished == false){
            this.finished = false;
            return false;
        }
    }
    return true;
};

document.querySelector(".buttonAdd").addEventListener("click", addTask);
document.querySelector(".buttonAddMore").addEventListener("click", addSubTask);

function drawSubtask (parent){
    console.log(parent);
    var temp = parent.id;

    var x = document.getElementById(temp);
    console.log(x);
    var i = 0;
    for (i=0; i<parent.array.length; i++){

        var z = document.createElement("SPAN");
        z.setAttribute("class", "col-10 text-left");
        var t = document.createTextNode("Title: " + parent.array[i].title);
        z.appendChild(t);
        x.appendChild(z);

        var y = document.createElement("INPUT");
        y.setAttribute("type", "checkbox");
        y.setAttribute("class", "checkbox col-1");
        y.setAttribute("data-id", parent.array[i].id);
        y.addEventListener("click", function () {
            var what = this.getAttribute('data-id');
            if(this.checked){
                for(var j=0; j<parent.array.length; j++){
                    if(parent.array[j].id == what){
                        parent.array[j].finished = true;
                    }
                }
            }
            else{
                for( j=0; j<parent.array.length; j++){
                    if(parent.array[j].id == what){
                        parent.array[j].finished = false;
                    }
                }
            }
            localStorage.setItem("allEntries", JSON.stringify(allTasks));
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

function addSubTask(){
    var x = document.getElementById("myForm");
    var xxx = document.createElement("DIV");
    xxx.setAttribute("id", "subContainer");
    xxx.setAttribute("class", "col-12");
    ids++;
    var y = document.createElement("INPUT");
    y.setAttribute("type", "text");
    y.setAttribute("class", "col-10");
    y.setAttribute("id", ids);


    var yt = document.createTextNode("Title");
    var yl = document.createElement("LABEL");
    yl.setAttribute("class", "col-2");

    yl.appendChild(yt);
    xxx.appendChild(y);
    xxx.appendChild(yl);
    x.appendChild(xxx);

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
}

function addTask(){

    console.log(ids);
    if(isSub){
        for(var i = 1; i<=ids; i++){
            var temp = i.toString();
            console.log(temp);
            var sstitleValue = document.getElementById(temp).value;
            var snewTask = new Task(sstitleValue);
            subT.push(snewTask);
            event.preventDefault();
            var zzz = document.getElementById("subContainer");
            console.log(zzz);
            zzz.parentNode.removeChild(zzz);
        }

        var stitleValue = document.querySelector("#inputNewTask").value;
        var newTaskSub = new SubtaskTask(stitleValue, subT);
        allTasks.push(newTaskSub);
        newTaskSub.draw();
        ids = 0;
        subT = [];
        isSub=false;
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
    localStorage.setItem("allEntries", JSON.stringify(allTasks));
    document.querySelector("#inputNewTask").value = "";
    document.querySelector("#deadline").value = "";
    localStorage.setItem("allEntries", JSON.stringify(allTasks));
     //localStorage.removeItem("localTasks");
     //localStorage.setItem("localTasks", JSON.stringify(allTasks));
    // var storedTasks = JSON.parse(localStorage.getItem("localTasks"));
}

function deleteTask(e) {
    var whatRemove = e.getAttribute('data-id');
    for(var i=0; i<allTasks.length; i++){
        if(allTasks[i].id == whatRemove){
            allTasks[i].delete();
          // e.parentElement.remove();
        }
    }
    localStorage.setItem("allEntries", JSON.stringify(allTasks));
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
    var canBeRemoved = true;
            if (e.checked) {
                for(var i=0; i<allTasks.length; i++){
                    if(allTasks[i].id == whatRemove){
                        canBeRemoved = allTasks[i].canBeRemoved();
                        if(canBeRemoved){
                            allTasks[i].finished = true;
                            e.parentElement.remove();
                            allTasks[i].draw();
                        }
                        else{
                            alert("finish all subtasks first!");
                            e.parentElement.remove();
                            allTasks[i].draw();

                        }
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
    localStorage.setItem("allEntries", JSON.stringify(allTasks));


}

function init(){
    var existingEntries = JSON.parse(localStorage.getItem("allEntries") || "[]");
    console.log(existingEntries);

    for(var i = 0; i<existingEntries.length; i++){
        if(existingEntries[i].type == "task"){
            var obj = new Task(existingEntries[i].title, existingEntries[i].finished);
            allTasks.push(obj);
        }
        if(existingEntries[i].type == "deadline"){
            obj = new DeadlineTask(existingEntries[i].title, existingEntries[i].deadline,  existingEntries[i].finished);
            allTasks.push(obj);
        }
        if(existingEntries[i].type == "subtask"){
            obj = new SubtaskTask(existingEntries[i].title, existingEntries[i].array,  existingEntries[i].finished);
            allTasks.push(obj);
        }
    }

    var entry = new Task("helo ele elo", true);
    var b = new DeadlineTask("12", 12);

    var task2 = new Task("no elo");
    var task3 = new Task("helllloooo");
    task2.finished = true;
    var tasksArray = [];
    tasksArray.push(task2);
    tasksArray.push(task3);

    var c = new SubtaskTask("suuuub", tasksArray);

    allTasks.push(entry);
    allTasks.push(b);
    allTasks.push(c);
    localStorage.setItem("allEntries", JSON.stringify(allTasks));
    console.log(allTasks);


    showAllTasks();
}

init();