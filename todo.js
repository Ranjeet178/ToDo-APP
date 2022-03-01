
(function(){
    var tasks = [];
    const taskList = document.getElementById('list');
    const addTaskInput = document.getElementById('add');
    const tasksCounter = document.getElementById('tasks-counter');
    const name= document.getElementById('fname');
    
    async function fetchTodos(){
        // get request
        // fetch(`https://jsonplaceholder.typicode.com/todos`)
        // .then(function(response){
        //     // console.log(response);
        //     return response.json()
    
        // }).then(function(data){
        //     console.log(data)
        //     tasks = data.slice(0, 10);
        //     console.log(tasks)
        //     renderList();
        // })
        // .catch(function(error){
        //     console.log('error',error)
        // })
    try{
        const response=await fetch(`https://jsonplaceholder.typicode.com/todos`)
        const data=await response.json()
        tasks = data.slice(0, 10);
        tasks = data.slice(0, 10);
        renderList();
        }
    catch(error){
        console.log("error")
    }
    
    
    }
    
    console.log('Working');
    function addTaskTODOM(task){
        const li= document.createElement('li');
        li.innerHTML=` 
        
        <input type="checkbox" id="${task.id}" ${task.completed ? 'checked' : ''} class="custom-checkbox">
        <label for="${task.id}">${task.title}</label>
        <img src="bin.svg" class="delete" data-id="${task.id}" />
        
        `
        taskList.append(li);
    } 
    
    function renderList () {
        taskList.innerHTML='';
        for(let i=0;i<tasks.length;i++){
            addTaskTODOM(tasks[i])
        }
    
    }
    
    function toggleTaskAsComplete (taskId) {
        const task= tasks.filter(function(task){
            return task.id === taskId
        }) 
        if(task.length > 0){
            const currentTask=task[0];
    
            currentTask.completed=!currentTask.completed;
            renderList()
            showNotification('Task toggled sucessfully');
            return;
        }
        showNotification('could not toggled the task');
    }
    
    function deleteTask (taskId) {
        console.log(taskId)
        const newTasks= tasks.filter(function(task){
            return task.id !== taskId
        })
    
        tasks=newTasks;
        renderList ()
        showNotification('Task deleted successfully')
    }
    
    function addTask (task) {
        if(task){tasks.push(task)
            renderList()
            showNotification('Task Added successfully')
        return;
        }
       
        showNotification('Task can not be added')
        
        
    }
    
    function showNotification(text) {
        alert(text)
    }
    
    function handleInputKeypress(e){
        if(e.key=="Enter"){
            const text=e.target.value;
            console.log(text)
        if(!text){
            showNotification('Task text can not be empty')
            return
        }
        const task={
            text:text,
            id:Date.now().toString(),
            done:false
        }
        //console.log(task)
        e.target.value='';
        addTask (task);
    
    
        }
    }
    function handleClickListener(e){
        const target= e.target
        console.log(target)
    
        if (target.className==='delete'){
    
            const taskid=target.id;
            deleteTask(taskid)
        return;
    
        }else if(target.className==='custom-checkbox'){
            const taskid=target.id;
            toggleTaskAsComplete(taskid)
            return;
    
        }
    }
    
    fetchTodos()
    
    addTaskInput.addEventListener('keyup',handleInputKeypress)
    
    document.addEventListener('click',handleClickListener);
})()



