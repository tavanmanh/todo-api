let taskName=document.querySelector('#new')
var taskApi='https://62a0aeb1a9866630f8154d82.mockapi.io/Tasks'

function start(){
    getTasks(renderTask)
    createForm()
}

start();
function getTasks(callback){
    fetch(taskApi)
        .then(function(response){
            return response.json();
        })
        .then(callback)
}
function createTask(data,callback){
    var options={
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    }
    fetch(taskApi,options)
        .then(function(response){
            return response.json();
        })
        .then(callback)
}

function renderTask(Tasks){
    var list= document.querySelector('.todo-list')
    let content='<ul class="todo-list">'
    var htmls= Tasks.map(function(task){
        if(task.status==1){
            completed='checked'
        }
        else{
            completed=''
        }
        content += `<li class="completed">
        <div class="view" style="display: flex;" ondblclick="editTask(${task.id})" id="eT${task.id}">
            <input onclick="updateStatus(${task.id},${task.status})" class="toggle" type="checkbox" ${completed}>
            <label id="name${task.id}">${task.name}</label>
            <a class="destroy" href="#" onclick="deleteTask(${task.id})" style="text-decoration: none;margin-top: 20px;"></a>
        </div>
        <input class="edit" id="edit${task.id}">
    </li>`
    })
    if(Tasks.length>0){
        document.getElementById("footer").style.display = 'block';
    }
    else{
        document.getElementById("footer").style.display = 'none';
    }
    content+='</ul>'
    document.querySelector('.main').innerHTML=content
    document.querySelector('.todo-count').innerHTML=Tasks.length+" item left"
}

function createForm(){
    let input =document.getElementById("new");
    input.addEventListener("keypress", function(event) {
        if (event.key === "Enter"&&taskName.value!='') {
          let task ={name:taskName.value,status: 0 }
          createTask(task,function(){
            taskName.value=''
            getTasks(renderTask)
          })
        }
      })
}
function deleteTask(id){
    var options={
        method:'DELETE',
        headers:{
            'Content-Type':'application/json'
        },
    }
    fetch(taskApi+'/'+id,options)
        .then(function(response){
            return response.json();
        })
        .then(function(){
            getTasks(renderTask)
        })
}
function updateStatus(id,status,callback){
    if(status==0){
    var options={
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            status: 1
        })
    }
}
    else
    {
        var options={
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                status: 0
            })
        }
    }
    fetch(taskApi+'/'+ id,options)
    .then(function(response){
        return response.json();
    })
    .then(callback)

}
