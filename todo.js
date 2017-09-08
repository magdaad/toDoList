/**
 * Created by Magda on 2017-09-06.
 */
var allTasks = [];

var id = 1;

var Task = function(title){
    this.id = id;
    id = id + 1;
    this.title = title;
    this.finished = false;
    /*this.draw = function(){
        var x = document.createElement("DIV");
        x.setAttribute("data-idd", this.id);
        if(this.finished){
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
        var t = document.createTextNode(this.title);
        z.appendChild(t);
        x.appendChild(z);

        var y = document.createElement("INPUT");
        y.setAttribute("type", "checkbox");
        y.setAttribute("class", "checkbox col-1");
        y.setAttribute("data-id", this.id);
        y.setAttribute("onclick", "onToggle(this)");
        if(this.finished){
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

    };*/
    /*this.delete = function(){
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
    };*/
};

Task.prototype.draw = function (){
    var x = document.createElement("DIV");
    x.setAttribute("data-idd", this.id);
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

document.querySelector(".buttonAdd").addEventListener("click", addTask);

function init(){
    var task1 = new Task("helo ele elo");
    var task2 = new Task("no elo");
    allTasks.push(task1);
    allTasks.push(task2);
    showAllTasks();
}

function addTask(){
    var titleValue = document.querySelector("#inputNewTask").value;
    document.querySelector("#inputNewTask").value = "";
    var newTask = new Task(titleValue);
    allTasks.push(newTask);
    console.log(allTasks);
    newTask.draw();
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




