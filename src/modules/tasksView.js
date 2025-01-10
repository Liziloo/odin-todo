import { openTaskModal } from "./taskModal";
export { tasksView };


const tasksView = (selectedListName, listsCollection) => {
    const contentDiv = document.querySelector('#content');
    
    const selectedList = listsCollection.lists.find(list => list.name === selectedListName);
    
    contentDiv.textContent = '';

    const listSelectDiv = document.createElement('div');
    const listSelect = document.createElement('select');
    listSelect.setAttribute('name', 'list');
    const allOption = document.createElement('option');
    allOption.textContent = 'All tasks';
    allOption.value = 'all';
    listSelect.appendChild(allOption);
    for (let list of listsCollection.lists) {
        const listOption = document.createElement('option');
        listOption.setAttribute('value', list.name);
        listOption.textContent = list.name;
        if (list.name === selectedListName) {
            listOption.selected = true;
        }
        listSelect.append(listOption);
    }
    listSelectDiv.appendChild(listSelect);
    listSelect.addEventListener('change', (e) => {changeHandlerListSelect(e)});

    const listDiv = document.createElement('div');
    const taskButton = document.createElement('button');
    if (selectedListName !== 'all') {
        taskButton.classList.add('new-task-button');
        taskButton.textContent = 'Add task';
        taskButton.dataset.listName = selectedListName;
        taskButton.addEventListener('click', (e) => {clickHandlerNewTask(e)});
        listDiv.appendChild(taskButton);
    }
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('tasks-div');
    const taskUl = document.createElement('ul');
    taskUl.classList.add('task-ul');
    if (selectedListName === 'all') {
        for (let list of listsCollection.lists) {
            const tasks = []
            for (let task of list.tasks) {
                tasks.push(task);
            }
            populateTaskList(list.name, tasks);
        }
    } else {
        populateTaskList(selectedListName, selectedList.tasks);
    }
   
    taskDiv.appendChild(taskUl);
    listDiv.appendChild(taskDiv);
    contentDiv.append(listSelectDiv, listDiv, taskDiv);

    function clickHandlerNewTask(e) {
        e.preventDefault();
        openTaskModal(e, listsCollection);
    }

    function clickHandlerTaskCheckbox(e) {
        listsCollection.toggleTask(e);
    }

    function changeHandlerListSelect(e) {
        const newSelectedListName = e.target.value;
        taskUl.textContent = '';
        tasksView(newSelectedListName, listsCollection);
    }

    function populateTaskList(listName, tasks) {
        for (let task of tasks) {
            const taskLi = document.createElement('li');
            const taskCheckbox = document.createElement('input');
            taskCheckbox.setAttribute('type', 'checkbox');
            taskCheckbox.id = task.name;
            taskCheckbox.dataset.taskName = task.name;
            taskCheckbox.dataset.listName = listName;
            if (task.done) {
                taskCheckbox.checked = true;
            }
            const checkboxLabel = document.createElement('label');
            checkboxLabel.textContent = `${task.name} Due: ${task.duedate.toLocaleString()}`;
            checkboxLabel.setAttribute('for', task.name);
            checkboxLabel.dataset.taskName = task.name;
            checkboxLabel.dataset.listName = listName;
            checkboxLabel.addEventListener('click', (e) => {e.preventDefault();})
            taskLi.append(taskCheckbox, checkboxLabel);
            const taskDeleteButton = document.createElement('button');
            taskDeleteButton.textContent = 'x';
            taskDeleteButton.addEventListener('click', (e) => {
                e.preventDefault();
                listsCollection.deleteTask(listName, task);
            });
            taskLi.appendChild(taskDeleteButton);
            taskUl.appendChild(taskLi);
            taskCheckbox.addEventListener('click', (e) => {clickHandlerTaskCheckbox(e)});
            
        }
        taskUl.addEventListener('click', (e) => {
            const selectedTaskName = e.target.dataset.taskName;
            if (!selectedTaskName || e.target.tagName !== 'LABEL') {return};
            openTaskModal(e, listsCollection);
        })
    }
    console.log('tasks-view listsCollection', listsCollection);
}
