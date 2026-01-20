let todos = JSON.parse(localStorage.getItem("todos")) || [];
let editTodoId = null;
const todoInput = document.querySelector(".todoInput");
const addBtn = document.querySelector(".addBtn");
const todoList = document.querySelector(".todoList");
const filterSelect = document.querySelector(".filterSelect");



const saveTodos= ()=> {
    localStorage.setItem("todos",JSON.stringify(todos));
};

const renderAllTodos = (list = todos) =>{
    todoList.innerHTML = "";
    list.forEach(todo => renderTodoItem(todo));
    
}






const renderTodoItem = (todo)=>{

    const todoItemElemnet = document.createElement("li");
    todoItemElemnet.classList.add("todoItem");
    todoItemElemnet.dataset.id = todo.id;
    todoList.appendChild(todoItemElemnet);

    const completedBtn = document.createElement("button");
    completedBtn.classList.add("completedBtn");
    

    if (todo.completed) {
        completedBtn.innerHTML= "Tamamlandı";
    }else{
        completedBtn.innerHTML = "Tamamla";
    }



    todoItemElemnet.appendChild(completedBtn);


    const textElement = document.createElement("p");
    textElement.classList.add("todoText");
    textElement.innerHTML=todo.text;

    if (todo.completed) {
        textElement.classList.add("eklendi");
    }


    todoItemElemnet.appendChild(textElement);


    const editBtn = document.createElement("button");
    editBtn.classList.add("editBtn");
    editBtn.innerHTML= "Düzenle";
    todoItemElemnet.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.innerHTML="Sil";
    todoItemElemnet.appendChild(deleteBtn);



}



const selectFilter = (e)=>{
    const chooseFilter = e.target.value;
    
    switch (chooseFilter) {
        case "all":
            renderAllTodos();
            break;
        case "completed":
            const compTodos = todos.filter(todo => todo.completed == true);
            renderAllTodos(compTodos);
            break;
        case "uncompleted":
            const uncompTodos = todos.filter(todo => todo.completed == false);
            renderAllTodos(uncompTodos);
            break;
        default:
            renderAllTodos();  
            break;
    }
    // Tarihe Göre sıralama yapılması gerek
}   

filterSelect.addEventListener("change",selectFilter);



todoList.addEventListener("click",(e)=>{
    const liElement = e.target.closest("li");
    if(liElement){
        const todoId = Number(liElement.dataset.id);
        console.log(todoId);

        if(e.target.classList.contains("deleteBtn")){
            console.log("Silme Butonuna Basıldı");

            todos = todos.filter(todo => todo.id !== todoId );
            saveTodos();
            renderAllTodos();
        }


        if(e.target.classList.contains("editBtn")){
            const todo = todos.find(todo => todo.id === todoId);
            todoInput.value = todo.text;
            editTodoId = todoId;
            addBtn.innerText = "Güncelle";
            addBtn.classList.remove("addBtn");
            addBtn.classList.add("frmEditBtn");
            
        }

        if(e.target.classList.contains("completedBtn")){
            console.log("Tamamlama Butonuna Basıldı");
            

            todos = todos.map(todo=> {
                if(todo.id === todoId){
                    return {...todo,completed: !todo.completed}
                }
                return todo;
            });

            saveTodos();
            renderAllTodos();

        }
    }

    
});


const addTask = ()=>{
    if (todoInput.value === '') {
        alert("Task Yazmanız Gerekiyor.");
    }else{
        const newTodo ={
            id: Date.now(),
            text: todoInput.value,
            completed:false
        };

        todos.push(newTodo);
        saveTodos();
        renderAllTodos();

        todoInput.value= "";

    }
}




const editTask = (todoId)=>{ 
    const newText = todoInput.value;
    todos = todos.map(todo => {
    if(todo.id === todoId){
        return {...todo, text:newText};
    }
    return todo;
    }
    );

    saveTodos();
    renderAllTodos();

    todoInput.value = "";
    editTodoId = null;
    addBtn.innerText = "Ekle";  

    addBtn.classList.remove("frmEditBtn");
    addBtn.classList.add("addBtn");
}


addBtn.addEventListener("click", () => {
  if (editTodoId) {
    editTask(editTodoId);
  
  } else {
    addTask();
  }
});


todoInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        
        if (editTodoId) {
            editTask(editTodoId);
        }else{
            addTask();
        }
    }
});

renderAllTodos();



// https://yasinefemdalkilic.medium.com/javascript-find-map-filter-findindex-methodlar%C4%B1-ve-kullan%C4%B1mlar%C4%B1-4070e59403df --> Array İşlemleri için buradan yardım aldım.


// enter tuşu için yararlandığım kaynak https://www.w3schools.com/howto/howto_js_trigger_button_enter.asp


// Select Elemntını Dom olayları nasıl yapılır buradan baktım  https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event