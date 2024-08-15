function manageTasks() {
    const form = document.getElementById('fo');
    const taskInput = document.getElementById('task');
    const content = document.getElementById('content');

   
    function createTaskItem(taskText, isChecked = false) {
        const taskItem = document.createElement('li');

        const taskDescription = document.createElement('h5');
        taskDescription.textContent = taskText;
        taskDescription.style.textDecoration = isChecked ? 'line-through' : 'none';
        taskItem.appendChild(taskDescription);

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'check';
        checkbox.checked = isChecked;
        checkbox.onclick = () => {
            taskDescription.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
            saveTasks();
        };
        taskItem.appendChild(checkbox);

        const deleteButton = document.createElement('i');
        deleteButton.className = 'fa fa-close close';
        deleteButton.onclick = () => {
            content.removeChild(taskItem);
            saveTasks();
        };
        taskItem.appendChild(deleteButton);

        return taskItem;
    }

   
    function saveTasks() {
        const tasks = [];
        content.querySelectorAll('li').forEach(li => {
            const taskDescription = li.querySelector('h5').textContent;
            const isChecked = li.querySelector('input').checked;
            tasks.push({ text: taskDescription, completed: isChecked });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            const taskItem = createTaskItem(task.text, task.completed);
            content.appendChild(taskItem);
        });
    }


    form.onsubmit = (e) => {
        e.preventDefault();
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            const newTaskItem = createTaskItem(taskText);
            content.appendChild(newTaskItem);
            taskInput.value = '';
            saveTasks();
        }
    };

   
    loadTasks();
}


manageTasks();
